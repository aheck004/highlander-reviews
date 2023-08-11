import React, { useState } from "react";
import { ThemeProvider } from "@mui/system"
import { Box, Typography, Paper, Divider } from "@mui/material";
import { themes } from "./themes";
import { useTheme } from "./ThemeContext";
import BioSquare from "./BioSquare.js";

function Footer() {
  const theme = themes[useTheme().theme];

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{display:"flex", width:"100%", background:theme.palette.secondary.main, gap: "5%"}}>
        <BioSquare 
          name="Juan Alvarez"
          title="Web Developer"
          description="One of the developers of this website... and of all time"
          image="https://media.licdn.com/dms/image/C5603AQHoGuMhIzIQUQ/profile-displayphoto-shrink_400_400/0/1633379824652?e=1695859200&v=beta&t=SdVycHyBY6ybgO8Otej1A1VwRz2ampTFZ3FsJTqhP5Q"
          linkedin="https://www.linkedin.com/in/juan-alvarez-83250b1b9/"
          twitter="https://twitter.com/pillers19"
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
    </ThemeProvider>
  )
}

export default Footer
