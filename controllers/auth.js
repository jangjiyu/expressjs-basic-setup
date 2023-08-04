const AuthService = require("../services/auth");

class AuthController {
  authService = new AuthService();

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
