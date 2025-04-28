import { Context, Next } from "hono";
import { createMiddleware } from "hono/factory";
import { getCookie } from "hono/cookie";
import { HTTPException } from "hono/http-exception";
import { verify } from "hono/jwt";
import env from "../../configs/environment";
export const authMiddleware = createMiddleware(
  async (c: Context, next: Next) => {
    try {
      const token = getCookie(c, "accessToken");
      if (!token) {
        throw new HTTPException(401, {
          message: "Unauthorized",
        });
      }
      const isValidToken = await verify(token, env.JWT_SECRET);
      if (!isValidToken) {
        throw new HTTPException(401, {
          message: "Unauthorized",
        });
      }
      c.set("user", isValidToken);
      await next();
    } catch (error) {
      if (error instanceof HTTPException) {
        throw error;
      } else {
        throw new HTTPException(401, {
          message: "Unauthorized",
        });
      }
    }
  }
);
