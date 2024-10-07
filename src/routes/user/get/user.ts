import userGetRouter from "../userGetRouter";
import {checkToken} from "../../../../token/checkToken";
import {JwtUser} from "../../../../types/Global";
import {ErrorType, sendError} from "../../../../functions/general/Error";
import e from "express";

async function getUser(req:e.Request,res:e.Response){
    try{
        let result = await req.db.query(`
        SELECT 
            _id,
            name,
            surname,
            username,
            birthdate,
            email,
            totalanime,
            totalanimewatching,
            totalanimecompleted,
            totalanimedropped,
            totalanimeplantowatch,
            array_to_json(role) as role,
            totalmanga,
            totalmangareading,
            totalmangacompleted,
            totalmangadropped,
            totalmangaplantoread,
            totalanimeliked,
            totalmangaliked,
            totalanimeonhold,
            totalmangaonhold
        FROM users.users
        WHERE _id = $1;
    `,[(req.user as JwtUser)._id])
        if(result.rows.length < 1){
            throw ErrorType.invalidPassOrEmail
        }
        res.send(result.rows[0])
    }catch(err){
        switch(err){
            case ErrorType.noToken:
                sendError(res,ErrorType.noToken)
                break
            default:
                sendError(res,ErrorType.default,500,err)
                break
        }
    }
}
export default getUser
