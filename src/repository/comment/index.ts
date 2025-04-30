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
        return await Comment.find({
            post: postId,
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
