const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "enter a name!"],
    unique: [true, "enter a different name!"],
  },
  code: {
    type: String,
    required: [true, "enter a code!"],
  },
  teacher: {
    type: Schema.Types.ObjectId,
    ref: "Teacher",
  },
  students: [
    {
      type: Schema.Types.ObjectId,
      ref: "Student",
    },
  ],
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
