import { Pool } from "pg";
// import {User} from "../../types/User";
// import { ErrorType, sendError } from "../general/Error";
//inserir user pelo google
export default async function insertUser(db:Pool,user:{
    email:string,
    username:string,
    hash:string,
    salt:string
}): Promise<void> {
    try{
        db.query(`INSERT INTO users.users (
            
        )`)
    }catch(err){
        throw err;
    }
}
