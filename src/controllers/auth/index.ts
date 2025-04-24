import type { Context } from "hono";
import AuthService from "../../services/auth";
import { setCookie, deleteCookie } from "hono/cookie";

class Auth {
  async register(c: Context) {
    try {
      const data = c.req.valid("json" as never);
      const user = await AuthService.createAuth(data);

      return c.json({
        message: "User registered successfully",
        data: user,
      });
    } catch (error) {
      throw error;
    }
  }

  async login(c: Context) {
    try {
      const data = c.req.valid("json" as never);
      const user = await AuthService.login(data);
      setCookie(c, "accessToken", user.accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      });
      return c.json({
        message: "User registered successfully",
        data: user,
      });
    } catch (error) {
      throw error;
    }
  }
  async logout(c: Context) {
    try {
      deleteCookie(c, "accessToken");
      return c.json({
        message: "User logged out successfully",
      });
    } catch (error) {
      throw error;
    }
  }
}

const AuthController = new Auth();
export default AuthController;
