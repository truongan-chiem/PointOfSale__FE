import React, { useEffect, useRef } from "react";
import Box from "../Box/Box";
import useWindowSize from "../../hook/useWindowSize";
import { VscLoading } from "react-icons/vsc";
import "./BoxAreaChart.scss";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useState } from "react";
import { useSelector } from "react-redux";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);
const BoxAreaChart = ({ dataChart }) => {
  const [labels, setLabels] = useState([]);
  const [sales, setSales] = useState([]);
  const isLoading = useSelector((state) => state.statistic.isLoading);
  const { width } = useWindowSize();
  const max = useRef(0);
  useEffect(() => {
    setLabels([]);
    setSales([]);
    max.current = 0;
    dataChart.forEach((element) => {
      if (max.current < element.sales) {
        max.current = element.sales;
      }
      setLabels((prev) => [...prev, element.day]);
      setSales((prev) => [...prev, element.sales]);
    });
    max.current =
      max.current > 10000000
        ? (Number(max.current.toString()[0]) + 1) *
          Math.pow(10, Number(max.current.toString().length) - 1)
        : 10000000;
  }, [dataChart]);
  const data = {
    labels: labels,
    datasets: [
      {
        fill: true,
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 200);
          gradient.addColorStop(0, "rgba(112, 67, 50,1)");
          gradient.addColorStop(1, "rgba(112, 67, 50,0.1)");
          return gradient;
        },

        borderColor: "#704332",
        data: sales,
        lineTension: 0.4,
        pointRadius: width > 768 ? 2 : 0,
        pointBackgroundColor: "#704332",
        pointBorderWidth: 4,
      },
    ],
  };
  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          autoSkip: true,
          maxTicksLimit: width > 768 ? 14 : 4,
          maxRotation: 0,
          minRotation: 0,
          padding: 20,
          font: {
            size: width > 768 ? 14 : 8,
          },
        },
      },
      y: {
        beginAtZero: true,
        max: max.current,
        ticks: {
          callback: function (value, index, ticks) {
            value = value.toLocaleString("it-IT", { style: "currency", currency: "VND" });
            return value;
          },
          font: {
            size: width > 768 ? 14 : 8,
          },
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };
  return (
    <Box className="box-area-chart">
      <div className="box-area-chart__header">
        <h1>Daily Sales</h1>
      </div>
      {isLoading ? (
        <div className="box-area-chart__loading">
          <VscLoading />
        </div>
      ) : (
        <Line options={options} data={data} />
      )}
    </Box>
  );
};

export default BoxAreaChart;
