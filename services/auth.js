const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AuthRepository = require("../repositories/auth");
const CustomError = require("../utils/customError");

class AuthService {
  authRepository = new AuthRepository();

  // TODO: 유효성 검사 따로 빼서 중복 줄이기(controller단에서 처리해버리기)
  // 유효성 검사 정규식
  // 이메일 조건: @ 포함
  emailRegex = /[@]/;
  // 비밀번호 조건: 8자 이상
  passwordRegex = /.{8,}/;

  join = async (email, password) => {
    if (!this.emailRegex.test(email)) {
      throw new CustomError("INVALID_INPUT_EMAIL");
    }
    if (!this.passwordRegex.test(password)) {
      throw new CustomError("INVALID_INPUT_PASSWORD");
    }

    const userData = await this.authRepository.getUserDataByEmail(email);

    if (userData) {
      throw new CustomError("DUPLICATE_EMAIL");
    }

    const hashedPassword = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT));

    await this.authRepository.join(email, hashedPassword);

    return { message: "회원가입이 완료되었습니다." };
  };

  login = async (email, password) => {
    if (!this.emailRegex.test(email)) {
      throw CustomError("INVALID_INPUT_EMAIL");
    }
    if (!this.passwordRegex.test(password)) {
      throw new CustomError("INVALID_INPUT_PASSWORD");
    }

    const userData = await this.authRepository.getUserDataByEmail(email);

    if (!userData) {
      throw new CustomError("NON_EXISTENT_USER");
    }

    const bcryptCompareResult = await bcrypt.compare(password, userData.password);

    if (!bcryptCompareResult) {
      throw new CustomError("INVALID_USER_INFO");
    }

    const tokenPayload = { id: userData.id };
    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: "7d" });

    return { message: "로그인 성공", token };
  };
}

module.exports = AuthService;
