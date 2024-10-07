import deleteToken from "../../../token/deleteToken";
import Console from "../../../functions/general/Console";
import {ErrorType, sendError} from "../../../functions/general/Error";
import e from "express";

async function logout (req:e.Request,res:e.Response){
    try{
        //TODO fazer um jeito de o jwt destruir o token quando ele sai pelo logout
        // provavelmente mais facil e seguro fazer no pg, tem q ver se nao vai usar muita memoria para isso
        await deleteToken(req)
        Console.log('logout',req.user)
        res.clearCookie('token')
        res.json({success:true,message:"Logout successful"})
    }catch(err){
        sendError(res,ErrorType.default,500,err)
    }

}
export default logout;
