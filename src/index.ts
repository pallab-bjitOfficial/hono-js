import { serve } from "@hono/node-server";
import { config } from "dotenv";
import env from "./configs/environment";
import { connectToDatabase } from "./configs/connectDB";
import app from "./app";

config();
const PORT = env.PORT;

serve(
  {
    fetch: app.fetch,
    port: PORT,
    hostname: "0.0.0.0",
  },
  async () => {
    console.log(`Server is running.`);
    await connectToDatabase();
  }
);
