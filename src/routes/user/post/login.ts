import e from "express";
import {ErrorType, sendError} from "../../../functions/general/Error";
import {RECAPTCHA_KEY} from "../../../config/config.json";
import insertToken from "../../../token/insertToken";

async function login(req:e.Request,res:e.Response){
    try{
        console.log(typeof ErrorType)
        // console.log(decryptData(req.body.encryptedData))
        const {email,password,recaptchaToken,userAgent,timeZone,WebGLVendor,WebGLRenderer} = req.body;
        if(!recaptchaToken){
            throw ErrorType.invalidReCaptcha
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
        let result = await req.db.query(`
                WITH hashed_password AS (
                    SELECT users.crypt($1, salt) AS hash
                    FROM users.users
                    WHERE email = $2
                )
                SELECT * FROM users.users
                WHERE email = $2 AND password = (SELECT hash FROM hashed_password)
                `,[password,email])
        // Console.log(result.rows)
        if(result.rows.length < 1){
            throw ErrorType.invalidPassOrEmail
        }
        let tokenInfo ={
            _id:result.rows[0]._id,
            username:result.rows[0].username,
            user_agent:userAgent,
            time_zone:timeZone,
            web_gl_vendor:WebGLVendor,
            web_gl_renderer:WebGLRenderer,
        }
        const token = await insertToken(req,tokenInfo)
        // const token = jwt.sign(tokenInfo,await importPrivateKey(),{expiresIn:"1d"})
        res.cookie('token',token,{httpOnly:true,secure:true})
        res.send({success:true,message:"Login Successful",token})
        }else{
            throw ErrorType.invalidReCaptcha
        }
    }catch(err){
        switch(err){
            case ErrorType.invalidReCaptcha:
                sendError(res,ErrorType.invalidReCaptcha)
                break
            case ErrorType.invalidToken:
                sendError(res,ErrorType.invalidToken)
                break
            case ErrorType.noToken:
                sendError(res,ErrorType.noToken)
                break
            case ErrorType.invalidPassOrEmail:
                sendError(res,ErrorType.invalidPassOrEmail)
                break
            default:
                sendError(res,ErrorType.default,500,err)
                break
        }
    }
}
export default login;
