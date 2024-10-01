import episodesGetRouter from "../episodeRouter";
import path from "path";
import {ErrorType, sendError} from "../../../../functions/general/Error";
import {setHeader} from "../../../../functions/general/Header";
import {ANIME_PATH} from "../../../../config/pathConfig";
import e from "express";

async function getCaptions (req:e.Request,res:e.Response){
    try{
        setHeader(res)
        let {aniid,seasonid,epid,lang} = req.params
        res.set('Cache-Control','public, max-age=7200')
        let epPath = path.join(ANIME_PATH,aniid,'seasons',seasonid,epid,`${epid}-${lang}.vtt`)
        res.sendFile(epPath)
    }catch(err){
        sendError(res,ErrorType.default,500,err)
    }
}
export default getCaptions;
