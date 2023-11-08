const mongoose = require("../db");

const studentSchema = new mongoose.Schema({
  enrollment_number: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone_number: {
    type: String,
    required: true,
    unique: true,
  },
});

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;
