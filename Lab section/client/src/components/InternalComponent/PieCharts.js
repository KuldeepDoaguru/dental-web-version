// // import React from "react";
// // import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
// // import { Pie } from "react-chartjs-2";
// // import styled from "styled-components";

// // ChartJS.register(ArcElement, Tooltip, Legend);

// // export const data = {
// //   labels: ["Oral", "Blood", "Radiology"],
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
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js/auto';

// const PieCharts = () => {
//   const [data, setData] = useState(null);

//   // useEffect(() => {
//   //   const fetchData = async () => {
//   //     try {
//   //       const response = await axios.get('https://dentalgurulab.doaguru.com/api/lab/get-patient-details');
//   //       setData(response.data);
//   //     } catch (error) {
//   //       console.error('Error fetching patient data:', error);
//   //     }
//   //   };

//   //   fetchData();
//   // }, []);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('https://dentalgurulab.doaguru.com/api/lab/get-patient-details');
//         // Filter the data to include only the lab names 'Oral', 'Blood', and 'Radiology'
//         const filteredData = response.data.filter(dataset => ['oral', 'blood', 'radiology'].includes(dataset.lab_name));
//         setData(filteredData);
//       } catch (error) {
//         console.error('Error fetching patient data:', error);
//       }
//     };
  
//     fetchData();
//   }, []);
  

//   return (
//     <Container>
//       <div className="class">
//         <div className="d">
//           {data && (
//             <Pie
//               data={{
//                 labels: data.map((dataset) => dataset.lab_name),
//                 datasets: [
//                   {
//                     label: '# Patients',
//                     data: data.map((dataset) => dataset.test_status === 'done' ? 1 : 0),
//                     backgroundColor: ['#213555', '#8377d1', '#6d5a72'],
//                     borderColor: ['#213555', '#8377d1', '#6d5a72'],
//                     borderWidth: 2,
//                   },
//                 ],
//               }}
//             />
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
 
//     @media screen and  (min-width:1024px ) and (max-width: 1200px){
//       width: 70%;
//     }
//   }
// `;



import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';
import styled from 'styled-components';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js/auto';
import { useSelector } from 'react-redux';

const PieCharts = () => {
  const [data, setData] = useState(null);
 
  const currentUser = useSelector(state => state.auth.user);
  
  const token = currentUser?.token;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://dentalgurulab.doaguru.com/api/lab/get-patient-details',
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }});
        // Filter the data to include only the lab names 'Oral', 'Blood', and 'Radiology'
        const filteredData = response.data.result.filter(dataset => ['oral', 'blood', 'radiology'].includes(dataset.lab_name));
        
        // Count occurrences of each unique lab name
        const labCounts = filteredData.reduce((counts, dataset) => {
          counts[dataset.lab_name] = (counts[dataset.lab_name] || 0) + 1;
          return counts;
        }, {});

        // Convert labCounts object to an array of objects
        const pieChartData = Object.entries(labCounts).map(([lab_name, count]) => ({ lab_name, count }));
        
        setData(pieChartData);
      } catch (error) {
        console.error('Error fetching patient data:', error);
      }
    };
  
    fetchData();
  }, []);

  return (
    <Container>
      <div className="class">
        <div className="d">
          {data && (
            <Pie
              data={{
                labels: data.map((entry) => entry.lab_name),
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
 
    @media screen and  (min-width:1024px ) and (max-width: 1200px){
      width: 70%;
    }
  }
`;









