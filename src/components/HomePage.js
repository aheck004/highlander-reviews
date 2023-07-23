import React from "react";
import SearchBar from "./SearchBar";
import "./hompage.css";
import { Box, Typography } from "@mui/material";  
import PrimarySearchAppBar from "./Header";

function HomePage() {
  const isMobile = window.innerWidth < 700

  return (
    <Box className="homepage-root">
      <PrimarySearchAppBar title={'Home'}/>
      <Box sx={{display:'flex', flexDirection:'column',
      justifyContent:'center', alignItems:'center',
      flexGrow:1}}>
        <Box sx={{marginBottom:"20px"}}>
        <Typography variant="h1" align="center">Highlander Reviews</Typography>
        </Box>
        <Box className="homepage-center">
          <SearchBar width={isMobile ? 350:500} height={50}/>
        </Box>
      </Box>
    </Box>
  );
}

export default HomePage;
