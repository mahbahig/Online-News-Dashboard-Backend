import { Router } from "express";
import * as UC from "./user.controller.js";
import * as UV from "./user.validator.js";
import { validation } from "../../middleware/validation.js";
import { authentication } from "../../middleware/authentication.js";

const userRouter = Router();

userRouter.post("/signup", validation(UV.signupSchema), UC.signup);
userRouter.post("/login", validation(UV.loginSchema), UC.login);
userRouter.get("/:id", authentication, UC.getUser);


export default userRouter;