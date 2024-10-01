import userPostRouter from "../userPostRouter";
import Console from "../../../../functions/general/Console";
import {ErrorType, sendError} from "../../../../functions/general/Error";
import {RECAPTCHA_KEY} from "../../../../config/config.json"
import {v4 as uuidv4} from "uuid"
import e from "express";

async function newUser(req:e.Request,res:e.Response){
    try{
        Console.log(req.body)
        const { email, name, surname, username, birthDate, password, recaptchaToken, salt } = req.body;
        if(!recaptchaToken){
            throw ErrorType.noToken
        }
        const emailRegex = /\S+@\S+\.\S+/;
        if(!emailRegex.test(email)){
            throw ErrorType.invalidEmail
        }
        const response = await fetch('https://www.google.com/recaptcha/api/siteverify',{
            method:"POST",
            headers:{
                'Content-Type':'application/x-www-form-urlencoded',
            },
            body: `secret=${RECAPTCHA_KEY}&response=${recaptchaToken}`
        })
        const data = await response.json()
        if(data.success){
            var _id = uuidv4()
            const totalAnime:number = 0;
            const totalAnimeWatching:number = 0;
            const totalAnimeCompleted:number = 0;
            const totalAnimeDropped:number = 0;
            const totalAnimePlanToWatch:number = 0;
            const totalAnimeOnHold = 0;
            const totalAnimeLiked:number = 0;
            const totalManga:number = 0;
            const totalMangaReading:number = 0;
            const totalMangaCompleted:number = 0;
            const totalMangaDropped:number = 0;
            const totalMangaPlanToRead:number = 0;
            const totalMangaOnHold = 0
            const totalMangaLiked:number = 0
            Console.log([
                _id, username, email, password, name, surname, new Date(birthDate).toISOString(),
                totalAnime, totalAnimeWatching, totalAnimeCompleted, totalAnimeDropped, totalAnimePlanToWatch,
                totalManga, totalMangaReading, totalMangaCompleted, totalMangaDropped, totalMangaPlanToRead,
                totalAnimeLiked || [],  // Se totalAnimeLiked for nulo, usa um array vazio
                totalMangaLiked || [],   // Se totalMangaLiked for nulo, usa um array vazio,
                salt,
                totalAnimeOnHold,
                totalMangaOnHold
            ])
            const result = await req.db.query(
                `INSERT INTO users.users 
                (
                    _id, 
                    username, 
                    email, 
                    password, 
                    name, 
                    surname, 
                    birthdate, 
                    totalanime, 
                    totalanimewatching, 
                    totalanimecompleted, 
                    totalanimedropped, 
                    totalanimeplantowatch, 
                    totalmanga, 
                    totalmangareading,
                    totalmangacompleted, 
                    totalmangadropped, 
                    totalmangaplantoread, 
                    totalAnimeLiked, 
                    totalMangaLiked,
                    salt,
                    totalanimeonhold,
                    totalmangaonhold
                ) 
                VALUES 
                (
                    $1, 
                    $2, 
                    $3, 
                    $4, 
                    $5, 
                    $6, 
                    $7, 
                    $8, 
                    $9, 
                    $10, 
                    $11, 
                    $12, 
                    $13, 
                    $14, 
                    $15, 
                    $16, 
                    $17, 
                    $18, 
                    $19, 
                    $20, 
                    $21,
                    $22
                ) RETURNING *`,
                [
                    _id, username, email, password, name, surname, new Date(birthDate).toISOString(),
                    totalAnime, totalAnimeWatching, totalAnimeCompleted, totalAnimeDropped, totalAnimePlanToWatch,
                    totalManga, totalMangaReading, totalMangaCompleted, totalMangaDropped, totalMangaPlanToRead,
                    totalAnimeLiked || [],  // Se totalAnimeLiked for nulo, usa um array vazio
                    totalMangaLiked || [],   // Se totalMangaLiked for nulo, usa um array vazio,
                    salt,
                    totalAnimeOnHold,
                    totalMangaOnHold
                ]
            );
            Console.log(result)
            if(result.rows.length !== 0){
                res.status(200).json({success:true,message: 'Usuário registrado com sucesso' })
            }else{
                throw "Erro ao criar a conta"
            }
        }else{
            Console.log("GAY")
            throw ErrorType.invalidReCaptcha
        }
    }catch(err:any|ErrorType){
        switch(err){
            case ErrorType.noToken:
                sendError(res,ErrorType.noToken);
                break
            case ErrorType.invalidToken:
                sendError(res,ErrorType.invalidReCaptcha)
                break
            case ErrorType.invalidEmail:
                sendError(res,ErrorType.invalidEmail)
                break
            default:
                sendError(res,ErrorType.default,500,err)
        }
    }
}
export default newUser;
