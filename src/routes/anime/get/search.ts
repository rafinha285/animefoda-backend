import {ErrorType, sendError} from "../../../functions/general/Error";
import e from "express";

async function getSearch(req:e.Request,res:e.Response){
    try{
        var s = req.params.s
        // Console.log(s)
        res.send((await req.db.query(`SELECT id, name, description, rating FROM anime.anime WHERE name ILIKE $1 OR name2 ILIKE $1`,[`%${s}%`])).rows)
    }catch(err){
        sendError(res,ErrorType.default,500,err)
    }
}
export default getSearch;
