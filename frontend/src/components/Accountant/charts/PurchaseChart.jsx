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

// const data = [
//   {
//     name: "Page A",
//     uv: 4000,
//     pv: 2400,
//     amt: 2400,
//   },
//   {
//     name: "Page B",
//     uv: 3000,
//     pv: 1398,
//     amt: 2210,
//   },
//   {
//     name: "Page C",
//     uv: 2000,
//     pv: 9800,
//     amt: 2290,
//   },
//   {
//     name: "Page D",
//     uv: 2780,
//     pv: 3908,
//     amt: 2000,
//   },
//   {
//     name: "Page E",
//     uv: 1890,
//     pv: 4800,
//     amt: 2181,
//   },
//   {
//     name: "Page F",
//     uv: 2390,
//     pv: 3800,
//     amt: 2500,
//   },
//   {
//     name: "Page G",
//     uv: 3490,
//     pv: 4300,
//     amt: 2100,
//   },
// ];

// const getIntroOfPage = (label) => {
//   if (label === "Page A") {
//     return "Page A is about men's clothing";
//   }
//   if (label === "Page B") {
//     return "Page B is about women's dress";
//   }
//   if (label === "Page C") {
//     return "Page C is about women's bag";
//   }
//   if (label === "Page D") {
//     return "Page D is about household goods";
//   }
//   if (label === "Page E") {
//     return "Page E is about food";
//   }
//   if (label === "Page F") {
//     return "Page F is about baby food";
//   }
//   return "";
// };

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

const PurchaseChart = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const token = user.token;
  console.log(token);
  console.log(
    `User Name: ${user.name}, User ID: ${user.id}, branch: ${user.branch}`
  );
  console.log("User State:", user);
  const [appointmentList, setAppointmentList] = useState([]);

  useEffect(() => {
    const getAppointList = async () => {
      try {
        const response = await axios.get(
          `https://dentalguruadmin.doaguru.com//api/v1/admin/getPurInventoryByBranch/${user.branch}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAppointmentList(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getAppointList();
  }, [user.branch]);

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
  //   const date = appointment.appointment_dateTime.split("T")[0];
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

  // console.log(totalAmountPerDay);

  // Create an array containing data for all days of the month
  const data = Array.from({ length: lastDay }, (_, index) => {
    const day = String(index + 1).padStart(2, "0");
    const date = `${formattedDate}-${day}`;
    return {
      date,
      Amount: totalAmountPerDay[date] || 0,
    };
  });

  // console.log(data);

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
            {/* <Bar
              dataKey="patients"
              fill="#40407a"
              yAxisId="left"
              name="Patients"
            /> */}
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

export default PurchaseChart;
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
