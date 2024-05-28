// import React, { useEffect, useState } from "react";
// import styled from "styled-components";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import { IoArrowBackSharp } from "react-icons/io5";
// import { SiMoneygram } from "react-icons/si";
// import { MdOutlineNextWeek } from "react-icons/md";
// import { GiMoneyStack } from "react-icons/gi";
// import { GiTakeMyMoney } from "react-icons/gi";

// import { GiFrontTeeth } from "react-icons/gi";
// const ReportCardPage = () => {
//   const [testCounts, setTestCounts] = useState({
//     oral: 0,
//     blood: 0,
//     radiology: 0,
//     doneTest: 0,
//     pendingTest: 0,
//   });

//   useEffect(() => {
//     const fetchTestCounts = async () => {
//       try {
//         const response = await axios.get(
//           "https://dentalgurusuperadmin.doaguru.com/api/v1/super-admin/getPatientLabTest"
//         );
//         if (response.status === 200) {
//           const data = response.data;
//           // Filter data for oral, blood, and radiology tests
//           const oralTests = data.filter((item) => item.lab_name === "oral");
//           const bloodTests = data.filter((item) => item.lab_name === "blood");
//           const radiologyTests = data.filter(
//             (item) => item.lab_name === "radiology"
//           );
//           // Count done and pending tests
//           const doneTests = data.filter(
//             (item) => item.test_status === "done"
//           ).length;
//           const pendingTests = data.filter(
//             (item) => item.test_status === "pending"
//           ).length;
//           // Update state with test counts
//           setTestCounts({
//             oral: oralTests.length,
//             blood: bloodTests.length,
//             radiology: radiologyTests.length,
//             doneTest: doneTests,
//             pendingTest: pendingTests,
//           });
//         } else {
//           console.error("Failed to fetch test counts");
//         }
//       } catch (error) {
//         console.error("Error fetching test counts:", error);
//       }
//     };

//     fetchTestCounts();
//   }, []);

//   return (
//     <Wrapper>
//       <div className=" d-flex justify-content-around mt-5">
//         <div className="col-xxl-2 col-xl-2 col-lg-2 col-sm-8 col-8 col-md-2 my-3 p-0">
//           <div className="card">
//             <Link to="/OralTest" style={{ textDecoration: "none" }}>
//               <div className="card-body d-flex justify-content-center flex-column mb-3">
//                 <div className="text-light fs-1">
//                   <GiFrontTeeth />
//                 </div>
//                 <div className="cardtext">
//                   <h5 className="card-title text-light">Oral Report</h5>
//                   <p className="card-text">{testCounts.oral}</p>
//                 </div>
//               </div>
//             </Link>
//           </div>
//         </div>

//         <div className="col-xxl-2 col-xl-2 col-lg-2 col-sm-8 col-8 col-md-2 my-3 p-0">
//           <div className="card">
//             <Link to="/BloodTest" style={{ textDecoration: "none" }}>
//               <div className="card-body d-flex justify-content-center flex-column mb-3">
//                 <div className="text-light fs-1">
//                   <SiMoneygram />
//                 </div>
//                 <div className="cardtext">
//                   <h5 className="card-title text-light">Pathology Report</h5>
//                   <p className="card-text">{testCounts.blood}</p>
//                 </div>
//               </div>
//             </Link>
//           </div>
//         </div>

//         <div className="col-xxl-2 col-xl-2 col-lg-2 col-sm-8 col-8 col-md-2 my-3 p-0">
//           <div className="card">
//             <Link to="/RadiologyTest" style={{ textDecoration: "none" }}>
//               <div className="card-body d-flex justify-content-center flex-column mb-3">
//                 <div className="text-light fs-1">
//                   <MdOutlineNextWeek />
//                 </div>
//                 <div className="cardtext">
//                   <h5 className="card-title text-light">Radiology Report</h5>
//                   <p className="card-text">{testCounts.radiology}</p>
//                 </div>
//               </div>
//             </Link>
//           </div>
//         </div>

//         <div className="col-xxl-2 col-xl-2 col-lg-2 col-sm-8 col-8 col-md-2 my-3 p-0">
//           <div className="card">
//             <Link to="/PendingTest" style={{ textDecoration: "none" }}>
//               <div className="card-body d-flex justify-content-center flex-column mb-3">
//                 <div className="text-light fs-1">
//                   <GiMoneyStack />
//                 </div>
//                 <div className="cardtext">
//                   <h5 className="card-title text-light">Pending Report</h5>
//                   <p className="card-text">{testCounts.pendingTest}</p>
//                 </div>
//               </div>
//             </Link>
//           </div>
//         </div>

