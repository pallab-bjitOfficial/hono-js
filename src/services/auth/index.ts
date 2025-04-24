import { HTTPException } from "hono/http-exception";
import AuthRepository from "../../repository/auth";
import { generateAccessToken } from "../../utils";
import { IJWTPayload } from "../../types/auth";

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
      id: user._id as string,
      email: user.email,
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
