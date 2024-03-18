const userModel = require("../models/users.js");
const path = require("path");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const createToken = (id, role) => {
  return jwt.sign({ id, role }, "saadsalman", { expiresIn: 259200000 });
};

exports.logout = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};

exports.loginUser_get = async (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "login.html"));
};

exports.registerUser_get = async (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "register.html"));
};

exports.loginUser_post = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await userModel.findOne({ username });
    if (user) {
      const auth = await bcrypt.compare(password, user.password);
      if (auth) {
        res.status(200);
        const token = createToken(user._id, user.role);
        res.cookie("jwt", token, { httpOnly: true, maxAge: 259200000 });
        console.log("logged in!!!");
        res.status(201).json({ user: user._id });
        return user.role;
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

exports.registerUser_post = async (req, res, next) => {
  const { username, password, role } = req.body;

  try {
    const user = await userModel.create({ username, password, role });
    const token = createToken(user._id, user.role);
    res.cookie("jwt", token, { httpOnly: true, maxAge: 259200000 });
    res.status(201).json({ user: user._id });
  } catch (err) {
    console.log(err);
    res.status(400).send("not created");
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.get = async (req, res) => {
  const users = await userModel.find({});

  try {
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.post = async (req, res) => {
  const users = new userModel(req.body);
  console.log(req.body);

  try {
    await users.save();
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.patch = async (req, res) => {
  try {
    await userModel.findByIdAndUpdate(req.params.id, req.body);
    await userModel.save();
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.delete = async (req, res) => {
  try {
    const users = await userModel.findByIdAndDelete(req.params.id);

    if (!users) res.status(404).send("No item found");
    res.status(200).send();
  } catch (error) {
    res.status(500).send(error);
  }
};
