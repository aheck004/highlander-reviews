import React, { useState, useEffect } from "react";
import { useTheme } from "./ThemeContext";
import { themes } from "./themes";
import { ThemeProvider } from "@mui/material/styles";
import "./AboutPage.css";
import PrimarySearchAppBar from "./Header";
import { Box, Typography } from "@mui/material";
import Footer from "./footer";
import { FormatAlignJustify } from "@mui/icons-material";
import BioSquare from "./BioSquare";


function AboutPage() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 700); 
  const theme = themes[useTheme().theme];
  const setTheme = useTheme().toggleTheme;

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

  return (
    <ThemeProvider theme={theme}>
      <Box className="aboutpage-root" bgcolor="background.main">
        <PrimarySearchAppBar />
        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row", //Change for mobile later
            justifyContent: "center",
            alignItems: "center",
            gap: "50px", //Gap between page left/right
            paddingLeft: "15vw",
            paddingRight: "15vw",
          }}
        >
          <Box
            sx={{
              width: "100%",
            }}
          >
            <Typography
              variant="h2"
              color="text.main"
              sx={{ marginTop: "75px" }}
              fontSize={isMobile ? 40 : 50}
              fontWeight={"bold"}
            >
              About Us
            </Typography>
            <Typography color="text.main">
              Welcome to Highlander Reviews, your destination for navigating the
              academic journey with ease. Our platform is dedicated to enhancing
              your educational experience by providing seamless access to the
              University of California, Riverside (UCR) Course Difficulty
              database. We understand that every student's academic path is
              unique, and that's why we've created a user-friendly platform that
              empowers you to make informed decisions about your courses.
            </Typography>
            <Typography
              variant="h2"
              color="text.main"
              sx={{ marginTop: "10px" }}
              fontSize={isMobile ? 25 : 30}
              fontWeight={"bold"}
            >
              Features:
            </Typography>
          </Box>
          <Box
            sx={{
              width: "100%",
              alignSelf: "flex-start",
            }}
          >
            <Typography
              variant="h2"
              color="text.main"
              sx={{ marginTop: "75px" }}
              fontSize={isMobile ? 35 : 40}
              fontWeight={"bold"}
            >
              Developers
            </Typography>
            <Box
              sx={{display:"flex", width:"100%", gap: "5%", flexWrap: "wrap"}}
            >
              <BioSquare
                name="Juan Alvarez"
                title="Web Developer"
                description="One of the developers of this website... and of all time"
                image="https://media.licdn.com/dms/image/C5603AQHoGuMhIzIQUQ/profile-displayphoto-shrink_400_400/0/1633379824652?e=1695859200&v=beta&t=SdVycHyBY6ybgO8Otej1A1VwRz2ampTFZ3FsJTqhP5Q"
                linkedin="https://www.linkedin.com/in/juan-alvarez-83250b1b9/"
                github="https://github.com/KilloPillers"
                flag="us"
              />
              <BioSquare
                name="Arthur Hecker"
                title="Web Developer"
                description="Developer of Highlander Reviews and many more to come"
                image="https://media.licdn.com/dms/image/D5603AQGgvBYO9mk7Hw/profile-displayphoto-shrink_400_400/0/1691143938268?e=1696464000&v=beta&t=7LlX22qNJfWhIrQjxYBAWuT9li4CxkUek4n7pEHiAjw"
                github="https://github.com/aheck004"
                linkedin="https://www.linkedin.com/in/arthur-hecker-a56663230"
                flag="us"
              />
            </Box>
          </Box>
        </Box>
      </Box>
      <Footer />
    </ThemeProvider>
  );
}

export default AboutPage;
