import { useEffect, useState } from "react";
import { Paper, Box, ButtonBase, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme.js";

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

function CourseSlider({ subject }) {
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
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "375",
          bgcolor: theme.palette.secondary.main
        }}
      >
        <Typography variant="h5" color="text.main">
          Similar Courses
        </Typography>
        <Box
          width={350}
          height={80}
          sx={{
            display: "flex",
            overflow: "scroll",
            gap: "10px",
            padding: "10px",
          }}
        >
          {similarCourses.map((course, _id) => {
            return (
              <ButtonBase
                key={_id}
                onClick={() => {
                  navigate(
                    `/Course/${course.subject_code}/${course.course_number}`
                  );
                }}
              >
                <Paper
                  sx={{
                    display: "flex",
                    flexDirection: "column-reverse",
                    height: "100%",
                    width: "100px",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: ColorMap(course.average_diff / 2),
                    borderRadius: "10px",
                    border: "1px solid black",
                  }}
                >
                  <Typography color={textColor(course.average_diff / 2)}>
                    {parseFloat(course.average_diff / 2).toFixed(2)}/5
                  </Typography>
                  <Typography color={textColor(course.average_diff / 2)}>
                    {course.class_name}
                  </Typography>
                </Paper>
              </ButtonBase>
            );
          })}
        </Box>
      </Paper>
    </ThemeProvider>
  );
}

export default CourseSlider;
