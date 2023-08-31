const AuthService = require("../services/auth");
const validator = require("../utils/validator");

class AuthController {
  authService = new AuthService();

  join = async (req, res) => {
    const { email, password, confirmPassword } = await validator.joinSchema.validateAsync(req.body);

    const result = await this.authService.join(email, password, confirmPassword);

    res.status(200).json(result);
  };

  login = async (req, res) => {
    const { email, password } = await validator.loginSchema.validateAsync(req.body);

    const result = await this.authService.login(email, password);

    res.status(200).json(result);
  };
}

module.exports = AuthController;
