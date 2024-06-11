// // import React from "react";
// // import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
// // import { Pie } from "react-chartjs-2";
// // import styled from "styled-components";

// // ChartJS.register(ArcElement, Tooltip, Legend);

// // export const data = {
// //   labels: ["Oral", "pathology", "Radiology"],
// //   datasets: [
// //     {
// //       label: "# Patients",
// //       data: [19, 12, 3],
// //       backgroundColor: [
// //         "#213555",
// //         "#8377d1",
// //         "#6d5a72",
// //         "#213555",
// //         "#8377d1",
// //         "#6d5a72",
// //       ],
// //       borderColor: [
// //         "#213555",
// //         "#8377d1",
// //         "#6d5a72",
// //         "#213555",
// //         "#8377d1",
// //         "#6d5a72",
// //       ],
// //       borderWidth: 2,
// //     },
// //   ],
// // };

// // const PieCharts = () => {
// //   return (
// //     <Container>
// //       <div className="class">
// //         <div className="d">
// //           <Pie data={data} />
// //         </div>
// //       </div>
// //     </Container>
// //   );
// // };

// // export default PieCharts;

// // const Container = styled.div`
// //   .class {
// //     width: 100%;
// //     height: 20rem;
// //     display: flex;
// //     justify-content: center;
// //   }
// //   .d {
// //     width: 40%;
// //   }
// // `;








// import React, { useState, useEffect } from 'react';
// import { Pie } from 'react-chartjs-2';
// import axios from 'axios';
// import styled from 'styled-components';
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
// import { useSelector } from 'react-redux';

// // Register Chart.js components
// ChartJS.register(ArcElement, Tooltip, Legend);

// const PieCharts = () => {
//   const [data, setData] = useState(null);

//   const currentUser = useSelector(state => state.auth.user);
//   const token = currentUser?.token;

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('https://dentalgurulab.doaguru.com/api/lab/get-patient-details', {
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`,
//           },
//         });

//         if (response.status === 200) {
//           // Filter the data to include only the lab names 'oral', 'pathology', and 'radiology' and with status 'pending'
//           const filteredData = response.data.result.filter(dataset => 
//             ['oral', 'pathology', 'radiology'].includes(dataset.lab_name.toLowerCase()) && dataset.test_status.toLowerCase() === 'pending'
//           );
//           console.log(response.data.result);

//           // Count occurrences of each unique lab name
//           const labCounts = filteredData.reduce((counts, dataset) => {
//             const labName = dataset.lab_name.toLowerCase();
//             counts[labName] = (counts[labName] || 0) + 1;
//             return counts;
//           }, {});

//           // Convert labCounts object to an array of objects
//           const pieChartData = Object.entries(labCounts).map(([lab_name, count]) => ({ lab_name, count }));

//           setData(pieChartData);
//         } else {
//           console.error('Failed to fetch data');
//         }
//       } catch (error) {
//         console.error('Error fetching patient data:', error);
//       }
//     };

//     fetchData();
//   }, [token]);

//   return (
//     <Container>
//       <div className="class">
//         <div className="d">
//           {data ? (
//             <Pie
//               data={{
//                 labels: data.map((entry) => entry.lab_name.charAt(0).toUpperCase() + entry.lab_name.slice(1)),
//                 datasets: [
//                   {
//                     label: '# Patients',
//                     data: data.map((entry) => entry.count),
//                     backgroundColor: ['#213555', '#8377d1', '#6d5a72'],
//                     borderColor: ['#213555', '#8377d1', '#6d5a72'],
//                     borderWidth: 2,
//                   },
//                 ],
//               }}
//             />
//           ) : (
//             <p>Loading data...</p>
//           )}
//         </div>
//       </div>
//     </Container>
//   );
// };

// export default PieCharts;

// const Container = styled.div`
//   .class {
//     width: 100%;
//     height: 20rem;
//     display: flex;
//     justify-content: center;
//   }
//   .d {
//     width: 40%;
 
//     @media screen and (min-width: 1024px) and (max-width: 1200px) {
//       width: 70%;
//     }
//   }
// `;


import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';
import styled from 'styled-components';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useSelector } from 'react-redux';
import animationData from "../../Pages/animation/loading-effect.json";
import Lottie from "react-lottie";
// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);


const PieCharts = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loading1, setLoading1] = useState(false);
  const currentUser = useSelector(state => state.auth.user);
  const token = currentUser?.token;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://dentalgurulab.doaguru.com/api/lab/get-patient-details', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          // Filter the data to include only the lab names 'oral', 'pathology', and 'radiology' and with status 'pending'
          const filteredData = response.data.result.filter(dataset => 
            ['oral', 'pathology', 'radiology'].includes(dataset.lab_name.toLowerCase()) && dataset.test_status.toLowerCase() === 'pending'
          );

          // Count occurrences of each unique lab name
          const labCounts = filteredData.reduce((counts, dataset) => {
            const labName = dataset.lab_name.toLowerCase();
            counts[labName] = (counts[labName] || 0) + 1;
            return counts;
          }, {});

          // Convert labCounts object to an array of objects
          const pieChartData = Object.entries(labCounts).map(([lab_name, count]) => ({ lab_name, count }));

          setData(pieChartData);
          setLoading(false);
        } else {
          console.error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching patient data:', error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchData();
    }
  }, [token]);
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <Container>
      <div className="class">
        <div className="d">
        {loading ? (
            <Lottie options={defaultOptions} height={300} width={400}></Lottie>
          ) : (
            <>
              {data && data.length > 0 ? (
                <Pie
                  data={{
                    labels: data.map((entry) => entry.lab_name.charAt(0).toUpperCase() + entry.lab_name.slice(1)),
                    datasets: [
                      {
                        label: '# Patients',
                        data: data.map((entry) => entry.count),
                        backgroundColor: ['#213555', '#8377d1', '#6d5a72'],
                        borderColor: ['#213555', '#8377d1', '#6d5a72'],
                        borderWidth: 2,
                      },
                    ],
                  }}
                />
              ) : (
                <p>No Patients Pending Test Data</p>
              )}
            </>
          )}
        </div>
      </div>
    </Container>
  );
};

export default PieCharts;

const Container = styled.div`
  .class {
    width: 100%;
    height: 20rem;
    display: flex;
    justify-content: center;
  }
  .d {
    width: 40%;

    @media screen and (min-width: 1024px) and (max-width: 1200px) {
      width: 70%;
    }
  }
`;



