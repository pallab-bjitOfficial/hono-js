import bcrypt from "bcrypt";
import { sign } from "hono/jwt";

import env from "../configs/environment";
import { IJWTPayload } from "../types/auth";

export const hashPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(env.SALT_ROUNDS);
    return await bcrypt.hash(password, salt);
};

export const comparePassword = async (
    password: string,
    hashedPassword: string
) => {
    return await bcrypt.compare(password, hashedPassword);
};

export const generateAccessToken = async (data: IJWTPayload) => {
    return await sign(data, env.JWT_SECRET);
};
