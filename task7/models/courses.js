const mongoose = require('mongoose');

  const courseSchema = new mongoose.Schema({
    courseName: String,
    courseCode: String,
    creditHours: Number,
    instructor: String
  });

  const Course = mongoose.model('Course', courseSchema);

  module.exports = Course;
