import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { toggleTableRefresh } from "../../../redux/user/userSlice";
import cogoToast from "cogo-toast";

const BookSittingAppointment = ({
  onClose,
  getPatientData,
  treatment,
  tsid,
  tp_id,
  appoint_id,
  currentSitting,
  treatStats,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const { branch_name, employee_ID, employee_name } = user.currentUser;
  // Function to format date in YYYY-MM-DD format
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const doctorDetailsStore = user.currentUser;
  const [show, setShow] = useState(false);
  const [treatments, setTreatment] = useState([]);
  const [branchHolidays, setBranchHolidays] = useState([]);
  const [branchDetail, setBranchDetail] = useState([]);
  const [weekOffDay, setWeekOffDay] = useState("");
  const [selectedDate, setSelectedDate] = useState(formatDate(new Date()));
  const [doctorWithLeave, setDoctorWithLeave] = useState([]);
  const [availableDoctorOnDate, setAvailableDoctorOnDate] = useState([]);
  const [docAppoint, setDocAppoint] = useState([]);
  const [doctors, setDoctors] = useState([]);
  // const [doctorDetailsStore, setdoctorDetailsStore] = useState();
  console.log(getPatientData[0]?.uhid);

  const [data, setData] = useState({
    patient_uhid: getPatientData[0]?.uhid,
    branch: branch_name,
    tp_id: tp_id,
    assigned_doctor_name: employee_name,
    assigned_doctor_id: employee_ID,
    appointment_dateTime: "",
    treatment_provided: treatment,
    appointment_created_by: employee_name,
    appointment_created_by_ID: employee_ID,
    notes: "",
    appointment_status: "ongoing",
  });

  console.log(data);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const getBranchDetail = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8888/api/doctor/get-branch-detail/${branch_name}`
      );
      console.log(response);
      setBranchDetail(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getBranchHolidays = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8888/api/doctor/get-branch-holidays/${branch_name}`
      );
      console.log(data);
      setBranchHolidays(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleWeekOfDay = (day) => {
    if (day == "sunday") {
      setWeekOffDay(0);
    } else if (day == "monday") {
      setWeekOffDay(1);
    } else if (day == "tuesday") {
      setWeekOffDay(2);
    } else if (day == "wednesday") {
      setWeekOffDay(3);
    } else if (day == "thursday") {
      setWeekOffDay(4);
    } else if (day == "friday") {
      setWeekOffDay(5);
    } else if (day == "saturday") {
      setWeekOffDay(6);
    } else {
      setWeekOffDay("");
    }
  };
  console.log(doctorDetailsStore);
  useEffect(() => {
    // Extract the time part from the appointment date time and set it as the selected time
    const time = selectedDate.split("T")[1];
    setData((prevState) => ({
      ...prevState,
      appointment_dateTime: `${selectedDate}T${time}`,
    }));
  }, [selectedDate]);

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    if (!value) {
      return;
    }
    setData({
      ...data,
      [name]: value,
      appointment_dateTime: `${value}T${
        data.appointment_dateTime.split("T")[1]
      }`,
    });
    setSelectedDate(value);
  };

  const getDoctorsWithLeave = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8888/api/doctor/get-doctors-with-leave/${branch_name}`
      );
      setDoctorWithLeave(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getDoctorAppoint = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8888/api/doctor/getAppointmentsViaDocId/${branch_name}/${employee_ID}`
      );
      setDocAppoint(data);
    } catch (error) {
      console.log(error);
    }
  };

  const generateTimeSlots = () => {
    const slots = [];
    for (
      let hour = parseInt(branchDetail[0]?.open_time.split(":")[0]);
      hour < parseInt(branchDetail[0]?.close_time.split(":")[0]);
      hour++
    ) {
      for (
        let minute = 0;
        minute < 60;
        minute += parseInt(branchDetail[0]?.appoint_slot_duration.split(" ")[0])
      ) {
        const formattedHour24 = hour.toString().padStart(2, "0");
        const formattedMinute = minute.toString().padStart(2, "0");

        // Convert hour to 12-hour format for label
        const period = hour < 12 ? "AM" : "PM";
        const formattedHour12 = (((hour + 11) % 12) + 1)
          .toString()
          .padStart(2, "0");

        const time24 = `${formattedHour24}:${formattedMinute}`;
        const time12 = `${formattedHour12}:${formattedMinute} ${period}`;

        slots.push({ value: time24, label: time12 });
      }
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  useEffect(() => {
    const selectedDateTime = new Date(selectedDate);
    const filteredDoctors = doctors.filter((doctor) => {
      const doctorLeaveEntries = doctorWithLeave.filter(
        (doc) => doc.employee_ID === doctor.employee_ID
      );
      if (doctorLeaveEntries.length > 0) {
        return !doctorLeaveEntries.some((entry) => {
          const leaveDates = entry.leave_dates.split(",");
          return leaveDates.includes(
            selectedDateTime.toISOString().split("T")[0]
          );
        });
      }
      return true;
    });

    setAvailableDoctorOnDate(filteredDoctors);
  }, [selectedDate, doctorWithLeave, doctors]);

  const timelineForNextSittingBooking = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8888/api/doctor/insertTimelineEvent",
        {
          type: "Booking for Next Sitting",
          description: "Next Sitting Scheduled Successfully",
          branch: branch_name,
          patientId: getPatientData.length > 0 ? getPatientData[0].uhid : "",
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleBookSittingAppointment = async (e) => {
    e.preventDefault();

    const selectedDay = new Date(selectedDate).getDay();
    if (selectedDay === weekOffDay) {
      alert("Selected date is a week off day. Please choose another date.");
      return;
    }

    // Convert appointment time to Date object
    const selectedDateTime = new Date(data.appointment_dateTime);

    const isBranchHoliday = branchHolidays.some((holiday) => {
      let holidayDate = new Date(holiday.holiday_date);
      holidayDate = new Date(
        holidayDate.getFullYear(),
        holidayDate.getMonth(),
        holidayDate.getDate()
      );
      const compareDateandTime = new Date(data.appointment_dateTime);
      let selectedDateTime = new Date(data.appointment_dateTime);
      selectedDateTime = new Date(
        selectedDateTime.getFullYear(),
        selectedDateTime.getMonth(),
        selectedDateTime.getDate()
      );
      console.log(holidayDate.getTime(), selectedDateTime.getTime());
      if (holidayDate.getTime() === selectedDateTime.getTime()) {
        const holidayStart = new Date(selectedDateTime);
        holidayStart.setHours(
          holiday?.holiday_start_time?.split(":")[0],
          holiday?.holiday_start_time?.split(":")[1]
        );
        const holidayEnd = new Date(selectedDateTime);
        holidayEnd.setHours(
          holiday?.holiday_end_time?.split(":")[0],
          holiday?.holiday_end_time?.split(":")[1]
        );

        console.log(holidayStart, holidayEnd, compareDateandTime);
        console.log(
          compareDateandTime >= holidayStart && compareDateandTime <= holidayEnd
        );
        return (
          compareDateandTime >= holidayStart && compareDateandTime <= holidayEnd
        );
      }
      return false;
    });

    if (isBranchHoliday) {
      alert(`Selected date is branch holiday please selected other date`);
      return;
    }

    // Check if the selected doctor is available during the appointment time
    const isDoctorAvailable = (selectedDateTime) => {
      const morningStart = new Date(selectedDateTime);
      morningStart.setHours(
        doctorDetailsStore.morning_shift_start_time.split(":")[0],
        doctorDetailsStore.morning_shift_start_time.split(":")[1]
      );
      const morningEnd = new Date(selectedDateTime);
      morningEnd.setHours(
        doctorDetailsStore.morning_shift_end_time.split(":")[0],
        doctorDetailsStore.morning_shift_end_time.split(":")[1]
      );
      const eveningStart = new Date(selectedDateTime);
      eveningStart.setHours(
        doctorDetailsStore.evening_shift_start_time.split(":")[0],
        doctorDetailsStore.evening_shift_start_time.split(":")[1]
      );
      const eveningEnd = new Date(selectedDateTime);
      eveningEnd.setHours(
        doctorDetailsStore.evening_shift_end_time.split(":")[0],
        doctorDetailsStore.evening_shift_end_time.split(":")[1]
      );

      return (
        (selectedDateTime >= morningStart && selectedDateTime <= morningEnd) ||
        (selectedDateTime >= eveningStart && selectedDateTime <= eveningEnd)
      );
    };
    console.log(docAppoint);
    const isSlotAvailable = docAppoint?.result.every((appointment) => {
      const appointmentDate = new Date(appointment.appointment_dateTime);
      const selectedDate = new Date(data.appointment_dateTime);

      const isCanceled = appointment.appointment_status !== "Cancel";

      return !(
        appointment.assigned_doctor_id === doctorDetailsStore.employee_ID &&
        appointmentDate.getTime() === selectedDate.getTime() &&
        isCanceled
      );
    });

    if (isSlotAvailable) {
      // Slot is available, proceed with booking
      // const newAppointment = {
      //   appDateTime: data.appointment_dateTime,
      //   doctor_name: employee_name,
      //   doctorId: employee_ID,
      //   treatment: data.treatment_provided,
      //   notes: data.notes,
      // };

      if (!isDoctorAvailable(selectedDateTime)) {
        // Doctor is not available at the specified time

        const confirmation = window.confirm(
          "The selected doctor is not available at the specified time. Do you want to proceed with booking?"
        );
        if (!confirmation) {
          return;
        }
      }

      try {
        const response = await axios.post(
          "http://localhost:8888/api/doctor/bookSittingAppointment",
          data
        );
        console.log(response);
        cogoToast.success(response?.data?.message);
        dispatch(toggleTableRefresh());
        timelineData(getPatientData[0]?.uhid);
        onClose();
        navigate(
          `/TPrescriptionDash/${tsid}/${tp_id}/${currentSitting}/${treatment}`
        );
      } catch (error) {
        console.log(error);
        cogoToast.error(error?.response?.data?.message);
      }
    } else {
      // Slot is not available
      alert(
        "The selected doctor's slot is already booked at the specified time"
      );
      console.log(
        "The selected doctor's slot is already booked at the specified time"
      );
    }
  };

  const timelineData = async (id) => {
    try {
      const response = await axios.post(
        "http://localhost:8888/api/doctor/insertTimelineEvent",
        {
          type: "Book Sitting Appointment",
          description: "Book Sitting Appointment",
          branch: branch_name,
          patientId: getPatientData[0]?.uhid,
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDoctorAppoint();
    getDoctorsWithLeave();
    getBranchDetail();
    getBranchHolidays();
  }, []);

  useEffect(() => {
    handleWeekOfDay(branchDetail[0]?.week_off);
  }, [branchDetail]);

  console.log(data);
  return (
    <>
      <Wrapper className="container">
        <>
          <Modal show={true} onHide={onClose}>
            <Modal.Header closeButton>
              <Modal.Title>Book Next Sitting</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={handleBookSittingAppointment}>
                <div class="mb-3">
                  <label for="recipient-name" class="col-form-label">
                    Patient UHID:
                  </label>
                  <input
                    type="text"
                    readOnly
                    class="form-control"
                    id="recipient-name"
                    value={data.patient_uhid}
                  />
                </div>
                <div class="mb-3">
                  <div className="form-outline">
                    <label className="form-label" for="form6Example2">
                      Appointment Date
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      // onChange={(e) => setSelectedDate(e.target.value)}
                      onChange={handleDateChange}
                      min={formatDate(new Date())}
                      required
                    />
                  </div>
                </div>
                <div class="mb-3">
                  <div className="form-outline">
                    <label className="form-label" for="form6Example2">
                      Appointment Time
                    </label>
                    <Select
                      options={timeSlots}
                      required
                      value={timeSlots.find(
                        (slot) =>
                          slot.value === data.appointment_dateTime.split("T")[1]
                      )}
                      onChange={(selectedOption) =>
                        setData({
                          ...data,
                          appointment_dateTime: `${selectedDate}T${selectedOption.value}`,
                        })
                      }
                    />
                  </div>
                </div>
                <div class="mb-3">
                  <label for="message-text" class="col-form-label">
                    Doctor:
                  </label>
                  <input
                    type="text"
                    name="assigned_doctor_name"
                    class="form-control"
                    id="recipient-name"
                    value={data.assigned_doctor_name}
                  />
                </div>
                <div class="mb-3">
                  <label for="message-text" class="col-form-label">
                    Treatment:
                  </label>
                  <input
                    type="text"
                    name="assigned_doctor_name"
                    class="form-control"
                    id="recipient-name"
                    value={data.treatment_provided}
                  />
                </div>
                <div class="mb-3">
                  <label for="message-text" class="col-form-label">
                    Notes:
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    name="notes"
                    id="recipient-name"
                    onChange={handleChange}
                    value={data.notes}
                  />
                </div>
                <button type="submit" class="btn btn-primary">
                  Submit
                </button>
              </form>
            </Modal.Body>
          </Modal>
        </>
      </Wrapper>
    </>
  );
};

export default BookSittingAppointment;
const Wrapper = styled.div``;
