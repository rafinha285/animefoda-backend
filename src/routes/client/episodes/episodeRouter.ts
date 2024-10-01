import e from "express";
import getCaptions from "./get/caption";
import getEpisode from "./get/episode";
import getEpisodesFromSeason from "./get/fromSeason";
import getReleases from "./get/releases";

export const episodesGetRouter = e.Router();

episodesGetRouter.get("/lan",getReleases);
episodesGetRouter.get("/caption/:aniid/:seasonid/:epid/:lang",getCaptions);
episodesGetRouter.get("/season/:animeid/:seasonid", getEpisodesFromSeason);
episodesGetRouter.get("/:animeId/:seasonId/:epId", getEpisode);

export default episodesGetRouter;
