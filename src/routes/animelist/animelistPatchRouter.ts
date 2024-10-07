import {Router} from "express";
import {checkToken} from "../../token/checkToken";
import updateAnimelist from "./patch/update";

const animelistPatchRouter = Router();

animelistPatchRouter.patch("/update",checkToken,updateAnimelist);

export default animelistPatchRouter;
