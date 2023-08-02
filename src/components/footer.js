import React from "react"
import { ThemeProvider } from "@mui/system"
import { Box, Typography, Paper, Divider } from "@mui/material";
import theme from "./theme";
import BioSquare from "./BioSquare.js";

function Footer() {

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{display:"flex", width:"100%", background:theme.palette.secondary.main}}>
        <BioSquare 
          name="Juan Alvarez"
          title="Web Developer"
          description="One of the developers of this website... and of all time"
          image="https://media.licdn.com/dms/image/C5603AQHoGuMhIzIQUQ/profile-displayphoto-shrink_400_400/0/1633379824652?e=1695859200&v=beta&t=SdVycHyBY6ybgO8Otej1A1VwRz2ampTFZ3FsJTqhP5Q"
          linkedin="https://www.linkedin.com/in/juan-alvarez-83250b1b9/"
          twitter="https://twitter.com/pillers19"
          flag="us"
        />
      </Box>
    </ThemeProvider>
  )
}

export default Footer
