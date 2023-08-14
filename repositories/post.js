const { Post } = require("../models");

class PostRepository {
  getPosts = async (limit, offset) => {
    const posts = await Post.findAll({
      limit,
      offset,
      order: [["createdAt", "DESC"]],
      attributes: ["id", "userId", "title", "content", "createdAt", "updatedAt"],
    });

    return posts;
  };

  getPost = async id => {
    const post = await Post.findOne({
      where: { id },
      attributes: ["id", "userId", "title", "content", "createdAt", "updatedAt"],
    });

    return post;
  };

  createPost = async (userId, title, content) => {
    await Post.create({ userId, title, content });
  };

  findPostById = async id => {
    const post = await Post.findOne({ where: { id } });

    return post;
  };

  updatePost = async (id, title, content) => {
    await Post.update({ title, content }, { where: { id } });
  };

  deletePost = async id => {
    await Post.destroy({ where: { id } });
  };
}

module.exports = PostRepository;
