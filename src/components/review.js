import React, { useState, useEffect } from "react";
import { Paper, Divider, Typography, IconButton } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import "./classPage.css";
import axios from "axios";

function Review({ review }) {
  const [liked, setLiked] = useState(null);

  function Liked(bool) {
    var type = bool ? "liked" : "disliked";
    if (bool) {
      if (liked === true) {
        setLiked(null);
        type = "remove-liked";
        return;
      } else {
        setLiked(true);
      }
    } else {
      if (liked === false) {
        setLiked(null);
        type = "remove-disliked";
        return;
      } else {
        setLiked(false);
      }
    }

    const data = {
      comment_id: review._id,
      type: type
    };

    axios
      .post(process.env.REACT_APP_NODE_SERVER + `/liked`, data)
      .then((response) => {})
      .catch((error) => {});
  }

  return (
    <Paper elevation={4} className="review">
      <span className="review-header">
        <div className="review-difficulty">
          <Typography>Difficulty: </Typography>
          {[...Array(Math.floor(review.difficulty / 2))].map((_, count) => {
            return <StarIcon />;
          })}
          {review.difficulty % 2 == 0 ? <></> : <StarHalfIcon />}
          {[...Array(Math.floor(5 - review.difficulty / 2))].map((_, count) => {
            return <StarOutlineIcon />;
          })}
        </div>
        <div className="review-date">{review.date}</div>
      </span>
      <Divider />
      <div className="review-comment">{review.additional_comments}</div>
      <div className="control-bar">
        <div className="helpful">
          <p>
            <b>Helpful?</b>
          </p>
          <IconButton onClick={() => Liked(true)}>
            <Typography>{liked===true ? review.like+1:review.like}</Typography>
            <ThumbUpIcon sx={{ color: liked ? "green" : "grey" }} />
          </IconButton>
          <IconButton onClick={() => Liked(false)}>
            <Typography>{liked===false ? review.dislike+1:review.dislike}</Typography>
            <ThumbDownIcon
              sx={{
                color:
                  liked === true ? "grey" : liked === false ? "red" : "grey",
              }}
            />
          </IconButton>
        </div>
      </div>
    </Paper>
  );
}

export default Review;
