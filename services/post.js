const PostRepository = require("../repositories/post");

class PostService {
  postRepository = new PostRepository();

  getPosts = async (limit, offset) => {
    const posts = await this.postRepository.getPosts(limit, offset);

    return posts;
  };

  getPost = async id => {
    const post = await this.postRepository.getPost(id);

    if (!post) {
      throw new Error("게시글이 존재하지 않습니다.");
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
      throw new Error("게시글이 존재하지 않습니다.");
    }

    if (postInfo.userId !== userId) {
      throw new Error("게시글을 수정할 권한이 없습니다.");
    }

    await this.postRepository.updatePost(userId, id, title, content);

    return { message: "게시글이 성공적으로 수정되었습니다." };
  };

  deletePost = async (userId, id) => {
    const postInfo = await this.postRepository.findPostById(id);

    if (!postInfo) {
      throw new Error("게시글이 존재하지 않습니다.");
    }

    if (postInfo.userId !== userId) {
      throw new Error("게시글을 삭제할 권한이 없습니다.");
    }

    await this.postRepository.deletePost(userId, id);

    return { message: "게시글이 성공적으로 삭제되었습니다." };
  };
}
