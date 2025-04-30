import { Hono } from "hono";
import { every } from "hono/combine";

import PostController from "../../controllers/posts";
import { authMiddleware } from "../../middlewares/auth";
import { mongoIdSchema } from "../../schemas";
import { createPostSchema, updatePostSchema } from "../../schemas/posts";
import { validateParams } from "../../utils/validateParams";
import { zValidatorWrapper } from "../../utils/zValidatorWrapper";

const postRoute = new Hono();

postRoute
    .get("/", authMiddleware, PostController.getPosts)
    .get(
        "/:id",
        every(authMiddleware, validateParams(mongoIdSchema)),
        PostController.getPostById
    )
    .post(
        "/",
        every(authMiddleware, zValidatorWrapper("json", createPostSchema)),
        PostController.createPost
    )
    .patch(
        "/:id",
        every(
            authMiddleware,
            validateParams(mongoIdSchema),
            zValidatorWrapper("json", updatePostSchema)
        ),
        PostController.updatePost
    )
    .delete(
        "/:id",
        every(authMiddleware, validateParams(mongoIdSchema)),
        PostController.deletePost
    );
export default postRoute;
