const mongoose = require("../db");

const examSchema = new mongoose.Schema({
  examid: {
    type: Number,
    required: true,
    unique: true,
  },
  exam_name: {
    type: String,
    required: true,
  },
  exam_startdate: {
    type: Date,
    required: true,
  },
  exam_starttime: {
    type: String,
    required: true,
  },
  semester: {
    type: Number,
    required: true,
  },
  exam_duration: {
    type: Number,
    required: true,
  },
  subject_code: {
    type: String,
    required: true,
  },
  session: {
    type: String,
    required: true,
  },
});

const Exam = mongoose.model("Exam", examSchema);
module.exports = Exam;
