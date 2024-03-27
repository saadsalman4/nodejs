const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const studentModel = require("../models/Student");

const createToken = (id, role) => {
  return jwt.sign({ id, role }, "saadsalman", { expiresIn: 259200000 });
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
        const token = createToken(student._id);
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
