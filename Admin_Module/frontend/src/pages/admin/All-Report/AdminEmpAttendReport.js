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

const AdminEmpAttendReport = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  console.log(user);
  const [attendRepo, setAttendRepo] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [daysInMonth, setDaysInMonth] = useState([]);
  const [monthName, setMonthName] = useState("");
  const [formattedDate, setFormattedDate] = useState("");
  const [fromDate, setFromDate] = useState("");
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
    try {
      const { data } = await axios.get(
        `https://dentalguruadmin.doaguru.com/api/v1/admin/getAttendanceDetails/${user.branch_name}`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      setAttendRepo(data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(daysInMonth);

  useEffect(() => {
    getAttendDetails();
  }, [user.branch_name]);

  const downloadAttendData = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `https://dentalguruadmin.doaguru.com/api/v1/admin/downloadAttendanceReportByTime/${user.branch_name}`,
        { fromDate, toDate },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log(data);
      // setSelectedEarn(data);
      if (Array.isArray(data) && data.length > 0) {
        // Create a new workbook
        const workbook = utils.book_new();

        // Convert the report data to worksheet format
        const worksheet = utils.json_to_sheet(data);

        utils.book_append_sheet(workbook, worksheet, `Attendance Report`);
        writeFile(workbook, `${fromDate} - ${toDate}-attendance-report.xlsx`);
        console.log(data);
      } else {
        cogoToast.error("Data not found");
        console.error("data is not an array");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const goBack = () => {
    window.history.go(-1);
  };

  console.log(daysInMonth);
  console.log(fromDate?.slice(0, 2));
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
              <div className="col-lg-11 col-11 ps-0" style={{marginTop:"4rem"}}>
                <div className="container-fluid mt-3">
                  <div className="d-flex justify-content-between">
                    {/* <BranchSelector /> */}
                  </div>
                </div>

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
                                  type="submit"
                                >
                                  Download Report
                                </button>
                              </div>
                            </form>
                          </div>
                          <div class="table-responsive">
                            <table class="table table-bordered">
                              <thead className="table-head">
                                <tr>
                                  <th>EMP ID</th>
                                  <th>Employee Name</th>
                                  <th>Dessignation</th>

                                  {daysInMonth
                                    ?.filter((item) => {
                                      const billDate = item; // Extracting the date part
                                      if (fromDate && toDate) {
                                        return (
                                          billDate >= fromDate?.slice(-2) &&
                                          billDate <= toDate?.slice(-2)
                                        );
                                      } else {
                                        return true; // If no date range is selected, show all items
                                      }
                                    })
                                    .map((day) => (
                                      <>
                                        <th key={day}>
                                          {day} {monthName}
                                        </th>
                                      </>
                                    ))}
                                </tr>
                              </thead>
                              <tbody>
                                {attendRepo.map((attendItem) => (
                                  <tr
                                    className="table-row"
                                    key={attendItem.employee_ID}
                                  >
                                    <td>{attendItem.employee_ID}</td>
                                    <td>{attendItem.emp_name}</td>
                                    <td>{attendItem.employee_designation}</td>
                                    {daysInMonth
                                      ?.filter((item) => {
                                        const billDate = item; // Extracting the date part
                                        if (fromDate && toDate) {
                                          return (
                                            billDate >= fromDate?.slice(-2) &&
                                            billDate <= toDate?.slice(-2)
                                          );
                                        } else {
                                          return true; // If no date range is selected, show all items
                                        }
                                      })
                                      .map((day) => {
                                        const attendanceForDay =
                                          attendRepo.find(
                                            (repoItem) =>
                                              repoItem.date?.split("T")[0] ===
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
                                                Login - $
                                                {attendanceForDay.allday_shift_login_time
                                                  ?.split(".")[0]
                                                  .slice(0, 5)}{" "}
                                                & Logout - $
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

export default AdminEmpAttendReport;
const Container = styled.div`
  .table {
    overflow-x: auto;
    th {
      background-color: #1abc9c;
      color: white;
      min-width: 7rem;
    }
    td {
      font-weight: bold;
      min-width: 7rem;
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
  .table-responsive{
    height: 30rem;
  }

`;
