import e from "express";

export default function checkUser (req:e.Request,res:e.Response){
    console.log("cu")
    res.json({success:true})
}
