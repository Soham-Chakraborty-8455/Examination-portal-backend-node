const express = require("express");
const router = express.Router();
const Student = require("../models/Student");
const Teacher = require("../models/Teacher");
const { insertDocument } = require("../mongo"); // Assuming you have insertDocument function defined

router.post("/signup", async (req, res) => {
  const { enrollment_number, name, email, phone_number } = req.body;
  try {
    const user = new Student({
      enrollment_number,
      name,
      email,
      phone_number,
    });
    await user.save();
    insertDocument({ enrollment_number, name, email, phone_number }); // Assuming this function is correctly implemented
    res.json({ auth: true });
  } catch (error) {
    res.status(500).json({ error: "Error creating user" });
  }
});

router.post("/login", async (req, res) => {
  const { enrollment_number, phone_number } = req.body;
  try {
    const user = await Student.findOne({ enrollment_number, phone_number });
    if (user) {
      res.json({ auth: true });
    } else {
      res.json({ auth: false });
    }
  } catch (error) {
    res.status(500).json({ error: "Error during login" });
  }
});

router.post("/teachersignup", async (req, res) => {
  const { teacherid, phone_number, email, name } = req.body;
  try {
    const teacher = new Teacher({
      teacherid,
      phonenumber: phone_number,
      email,
      name,
    });
    await teacher.save();
    res.json({ teachername: name, auth: true });
  } catch (error) {
    res.status(500).json({ error: "Error creating teacher" });
  }
});

router.post("/teacherlogin", async (req, res) => {
  const { teacherid, phonenumber } = req.body;
  try {
    const teacher = await Teacher.findOne({ teacherid, phonenumber });
    if (teacher) {
      res.json({ auth: true });
    } else {
      res.json({ auth: false, error: "Invalid Credentials" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error during login" });
  }
});

module.exports = router;
