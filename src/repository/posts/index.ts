import Post from "../../models/posts";

class PostRepositoryClass {
    async createPost(userId: string, data: any) {
        return await Post.create({
            ...data,
            user: userId,
        });
    }
    async deletePost(userId: string, postId: string) {
        return await Post.findOneAndDelete({ _id: postId, user: userId });
    }
    async getAllPostsByUser(userId: string) {
        return await Post.find({ user: userId }).populate("user");
    }
    async getPostById(postId: string) {
        return await Post.findOne({ _id: postId }).populate("user");
    }
    async updatePost(userId: string, postId: string, data: any) {
        return await Post.findOneAndUpdate(
            { _id: postId, user: userId },
            { $set: data },
            { new: true }
        );
    }
}

const PostRepository = new PostRepositoryClass();
export default PostRepository;
