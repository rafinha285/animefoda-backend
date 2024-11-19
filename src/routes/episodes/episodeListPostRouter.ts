import {Router} from "express";
import {checkToken} from "../../token/checkToken";
import insertEpisodeList from "./list/post/insertEpisode";
import seenEpisode from "./list/post/seenEpisode";

const episodeListPostRouter= Router();

episodeListPostRouter.post("/seen/:aniId/:seasonId/:epId",checkToken, seenEpisode);
episodeListPostRouter.post("/",checkToken, insertEpisodeList);

export default episodeListPostRouter;
