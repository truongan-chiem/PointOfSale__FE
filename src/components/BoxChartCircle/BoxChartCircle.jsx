import React from "react";
import Box from "../Box/Box";
import "./BoxChartCircle.scss";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);
const BoxChartCircle = ({totalIncome}) => {
  const labels = ["Food", "Drink", "Others"];
  const data = {
    labels: labels,
    datasets: [
      {
        data: [50, 30, 20],
        backgroundColor: ["#58C893", "#EC4235", "#EF9235"],
        borderColor: ["#58C893", "#EC4235", "#EF9235"],
        borderWidth: 1,
      },
    ],
  };
  const options = {
    cutout: 80,
    rotation: 270,
    borderRadius: 16,
    spacing: 8,
    maintainAspectRatio : false,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          padding: 30,
        },
      },
    },
  };
  return (
    <Box className="box-chart-circle">
      <h1 className="box-chart-circle__header">Total Income</h1>
      <div className="box-chart-circle__chart">
        <Doughnut options={options} data={data} />
        <h1 className="box-chart-circle__chart__total-income">${totalIncome}</h1>
      </div>
    </Box>
  );
};

export default BoxChartCircle;
