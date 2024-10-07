import {Router} from "express";
import {checkToken} from "../../token/checkToken";
import deleteAnimelist from "./delete/delete";

const animelistDeleteRouter = Router();

animelistDeleteRouter.delete("/:id",checkToken, deleteAnimelist);

export default animelistDeleteRouter;
