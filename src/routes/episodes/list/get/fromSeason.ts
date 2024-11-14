import e from 'express'
import {UserToken} from "../../../../types/Global";

export default async function fromSeason(req: e.Request, res: e.Response) {
    try{
        const user = req.user as UserToken
        const result = await req.db.query(`SELECT * FROM users.user_episode_list WHERE user_id = $1 AND anime_id = $2 AND season_id = $3`,
            [user._id,req.params.id,req.params.seasonId])
        res.send(result.rows)
    }catch(e){
        console.error(e)
    }
}
