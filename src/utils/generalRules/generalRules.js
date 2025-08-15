import Joi from "joi";

export const generalRules = {
    email: Joi.string().email(),
    password: Joi.string().min(3).max(30),
}