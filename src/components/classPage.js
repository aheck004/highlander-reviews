import React, { useState, useEffect } from "react";
import Review from "./review";
import DifficultyGraph from "./DifficultyGraph";
import axios from "axios";
import { useParams } from "react-router-dom";
import CreateReviewModal from "./CreateReview";
import {
  Box,
  Paper,
  Typography,
  Divider,
  Chip,
  Button,
  Skeleton,
} from "@mui/material";
import CourseSlider from "./CourseSlider";
import SortButton from "./SortButton";
import PrimarySearchAppBar from "./Header";
import GoogleIcon from "@mui/icons-material/Google";
import "./classPage.css";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme.js";
import Cookie from "js-cookie";
import getGoogleOAuthURL from "../getGoogleURL.js";

const REVIEW_LIMIT = 10;
//TODO: Change to add transition group

function ClassPage() {
  const [reviews, setReviews] = useState([]);
  const [graphData, setGraphData] = useState([0, 0, 0, 0, 0]);
  const [courseData, setCourseData] = useState(null);
  const { subjectCode, courseNumber } = useParams();
  const course = subjectCode + courseNumber;
  const [googleUser, setGoogleUser] = React.useState(null);

  React.useEffect(() => {
    if (Cookie.get("googleUser"))
      setGoogleUser(JSON.parse(Cookie.get("googleUser").slice(2)));
  }, []);

  useEffect(() => {
    const query_params = new URLSearchParams({
      skip: reviews.length,
      limit: REVIEW_LIMIT,
    });
    axios
      .get(process.env.REACT_APP_NODE_SERVER + `/course-reviews/${course}?${query_params}`)
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
        setCourseData(response.data[0]);
      });
  }, [subjectCode, courseNumber]);

  const loadMoreReviews = () => {
    const query_params = new URLSearchParams({
      skip: reviews.length,
      limit: REVIEW_LIMIT,
    });
    axios.get(process.env.REACT_APP_NODE_SERVER + `/course-reviews/${course}?${query_params}`).then((response) => {
      setReviews([...reviews, ...response.data]);
    });
  };

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
          minHeight: "100vh",
          flexDirection: "column",
        }}
      >
        <PrimarySearchAppBar
          title={courseData ? courseData.class_name : null}
        />
        <Box
          className="course-hero"
          sx={{
            display: "flex",
            gap: "20px",
            widht: "100%",
            flexWrap: "wrap",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            margin: "10px",
          }}
        >
          {courseData ? (
            <Typography sx={{ textAlign: "center"}}
              variant="h2" align="center" color="text.main">
              {courseData.class_name}
            </Typography>
          ) : (
            <Skeleton variant="rectangular" width={210} height={118} />
          )}

          {courseData ? (
            <Typography sx={{ textAlign: "center", textWrap: "balance" }} 
              variant="h2" align="center" color="text.main">
              {courseData.course_title}
            </Typography>
          ) : (
            <Skeleton variant="rectangular" width={210} height={118} />
          )}
          <Box
            sx={{
              display: "flex",
              gap: 10,
            }}
          >
            <Box
              className="course-hero-left"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: 350,
                gap: 5,
              }}
            >
              {courseData ? (
                <Box>
                  <Typography
                    sx={{
                      alignSelf: "start",
                      fontWeight: "bold",
                    }}
                    variant="body1"
                    color="text.main"
                  >
                    Course Description:
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="text.main"
                    fontSize={".9rem"}
                  >
                    {courseData.course_description}
                  </Typography>
                </Box>
              ) : (
                <Skeleton variant="rectangular" width={350} height={300} />
              )}
              {googleUser && courseData ? (
                <CreateReviewModal
                  total_reviews={reviews.length}
                  avg_diff={courseData.average_diff}
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
                  position: "relative",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  bgcolor: theme.palette.secondary.main,
                  flexDirection: "column-reverse",
                }}
              >
                {courseData ? (
                  <>
                    <DifficultyGraph review_data={graphData} />
                    <Box
                      sx={{
                        position: "absolute",
                        top: "10px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Typography color="text.main">
                        Average Difficulty
                      </Typography>
                      <Typography variant="h2" color="text.main">
                        {parseFloat(courseData.average_diff / 2).toFixed(2)}/5
                      </Typography>
                    </Box>
                  </>
                ) : (
                  <Skeleton variant="rectangular" width={350} height={300} />
                )}
              </Paper>
              {courseData ? (
                <Box key={courseData.subject_code}>
                  <CourseSlider subject={courseData.subject_code} />
                </Box>
              ) : (
                <Skeleton variant="rounded" width={300} height={150} />
              )}
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
            {courseData ? (
            <Chip color="accent" label={courseData.number_of_reviews} />
            ) : (
            <Skeleton variant="circular" width={10} height={10} />
            )}
          </Divider>
          <Divider orientation="horizontal" sx={{ flex: 1 }} />
        </Box>
        {reviews.length > 0 ? (
          <Box className="review-column">
            <Box sx={{alignSelf:'flex-end'}}>
              <SortButton
                reviews={reviews}
                setReviews={setReviews}
              />
            </Box>
            {reviews.map((review, _id) => {
              return (
                <Review key={review.class_name+":"+_id} count={_id%REVIEW_LIMIT} review={review} />
              ) 
            })}
          </Box>
        ) : (
          <Typography
            sx={{marginBottom: 'auto', textAlign:'center', whiteSpace:'normal', marginTop: 'auto', textWrap: 'balance'}}
            variant="h2"
            color="text.main"
          >
            No Reviews Yet
          </Typography>
        )}
        {courseData && reviews.length > 0 && reviews.length < courseData.number_of_reviews ? (
          <Button color="primary" onClick={loadMoreReviews}>Load More</Button>
        ) : null}
      </Box>
    </ThemeProvider>
  );
}

export default ClassPage;
