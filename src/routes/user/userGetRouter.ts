import {Router} from "express";
import {checkToken} from "../../../token/checkToken";
import getUser from "./get/user";
import checkUser from "./get/verify";

const userGetRouter = Router();

userGetRouter.get("/",checkToken,getUser);
userGetRouter.get("/verify",checkToken,checkUser);

export default userGetRouter;
