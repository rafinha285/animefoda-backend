import {Router} from "express";
import getAllAnimes from "./get/allAnimes";

const animeAdminGetRouter = Router();

animeAdminGetRouter.get("/all",getAllAnimes);

export default animeAdminGetRouter;
