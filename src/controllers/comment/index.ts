import { Context } from "hono";

import CommentService from "../../services/comment";

class CommentControllerClass {
    async createComment(c: Context) {
        try {
            const user = c.get("user");
            const { text } = c.req.valid("json" as never);
            const post = c.req.param("id");
            const data = {
                post: post,
                text: text,
                user: user.id,
            };
            const comment = await CommentService.createComment(data);
            return c.json({
                data: comment,
                message: "Comment added successfully",
                status: 200,
            });
        } catch (error) {
            throw error;
        }
    }
    async createReply(c: Context) {
        try {
            const user = c.get("user");
            const { text } = c.req.valid("json" as never);
            const post = c.req.param("postId");
            const parent = c.req.param("parentId");
            const data = {
                parent: parent,
                post: post,
                text: text,
                user: user.id,
            };
            const comment = await CommentService.createComment(data);
            return c.json({
                data: comment,
                message: "Reply added successfully",
                status: 200,
            });
        } catch (error) {
            throw error;
        }
    }
    async deleteComment(c: Context) {
        try {
            const user = c.get("user");
            const commentId = c.req.param("id");
            const comment = await CommentService.deleteComment(
                user.id,
                commentId
            );
            return c.json({
                data: comment,
                message: "Comment deleted successfully",
                status: 200,
            });
        } catch (error) {
            throw error;
        }
    }
    async getAllComments(c: Context) {
        try {
            const postId = c.req.param("id");

            const comments = await CommentService.getCommentsByPostId(postId);
            return c.json({
                data: comments,
                message: "Comments fetched successfully",
                status: 200,
            });
        } catch (error) {
            throw error;
        }
    }

    async updateComment(c: Context) {
        try {
            const user = c.get("user");
            const commentId = c.req.param("id");
            const { text } = c.req.valid("json" as never);
            const data = {
                text: text,
            };
            const comment = await CommentService.updateComment(
                user.id,
                commentId,
                data
            );
            return c.json({
                data: comment,
                message: "Comment updated successfully",
                status: 200,
            });
        } catch (error) {
            throw error;
        }
    }
}
const CommentController = new CommentControllerClass();
export default CommentController;
