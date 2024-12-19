import {ErrorType, sendError} from "../../../../functions/general/Error";
import {UserToken} from "../../../../types/Global";
import e from "express";
import {QueryResult} from "pg";

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
            (req.user as UserToken)._id,  // user_id
            anime_id                    // anime_id
        ]);
        // await req.db.query(`
        //     INSERT INTO users.user_episode_list
        //     (
        //         episode_id,
        //         dropped_on,
        //         season_id,
        //         anime_id,
        //         user_id,
        //         finished
        //     )
        //     VALUES
        //         (
        //             $1,
        //             $2,
        //             $3,
        //             $4,
        //             $5,
        //             ($2 >= (SELECT ending::double precision FROM anime.episodes WHERE id = $1))
        //         )
        //     ON CONFLICT (user_id, episode_id)
        //         DO UPDATE
        //         SET dropped_on = $2,
        //             date = now(),
        //             finished = ($2 >= (SELECT ending::double precision FROM anime.episodes WHERE id = $1));
        // `,[
        //     episode_id,
        //     dropped_on,
        //     season_id,
        //     anime_id,
        //     (req.user as UserToken)._id,
        // ])

        const insertEpisode = async() =>{
            await req.db.query(`INSERT INTO users.user_episode_list
                (
                    episode_id,
                    dropped_on,
                    season_id,
                    anime_id,
                    user_id,
                    finished
                )
                VALUES
                    (
                        $1,
                        $2,
                        $3,
                        $4,
                        $5,
                        ($2 >= (SELECT ending::double precision FROM anime.episodes WHERE id = $1))
                    )`
                ,[
                    episode_id,
                    dropped_on,
                    season_id,
                    anime_id,
                    (req.user as UserToken)._id,
                ])
        }

        const isInDatabase:QueryResult<{ finished:boolean,id:number }> = await req.db.query("SELECT finished,id FROM users.user_episode_list WHERE episode_id = $1 AND user_id = $2 ORDER BY date DESC",[
            episode_id,
            (req.user as UserToken)._id,
        ]);

        if(isInDatabase.rows.length != 0 && !isInDatabase.rows[0].finished){
            await req.db.query(`UPDATE users.user_episode_list SET dropped_on = $2, date = now(), finished = ($2 >= (SELECT ending::double precision FROM anime.episodes WHERE id = $1)) WHERE user_id = $3 AND episode_id = $1 AND id = $4`,[
                episode_id,
                dropped_on,
                (req.user as UserToken)._id,
                isInDatabase.rows[0].id
            ])
        }else{
            await insertEpisode()
        }

        res.json({success:true})
    }catch(err){
        sendError(res,ErrorType.default,500,err)
    }
}
export default insertEpisodeList;
