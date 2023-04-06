const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = jwt.sign(
    {
      _id: req._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRY,
    }
  );
  console.log("TOKEN: ", token);
  res.status(201).json({
    token: token,
  });
  next();
};
