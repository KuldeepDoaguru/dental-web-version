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

const ExpenseTMAdmin = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  console.log(user);
  const [appointmentList, setAppointmentList] = useState([]);

  useEffect(() => {
    const getAppointList = async () => {
      try {
        const response = await axios.get(
          `https://dentalguruadmin.doaguru.com/api/v1/admin/getPurInventoryByBranch/${user.branch_name}`,
          {
            headers: {
              "Content-Type": "multipart/form-data",
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
  }, [user.branch_name]);

  const getDate = new Date();
  const year = getDate.getFullYear();
  const month = String(getDate.getMonth() + 1).padStart(2, "0");
  const lastDay = new Date(year, month, 0).getDate(); // Last day of the current month
  const formattedDate = `${year}-${month}`;

  // const filterForPayStatus = appointmentList?.filter((item) => {
  //   return item.payment_status === "success";
  // });

  // console.log(filterForPayStatus);

  // Group appointments by date and count appointments for each day
  // const dailyAppointments = filterForPayStatus?.reduce((acc, appointment) => {
  //   const date = appointment.appointment_dateTime?.split("T")[0];
  //   acc[date] = acc[date] ? acc[date] + 1 : 1;
  //   return acc;
  // }, {});

  // console.log(dailyAppointments);

  let totalAmountPerDay = {}; // Object to store total amount for each day

  appointmentList.forEach((item) => {
    const date = item.purchase_date?.split("T")[0];
    totalAmountPerDay[date] =
      (totalAmountPerDay[date] || 0) +
      parseFloat(item.item_mrp) * item.pur_quantity;
  });

  console.log(totalAmountPerDay);

  // Create an array containing data for all days of the month
  const data = Array.from({ length: lastDay }, (_, index) => {
    const day = String(index + 1).padStart(2, "0");
    const date = `${formattedDate}-${day}`;
    return {
      date,
      Amount: totalAmountPerDay[date] || 0,
    };
  });

  console.log(data);

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
              right: 0,
              left: -20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            {/* <Bar
              dataKey="patients"
              fill="#40407a"
              yAxisId="left"
              name="Patients"
            /> */}
            <Bar
              dataKey="Amount"
              fill="#40407a"
              yAxisId="left"
              name="Amount"
            />
          </BarChart>
        </div>
      </Container>
    </>
  );
};

export default ExpenseTMAdmin;
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
