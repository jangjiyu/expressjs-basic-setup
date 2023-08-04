const PostService = require("../services/post");

class PostController {
  postService = new PostService();

  getPosts = async (req, res) => {
    // TODO: pagination
    const { page } = req.query;
    const limit = 10;
    const offset = 0 + (page - 1) * limit;

    if (pageNum > 1) {
      offset = 10 * (pageNum - 1);
    }

    const posts = await this.postService.getPosts(limit, offset);

    res.status(200).json(posts);
  };

  getPost = async (req, res) => {
    const { id } = req.params;

    const post = await this.postService.getPost(id);

    res.status(200).json(post);
  };

  createPost = async (req, res) => {
    const { id: userId } = res.locals.user;
    const { title, content } = req.body;

    const result = await this.postService.createPost(userId, title, content);

    res.status(201).json(result);
  };

  updatePost = async (req, res) => {
    const { id: userId } = res.locals.user;
    const { id } = req.params;
    const { title, content } = req.body;

    const result = await this.postService.updatePost(userId, id, title, content);

    res.status(200).json(result);
  };

  deletePost = async (req, res) => {
    const { id: userId } = res.locals.user;
    const { id } = req.params;

    const result = await this.postService.deletePost(userId, id);

    res.status(200).json(result);
  };
}

module.exports = PostController;
