const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const teacherSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "enter a username!"],
    unique: [true, "enter a different username!"],
  },
  password: {
    type: String,
    required: [true, "enter a password!"],
  },
  courses: [
    {
      type: Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
});

teacherSchema.path("courses").validate(function (value) {
  return value.length <= 3;
}, "Maximum of 3 courses allowed");

teacherSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const Teacher = mongoose.model("Teacher", teacherSchema);

module.exports = Teacher;
