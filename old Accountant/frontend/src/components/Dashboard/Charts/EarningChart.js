import React from "react";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid } from "recharts";

import styled from "styled-components";

const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red", "pink"];

const getPath = (x, y, width, height) => {
  return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${
    y + height / 3
  }
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
    x + width
  }, ${y + height}
  Z`;
};

const TriangleBar = (props) => {
  const { fill, x, y, width, height } = props;

  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

const EarningChart = () => {
  const data = [
    {
      name: "Jan",
      uv: 4000,
    },
    {
      name: "Feb",
      uv: 3000,
    },
    {
      name: "March",
      uv: 2000,
    },
    {
      name: "April",
      uv: 2780,
    },
    {
      name: "May",
      uv: 1890,
    },
    {
      name: "June",
      uv: 2390,
    },
    {
      name: "July",
      uv: 3490,
    },
  ];

  return (
    <Wrapper>
      <div className="container-fluid mt-4 ms-2" id="main">
        <div className="row">
          <div className="d-flex justify-content-center">
            <BarChart
              width={500}
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
              <Bar
                dataKey="uv"
                fill="#8884d8"
                shape={<TriangleBar />}
                label={{ position: "top" }}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                ))}
              </Bar>
            </BarChart>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default EarningChart;

const Wrapper = styled.div`
  #main {
    background-color: #ffd9cb7d;
    width: 100%;
    border-radius: 5px;
    padding: 2rem;
    box-shadow: 0px 2px 18px #bdbaba;
  }

  @media screen and (max-width: 768px) {
    font-size: small;
  }
`;
