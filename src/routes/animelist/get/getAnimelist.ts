import {UserToken} from "../../../types/Global";
import {ErrorType, sendError} from "../../../functions/general/Error";
import e from "express";

export default async function getAnimelist (req:e.Request,res:e.Response){
    try{
        var response = await req.db.query(`
            SELECT user_id, anime_id, status, name, start_date, finish_date, rate, priority, id
            FROM users.user_anime_list WHERE user_id = $1;
            `,[(req.user as UserToken)._id])

        res.send(response.rows)
    }catch(err){
        sendError(res,ErrorType.default,500,err)
    }
};
