import { Router } from "express";
import * as NC from "./news.controller.js";
import * as NV from "./news.validator.js";
import { validation } from "../../middleware/validation.js";


const newsRouter = Router();

newsRouter.get("/mostPopular", NC.mostPopular);
newsRouter.get("/searchNews", NC.searchNews);
newsRouter.post("/favoriteArticle", validation(NV.favoriteArticleSchema), NC.favoriteArticle);
newsRouter.get("/favorites/:id", NC.favorites);

export default newsRouter;