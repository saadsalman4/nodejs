const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const studentModel = require("../models/Student");
const path = require("path");
const courseModel = require("../models/Course");

const createToken = (id, username, course) => {
  return jwt.sign({ id, username, course }, "saadsalman_student", {
    expiresIn: 259200000,
  });
};

exports.panel = async (req, res) => {
  const filePath = path.join(__dirname, "../public/student/panel.html");
  res.sendFile(filePath);
};

exports.profile = async (req, res) => {
  if (res.locals.user) {
    const course = res.locals.user.course;
    const course_ = await courseModel.findOne({ _id: course });

    if (course_ && course_.name) {
      res.locals.user.course = course_.name;
    }

    res.json(res.locals.user);
    // res.status(500).json({ message: "Error fetching courses" });
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};

exports.Login = async (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;

  try {
    const student = await studentModel.findOne({ username });
    if (student) {
      const auth = await bcrypt.compare(password, student.password);
      if (auth) {
        res.status(200);
        const token = createToken(
          student._id,
          student.username,
          student.course
        );
        res.cookie("jwt", token, { httpOnly: true, maxAge: 259200000 });
        console.log("logged in!!!");
        res.status(201).json({ student: student._id });
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
