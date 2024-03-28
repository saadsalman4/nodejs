const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const adminAuth = require("../middlewares/adminAuth");

router.get("/admin/panel", adminAuth, adminController.Panel);
router.post("/adminLogin", adminController.Login);
router.post("/adminRegister", adminController.Register);
router.get("/admin/admins", adminAuth, adminController.viewAdmins);
router.get("/admin/teachers", adminAuth, adminController.viewTeachers);
router.get("/admin/students", adminAuth, adminController.viewStudents);
router.get("/admin/addTeacher", adminAuth, adminController.addTeacher_get);
router.post("/admin/addTeacher", adminAuth, adminController.addTeacher);
router.get("/admin/addStudent", adminAuth, adminController.addStudent_get);
router.post("/admin/addStudent", adminAuth, adminController.addStudent);
router.get("/admin/addCourse", adminAuth, adminController.addCourse_get);
router.post("/admin/addCourse", adminAuth, adminController.addCourse);
router.get("/admin/showCourses", adminAuth, adminController.showCourses);
router.get("/admin/showTeachers", adminAuth, adminController.showTeachers);
router.get(
  "/admin/assignCourses",
  adminAuth,
  adminController.assignCourses_get
);
router.post("/admin/assignCourses", adminAuth, adminController.assignCourses);
router.get("/admin/showStudents", adminAuth, adminController.showStudents);
router.get(
  "/admin/assignCoursesToStudent",
  adminAuth,
  adminController.assignCoursesToStudent_get
);
router.post(
  "/admin/assignCoursesToStudent",
  adminAuth,
  adminController.assignCoursesToStudent
);
router.get("/logout", adminController.logout);

module.exports = router;
