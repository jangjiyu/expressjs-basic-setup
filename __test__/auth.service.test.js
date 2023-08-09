const AuthService = require("../services/auth");
const AuthRepository = require("../repositories/auth");
const { User } = require("../models");
const CustomError = require("../utils/customError");
const bcrypt = require("bcrypt");

jest.mock("../repositories/auth");

bcrypt.hash = jest.fn();
bcrypt.compare = jest.fn();

describe("AuthService", () => {
  const authService = new AuthService();
  const authRepository = jest.mocked(new AuthRepository());

  Object.assign(authService, { authRepository });

  describe("join", () => {
    it("이메일이 유효하지 않으면 INVALID_INPUT_EMAIL 에러를 던진다.", async () => {
      const email = "invalidEmail";
      const password = "validPassword";

      await expect(() => authService.join(email, password)).rejects.toThrow(new CustomError("INVALID_INPUT_EMAIL"));
    });
  });
});
