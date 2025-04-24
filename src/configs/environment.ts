import { config } from "dotenv";

config();

const env = {
  PORT: Number(process.env.PORT) || 3000,
  MONGO_URI: process.env.MONGO_URI || "",
  SALT_ROUNDS: Number(process.env.SALT_ROUNDS) || 10,
  JWT_SECRET: process.env.JWT_SECRET || "",
  JWT_ALGORITHM: process.env.JWT_ALGORITHM || "HS256",
  JWT_TYP: process.env.JWT_TYP || "JWT",
};

export default env;
