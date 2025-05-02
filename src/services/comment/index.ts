import { HTTPException } from "hono/http-exception";

import { Reaction } from "../../constant";
import CommentRepository from "../../repository/comment";
import { IAddComment, IComment } from "../../types/comment";
import { structureComments } from "../../utils";
import PostService from "../posts";

class CommentServiceClass {
    async createComment(data: IAddComment) {
        const { parent, post } = data;
        await PostService.getPostById(post);
        if (parent) {
            await this.getCommentById(parent);
        }
        const comment = await CommentRepository.addComment(data);
        return comment;
    }
    async deleteComment(userId: string, commentId: string) {
        const comment = await this.getCommentById(commentId);
        await this.validateCommentOwnership(userId, comment);
        const deletedComment = await CommentRepository.deleteComment(commentId);
        return deletedComment;
    }
    async getCommentById(commentId: string) {
        const comment = await CommentRepository.getCommentById(commentId);
        if (!comment) {
            throw new HTTPException(404, {
                message: "Comment not found",
            });
        }
        return comment;
    }
    async getCommentsByPostId(postId: string) {
        const comments = await CommentRepository.getCommentsByPostId(postId);
        return structureComments(comments);
    }
    async reactToComment(
        userId: string,
        commentId: string,
        data: { reaction: Reaction }
    ) {
        const { reaction } = data;
        const comment = await this.getCommentById(commentId);
        if (!comment) {
            throw new HTTPException(404, {
                message: "Comment not found",
            });
        }

        return await CommentRepository.reactToComment(
            userId,
            commentId,
            reaction
        );
    }
    async updateComment(
        userId: string,
        commentId: string,
        data: { text: string }
    ) {
        const comment = await this.getCommentById(commentId);
        await this.validateCommentOwnership(userId, comment);
        const updatedComment = await CommentRepository.updateComment(
            commentId,
            data
        );
        return updatedComment;
    }
    async validateCommentOwnership(userId: string, comment: IComment) {
        if (comment?.user?.toString() !== userId) {
            throw new HTTPException(404, {
                message: "Unauthorized access to comment",
            });
        }
        return comment;
    }
}

const CommentService = new CommentServiceClass();
export default CommentService;
