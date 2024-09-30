import animeGetRouter from "../animeGetRouter";
import {ErrorType, sendError} from "../../../functions/general/Error";
import e from "express";

async function getSeasons (req:e.Request,res:e.Response){
    try{
        res.send((await req.db.query(`SELECT * FROM anime.seasons WHERE anime_id = $1`,[req.params.id])).rows)
    }catch(err){
        sendError(res,ErrorType.default,500,err)
    }
}
export default getSeasons;
