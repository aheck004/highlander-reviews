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
import SearchBar from "./SearchBar";
import Subject from "./subject.js"
import {
  Box,
  Paper,
  Typography,
  Divider,
  Chip,
  Button,
  Skeleton,
} from "@mui/material";

function SubjectPage() {
  const isMobile = window.innerWidth < 700;
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
      })
      .catch((error) => console.error(error));
  }, [subjectCode]);

  return (
    <ThemeProvider theme={theme}>
      <Box
        key={"subject-page-" + subjectCode}
        className="subject-page-root"
        bgcolor="background.main"
        sx={{
          display: "flex",
          overflow: "auto",
          alignItems: "center",
          width: "100%",
          flexDirection: "column",
        }}
      >
        <PrimarySearchAppBar title={subjectCode} />
        <Box
          className="subject-center"
          sx={{
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            margin: "10px",
          }}
        >
          <Typography
            variant="h2"
            align="center"
            color="text.main"
            sx={{ marginTop: "20px" }}
          >
            {similarCourseCount} {subjectCode} courses at University of
            California, Riverside
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
                color = "text.main"
                sx={{ marginRight: "10px" }}
            >
                Search for other courses  
            </Typography>
            <SearchBar width={isMobile ? 350 : 500} height={50} />
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
        </Box>
        </Box>
      <Divider orientation="horizontal" sx={{ flex: 1, width:"80%"}}>
        <Chip color="accent" label={similarCourseCount} />
      </Divider>
      <Box sx={{display: "flex", flexWrap: "wrap", justifyContent:"center", width: "100%"}}>
          <Subject subject={subjectCode} />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default SubjectPage;
