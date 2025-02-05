import e from "express";
import {ErrorType, sendError} from "../../../functions/general/Error";
import {Comment} from "../../../types/Comment";
import {UserToken} from "../../../types/Global";

export default async function newComment(req:e.Request, res:e.Response) {
    try{
        const {pageId} = req.params;
        const comment:{
            parent_id?:number,
            content:string
        } = req.body;
        await req.db.query(`
            INSERT INTO users.comments(
                parent_id,
                page_id,
                user_id,
                content
            ) VALUES (
                      $1,
                      $2,
                      $3,
                      $4
                     )
        `,[
            comment.parent_id,
            pageId,
            (req.user as UserToken)._id,
            comment.content,
        ])
        res.json({success:true})
    }catch(err){
        sendError(res,ErrorType.default,500,err)
    }
}
