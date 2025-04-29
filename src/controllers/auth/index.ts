import type { Context } from "hono";

import { deleteCookie, setCookie } from "hono/cookie";

import AuthService from "../../services/auth";

class AuthControllerClass {
    async login(c: Context) {
        try {
            const data = c.req.valid("json" as never);
            const user = await AuthService.login(data);
            setCookie(c, "accessToken", user.accessToken, {
                httpOnly: true,
                sameSite: "strict",
                secure: true,
            });
            return c.json({
                data: user,
                message: "User registered successfully",
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
    async register(c: Context) {
        try {
            const data = c.req.valid("json" as never);
            const user = await AuthService.createAuth(data);

            return c.json({
                data: user,
                message: "User registered successfully",
            });
        } catch (error) {
            throw error;
        }
    }
}

const AuthController = new AuthControllerClass();
export default AuthController;
