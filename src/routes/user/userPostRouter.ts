import {Router} from "express";
import appLogin from "./post/appLogin";
import login from "./post/login";
import logout from "./post/logout";
import newUser from "./post/newUser";

const userPostRouter = Router();

userPostRouter.post('/app/login', appLogin);
userPostRouter.post("/login",login);
userPostRouter.post('/logout',logout);
userPostRouter.post('/new/user',newUser);

export default userPostRouter;
