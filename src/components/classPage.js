import React, { useState, useEffect } from "react";
import Review from "./review";
import DifficultyGraph from "./DifficultyGraph";
import axios from "axios";
import { useParams } from "react-router-dom";
import CreateReviewModal from "./CreateReview";
import { Box, Paper, Typography, Divider, Chip, Button } from "@mui/material";
import CourseSlider from "./CourseSlider";
import SortButton from "./SortButton";
import PrimarySearchAppBar from "./Header";
import GoogleIcon from "@mui/icons-material/Google";
import "./classPage.css";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme.js";
import Cookie from "js-cookie";
import getGoogleOAuthURL from "../getGoogleURL.js";

function ClassPage() {
  const [reviews, setReviews] = useState([]);
  const [graphData, setGraphData] = useState([0, 0, 0, 0, 0]);
  const [averageDiff, setAverageDiff] = useState(0);
  const { subjectCode } = useParams();
  const { courseNumber } = useParams();
  const course = subjectCode + courseNumber;
  const [googleUser, setGoogleUser] = React.useState(null);

  React.useEffect(() => {
    if (Cookie.get("googleUser"))
      setGoogleUser(JSON.parse(Cookie.get("googleUser").slice(2)));
  }, []);

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
    <ThemeProvider theme={theme}>
      <Box
        className="class-page-root"
        bgcolor="background.main"
        sx={{
          display: "flex",
          overflow: "hidden",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          flexDirection: "column",
        }}
      >
        <PrimarySearchAppBar key={course} title={course} />
        <Box
          className="course-hero"
          sx={{
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            margin: "10px",
          }}
        >
          <Box
            className="course-hero-left"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h1" align="center" color="text.main">
              {subjectCode} {courseNumber}
            </Typography>
            <Typography variant="h3" color="text.main">
              {parseFloat(averageDiff / 2).toFixed(2)}/5
            </Typography>
            {googleUser ? (
              <CreateReviewModal
                total_reviews={reviews.length}
                avg_diff={averageDiff}
              />
            ) : (
              <Button
                endIcon={<GoogleIcon />}
                variant="contained"
                color="primary"
                href={getGoogleOAuthURL(window.location.href)}
              >
                Login to Review
              </Button>
            )}
          </Box>
          <Box className="course-hero-right">
            <Paper
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                bgcolor: theme.palette.secondary.main
              }}
            >
              <DifficultyGraph review_data={graphData} />
            </Paper>
            <Box key={subjectCode}>
              <CourseSlider subject={subjectCode} />
            </Box>
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
          <Divider orientation="horizontal" sx={{ flex: 1 }} />
          <Divider orientation="horizontal" sx={{ flex: 1 }}>
            <Chip color="accent" label={reviews.length} />
          </Divider>
          <Divider orientation="horizontal" sx={{ flex: 1 }} />
        </Box>
        <Box className="review-column">
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <SortButton reviews={reviews} setReviews={setReviews} />
          </Box>
          {reviews.map((review, _id) => {
            return <Review key={_id} review={review} />;
          })}
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default ClassPage;
