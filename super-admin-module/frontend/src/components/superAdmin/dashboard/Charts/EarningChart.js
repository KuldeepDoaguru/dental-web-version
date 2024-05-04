// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";
// import styled from "styled-components";

// const CustomTooltip = ({ active, payload, label }) => {
//   if (active && payload && payload.length) {
//     return (
//       <div className="custom-tooltip">
//         <p className="intro">{label}</p>
//         <p className="label">{`${payload[0].value}`}</p>
//         <p className="desc"></p>
//       </div>
//     );
//   }

//   return null;
// };

// const EarningChart = () => {
//   const dispatch = useDispatch();
// const user = useSelector((state) => state.user);
// // console.log(`User Name: ${user.name}, User ID: ${user.id}`);
// // console.log("User State:", user);
// const branch = useSelector((state) => state.branch);
// // console.log(`User Name: ${branch.name}`);
//   const [appointmentList, setAppointmentList] = useState([]);

//   useEffect(() => {
//     const getAppointList = async () => {
//       try {
//         const response = await axios.get(
//           `https://dentalgurusuperadmin.doaguru.com/api/v1/super-admin/getAppointmentData/${branch.name}`
//         );
//         setAppointmentList(response.data);
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     getAppointList();
//   }, [branch.name]);

//   const getDate = new Date();
//   const year = getDate.getFullYear();
//   const month = String(getDate.getMonth() + 1).padStart(2, "0");
//   const lastDay = new Date(year, month, 0).getDate(); // Last day of the current month
//   const formattedDate = `${year}-${month}`;

//   const filterForPayStatus = appointmentList?.filter((item) => {
//     return item.payment_status === "success";
//   });

//   // console.log(filterForPayStatus);

//   // Group appointments by date and count appointments for each day
//   const dailyAppointments = filterForPayStatus?.reduce((acc, appointment) => {
//     const date = appointment.appointment_dateTime.split("T")[0];
//     acc[date] = acc[date] ? acc[date] + 1 : 1;
//     return acc;
//   }, {});

//   // console.log(dailyAppointments);

//   let totalAmountPerDay = {}; // Object to store total amount for each day

//   filterForPayStatus.forEach((item) => {
//     const date = item.appointment_dateTime.split("T")[0];
//     totalAmountPerDay[date] =
//       (totalAmountPerDay[date] || 0) + parseFloat(item.bill_amount);
//   });

//   console.log(totalAmountPerDay);

//   // Create an array containing data for all days of the month
//   const data = Array.from({ length: lastDay }, (_, index) => {
//     const day = String(index + 1).padStart(2, "0");
//     const date = `${formattedDate}-${day}`;
//     return {
//       date,
//       patients: dailyAppointments[date] || 0,
//       Amount: totalAmountPerDay[date] || 0,
//     };
//   });

//   // console.log(data);

//   return (
//     <>
//       <Container>
//         <div className="container-fluid mt-4" id="main">
//           <BarChart
//             width={400}
//             height={300}
//             data={data}
//             margin={{
//               top: 5,
//               right: 10,
//               left: -40,
//               bottom: 5,
//             }}
//           >
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="date" />
//             <YAxis yAxisId="left" />
//             <YAxis yAxisId="right" orientation="right" />
//             <Tooltip />
//             <Legend />
//             <Bar
//               dataKey="patients"
//               fill="#40407a"
//               yAxisId="left"
//               name="Patients"
//             />
//             <Bar
//               dataKey="Amount"
//               fill="#c23616"
//               yAxisId="right"
//               name="Amount"
//             />
//           </BarChart>
//         </div>
//       </Container>
//     </>
//   );
// };

// export default EarningChart;
// const Container = styled.div`
//   #main {
//     background-color: #82ccdd;
//     width: 100%;
//     border-radius: 5px;
//     padding: 2rem;
//     box-shadow: 0px 2px 18px #bdbaba;
//     display: flex;
//     justify-content: center;
//   }
// `;

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

const EarnTMAdmin = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const branch = useSelector((state) => state.branch);
  const [appointmentList, setAppointmentList] = useState([]);

  useEffect(() => {
    const getAppointList = async () => {
      try {
        const response = await axios.get(
          `https://dentalgurusuperadmin.doaguru.com/api/v1/super-admin/getTreatSuggest/${branch.name}`
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
  const lastDay = new Date(year, month, 0).getDate(); // Last day of the current month
  const formattedDate = `${year}-${month}`;

  const filterForPayStatus = appointmentList?.filter((item) => {
    return item.payment_status === "paid";
  });

  // console.log(filterForPayStatus);

  // Group appointments by date and count appointments for each day
  const dailyAppointments = filterForPayStatus?.reduce((acc, appointment) => {
    const date = appointment.payment_date_time.split("T")[0];
    acc[date] = acc[date] ? acc[date] + 1 : 1;
    return acc;
  }, {});

  // console.log(dailyAppointments);

  let totalAmountPerDay = {}; // Object to store total amount for each day

  filterForPayStatus.forEach((item) => {
    const date = item.payment_date_time.split("T")[0];
    totalAmountPerDay[date] =
      (totalAmountPerDay[date] || 0) +
      parseFloat(item.paid_amount) +
      parseFloat(item.pay_by_sec_amt);
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
        </div>
      </Container>
    </>
  );
};

export default EarnTMAdmin;
const Container = styled.div`
  #main {
    background-color: #82ccdd;
    width: 100%;
    border-radius: 5px;
    padding: 2rem;
    box-shadow: 0px 2px 18px #bdbaba;
    display: flex;
    justify-content: center;
  }
`;
