const Joi = require("joi");

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;

const requiredIntegerMinOne = Joi.number().integer().min(1).required();

class Validator {
  joinSchema = Joi.object({
    email: Joi.string().pattern(emailRegex).required(),
    password: Joi.string().pattern(passwordRegex).required(),
    confirmPassword: Joi.string().pattern(passwordRegex).required(),
  });

  loginSchema = Joi.object({
    email: Joi.string().pattern(emailRegex).required(),
    password: Joi.string().pattern(passwordRegex).required(),
  });

  getPostsSchema = Joi.object({
    page: requiredIntegerMinOne,
  });

  getPostSchema = Joi.object({
    id: requiredIntegerMinOne,
  });

  createPostSchema = Joi.object({
    title: Joi.string().trim().required(),
    content: Joi.string().trim().required(),
  });

  updatePostParamsSchema = Joi.object({
    id: requiredIntegerMinOne,
  });

  updatePostBodySchema = Joi.object({
    title: Joi.string().trim().required(),
    content: Joi.string().trim().required(),
  });

  deletePostSchema = Joi.object({
    id: requiredIntegerMinOne,
  });
}

module.exports = Validator;
