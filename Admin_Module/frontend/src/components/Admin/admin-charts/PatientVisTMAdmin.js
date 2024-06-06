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

const PatientVisTMAdmin = () => {
  const dispatch = useDispatch();
  const user =  useSelector((state) => state.user.currentUser);
  const branch = user.branch_name;
  const [loading, setLoading] = useState(false);
  console.log(branch);
  const [appointmentList, setAppointmentList] = useState([]);

  console.log(appointmentList);

  useEffect(() => {
    const getAppointList = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://dentalguruadmin.doaguru.com/api/v1/admin/getAppointmentData/${branch}`,
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
  const firstDay = `${year}-${month}-01`;
  const lastDay = new Date(year, month, 0).getDate(); // Last day of the current month
  const formattedDate = `${year}-${month}`;
  console.log(formattedDate);

  const filterByTreated = appointmentList?.filter(
    (item) =>
      item.treatment_provided === "OPD" &&
      item.payment_Status === "paid" &&
      item.appointment_dateTime?.split("T")[0]?.slice(0, 7) === formattedDate
  );

  console.log(filterByTreated);
  // Group appointments by date and count appointments for each day
  const dailyAppointments = filterByTreated.reduce((acc, appointment) => {
    const date = appointment.appointment_dateTime?.split("T")[0];
    acc[date] = acc[date] ? acc[date] + 1 : 1;
    return acc;
  }, {});

  console.log(dailyAppointments);

  let totalAmountPerDay = {}; // Object to store total amount for each day

  filterByTreated.forEach((item) => {
    if (item.appointment_dateTime) {
      // Ensure payment_date_time is not null or undefined
      const date = item.appointment_dateTime.split("T")[0];
      totalAmountPerDay[date] =
        (totalAmountPerDay[date] || 0) + parseInt(item.opd_amount);
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

  console.log(data);

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

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };


  return (
    <Wrapper>
      <div className="container-fluid mt-4" id="main">
      {loading ? (
            <Lottie options={defaultOptions} height={300} width={400}></Lottie>
          ) : (
            <>
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
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="patients"
                    fill="#8884d8"
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
              </div>
            </div>
            </>
          )}
      </div>
    </Wrapper>
  );
};

export default PatientVisTMAdmin;

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