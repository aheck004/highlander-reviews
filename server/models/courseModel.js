const mongoose = require("mongoose");

const courseSchema = {
  class_name: String,
  subject_code: String,
  course_number: String,
  average_diff: Number,
  course_title: String,
  course_description: String,
  number_of_reviews: Number
}

const Course = mongoose.model("course", courseSchema);

module.exports = Course; //After exporting, Review is now usable in routes.
