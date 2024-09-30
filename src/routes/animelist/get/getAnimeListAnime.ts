import animelistRouter from "../animelistRouter";
import {checkToken} from "../../../token/checkToken";
import {ErrorType, sendError} from "../../../functions/general/Error";
import {JwtUser} from "../../../types/Global";

animelistRouter.get("/:id",checkToken,async (req,res)=>{
    try{
        const {id} = req.params;
        res.json({success:true,response:(await req.db.query(`SELECT * FROM users.user_anime_list WHERE user_id = $1 AND anime_id = $2`,[(req.user as JwtUser)._id,id])).rows[0]})
    }catch(err){
        sendError(res,ErrorType.default,500,err);
    }
});
