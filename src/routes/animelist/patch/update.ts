import {ErrorType, sendError} from "../../../functions/general/Error";
import Console from "../../../functions/general/Console";
import {JwtUser} from "../../../types/Global";
import {checkToken} from "../../../token/checkToken";
import animeListRouter from "../animelistRouter";

animeListRouter.patch("/update",checkToken,async(req,res)=>{
    try{
        const {anime_id,finish_date,priority,start_date,status} = req.body;
        Console.log(anime_id,finish_date,priority,start_date,status)
        let result = await req.db.query(`
            UPDATE users.user_anime_list
            SET
                status=$3,
                start_date=$4,
                finish_date=$5,
                priority=$6
            WHERE anime_id = $1 AND user_id = $2;
        `,[anime_id,(req.user as JwtUser)._id,status,start_date,finish_date === null && status === 'completed'?new Date():finish_date,priority])
        Console.log(result)
        res.json({success:true,message:"Atualizado com sucesso"})
    }catch(err){
        sendError(res,ErrorType.default,500,err)
    }
})
