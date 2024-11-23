import pgClient from "../../database/postgres";
import {EpisodeSim, EpisodeUser} from "../../types/Episode";

interface prop{
    anime_id:string,
    season_id:string,
    episode_id:string,
    user_id:string,
    watched: boolean,
    dropped_on:number,
}
export default async function insertUserEpisode(ep:prop){
    try{
        const duration = parseInt((await pgClient.query("SELECT duration FROM anime.episodes WHERE id = $1",[ep.episode_id])).rows[0].duration);
        const epUser= {
            anime_id:ep.anime_id,
            season_id:ep.season_id,
            episode_id:ep.episode_id,
            user_id:ep.user_id,
            date:new Date(),
            duration,
            watched:ep.watched,
            dropped_on:ep.dropped_on
        }
        await pgClient.query("BEGIN");

        await pgClient.query(`INSERT INTO users.user_episode_list 
            (
                episode_id, 
                season_id, 
                anime_id, 
                user_id, 
                finished,
                dropped_on
            ) VALUES (
                        $1,
                        $2,
                        $3,
                        $4,
                        $5,
                        $6
            ) `,
            [
                epUser.episode_id,
                epUser.season_id,
                epUser.anime_id,
                epUser.user_id,
                epUser.watched,
                epUser.dropped_on
            ])

        await pgClient.query("COMMIT")
    }catch(e){
        throw e;
    }finally {
        await pgClient.query("ROLLBACK")
    }
}