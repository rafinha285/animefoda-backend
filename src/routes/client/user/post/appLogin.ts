import userPostRouter from "../userPostRouter";
import e from "express";
import {ErrorType, sendError} from "../../../../functions/general/Error";

async function appLogin (req:e.Request,res:e.Response){
    try{
        const {email,password} = req.body;
        let result = await req.db.query(`
            WITH hashed_password AS (
                SELECT users.crypt($1,salt) AS hash
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
        // const token = jwt.sign(tokenInfo,secretKey,{expiresIn:"1d"})
        // res.cookie('token',token,{httpOnly:true,secure:true})
        // res.send({success:true,message:"Login Successful",token})
    }catch(err){
        switch(err){
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
export default appLogin;
