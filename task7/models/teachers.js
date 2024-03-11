const mongoose = require('mongoose');

  const teacherSchema = new mongoose.Schema({
    name: String,
    qualificaton: String,
    age: Number,
    salary: Number,
    address: String,
    ph: Number
  });

  const Teacher = mongoose.model('Teacher', teacherSchema);

  module.exports = Teacher;
