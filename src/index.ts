import { serve } from "@hono/node-server";
import { config } from "dotenv";

import app from "./app";
import { connectToDatabase } from "./configs/connectDB";
import env from "./configs/environment";

config();
const PORT = env.PORT;

serve(
    {
        fetch: app.fetch,
        hostname: "0.0.0.0",
        port: PORT,
    },
    async () => {
        console.log(`Server is running.`);
        await connectToDatabase();
    }
);
