import { useEffect, useState } from "react";
import { Paper, Box, ButtonBase, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ColorMap(difficulty) {
  if (difficulty < 2) {
    return "green";
  } else if (difficulty < 3) {
    return "yellow";
  } else if (difficulty < 4) {
    return "orange";
  } else {
    return "red";
  }
}

function CourseSlider({ subject }) {
  const [similarCourses, setSimilarCourses] = useState([]);
  const navigate = useNavigate()


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
    <Paper sx={{display:'flex',
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
    width:'375'}}>
      <Typography variant="h5">Similar Courses</Typography>
      <Box
        width={350}
        height={80}
        sx={{ display: "flex", overflow: "scroll", gap: "10px", padding:'10px' }}
      >
        {similarCourses.map((course) => {
          return (
            <ButtonBase onClick={()=>{
              navigate(`/Course/${course.subject_code}/${course.course_number}`)
            }}>
              <Paper
                sx={{
                  display: "flex",
                  flexDirection: "column-reverse",
                  height: "100%",
                  width: "100px",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: ColorMap(course.average_diff/2),
                  borderRadius: "10px",
                  border: "1px solid black",
                }}
              >
                <Typography>{parseFloat(course.average_diff/2).toFixed(2)}/5</Typography>
                <Typography>{course.course_name}</Typography>
              </Paper>
            </ButtonBase>
          );
        })}
      </Box>
    </Paper>
  );
}

export default CourseSlider;
