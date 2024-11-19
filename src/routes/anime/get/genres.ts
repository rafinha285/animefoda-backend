import {ErrorType, sendError} from "../../../functions/general/Error";
import e from "express";

async function getGenres (req:e.Request,res:e.Response){
    try{
        res.send((await req.db.query(`SELECT id, name, description, rating FROM anime.anime WHERE EXISTS (
            SELECT 1 
            FROM unnest(genre) AS g 
            WHERE g LIKE $1
        )AND visible = TRUE;`,[`%${req.params.gen}%`])).rows)
    }catch(err){
        sendError(res,ErrorType.default,500,err)
    }
}
export default getGenres
