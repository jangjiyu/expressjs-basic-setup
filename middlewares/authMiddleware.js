const jwt = require("jsonwebtoken");
const { User } = require("../models");
const CustomError = require("../utils/customError");

module.exports = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const [authType, authToken] = (authorization || "").split(" ");

    if (authType !== "Bearer") {
      throw new CustomError("UNAUTHORIZED");
    }

    jwt.verify(
      authToken,
      process.env.JWT_SECRET,

      async (error, decoded) => {
        try {
          if (error) {
            throw new CustomError("UNAUTHORIZED");
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
