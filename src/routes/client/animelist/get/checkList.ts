import animelistRouter from "../animelistRouter";
import {checkToken} from "../../../../token/checkToken";
import {ErrorType, sendError} from "../../../../functions/general/Error";
import {JwtUser} from "../../../../types/Global";

animelistRouter.get("/checklist/:id",checkToken,async (req,res)=>{
    try{
        const user = req.user as JwtUser;
        let result = await req.db.query(`SELECT COUNT(*)
            FROM users.user_anime_list
            WHERE user_id = $1
            AND anime_id = $2`,
            [user._id,req.params.id]);
        // Console.log(result)
        res.json({success:parseInt(result.rows[0].count) !== 0})
    }catch(err){
        sendError(res,ErrorType.default,500,err)
    }
})
