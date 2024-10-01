import episodesGetRouter from "../episodeRouter";
import {ErrorType, sendError} from "../../../../functions/general/Error";
import e from "express";

async function getEpisode (req:e.Request,res:e.Response){
    try{
        if(!req.params.animeId || !req.params.seasonId||!req.params.epId){
            throw ErrorType.undefined
        }
        let {animeId,seasonId,epId} = req.params
        // var ep = await pgClient.query("SELECT * FROM episodes WHERE animeid =  AND seasonid = ? AND id = ? ALLOW FILTERING;",[req.params.animeId,req.params.seasonId,req.params.ep],{prepare:true})
        let ep = await req.db.query(`
            SELECT 
                id,
                anime_id,
                season_id,
                date_added,
                duration,
                ending,
                epindex,
                name,
                openingend,
                openingstart,
                releasedate,
                array_to_json(subtitlestracks) as subtitlestracks,
                views,
                array_to_json(audiotracks) as audiotracks,
                array_to_json(resolution) as resolution
                
            FROM anime.episodes
                WHERE anime_id = $1 AND season_id = $2 AND id = $3`,[animeId,seasonId,epId])
        res.send(ep.rows[0])
    }catch(err){
        switch(err){
            case ErrorType.undefined:
                sendError(res,ErrorType.undefined,400,"")
                break
            default:
                sendError(res,ErrorType.default,500,err)
        }
    }
}
export default getEpisode
