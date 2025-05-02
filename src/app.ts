import { Hono } from "hono";
import { compress } from "hono/compress";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { secureHeaders } from "hono/secure-headers";
import { ContentfulStatusCode } from "hono/utils/http-status";

import { errorHandler } from "./middlewares/errorHandler";
import authRoute from "./routes/auth";
import commentRoute from "./routes/comment";
import postRoute from "./routes/post";

const app = new Hono().basePath("/api/v1");

app.use(logger());
app.use(cors());
app.use(secureHeaders());
app.use(compress({ encoding: "deflate" }));

app.route("/auth/", authRoute);
app.route("/posts/", postRoute);
app.route("/comments/", commentRoute);

app.onError(errorHandler);

app.notFound((c) => {
    console.log("Route not found", c.req.url);
    return c.json(
        {
            message: "Route not found",
        },
        404 as ContentfulStatusCode
    );
});

export default app;
