import { Context } from "hono";
import PostService from "../../services/posts";

class PostControllerClass {
    async createPost(c: Context) {
        try {
            const user = c.get("user");
            const data = c.req.valid("json" as never);
            const post = await PostService.createPost(user.id, data);
            return c.json({
                data: post,
                message: "Post created successfully",
            });
        } catch (error) {
            throw error;
        }
    }
    async deletePost(c: Context) {
        try {
            const user = c.get("user");
            const postId = c.req.param("id");
            const post = await PostService.deletePost(user.id, postId);
            return c.json({
                data: post,
                message: "Post deleted successfully",
            });
        } catch (error) {
            throw error;
        }
    }
    async getPostById(c: Context) {
        try {
            const postId = c.req.param("id");
            const post = await PostService.getPostById(postId);
            return c.json({
                data: post,
                message: "Post fetched successfully",
            });
        } catch (error) {
            throw error;
        }
    }

    async getPosts(c: Context) {
        try {
            const user = c.get("user");
            const posts = await PostService.getPosts(user.id);
            return c.json({
                data: posts,
                message: "Posts fetched successfully",
            });
        } catch (error) {
            throw error;
        }
    }
    async updatePost(c: Context) {
        try {
            const user = c.get("user");
            const postId = c.req.param("id");
            const data = c.req.valid("json" as never);
            const post = await PostService.updatePost(user.id, postId, data);
            return c.json({
                data: post,
                message: "Post updated successfully",
            });
        } catch (error) {
            throw error;
        }
    }
}

const PostController = new PostControllerClass();
export default PostController;
