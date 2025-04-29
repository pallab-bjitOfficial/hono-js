import { HTTPException } from "hono/http-exception";

import AuthRepository from "../../repository/auth";
import { IJWTPayload } from "../../types/auth";
import { generateAccessToken } from "../../utils";

class AuthServiceClass {
    async createAuth(data: any) {
        const newAuth = await AuthRepository.createAuth(data);
        if (!newAuth) {
            throw new HTTPException(500, {
                message: "Error creating user",
            });
        }
        newAuth.password = "";
        return newAuth;
    }

    async login(data: any) {
        const user = await AuthRepository.findAuthByEmail(data.email);
        if (!user) {
            throw new HTTPException(404, {
                message: "User not found",
            });
        }
        const payload: IJWTPayload = {
            email: user.email,
            id: user._id as string,
            userName: user.userName,
        };
        const accessToken = await generateAccessToken(payload);
        user.password = "";
        const responseData = {
            accessToken,
            user,
        };
        return responseData;
    }
}
const AuthService = new AuthServiceClass();
export default AuthService;
