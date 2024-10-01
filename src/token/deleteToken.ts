import * as e from "express";
import { JwtUser } from "../types/Global";
import * as jwt from 'jsonwebtoken'
import { SECRET_KEY } from "../config/config.json";
import pgClient from "../database/pg";
import { ErrorType } from "../functions/general/Error";
export default async function deleteToken(req:e.Request) {
    try{
        const tokenHeader = req.headers.authorization?.split(" ")[1];
        const tokencookie = req.cookies.token
        const token = tokenHeader || tokencookie;
        if(!token){
            throw ErrorType.noToken
        }
        let jwtResult = jwt.verify(token,SECRET_KEY);
        const user = jwtResult as JwtUser;
        await pgClient.query(`
            DELETE FROM users.users_sessions
                WHERE user_id = $1 AND user_agent = $2;
        `,[user._id,user.user_agent]);
        return true;
    }catch(err){
        throw err
    }
}
