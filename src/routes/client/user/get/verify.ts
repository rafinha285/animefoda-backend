import userGetRouter from "../userGetRouter";
import {checkToken} from "../../../token/checkToken";
import e from "express";

export default function checkUser (req:e.Request,res:e.Response){
    res.json({success:true})
}
