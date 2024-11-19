import {Router} from "express";
import {checkToken} from "../../token/checkToken";
import getEpisodeList from "./list/get/episode";
import getEpisodeListFromSeason from "./list/get/fromSeason";

const episodeListGetRouter = Router();

episodeListGetRouter.get("/season/:id/:seasonId",checkToken,getEpisodeListFromSeason)
episodeListGetRouter.get("/:id/:epId",checkToken,getEpisodeList);

export default episodeListGetRouter;
