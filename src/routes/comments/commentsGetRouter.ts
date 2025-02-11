import {Router} from "express";
import commentsFromPageId from "./get/commentsFromPageId";

const commentsGetRouter = Router();

commentsGetRouter.get("/page/:id",commentsFromPageId)

export default commentsGetRouter;
