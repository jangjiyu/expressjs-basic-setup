const PostService = require("../services/post");
const validator = require("../utils/validator");

class PostController {
  postService = new PostService();

  getPosts = async (req, res) => {
    const { page } = await validator.getPostsSchema.validateAsync(req.query);
    const limit = 10;
    const offset = 0 + (page - 1) * limit;

    if (page > 1) {
      offset = 10 * (page - 1);
    }

    const posts = await this.postService.getPosts(limit, offset);

    res.status(200).json(posts);
  };

  getPost = async (req, res) => {
    const { id } = await validator.getPostSchema.validateAsync(req.params);

    const post = await this.postService.getPost(id);

    res.status(200).json(post);
  };

  createPost = async (req, res) => {
    const { id: userId } = res.locals.user;
    const { title, content } = await validator.createPostSchema.validateAsync(req.body);

    const result = await this.postService.createPost(userId, title, content);

    res.status(201).json(result);
  };

  updatePost = async (req, res) => {
    const { id: userId } = res.locals.user;
    const { id } = await validator.updatePostParamsSchema.validateAsync(req.params);
    const { title, content } = await validator.updatePostBodySchema.validateAsync(req.body);

    const result = await this.postService.updatePost(userId, id, title, content);

    res.status(200).json(result);
  };

  deletePost = async (req, res) => {
    const { id: userId } = res.locals.user;
    const { id } = await validator.deletePostSchema.validateAsync(req.params);

    const result = await this.postService.deletePost(userId, id);

    res.status(200).json(result);
  };
}

module.exports = PostController;
