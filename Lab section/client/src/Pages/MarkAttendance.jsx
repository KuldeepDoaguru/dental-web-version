import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import cogoToast from "cogo-toast";

import moment from "moment";
// import { toggleTableRefresh } from '../../redux/user/userSlice';

const MarkAttendance = () => {
  const currentUser = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const branch_name = currentUser.branch_name;
  const employee_name = currentUser.employee_name;
  const employee_ID = currentUser.employee_ID;
  const employee_designation = currentUser.employee_designation;
  const date = new Date().toISOString().slice(0, 10);
  const time = new Date();
  //   const loginTime = moment(time).format("HH:mm:ss");
  //   const logoutTime = moment(time).format("HH:mm:ss");
  const [todayAttendance, setTodayAttendance] = useState([]);
  const [loading , setLoading] = useState(false)
  const [loading1 , setLoading1] = useState(false)

  const token = currentUser?.token;

  const getTodayAttendance = async () => {
    try {
      const response = await axios.get(
        `https://dentalgurulab.doaguru.com/api/lab/getTodayAttendance/${branch_name}/${employee_ID}/${date}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTodayAttendance(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTodayAttendance();
    // Set up interval to fetch data every X seconds
    const interval = setInterval(() => {
      getTodayAttendance();
    }, 3000); // Fetch data every 5 seconds (adjust as needed)

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, []);
  console.log(todayAttendance);
  const handleLogin = async () => {

    const loginTime = moment().format("HH:mm:ss"); // Format current time for login
    const availability = "yes";
    try {
      setLoading(true)
      const response = await axios.post(
        "https://dentalgurulab.doaguru.com/api/lab/markAttendanceLogin",
        {
          branch_name,
          employee_ID,
          employee_name,
          employee_designation,
          date,
          loginTime,
          availability,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        cogoToast.success("Login time recorded successfully");
        getTodayAttendance();
        // dispatch(toggleTableRefresh())
      }
    } catch (error) {
      setLoading(false)
      console.error("Error marking login time:", error);
      cogoToast.error(error?.response?.data?.message);
    }
  };

  const handleLogout = async () => {
    // Display a confirmation popup
    setLoading1(true)
    const isConfirmed = window.confirm(
      "Are you sure you want to mark attendance Logout?"
    );

    if (!isConfirmed) {
      // If the user cancels the deletion, do nothing
      return;
    }
    const logoutTime = moment().format("HH:mm:ss"); // Format current time for logout
    const availability = "no";
    try {
     
      const response = await axios.put(
        "https://dentalgurulab.doaguru.com/api/lab/markAttendanceLogout",
        {
          branch_name,
          employee_ID,
          employee_name,
          employee_designation,
          date,
          logoutTime,
          availability,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        cogoToast.success("Logout time recorded successfully");
        // dispatch(toggleTableRefresh())
      }
    } catch (error) {
      setLoading1(false);
      console.error("Error marking logout time:", error);
      cogoToast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="container">
      <div className="row d-flex justify-content-end">
        <div className="col-6 d-flex justify-content-end gap-2">
          {todayAttendance?.length == 0 && (
            <button className="btn btn-success" onClick={handleLogin}
            disabled = {loading}
            >
             {loading ? 'Attendance Login ...' : 'Attendance Login'} 
             
            </button>
          )}

          {todayAttendance?.length > 0 && (
            <button className="btn btn-success" onClick={handleLogout}
            disabled = {loading1}
            >
              {loading1 ? 'Attendance Logout ...': 'Attendance Logout'}
           
            </button>
          )}
        </div>
        {/* <div className='col-3'>
          
         
        </div> */}
        {/* <div>{message}</div> */}
      </div>
    </div>
  );
};

export default MarkAttendance;
