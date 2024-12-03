import e from "express";
import {ErrorType, sendError} from "../../../functions/general/Error";
import admin from '../../../functions/admin/firebase'
import insertUser from "../../../functions/user/insertUser";
import insertToken, { userRequest } from "../../../token/insertToken";

export default async function googleLogin(req:e.Request, res:e.Response) {
    const { idToken } = req.body;
    try{
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        const user = await admin.auth().getUser(decodedToken.uid)
        const email = decodedToken.email;
        const username = user.displayName??"";
        const isInDatabase = await req.db.query("SELECT COUNT(*) FROM users.users WHERE email = $1 OR username = $2;",[email,username]);
        if(!isInDatabase){
            //inserir na database o usuario com as coisas do google
        }else{
            //aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            let {_id} =  (await req.db.query("SELECT _id FROM users.users WHERE email = $1 AND username = $2",[email,username])).rows[0];
            let userRequest:userRequest = {
                _id,
                username,
            }
            insertToken(req,)
        }
    }catch(err){
        sendError(res,ErrorType.undefined)
    }
}
