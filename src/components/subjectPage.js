import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import PrimarySearchAppBar from "./Header";
import GoogleIcon from "@mui/icons-material/Google";
import "./subjectPage.css";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme.js";
import Cookie from "js-cookie";
import getGoogleOAuthURL from "../getGoogleURL.js";
import {
  Box,
  Paper,
  Typography,
  Divider,
  Chip,
  Button,
  Skeleton,
} from "@mui/material";

function ColorMap(difficulty) {
  if (difficulty <= 2.49) {
    return theme.palette.difficultyColor1.main;
  } else if (difficulty <= 3.49) {
    return theme.palette.difficultyColor3.main;
  } else if (difficulty <= 4.49) {
    return theme.palette.difficultyColor4.main;
  } else {
    return theme.palette.difficultyColor5.main;
  }
}

function textColor(difficulty) {
  if (difficulty <= 2.49) {
    return theme.palette.difficultyColor1.contrastText;
  } else if (difficulty <= 3.49) {
    return theme.palette.difficultyColor3.contrastText;
  } else if (difficulty <= 4.49) {
    return theme.palette.difficultyColor4.contrastText;
  } else {
    return theme.palette.difficultyColor5.contrastText;
  }
}

function SubjectPage({ subject }) {
  const [similarCourseCount, setSimilarCourseCount] = useState([]);
  const { subjectCode } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
    .get(
        process.env.REACT_APP_NODE_SERVER + 
        `/get-course-count-from-subject-code/${subjectCode}`
        )
      .then((response) => {
        setSimilarCourseCount(response.data);
        console.log("Response Data: ", response.data);
      })
      .catch((error) => console.error(error));
  }, []);

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
        <PrimarySearchAppBar title={subjectCode} />
        <Typography variant="h5" color="text.main">
          {similarCourseCount} {subjectCode} courses at University of California, Riverside
        </Typography>
      <button>Hello World</button>
      </Box>
    </ThemeProvider>
  );
}

export default SubjectPage;
