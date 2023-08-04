const AuthService = require("../services/auth");

class AuthController {
  authService = new AuthService();

  // TODO: 유효성 검사 추가
  // 이메일 조건: @ 포함
  // 비밀번호 조건: 8자 이상

  join = async (req, res) => {
    const { email, password } = req.body;
    const result = await this.authService.join({ email, password });
    res.status(200).json(result);
  };

  login = async (req, res) => {
    const { email, password } = req.body;
    const result = await this.authService.login({ email, password });
    res.status(200).json(result);
  };
}

module.exports = AuthController;
