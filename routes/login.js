const express = require("express");
const router = express.Router();

const signToken = require("../middlewares/signToken");
const verifyPassword = require("../middlewares/verifyPassword");

router.get(
  "/",
  verifyPassword,
  async (req, res, next) => {
    console.log("CALL LOGIN GET REQUEST");
    console.log("EMAIL: ", req.header("email"));
    next();
  },
  signToken
);

module.exports = router;
