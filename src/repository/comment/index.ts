import { Types } from "mongoose";

import { Reaction } from "../../constant";
import Comment from "../../models/comment";

class CommentRepositoryClass {
    async addComment(data: any) {
        return await Comment.create(data);
    }
    async deleteComment(commentId: string) {
        return await Comment.findByIdAndUpdate(
            { _id: commentId },
            { $set: { isDeleted: true } },
            { new: true }
        ).lean();
    }
    async getCommentById(commentId: string) {
        return await Comment.findOne({
            _id: commentId,
        }).lean();
    }
    async getCommentsByPostId(postId: string) {
        const comment = await Comment.find({
            post: postId,
        })
            .lean()
            .populate("dislikes.user", "email userName firstName lastName")
            .populate("likes.user", "email userName firstName lastName")
            .populate("user", "email userName firstName lastName");
        return comment.map((comment) => {
            return {
                ...comment,
                dislikes_count: comment?.dislikes?.length,
                likes_count: comment?.likes?.length,
            };
        });
    }
    async reactToComment(
        userId: string,
        commentId: string,
        reaction: Reaction
    ) {
        const comment = await Comment.findOne({
            _id: commentId,
            [`${reaction}s.user`]: userId,
        }).lean();

        if (comment) {
            return await Comment.findOneAndUpdate(
                { _id: commentId },
                {
                    $pull: {
                        [`${reaction}s`]: { user: new Types.ObjectId(userId) },
                    },
                },
                { new: true }
            ).lean();
        }

        const update =
            reaction === Reaction.LIKE
                ? {
                      $pull: { dislikes: { user: new Types.ObjectId(userId) } },
                      $push: {
                          likes: { user: new Types.ObjectId(userId) },
                      },
                  }
                : {
                      $pull: { likes: { user: new Types.ObjectId(userId) } },
                      $push: {
                          dislikes: { user: new Types.ObjectId(userId) },
                      },
                  };

        return await Comment.findOneAndUpdate({ _id: commentId }, update, {
            new: true,
        }).lean();
    }
    async updateComment(commentId: string, data: any) {
        return await Comment.findOneAndUpdate(
            { _id: commentId },
            { $set: data },
            { new: true }
        ).lean();
    }
}
const CommentRepository = new CommentRepositoryClass();
export default CommentRepository;
