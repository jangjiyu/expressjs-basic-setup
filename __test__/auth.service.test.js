const AuthService = require("../services/auth");
const AuthRepository = require("../repositories/auth");
const { User } = require("../models");
const { plainToInstance } = require("class-transformer");
const CustomError = require("../utils/customError");

jest.mock("../repositories/auth");

describe("AuthService", () => {
  const authService = new AuthService();
  const authRepository = new AuthRepository();
  console.log(111, authRepository);

  Object.assign(authService, { authRepository });

  describe("join", () => {
    it("이메일이 유효하지 않으면 INVALID_INPUT_EMAIL 에러를 던진다.", async () => {
      const email = "invalidEmail";
      const password = "validPassword";

      await expect(() => authService.join(email, password)).rejects.toThrow(new CustomError("INVALID_INPUT_EMAIL"));
    });

    it("비밀번호가 유효하지 않으면 INVALID_INPUT_PASSWORD 에러를 던진다.", async () => {
      const email = "valid@Email.com";
      const password = "invalpw";

      await expect(() => authService.join(email, password)).rejects.toThrow(new CustomError("INVALID_INPUT_PASSWORD"));
    });

    it("이미 존재하는 이메일이면 DUPLICATE_EMAIL 에러를 던진다.", async () => {
      const email = "valid@Email.com";
      const password = "validPassword";

      authRepository.getUserDataByEmail = jest.fn();
      authRepository.getUserDataByEmail.mockResolvedValue(plainToInstance(User, { id: 1, email, password }));

      expect.assertions(1);
      await expect(() => authService.join(email, password)).rejects.toThrow(new CustomError("DUPLICATE_EMAIL"));
    });
  });

  describe("login", () => {
    it("이메일이 유효하지 않으면 INVALID_INPUT_EMAIL 에러를 던진다.", async () => {
      const email = "invalidEmail";
      const password = "validPassword";

      await expect(() => authService.login(email, password)).rejects.toThrow(new CustomError("INVALID_INPUT_EMAIL"));
    });

    it("비밀번호가 유효하지 않으면 INVALID_INPUT_PASSWORD 에러를 던진다.", async () => {
      const email = "valid@Email.com";
      const password = "invalpw";

      await expect(() => authService.login(email, password)).rejects.toThrow(new CustomError("INVALID_INPUT_PASSWORD"));
    });

    it("존재하지 않는 이메일이면 NON_EXISTENT_USER 에러를 던진다.", async () => {
      const email = "non_ex_user@Email.com";
      const password = "validPassword";

      authRepository.getUserDataByEmail = jest.fn();
      authRepository.getUserDataByEmail.mockResolvedValue(null);

      expect.assertions(1);
      await expect(() => authService.login(email, password)).rejects.toThrow(new CustomError("NON_EXISTENT_USER"));
    });

    it("비밀번호가 일치하지 않으면 INVALID_USER_INFO 에러를 던진다.", async () => {
      const email = "valid@Eamil.com";
      const password = "invalidPassword";

      authRepository.getUserDataByEmail = jest.fn();
      authRepository.getUserDataByEmail.mockResolvedValue(
        plainToInstance(User, { id: 1, email, password: "validPassword" })
      );

      jest.mock("bcrypt", () => ({
        // hash: jest.fn(() => Promise.resolve("hashed_password")),
        compare: jest.fn(() => Promise.resolve(false)),
      }));

      expect.assertions(1);
      await expect(() => authService.login(email, password)).rejects.toThrow(new CustomError("INVALID_USER_INFO"));
    });
  });
});
