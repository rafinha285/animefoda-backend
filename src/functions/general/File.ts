import e from "express";

export default function sendFile(){
    function cssJs(res:e.Response){
        res.set('Cache-Control','public, max-age=31536000').set('Age','262968')
    }
    function img(res:e.Response){
        res.set('Cache-Control','public, max-age=86400').set('Age','262968')
    }
    return {
        cssJs:cssJs,
        img:img
    }
}
