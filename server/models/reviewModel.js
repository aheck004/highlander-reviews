const { Double, Int32 } = require("mongodb");
const mongoose = require("mongoose");

const reviewSchema = {
  user_email: String,
  class_name: String,
  additional_comments: String,
  difficulty: Number,
  date: String,
  like: Number,
  dislike: Number,
}

const Review = mongoose.model("review", reviewSchema);

module.exports = Review; //After exporting, Review is now usable in routes.