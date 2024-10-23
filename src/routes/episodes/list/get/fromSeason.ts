import e from "express";
import { ErrorType, sendError } from "../../../../functions/general/Error";
import { UserToken } from "../../../../types/Global";

export default async function getEpisodeListFromSeason(req:e.Request,res:e.Response) {
    try{
        const {id,seasonId} = req.params;
        let result = await req.db.query("SELECT * FROM users.user_episode_list WHERE anime_id = $1 AND season_id = $2 AND user_id = 3"
        ,[id,seasonId,(req.user as UserToken)._id])
        res.json(result.rows);
    }catch(err){
        sendError(res,ErrorType.default,500,err);
    }
}