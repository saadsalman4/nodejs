const express = require("express");
const router = express.Router();
const courseModel = require("../models/Course");

router.get("/courses", async (req, res) => {
  const courses = await courseModel.find({});

  try {
    res.send(courses);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
