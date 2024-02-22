import Joi from "joi";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;

export class Validator {
  joinSchema = Joi.object({
    email: Joi.string().pattern(emailRegex).required(),
    password: Joi.string().pattern(passwordRegex).required(),
    confirmPassword: Joi.string().pattern(passwordRegex).required(),
  });

  loginSchema = Joi.object({
    email: Joi.string().pattern(emailRegex).required(),
    password: Joi.string().pattern(passwordRegex).required(),
  });
}
