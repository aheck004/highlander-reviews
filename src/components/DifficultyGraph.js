import React, { useEffect, useState } from "react";
import { BarChart } from "@mui/x-charts";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme.js";

function DifficultyGraph({ review_data }) {
  return (
    <ThemeProvider theme={theme}>
      <BarChart
        colors={[theme.palette.primary.main]}
        xAxis={[{ scaleType: "band", data: ["5", "4", "3", "2", "1"] }]}
        series={[{ data: review_data }]}
        width={350}
        height={300}
      />
    </ThemeProvider>
  );
}

export default DifficultyGraph;
