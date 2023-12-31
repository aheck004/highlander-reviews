import React, { useState } from "react";
import { Paper, 
  Divider, 
  Typography, 
  IconButton,
  Zoom
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import "./classPage.css";
import axios from "axios";
import { ThemeProvider } from "@mui/material/styles";
import { themes } from "./themes";
import { useTheme } from "./ThemeContext";

function convertToMMDDYYYY(isoDate) {
  const dateParts = isoDate.split("/");
  const MMDDYYYY = dateParts[1] + "/" + dateParts[2].split("T")[0] + "/" + dateParts[0];
  return MMDDYYYY;
}

function Review({ count, review }) {
  const [liked, setLiked] = useState(null);

  const theme = themes[useTheme().theme];

  function Liked(bool) {
    var type = bool ? "liked" : "disliked";
    if (bool) {
      if (liked === true) {
        setLiked(null);
        type = "remove-liked";
      } else {
        setLiked(true);
      }
    } else {
      if (liked === false) {
        setLiked(null);
        type = "remove-disliked";
      } else {
        setLiked(false);
      }
    }

    const data = {
      comment_id: review._id,
      type: type,
    };

    axios.create({
        withCredentials: true,
      })
      .post(process.env.REACT_APP_NODE_SERVER + `/liked`, data)
      .then((response) => {})
      .catch((error) => {});
  }
  
  return (
    <ThemeProvider theme={theme}>
      <Zoom in={true} timeout={500} style={{transitionDelay:50*count}}>
      <Paper elevation={4} className="review" style={{ backgroundColor: theme.palette.secondary.main }}>
        <span className="review-header">
          <div className="review-difficulty">
            <Typography color="secondary.contrastText">Difficulty: </Typography>
            {[...Array(Math.floor(review.difficulty / 2))].map((_, count) => {
              return <StarIcon key={count} color="accent" />;
            })}
            {review.difficulty % 2 == 0 ? (
              <></>
            ) : (
              <StarHalfIcon color="accent" />
            )}
            {[...Array(Math.floor(5 - review.difficulty / 2))].map(
              (_, count) => {
                return <StarOutlineIcon key={count} color="accent" />;
              }
            )}
          </div>
          <div className="review-date"> <Typography color="secondary.contrastText">{convertToMMDDYYYY(review.date)}</Typography></div>
        </span>
        <Divider />
        <div className="review-comment"><Typography color="secondary.contrastText">{review.additional_comments}</Typography></div>
        <div className="control-bar">
          <div className="helpful">
            <Typography color="secondary.contrastText" fontWeight={'bold'}>Helpful?</Typography>
            <IconButton onClick={() => Liked(true)}>
              <Typography sx={{ color: liked ? "green" : theme.palette.accent.main }}>
                {liked === true ? review.like + 1 : review.like}
              </Typography>
              <ThumbUpIcon sx={{ color: liked ? "green" : theme.palette.accent.main }} />
            </IconButton>
            <IconButton onClick={() => Liked(false)}>
              <Typography
                sx={{
                  color:
                    liked === true ? theme.palette.accent.main : liked === false ? "red" : theme.palette.accent.main,
                }}
              >
                {liked === false ? review.dislike + 1 : review.dislike}
              </Typography>
              <ThumbDownIcon
                sx={{
                  color:
                    liked === true ? theme.palette.accent.main : liked === false ? "red" : theme.palette.accent.main,
                }}
              />
            </IconButton>
          </div>
        </div>
      </Paper>
      </Zoom>
    </ThemeProvider>
  );
}

export default Review;
