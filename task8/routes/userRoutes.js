const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const loginAuth = require("../middlewares/userAuth");
const roleAuth = require("../middlewares/roleAuth");
const Validation = require("../middlewares/validation");

router.get("/users", loginAuth.loginAuth, roleAuth.isAdmin, userController.get);
router.get(
  "/users/:id",
  loginAuth.loginAuth,
  roleAuth.isAdmin,
  userController.getUserById
);
router.post(
  "/users",
  loginAuth.loginAuth,
  roleAuth.isAdmin,
  userController.post
);
router.patch(
  "/users/:id",
  loginAuth.loginAuth,
  roleAuth.isAdmin,
  userController.patch
);
router.delete(
  "/users/:id",
  loginAuth.loginAuth,
  roleAuth.isAdmin,
  userController.delete
);

router.get("/login", userController.loginUser_get);
router.get("/register", userController.registerUser_get);
router.post(
  "/login",
  Validation.validateLoginUser,
  userController.loginUser_post
);
router.post(
  "/register",
  Validation.validateRegisterUser,
  userController.registerUser_post
);
router.get("/logout", userController.logout);

router.get("/teachers", loginAuth.loginAuth, roleAuth.isTeacher, (req, res) => {
  res.send("Teachers Portal");
});

router.get("/students", loginAuth.loginAuth, roleAuth.isStudent, (req, res) => {
  res.send("Students Portal");
});

module.exports = router;
