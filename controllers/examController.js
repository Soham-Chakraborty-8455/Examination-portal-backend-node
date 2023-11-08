const express = require("express");
const router = express.Router();
const Exam = require("../models/Exam");

router.post("/createTest", async (req, res) => {
  const {
    ExamName,
    SubjectCode,
    Session,
    Date,
    StartTime,
    semester,
    duration,
  } = req.body;

  try {
    const exam = new Exam({
      exam_name: ExamName,
      subject_code: SubjectCode,
      exam_startdate: Date,
      exam_starttime: StartTime,
      exam_duration: duration,
      session: Session,
      semester,
    });

    await exam.save();

    const today = new Date();
    const finalid = `IEM@${today.getFullYear()}${exam.examid}`;

    res.json({ examid: finalid });
  } catch (error) {
    res.status(500).json({ error: "Error creating exam" });
  }
});

module.exports = router;
