const verifyPassword = require("../controllers/verifyPassword");
const { UnauthorizedError } = require("../errors");

module.exports = async (req, res, next) => {
  const email = req.header("email");
  const password = req.header("password");

  try {
    const isMatch = await verifyPassword(email, password);
    if (!isMatch) {
      throw new UnauthorizedError("Invalid Credentials");
    }
    req._id = isMatch;
  } catch (error) {
    next(error);
  }
  next();
};
