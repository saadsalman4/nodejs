const teacherModel = require("../models/teachers.js");

exports.getTeacherById = async (req, res) => {
  try {
    const teacher = await teacherModel.findById(req.params.id);
    if (!teacher) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(teacher);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.get = async (req, res) => {
  const teachers = await teacherModel.find({});

  try {
    res.send(teachers);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.post = async (req, res) => {
  const teachers = new teacherModel(req.body);
  console.log(req.body);

  try {
    await teachers.save();
    res.send(teachers);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.patch = async (req, res) => {
  try {
    await teacherModel.findByIdAndUpdate(req.params.id, req.body);
    await teacherModel.save();
    res.send(teachers);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.delete = async (req, res) => {
  try {
    const teachers = await teacherModel.findByIdAndDelete(req.params.id);

    if (!teachers) res.status(404).send("No item found");
    res.status(200).send();
  } catch (error) {
    res.status(500).send(error);
  }
};
