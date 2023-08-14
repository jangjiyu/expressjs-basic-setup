const PostService = require("../services/post");
const PostRepository = require("../repositories/post");
const { Post, User } = require("../models");
const { plainToInstance } = require("class-transformer");
const CustomError = require("../utils/customError");

jest.mock("../repositories/post");

describe("PostService", () => {
  const postService = new PostService();
  const postRepository = new PostRepository();

  Object.assign(postService, { postRepository });

  describe("getPost", () => {
    it("존재하지 않는 게시글이면 POST_NOT_FOUND 에러를 던진다.", async () => {
      const id = 1;

      postRepository.getPost = jest.fn();
      postRepository.getPost.mockResolvedValue(null);

      expect.assertions(1);
      await expect(() => postService.getPost(id)).rejects.toThrow(new CustomError("POST_NOT_FOUND"));
    });

    it("게시글이 존재하면 가져온다.", async () => {
      const id = 1;

      postRepository.getPost = jest.fn();
      postRepository.getPost.mockResolvedValue(plainToInstance(Post, { id, title: "title", content: "content" }));

      const post = await postService.getPost(id);

      expect(post).toEqual(plainToInstance(Post, { id, title: "title", content: "content" }));
    });
  });

  describe("updatePost", () => {
    it("존재하지 않는 게시글이면 POST_NOT_FOUND 에러를 던진다.", async () => {
      const id = 1;
      const userId = 1;
      const title = "title";
      const content = "content";

      postRepository.findPostById = jest.fn();
      postRepository.findPostById.mockResolvedValue(null);

      expect.assertions(1);
      await expect(() => postService.updatePost(userId, id, title, content)).rejects.toThrow(
        new CustomError("POST_NOT_FOUND")
      );
    });

    it("게시글의 작성자가 아니면 FORBIDDEN 에러를 던진다.", async () => {
      const id = 1;
      const userId = 1;
      const title = "title";
      const content = "content";

      postRepository.findPostById = jest.fn();
      postRepository.findPostById.mockResolvedValue(plainToInstance(Post, { id, userId: 2 }));

      expect.assertions(1);
      await expect(() => postService.updatePost(userId, id, title, content)).rejects.toThrow(
        new CustomError("FORBIDDEN")
      );
    });

    it("게시글의 작성자라면 게시글을 수정한다.", async () => {
      const id = 1;
      const userId = 1;
      const title = "title";
      const content = "content";

      postRepository.findPostById = jest.fn();
      postRepository.findPostById.mockResolvedValue(plainToInstance(Post, { id, userId }));

      postRepository.updatePost = jest.fn();

      await postService.updatePost(userId, id, title, content);

      expect(postRepository.updatePost).toBeCalledWith(id, title, content);
    });
  });

  describe("deletePost", () => {
    it("존재하지 않는 게시글이면 POST_NOT_FOUND 에러를 던진다.", async () => {
      const id = 1;
      const userId = 1;

      postRepository.findPostById = jest.fn();
      postRepository.findPostById.mockResolvedValue(null);

      expect.assertions(1);
      await expect(() => postService.deletePost(userId, id)).rejects.toThrow(new CustomError("POST_NOT_FOUND"));
    });

    it("게시글의 작성자가 아니면 FORBIDDEN 에러를 던진다.", async () => {
      const id = 1;
      const userId = 1;

      postRepository.findPostById = jest.fn();
      postRepository.findPostById.mockResolvedValue(plainToInstance(Post, { id, userId: 2 }));

      expect.assertions(1);
      await expect(() => postService.deletePost(userId, id)).rejects.toThrow(new CustomError("FORBIDDEN"));
    });

    it("게시글의 작성자라면 게시글을 삭제한다.", async () => {
      const id = 1;
      const userId = 1;

      postRepository.findPostById = jest.fn();
      postRepository.findPostById.mockResolvedValue(plainToInstance(Post, { id, userId }));

      postRepository.deletePost = jest.fn();

      await postService.deletePost(userId, id);

      expect(postRepository.deletePost).toBeCalledWith(id);
    });
  });
});
