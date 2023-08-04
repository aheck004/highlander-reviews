const express = require("express");
const router = express.Router();
const Course = require("../models/courseModel");

//

router
  .route("/get-course-count-from-subject-code/:subjectCode")
  .get((req, res) => {
    try {
      Course.countDocuments({ subject_code: req.params.subjectCode }).then(
        (courseCount) => {
          res.json(courseCount);
        }
      );
    } catch (err) {
      console.log(err);
    }
  });

module.exports = router;
