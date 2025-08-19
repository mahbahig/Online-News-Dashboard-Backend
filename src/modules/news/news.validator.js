import Joi from "joi";

export const favoriteArticleSchema = {
    body: Joi.object({
        userId: Joi.string().required(),
        title: Joi.string().required(),
        coverImg: Joi.string().required(),
        author: Joi.string().required(),
        abstract: Joi.string().required(),
        url: Joi.string().required(),
        source: Joi.string().required(),
    }).required(),
};