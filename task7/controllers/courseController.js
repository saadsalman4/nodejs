const courseModel = require("../models/courses.js");

exports.getCourseById = async (req, res) => {
  try {
    const course = await courseModel.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(course);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.get = async (req, res) => {
  const courses = await courseModel.find({});

  try {
    res.send(courses);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.post = async (req, res) => {
  const courses = new courseModel(req.body);
  console.log(req.body);

  try {
    await courses.save();
    res.send(courses);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.patch = async (req, res) => {
  try {
    await courseModel.findByIdAndUpdate(req.params.id, req.body);
    await courseModel.save();
    res.send(courses);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.delete = async (req, res) => {
  try {
    const courses = await courseModel.findByIdAndDelete(req.params.id);

    if (!courses) res.status(404).send("No item found");
    res.status(200).send();
  } catch (error) {
    res.status(500).send(error);
  }
};
