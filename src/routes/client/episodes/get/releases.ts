import episodesGetRouter from "../episodeRouter";
import {ErrorType, sendError} from "../../../../functions/general/Error";
import e from "express";

async function getReleases (req:e.Request,res:e.Response){
    try{
        var {count} = req.query
        if(count !== null){
            // console
            res.send((await req.db.query(`
                SELECT 
                    a.name AS animename,
                    s.name AS seasonname,
                    e.name,
                    e.id,
                    e.anime_id,
                    e.season_id,
                    e.duration,
                    array_to_json(e.resolution) as resolution,
                    e.date_added
                FROM 
                    anime.episodes e
                JOIN 
                    anime.seasons s ON e.season_id = s.id
                JOIN 
                    anime.anime a ON s.anime_id = a.id 
                WHERE 
                    e.date_added >= NOW() - INTERVAL '7 days'
                ORDER BY 
                    e.date_added DESC
                LIMIT $1;
            `,[count])).rows)
        }else{
            res.send((await req.db.query(`
                SELECT 
                    a.name AS animename,
                    s.name AS seasonname,
                    e.name,
                    e.id,
                    e.anime_id,
                    e.season_id,
                    e.duration,
                    array_to_json(e.resolution) as resolution,
                    e.date_added
                FROM 
                    anime.episodes e
                JOIN 
                    anime.seasons s ON e.season_id = s.id
                JOIN 
                    anime.anime a ON s.anime_id = a.id 
                WHERE 
                    e.date_added >= NOW() - INTERVAL '7 days'
                ORDER BY 
                    e.date_added DESC;
            `,[count])).rows)
        }
    }catch(err){
        sendError(res,ErrorType.default,500,err)
    }
}
export default getReleases;
