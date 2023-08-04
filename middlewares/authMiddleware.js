const jwt = require("jsonwebtoken");
const { User } = require("../models");

module.exports = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const [authType, authToken] = (authorization || "").split(" ");

    if (authType !== "Bearer") {
      throw new Error("로그인 후 이용해주세요.");
    }

    jwt.verify(
      authToken,
      process.env.JWT_SECRET,

      async (error, decoded) => {
        try {
          if (error) {
            throw new Error("이용에 문제가 있습니다. 관리자에게 문의해주세요.");
          }

          const user = await User.findOne({
            where: { id: decoded.id },
          });
          res.locals.user = user;
          next();
        } catch (err) {
          next(err);
        }
      }
    );
  } catch (err) {
    next(err);
  }
};
