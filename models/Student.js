const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const studentSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "enter a username!"],
    unique: [true, "enter a different username!"],
  },
  password: {
    type: String,
    required: [true, "enter a password!"],
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: "Course",
  },
});

studentSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
