import {ErrorType, sendError} from "../../../functions/general/Error";
import {UserToken} from "../../../types/Global";
import e from "express";

export default async function checkList (req:e.Request,res:e.Response){
    try{
        const user = req.user as UserToken;
        let result = await req.db.query(`SELECT COUNT(*)
            FROM users.user_anime_list
            WHERE user_id = $1
            AND anime_id = $2`,
            [user._id,req.params.id]);
        // Console.log(result)
        res.json({success:parseInt(result.rows[0].count) !== 0})
    }catch(err){
        sendError(res,ErrorType.default,500,err)
    }
}
