import e from 'express'
import * as path from 'path'
import {json, urlencoded} from "body-parser"
import cookie_parser from "cookie-parser"
import userPostRouter from './routes/user/userPostRouter'
import userGetRouter from './routes/user/userGetRouter'
import { BUILD_HTML, BUILD_PATH } from './config/pathConfig'
import pgClient from './database/pg'
import * as pg from "pg"
import animeGetRouter from './routes/anime/animeGetRouter'
import animeListRouter from './routes/animelist/animelistRouter'
import episodesGetRouter from './routes/episodes/episodeRouter'
import episodeListPostRouter from "./routes/episodes/episodeListPostRouter";
import episodeListGetRouter from "./routes/episodes/episodeListGetRouter";
import sendFile from "./functions/general/File";
import Console from "./functions/general/Console";

const app = e()

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cookie_parser())

pg.defaults.poolSize = 5

app.use(async (req:e.Request,res:e.Response,next:e.NextFunction)=>{
    req.db = pgClient
    next()
})


//rotas para usuario
app.use('/user/p/',userPostRouter)
app.use('/user/g/',userGetRouter)
//rotas para animelist
app.use('/user/animelist',animeListRouter)
//rotas para anime
app.use('/ani/g/',animeGetRouter)
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
    sendFile().cssJs(res)
    Console.log(BUILD_HTML)
    res.sendFile(BUILD_HTML)
})

app.listen(4433,'0.0.0.0',()=>{
    Console.log(`http://0.0.0.0:4433`)
})