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
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Link,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import CourseSlider from "./CourseSlider";
import SortButton from "./SortButton";
import PrimarySearchAppBar from "./Header";
import GoogleIcon from "@mui/icons-material/Google";
import "./classPage.css";
import { ThemeProvider } from "@mui/material/styles";
import { themes } from "./themes";
import Cookie from "js-cookie";
import getGoogleOAuthURL from "../getGoogleURL.js";
import { useTheme } from "./ThemeContext";
import qs from "qs";

const REVIEW_LIMIT = 10;
//TODO: Change to add transition group

function MobileClassPageHero({courseData, graphData, googleUser}) {
  const [expanded, setExpanded] = useState(false);
  const theme = themes[useTheme().theme];

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box sx={{display:'flex', flexDirection: 'column', justifyContent:'center', alignItems:'center', width:"95vw", gap:5}}>
      <Box>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} sx={{
        backgroundColor: theme.palette.secondary.main,
      }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{color: "secondary.contrastText"}} />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ color: 'secondary.contrastText', width: '40%', flexShrink: 0 }}>
            Course Description
          </Typography>
          <Typography sx={{ color: 'secondary.contrastText', textOverflow:"ellipsis"}}>{courseData.course_description.split('.')[0]}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{color: 'secondary.contrastText'}}>
            {courseData.course_description.split('.').slice(1).join('.')}
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')} sx={{
        backgroundColor: theme.palette.secondary.main,
      }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{color: "secondary.contrastText"}}/>}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
          sx={{display:"flex"}}
        >
          <Typography sx={{ color: 'secondary.contrastText', width: '40%', flexShrink: 0 }}>Average Difficulty</Typography>
          <Typography sx={{ color: 'secondary.contrastText' }}>
            {parseFloat(courseData.average_diff / 2).toFixed(2)}/5
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{display:"flex", overflow:'hidden', flexDirection:"column", justifyContent: "center", alignItems: "center"}}>
          <Box sx={{marginTop:"-80px"}}>
            <DifficultyGraph key={theme.palette.name.main} theme_mode={theme.palette.name.main} review_data={graphData} />
          </Box>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')} sx={{
        backgroundColor: theme.palette.secondary.main,
      }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{color: "secondary.contrastText"}}/>}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography sx={{ color: 'secondary.contrastText', width: '40%', flexShrink: 0 }}>
            Similar Courses
          </Typography>
          <Typography sx={{ color: 'secondary.contrastText' }}>
            
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{color:"secondary.contrastText"}}>
            All {courseData.subject_code} courses can be found {''}
            <Link href={`#/Course/${courseData.subject_code}`}>here</Link>
          </Typography>
        </AccordionDetails>
      </Accordion>
      </Box>
      {googleUser && courseData ? (
              <CreateReviewModal
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
  )
}

function DesktopClassPageHero({courseData, graphData, googleUser, reviews}) {
  const theme = themes[useTheme().theme];

  return (
  <Box>
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
              <Box>
                <Typography
                  sx={{
                    alignSelf: "start",
                    fontWeight: "bold",
                  }}
                  variant="body1"
                  color="background.contrastText"
                >
                  Course Description:
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="background.contrastText"
                  fontSize={".9rem"}
                >
                  {courseData.course_description}
                </Typography>
              </Box>
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
                  <DifficultyGraph key={theme.palette.name.main} theme_mode={theme.palette.name.main} review_data={graphData} />
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
                    <Typography color="secondary.contrastText">
                      Average Difficulty
                    </Typography>
                    <Typography variant="h2" color="secondary.contrastText">
                      {parseFloat(courseData.average_diff / 2).toFixed(2)}/5
                    </Typography>
                  </Box>
            </Paper>
              <Box key={courseData.subject_code}>
                <CourseSlider subject={courseData.subject_code} />
              </Box>
          </Box>
        </Box>
      </Box>
  )
}

