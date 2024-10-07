import animelistGetRouter from "../animelistGetRouter";
import {checkToken} from "../../../../token/checkToken";
import {ErrorType, sendError} from "../../../../functions/general/Error";
import {JwtUser} from "../../../../types/Global";
import e from "express";

export default async function updateRating (req:e.Request, res:e.Response){
    try{
        const {id} = req.params;
        const {rating} = req.body;
        // console.log(req.body,[parseInt(rating),(req.user as JwtUser)._id,id])
        await req.db.query(`UPDATE users.user_anime_list
            SET rate = $1
            WHERE user_id = $2 AND anime_id = $3
        `,[parseInt(rating),(req.user as JwtUser)._id,id])
        // console.log(result)
        res.json({success:true,message:rating})
    }catch(err){
        sendError(res,ErrorType.default,500,err)
    }
}
