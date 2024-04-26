import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import cogoToast from "cogo-toast";
import { toggleTableRefresh } from "../redux/slices/UserSlicer";
import moment from "moment";

const MarkAttendance = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  console.log(user);
  const branch_name = user.branch;
  const employee_name = user.employee_name;
  const employee_ID = user.id;
  const employee_designation = user.employee_designation;
  const date = new Date().toISOString().slice(0, 10);
  const time = new Date();

  const [todayAttendance, setTodayAttendance] = useState([]);

  const getTodayAttendance = async () => {
    try {
      const response = await axios.get(
        `https://dentalguruaccountant.doaguru.com/api/v1/accountant/getTodayAttendance/${branch_name}/${employee_ID}/${date}`
      );
      setTodayAttendance(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTodayAttendance();
  }, []);
  console.log(todayAttendance);
  const handleLogin = async () => {
    const loginTime = moment().format("HH:mm:ss"); // Format current time for login
    const availability = "yes";
    try {
      const response = await axios.post(
        "https://dentalguruaccountant.doaguru.com/api/v1/accountant/markAttendanceLogin",
        {
          branch_name,
          employee_ID,
          employee_name,
          employee_designation,
          date,
          loginTime,
          availability,
        }
      );
      if (response.data.success) {
        cogoToast.success("Login time recorded successfully");
        getTodayAttendance();
        dispatch(toggleTableRefresh());
      }
    } catch (error) {
      console.error("Error marking login time:", error);
      cogoToast.error(error?.response?.data?.message);
    }
  };

  const handleLogout = async () => {
    // Display a confirmation popup
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
        "https://dentalguruaccountant.doaguru.com/api/v1/accountant/markAttendanceLogout",
        {
          branch_name,
          employee_ID,
          employee_name,
          employee_designation,
          date,
          logoutTime,
          availability,
        }
      );

      if (response.data.success) {
        cogoToast.success("Logout time recorded successfully");
        dispatch(toggleTableRefresh());
      }
    } catch (error) {
      console.error("Error marking logout time:", error);
      cogoToast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="container">
      <div className="row d-flex justify-content-end">
        <div className="col-6 d-flex justify-content-end gap-2">
          {todayAttendance?.length == 0 && (
            <button className="btn btn-success" onClick={handleLogin}>
              Attendance Login
            </button>
          )}

          {todayAttendance?.length > 0 && (
            <button className="btn btn-success" onClick={handleLogout}>
              Attendance Logout
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