function ClassPage() {
  const [reviews, setReviews] = useState([]);
  const [graphData, setGraphData] = useState([0, 0, 0, 0, 0]);
  const [courseData, setCourseData] = useState(null);
  const { subjectCode, courseNumber } = useParams();
  const course = subjectCode + courseNumber;
  const [googleUser, setGoogleUser] = React.useState(null);
  const theme = themes[useTheme().theme];
  const [isMobile, setIsMobile] = useState(window.innerWidth < 700);
  const [sort, setSort] = useState({date: -1});

  React.useEffect(() => {
    if (Cookie.get("googleUser"))
      setGoogleUser(JSON.parse(Cookie.get("googleUser").slice(2)));
  }, []);

  //useEffect to detect window resize
  useEffect(() => { 
    const handleResize = () => {
      setIsMobile(window.innerWidth < 700);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setReviews([]);
    axios
      .get(process.env.REACT_APP_NODE_SERVER + `/course-reviews-graph-data/${course}`)
      .then((response) => {
        const data = [0, 0, 0, 0, 0];
        response.data.map((review) => {
          data[Math.ceil(review.difficulty / 2) - 1]++;
        });
        setGraphData(data.reverse());
      })
      .catch((error) => console.error(error));
    const query_params = qs.stringify({
      sort: sort,
      skip: 0,
      limit: REVIEW_LIMIT,
    })
    axios
      .get(process.env.REACT_APP_NODE_SERVER + `/course-reviews/${course}?${query_params}`)
      .then((response) => {
        setReviews(response.data);
      });
    axios
      .get(process.env.REACT_APP_NODE_SERVER + `/get-course/${course}`)
      .then((response) => {
        setCourseData(response.data[0]);
      });
  }, [subjectCode, courseNumber]);

  const loadMoreReviews = () => {
    const query_params = qs.stringify({
      sort: sort,
      skip: reviews.length,
      limit: REVIEW_LIMIT,
    })
    axios
      .get(process.env.REACT_APP_NODE_SERVER + `/course-reviews/${course}?${query_params}`)
      .then((response) => {
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
          width: "100vw",
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
          {courseData ? 
          <>
            <Typography sx={{ textAlign: "center"}}
            fontSize={isMobile ? 40 : 50}
              variant="h2" align="center" color="background.contrastText">
              {courseData.class_name}
            </Typography>
            <Typography sx={{ textAlign: "center", textWrap: "balance" }} 
            fontSize={isMobile ? 40 : 50}
              variant="h2" align="center" color="background.contrastText">
              {courseData.course_title}
            </Typography> 
          </>
           : null}
          {isMobile ?  
              courseData ? (<MobileClassPageHero courseData={courseData} graphData={graphData} googleUser={googleUser}/>) : null :
              courseData ? 
              (<DesktopClassPageHero courseData={courseData} graphData={graphData} googleUser={googleUser} reviews={reviews} theme={theme} />) : null
          }
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
            <Chip color="accent" 
              label={courseData.number_of_reviews}
              sx={{ color: `${theme.palette.accent.contrastText}` }}
            />
            ) : (
            <Skeleton variant="circular" width={10} height={10} />
            )}
          </Divider>
          <Divider orientation="horizontal" sx={{ flex: 1 }} />
        </Box>
        {courseData && reviews.length > 0 ? (
          <Box key={courseData.subject_code+courseData.course_number} className="review-column">
            <Box sx={{alignSelf:'flex-end'}}>
              <SortButton
                course={course}
                limit={reviews.length}
                setReviews={setReviews}
                setSort={setSort}
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
            color="background.contrastText"
            fontSize={isMobile ? 40 : 50}
          >
            No Reviews Yet
          </Typography>
        )}
        {courseData && reviews.length > 0 && reviews.length < courseData.number_of_reviews ? (
          <Button color="accent" onClick={loadMoreReviews}>Load More</Button>
        ) : null}
      </Box>
    </ThemeProvider>
  );
}

export default ClassPage;
