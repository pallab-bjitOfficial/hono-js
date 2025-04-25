import PostRepository from "../../repository/posts";

class PostServiceClass {
  async getPosts(userId: string) {
    return await PostRepository.getAllPostsByUser(userId);
  }

  async createPost(userId: string, data: any) {
    return await PostRepository.createPost(userId, data);
  }
}

const PostService = new PostServiceClass();
export default PostService;
