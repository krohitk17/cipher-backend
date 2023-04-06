const express = require("express");
const router = express.Router();

const createUser = require("../controllers/createUser");
const updateUser = require("../controllers/updateUser");
const verifyToken = require("../middlewares/verifyToken");
const getUser = require("../controllers/getUser");
const getUserByEmail = require("../controllers/getUsersByEmail");

router.get("/", verifyToken, async (req, res, next) => {
  console.log("CALL USER GET REQUEST");
  try {
    const user = await getUser(req._id);
    console.log("USER: ", user);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
  next();
});

router.get("/?email=", verifyToken, async (req, res, next) => {
  console.log("CALL USER EMAIL QUERY GET REQUEST");
  try {
    const email = req.query.email;
    const user = await getUserByEmail(email);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
  next();
});

router.post("/", async (req, res, next) => {
  console.log("CALL CREATE POST REQUEST");
  try {
    const newUser = await createUser(req.body);
    console.log("CREATED USER: ", newUser);
    const { password, ...response } = newUser["_doc"];
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
});

router.patch("/", verifyToken, async (req, res, next) => {
  console.log("CALL UPDATE PATCH REQUEST");
  try {
    const newUser = await updateUser(req._id, req.body);
    console.log("UPDATED USER: ", newUser);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
