import animelistRouter from "../animelistRouter";
import {checkToken} from "../../../../token/checkToken";
import {JwtUser} from "../../../../types/Global";
import {ErrorType, sendError} from "../../../../functions/general/Error";

animelistRouter.post("/insert/:id",checkToken,async (req,res)=>{
    try{
        const user = req.user as JwtUser;
        const ani = (await req.db.query("SELECT * FROM anime.anime WHERE id = $1",[req.params.id])).rows[0];
        await req.db.query(`
            INSERT INTO users.user_anime_list(
                user_id, anime_id, status, name, start_date, priority)
                VALUES ($1, $2, $3, $4, $5, $6);
        `,[user._id,req.params.id,'watching',ani.name,new Date(),"LOW"]);
        // console.log('updateNumbers',user)
        // AnimelistEmitter.emitUpdateNumbers((req.user as JwtUser)._id,null)
        res.json({success:true,message:`Anime adicionado a lista ${user._id}`})
    }catch(err){
        sendError(res,ErrorType.default,500,err);
    }
})
