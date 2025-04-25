import { Context } from "hono";
import PostService from "../../services/posts";

class PostControllerClass {
  async getPosts(c: Context) {
    try {
      const user = c.get("user");
      const posts = await PostService.getPosts(user.id);
      return c.json({
        message: "Posts fetched successfully",
        data: posts,
      });
    } catch (error) {
      throw error;
    }
  }
  async createPost(c: Context) {
    try {
      const user = c.get("user");
      const data = c.req.valid("json" as never);
      const post = await PostService.createPost(user.id, data);
      return c.json({
        message: "Post created successfully",
        data: post,
      });
    } catch (error) {
      throw error;
    }
  }
}

const PostController = new PostControllerClass();
export default PostController;
