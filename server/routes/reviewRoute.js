const express = require("express");
const router = express.Router();
const Review = require("../models/reviewModel");
const Course = require("../models/courseModel");

//

router.route("/course/:name").get((req, res) => {
    Review.find({ class_name: req.params.name })
        .then(
            foundReviews => {
              res.json(foundReviews)
            }
        )
})

router.route("/query-course/:course").get((req, res) => {
  const course_name_regex = new RegExp('^'+req.params.course.split('').join('.*')+'.*$', 'i');
  Course.find({ course_name: { $regex: course_name_regex } }).limit(10)
      .then(
          foundCourses => {
            res.json(foundCourses)
          }
      )
})

module.exports = router;