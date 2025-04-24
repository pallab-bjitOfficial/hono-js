import { serve } from "@hono/node-server";
import { config } from "dotenv";
import env from "./configs/environment";
import { connectToDatabase } from "./configs/connectDB";
import app from "./app";

config();
const PORT = env.PORT;

(async () => {
  await connectToDatabase();
})();

serve(
  {
    fetch: app.fetch,
    port: PORT,
  },
  () => {
    console.log("Server is running.");
  }
);
