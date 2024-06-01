import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useDispatch, useSelector } from "react-redux";
import cogoToast from "cogo-toast";
import axios from "axios";
import moment from "moment";
// import { toggleTableRefresh } from "../../redux/slices/UserSlicer";

const ApplyLeave = () => {
  const { refreshTable } = useSelector((state) => state.user);
  const user = useSelector((state) => state.user.currentUser);
  console.log(user);
  const dispatch = useDispatch();
  const branch = user.branch_name;
  const employeeName = user.employee_name;
  const employeeId = user.employee_ID;
  const [show, setShow] = useState(false);
  const [leavesData, setLeaveData] = useState([]);
  const [selectedDates, setSelectedDates] = useState([]);
  const [formData, setFormData] = useState({
    employee_ID: employeeId,
    employee_name: employeeName,
    branch_name: branch,
    leave_dates: selectedDates,
    leave_reason: "",
    leave_status: "pending",
  });

  const getLeaves = async () => {
    try {
      const response = await axios.get(
        `https://dentalguruadmin.doaguru.com/api/v1/admin/get-leaves/${branch}/${employeeId}`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setLeaveData(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLeaves();
  }, []);

  console.log(leavesData);
  // Function to format date to "YYYY-MM-DD"
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleDateClick = (date) => {
    const formattedDate = formatDate(date);
    const dateIndex = selectedDates.indexOf(formattedDate);

    // If the date is already in the array, remove it
    if (dateIndex !== -1) {
      setSelectedDates((prevDates) =>
        prevDates.filter((_, index) => index !== dateIndex)
      );
    } else {
      // Otherwise, add the date to the array
      setSelectedDates((prevDates) => [...prevDates, formattedDate]);
    }
  };
  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData((pre) => ({
      ...pre,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedDates.length === 0) {
      cogoToast.error("Please select a date");
      return;
    }
    const hasOverlap = selectedDates.some((date) =>
      leavesData.some((leave) => leave.leave_dates.includes(date))
    );

    if (hasOverlap) {
      cogoToast.error(
        "You have already applied for leave on one or more of these dates."
      );
      return;
    } else {
      const updatedFormData = {
        ...formData,
        leave_dates: selectedDates.toString(),
      };
      try {
        const response = await axios.post(
          "https://dentalguruadmin.doaguru.com/api/v1/admin/apply-leave",
          updatedFormData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        if (response.data.success) {
          cogoToast.success(response?.data?.message);
          setSelectedDates([]);
          setFormData((prev) => ({
            ...prev,
            leave_reason: "",
          }));
          getLeaves();
          // dispatch(toggleTableRefresh());
          handleClose();
        } else {
          cogoToast.error(response?.data?.message);
        }
      } catch (error) {
        console.log(error);
        cogoToast.error(error?.response?.data?.message);
      }
    }
  };

  console.log(formData);
  const handleClose = () => {
    setSelectedDates([]);
    setShow(false);
  };
  const handleShow = () => setShow(true);

  return (
    <Wrapper className="container">
      <Button variant="info" onClick={handleShow} id="b1">
        Apply Leave
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Apply for Leave</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="leaveReason" className="form-label">
                Leave Reason
              </label>
              <input
                type="text"
                className="form-control"
                id="leaveReason"
                placeholder="Leave reason"
                name="leave_reason"
                onChange={handleChange}
                required
                value={formData.leave_reason}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="calendar" className="form-label">
                Leave Dates
              </label>
              {/* Calendar component */}
              <Calendar
                onChange={handleDateClick}
                value={null}
                calendarType="gregory"
                selectRange={false}
              />
            </div>

            {/* Display the selected dates */}
            <div>
              <strong>Selected Dates:</strong>
              <ul>
                {selectedDates.map((date) => (
                  <li key={date}>
                    {moment(date, "YYYY-MM-DD").format("DD-MM-YYYY")}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <button type="submit" className="btn btn-success">
                Apply
              </button>
            </div>
          </form>
          <div
            className="widget-area-2 proclinic-box-shadow"
            id="tableres"
          ></div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </Wrapper>
  );
};

export default ApplyLeave;

const Wrapper = styled.div`
  #button {
    margin: 2rem;
  }
`;
