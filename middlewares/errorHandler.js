const errorCodes = require("../utils/errorCodes");

module.exports = {
  errorHandler: (err, req, res, next) => {
    console.error(11111, err);

    const codeName = (err && err.codeName) || null;
    const error = errorCodes[codeName] || errorCodes["SERVER_ERROR"];

    return res.status(error.statusCode).json({ message: error.message });
  },
};
