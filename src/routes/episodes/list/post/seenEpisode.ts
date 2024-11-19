import e from 'express';
import {ErrorType, sendError} from "../../../../functions/general/Error";
import {UserToken} from "../../../../types/Global";
import insertUserEpisode from "../../../../functions/episodes/insertUserEpisode";
import pgClient from "../../../../database/postgres";

export default async function seenEpisode(req:e.Request, res:e.Response) {
    try{
        const {aniId,seasonId,epId} = req.params;
        const duration = parseInt((await req.db.query("SELECT duration FROM anime.episodes WHERE id = $1",[epId])).rows[0].duration)
        const watched = await req.db.query(`SELECT watched 
            FROM users.user_episode_list 
            WHERE 
                anime_id = $1 AND 
                season_id = $2 AND
                episode_id = $3 AND
                user_id = $4`,[aniId,seasonId,epId,(req.user as UserToken)._id])
        if(watched.rows.length == 0){
            await insertUserEpisode({
                anime_id:aniId,
                season_id:seasonId,
                episode_id:epId,
                user_id:(req.user as UserToken)._id,
                watched:true,
                dropped_on:duration,
            })
        }else{
            try{
                await req.db.query("BEGIN");
                await req.db.query("UPDATE users.user_episode_list SET watched = true, dropped_on = $3 WHERE episode_id = $1 AND user_id = $2",
                    [epId,(req.user as UserToken)._id,duration]
                );
                await req.db.query("COMMIT")
            }catch(e){
                throw e;
            }finally{
                req.db.query("ROLLBACK")
            }
        }
        res.json({success:true})
    }catch(err){
        sendError(res,ErrorType.default)
    }
}