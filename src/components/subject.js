import React, { useState, useEffect } from "react";
import {
  Paper,
  Box,
  ButtonBase,
  Divider,
  Typography,
  IconButton,
  Zoom,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import "./subjectPage.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ThemeProvider } from "@mui/material/styles";
import { themes } from "./themes";
import { useTheme } from "./ThemeContext";

function ColorMap(difficulty, theme) {
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

function textColor(difficulty, theme) {
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

function Subject({ subject }) {
  const theme = themes[useTheme().theme];

  const [similarCourses, setSimilarCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        process.env.REACT_APP_NODE_SERVER +
          `/get-courses-from-subject-code/${subject}`
      )
      .then((response) => {
        setSimilarCourses(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <ThemeProvider theme={theme}>
      {similarCourses.map((course, _id) => {
        return (
          <Zoom in={true} timeout={500} style={{transitionDelay: 100*Math.sqrt(_id)}} >
          <ButtonBase
            key={_id}
            onClick={() => {
              navigate(
                `/Course/${course.subject_code}/${course.course_number}`
              );
            }}
          >
            <Paper
              elevation={4}
              className="subject"
              sx={{
                margin: "10px",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "450px",
                bgcolor: theme.palette.secondary.main,
              }}
              style={{ backgroundColor: theme.palette.secondary.main }}
            >
              <Typography color="text.main">
                {course.class_name} - {course.course_title}
              </Typography>
              <Divider orientation="horizontal" sx={{ flex: 1 }} />
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Avatar
                  sx={{
                    color: textColor(course.average_diff/2, theme),
                    bgcolor: ColorMap(course.average_diff/2, theme),
                    marginTop: "10px",
                  }}
                >
                  {parseFloat(course.average_diff / 2).toFixed(1)}
                </Avatar>
                <Typography color="text.main" marginTop={"10px"} marginLeft={"10px"}>
                Based on {course.number_of_reviews} total reviews
              </Typography>
              </Box>
            </Paper>
          </ButtonBase>
          </Zoom>
        );
      })}
    </ThemeProvider>
  );
}

export default Subject;