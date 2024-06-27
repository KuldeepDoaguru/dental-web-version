// import React, { useEffect, useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import styled from "styled-components";
// // import Sider from "../../../components/Sider";
// // import Header from "../../../components/Header";
// import { FaCircle } from "react-icons/fa";
// import { IoMdArrowRoundBack } from "react-icons/io";
// // import BranchSelector from "../../../components/BranchSelector";
// import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";
// import { utils, writeFile } from "xlsx";
// import cogoToast from "cogo-toast";
// import HeaderAdmin from "../HeaderAdmin";
// import SiderAdmin from "../SiderAdmin";
// import animationData from "../../animation/loading-effect.json";
// import Lottie from "react-lottie";

// const AdminEmpAttendReport = () => {
//   const location = useLocation();
//   const dispatch = useDispatch();
//   const user = useSelector((state) => state.user.currentUser);
//   console.log(user);
//   const [attendRepo, setAttendRepo] = useState([]);
//   const [currentDate, setCurrentDate] = useState(new Date());
//   const [daysInMonth, setDaysInMonth] = useState([]);
//   const [monthName, setMonthName] = useState("");
//   const [formattedDate, setFormattedDate] = useState("");
//   const [fromDate, setFromDate] = useState("");
//   const [toDate, setToDate] = useState("");
//   const [loading,setLoading] = useState("");

//   const generateDaysInMonth = (fromDate, toDate) => {
//     const currentDate = new Date();
//     const year = currentDate.getFullYear();
//     const month = currentDate.getMonth();
//     const daysInMonth = new Date(year, month + 1, 0).getDate();
//     const daysArray = Array.from({ length: daysInMonth }, (_, i) => {
//       const dayNumber = i + 1;
//       return dayNumber < 10 ? `0${dayNumber}` : `${dayNumber}`;
//     });
//     const monthName = new Intl.DateTimeFormat("en-US", {
//       month: "long",
//     }).format(currentDate);

//     const formattedDate = currentDate.toISOString()?.split("T")[0];
//     setFormattedDate(formattedDate);

//     if (fromDate && toDate) {
//       const fromDateMidnight = new Date(fromDate);
//       fromDateMidnight.setHours(0, 0, 0, 0);

//       const toDateMidnight = new Date(toDate);
//       toDateMidnight.setHours(0, 0, 0, 0);

//       const filteredDaysArray = daysArray.filter((day) => {
//         const date = new Date(year, month, parseInt(day, 10));
//         return date >= fromDateMidnight && date <= toDateMidnight;
//       });
//       setDaysInMonth(filteredDaysArray);
//     } else {
//       setDaysInMonth(daysArray);
//     }

//     setMonthName(monthName);
//   };

//   useEffect(() => {
//     generateDaysInMonth(fromDate, toDate);
//   }, [fromDate, toDate]);

//   useEffect(() => {
//     generateDaysInMonth();
//   }, [currentDate]);

//   console.log(attendRepo);

//   console.log(formattedDate.slice(0, 7));
//   console.log(attendRepo[0]?.date);
//   console.log(`${formattedDate.slice(0, 7)}-${daysInMonth[0]}`);
//   const filter = daysInMonth.map((day) => {
//     return attendRepo.find(
//       (item) =>
//         item.date?.split("T")[0] === `${formattedDate.slice(0, 7)}-${day}`
//     );
//   });

//   console.log(filter[5]?.login);
//   console.log(attendRepo[0]?.date?.split("T")[0] >= fromDate);
//   console.log(toDate);
//   const fitlerByDuration = attendRepo?.filter((item) => {
//     return (
//       item.date?.split("T")[0] >= fromDate && item.date?.split("T")[0] <= toDate
//     );
//   });

//   console.log(fitlerByDuration);

//   const getAttendDetails = async () => {
//     setLoading(true);
//     try {
//       const { data } = await axios.get(
//         `https://dentalguruadmin.doaguru.com/api/v1/admin/getAttendanceDetails/${user.branch_name}`,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${user.token}`,
//           },
//         }
//       );
//       setLoading(false);
//       setAttendRepo(data);
//     } catch (error) {
//       setLoading(false);
//       console.log(error);
//     }
//   };

//   console.log(daysInMonth);

//   useEffect(() => {
//     getAttendDetails();
//   }, [user.branch_name]);

