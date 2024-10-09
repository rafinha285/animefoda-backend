import * as e from "express";
import {UserToken} from "../types/Global";
import * as jwt from 'jsonwebtoken'
import { SECRET_KEY } from "../config/config.json";
import pgClient from "../database/postgres";
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
        const user = jwtResult as UserToken;
        await pgClient.query(`
            UPDATE users.users_sessions SET enabled = false WHERE user_id = $1 AND session_id = $2
        `,[user._id,user.session_id]);
        return true;
    }catch(err){
        throw err
    }
}
