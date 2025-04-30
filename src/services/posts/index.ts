import { HTTPException } from "hono/http-exception";

import PostRepository from "../../repository/posts";

class PostServiceClass {
    async createPost(userId: string, data: any) {
        return await PostRepository.createPost(userId, data);
    }

    async deletePost(userId: string, postId: string) {
        const post = await PostRepository.getPostById(userId);
        if (!post) {
            throw new HTTPException(404, {
                message: "Post not found",
            });
        }
        const deletedPost = await PostRepository.deletePost(userId, postId);
        if (!deletedPost) {
            throw new HTTPException(500, {
                message: "Error deleting post",
            });
        }
        return deletedPost;
    }
    async getPostById(postId: string) {
        const post = await PostRepository.getPostById(postId);
        if (!post) {
            throw new HTTPException(404, {
                message: "Post not found",
            });
        }
        return post;
    }
    async getPosts(userId: string) {
        return await PostRepository.getAllPostsByUser(userId);
    }

    async updatePost(userId: string, postId: string, data: any) {
        const post = await PostRepository.getPostById(postId);
        if (!post) {
            throw new HTTPException(404, {
                message: "Post not found",
            });
        }
        const updatedPost = await PostRepository.updatePost(
            userId,
            postId,
            data
        );
        if (!updatedPost) {
            throw new HTTPException(500, {
                message: "Error updating post",
            });
        }
        return updatedPost;
    }
}

const PostService = new PostServiceClass();
export default PostService;
