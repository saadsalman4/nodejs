const express = require("express");
const router = express.Router();
const courseModel = require("../models/Course");
const path = require("path");

router.get("/courses", async (req, res) => {
  const courses = await courseModel.find({});

  try {
    res.send(courses);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/", async (req, res) => {
  const filePath = path.join(__dirname, "../public/index.html");
  res.sendFile(filePath);
});

router.get("/admin/login", async (req, res) => {
  const filePath = path.join(__dirname, "../public/admin/login.html");
  res.sendFile(filePath);
});

router.get("/teacher/login", async (req, res) => {
  const filePath = path.join(__dirname, "../public/teacher/login.html");
  res.sendFile(filePath);
});

router.get("/student/login", async (req, res) => {
  const filePath = path.join(__dirname, "../public/student/login.html");
  res.sendFile(filePath);
});

module.exports = router;
