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
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  return (
    <Wrapper>
      <div className="container-fluid mt-4" id="main">
        <div className="row">
          <div className="d-flex justify-content-center">
            <LineChart
              width={350}
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
