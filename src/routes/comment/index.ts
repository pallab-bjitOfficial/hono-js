import { Hono } from "hono";
import { every } from "hono/combine";

import CommentController from "../../controllers/comment";
import { authMiddleware } from "../../middlewares/auth";
import { mongoIdSchema } from "../../schemas";
import { createCommentSchema } from "../../schemas/comment";
import { validateParams } from "../../utils/validateParams";
import { zValidatorWrapper } from "../../utils/zValidatorWrapper";

const commentRoute = new Hono();

commentRoute
    .get(
        "/:id",
        every(authMiddleware, validateParams(mongoIdSchema)),
        CommentController.getAllComments
    )
    .post(
        "/:id",
        every(
            authMiddleware,
            validateParams(mongoIdSchema),
            zValidatorWrapper("json", createCommentSchema)
        ),
        CommentController.createComment
    )
    .post(
        "/reply/:postId/:parentId",
        every(
            authMiddleware,
            validateParams(mongoIdSchema, "postId"),
            validateParams(mongoIdSchema, "parentId"),
            zValidatorWrapper("json", createCommentSchema)
        ),
        CommentController.createReply
    )
    .patch(
        "/:id",
        every(
            authMiddleware,
            validateParams(mongoIdSchema),
            zValidatorWrapper("json", createCommentSchema)
        ),
        CommentController.updateComment
    )
    .delete(
        "/:id",
        every(authMiddleware, validateParams(mongoIdSchema)),
        CommentController.deleteComment
    );
export default commentRoute;
