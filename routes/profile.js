const express = require("express");
const router = express.Router();

const createUser = require("../controllers/createUser");
const updateUser = require("../controllers/updateUser");
const verifyToken = require("../middlewares/verifyToken");
const getUser = require("../controllers/getUser");
const getUserByEmail = require("../controllers/getUsersByEmail");
const getUsersByName = require("../controllers/getUsersByName");
const { BadRequestError } = require("../errors");

router.get("/", verifyToken, async (req, res, next) => {
  console.log("CALL USER GET REQUEST");
  try {
    var id = req.header("id");
    if (id == null) {
      id = req._id;
    }
    const user = await getUser(id);
    console.log("USER: ", user);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
});

router.get("/email", async (req, res, next) => {
  console.log("CALL USER EMAIL GET REQUEST");
  try {
    const email = req.header("email");
    if (email == null) {
      throw new BadRequestError("Email Header Not Found");
    }
    const user = await getUserByEmail(email);
    res.status(201).json(user);
    console.log("USER: ", user);
  } catch (error) {
    next(error);
  }
});

router.get("/name/:page", async (req, res, next) => {
  console.log("CALL USER NAME GET REQUEST");
  try {
    const name = req.header("name");
    if (name == null) {
      throw new BadRequestError("Name Header Not Found");
    }
    const page = req.params.page;
    const users = await getUsersByName(name, page);
    res.status(201).json(users);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  console.log("CALL CREATE POST REQUEST");
  try {
    const newUser = await createUser(req.body);
    console.log("CREATED USER: ", newUser);
    res.status(201).json(newUser);
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

router.get("/following/:page", verifyToken, async (req, res, next) => {
  console.log("CALL FOLLOWING GET REQUEST");
  try {
    var id = req.header("id");
    const page = req.params.page;
    if (id == null) {
      id = req._id;
    }
    const user = await getUser(id);
    const following = [];
    for (let i = 10 * (page - 1); i < 10 * (page - 1) + 10; i++) {
      const follow = await getUser(user.following[i]);
      following.push(follow);
    }
    res.status(201).json(following);
  } catch (error) {
    next(error);
  }
});

router.get("/followers/:page", verifyToken, async (req, res, next) => {
  console.log("CALL FOLLOWERS GET REQUEST");
  try {
    var id = req.header("id");
    const page = req.params.page;
    if (id == null) {
      id = req._id;
    }
    const user = await getUser(id);
    console.log(page);
    const followers = [];
    for (let i = 10 * (page - 1); i < 10 * (page - 1) + 10; i++) {
      const follower = await getUser(user.followers[i]);
      if (follower == null) {
        break;
      }
      followers.push(follower);
    }
    console.log("FOLLOWERS: ", followers);
    res.status(201).json(followers);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
