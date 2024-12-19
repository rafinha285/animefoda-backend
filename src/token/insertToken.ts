import * as e from "express";
import * as jwt from 'jsonwebtoken'
import { SECRET_KEY } from "../config/config.json";
import {JwtUser, UserToken} from "../types/Global";
import {QueryResult} from "pg";
export default async function insertToken(req:e.Request,userR:{
    _id:string,
    username:string,
    user_agent:string,
    time_zone:string,
    web_gl_vendor:string,
    web_gl_renderer:string,
}):Promise<{token:string,session_id:string}>{
    try{
        const expires_at = new Date()
        expires_at.setDate(expires_at.getDate()+60)

        let result:QueryResult<JwtUser> = await req.db.query(`INSERT INTO users.users_sessions (
                user_id, expires_at, user_agent, time_zone, web_gl_vendor, web_gl_renderer
            ) VALUES ($1, $2, $3, $4, $5, $6) 
            RETURNING *`
            ,[
                userR._id,
                expires_at,
                userR.user_agent,
                userR.time_zone,
                userR.web_gl_vendor,
                userR.web_gl_renderer,
            ]);
        if(result.rows.length !== 0){
            let row = result.rows[0];
            let user:UserToken = {
                _id:userR._id,
                username:userR.username,
                expires_at:expires_at,
                session_id:row.session_id,
            }
            // console.log(user)
            let jwtToken = jwt.sign(user,SECRET_KEY,{'expiresIn':"60 days"})
            return {token:jwtToken,session_id:user.session_id}
        }else{
            throw new Error("Erro ao iniciar sessão")
        }
    }catch(err){
        throw err
    }
}
