const express = require("express");
const router = express.Router();
const Review = require("../models/reviewModel");

//

router.route("/course/:name").get((req, res) => {
  console.log(req.params.name)
    Review.find({ class_name: req.params.name })
        .then(
            foundReviews => {
              res.json(foundReviews)
              console.log(foundReviews)
            }
        )
})

module.exports = router;