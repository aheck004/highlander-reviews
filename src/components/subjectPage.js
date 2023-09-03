import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import PrimarySearchAppBar from "./Header";
import "./subjectPage.css";
import { ThemeProvider } from "@mui/material/styles";
import { themes } from "./themes";
import { useTheme } from "./ThemeContext";
import SearchBar from "./SearchBar";
import SubjectSearchBar from "./SubjectSearchBar";
import Subject from "./subject.js";
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
  const theme = themes[useTheme().theme];
  const [isMobile, setIsMobile] = useState(window.innerWidth < 700); // [1
  const [similarCourseCount, setSimilarCourseCount] = useState([]);
  const { subjectCode } = useParams();

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 700) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    axios.create({
        withCredentials: true,
      })
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
          overflow: "scroll",
          alignItems: "center",
          width: "100%",
          flexDirection: "column",
        }}
      >
        <PrimarySearchAppBar title={subjectCode} />
        <Box
          sx={{
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: isMobile ? "flex-start" : "center",
            margin: "10px",
          }}
        >
          <Typography
            variant="h2"
            align="center"
            color="text.main"
            sx={{ marginTop: "20px", margin: "auto" }}
            fontSize={isMobile ? 40 : 50}
          >
            {similarCourseCount} {subjectCode} courses at{" "}
            {isMobile ? "UCR" : "University of California, Riverside"}
          </Typography>
          <Box
            sx={{
              flex: "1",
              flexDirection: "column",
              gap: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{  
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <Typography color="text.main" sx={{ marginRight: "10px" }}>
                Search for other courses
              </Typography>
              <SearchBar width={isMobile ? 300 : 500} height={50} />
            </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                <Typography color="text.main" sx={{ marginRight: "10px" }}>
                  Search for other subjects
                </Typography>
                <SubjectSearchBar width={isMobile ? 300 : 500} height={50} />
              </Box>
          </Box>
        </Box>
        <Divider orientation="horizontal" sx={{ width: "80%" }}>
          <Chip
            color="accent"
            label={similarCourseCount}
            sx={{ color: `${theme.palette.accent.contrastText}` }}
          />
        </Divider>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Subject subject={subjectCode} />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default SubjectPage;