//   const downloadAttendData = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await axios.post(
//         `https://dentalguruadmin.doaguru.com/api/v1/admin/downloadAttendanceReportByTime/${user.branch_name}`,
//         { fromDate, toDate },
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${user.token}`,
//           },
//         }
//       );
//       console.log(data);
//       // setSelectedEarn(data);
//       if (Array.isArray(data) && data.length > 0) {
//         // Create a new workbook
//         const workbook = utils.book_new();

//         // Convert the report data to worksheet format
//         const worksheet = utils.json_to_sheet(data);

//         utils.book_append_sheet(workbook, worksheet, `Attendance Report`);
//         writeFile(workbook, `${fromDate} - ${toDate}-attendance-report.xlsx`);
//         console.log(data);
//       } else {
//         cogoToast.error("Data not found");
//         console.error("data is not an array");
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const goBack = () => {
//     window.history.go(-1);
//   };
//   const defaultOptions = {
//     loop: true,
//     autoplay: true,
//     animationData: animationData,
//     rendererSettings: {
//       preserveAspectRatio: "xMidYMid slice",
//     },
//   };


//   console.log(daysInMonth);
//   console.log(fromDate?.slice(0, 2));
//   return (
//     <>
//       <Container>
//         <HeaderAdmin />
//         <div className="main">
//           <div className="container-fluid">
//             <div className="row flex-nowrap ">
//               <div className="col-lg-1 col-1 p-0">
//                 <SiderAdmin />
//               </div>
//               <div className="col-lg-11 col-11 ps-0" style={{marginTop:"4rem"}}>
//                 <div className="container-fluid mt-3">
//                   <div className="d-flex justify-content-between">
//                     {/* <BranchSelector /> */}
//                   </div>
//                 </div>

//                 <div className="container-fluid mt-3">
//                   <div className="container-fluid">
//                   <button className="btn btn-success" onClick={goBack}>
//                     <IoMdArrowRoundBack /> Back
//                   </button>
//                     <div className="row mt-3">
//                       {/* <div className="col-1"></div> */}

//                       <div className="col-12">
//                         <nav class="navbar navbar-expand-lg bg-body-tertiary">
//                           <div class="container d-flex justify-content-center">
//                             <h2 className="">
//                               Employee Attendance and Time Sheet
//                             </h2>
//                           </div>
//                         </nav>
//                       </div>
//                       <div className="container-fluid">
//                         <div className="container-fluid">
//                           <div className="d-flex justify-content-between mb-2 mt-4">
//                             <form onSubmit={downloadAttendData}>
//                               <div className="d-flex justify-content-between">
//                                 <div>
//                                   <input
//                                     type="date"
//                                     name=""
//                                     id=""
//                                     className="p-2 rounded"
//                                     onChange={(e) =>
//                                       setFromDate(e.target.value)
//                                     }
//                                   />
//                                 </div>
//                                 <div className="mx-2">To</div>
//                                 <div>
//                                   <input
//                                     type="date"
//                                     name=""
//                                     id=""
//                                     className="p-2 rounded"
//                                     onChange={(e) => setToDate(e.target.value)}
//                                   />
//                                 </div>
//                                 <button
//                                   className="btn btn-warning mx-2"
//                                   type="submit"
//                                 >
//                                   Download Report
//                                 </button>
//                               </div>
//                             </form>
//                           </div>
//                           {loading ? (
//             <Lottie options={defaultOptions} height={300} width={400}></Lottie>
//           ) : (
//             <>
//                           <div class="table-responsive">
//                             <table class="table table-bordered">
//                               <thead className="table-head">
//                                 <tr>
//                                   <th>EMP ID</th>
//                                   <th>Employee Name</th>
//                                   <th>Dessignation</th>

//                                   {daysInMonth
//                                     ?.filter((item) => {
//                                       const billDate = item; // Extracting the date part
//                                       if (fromDate && toDate) {
//                                         return (
//                                           billDate >= fromDate?.slice(-2) &&
//                                           billDate <= toDate?.slice(-2)
//                                         );
//                                       } else {
//                                         return true; // If no date range is selected, show all items
//                                       }
//                                     })
//                                     .map((day) => (
//                                       <>
//                                         <th key={day}>
//                                           {day} {monthName}
//                                         </th>
//                                       </>
//                                     ))}
//                                 </tr>
//                               </thead>
//                               <tbody>
//                                 {attendRepo.map((attendItem) => (
//                                   <tr
//                                     className="table-row"
//                                     key={attendItem.employee_ID}
//                                   >
//                                     <td>{attendItem.employee_ID}</td>
//                                     <td>{attendItem.emp_name}</td>
//                                     <td>{attendItem.employee_designation}</td>
//                                     {daysInMonth
//                                       ?.filter((item) => {
//                                         const billDate = item; // Extracting the date part
//                                         if (fromDate && toDate) {
//                                           return (
//                                             billDate >= fromDate?.slice(-2) &&
//                                             billDate <= toDate?.slice(-2)
//                                           );
//                                         } else {
//                                           return true; // If no date range is selected, show all items
//                                         }
//                                       })
//                                       .map((day) => {
//                                         const attendanceForDay =
//                                           attendRepo.find(
//                                             (repoItem) =>
//                                               repoItem.date?.split("T")[0] ===
//                                                 `${formattedDate.slice(
//                                                   0,
//                                                   7
//                                                 )}-${day}` &&
//                                               repoItem.employee_ID ===
//                                                 attendItem.employee_ID
//                                           );

//                                         return (
//                                           <td key={day}>
//                                             {attendanceForDay ? (
//                                               <span
//                                                 className={
//                                                   attendanceForDay.status ===
//                                                   "approved"
//                                                     ? "attend-approve"
//                                                     : "attend-reject"
//                                                 }
//                                               >
//                                                 Login - $
//                                                 {attendanceForDay.allday_shift_login_time
//                                                   ?.split(".")[0]
//                                                   .slice(0, 5)}{" "}
//                                                 & Logout - $
//                                                 {attendanceForDay.allday_shift_logout_time
//                                                   ?.split(".")[0]
//                                                   .slice(0, 5)}
//                                               </span>
//                                             ) : (
//                                               "-"
//                                             )}
//                                           </td>
//                                         );
//                                       })}
//                                   </tr>
//                                 ))}
//                               </tbody>
//                             </table>
//                           </div>
//                           </>
//   )}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </Container>
//     </>
//   );
// };

// export default AdminEmpAttendReport;
// const Container = styled.div`
//   .table {
//     overflow-x: auto;
//     th {
//       background-color: #1abc9c;
//       color: white;
//       min-width: 7rem;
//       white-space: nowrap;
//     }
//     td {
//       font-weight: bold;
//       min-width: 7rem;
//       white-space: nowrap;
//     }
//   }
//   .table::-webkit-scrollbar {
//     width: 0;
//   }

//   .select-style {
//     border: none;
//     background-color: #22a6b3;
//     font-weight: bold;
//     color: white;
//   }

//   .attend-reject {
//     color: red;
//   }

//   .attend-approve {
//     color: green;
//   }
//   .table-responsive{
//     height: 30rem;
//   }

// `;


import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
// import Sider from "../../../components/Sider";
// import Header from "../../../components/Header";
import { FaCircle } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
// import BranchSelector from "../../../components/BranchSelector";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { utils, writeFile } from "xlsx";
import cogoToast from "cogo-toast";
import HeaderAdmin from "../HeaderAdmin";
import SiderAdmin from "../SiderAdmin";
import animationData from "../../animation/loading-effect.json";
import Lottie from "react-lottie";

const EmpAttendanceRepo = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  
  const branch = user.branch_name;
 
  const [attendRepo, setAttendRepo] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [daysInMonth, setDaysInMonth] = useState([]);
  const [monthName, setMonthName] = useState("");
  const [formattedDate, setFormattedDate] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [toDate, setToDate] = useState("");

  const generateDaysInMonth = (fromDate, toDate) => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysArray = Array.from({ length: daysInMonth }, (_, i) => {
      const dayNumber = i + 1;
      return dayNumber < 10 ? `0${dayNumber}` : `${dayNumber}`;
    });
    const monthName = new Intl.DateTimeFormat("en-US", {
      month: "long",
    }).format(currentDate);

    const formattedDate = currentDate.toISOString()?.split("T")[0];
    setFormattedDate(formattedDate);

    if (fromDate && toDate) {
      // Set time component of fromDate and toDate to midnight
      const fromDateMidnight = new Date(fromDate);
      fromDateMidnight.setHours(0, 0, 0, 0);

      const toDateMidnight = new Date(toDate);
      toDateMidnight.setHours(0, 0, 0, 0);

      const filteredDaysArray = daysArray.filter((day) => {
        const date = new Date(year, month, parseInt(day, 10));
        return date >= fromDateMidnight && date <= toDateMidnight;
      });
      setDaysInMonth(filteredDaysArray);
    } else {
      setDaysInMonth(daysArray);
    }

    setMonthName(monthName);
  };

  useEffect(() => {
    generateDaysInMonth(fromDate, toDate);
  }, [fromDate, toDate]);

  useEffect(() => {
    generateDaysInMonth();
  }, [currentDate]);

  console.log(attendRepo);

  console.log(formattedDate.slice(0, 7));
  console.log(attendRepo[0]?.date);
  console.log(`${formattedDate.slice(0, 7)}-${daysInMonth[0]}`);
  const filter = daysInMonth.map((day) => {
    return attendRepo.find(
      (item) =>
        item.date?.split("T")[0] === `${formattedDate.slice(0, 7)}-${day}`
    );
  });

  console.log(filter[5]?.login);
  console.log(attendRepo[0]?.date?.split("T")[0] >= fromDate);
  console.log(toDate);
  const fitlerByDuration = attendRepo?.filter((item) => {
    return (
      item.date?.split("T")[0] >= fromDate && item.date?.split("T")[0] <= toDate
    );
  });

  console.log(fitlerByDuration);

  const getAttendDetails = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `https://dentalguruadmin.doaguru.com/api/v1/admin/getAttendanceDetails/${branch}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setLoading(false);
      setAttendRepo(data);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  console.log(daysInMonth);

  useEffect(() => {
    getAttendDetails();
  }, [branch]);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const downloadAttendData = async (e) => {
    e.preventDefault();
    try {
      const fromDateFormatted = new Date(fromDate).toISOString().split("T")[0];
      const toDateFormatted = new Date(toDate).toISOString().split("T")[0];

      const { data } = await axios.post(
        `https://dentalguruadmin.doaguru.com/api/v1/admin/downloadAttendanceReportByTime/${branch}`,
        { fromDate: fromDateFormatted, toDate: toDateFormatted },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      console.log("API Response:", data); // Log the response

      if (Array.isArray(data) && data.length > 0) {
        const workbook = utils.book_new();
        const worksheet = utils.json_to_sheet(data);

        utils.book_append_sheet(workbook, worksheet, "Attendance Report");
        writeFile(
          workbook,
          `${fromDateFormatted} - ${toDateFormatted}-attendance-report.xlsx`
        );
      } else {
        cogoToast.error("No data found for the specified date range.");
        console.error("Data is not an array or is empty.");
      }
    } catch (error) {
      cogoToast.error("An error occurred while downloading the report.");
      console.error(error);
    }
  };

  console.log(attendRepo);
  console.log(daysInMonth[0]);
  console.log(fromDate?.slice(-2));

  const uniqueEntries = Object.values(
    attendRepo.reduce((acc, item) => {
      acc[item.employee_ID] = acc[item.employee_ID] || item;
      return acc;
    }, {})
  );

  console.log(uniqueEntries);

  const goBack = () => {
    window.history.go(-1);
  };

  const exportToExcel = () => {
    const csvRows = [];
    const table = document.querySelector(".table");

    if (!table) {
      console.error("Table element not found");
      return;
    }

    table.querySelectorAll("tr").forEach((row) => {
      const rowData = [];
      row.querySelectorAll("td, th").forEach((cell) => {
        rowData.push(cell.innerText);
      });
      csvRows.push(rowData.join(","));
    });

    const csvContent = csvRows.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "attendance_report.csv";
    link.click();
    window.URL.revokeObjectURL(link.href);
  };

  return (
    <>
      <Container>
        <HeaderAdmin />
        <div className="main">
          <div className="container-fluid">
            <div className="row flex-nowrap ">
              <div className="col-lg-1 col-1 p-0">
                <SiderAdmin />
              </div>
              <div className="col-lg-11 col-11 ps-0" style={{marginTop:"5rem"}}>
                {/* <div className="container-fluid mt-3">
                  <div className="d-flex justify-content-between">
                    <BranchSelector />
                  </div>
                </div> */}

                <div className="container-fluid mt-3">
                  <button className="btn btn-success" onClick={goBack}>
                    <IoMdArrowRoundBack /> Back
                  </button>
                  <div className="container-fluid">
                    <div className="row mt-3">
                      {/* <div className="col-1"></div> */}

                      <div className="col-12">
                        <nav class="navbar navbar-expand-lg bg-body-tertiary">
                          <div class="container d-flex justify-content-center">
                            <h2 className="">
                              Employee Attendance and Time Sheet
                            </h2>
                          </div>
                        </nav>
                      </div>
                      <div className="container-fluid">
                        <div className="container-fluid">
                          <div className="d-flex justify-content-between mb-2 mt-4">
                            <form onSubmit={downloadAttendData}>
                              <div className="d-flex justify-content-between">
                                <div>
                                  <input
                                    type="date"
                                    name=""
                                    id=""
                                    className="p-2 rounded"
                                    onChange={(e) =>
                                      setFromDate(e.target.value)
                                    }
                                  />
                                </div>
                                <div className="mx-2">To</div>
                                <div>
                                  <input
                                    type="date"
                                    name=""
                                    id=""
                                    className="p-2 rounded"
                                    onChange={(e) => setToDate(e.target.value)}
                                  />
                                </div>
                                <button
                                  className="btn btn-warning mx-2"
                                  type="button"
                                  onClick={exportToExcel}
                                >
                                  Download Report
                                </button>
                              </div>
                            </form>
                          </div>
                          {loading ? (
                            <Lottie
                              options={defaultOptions}
                              height={300}
                              width={400}
                              style={{ background: "transparent" }}
                            ></Lottie>
                          ) : (
                            <>
                              <div class="table-responsive">
                                <table class="table table-bordered">
                                  <thead className="table-head">
                                    <tr>
                                    <th className="sticky-col">EMP ID</th>
                                      <th className="sticky-col">
                                        Employee Name
                                      </th>
                                      <th className="sticky-col">
                                        Dessignation
                                      </th>


                                      {daysInMonth
                                        ?.filter((item) => {
                                          const billDate = item;
                                          if (fromDate && toDate) {
                                            return (
                                              billDate >= fromDate?.slice(-2) &&
                                              billDate <= toDate?.slice(-2)
                                            );
                                          } else {
                                            return true;
                                          }
                                        })
                                        .map((day) => (
                                          <>
                                            <th key={day} className="sticky">
                                              {day} {monthName}
                                            </th>
                                          </>
                                        ))}
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {uniqueEntries.map((attendItem) => (
                                      <tr
                                        className="table-row"
                                        key={attendItem.employee_ID}
                                      >
                                          <td className="sticky-col">
                                          {attendItem.employee_ID}
                                        </td>
                                        <td className="sticky-col">
                                          {attendItem.emp_name}
                                        </td>
                                        <td className="sticky-col">
                                          {attendItem.employee_designation}
                                        </td>
                                        {daysInMonth
                                          ?.filter((item) => {
                                            const billDate = item;
                                            if (fromDate && toDate) {
                                              return (
                                                billDate >=
                                                  fromDate?.slice(-2) &&
                                                billDate <= toDate?.slice(-2)
                                              );
                                            } else {
                                              return true;
                                            }
                                          })
                                          .map((day) => {
                                            const attendanceForDay =
                                              attendRepo.find(
                                                (repoItem) =>
                                                  repoItem.date?.split(
                                                    "T"
                                                  )[0] ===
                                                    `${formattedDate.slice(
                                                      0,
                                                      7
                                                    )}-${day}` &&
                                                  repoItem.employee_ID ===
                                                    attendItem.employee_ID
                                              );

                                            return (
                                              <td key={day}>
                                                {attendanceForDay ? (
                                                  <span
                                                    className={
                                                      attendanceForDay.status ===
                                                      "approved"
                                                        ? "attend-approve"
                                                        : "attend-reject"
                                                    }
                                                  >
                                                    Login -
                                                    {attendanceForDay.allday_shift_login_time
                                                      ?.split(".")[0]
                                                      .slice(0, 5)}{" "}
                                                    & Logout -
                                                    {attendanceForDay.allday_shift_logout_time
                                                      ?.split(".")[0]
                                                      .slice(0, 5)}
                                                  </span>
                                                ) : (
                                                  "-"
                                                )}
                                              </td>
                                            );
                                          })}
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default EmpAttendanceRepo;
const Container = styled.div`
     .table {
     overflow-x: auto;
     th {
       background-color: #1abc9c;
       color: white;
       min-width: 7rem;
       white-space: nowrap;
     }
     td {
       font-weight: bold;
      min-width: 7rem;
      white-space: nowrap;
    }
  }
  .table::-webkit-scrollbar {
    width: 0;
  } 
  .select-style {
    border: none;
    background-color: #22a6b3;
    font-weight: bold;
    color: white;
  }

  .attend-reject {
    color: red;
  }

  .attend-approve {
    color: green;
  }

  .table-responsive {
    height: 30rem;
  }

  .sticky {
    position: sticky;
    top: 0;
    color: white;
    z-index: 1;
  }


  .sticky-col {
    position: -webkit-sticky; /* for Safari */
    position: sticky;
    left: 0;
    background-color: white;
    z-index: 1;
  }

  .sticky-col:nth-child(2) {
    left: 100px; /* Adjust based on your first column width */
  }

  .sticky-col:nth-child(3) {
    left: 240px; /* Adjust based on your first and second column widths */
  }

  .table-head .sticky-col {
    z-index: 2;
  }
`;
