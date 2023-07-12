const mongoose = require("mongoose");

const reviewSchema = {
    class_name: String,
    average_difficulty: String, //TODO: Remove average_difficulty later in data cleaning.
    additional_comments: String,
    difficulty: String,
    date: String
}

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review; //After exporting, Review is now usable in routes.