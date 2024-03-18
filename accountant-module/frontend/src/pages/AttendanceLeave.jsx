import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

import { IoMdArrowRoundBack } from "react-icons/io";

import cogoToast from "cogo-toast";
import Header from "../components/Header";
import Sider from "../components/Sider";
import BranchDetails from "../components/BranchDetails";
import ApplyLeave from "../components/btModal/ApplyLeave";

const AttendanceLeave = () => {
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
        item.date.split("T")[0] === `${formattedDate.slice(0, 7)}-${day}`
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

  const goBack = () => {
    window.history.go(-1);
  };
  return (
    <>
      <Container>
        <Header />
        <div className="main">
          <div className="container-fluid">
            <div className="row flex-nowrap ">
              <div className="col-lg-1 col-1 p-0">
                <Sider />
              </div>
              <div className="col-lg-11 col-11 ps-0">
                <div className="container-fluid mt-3">
                  <div className="">
                    <BranchDetails />
                  </div>
                </div>

                <div className="container-fluid mt-3">
                  <button className="btn btn-success" onClick={goBack}>
                    <IoMdArrowRoundBack /> Back
                  </button>
                  <div className="container-fluid">
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

export default AttendanceLeave;
const Container = styled.div`
  .table {
    overflow-x: auto;
    th {
      background-color: #201658;
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
`;
