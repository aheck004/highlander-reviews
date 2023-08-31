import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import "./hompage.css";
import { Box, Button, Typography } from "@mui/material";
import PrimarySearchAppBar from "./Header";
import { ThemeProvider } from "@mui/material/styles";
import { themes } from "./themes";
import Footer from "./footer";
import { useTheme } from "./ThemeContext";
import bannerLight from "../lightlogo1.svg";
import bannerDark from "../darklogo1.svg";
import RoutingButton from "./RoutingButton.js";


function HomePage() {
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
      <Box className="homepage-root" bgcolor="background.main">
        <PrimarySearchAppBar title={"Home"} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            marginTop: isMobile ? "32%" : "7%",
            alignItems: "center",
          }}
        >
          <Box sx={{ marginBottom: "20px" }}>
            <Box sx={{ display: "flex", marginBottom: "15px" }}>
              <img
                src={
                  theme.palette.name.main === "light" ? bannerLight : bannerDark
                }
                className="App-logo"
                style={{
                  width: isMobile ? "95%" : "85dvh",
                  height: "auto",
                  marginLeft: "auto",
                  marginRight: "auto",
                  justifyContent: "center",
                  alignSelf: "center",
                }}
                alt="logo"
              />
            </Box>
            <Typography
              className="subtitle"
              variant="subtitle1"
              align="center"
              color="text.main"
              fontSize={isMobile ? 12 : 16}
            >
              Find reviews for courses at University of California, Riverside
            </Typography>
          </Box>
            <SearchBar width={isMobile ? 350 : 500} height={50} />
        </Box>
        <Box
          sx={{
            justifySelf: "flex-start",
            display: "flex",
            rowGap: "1vh",
            columnGap: "1vh",
            flexWrap: "wrap",
            flexDirection: "row",
            justifyContent: "flex-start",
            width: isMobile ? "90vw" : "60vw",
            marginTop: isMobile ? "3vh" : "5vh",
            alignItems: "center",
          }}
        >
          <RoutingButton
            header={"About"}
            body={"Learn more about our goal and how we started"}
            to={"/About"}
          />
          <RoutingButton
            header={"Contact"}
            body={"Contact us for any questions or concerns"}
            to={"/contact"}
          />
          <RoutingButton
            header={"FAQ"}
            body={"Find answers to frequently asked questions"}
            to={"/faq"}
          />
          <RoutingButton
            header={"Terms of Service"}
            body={"Read our terms of service"}
            to={"/tos"}
          />
        </Box>
      </Box>
      <Footer />
    </ThemeProvider>
  );
}

export default HomePage;
