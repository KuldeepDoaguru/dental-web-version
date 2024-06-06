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
import animationData from "../../../pages/animation/loading-effect.json";
import Lottie from "react-lottie";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="intro">{label}</p>
        <p className="label">{`${payload[0].value}`}</p>
        <p className="desc"></p>
      </div>
    );
  }

  return null;
};

const AdminLabChart = () => {
  const dispatch = useDispatch();
  const user =  useSelector((state) => state.user.currentUser);
  const branch = user.branch_name;
 
  const [appointmentList, setAppointmentList] = useState([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const getAppointList = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://dentalguruadmin.doaguru.com/api/v1/admin/getLabData/${branch}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        setLoading(false);
        setAppointmentList(response.data);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };

    getAppointList();
  }, [branch]);

  
  const getDate = new Date();
  const year = getDate.getFullYear();
  const month = String(getDate.getMonth() + 1).padStart(2, "0");
  const lastDay = new Date(year, month, 0).getDate(); // Last day of the current month
  const formattedDate = `${year}-${month}`;

  console.log(appointmentList);
  const filterForPayStatus = appointmentList?.filter((item) => {
    return (
      item.payment_status === "done" &&
      item.authenticate_date?.split("T")[0]?.slice(0, 7) === formattedDate
    );
  });

  console.log(filterForPayStatus);
  // Group appointments by date and count appointments for each day
  const dailyAppointments = filterForPayStatus?.reduce((acc, appointment) => {
    if (appointment.authenticate_date) {
      // Ensure payment_date_time is not null or undefined
      const date = appointment.authenticate_date.split("T")[0];
      acc[date] = acc[date] ? acc[date] + 1 : 1;
    }
    return acc;
  }, {});

  let totalAmountPerDay = {}; // Object to store total amount for each day

  filterForPayStatus.forEach((item) => {
    if (item.authenticate_date) {
      // Ensure payment_date_time is not null or undefined
      const date = item.authenticate_date.split("T")[0];
      totalAmountPerDay[date] =
        (totalAmountPerDay[date] || 0) + parseFloat(item.payment);
    }
  });

  console.log(totalAmountPerDay);

  // Create an array containing data for all days of the month
  const data = Array.from({ length: lastDay }, (_, index) => {
    const day = String(index + 1).padStart(2, "0");
    const date = `${formattedDate}-${day}`;
    return {
      date,
      patients: dailyAppointments[date] || 0,
      Amount: totalAmountPerDay[date] || 0,
    };
  });
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };


  // console.log(data);

  return (
    <>
      <Container>
        <div className="container-fluid mt-4" id="main">
        {loading ? (
            <Lottie options={defaultOptions} height={300} width={400}></Lottie>
          ) : (
            <>
              <BarChart
                width={400}
                height={300}
                data={data}
                margin={{
                  top: 5,
                  right: 10,
                  left: -20,
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
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="patients"
                  fill="#40407a"
                  yAxisId="left"
                  name="Patients"
                />
                <Bar
                  dataKey="Amount"
                  fill="#c23616"
                  yAxisId="right"
                  name="Amount"
                />
              </BarChart>
              </>
          )}
        </div>
      </Container>
    </>
  );
};

export default AdminLabChart;
const Container = styled.div`
  #main {
    background-color: #9aecdb;
    width: 100%;
    border-radius: 5px;
    padding: 2rem;
    box-shadow: 0px 2px 18px #bdbaba;
    display: flex;
    justify-content: center;
  }
`;