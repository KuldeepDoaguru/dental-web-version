// // import React from "react";
// // import {
// //   Bar,
// //   BarChart,
// //   CartesianGrid,
// //   Legend,
// //   Tooltip,
// //   XAxis,
// //   YAxis,
// // } from "recharts";

// // import styled from "styled-components";

// // const BarChartz = () => {
// //   const data = [
// //     {
// //       name: "01/04/24",
// //       uv: 4000,
// //       pv: 2400,
// //     },
// //     {
// //       name: "02/04/24",
// //       uv: 3000,
// //       pv: 1398,
// //     },
// //     {
// //       name: "03/04/24",
// //       uv: 2000,
// //       pv: 9800,
// //     },
// //     {
// //       name: "04/04/24",
// //       uv: 2780,
// //       pv: 3908,
// //     },
// //     {
// //       name: "05/04/24",
// //       uv: 1890,
// //       pv: 4800,
// //     },
// //     {
// //       name: "06/04/24",
// //       uv: 1890,
// //       pv: 4800,
// //     },
// //     {
// //       name: "07/04/24",
// //       uv: 1890,
// //       pv: 4800,
// //     },
// //   ];
// //   return (
// //     <Container>
// //       <BarChart width={600} height={350} data={data}>
// //         <CartesianGrid strokeDasharray="3 3" />
// //         <XAxis dataKey="name" />
// //         <YAxis />
// //         <Tooltip />
// //         <Legend />
// //         <Bar dataKey="pv" fill="#213555" />
// //         <Bar dataKey="uv" fill="#82ca9d" />
// //       </BarChart>
// //     </Container>
// //   );
// // };

// // export default BarChartz;

// // const Container = styled.div``;


// import React, { useEffect, useState } from "react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
// } from "recharts";
// import axios from "axios";
// import styled from "styled-components";
// import { useSelector } from "react-redux";

// const MonthlyTestBarChart = () => {
//   const [monthlyTestData, setMonthlyTestData] = useState([]);
 
//   const currentUser = useSelector(state => state.auth.user);
  
//   const token = currentUser?.token;

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(
//           "https://dentalgurulab.doaguru.com/api/lab/get-patient-details",
//           {
//             headers: {
//               'Content-Type': 'application/json',
//               'Authorization': `Bearer ${token}`
//           }}
//         );
//         if (response.status === 200) {
//           const data = response.data.result;
//           const monthlyData = processData(data);
//           setMonthlyTestData(monthlyData);
//         } else {
//           console.error("Failed to fetch data");
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   const processData = (data) => {
//     const monthlyData = {};
//     // Initialize data structure
//     data.forEach((test) => {
//       const date = new Date(test.created_date);
//       const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;
//       if (!monthlyData[monthYear]) {
//         monthlyData[monthYear] = { monthYear, pending: 0, done: 0 };
//       }
//       if (test.test_status === "pending") {
//         monthlyData[monthYear].pending++;
//       } else if (test.test_status === "done") {
//         monthlyData[monthYear].done++;
//       }
//     });
//     return Object.values(monthlyData);
//   };

//   return (
//     <Wrapper>
    
//      <BarChart
//       width={600}
//       height={300}
//       data={monthlyTestData}
//       margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
//     >
//       <CartesianGrid strokeDasharray="3 3" />
//       <XAxis dataKey="monthYear" />
//       <YAxis />
//       <Tooltip />
//       <Legend />
//       <Bar dataKey="pending" fill="#8884d8" name="Pending Tests" />
//       <Bar dataKey="done" fill="#82ca9d" name="Done Tests" />
//     </BarChart>
//     </Wrapper>
   
//   );
// };

// export default MonthlyTestBarChart;
// const Wrapper  = styled.div`
//   .recharts-wrapper{

//     @media screen and  (min-width:1024px ) and (max-width: 1200px){
//       margin-left: -4.5rem;
//     }
//   }
// `
  


import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import axios from "axios";
import styled from "styled-components";
import { useSelector } from "react-redux";

const DailyTestBarChart = () => {
  const [dailyTestData, setDailyTestData] = useState([]);
  
  const currentUser = useSelector((state) => state.auth.user);
  const token = currentUser?.token;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://dentalgurulab.doaguru.com/api/lab/get-patient-details",
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          }
        );
        if (response.status === 200) {
          const data = response.data.result;
          const dailyData = processData(data);
          setDailyTestData(dailyData);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [token]);

  const processData = (data) => {
    const dailyData = {};
    // Initialize data structure
    data.forEach((test) => {
      const date = new Date(test.created_date);
      const dateString = date.toISOString().split("T")[0]; // format as YYYY-MM-DD
      if (!dailyData[dateString]) {
        dailyData[dateString] = { date: dateString, pending: 0, done: 0 };
      }
      if (test.test_status === "pending") {
        dailyData[dateString].pending++;
      } else if (test.test_status === "done") {
        dailyData[dateString].done++;
      }
    });
    return Object.values(dailyData);
  };

  return (
    <Wrapper>
      <BarChart
        width={600}
        height={300}
        data={dailyTestData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="pending" fill="#8884d8" name="Pending Tests" />
        <Bar dataKey="done" fill="#82ca9d" name="Done Tests" />
      </BarChart>
    </Wrapper>
  );
};

export default DailyTestBarChart;

const Wrapper = styled.div`
  .recharts-wrapper {
    @media screen and (min-width: 1024px) and (max-width: 1200px) {
      margin-left: -4.5rem;
    }
  }
`;