//         <div className="col-xxl-2 col-xl-2 col-lg-2 col-sm-8 col-8 col-md-2 my-3 p-0">
//           <div className="card">
//             <Link to="/Compleated" style={{ textDecoration: "none" }}>
//               <div className="card-body d-flex justify-content-center flex-column mb-3">
//                 <div className="text-light fs-1">
//                   <GiTakeMyMoney />
//                 </div>
//                 <div className="cardtext">
//                   <h5 className="card-title text-light">Done Report</h5>
//                   <p className="card-text">{testCounts.doneTest}</p>
//                 </div>
//               </div>
//             </Link>
//           </div>
//         </div>
//       </div>
//     </Wrapper>
//   );
// };

// export default ReportCardPage;

// const Wrapper = styled.div`
//   ul {
//     text-align: left;
//   }
//   li {
//     list-style: none;
//   }
//   tbody {
//     border: 1px solid #00000038;
//   }
//   th {
//     padding: 10px 0;
//     font-size: 18px;
//   }
//   .maintainceList {
//     transform: translateX(20%);
//   }
//   table {
//     width: 100%;
//     margin-bottom: 50px;
//   }
//   .mainHead {
//     font-size: 30px;
//   }
//   tr td {
//     padding: 10px 0;
//   }
//   .clinik {
//     height: 100px;
//     border: 1px solid #0000000f;
//     background-color: #004aad;
//   }
//   .boxes-container {
//     display: flex;
//     gap: 30px;
//     justify-content: center;
//     padding: 20px 10px;
//   }
//   .boxes {
//     width: 160px;
//     height: 100px;
//     background-color: #004aad;
//   }

//   .card {
//     background: #004aad;
//     height: 9.5rem;
//     border: none;
//     box-shadow: 1px 2px 8px black;
//     &:hover {
//       background: #264679;
//     }
//   }

//   .icon {
//     font-size: 40px;
//     color: white;
//   }
//   .card-body {
//     text-align: center;
//     padding: 5px;
//   }
//   .card-link {
//     text-decoration: none;
//     font-size: small;
//   }

//   .cardtext {
//     h5 {
//       color: white;
//     }
//     p {
//       color: white;
//     }
//   }
//   .report-date-column {
//     width: 30%;
//   }
//   .custom-cursor-pointer {
//     cursor: pointer;
//   }
//   .btn1 {
//     background-color: #213555;
//   }
// `;

// ================================================================================

// import React, { useEffect, useState } from "react";
// import styled from "styled-components";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import { IoArrowBackSharp } from "react-icons/io5";
// import { SiMoneygram } from "react-icons/si";
// import { MdOutlineNextWeek } from "react-icons/md";
// import { GiMoneyStack, GiTakeMyMoney, GiFrontTeeth } from "react-icons/gi";

// const ReportCardPage = () => {
//   const [testCounts, setTestCounts] = useState({
//     oral: 0,
//     blood: 0,
//     radiology: 0,
//     doneTest: 0,
//     pendingTest: 0,
//   });

//   useEffect(() => {
//     const fetchTestCounts = async () => {
//       try {
//         const response = await axios.get(
//           "https://dentalgurusuperadmin.doaguru.com/api/v1/super-admin/getPatientLabTest"
//         );
//         if (response.status === 200) {
//           const data = response.data;
//           console.log("API Response Data:", data); // Add this log

//           // Filter data for oral, blood, and radiology tests
//           const oralTests = data.filter((item) => item.lab_name === "oral");
//           const bloodTests = data.filter((item) => item.lab_name === "blood");
//           const radiologyTests = data.filter((item) => item.lab_name === "radiology");

//           // Count done and pending tests
//           const doneTests = data.filter((item) => item.test_status === "done").length;
//           const pendingTests = data.filter((item) => item.test_status === "pending").length;

//           console.log("Oral Tests:", oralTests.length);
//           console.log("Blood Tests:", bloodTests.length);
//           console.log("Radiology Tests:", radiologyTests.length);
//           console.log("Done Tests:", doneTests);
//           console.log("Pending Tests:", pendingTests);

//           // Update state with test counts
//           setTestCounts({
//             oral: oralTests.length,
//             blood: bloodTests.length,
//             radiology: radiologyTests.length,
//             doneTest: doneTests,
//             pendingTest: pendingTests,
//           });
//         } else {
//           console.error("Failed to fetch test counts");
//         }
//       } catch (error) {
//         console.error("Error fetching test counts:", error);
//       }
//     };

