import e from "express";
import {ErrorType, sendError} from "../../../functions/general/Error";

export default async function getCharacters(req: e.Request, res: e.Response) {
    try{
        if(!req.params.id){
            return sendError(res,ErrorType.badRequest)
        }
        const result = await req.db.query("SELECT * FROM anime.characters WHERE anime_id = $1",[req.params.id]);
        res.json({
            success:true,
            data:result.rows
        });
    }catch(err){
        sendError(res,ErrorType.default,500,err)
    }
}
