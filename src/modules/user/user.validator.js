import Joi from "joi";
import { generalRules } from "../../utils/index.js";
import { userGender } from "../../db/models/user.model.js";

export const signupSchema = {
    body: Joi.object({
        name: Joi.string().min(3).max(15).required(),
        email: generalRules.email.required(),
        age: Joi.number().min(18).max(60),
        gender: Joi.string().valid(userGender.female, userGender.male),
        password: generalRules.password.required(),
        confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
        phone: Joi.string()
    }).required()
};
export const loginSchema = {
    body: Joi.object({
        email: generalRules.email.required(),
        password: generalRules.password.required(),
    }).required()
};