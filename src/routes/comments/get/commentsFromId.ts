import {ErrorType, sendError} from "../../../functions/general/Error";
import e from "express";

export default async function commentsFromId(req:e.Request, res:e.Response){
    try{
        const result = await req.db.query("SELECT * FROM users.comments WHERE page_id = $1",[req.params.id]);
        res.json({success:true,result:result.rows});
    }catch(err){
        sendError(res,ErrorType.default,500,err)
    }
}
