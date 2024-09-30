import animeGetRouter from "../animeGetRouter";
import {ErrorType, sendError} from "../../../functions/general/Error";
import e from "express";

async function getProducers(req:e.Request,res:e.Response){
    try{
        let animeid = req.params.id
        let prod = await req.db.query(`
            WITH producer_ids AS (
                SELECT UNNEST(producers) AS producer_id
                FROM anime.anime
                WHERE id = $1
            )
            SELECT p.id, p.name
            FROM producer_ids pi
            JOIN anime.producers p ON pi.producer_id = p.id;
        `,[animeid])
        let cria = await req.db.query(`
            WITH producer_ids AS (
                SELECT UNNEST(creators) AS producer_id
                FROM anime.anime
                WHERE id = $1
            )
            SELECT p.id, p.name
            FROM producer_ids pi
            JOIN anime.creators p ON pi.producer_id = p.id;
        `,[animeid])
        let stud = await req.db.query(`
            WITH producer_ids AS (
                SELECT UNNEST(studios) AS producer_id
                FROM anime.anime
                WHERE id = $1
            )
            SELECT p.id, p.name
            FROM producer_ids pi
            JOIN anime.studios p ON pi.producer_id = p.id;
        `,[animeid])
        res.send({
            producers:prod.rows,
            creators:cria.rows,
            studios:stud.rows,
        })
    }catch(err){
        sendError(res,ErrorType.default,500,err)
    }
}
export default getProducers
