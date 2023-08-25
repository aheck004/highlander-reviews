import React, { useEffect, useState } from "react";
import { BarChart } from "@mui/x-charts";
import { ThemeProvider } from "@mui/material/styles";
import { themes } from "./themes";
import { useTheme } from "./ThemeContext";

function DifficultyGraph({ review_data, height=300 }) {
  const theme = themes[useTheme().theme];

  return (
    <ThemeProvider theme={theme}>
      <BarChart
        colors={[theme.palette.primary.main]}
        xAxis={[{ scaleType: "band", data: ["5", "4", "3", "2", "1"] }]}
        series={[{ data: review_data }]}
        width={350}
        height={height}
      />
    </ThemeProvider>
  );
}

export default DifficultyGraph;
