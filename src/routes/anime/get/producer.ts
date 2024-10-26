import animeGetRouter from "../animeGetRouter";
import {ErrorType, sendError} from "../../../functions/general/Error";
import e from "express";

async function getProducer(req:e.Request,res:e.Response){
    try{
        res.send((await req.db.query(`SELECT id, name, description, rating 
        FROM anime.anime 
        WHERE $1::uuid = ANY(producers) AND visible = true;`,[req.params.prod])).rows)
    }catch(err){
        sendError(res,ErrorType.default,500,err)
    }
}
export default getProducer;
