const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const teacherModel = require("../models/Teacher");

const createToken = (id, role) => {
  return jwt.sign({ id, role }, "saadsalman", { expiresIn: 259200000 });
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
        const token = createToken(teacher._id);
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
