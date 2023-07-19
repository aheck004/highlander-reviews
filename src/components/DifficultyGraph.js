import React, { useEffect, useState } from "react";
import { BarChart } from "@mui/x-charts";

function DifficultyGraph({ review_data }) {
  return (
    <BarChart
      xAxis={[{ scaleType: "band", data: ["5", "4", "3", "2", "1"] }]}
      series={[{ data: review_data }]}
      width={500}
      height={300}
    />
  );
}

export default DifficultyGraph;
