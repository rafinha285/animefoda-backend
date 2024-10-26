import {ErrorType, sendError} from "../../../functions/general/Error";
import e from "express";

async function getProducer(req:e.Request,res:e.Response){
    try{
        let rows = (await req.db.query(`SELECT id, name, description, rating 
        FROM anime.anime 
        WHERE $1::uuid = ANY(producers) AND visible = true;`,[req.params.prod])).rows || []
        if(rows.length < 0){
            return sendError(res,ErrorType.NotId)
        }
        res.send(rows)
    }catch(err){
        sendError(res,ErrorType.default,500,err)
    }
}
export default getProducer;
