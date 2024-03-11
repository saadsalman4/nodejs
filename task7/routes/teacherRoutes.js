const express = require("express");
const router = express.Router();
const teacherController = require("../controllers/teacherController");

router.get("/teachers", teacherController.get);
router.get("/teachers/:id", teacherController.getTeacherById);
router.post("/teachers", teacherController.post);
router.patch("/teachers/:id", teacherController.patch);
router.delete("/teachers/:id", teacherController.delete);

module.exports = router;
