const PostRepository = require("../repositories/post");
const CustomError = require("../utils/customError");

class PostService {
  postRepository = new PostRepository();

  getPosts = async (limit, offset) => {
    const posts = await this.postRepository.getPosts(limit, offset);

    return posts;
  };

  getPost = async id => {
    const post = await this.postRepository.getPost(id);

    if (!post) {
      throw new CustomError("POST_NOT_FOUND");
    }

    return post;
  };

  createPost = async (userId, title, content) => {
    await this.postRepository.createPost(userId, title, content);

    return { message: "게시글이 성공적으로 작성되었습니다." };
  };

  updatePost = async (userId, id, title, content) => {
    const postInfo = await this.postRepository.findPostById(id);

    if (!postInfo) {
      throw new CustomError("POST_NOT_FOUND");
    }

    if (postInfo.userId !== userId) {
      throw new CustomError("FORBIDDEN");
    }

    await this.postRepository.updatePost(id, title, content);

    return { message: "게시글이 성공적으로 수정되었습니다." };
  };

  deletePost = async (userId, id) => {
    const postInfo = await this.postRepository.findPostById(id);

    if (!postInfo) {
      throw new CustomError("POST_NOT_FOUND");
    }

    if (postInfo.userId !== userId) {
      throw new CustomError("FORBIDDEN");
    }

    await this.postRepository.deletePost(id);

    return { message: "게시글이 성공적으로 삭제되었습니다." };
  };
}

module.exports = PostService;
