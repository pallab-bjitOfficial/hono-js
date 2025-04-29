import { Hono } from "hono";
import { every } from "hono/combine";

import PostController from "../../controllers/posts";
import { authMiddleware } from "../../middlewares/auth";
import {
    createPostSchema,
    postByIdSchema,
    updatePostSchema,
} from "../../schemas/posts";
import { validateParams } from "../../utils/validateParams";
import { zValidatorWrapper } from "../../utils/zValidatorWrapper";

const postRoute = new Hono();

postRoute.get("/", authMiddleware, PostController.getPosts);
postRoute.get(
    "/:id",
    every(authMiddleware, validateParams(postByIdSchema)),
    PostController.getPostById
);
postRoute.post(
    "/",
    every(authMiddleware, zValidatorWrapper("json", createPostSchema)),
    PostController.createPost
);
postRoute.patch(
    "/:id",
    every(
        authMiddleware,
        validateParams(postByIdSchema),
        zValidatorWrapper("json", updatePostSchema)
    ),
    PostController.updatePost
);
postRoute.delete(
    "/:id",
    every(authMiddleware, validateParams(postByIdSchema)),
    PostController.deletePost
);
export default postRoute;
