const express = require("express");
const router = express.Router();
const teacherController = require("../controllers/teacherController");
const teacherAuth = require("../middlewares/teacherAuth");

router.post("/teacherLogin", teacherController.Login);
router.get("/teacher/panel", teacherAuth.teacherAuth, teacherController.panel);
router.get(
  "/teacher/profile",
  teacherAuth.extractUser,
  teacherController.profile
);

module.exports = router;
