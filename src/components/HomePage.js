import React from "react";
import SearchBar from "./SearchBar";
import "./hompage.css";
import { Box, Typography } from "@mui/material";
import PrimarySearchAppBar from "./Header";
import { ThemeProvider} from "@mui/material/styles";
import theme from "./theme.js";
import Footer from "./footer";

function HomePage() {
  const isMobile = window.innerWidth < 700;

  return (
    <ThemeProvider theme={theme}>
      <Box className="homepage-root" bgcolor="background.main">
        <PrimarySearchAppBar title={"Home"} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            flexGrow: 1,
          }}
        >
          <Box sx={{ marginBottom: "20px" }}>
            <Box sx={{display:'flex', gap:5}}>
              <Typography variant="h1" align="center" color="text.primary">
                Highlander{" "}
              </Typography>
              <Typography variant="h1" align="center" color="text.main">
                Reviews
              </Typography>
            </Box>
            <Typography variant="subtitle1" align="center" color="text.main">
              Find reviews for courses at University of California, Riverside
            </Typography>
          </Box>
          <Box className="homepage-center">
            <SearchBar width={isMobile ? 350 : 500} height={50} />
          </Box>
        </Box>
      </Box>
      <Footer />
    </ThemeProvider>
  );
}

export default HomePage;
