const mongoose = require("../db");

const questionSchema = new mongoose.Schema({
  examId: {
    type: String,
    required: true,
  },
  questionText: {
    type: String,
    required: true,
  },
  options: [
    {
      optionText: {
        type: String,
        required: true,
      },
      isCorrect: {
        type: Boolean,
        required: true,
      },
    },
  ],
});

const Question = mongoose.model("Question", questionSchema);
module.exports = Question;
