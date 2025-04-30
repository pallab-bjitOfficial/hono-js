import { Hono } from "hono";

import AuthController from "../../controllers/auth";
import { authMiddleware } from "../../middlewares/auth";
import { loginUserSchema, registerUserSchema } from "../../schemas/auth";
import { zValidatorWrapper } from "../../utils/zValidatorWrapper";

const authRoute = new Hono();

authRoute
    .post(
        "/register",
        zValidatorWrapper("json", registerUserSchema),
        AuthController.register
    )
    .post(
        "/login",
        zValidatorWrapper("json", loginUserSchema),
        AuthController.login
    )
    .delete("/logout", authMiddleware, AuthController.logout);

export default authRoute;
