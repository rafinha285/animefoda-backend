import {Router} from "express";
import commentsFromId from "./get/commentsFromId";

const commentsGetRouter = Router();

commentsGetRouter.get("/page/:id",commentsFromId)

export default commentsGetRouter;
