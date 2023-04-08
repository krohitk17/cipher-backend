const jwt = require("jsonwebtoken");
const { UnauthorizedError } = require("../errors");
const getUser = require("../controllers/getUser");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await getUser(decoded._id);
    if (!user) {
      const err = new UnauthorizedError("Invalid Token");
      next(err);
    }
    console.log(decoded);
    req._id = user._id;
  } catch (error) {
    const err = new UnauthorizedError("Invalid Token");
    next(err);
  }
  next();
};
