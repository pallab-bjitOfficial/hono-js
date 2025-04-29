import { config } from "dotenv";

config();

const env = {
    JWT_ALGORITHM: process.env.JWT_ALGORITHM ?? "HS256",
    JWT_SECRET: process.env.JWT_SECRET ?? "",
    JWT_TYP: process.env.JWT_TYP ?? "JWT",
    MONGO_URI: process.env.MONGO_URI ?? "",
    PORT: Number(process.env.PORT) || 3000,
    SALT_ROUNDS: Number(process.env.SALT_ROUNDS) || 10,
};

export default env;
