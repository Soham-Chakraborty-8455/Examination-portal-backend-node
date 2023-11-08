const mongoose = require("../db");

const teacherSchema = new mongoose.Schema({
  teacherid: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  phonenumber: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

const Teacher = mongoose.model("Teacher", teacherSchema);
module.exports = Teacher;
