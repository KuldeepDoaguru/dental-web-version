import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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

const PatientStatisticChart = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const branch = useSelector((state) => state.branch);
  console.log(branch);
  const [appointmentList, setAppointmentList] = useState([]);

  console.log(appointmentList);

  useEffect(() => {
    const getAppointList = async () => {
      try {
        const response = await axios.get(
          `https://dentalgurusuperadmin.doaguru.com/api/v1/super-admin/getAppointmentData/${branch.name}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        setAppointmentList(response.data);
      } catch (error) {
        console.log(error);
        
      }
    };

    getAppointList();
  }, [branch.name]);
  
  const getDate = new Date();
  const year = getDate.getFullYear();
  const month = String(getDate.getMonth() + 1).padStart(2, "0");
  const firstDay = `${year}-${month}-01`;
  const lastDay = new Date(year, month, 0).getDate(); // Last day of the current month
  const formattedDate = `${year}-${month}`;

  const filterByTreated = appointmentList?.filter(
    (item) => item.treatment_provided === "OPD"
  );

  // Group appointments by date and count appointments for each day
  const dailyAppointments = filterByTreated.reduce((acc, appointment) => {
    const date = appointment.appointment_dateTime.split("T")[0];
    acc[date] = acc[date] ? acc[date] + 1 : 1;
    return acc;
  }, {});

  console.log(dailyAppointments[formattedDate]);

  // Create an array containing data for all days of the month
  const data = Array.from({ length: lastDay }, (_, index) => {
    const day = String(index + 1).padStart(2, "0");
    const date = `${formattedDate}-${day}`;
    return {
      date,
      patients: dailyAppointments[date] || 0,
    };
  });

  const tickValues = Object.keys(dailyAppointments)
    .filter((date) => new Date(date).getDate() === 1)
    .map((date) => {
      const [yyyy, mm, dd] = date.split("-");
      return `${yyyy}-${mm}-${dd}`;
    });

  const xAxisTicks = [
    "2024-05-01",
    ...tickValues.filter((date) => date !== "2024-05-01"),
  ];

  return (
    <Wrapper>
      <div className="container-fluid mt-4" id="main">
        <div className="row">
          <div className="col-12 d-flex justify-content-center">
            <BarChart
              width={400}
              height={300}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 0,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tick={{
                  fontSize: 0,
                  transform: "translate(-10,0)",
                  dy: 5,
                  fill: "#666",
                  fontWeight: "bold",
                }}
              />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="patients" fill="#8884d8" />
            </BarChart>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default PatientStatisticChart;

const Wrapper = styled.div`
  #main {
    background-color: #55efc4;
    width: 100%;
    border-radius: 5px;
    padding: 2rem;
    box-shadow: 0px 2px 18px #bdbaba;
    display: flex;
    justify-content: center;
    display: flex;
    justify-content: center;
  }
  @media screen and (max-width: 768px) {
    padding: 20px;
    font-size: small;
  }
`;
