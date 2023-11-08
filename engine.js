const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const app = express();

app.use(bodyParser.json());

const authController = require("./controllers/authController");
const examController = require("./controllers/examController");
const questionController = require("./controllers/questionController");
const marksController = require("./controllers/marksController");
const examCodeController = require("./controllers/examCodeController");

app.use(
  "/",
  authController,
  examController,
  examCodeController,
  questionController,
  marksController
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
