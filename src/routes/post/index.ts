import { Hono } from "hono";
import { authMiddleware } from "../../middlewares/auth";
import PostController from "../../controllers/posts";
import { zValidatorWrapper } from "../../utils/zValidatorWrapper";
import { postSchema } from "../../schemas/posts";

const postRoute = new Hono();

postRoute.get("/posts/", authMiddleware, PostController.getPosts);
postRoute.post(
  "/posts/",
  zValidatorWrapper("json", postSchema),
  authMiddleware,
  PostController.createPost
);
export default postRoute;
