import animelistRouter from "../animelistRouter";
import {checkToken} from "../../../../token/checkToken";
import {JwtUser} from "../../../../types/Global";
import {ErrorType, sendError} from "../../../../functions/general/Error";

animelistRouter.get("/",checkToken,async (req,res)=>{
    try{
        var response = await req.db.query(`
            SELECT user_id, anime_id, status, name, start_date, finish_date, rate, priority, id
            FROM users.user_anime_list WHERE user_id = $1;
            `,[(req.user as JwtUser)._id])

        res.send(response.rows)
    }catch(err){
        sendError(res,ErrorType.default,500,err)
    }
});
