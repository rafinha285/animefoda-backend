import * as express from "express";
import {checkToken} from "../../../token/checkToken";
import getAnimelist from "./get/getAnimelist";
import getAnimeListAnime from "./get/getAnimeListAnime";
const animeListRouter = express.Router();
animeListRouter.get('/', checkToken, getAnimelist)
animeListRouter.get("/checklist/:id",checkToken,checkToken)
animeListRouter.get("/:id",checkToken,getAnimeListAnime)
export default animeListRouter;
