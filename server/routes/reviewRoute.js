const express = require("express");
const router = express.Router();
const Review = require("../models/reviewModel");
const Course = require("../models/courseModel");

//

router.route("/course/:name").get((req, res) => {
  try {
    Review.find({ class_name: req.params.name }).then((foundReviews) => {
      res.json(foundReviews);
    });
  } catch (err) {
    console.log(err);
  }
});

router.route("/liked").post((req, res) => {
  if (req.body.type === "liked")
    Review.findOneAndUpdate(
      { _id: req.body.comment_id },
      { $inc: { like: 1 } },
      { new: true }
    ).then((foundReviews) => {
      console.log(`comment ${req.body.comment_id} liked`);
    });
  else if (req.body.type === "disliked")
    Review.findOneAndUpdate(
      { _id: req.body.comment_id },
      { $inc: { dislike: 1 } },
      { new: true }
    ).then((foundReviews) => {
      console.log(`comment ${req.body.comment_id} disliked`);
    });
  else if (req.body.type === "remove-liked")
    Review.findOneAndUpdate(
      { _id: req.body.comment_id },
      { $inc: { like: -1 } },
      { new: true }
    ).then((foundReviews) => {
      console.log(`comment ${req.body.comment_id} undid liked`);
    });
  else if (req.body.type === "remove-disliked")
    Review.findOneAndUpdate(
      { _id: req.body.comment_id },
      { $inc: { dislike: -1 } },
      { new: true }
    ).then((foundReviews) => {
      console.log(`comment ${req.body.comment_id} undid disliked`);
    });
});

router.route("/submit-review").post(async(req, res) => {
  var new_avg =
    (req.body["current_review_avg"] * req.body["current_review_count"] +
      req.body["difficulty"]) /
    (req.body["current_review_count"] + 1);
  new_avg = parseFloat(new_avg.toFixed(2));

  try {
    const foundReviews = await Review.find({ user_email: req.body["user_email"], class_name: req.body["class_name"] });
    if (foundReviews.length !== 0) {
      console.log(`user ${req.body["user_email"]} already reviewed ${req.body["class_name"]}`)
      return res.json(`You already reviewed ${req.body["class_name"]}`);
    }
  } catch (err) {
    console.log(err);
  }

  Course.findOneAndUpdate(
    { course_name: req.body["class_name"] },
    { $set: { average_diff: new_avg } },
    { new: true }
  )
    .then((foundCourses) => {
      console.log(`course ${req.body["class_name"]} updated`);
    })
    .catch((err) => {
      console.log(err);
    });

  delete req.body["current_review_count"];
  delete req.body["current_review_avg"];
  Review.create(req.body)
    .then((createdReview) => {
      res.json(`new review created: ${createdReview}`);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route("/query-course/:course").get((req, res) => {
  const course_name_regex = new RegExp(
    "^" + req.params.course.split("").join(".*") + ".*$",
    "i"
  );
  try {
    Course.find({ course_name: { $regex: course_name_regex } })
      .limit(10)
      .then((foundCourses) => {
        res.json(foundCourses);
      });
  } catch (err) { 
    console.log(err); 
  }
});

router.route("/get-course/:course").get((req, res) => {
  Course.find({ course_name: req.params.course }).then((foundCourses) => {
    res.json(foundCourses);
  });
});

router.route("/get-courses-from-subject-code/:subjectCode").get((req, res) => {
  try {
    Course.find({ subject_code: req.params.subjectCode }).then((foundCourses) => {
      res.json(foundCourses);
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
