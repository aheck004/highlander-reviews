import * as React from 'react';
import { createTheme, useTheme, ThemeProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { BarChart } from '@mui/x-charts/BarChart'


export default function DifficultyGraph({theme_mode, review_data, height=300}) {
  const newTheme = createTheme({ palette: { mode: theme_mode } });
  return (
    <ThemeProvider theme={newTheme}>
          <BarChart
            colors={['#285292']}
            yAxis={[{ label:"Number of Reviews" }]}
            xAxis={[{ label:"Difficulty", scaleType: "band", data: ["5", "4", "3", "2", "1"] }]}
            series={[{ data: review_data }]}
            width={350}
            height={height}
          />
    </ThemeProvider>
  );
}
