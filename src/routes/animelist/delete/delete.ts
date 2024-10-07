import animelistGetRouter from "../animelistGetRouter";
import {checkToken} from "../../../../token/checkToken";
import {JwtUser} from "../../../../types/Global";
import {ErrorType, sendError} from "../../../../functions/general/Error";
import e from "express";


export default async function deleteAnimelist(req:e.Request, res:e.Response){
    try{
        await req.db.query(`
            DELETE FROM users.user_anime_list WHERE user_id = $1 AND anime_id = $2;
        `,[(req.user as JwtUser)._id,req.params.id])
        res.json({success:true,message:`Anime deletado da lista do ${(req.user as JwtUser).username}`});
    }catch(err){
        sendError(res,ErrorType.default,500,err)
    }
}
