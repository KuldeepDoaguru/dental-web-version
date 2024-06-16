

import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

import { IoMdArrowRoundBack } from "react-icons/io";
import { useDispatch ,useSelector} from "react-redux";

import axios from "axios";
import moment from "moment";

import cogoToast from "cogo-toast";

// import BranchDetails from "../components/BranchDetails";
// import ApplyLeave from "../components/btModal/ApplyLeave";

import { useNavigate } from 'react-router-dom';


import MarkAttendance from "./MarkAttendance";
import ApplyLeave from "./ApplyLeave";
import { IoArrowBackSharp } from "react-icons/io5";
import HeaderAdmin from "./HeaderAdmin";
import SiderAdmin from "./SiderAdmin";

const AttendanceLeave = () => {
    const navigate = useNavigate();
     const currentUser = useSelector((state) => state.user.currentUser);
    const  branch = currentUser.branch_name;
    const employeeName = currentUser.employee_name;
    const employeeId = currentUser.employee_ID;
  const [attendRepo, setAttendRepo] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [daysInMonth, setDaysInMonth] = useState([]);
  const [monthName, setMonthName] = useState("");
  const [formattedDate, setFormattedDate] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [leavesData,setLeaveData] = useState([]);
  const [loading , setLoading] = useState(false);


  const [Attendance, setAttendance] = useState([]);
 

  
  const token = currentUser?.token;


  const getAttendance = async () => {
     
    try{
        const response = await axios.get(`https://dentalguruadmin.doaguru.com/api/v1/admin/getAttendancebyempId/${branch}/${employeeId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }});
        setAttendance(response?.data?.data)
      }
      catch(error){
        console.log(error)
      }
  }
  
 useEffect(() => {
  
   // Set up interval to fetch data every X seconds
   const interval = setInterval(() => {
    getAttendance();
  }, 3000); // Fetch data every 5 seconds (adjust as needed)

  // Clear interval on component unmount
  return () => clearInterval(interval);
  },[])

  const getLeaves = async () => {
     
    try{
        const response = await axios.get(`https://dentalguruadmin.doaguru.com/api/v1/admin/get-leaves/${branch}/${employeeId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }});
        setLeaveData(response?.data?.data)
        console.log(leavesData);
      }
      catch(error){
        console.log(error)
      }
  }

  useEffect(()=>{
   
     // Set up interval to fetch data every X seconds
     const interval = setInterval(() => {
       getLeaves(); 
      }, 3000); // Fetch data every 5 seconds (adjust as needed)
  
      // Clear interval on component unmount
      return () => clearInterval(interval);
  },[])






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

// Helper function to format a single date string in the desired format
const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-GB", options);
};
  return (
    <>
      <Container>
      <div className='header'>
          <HeaderAdmin/>
          </div>
    
    <div className="row mrgnzero">
      <div className="col-lg-1 col-md-1 col-1" id="sider">
        <SiderAdmin />
      </div>
              <div className="col-lg-11 col-md-11 col-11" id="set" style={{marginTop:"5rem"}}>
                <div className="container-fluid mt-3">
                  <div className="">
                    {/* <BranchDetails /> */}
                  </div>
                </div>

                <div className="container-fluid" >
                  <div className="row d-flex justify-content-between">
                    <div className="col-lg-3">
                  <div className="fs-1 text-black d-print-none mx-2" onClick={goBack} style={{ cursor: "pointer" }}>
                    <IoArrowBackSharp />
                  </div>
                  </div>
                  <div className="col-lg-9 text-end">
                  <MarkAttendance/>
                  </div>
                
                 
                 
                  </div>
                 
                  <div className="container-fluid">
                    <div className="row mt-3">
                      <div className="col-12">
                        <nav class="navbar navbar-expand-lg bg-body-tertiary">
                          <div class="container d-flex justify-content-center main">
                            <h2 className="">Attendance and Leave Details</h2>
                          </div>
                          <div className="btnn">
                          <ApplyLeave/>
                          </div>
                        </nav>
                      </div>
                      <div className="container-fluid">
                        <div className="container-fluid">
                          <div className="d-flex justify-content-between mb-2 mt-4">
                            {/* <form>
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
                            </form> */}
                            
                           
                          </div>
                          {/* <div class="table-responsive">
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
                          </div> */}
                          
                           
                           <div className="mt-5">
                            <div className="mt-5 text-center">
                             <h4>Attendance details</h4>
                            </div>
                          <div className="table-container">
                            <table className="table table-bordered">
                              <thead className="table-head">
                                <tr>
                                  <th>Sr. no.</th>
                                  <th>Date</th>
                                  <th>Login Time</th>
                                  <th>Logout Time</th>
                                </tr>
                              </thead>
                              <tbody>
                                {Attendance?.map((item,index) => {

                        
                                
                                    return(
                                        <tr
                                        className="table-row"
                                        key={item?.attendance_id}
                                      >
                                        <td>{index+1}</td>
                                        <td>{item?.date ? moment(item?.date).format('DD/MM/YYYY') : ""} </td>
                                        <td>{item?.allday_shift_login_time ? moment(item?.allday_shift_login_time, 'HH:mm:ss.SSSSSS').format('hh:mm A') : ""} </td>
                                        <td> {item?.allday_shift_logout_time ? moment(item?.allday_shift_logout_time, 'HH:mm:ss.SSSSSS').format('hh:mm A') : ""}</td>
                                       
                                      </tr>
                                    )
                                  
                        })}
                              </tbody>
                            </table>
                          </div>
                          </div>
                          
                          <div className="mt-5">
                            <div className="mt-5 text-center">
                             <h4>Leave details</h4>
                            </div>
                          <div className="table-container">
                            <table className="table table-bordered">
                              <thead className="table-head">
                                <tr>
                                  <th>Sr. no.</th>
                                  <th>Leave Date</th>
                                  <th>Leave Reason</th>
                                  <th>Leave Status</th>
                                  <th>Created At</th>
                                </tr>
                              </thead>
                              <tbody>
                                {leavesData?.map((item,index) => {

                                    // Split the leave_dates string into an array of date strings
                            const leaveDatesArray = item?.leave_dates.split(",");

                            // Format each date in the array using the formatDate function
                            const formattedLeaveDates = leaveDatesArray
                                .map((dateString) => formatDate(dateString))
                                .join(", "); // Join the formatted dates back into a single string
                                    return(
                                        <tr
                                        className="table-row"
                                        key={item?.id}
                                      >
                                        <td>{index+1}</td>
                                        <td>{formattedLeaveDates}</td>
                                        <td>{item?.leave_reason}</td>
                                        <td>{item?.leave_status}</td>
                                        <td>{item?.created_at ? moment(item?.created_at.split("T")[0]).format('DD/MM/YYYY') : ""} </td>
                                       
                                      </tr>
                                    )
                                  
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
         
      </Container>
    </>
  );
};

export default AttendanceLeave;
const Container = styled.div`
  .table-container {
  max-height: 400px;
  overflow-y: auto;
  
}
.table-head{
  position: sticky;
  top: 0;
  z-index: 1; /* Ensure the header stays on top of the table body */
  padding-bottom: 20px;

}

  .table {
    overflow-x: auto;
    th {
      background-color:#1abc9c;
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
  .table tbody {
  padding-top: 40px; /* Adjust based on the height of the table header */
}
  .select-style {
    border: none;
    background-color:#1abc9c;
    font-weight: bold;
    color: white;
  }

  .attend-reject {
    color: red;
  }

  .attend-approve {
    color: green;
  }
  .mrgnzero {
    margin-right: 0rem;
  }
  .header{
  position: fixed;
  min-width: 100%;
  z-index: 100;
}
.main{
  @media (min-width: 768px) and (max-width: 1020px) {
    margin-left: -3rem;
    }
    
}
.btnn{
  @media (min-width: 768px) and (max-width: 1020px) {
    margin-left: -9rem;
    }
    
}

`;
