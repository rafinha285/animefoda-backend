import e from 'express'
import {ErrorType, sendError} from "../../../../functions/general/Error";

export default async function seenEpisode(req: e.Request, res: e.Response) {
    try{

    }catch(err){
        sendError(res,ErrorType.default)
    }
}