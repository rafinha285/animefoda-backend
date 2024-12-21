import e from "express";
import {ErrorType, sendError} from "../../../functions/general/Error";
import {Season} from "../../../types/Anime";
import {QueryResult} from "pg";

export default async function getSeason(req: e.Request, res: e.Response){
    try{
        const {aniId,seasonId} = req.body;
        const season:QueryResult<Season> = await req.db.query("SELECT * FROM anime.seasons WHERE anime_id = $1 AND id = $2",[
            aniId,
            seasonId
        ])
        res.json({success:true,season:season.rows});
    }catch(err){
        sendError(res,ErrorType.default, 500, err);
    }
}
