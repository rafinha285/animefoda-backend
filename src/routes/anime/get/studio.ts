import animeGetRouter from "../animeGetRouter";
import {ErrorType, sendError} from "../../../functions/general/Error";
import e from "express";

async function getStudio (req:e.Request,res:e.Response){
    try{
        res.send((await req.db.query(`SELECT id, name, description, rating 
            FROM anime.anime 
            WHERE $1::uuid = ANY(studios)`,[req.params.stud])).rows)
    }catch(err){
        sendError(res,ErrorType.default,500,err)
    }
}
export default getStudio;
