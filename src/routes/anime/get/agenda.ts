import animeGetRouter from "../animeGetRouter";
import {ErrorType, sendError} from "../../../../functions/general/Error";
import e from "express";

async function getAgenda (req:e.Request,res:e.Response){
    try{
        res.send((await req.db.query("SELECT id, name, description,rating, weekday FROM anime.anime WHERE state = 'Lançando'")).rows)
    }catch(err){
        sendError(res,ErrorType.default,500,err)
    }
}
export default getAgenda;
