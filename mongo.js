async function insertDocument(anything) {
  try {
    const document = new Exam(anything);
    await document.save();
    console.log(`Document with id ${document._id} has been created`);
  } catch (error) {
    console.error(error);
  }
}

async function appendDoc(marks, examid, enrollmentNo) {
  try {
    const count = await Exam.countDocuments({ examid: examid });
    console.log(count);

    if (count === 0) {
      const examObject = { examid: examid, marks: marks };
      await Exam.updateOne(
        { enrollment_number: enrollmentNo },
        { $push: { exams: examObject } },
        { upsert: true }
      );
      console.log("Done");
    }
  } catch (error) {
    console.error(error);
  }
}

async function readDocuments(examId) {
  try {
    const questions = await Exam.findOne({ examid: examId });
    return questions;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function fetchMarks(examID, enrollmentNo) {
  try {
    const query = { enrollment_number: enrollmentNo, "exams.examid": examID };
    const result = await Exam.findOne(query, { "exams.$": 1 });

    if (result && result.exams.length > 0) {
      return result.exams[0].marks;
    } else {
      return "Marks not found";
    }
  } catch (error) {
    console.error(error);
    return "Error fetching marks";
  }
}

async function checkIfExists(examid, enrollment) {
  try {
    const count = await Exam.countDocuments({
      examid: examid,
      enrollment_number: enrollment,
    });
    console.log(count);
    return count === 0;
  } catch (error) {
    console.error(error);
    return false;
  }
}
