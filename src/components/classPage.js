import React, { useState, useEffect } from "react";
import Review from "./review";
import DifficultyGraph from "./DifficultyGraph";
import axios from "axios";
import { useParams } from "react-router-dom";
import CreateReviewModal from "./CreateReview";
import { Box, Paper, Typography, Divider, Chip } from "@mui/material";
import CourseSlider from "./CourseSlider";
import SortButton from "./SortButton";
import "./classPage.css";

function ClassPage() {
  const [reviews, setReviews] = useState([]);
  const [graphData, setGraphData] = useState([0, 0, 0, 0, 0]);
  const [averageDiff, setAverageDiff] = useState(0);
  const { subjectCode } = useParams();
  const { courseNumber } = useParams();
  const course = subjectCode + courseNumber;

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_NODE_SERVER + `/course/${course}`)
      .then((response) => {
        setReviews(response.data); //updates useState reviews to redraw the DOM
        const data = [0, 0, 0, 0, 0];
        response.data.map((review) => {
          data[Math.ceil(review.difficulty / 2) - 1]++;
        });
        setGraphData(data.reverse());
      })
      .catch((error) => console.error(error));
    axios
      .get(process.env.REACT_APP_NODE_SERVER + `/get-course/${course}`)
      .then((response) => {
        setAverageDiff(response.data[0].average_diff);
      });
  }, [subjectCode, courseNumber]);

  return (
    <div className="class-page-root">
      <Box className="course-hero">
        <Box className="course-hero-left">
          <Typography>{course}</Typography>
          <Typography>{parseFloat(averageDiff / 2).toFixed(2)}/5</Typography>
          <CreateReviewModal />
        </Box>
        <Box className="course-hero-right">
          <Paper
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <DifficultyGraph review_data={graphData} />
          </Paper>
          <CourseSlider subject={subjectCode} />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          margin: "10px",
        }}
      >
        <Divider textAlign="right" orientation="horizontal" sx={{ flex: 1 }}>
          <Chip label={reviews.length} />
        </Divider>
        <Divider orientation="horizontal" sx={{ flex: 1 }}>
          <SortButton reviews={reviews} setReviews={setReviews} />
        </Divider>
      </Box>
      <div className="review-column">
        {reviews.map((review) => {
          //for every review return a <Review/> component
          return (
            <Review
              comment={review.additional_comments}
              diff={review.difficulty}
              date={review.date}
            />
          );
        })}
      </div>
    </div>
  );
}

export default ClassPage;
