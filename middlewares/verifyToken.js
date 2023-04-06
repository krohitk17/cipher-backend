const jwt = require("jsonwebtoken");
const { UnauthorizedError } = require("../errors");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    req._id = decoded._id;
  } catch (error) {
    const err = new UnauthorizedError("Invalid Token");
    next(err);
  }
  next();
};
