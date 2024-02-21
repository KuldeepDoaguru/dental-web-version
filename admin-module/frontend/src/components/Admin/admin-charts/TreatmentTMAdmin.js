import React, { useState } from "react";
import styled from "styled-components";
import ReactApexChart from "react-apexcharts";

const TreatmentTMAdmin = () => {
  const [chartData, setChartData] = useState({
    series: [44, 55, 13, 43, 22, 44, 55, 13, 43, 22],
    options: {
      chart: {
        width: 380,
        type: "pie",
      },
      labels: [
        "Team A",
        "Team B",
        "Team C",
        "Team D",
        "Team E",
        "Team A",
        "Team B",
        "Team C",
        "Team D",
        "Team E",
      ],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  });
  return (
    <>
      <Container>
        <div className="d-flex justify-content-center align-items-center pt-5">
          <div id="chart">
            <ReactApexChart
              options={chartData.options}
              series={chartData.series}
              type="pie"
              width={380}
            />
          </div>
          <div id="html-dist"></div>
        </div>
      </Container>
    </>
  );
};

export default TreatmentTMAdmin;
const Container = styled.div``;
