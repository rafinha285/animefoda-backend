import {Router} from "express";
import getAgenda from "./get/agenda";
import getAnime from "./get/anime";
import getCreators from "./get/creators";
import getAnimeFromSeason from "./get/fromSeason";
import getProducer from "./get/producer";
import getGenres from "./get/genres";
import getProducers from "./get/producers";
import getReleases from "./get/releases";
import getSearch from "./get/search";
import getSeasons from "./get/seasons";
import getStudio from "./get/studio";
import getCharacters from "./get/character";

const animeGetRouter = Router();

animeGetRouter.get("/lan" ,getReleases);
animeGetRouter.get("/search/:s",getSearch);
animeGetRouter.get('/season/:id/:seasonId',getAnimeFromSeason);
animeGetRouter.get("/seasons/:id",getSeasons);
animeGetRouter.get("/gen/:gen",getGenres);
animeGetRouter.get('/prods/:id',getProducers);
animeGetRouter.get("/prod/:prod",getProducer);
animeGetRouter.get("/crea/:cria",getCreators);
animeGetRouter.get("/stud/:stud",getStudio);
animeGetRouter.get("/agenda",getAgenda);
animeGetRouter.get("/characters/:id",getCharacters);
animeGetRouter.get("/:id",getAnime);

export default animeGetRouter;
