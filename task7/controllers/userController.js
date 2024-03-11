const userModel = require("../models/users.js");

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
