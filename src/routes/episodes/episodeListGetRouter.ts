import {Router} from "express";
import {checkToken} from "../../../token/checkToken";
import getEpisodeList from "./list/get/episode";

const episodeListGetRouter = Router();

episodeListGetRouter.get("/:id/:epId",checkToken,getEpisodeList);

export default episodeListGetRouter;
