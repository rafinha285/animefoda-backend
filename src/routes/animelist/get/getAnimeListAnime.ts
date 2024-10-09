import {ErrorType, sendError} from "../../../functions/general/Error";
import {UserToken} from "../../../types/Global";
import e from "express";

export default async function getAnimeListAnime(req:e.Request,res:e.Response){
    try{
        const {id} = req.params;
        res.json({success:true,response:(await req.db.query(`SELECT * FROM users.user_anime_list WHERE user_id = $1 AND anime_id = $2`,[(req.user as UserToken)._id,id])).rows[0]})
    }catch(err){
        sendError(res,ErrorType.default,500,err);
    }
};