//     fetchTestCounts();
//   }, []);

//   console.log(testCounts);
  

//   return (
//     <Wrapper>
//       <div className="d-flex justify-content-around mt-5">
//         <div className="col-xxl-2 col-xl-2 col-lg-2 col-sm-8 col-8 col-md-2 my-3 p-0">
//           <div className="card">
//             <Link to="/OralTest" style={{ textDecoration: "none" }}>
//               <div className="card-body d-flex justify-content-center flex-column mb-3">
//                 <div className="text-light fs-1">
//                   <GiFrontTeeth />
//                 </div>
//                 <div className="cardtext">
//                   <h5 className="card-title text-light">Oral Report</h5>
//                   <p className="card-text">{testCounts.oral}</p>
//                 </div>
//               </div>
//             </Link>
//           </div>
//         </div>
//         <div className="col-xxl-2 col-xl-2 col-lg-2 col-sm-8 col-8 col-md-2 my-3 p-0">
//           <div className="card">
//             <Link to="/BloodTest" style={{ textDecoration: "none" }}>
//               <div className="card-body d-flex justify-content-center flex-column mb-3">
//                 <div className="text-light fs-1">
//                   <SiMoneygram />
//                 </div>
//                 <div className="cardtext">
//                   <h5 className="card-title text-light">Pathology Report</h5>
//                   <p className="card-text">{testCounts.blood}</p>
//                 </div>
//               </div>
//             </Link>
//           </div>
//         </div>
//         <div className="col-xxl-2 col-xl-2 col-lg-2 col-sm-8 col-8 col-md-2 my-3 p-0">
//           <div className="card">
//             <Link to="/RadiologyTest" style={{ textDecoration: "none" }}>
//               <div className="card-body d-flex justify-content-center flex-column mb-3">
//                 <div className="text-light fs-1">
//                   <MdOutlineNextWeek />
//                 </div>
//                 <div className="cardtext">
//                   <h5 className="card-title text-light">Radiology Report</h5>
//                   <p className="card-text">{testCounts.radiology}</p>
//                 </div>
//               </div>
//             </Link>
//           </div>
//         </div>
//         <div className="col-xxl-2 col-xl-2 col-lg-2 col-sm-8 col-8 col-md-2 my-3 p-0">
//           <div className="card">
//             <Link to="/PendingTest" style={{ textDecoration: "none" }}>
//               <div className="card-body d-flex justify-content-center flex-column mb-3">
//                 <div className="text-light fs-1">
//                   <GiMoneyStack />
//                 </div>
//                 <div className="cardtext">
//                   <h5 className="card-title text-light">Pending Report</h5>
//                   <p className="card-text">{testCounts.pendingTest}</p>
//                 </div>
//               </div>
//             </Link>
//           </div>
//         </div>
//         <div className="col-xxl-2 col-xl-2 col-lg-2 col-sm-8 col-8 col-md-2 my-3 p-0">
//           <div className="card">
//             <Link to="/Compleated" style={{ textDecoration: "none" }}>
//               <div className="card-body d-flex justify-content-center flex-column mb-3">
//                 <div className="text-light fs-1">
//                   <GiTakeMyMoney />
//                 </div>
//                 <div className="cardtext">
//                   <h5 className="card-title text-light">Done Report</h5>
//                   <p className="card-text">{testCounts.doneTest}</p>
//                 </div>
//               </div>
//             </Link>
//           </div>
//         </div>
//       </div>
//     </Wrapper>
//   );
// };

// export default ReportCardPage;

// const Wrapper = styled.div`
//   ul {
//     text-align: left;
//   }
//   li {
//     list-style: none;
//   }
//   tbody {
//     border: 1px solid #00000038;
//   }
//   th {
//     padding: 10px 0;
//     font-size: 18px;
//   }
//   .maintainceList {
//     transform: translateX(20%);
//   }
//   table {
//     width: 100%;
//     margin-bottom: 50px;
//   }
//   .mainHead {
//     font-size: 30px;
//   }
//   tr td {
//     padding: 10px 0;
//   }
//   .clinik {
//     height: 100px;
//     border: 1px solid #0000000f;
//     background-color: #004aad;
//   }
//   .boxes-container {
//     display: flex;
//     gap: 30px;
//     justify-content: center;
//     padding: 20px 10px;
//   }
//   .boxes {
//     width: 160px;
//     height: 100px;
//     background-color: #004aad;
//   }
//   .card {
//     background: #004aad;
//     height: 9.5rem;
//     border: none;
//     box-shadow: 1px 2px 8px black;
//     &:hover {
//       background: #264679;
//     }
//   }
//   .icon {
//     font-size: 40px;
//     color: white;
//   }
//   .card-body {
//     text-align: center;
//     padding: 5px;
//   }
//   .card-link {
//     text-decoration: none;
//     font-size: small;
//   }
//   .cardtext {
//     h5 {
//       color: white;
//     }
//     p {
//       color: white;
//     }
//   }
//   .report-date-column {
//     width: 30%;
//   }
//   .custom-cursor-pointer {
//     cursor: pointer;
//   }
//   .btn1 {
//     background-color: #213555;
//   }
// `;


