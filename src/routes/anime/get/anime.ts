import {ErrorType, sendError} from "../../../functions/general/Error";
import e from "express";
import Console from "../../../functions/general/Console";

async function getAnime (req:e.Request,res:e.Response){
    try{
        let row = (await req.db.query(`SELECT id, averageeptime, date_added, description, genre, language, name, name2, quality, rating, weekday, state, releasedate
	FROM anime.anime WHERE id = $1 AND visible = true;`,[req.params.id]))
        if(row.rows.length != 1){
            return sendError(res,ErrorType.NotId)
        }
        res.send(row.rows[0])
    }catch(err){
        sendError(res,ErrorType.NotId)
    }
}
export default getAnime;
