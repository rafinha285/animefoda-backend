import {ErrorType, sendError} from "../../../../functions/general/Error";
import e from "express";

export default async function getAllAnimes(req:e.Request,res:e.Response){
    try{
        let result = await req.db.query(`SELECT * FROM anime.anime`);
        res.send(result.rows);
    }catch(err){
        sendError(res,ErrorType.default,500,err)
    }
}
