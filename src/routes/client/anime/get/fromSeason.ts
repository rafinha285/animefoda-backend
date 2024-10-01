import animeGetRouter from "../animeGetRouter";
import {ErrorType, sendError} from "../../../../functions/general/Error";
import e from "express";

async function getAnimeFromSeason (req:e.Request,res:e.Response) {
    try{
        res.send((await req.db.query(`SELECT * FROM anime.seasons WHERE anime_id = $1 AND id = $2`,[req.params.id,req.params.seasonId])).rows)
    }catch(err){
        sendError(res,ErrorType.default)
    }
}
export default getAnimeFromSeason;

