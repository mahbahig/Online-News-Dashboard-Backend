import { Router } from "express";
import * as UC from "./user.controller.js";
import * as UV from "./user.validator.js";
import { validation } from "../../middleware/validation.js";

const userRouter = Router();

userRouter.post("/signup", validation(UV.signupSchema), UC.signup)

export default userRouter;