import {ErrorType, sendError} from "../../../../functions/general/Error";
import {JwtUser} from "../../../../types/Global";
import e from "express";

async function insertEpisodeList (req:e.Request, res:e.Response){
    try{
        const {anime_id,dropped_on,episode_id,season_id} = req.body;
        // Console.log(req.body,req.user as JwtUser);
        // Console.log([
        //     (req.user as JwtUser)._id,  // user_id
        //     anime_id                    // anime_id
        // ])
        await req.db.query(`
            SELECT users.check_and_insert_user_anime_list($1, $2);
        `, [
            (req.user as JwtUser)._id,  // user_id
            anime_id                    // anime_id
        ]);
        await req.db.query(`
            INSERT INTO users.user_episode_list
            (
                episode_id,
                dropped_on,
                season_id,
                anime_id,
                user_id,
                watched
            )
            VALUES
                (
                    $1,
                    $2,
                    $3,
                    $4,
                    $5,
                    ($2 >= (SELECT ending::double precision FROM anime.episodes WHERE id = $1))
                )
            ON CONFLICT (user_id, episode_id)
                DO UPDATE
                SET dropped_on = $2,
                    date = now(),
                    watched = ($2 >= (SELECT ending::double precision FROM anime.episodes WHERE id = $1));
        `,[
            episode_id,
            dropped_on,
            season_id,
            anime_id,
            (req.user as JwtUser)._id,
        ])
        res.json({success:true})
    }catch(err){
        sendError(res,ErrorType.default,500,err)
    }
}
export default insertEpisodeList;
