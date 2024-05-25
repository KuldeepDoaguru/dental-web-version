import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

import { IoMdArrowRoundBack } from "react-icons/io";

import cogoToast from "cogo-toast";
import axios from "axios";
import moment from "moment";
import { useSelector } from "react-redux";
// import MarkAttendance from "./MarkAttendance";
import ApplyLeave from "../../components/Attendance/ApplyLeave";
import MarkAttendance from "../../components/Attendance/MarkAttendance";
import HeadBar from "../../components/Doctor/HeadBar";
import Sider from "../../components/Doctor/SideBar";
// import ApplyLeave from "./ApplyLeave";

const AttendanceLeave = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.currentUser);
  const { refreshTable } = useSelector((state) => state.user);
  console.log(
    `User Name: ${user.name}, User ID: ${user.id}, branch: ${user.branch}`
  );
  console.log("User State:", user);
  const token = user.token;
  const branch = user.branch_name;
  const employeeName = user.employee_name;
  const employeeId = user.employee_ID;

  console.log(branch, employeeId);
  const [attendRepo, setAttendRepo] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [daysInMonth, setDaysInMonth] = useState([]);
  const [monthName, setMonthName] = useState("");
  const [formattedDate, setFormattedDate] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [leavesData, setLeaveData] = useState([]);

  const [Attendance, setAttendance] = useState([]);

  console.log(token);
  const getAttendance = async () => {
    try {
      const { data } = await axios.get(
        `https://dentalgurudoctor.doaguru.com/api/doctor/getAttendancebyempId/${branch}/${employeeId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAttendance(data?.data);
      console.log(data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(Attendance);

  useEffect(() => {
    getAttendance();
  }, [refreshTable]);

  const getLeaves = async () => {
    try {
      const { data } = await axios.get(
        `https://dentalgurudoctor.doaguru.com/api/doctor/get-leaves/${branch}/${employeeId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLeaveData(data?.data);
      console.log(data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLeaves();
  }, [refreshTable]);

  const generateDaysInMonth = (fromDate, toDate) => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysArray = Array.from({ length: daysInMonth }, (_, i) => {
      const dayNumber = i + 1;
      return dayNumber < 10 ? `0${dayNumber}` : { dayNumber };
    });
    const monthName = new Intl.DateTimeFormat("en-US", {
      month: "long",
    }).format(currentDate);

    const formattedDate = currentDate.toISOString().split("T")[0];
    setFormattedDate(formattedDate);

    if (fromDate && toDate) {
      const filteredDaysArray = daysArray.filter((day) => {
        const date = new Date(year, month, parseInt(day, 10));
        return date >= new Date(fromDate) && date <= new Date(toDate);
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
        item.date.split("T")[0] === `${formattedDate.slice(0, 7)}` - `${day}`
    );
  });

  console.log(filter[5]?.login);
  console.log(attendRepo[0]?.date.split("T")[0] >= fromDate);
  console.log(toDate);
  const fitlerByDuration = attendRepo?.filter((item) => {
    return (
      item.date.split("T")[0] >= fromDate && item.date.split("T")[0] <= toDate
    );
  });

  console.log(fitlerByDuration);

  const goBack = (event) => {
    event.preventDefault(); // Prevent default action to avoid page refresh
    navigate(-1); // This goes back to the previous page
  };

  // Helper function to format a single date string in the desired format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-GB", options);
  };
  return (
    <>
      <Container>
        <HeadBar />
        <div className="main">
          <div className="container-fluid">
            <div className="row flex-nowrap ">
              <div className="col-lg-1 col-1 p-0">{<Sider />}</div>
              <div className="col-lg-11 col-11 ps-0">
                <div className="container-fluid mt-3">
                  <div className="">{/* <BranchDetails /> */}</div>
                </div>

                <div className="container-fluid mt-3">
                  <div className="row d-flex justify-content-between">
                    <div className="col-3">
                      <button className="btn btn-success" onClick={goBack}>
                        <IoMdArrowRoundBack /> Back
                      </button>
                    </div>
                    <div className="col-9">
                      <MarkAttendance />
                    </div>
                  </div>

                  <div className="container-fluid">
                    <div className="row mt-3">
                      <div className="col-12">
                        <div class="bg-body-tertiary p-3">
                          <div className="row">
                            <div class="col-xxl-10 col-xl-10 col-md-10 col-sm-10 col-10 container d-flex justify-content-center">
                              <h2 className="">Attendance and Leave Details</h2>
                            </div>
                            <div className="col-xxl-2 col-xl-2 col-md-2 col-sm-2 col-2">
                              <ApplyLeave />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="container-fluid">
                        <div className="container-fluid">
                          <div className="d-flex justify-content-between mb-2 mt-4"></div>

                          <div className="mt-5">
                            <div className="mt-5 text-center">
                              <h4>Attendance details</h4>
                            </div>
                            <div className="table-container all-attent">
                              <table className="table table-bordered">
                                <thead className="table-head">
                                  <tr>
                                    <th className="sticky">Sr. no.</th>
                                    <th className="sticky">Date</th>
                                    <th className="sticky">Login Time</th>
                                    <th className="sticky">Logout Time</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {Attendance?.map((item, index) => {
                                    return (
                                      <tr
                                        className="table-row"
                                        key={item?.attendance_id}
                                      >
                                        <td>{index + 1}</td>
                                        <td>
                                          {item?.date
                                            ? moment(item?.date).format(
                                                "DD/MM/YYYY"
                                              )
                                            : ""}{" "}
                                        </td>
                                        <td>
                                          {item?.allday_shift_login_time
                                            ? moment(
                                                item?.allday_shift_login_time,
                                                "HH:mm:ss.SSSSSS"
                                              ).format("hh:mm A")
                                            : ""}{" "}
                                        </td>
                                        <td>
                                          {" "}
                                          {item?.allday_shift_logout_time
                                            ? moment(
                                                item?.allday_shift_logout_time,
                                                "HH:mm:ss.SSSSSS"
                                              ).format("hh:mm A")
                                            : ""}
                                        </td>
                                      </tr>
                                    );
                                  })}
                                </tbody>
                              </table>
                            </div>
                          </div>

                          <div className="mt-5">
                            <div className="mt-5 text-center">
                              <h4>Leave details</h4>
                            </div>
                            <div className="table-container all-appoint">
                              <table className="table table-bordered">
                                <thead className="table-head">
                                  <tr>
                                    <th className="sticky">Sr. no.</th>
                                    <th className="sticky">Leave Date</th>
                                    <th className="sticky">Leave Reason</th>
                                    <th className="sticky">Leave Status</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {leavesData?.map((item, index) => {
                                    // Split the leave_dates string into an array of date strings
                                    const leaveDatesArray =
                                      item?.leave_dates.split(",");

                                    // Format each date in the array using the formatDate function
                                    const formattedLeaveDates = leaveDatesArray
                                      .map((dateString) =>
                                        formatDate(dateString)
                                      )
                                      .join(", "); // Join the formatted dates back into a single string
                                    return (
                                      <tr className="table-row" key={item.id}>
                                        <td>{index + 1}</td>
                                        <td>{formattedLeaveDates}</td>
                                        <td>{item.leave_reason}</td>
                                        <td>{item.leave_status}</td>
                                      </tr>
                                    );
                                  })}
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
            {/* <div className="container-fluid">
                    <div className="row mt-3">
                      <div className="col-12">
                        <nav class="navbar navbar-expand-lg bg-body-tertiary">
                          <div class="container d-flex justify-content-center">
                            <h2 className="">Attendance and Leave Details</h2>
                          </div>
                        </nav>
                      </div>
                      <div className="container-fluid">
                        <div className="container-fluid">
                          <div className="d-flex justify-content-between mb-2 mt-4">
                            <form>
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
                            <div>
                              <ApplyLeave />
                            </div>
                          </div>
                          <div class="table-responsive">
                            <table class="table table-bordered"> 
                              <thead className="table-head">
                                <tr>
                                  <th>EMP ID</th>
                                  <th>Employee Name</th>
                                  <th>Dessignation</th>

                                  {daysInMonth.map((day) => (
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
                                    {daysInMonth.map((day) => {
                                      const attendanceForDay = attendRepo.find(
                                        (repoItem) =>
                                          repoItem.date.split("T")[0] ===
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
                                              {attendanceForDay.login
                                                .split(".")[0]
                                                .slice(0, 5)}{" "}
                                              & Logout - $
                                              {attendanceForDay.logout
                                                .split(".")[0]
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
                  </div> */}
          </div>
        </div>
      </Container>
    </>
  );
};

export default AttendanceLeave;
const Container = styled.div`
  .table {
    overflow-x: auto;
    th {
      background-color: #0dcaf0;
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
  .all-attent {
    height: 20rem;
    overflow: auto;
  }

  .all-appoint {
    height: 30rem;
    overflow: auto;
  }

  .sticky {
    position: sticky;
    top: 0;
    z-index: 1;
  }
`;
