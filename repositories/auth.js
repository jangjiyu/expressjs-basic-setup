const { User } = require("../models");

class AuthRepository {
  getUserDataByEmail = async email => {
    const userData = await User.findOne({
      where: { email },
    });

    return userData;
  };

  join = async (email, password) => {
    await User.create({
      email,
      password,
    });
  };
}

module.exports = AuthRepository;
