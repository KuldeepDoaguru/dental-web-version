import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import styled from "styled-components";

const ExpenseChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Simulate dynamic data generation
    const generateData = () => {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, "0");
      const lastDay = new Date(year, month, 0).getDate();

      const generatedData = Array.from({ length: lastDay }, (_, index) => {
        const day = String(index + 1).padStart(2, "0");
        const date = `${year}-${month}-${day}`;
        // Generate random amount (between 1000 and 5000) for each day
        const amount = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;
        return { date, Amount: amount };
      });

      setData(generatedData);
    };

    generateData();
  }, []);

  return (
    <>
      <Container>
        <div className="container-fluid mt-4" id="main">
          <BarChart
            width={400}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 10,
              left: -40,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="Amount"
              fill="#40407a"
              yAxisId="right"
              name="Amount"
            />
          </BarChart>
        </div>
      </Container>
    </>
  );
};

export default ExpenseChart;

const Container = styled.div`
  #main {
    background-color: #ffeaa7;
    width: 100%;
    border-radius: 5px;
    padding: 2rem;
    box-shadow: 0px 2px 18px #bdbaba;
    display: flex;
    justify-content: center;
  }
`;
