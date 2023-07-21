import React from "react";
import SearchBar from "./SearchBar";
import "./hompage.css";
import { Box, Typography } from "@mui/material";  

function HomePage() {
  return (
    <div className="homepage-root">
      <Box>
        <Typography variant="h1">Highlander Reviews</Typography>
      </Box>
      <Box className="homepage-center">
        <SearchBar/>
      </Box>
    </div>
  );
}

export default HomePage;
