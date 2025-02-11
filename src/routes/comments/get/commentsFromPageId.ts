import {ErrorType, sendError} from "../../../functions/general/Error";
import e from "express";

export default async function commentsFromPageId(req:e.Request, res:e.Response){
    try{
        if(!req.params.id){
            return sendError(res,ErrorType.badRequest)
        }
        const result = await req.db.query(`
                SELECT 
                    users.comments.*,
                    users.users.username as user_name
                FROM users.comments
                    INNER JOIN users.users on comments.user_id = users._id
                WHERE page_id = $1
                `,[req.params.id]);
        res.json({success:true,data:result.rows});
    }catch(err){
        sendError(res,ErrorType.default,500,err)
    }
}
