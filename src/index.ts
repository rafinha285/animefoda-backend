import e from 'express'
import * as path from 'path'
import * as pg from "pg"
import * as fs from "node:fs";
import cors from "cors"
import {json, urlencoded} from "body-parser"
import cookie_parser from "cookie-parser"

import InitWebSocket from './modules/appWebSocket'
import {ErrorType, sendError} from "./functions/general/Error";
import sendFile from "./functions/general/File";
import Console from "./functions/general/Console";
import pgClient from './database/postgres'
import {BUILD_HTML, BUILD_PATH} from './config/pathConfig'
//rotas
import userPostRouter from './routes/user/userPostRouter'
import userGetRouter from './routes/user/userGetRouter'
import animeGetRouter from './routes/anime/animeGetRouter'
import animelistGetRouter from './routes/animelist/animelistGetRouter'
import episodesGetRouter from './routes/episodes/episodeRouter'
import episodeListPostRouter from "./routes/episodes/episodeListPostRouter";
import episodeListGetRouter from "./routes/episodes/episodeListGetRouter";
import animelistPostRouter from "./routes/animelist/animelistPostRouter";
import animelistPatchRouter from "./routes/animelist/animelistPatchRouter";
import animelistDeleteRouter from "./routes/animelist/animelistDeleteRouter";
import seasonGetRouter from "./routes/season/seasonGetRouter";
import commentsGetRouter from "./routes/comments/commentsGetRouter";
import commentsPostRouter from "./routes/comments/commentsPostRouter";

const app = e()

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cookie_parser())
app.use(cors())

InitWebSocket(app)

pg.defaults.poolSize = 5

app.use(async (req:e.Request,res:e.Response,next:e.NextFunction)=>{
    req.db = pgClient
    next()
})


//rotas comments
app.use("/comments/g/",commentsGetRouter)
app.use("/comments/p/",commentsPostRouter)
//rotas para usuario
app.use('/user/p/',userPostRouter)
app.use('/user/g/',userGetRouter)
//rotas para animelist
app.use('/user/animelist/g/',animelistGetRouter)
app.use('/user/animelist/p/',animelistPostRouter)
app.use('/user/animelist/patch/',animelistPatchRouter)
app.use('/user/animelist/delete/',animelistDeleteRouter)
//rotas para anime
app.use('/ani/g/',animeGetRouter)
//rotas para seasons
app.use('/season/g/',seasonGetRouter)
//rotas para o log de eps assistidos
app.use('/ep/user/p/',episodeListPostRouter)
//rota para pegar os eps do usuario
app.use('/ep/user/g/',episodeListGetRouter)
//rotas para episodios
app.use('/ep/g/',episodesGetRouter)


app.use(e.static(BUILD_PATH,{ maxAge: '1d' }))
//kkkkkk risos risos risonho
app.get('/easteregg',async(req:e.Request,res:e.Response)=>{
    res.redirect('https://youtu.be/xvFZjo5PgG0?si=UNy9hc1yJFPGlSz-')
})
app.get("/public-key",(req:e.Request,res:e.Response)=>{
    res.sendFile(path.join('E:\\main\\app\\backend\\secret\\public_key.pem'))
})
//para q todos os requests
app.get('*',(req:e.Request,res:e.Response)=>{
    try{
        // Console.log(BUILD_HTML)
        if(!fs.existsSync(BUILD_HTML)){
            Console.error(BUILD_HTML)
            return sendError(res,ErrorType.undefined)
        }
        sendFile().cssJs(res)
        res.sendFile(BUILD_HTML)
    }catch (err){
        Console.error(err)
        sendError(res,ErrorType.undefined)
    }
})

app.listen(4433,'0.0.0.0',()=>{
    Console.log(`http://0.0.0.0:4433`)
})
