import {Router} from "express";
import {checkToken} from "../../token/checkToken";
import insertEpisodeList from "./list/post/insertEpisode";

const episodeListPostRouter= Router();

episodeListPostRouter.post("/",checkToken, insertEpisodeList);

export default episodeListPostRouter;
