import e from "express";
import {JwtUser} from "../../../../types/Global";

export default async function getPrivileges(req:e.Request,res:e.Response){
    let priv = (await req.db.query("SELECT array_to_json(role) as role, superuser FROM users.users WHERE _id = $1",[(req.user as JwtUser)._id])).rows[0]
    res.json({success:true,role:priv.role,super:priv.superuser})
}
