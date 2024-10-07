import {ErrorType, sendError} from "../../../functions/general/Error";
import e from "express";

async function getAnime (req:e.Request,res:e.Response){
    try{
        res.send((await req.db.query(`SELECT id, averageeptime, date_added, description, genre, language, name, name2, quality, rating, weekday, state, releasedate
	FROM anime.anime WHERE id = $1;`,[req.params.id])).rows[0])
    }catch(err){
        sendError(res,ErrorType.NotId)
    }
}
export default getAnime;
