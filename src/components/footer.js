import React, { useState, useEffect } from "react";
import { ThemeProvider } from "@mui/system";
import { Box, Typography, Paper, Divider, Link } from "@mui/material";
import { themes } from "./themes";
import { useTheme } from "./ThemeContext";
import bannerLight from "../lightlogo1.svg";
import bannerDark from "../darklogo1.svg";
import bannerBlue from "../onbluelogo1.svg";
import smallBannerLight from "../banner_small_light.svg";
import smallBannerDark from "../banner_small_dark.svg";
import smallBannerBlue from "../banner_small_on_blue.svg";

function Footer() {
  const theme = themes[useTheme().theme];
  const [isMobile, setIsMobile] = useState(window.innerWidth < 700);

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
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          background: theme.palette.primary.main,
          gap: "5%",
          flexDirection: "row",
        }}
      >
        <Link href="/">
          <img
            src={
              theme.palette.name.main === "light"
                ? smallBannerLight
                : smallBannerBlue
            }
            style={{
              paddingTop: "1dvh",
              paddingBottom: "1dvh",
              paddingLeft: "25%",
              width: "5dvh",
              height: "auto",
            }}
            alt="logo"
          />
        </Link>
        <Box 
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "flex-end",
            flexDirection: isMobile ? "column" : "row",
            width: "100%",
            gap: "5%",
            paddingTop: isMobile ? "1dvh" : "0dvh",
            paddingBottom: isMobile ? "1dvh" : "0dvh",
            paddingLeft: isMobile ? "8dvh" : "0dvh",
            paddingRight: isMobile ? "8dvh" : "0dvh",
          }}
        >
          <Link
            href="#/About"
            underline="hover"
            color="inherit"
            sx={{ color: "primary.contrastText" }}
          >
            <Typography fontSize={isMobile ? ".6rem" : ".9rem"} color="primary.contrastText">About</Typography>
          </Link>
          <Link
            href="https://docs.google.com/forms/d/e/1FAIpQLSeZOC6LLk1OQ9Jctm3Pr_ZIJ4Vhio0ayoqJkkmzw1OjQhZzQg/viewform?usp=sf_link"
            underline="hover"
            color="inherit"
            sx={{ color: "primary.contrastText" }}
          >
            <Typography fontSize={isMobile ? ".6rem" : ".9rem"} color="primary.contrastText">Feedback</Typography>
          </Link>
          <Link
            href="https://docs.google.com/forms/d/e/1FAIpQLSfvZsY3kayTVhC8gfwCsXk6JJhGUyzC8wAkm1V_s5c8yNDsPg/viewform?usp=sf_link"
            underline="hover"
            color="inherit"
            sx={{ color: "primary.contrastText" }}
          >
            <Typography fontSize={isMobile ? ".6rem" : ".9rem"} color="primary.contrastText">Bug Report</Typography>
          </Link>
          <Link
            href="https://github.com/aheck004/highlander-reviews"
            underline="hover"
            color="primary.contrastText"
          >
          <Typography
              fontSize={isMobile ? ".6rem" : ".9rem"}
              color="primary.contrastText"
          >
            GitHub
          </Typography>
          </Link>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Footer;
