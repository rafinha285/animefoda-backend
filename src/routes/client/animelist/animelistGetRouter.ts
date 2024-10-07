import * as express from "express";
import {checkToken} from "../../../token/checkToken";
import checkList from "./get/checkList";
import getAnimelist from "./get/getAnimelist";
import getAnimeListAnime from "./get/getAnimeListAnime";
const animelistGetRouter = express.Router();

animelistGetRouter.get("/checklist/:id", checkToken,checkList)
animelistGetRouter.get("/",checkToken,getAnimelist)
animelistGetRouter.get("/:id",checkToken,getAnimeListAnime)

export default animelistGetRouter;
