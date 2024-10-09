import * as jwt from "jsonwebtoken"
import e from 'express';
import { Pool, PoolClient } from "pg";

declare global{
    namespace Express {
        interface Request{
            db:Pool
            user?:JwtUser | jwt.JwtPayload |string
        }
    }
}
export interface JwtUser {
    _id: string;
    username: string;
    user_agent:string;
    expires_at:Date;
    time_zone:string;
    web_gl_vendor:string;
    web_gl_renderer:string;
    ip_address:string;
    session_id:string;
}
export interface UserToken{
    _id: string;
    username: string;
    expires_at:Date;
    session_id:string;
}
interface TokenRequest extends e.Request{
    user?:UserToken | jwt.JwtPayload |string
}
