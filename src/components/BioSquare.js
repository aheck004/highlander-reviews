import React from "react";
import { Badge, Box, ThemeProvider, Typography } from "@mui/material";
import { Avatar, IconButton } from "@mui/material";
import { LinkedIn, Twitter } from "@mui/icons-material";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import theme from "./theme";

function BioSquare({ name, title, description, image, linkedin, twitter, flag}) {
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
                alt="Juan Alvarez"
                src={image}
              />
            </Badge>
          </Stack>
          <Box flex={1}/>
          <Box>
            <IconButton
              href={linkedin}
            >
              <LinkedIn color="accent"/>
            </IconButton>
            <IconButton
              href={twitter}
            >
              <Twitter color="accent"/>
            </IconButton>
          </Box>
        </Box>
        <Typography variant="h6" component="div" color="text.secondary">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {title}
        </Typography>
        <Divider sx={{
          marginTop: "5px",
          marginBottom: "5px",
        }}/>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </Box>
    </ThemeProvider>
  );
}

export default BioSquare;
