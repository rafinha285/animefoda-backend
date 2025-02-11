import {Router} from "express";
import {checkToken} from "../../token/checkToken";
import newComment from "./post/newComment";

const commentsPostRouter = Router();

commentsPostRouter.post("/new/:pageId",checkToken,newComment);

export default commentsPostRouter;
