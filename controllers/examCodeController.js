const express = require("express");
const router = express.Router();
const Exam = require("../models/Exam");
const moment = require("moment");

router.post("/entercode", async (req, res) => {
  const { examCode, enrollment_number } = req.body;
  const code = parseInt(examCode.substring(8));

  try {
    const exam = await Exam.findOne({ examid: code });
    if (!exam) {
      res.status(404).json({ error: "Exam not found" });
      return;
    }

    const examStartTime = moment(
      `${exam.exam_startdate} ${exam.exam_starttime}`,
      "YYYY-MM-DD HH:mm:ss"
    );
    const currentTime = moment();

    const durationInMilliseconds = exam.exam_duration * 60 * 1000;
    const remainingTime = examStartTime.diff(currentTime, "milliseconds");
    const difference = examStartTime.diff(currentTime, "seconds");

    let eligibility = false;
    if (currentTime.isBefore(examStartTime)) {
      eligibility = true;
    }

    res.json({
      questionpaper: exam.questions, // Assuming exam questions are stored in the "questions" field of the exam document
      remainingTime,
      duration: durationInMilliseconds,
      difference,
      eligibility,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
