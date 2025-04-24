import { Hono } from "hono";
import AuthController from "../../controllers/auth/index.js";
import {
  registerUserSchema,
  loginUserSchema,
} from "../../schemas/auth/index.js";
import { zValidatorWrapper } from "../../utils/zValidatorWrapper.js";
import { authMiddleware } from "../../middlewares/auth/index.js";

const authRoute = new Hono();

authRoute.post(
  "/auth/register",
  zValidatorWrapper("json", registerUserSchema),
  AuthController.register
);

authRoute.post(
  "/auth/login",
  zValidatorWrapper("json", loginUserSchema),
  AuthController.login
);

authRoute.delete("/auth/logout", authMiddleware, AuthController.logout);

export default authRoute;
