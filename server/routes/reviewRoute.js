const express = require("express");
const router = express.Router();
const Review = require("../models/reviewModel");
const Course = require("../models/courseModel");

//

router.route("/course/:name").get((req, res) => {
  Review.find({ class_name: req.params.name }).then((foundReviews) => {
    res.json(foundReviews);
  });
});

router.route("/liked").post((req, res) => {
  if (req.body.type === "liked")
    Review.findOneAndUpdate({ _id: req.body.comment_id }, { $inc: { like: 1 } })
  else if (req.body.type === "disliked")
    Review.findOneAndUpdate({ _id: req.body.comment_id }, { $inc: { dislike: 1 } })
  else if (req.body.type === "remove-liked")
    Review.findOneAndUpdate({ _id: req.body.comment_id }, { $inc: { like: -1 } })
  else if (req.body.type === "remove-disliked")
    Review.findOneAndUpdate({ _id: req.body.comment_id }, { $inc: { dislike: -1 } })
});

router.route("/submit-review").post((req, res) => {
  var new_avg = ((req.body["current_review_avg"] * req.body["current_review_count"]) + (req.body["difficulty"])) / (req.body["current_review_count"] + 1)
  new_avg = parseFloat(new_avg.toFixed(2));

  Course.findOneAndUpdate({course_name: req.body["class_name"]}, {$set: {average_diff: new_avg}}, {new: true})
  .then((foundCourses) => {
    console.log(foundCourses);
  })
  .catch((err) => {
    console.log(err);
  });

  delete req.body["current_review_count"];
  delete req.body["current_review_avg"];
  Review.create(req.body);
});

router.route("/query-course/:course").get((req, res) => {
  const course_name_regex = new RegExp(
    "^" + req.params.course.split("").join(".*") + ".*$",
    "i"
  );
  Course.find({ course_name: { $regex: course_name_regex } })
    .limit(10)
    .then((foundCourses) => {
      res.json(foundCourses);
    });
});

router.route("/get-course/:course").get((req, res) => {
  Course.find({ course_name: req.params.course})
    .then((foundCourses) => {
      res.json(foundCourses);
    });
});

router.route("/get-courses-from-subject-code/:subjectCode").get((req, res) => {
  Course.find({ subject_code: req.params.subjectCode })
    .then((foundCourses) => {
      res.json(foundCourses);
    });
});

module.exports = router;
