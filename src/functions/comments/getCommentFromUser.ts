import {Pool} from "pg";
import {Comment} from "../../types/Comment";

export default async function getCommentFromUser(db:Pool,user_id:string):Promise<Comment[]>{
    try{
        return (await db.query("SELECT * FROM users.comments WHERE user_id = $1")).rows
    }catch(err){
        throw err;
    }
}
