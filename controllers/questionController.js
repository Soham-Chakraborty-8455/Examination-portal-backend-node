const express = require("express");
const router = express.Router();
const { insertDocument } = require("../mongo"); // Assuming insertDocument function is correctly implemented

router.post("/addQ", async (req, res) => {
  const { ExamPaper } = req.body;

  try {
    await insertDocument(ExamPaper);
    res.json({ trigger: true });
  } catch (error) {
    res.status(500).json({ error: "Error adding questions" });
  }
});

module.exports = router;
