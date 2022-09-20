import dynamic from "next/dynamic";
import { useState } from "react";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const GradientCircularGaugeIndicator = () => {
  const [rawCreditScore, setRawCreditScore] = useState(0);
  const processedCreditScore =
    rawCreditScore == 0 ? 851 : Math.floor((rawCreditScore * 100) / 850);
  const [seriesRadial, setSeriesRadial] = useState([processedCreditScore]);

  const optionsRadial = {
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 225,
        hollow: {
          margin: 0,
          size: "70%",
          background: "#fff",
          image: undefined,
          imageOffsetX: 0,
          imageOffsetY: 0,
          position: "front",
          dropShadow: {
            enabled: true,
            top: 3,
            left: 0,
            blur: 4,
            opacity: 0.24,
          },
        },
        track: {
          background: "#fff",
          strokeWidth: "67%",
          margin: 0, // margin is in pixels
          dropShadow: {
            enabled: true,
            top: -3,
            left: 0,
            blur: 4,
            opacity: 0.35,
          },
        },

        dataLabels: {
          showOn: "always",
          name: {
            offsetY: -20,
            show: true,
            color: "#110F2D",
            fontSize: "24px",
          },
          value: {
            formatter: function () {
              return `${rawCreditScore ? `${rawCreditScore}/850` : "?"}`;
            },
            color: "#110F2D",
            fontSize: `${rawCreditScore ? "34px" : "120px"}`,
            show: true,
          },
        },
      },
    },
    fill: {
      opacity: 0.9,
      colors: [
        function ({ value, seriesIndex, w }) {
          if (value == 851) {
            //red color
            return "#E6E6E6";
          } else if (value <= 25) {
            return "#fbbf24";
          } else if (value <= 50) {
            return "#fbbf24";
          } else if (value <= 75) {
            return "#60a5fa";
          } else {
            return "#22c55e";
          }
        },
      ],
      type: "solid",
      gradient: {
        shade: "dark",
        type: "horizontal",
        shadeIntensity: 0.5,
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100],
      },
      image: {
        src: [],
        width: undefined,
        height: undefined,
      },
      pattern: {
        style: "verticalLines",
        width: 6,
        height: 6,
        strokeWidth: 2,
      },
    },
    stroke: {
      lineCap: "round",
    },
    labels: [rawCreditScore ? "Credit Score" : ""],
  };

  const updateCharts = () => {
    const max = 90;
    const min = 30;
    const newMixedSeries = [];
    const newBarSeries = [];

    setSeriesRadial({
      seriesRadial: [Math.floor(Math.random() * (90 - 50 + 1)) + 50],
    });
  };

  return (
    <Chart
      options={optionsRadial}
      series={seriesRadial}
      type="radialBar"
      width="400"
    />
  );
};

export default GradientCircularGaugeIndicator;
