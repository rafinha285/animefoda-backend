import {Router} from "express";
import {checkToken} from "../../token/checkToken";
import getUser from "./get/user";
import checkUser from "./get/verify";
import getPrivileges from "./get/privileges";

const userGetRouter = Router();

userGetRouter.get("/verify",checkToken,checkUser);
userGetRouter.get("/privileges",checkToken,getPrivileges)
userGetRouter.get("/",checkToken,getUser);

export default userGetRouter;
