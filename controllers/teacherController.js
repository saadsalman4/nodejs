const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const teacherModel = require("../models/Teacher");
const path = require("path");
const courseModel = require("../models/Course");

const createToken = (id, username, courses) => {
  return jwt.sign({ id, username, courses }, "saadsalman_teacher", {
    expiresIn: 259200000,
  });
};

exports.profile = async (req, res) => {
  if (res.locals.user) {
    const courses = res.locals.user.courses;
    const course1 = await courseModel.findOne({ _id: courses[0] });
    const course2 = await courseModel.findOne({ _id: courses[1] });
    const course3 = await courseModel.findOne({ _id: courses[2] });

    let updatedCourses = [];
    if (course1 && course1.name) {
      updatedCourses.push(course1.name);
    }
    if (course2 && course2.name) {
      updatedCourses.push(course2.name);
    }
    if (course3 && course3.name) {
      updatedCourses.push(course3.name);
    }

    res.locals.user.courses = updatedCourses;
    res.json(res.locals.user);
    // res.status(500).json({ message: "Error fetching courses" });
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};

exports.panel = async (req, res) => {
  const filePath = path.join(__dirname, "../public/teacher/panel.html");
  res.sendFile(filePath);
};

exports.Login = async (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;

  try {
    const teacher = await teacherModel.findOne({ username });
    if (teacher) {
      const auth = await bcrypt.compare(password, teacher.password);
      if (auth) {
        res.status(200);
        const token = createToken(
          teacher._id,
          teacher.username,
          teacher.courses
        );
        res.cookie("jwt", token, { httpOnly: true, maxAge: 259200000 });
        console.log("logged in!!!");
        res.status(201).json({ teacher: teacher._id });
      } else {
        throw Error("incorrect pass");
      }
    } else {
      throw Error("incorrect username");
    }
  } catch (e) {
    console.log(e);
    res.status(400);
  }
};