// ================================================================================

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";
import { GiFrontTeeth, GiMoneyStack, GiTakeMyMoney } from "react-icons/gi";
import { SiMoneygram } from "react-icons/si";
import { MdOutlineNextWeek } from "react-icons/md";
import { useSelector } from "react-redux";

const ReportCardPage = () => {
  const user = useSelector((state) => state.user);
  const branch = useSelector((state) => state.branch);
  const [testCounts, setTestCounts] = useState({
    oral: 0,
    blood: 0,
    radiology: 0,
    doneTest: 0,
    pendingTest: 0,
  });

  useEffect(() => {
    const fetchTestCounts = async () => {
      try {
        const response = await axios.get(
         `https://dentalgurusuperadmin.doaguru.com/api/v1/super-admin/getPatientLabTest/${branch.name}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        if (response.status === 200) {
          const data = response.data;

           // Log the data to check its structure
           console.log("Fetched data:", data);
          
          // Count the reports based on lab_name and test_status
          const oralCount = data.filter((item) => item.lab_name === "oral").length;
          const bloodCount = data.filter((item) => item.lab_name === "pathology").length;
          const radiologyCount = data.filter((item) => item.lab_name === "radiology").length;
          const doneTestCount = data.filter((item) => item.test_status === "done").length;
          const pendingTestCount = data.filter((item) => item.test_status === "pending").length;

          // Update state with test counts
          setTestCounts({
            oral: oralCount,
            blood: bloodCount,
            radiology: radiologyCount,
            doneTest: doneTestCount,
            pendingTest: pendingTestCount,
          });
        } else {
          console.error("Failed to fetch test counts");
        }
      } catch (error) {
        console.error("Error fetching test counts:", error);
      }
    };

    fetchTestCounts();
  }, [branch.name]);

  console.log(testCounts);

  return (
    <Wrapper>
      <div className="d-flex justify-content-around mt-5">
        <ReportCard
          link="/OralTest"
          icon={<GiFrontTeeth />}
          title="Oral Report"
          count={testCounts.oral}
        />
        <ReportCard
          link="/BloodTest"
          icon={<SiMoneygram />}
          title="Pathology Report"
          count={testCounts.blood}
        />
        <ReportCard
          link="/RadiologyTest"
          icon={<MdOutlineNextWeek />}
          title="Radiology Report"
          count={testCounts.radiology}
        />
        <ReportCard
          link="/PendingTest"
          icon={<GiMoneyStack />}
          title="Pending Report"
          count={testCounts.pendingTest}
        />
        <ReportCard
          link="/Compleated"
          icon={<GiTakeMyMoney />}
          title="Done Report"
          count={testCounts.doneTest}
        />
      </div>
    </Wrapper>
  );
};

const ReportCard = ({ link, icon, title, count }) => (
  <div className="col-xxl-2 col-xl-2 col-lg-2 col-sm-8 col-8 col-md-2 my-3 p-0">
    <div className="card">
      <Link to={link} style={{ textDecoration: "none" }}>
        <div className="card-body d-flex justify-content-center flex-column mb-3">
          <div className="text-light fs-1">{icon}</div>
          <div className="cardtext">
            <h5 className="card-title text-light">{title}</h5>
            <p className="card-text">{count}</p>
          </div>
        </div>
      </Link>
    </div>
  </div>
);

const Wrapper = styled.div`
  .card {
    background: #004aad;
    height: 9.5rem;
    border: none;
    box-shadow: 1px 2px 8px black;
    &:hover {
      background: #264679;
    }
  }
  .icon {
    font-size: 40px;
    color: white;
  }
  .card-body {
    text-align: center;
    padding: 5px;
  }
  .card-link {
    text-decoration: none;
    font-size: small;
  }
  .cardtext {
    h5 {
      color: white;
    }
    p {
      color: white;
    }
  }
`;

export default ReportCardPage;


