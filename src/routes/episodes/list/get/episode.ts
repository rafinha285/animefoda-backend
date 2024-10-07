import {ErrorType, sendError} from "../../../../functions/general/Error";
import {JwtUser} from "../../../../types/Global";
import e from "express";

async function getEpisodeList(req:e.Request,res:e.Response){
    try{
        const {id,epId} = req.params;
        const {_id} = (req.user as JwtUser);
        const result = await req.db.query(`
            SELECT * FROM users.user_episode_list
            WHERE
                anime_id = $1 AND 
                episode_id = $2 AND 
                user_id = $3;
        `,[id,epId,_id])
        res.json({success: true, message: result.rows[0]})
    }catch(err:any) {
        sendError(res,ErrorType.default, 500, err);
    }
}
export default getEpisodeList;
