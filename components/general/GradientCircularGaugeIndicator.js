import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const GradientCircularGaugeIndicator = ({ score }) => {
  const [seriesRadial, setSeriesRadial] = useState([1]);

  useEffect(() => {
    console.log(score);
    const creditScore = processCreditScore(score);
    console.log("🚀 ~ score", score);
    console.log("🚀 ~ creditScore", creditScore);
    setSeriesRadial([creditScore ? creditScore : 1]);
    if (score) {
      setOptionsRadial({
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
                formatter: function (creditScore) {
                  return `${Math.floor((creditScore * 850) / 100)}/850`;
                },
                color: "#110F2D",
                fontSize: "34px",
                show: true,
              },
            },
          },
        },
        fill: {
          opacity: 0.9,
          colors: [
            function ({ value, seriesIndex, w }) {
              if (value === 1) {
                return "#FFFFFF00";
              } else if (value <= 25) {
                return "#dc2626";
              } else if (value <= 50) {
                return "#fbbf24";
              } else if (value <= 75) {
                return "#4ade80";
              } else {
                return "#22c55e";
              }
            },
          ],
          type: "solid",

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
        labels: ["Credit Score"],
      });
    } else {
      setOptionsRadial({
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
                  return "?";
                },
                color: "#110F2D",
                fontSize: "120px",
                show: true,
              },
            },
          },
        },
        fill: {
          opacity: 0.9,
          colors: [
            function ({ value, seriesIndex, w }) {
              if (value === 1) {
                return "#FFFFFF00";
              } else if (value <= 25) {
                return "#dc2626";
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
        labels: [score ? "Credit Score" : ""],
      });
    }
  }, [score]);

  const [optionsRadial, setOptionsRadial] = useState({
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
              return "?";
            },
            color: "#110F2D",
            fontSize: "120px",
            show: true,
          },
        },
      },
    },
    fill: {
      opacity: 0.9,
      colors: [
        function ({ value, seriesIndex, w }) {
          if (value === 1) {
            return "#FFFFFF00";
          } else if (value <= 25) {
            return "#dc2626";
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
    labels: ["Credit Score"],
  });

  const processCreditScore = (score) => {
    return Math.floor((score * 100) / 850);
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
