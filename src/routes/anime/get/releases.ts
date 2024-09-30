import animeGetRouter from "../animeGetRouter";
import {setHeader} from "../../../functions/general/Header";
import Console from "../../../functions/general/Console";
import {ErrorType, sendError} from "../../../functions/general/Error";
import e from "express";

async function getReleases(req:e.Request,res:e.Response){
    try{
        setHeader(res)
        res.setHeader("Cache-Control","public, max-age:60")
        //WHERE date_added BETWEEN CURRENT_TIMESTAMP - INTERVAL '7 days' AND CURRENT_TIMESTAMP;
        var query = `SELECT id, name, description, genre, averageeptime FROM anime.anime;`
        res.send((await req.db.query(query)).rows)
    }catch(err){
        Console.error(err)
        sendError(res,ErrorType.undefined)
    }
}
export default getReleases;
