import {Router} from "express";
import {checkToken} from "../../../token/checkToken";
import getPrivileges from "./get/getAdminPrivileges";

const userAdminGetRouter = Router();

userAdminGetRouter.get("/privileges",checkToken, getPrivileges);

export default userAdminGetRouter;
