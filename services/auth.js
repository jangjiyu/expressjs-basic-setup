const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AuthRepository = require("../repositories/auth");
const CustomError = require("../utils/customError");

class AuthService {
  authRepository = new AuthRepository();

  join = async (email, password, confirmPassword) => {
    // 비밀번호 일치 검사
    if (password !== confirmPassword) throw new CustomError("PASSWORD_MISMATCH");

    const userData = await this.authRepository.getUserDataByEmail(email);

    if (userData) throw new CustomError("DUPLICATE_EMAIL");

    const hashedPassword = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT));

    await this.authRepository.join(email, hashedPassword);

    return { message: "회원가입이 완료되었습니다." };
  };

  login = async (email, password) => {
    const userData = await this.authRepository.getUserDataByEmail(email);

    if (!userData) throw new CustomError("NON_EXISTENT_USER");

    const bcryptCompareResult = await bcrypt.compare(password, userData.password);

    if (!bcryptCompareResult) throw new CustomError("INVALID_USER_INFO");

    const tokenPayload = { id: userData.id };
    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: "7d" });

    return { message: "로그인 성공", token };
  };
}

module.exports = AuthService;
