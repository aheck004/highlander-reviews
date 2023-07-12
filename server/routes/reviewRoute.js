const express = require("express");
const router = express.Router();
const Review = require("../models/reviewModel");

//

router.route("/course/:name").get((req, res) => {
    Review.find({ class_name: req.params.name })
        .then(
            foundReviews => {
              res.json(foundReviews)
            }
        )
})

module.exports = router;