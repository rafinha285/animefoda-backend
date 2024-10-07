import e from "express";
import Console from "../../../functions/general/Console";
import {ErrorType, sendError} from "../../../functions/general/Error";

async function getEpisodesFromSeason (req:e.Request, res: e.Response) {
    try{
        const {animeid,seasonid} = req.params
        Console.log(animeid,seasonid)
        var result = await req.db.query(`SELECT * FROM anime.episodes WHERE season_id = $1 AND anime_id = $2;`,[seasonid,animeid])
        // if(result.rows.length === 0){
        //     throw ErrorType.NotId
        // }
        // await sleep(50)
        // Console.log(result.rows)
        res.send(result.rows)
    }catch(err){
        switch(err){
            case ErrorType.NotId:
                sendError(res,ErrorType.NotId)
                break
            default:
                sendError(res,ErrorType.default,500,err)
        }

    }
}
export default getEpisodesFromSeason;
