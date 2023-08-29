import * as React from 'react';
import { createTheme, useTheme, ThemeProvider } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { BarChart } from '@mui/x-charts/BarChart'
import { themes } from './themes.js';
import Cookie from 'js-cookie';

import {
  blueberryTwilightPalette,
} from '@mui/x-charts/colorPalettes';

export default function DifficultyGraph({theme_mode, review_data, height=300}) {
  const [colorMode, setColorMode] = React.useState(theme_mode);

  const newTheme = createTheme({ palette: { mode: colorMode } });
  return (
    <ThemeProvider theme={newTheme}>
      <Paper sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}} elevation={0}>
          <BarChart
            colors={blueberryTwilightPalette}
            yAxis={[{ label:"Number of Reviews" }]}
            xAxis={[{ label:"Difficulty", scaleType: "band", data: ["5", "4", "3", "2", "1"] }]}
            series={[{ data: review_data }]}
            width={350}
            height={height}
          />
      </Paper>
    </ThemeProvider>
  );
}
