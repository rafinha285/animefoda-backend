import {Router} from "express";
import {checkToken} from "../../token/checkToken";
import insertAnimelist from "./post/insert";
import updateRating from "./post/rating";

const animelistPostRouter = Router();

animelistPostRouter.post("/insert/:id",checkToken,insertAnimelist);
animelistPostRouter.post("/rating/:id",checkToken,updateRating);

export default animelistPostRouter;
