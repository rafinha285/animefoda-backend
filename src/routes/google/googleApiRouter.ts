import {Router} from "express";
import googleLogin from "./post/googleLogin";

const googleApiRouter = Router();

googleApiRouter.post("/google-login",googleLogin)

export default googleApiRouter;
