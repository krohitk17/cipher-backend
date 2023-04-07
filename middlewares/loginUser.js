const verifyPassword = require("../controllers/verifyPassword");
const { UnauthorizedError } = require("../errors");

module.exports = async (req, res, next) => {
  var email = req.header("email");
  if (!email) {
    email = req.email;
    if (!email) {
      throw new UnauthorizedError("Invalid Credentials");
    }
  }
  const password = req.header("password");

  try {
    const isMatch = await verifyPassword(email, password);
    if (!isMatch) {
      throw new UnauthorizedError("Invalid Credentials");
    }
    req._id = isMatch._id;
    req.email = isMatch.email;
  } catch (error) {
    next(error);
  }
  next();
};
