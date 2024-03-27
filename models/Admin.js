const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "enter a username!"],
    unique: [true, "enter a different username!"],
  },
  password: {
    type: String,
    required: [true, "enter a password!"],
  },
});

adminSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
