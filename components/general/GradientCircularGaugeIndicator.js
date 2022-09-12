import dynamic from "next/dynamic";
import { Component } from "react";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

class GradientCircularGaugeIndicator extends Component {
  constructor(props) {
    super(props);

    this.updateCharts = this.updateCharts.bind(this);
    const rawCreditScore = 720;
    const processedCreditScore = Math.floor((rawCreditScore * 100) / 850);

    this.state = {
      optionsRadial: {
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
                  return `${rawCreditScore} / 850`;
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
              if (value <= 25) {
                return "#ef4444";
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
        labels: ["Credit score:"],
      },
      seriesRadial: [processedCreditScore],
      optionsBar: {
        chart: {
          stacked: true,
          stackType: "100%",
          toolbar: {
            show: false,
          },
        },
        plotOptions: {
          bar: {
            horizontal: true,
          },
        },
        dataLabels: {
          dropShadow: {
            enabled: true,
          },
        },
        stroke: {
          width: 0,
        },
        xaxis: {
          categories: ["Fav Color"],
          labels: {
            show: false,
          },
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
        },
        fill: {
          opacity: 1,
          type: "gradient",
          gradient: {
            shade: "dark",
            type: "vertical",
            shadeIntensity: 0.35,
            gradientToColors: undefined,
            inverseColors: false,
            opacityFrom: 0.85,
            opacityTo: 0.85,
            stops: [0, 100],
          },
        },
        legend: {
          position: "bottom",
          horizontalAlign: "right",
        },
      },
    };
  }

  updateCharts() {
    const max = 90;
    const min = 30;
    const newMixedSeries = [];
    const newBarSeries = [];

    this.setState({
      seriesRadial: [Math.floor(Math.random() * (90 - 50 + 1)) + 50],
    });
  }

  render() {
    return (
      <Chart
        options={this.state.optionsRadial}
        series={this.state.seriesRadial}
        type="radialBar"
        width="400"
      />
    );
  }
}

export default GradientCircularGaugeIndicator;
