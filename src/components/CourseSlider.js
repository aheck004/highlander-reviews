import { useEffect, useState } from "react";
import { Paper, Box, ButtonBase, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
    <Paper>
      <Box
        width={450}
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
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography>2.5/5</Typography>
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
