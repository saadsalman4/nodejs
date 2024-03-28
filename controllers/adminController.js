const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const path = require("path");
const adminModel = require("../models/Admin");
const teacherModel = require("../models/Teacher");
const studentModel = require("../models/Student");
const courseModel = require("../models/Course");

const createToken = (id, role) => {
  return jwt.sign({ id, role }, "saadsalman", { expiresIn: 259200000 });
};

exports.Panel = async (req, res) => {
  const filePath = path.join(__dirname, "../public/admin/panel.html");
  res.sendFile(filePath);
};

exports.addTeacher_get = async (req, res) => {
  const filePath = path.join(__dirname, "../public/admin/addTeacher.html");
  res.sendFile(filePath);
};

exports.addStudent_get = async (req, res) => {
  const filePath = path.join(__dirname, "../public/admin/addStudent.html");
  res.sendFile(filePath);
};

exports.addCourse_get = async (req, res) => {
  const filePath = path.join(__dirname, "../public/admin/addCourse.html");
  res.sendFile(filePath);
};

exports.assignCourses_get = async (req, res) => {
  const filePath = path.join(__dirname, "../public/admin/assignCourses.html");
  res.sendFile(filePath);
};

exports.assignCoursesToStudent_get = async (req, res) => {
  const filePath = path.join(
    __dirname,
    "../public/admin/assignCoursesToStudent.html"
  );
  res.sendFile(filePath);
};

exports.Login = async (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;

  try {
    const admin = await adminModel.findOne({ username });
    if (admin) {
      const auth = await bcrypt.compare(password, admin.password);
      if (auth) {
        res.status(200);
        const token = createToken(admin._id);
        res.cookie("jwt", token, { httpOnly: true, maxAge: 259200000 });
        console.log("logged in!!!");
        res.status(201).json({ admin: admin._id });
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

exports.Register = async (req, res, next) => {
  const { username, password, key } = req.body;

  if (key != "saad") {
    return;
  }

  try {
    const admin = await adminModel.create({ username, password });
    const token = createToken(admin._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: 259200000 });
    res.status(201).json({ admin: admin._id });
  } catch (err) {
    console.log(err);
    res.status(400).send("not created");
  }
};

exports.viewAdmins = async (req, res) => {
  const admins = await adminModel.find({});

  try {
    res.send(admins);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.viewTeachers = async (req, res) => {
  const teachers = await teacherModel.find({});

  try {
    res.send(teachers);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.viewStudents = async (req, res) => {
  const students = await studentModel.find({});

  try {
    res.send(students);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.addTeacher = async (req, res) => {
  const { username, password } = req.body;

  try {
    const teacher = await teacherModel.create({ username, password });
    res.status(201).json({ teacher: teacher._id });
  } catch (err) {
    console.log(err);
    res.status(400).send("not created");
  }
};

exports.addStudent = async (req, res) => {
  const { username, password } = req.body;

  try {
    const student = await studentModel.create({ username, password });
    res.status(201).json({ student: student._id });
  } catch (err) {
    console.log(err);
    res.status(400).send("not created");
  }
};

exports.addCourse = async (req, res) => {
  const { name, code } = req.body;

  try {
    const course = await courseModel.create({ name, code });
    res.status(201).json({ course: course._id });
  } catch (err) {
    console.log(err);
    res.status(400).send("not created");
  }
};

exports.showCourses = async (req, res) => {
  try {
    const courses = await courseModel.find({}, "name");
    const names = courses.map((course) => course.name);
    res.json(names);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching entries" });
  }
};

exports.showTeachers = async (req, res) => {
  try {
    const teachers = await teacherModel.find({}, "username");
    const names = teachers.map((teacher) => teacher.username);
    res.json(names);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching entries" });
  }
};

exports.assignCourses = async (req, res) => {
  try {
    const { username, course1, course2, course3 } = req.body;
    if (!username) {
      return res.status(400).send("Missing username");
    }
    if (course1 === course2 || course1 === course3 || course2 === course3) {
      return res.status(400).send("Courses must be unique");
    }

    const teachers = await teacherModel.findOne({ username: username });

    const coursesToAssign = [];
    if (course1) {
      const course = await courseModel.findOneAndUpdate(
        { name: course1 },
        { $addToSet: { teacher: teachers._id } }, // Add the teacher to the course's teachers array
        { new: true } // Return the updated document
      );
      if (course) coursesToAssign.push(course._id);
    }
    if (course2) {
      const course = await courseModel.findOneAndUpdate(
        { name: course2 },
        { $addToSet: { teacher: teachers._id } }, // Add the teacher to the course's teachers array
        { new: true } // Return the updated document
      );
      if (course) coursesToAssign.push(course._id);
    }
    if (course3) {
      const course = await courseModel.findOneAndUpdate(
        { name: course3 },
        { $addToSet: { teacher: teachers._id } }, // Add the teacher to the course's teachers array
        { new: true } // Return the updated document
      );
      if (course) coursesToAssign.push(course._id);
    }

    const teacher = await teacherModel.findOneAndUpdate(
      { username: username },
      { $set: { courses: coursesToAssign } },
      { new: true } // Return the updated document
    );
    res.status(201).json({ message: "Courses assigned successfully", teacher });
  } catch (err) {
    console.log(err);
    res.status(400).send("not created");
  }
};

exports.showStudents = async (req, res) => {
  try {
    const students = await studentModel.find({}, "username");
    const names = students.map((student) => student.username);
    res.json(names);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching entries" });
  }
};

exports.assignCoursesToStudent = async (req, res) => {
  try {
    const { username, course } = req.body;
    if (!username) {
      return res.status(400).send("Missing username");
    }

    const courses = await courseModel.findOne({ name: course });

    const student = await studentModel.findOneAndUpdate(
      { username: username },
      { $set: { course: courses } },
      { new: true } // Return the updated document
    );

    const course_update = await courseModel.findOneAndUpdate(
      { name: course },
      { $addToSet: { students: student } },
      { new: true }
    );

    res.status(201).json({ message: "Course assigned successfully", student });
  } catch (err) {
    console.log(err);
    res.status(400).send("Not created");
  }
};
