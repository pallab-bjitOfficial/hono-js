import Post from "../../models";

class PostRepositoryClass {
  async getAllPostsByUser(userId: string) {
    return await Post.find({ user: userId }).populate("user");
  }
  async createPost(userId: string, data: any) {
    return await Post.create({
      ...data,
      user: userId,
    });
  }
}

const PostRepository = new PostRepositoryClass();
export default PostRepository;
