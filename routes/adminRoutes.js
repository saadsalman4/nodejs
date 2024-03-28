const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

router.get("/admin/panel", adminController.Panel);
router.post("/adminLogin", adminController.Login);
router.post("/adminRegister", adminController.Register);
router.get("/admin/admins", adminController.viewAdmins);
router.get("/admin/teachers", adminController.viewTeachers);
router.get("/admin/students", adminController.viewStudents);
router.get("/admin/addTeacher", adminController.addTeacher_get);
router.post("/admin/addTeacher", adminController.addTeacher);
router.get("/admin/addStudent", adminController.addStudent_get);
router.post("/admin/addStudent", adminController.addStudent);
router.get("/admin/addCourse", adminController.addCourse_get);
router.post("/admin/addCourse", adminController.addCourse);
router.get("/admin/showCourses", adminController.showCourses);
router.get("/admin/showTeachers", adminController.showTeachers);
router.get("/admin/assignCourses", adminController.assignCourses_get);
router.post("/admin/assignCourses", adminController.assignCourses);
router.get("/admin/showStudents", adminController.showStudents);
router.get(
  "/admin/assignCoursesToStudent",
  adminController.assignCoursesToStudent_get
);
router.post(
  "/admin/assignCoursesToStudent",
  adminController.assignCoursesToStudent
);

module.exports = router;
