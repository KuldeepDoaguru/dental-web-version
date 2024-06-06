import React, { PureComponent } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import styled from "styled-components";

function AveragePatientChart() {
  const data = [
    {
      name: "Years",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "2014",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "2015",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "2016",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "2017",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "2018",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
    {
      name: "2019",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
    {
      name: "2020",
      uv: 5090,
      pv: 7300,
      amt: 7100,
    },
    {
      name: "2021",
      uv: 5090,
      pv: 7300,
      amt: 7100,
    },
    {
      name: "2022",
      uv: 5090,
      pv: 7300,
      amt: 7100,
    },
    {
      name: "2023",
      uv: 5090,
      pv: 7300,
      amt: 7100,
    },
    {
      name: "2024",
      uv: 5090,
      pv: 7300,
      amt: 7100,
    },
  ];

  return (
    <Wrapper>
      <div className="container-fluid mt-4" id="main">
        <div className="row">
          <div className="d-flex justify-content-center">
            <LineChart
              width={600}
              height={300}
              data={data}
              margin={{
                top: 5,
                right: 10,
                left: 10,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="pv"
                stroke="#004aad"
                activeDot={{ r: 8 }}
              />
              <Line type="monotone" dataKey="uv" stroke="#257042" />
            </LineChart>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

export default AveragePatientChart;

const Wrapper = styled.div`
  #main {
    background-color: #c7ecee;
    width: 100%;
    border-radius: 5px;
    padding: 2rem;
    box-shadow: 0px 2px 18px #bdbaba;
  }

  @media screen and (max-width: 768px) {
    font-size: small;
  }
`;
