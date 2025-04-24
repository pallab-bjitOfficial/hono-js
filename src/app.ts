import { Hono } from "hono";
import { logger } from "hono/logger";
import authRoute from "./routes/auth";
import { errorHandler } from "./middlewares/errorHandler";
import { ContentfulStatusCode } from "hono/utils/http-status";

const app = new Hono();

app.use(logger());
app.route("/api/v1", authRoute);

app.onError(errorHandler);

app.notFound((c) => {
  return c.json(
    {
      message: "Route not found",
    },
    404 as ContentfulStatusCode
  );
});

export default app;
