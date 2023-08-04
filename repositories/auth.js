const { User } = require("../models");

class AuthRepository {
  // 이메일로 유저정보 가져오기
  getUserDataByEmail = async email => {
    const userData = await User.findOne({
      where: { email },
    });

    return userData;
  };

  // 회원가입
  join = async (email, password) => {
    await User.create({
      email,
      password,
    });
  };
}

module.exports = AuthRepository;
