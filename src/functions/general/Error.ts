import * as e from 'express'
import Console from './Console'

export enum ErrorType {
    NotId ,
    Exist ,
    undefined ,
    noToken,
    invalidToken,
    invalidReCaptcha,
    invalidPassOrEmail,
    invalidEmail,
    isLoggedElsewhere,
    unauthorized,
    notFound,
    badRequest,
    default
}
export function sendError(res:e.Response,errorType:ErrorType = ErrorType.default,status:number = 500,menssage:any = ""){
    function error(res:e.Response,status:number,menssage:string){
        Console.error(menssage)
        res.status(status).json(menssage)
    }
    function notFound(res:e.Response){
        res.status(404).json({success:false,message:"Not Found"})
    }
    function badRequest(res:e.Response){
        res.status(400).json({success:false,message:"Bad Request"})
    }
    function notId(res:e.Response){
        Console.error("The ids are not a valid ObjectId or does not exist")
        res.status(400).json({success:false,message:"The ids are not a valid ObjectId or does not exist"})
    }
    function exist(res:e.Response){
        Console.error("The anime already exists")
        res.status(409).json({success:false,message:"The anime already exists"})
    }
    function und(res:e.Response){
        Console.error("Is undefined")
        res.status(404).json({success:false,message:"Is undefined"})
    }
    function noToken(res:e.Response){
        Console.log("No token is provided")
        res.status(401).json({success:false,message:"No token is provided"})
    }
    function invalidToken(res:e.Response){
        Console.log("Invalid Token")
        res.status(403).json({success:false,mensagem:"Invalid Token"})
    }
    function invalidReCaptcha(res:e.Response){
        Console.error("Falha na verificação do reCAPTCHA")
        res.status(400).json({success:false,message:"Falha na verificação do reCAPTCHA"})
    }
    function invalidPassOrEmail(res:e.Response){
        res.status(401).json({success:false,message:"Falha ao logar, senha ou email incorretos"})
    }
    function invalidEmail(res:e.Response){
        res.status(400).json({success:false,message:"Email Invalid"})
    }
    function isLoggedElsewhere(res:e.Response){
        res.status(409).json({success:false,message:"Usuário já está logado em outro lugar."})
    }
    function unauthorized(res:e.Response){
        res.clearCookie("token")
        res.status(401).json({success:false,message:"Essa operação não é autorizada"})
    }
    switch(errorType){
        case ErrorType.NotId:
            notId(res)
            break
        case ErrorType.notFound:
            notFound(res)
            break
        case ErrorType.badRequest:
            badRequest(res)
            break
        case ErrorType.Exist:
            exist(res)
            break
        case ErrorType.undefined:
            und(res)
            break
        case ErrorType.noToken:
            noToken(res)
            break
        case ErrorType.invalidToken:
            invalidToken(res)
            break
        case ErrorType.invalidReCaptcha:
            invalidReCaptcha(res)
            break
        case ErrorType.invalidPassOrEmail:
            invalidPassOrEmail(res)
            break
        case ErrorType.invalidEmail:
            invalidEmail(res)
            break
        case ErrorType.isLoggedElsewhere:
            isLoggedElsewhere(res)
            break
        case ErrorType.unauthorized:
            unauthorized(res)
            break
        case ErrorType.default:
            error(res,status,menssage)
            break
    }
}
