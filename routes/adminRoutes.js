const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

router.post("/adminLogin", adminController.Login);
router.post("/adminRegister", adminController.Register);
router.get("/admin/admins", adminController.viewAdmins);
router.get("/admin/teachers", adminController.viewTeachers);
router.get("/admin/students", adminController.viewStudents);
router.post("/admin/addTeacher", adminController.addTeacher);
router.post("/admin/addStudent", adminController.addStudent);
router.post("/admin/addCourse", adminController.addCourse);
router.get("/admin/showCourses", adminController.showCourses);
router.get("/admin/showTeachers", adminController.showTeachers);
router.post("/admin/assignCourses", adminController.assignCourses);
router.get("/admin/showStudents", adminController.showStudents);
router.post(
  "/admin/assignCoursesToStudent",
  adminController.assignCoursesToStudent
);

module.exports = router;
