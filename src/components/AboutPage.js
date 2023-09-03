import React, { useState, useEffect } from "react";
import { useTheme } from "./ThemeContext";
import { themes } from "./themes";
import { ThemeProvider } from "@mui/material/styles";
import "./AboutPage.css";
import PrimarySearchAppBar from "./Header";
import { Box, Typography, IconButton, Link } from "@mui/material";
import Footer from "./footer";
import BioSquare from "./BioSquare";
import { GitHub, Reddit, SpeakerNotes, BugReport } from "@mui/icons-material";

function AboutPage() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 700);
  const theme = themes[useTheme().theme];

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
            paddingLeft: isMobile ? "2vw" : "15vw",
            paddingRight: isMobile ? "2vw" : "15vw",
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
              sx={{ marginTop: "5vw" }}
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
            <Typography color="text.main" sx={{ marginTop: "5px" }}>
              <span style={{ fontWeight: "bold" }}>
                Streamlined Search Experience:
              </span>{" "}
              Our intuitive search interface lets you effortlessly explore the
              UCR Course Difficulty database. Whether you're looking for
              specific subjects or difficulty levels, our platform's advanced
              filters ensure you find the information you need quickly.
            </Typography>
            <Typography color="text.main" sx={{ marginTop: "10px" }}>
              <span style={{ fontWeight: "bold" }}>
                Empowering Student Voices:
              </span>{" "}
              Our user-friendly review system simplifies the process of sharing
              your thoughts. Just a few clicks, and your review is added to the
              database, accessible to fellow students seeking guidance.
              Similarly, reading reviews is hassle-free, ensuring you receive
              firsthand accounts that aid in your decision-making. This
              interactive approach transforms course exploration into a
              collaborative endeavor, fostering a sense of unity and mutual
              support among UCR students.
            </Typography>
            <Typography color="text.main" sx={{ marginTop: "10px" }}>
              <span style={{ fontWeight: "bold" }}>User-Focused Design:</span>{" "}
              Our platform is designed with you in mind. We've crafted an
              intuitive and user-friendly interface that ensures a seamless
              experience. Whether you're accessing Highlander Reviews from your
              computer, tablet, or smartphone, you can effortlessly navigate and
              access the information you seek.
            </Typography>
            <Typography
              variant="h2"
              color="text.main"
              sx={{ marginTop: "10px" }}
              fontSize={isMobile ? 35 : 40}
              fontWeight={"bold"}
            >
              Special Thanks
            </Typography>
            <Typography color="text.main" sx={{ marginBottom: isMobile ? "0vw" : "5vw" }}>
              Highlander Reviews extends its sincere gratitude to the creators
              of the UCR Course Difficulty Database for their dedicated effort
              in compiling and maintaining a wealth of valuable academic
              information. Our platform has been enriched by their comprehensive
              database, which has allowed us to provide an enhanced experience
              for students seeking course insights. Visit the{" "}
              <Link href="https://www.reddit.com/r/ucr/comments/638mh5/megathread_ucr_course_database/">
                UCR Course Difficulty Database
              </Link>
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
              sx={{ marginTop: isMobile ? "0vw" : "5vw", marginBottom: isMobile ? "10px" : "0px" }}
              fontSize={isMobile ? 35 : 40}
              fontWeight={"bold"}
            >
              Developers
            </Typography>
            <Box
              sx={{
                display: "flex",
                width: "100%",
                flexWrap: "wrap",
                gap: isMobile ? "10px" : "5%",
                justifyContent: isMobile ? "center" : "flex-start",
              }}
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
            <Typography
              fontWeight={"bold"}
              color="text.main"
              sx={{ marginTop: "15px" }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <IconButton
                  href={"https://github.com/aheck004/highlander-reviews"}
                >
                  <GitHub color="accent" />
                </IconButton>
                Explore our codebase on&nbsp;
                <Link href="https://github.com/aheck004/highlander-reviews">
                  GitHub
                </Link>
              </div>
            </Typography>
            <Typography
              fontWeight={"bold"}
              color="text.main"
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <IconButton
                  href={
                    "https://www.reddit.com/r/ucr/comments/638mh5/megathread_ucr_course_database/"
                  }
                >
                  <Reddit color="accent" />
                </IconButton>
                Visit the&nbsp;
                <Link href="https://www.reddit.com/r/ucr/comments/638mh5/megathread_ucr_course_database/">
                  Course Difficulty Database
                </Link>
              </div>
            </Typography>
            <Typography
              variant="h2"
              color="text.main"
              sx={{ marginTop: "10px" }}
              fontSize={isMobile ? 35 : 40}
              fontWeight={"bold"}
            >
              Feedback
            </Typography>
            <Typography color="text.main">
              <IconButton
                href={
                  "https://docs.google.com/forms/d/e/1FAIpQLSeZOC6LLk1OQ9Jctm3Pr_ZIJ4Vhio0ayoqJkkmzw1OjQhZzQg/viewform?usp=sf_link"
                }
              >
                <SpeakerNotes color="accent" />
              </IconButton>
              Want to share feedback? Let us know your thoughts&nbsp;
              <Link href="https://docs.google.com/forms/d/e/1FAIpQLSeZOC6LLk1OQ9Jctm3Pr_ZIJ4Vhio0ayoqJkkmzw1OjQhZzQg/viewform?usp=sf_link">
                here
              </Link>
            </Typography>
            <Typography sx={{ marginBottom: "75px" }} color="text.main">
              <IconButton
                href={
                  "https://docs.google.com/forms/d/e/1FAIpQLSfvZsY3kayTVhC8gfwCsXk6JJhGUyzC8wAkm1V_s5c8yNDsPg/viewform?usp=sf_link"
                }
              >
                <BugReport color="accent" />
              </IconButton>
              Found a bug? Send a report&nbsp;
              <Link href="https://docs.google.com/forms/d/e/1FAIpQLSfvZsY3kayTVhC8gfwCsXk6JJhGUyzC8wAkm1V_s5c8yNDsPg/viewform?usp=sf_link">
                here
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
      <Footer />
    </ThemeProvider>
  );
}

export default AboutPage;
