const express = require("express");
const router = express.Router();
const { checkIfExists, appendDoc, fetchMarks } = require("../mongo"); // Assuming these functions are correctly implemented

router.post("/marks/:enrollment_number", async (req, res) => {
  const { enrollment } = req.body;
  const { examid } = req.params;

  try {
    const flag = await checkIfExists(examid, enrollment);

    if (flag) {
      const marks = req.body.marks;
      await appendDoc(marks, examid, req.params.enrollment_number);
      res.json({ success: true });
    } else {
      const my_marks = await fetchMarks("IEM@202318", "12021002019019"); // Assuming these arguments are correct
      res.json({ marks: my_marks });
    }
  } catch (error) {
    res.status(500).json({ error: "Error adding marks" });
  }
});

module.exports = router;
