import React, { useState } from "react";
import { Badge, Box, ThemeProvider, Typography } from "@mui/material";
import { Avatar, IconButton } from "@mui/material";
import { GitHub, LinkedIn, Twitter } from "@mui/icons-material";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import { themes } from "./themes";
import { useTheme } from "./ThemeContext";

function BioSquare({ name, title, description, image, linkedin=null, twitter=null, github=null, flag}) {
  const theme = themes[useTheme().theme];

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{ width: 200, height: 200, borderRadius: "10px",
        border: `2px solid ${theme.palette.divider}`,
        bgcolor: theme.palette.secondary,
        padding: "10px" }}
      >
        <Box display="flex" alignItems="flex-start"
          sx={{
            marginBottom: "10px",
          }}>
          <Stack>
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              badgeContent={
                <Avatar
                  sx={{ width: 24, height: 24, border: `2px solid white`}}
                  alt="United States of America"
                  src={`https://flagcdn.com/${flag}.svg`}
                />
              }
            >
              <Avatar
                sx={{ width: 70, height: 70 }}
                variant="rounded"
                alt={name}
                src={image}
              />
            </Badge>
          </Stack>
          <Box flex={1}/>
          <Box>
            {linkedin ?
            <IconButton
              href={linkedin}
            >
              <LinkedIn color="accent"/>
            </IconButton>
            : null}
            {twitter ?
            <IconButton
              href={twitter}
            >
              <Twitter color="accent"/>
            </IconButton>
            : null}
            {github ?  
            <IconButton
            href={github}
            >
              <GitHub color="accent"/>
            </IconButton>
            : null}
          </Box>
        </Box>
        <Typography variant="h6" component="div" color="secondary.contrastText">
          {name}
        </Typography>
        <Typography variant="body2" color="secondary.contrastText">
          {title}
        </Typography>
        <Divider sx={{
          marginTop: "5px",
          marginBottom: "5px",
        }}/>
        <Typography variant="body2" color="secondary.contrastText">
          {description}
        </Typography>
      </Box>
    </ThemeProvider>
  );
}

export default BioSquare;
