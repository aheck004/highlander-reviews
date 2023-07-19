const mongoose = require("mongoose");

const courseSchema = {
  course_name: String,
  subject_code: String,
  course_number: String,
  average_diff: Number
}

const Course = mongoose.model("course", courseSchema);

module.exports = Course; //After exporting, Review is now usable in routes.