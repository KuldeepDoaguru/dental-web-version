import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { toggleTableRefresh } from "../../../redux/user/userSlice";
import cogoToast from "cogo-toast";

function EditAppointment({ onClose, appointmentInfo, allAppointmentData }) {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [loading,setLoading] = useState(false);
  const token = currentUser?.token;
  const [show, setShow] = useState(false);
  const [searchDoctor, setSearchDoctor] = useState(
    appointmentInfo.assigned_doctor_name
  );
  const [showDoctorList, setShowDoctorList] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(); // State to store the selected Doctor
  const [selectedTreatment, setSelectedTreatment] = useState([
    appointmentInfo.treatment_provided,
  ]);
  const [treatments, setTreatment] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const branch = currentUser.branch_name;
  const [branchHolidays, setBranchHolidays] = useState([]);

  // Remove current appointment data from allAppointmentData
  const filteredAllAppointmentData = allAppointmentData.filter(
    (appointment) => appointment.appoint_id !== appointmentInfo.appoint_id
  );

  const [branchDetail, setBranchDetail] = useState([]);

  const getBranchDetail = async () => {
    try {
      const response = await axios.get(
        `https://dentalgurureceptionist.doaguru.com/api/v1/receptionist/get-branch-detail/${branch}`
      );
      console.log(response);
      setBranchDetail(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getBranchHolidays = async () => {
    try {
      const response = await axios.get(
        `https://dentalgurureceptionist.doaguru.com/api/v1/receptionist/get-branch-holidays/${branch}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      setBranchHolidays(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const [weekOffDay, setWeekOffDay] = useState("");

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

  // Generate time slots with 15-minute intervals
  const generateTimeSlots = () => {
    const slots = [];
    for (
      let hour = parseInt(branchDetail[0]?.open_time?.split(":")[0]);
      hour < parseInt(branchDetail[0]?.close_time?.split(":")[0]);
      hour++
    ) {
      for (
        let minute = 0;
        minute < 60;
        minute += parseInt(branchDetail[0]?.appoint_slot_duration?.split(" ")[0])
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

  // Function to format date in YYYY-MM-DD format
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [selectedDate, setSelectedDate] = useState(
    formatDate(new Date(appointmentInfo.appointment_dateTime))
  );

  useEffect(() => {
    // Extract the time part from the appointment date time and set it as the selected time
    const time = appointmentInfo.appointment_dateTime
      ?.split("T")[1]
      ?.substring(0, 5);
    setData((prevState) => ({
      ...prevState,
      appointment_dateTime: `${selectedDate}T${time}`,
    }));
  }, [appointmentInfo.appointment_dateTime]);

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    if (!value) {
      return;
    }
    setData({
      ...data,
      [name]: value,
      appointment_dateTime: `${value}T${
        data.appointment_dateTime?.split("T")[1]
      }`, // Update the appointment_dateTime with the new date and existing time
    });
    setSelectedDate(value);
  };

  const getTreatment = async () => {
    try {
      const response = await axios.get(
        "https://dentalgurureceptionist.doaguru.com/api/v1/receptionist/get-treatments"
      );
      console.log(response);
      setTreatment(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getDoctors = async () => {
    try {
      const response = await axios.get(
        `https://dentalgurureceptionist.doaguru.com/api/v1/receptionist/get-doctors/${branch}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setDoctors(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTreatment();
    getDoctors();
    getDoctorsWithLeave();
    getBranchDetail();
    getBranchHolidays();
  }, []);

  useEffect(() => {
    handleWeekOfDay(branchDetail[0]?.week_off);
  }, [branchDetail]);

  useEffect(() => {
    // Find the doctor object that matches the assigned doctor name or id from the appointmentInfo
    const selectedDoctorInfo = doctors.find(
      (doctor) =>
        doctor.employee_name === appointmentInfo.assigned_doctor_name ||
        doctor.employee_ID === appointmentInfo.assigned_doctor_id
    );

    // Set the selected doctor if found
    if (selectedDoctorInfo) {
      setSelectedDoctor(selectedDoctorInfo);
      setSearchDoctor(selectedDoctorInfo.employee_name);
    }
  }, [doctors, appointmentInfo]);

  const handleChangeTreatment = (selectedOption) => {
    setSelectedTreatment(selectedOption.value);
  };

  const [data, setData] = useState({
    appoint_id: appointmentInfo.appoint_id,
    patient_name: appointmentInfo.patient_name,
    appointment_dateTime: appointmentInfo.appointment_dateTime,
    assigned_doctor_name: appointmentInfo.assigned_doctor_name,
    treatment_provided: appointmentInfo.treatment_provided,
    notes: appointmentInfo.notes,
    appointment_status: appointmentInfo.appointment_status,
    appointment_updated_by: currentUser.employee_name,
    appointment_updated_by_emp_id: currentUser.employee_ID,
  });

  const [appointment_data, setAppointmentData] = useState([
    {
      uid: "1",
      patient: "Mohit Shau",
      doctorId: "1",
      doctor: "Dr Umer Qureshi",
      mobile: "9806324245",
      treatment: "root canal",
      timing: "2024-02-17T10:45",
      status: "Missed",
      action: "edit",
    },
    {
      uid: "1",
      patient: "Mohit Shau",
      doctorId: "1",
      doctor: "Dr Umer Qureshi",
      mobile: "9806324245",
      treatment: "root canal",
      timing: "2024-02-17T10:00",
      status: "Missed",
      action: "edit",
    },
    {
      uid: "1",
      patient: "Mohit Shau",
      doctorId: "1",
      doctor: "Dr Umer Qureshi",
      mobile: "9806324245",
      treatment: "root canal",
      timing: "2024-02-17T11:30",
      status: "Missed",
      action: "edit",
    },
    {
      uid: "1",
      patient: "Mohit Shau",
      doctorId: "2",
      doctor: "Dr Ajay",
      mobile: "9806324245",
      treatment: "root canal",
      timing: "2024-02-17T12:30",
      status: "Missed",
      action: "edit",
    },
    {
      uid: "1",
      patient: "Mohit Shau",
      doctorId: "1",
      doctor: "Dr Umer Qureshi",
      mobile: "9806324245",
      treatment: "root canal",
      timing: "2024-02-17T12:45",
      status: "Missed",
      action: "edit",
    },
    {
      uid: "1",
      patient: "Mohit Shau",
      doctorId: "2",
      doctor: "Dr Ajay",
      mobile: "9806324245",
      treatment: "root canal",
      timing: "2024-02-18T10:45",
      status: "Missed",
      action: "edit",
    },
    {
      uid: "1",
      patient: "Mohit Shau",
      doctorId: "1",
      doctor: "Dr Umer Qureshi",
      mobile: "9806324245",
      treatment: "root canal",
      timing: "2024-02-18T12:00",
      status: "Missed",
      action: "edit",
    },
    {
      uid: "1",
      patient: "Mohit Shau",
      doctorId: "1",
      doctor: "Dr Umer Qureshi",
      mobile: "9806324245",
      treatment: "root canal",
      timing: "2024-02-18T13:00",
      status: "Missed",
      action: "edit",
    },
    {
      uid: "1",
      patient: "Mohit Shau",
      doctorId: "2",
      doctor: "Dr Ajay",
      mobile: "9806324245",
      treatment: "root canal",
      timing: "2024-02-18T13:00",
      status: "Missed",
      action: "edit",
    },
    {
      uid: "1",
      patient: "Mohit Shau",
      doctorId: "1",
      doctor: "Dr Umer Qureshi",
      mobile: "9806324245",
      treatment: "root canal",
      timing: "2024-02-17T15:00",
      status: "Missed",
      action: "edit",
    },
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const [filteredDoctor, setFilteredDoctor] = useState([]);

  useEffect(() => {
    // Filter patients based on the search query if there's a search query, otherwise set an empty array
    const filtered = showDoctorList
      ? availableDoctorOnDate.filter((doctor) =>
          doctor.employee_name
            .toLowerCase()
            .includes(searchDoctor.toLowerCase())
        )
      : [];
    setFilteredDoctor(filtered);
  }, [searchDoctor]);

  const handleSearchDoctor = (e) => {
    setShowDoctorList(true);
    setSearchDoctor(e.target.value);
    setSelectedDoctor(null);
  };

  const handleDoctorSelect = (doctor) => {
    setSelectedDoctor(doctor); // Set the selected patient when it's clicked
    setShowDoctorList(false);
    setSearchDoctor(doctor.employee_name); // Reset the search query to close the search list
  };

  const timelineData = async (id) => {
    try {
      const response = await axios.post(
        "https://dentalgurureceptionist.doaguru.com/api/v1/receptionist/insertTimelineEvent",
        {
          type: "Edit Appointment",
          description: "Edit Appointment",
          branch: branch,
          patientId: id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  const handleEditAppointment = async (e) => {
    e.preventDefault();

    // Check if the selected doctor is null
    if (!selectedDoctor) {
      alert("Please select a doctor from the list");
      console.log("Please select a doctor");
      return;
    }

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
      // const time24h = formatToFullDate24Hour(compareDateandTime);
      // Convert selectedDateTime to full date
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
      return false; // If holidayDate doesn't match selectedDate, return false
    });

    if (isBranchHoliday) {
      alert(`Selected date is branch holiday please select other date`);
      return;
    }

    // Check if the selected doctor is available during the appointment time
    const isDoctorAvailable = (selectedDateTime) => {
      const morningStart = new Date(selectedDateTime);
      morningStart.setHours(
        selectedDoctor.morning_shift_start_time?.split(":")[0],
        selectedDoctor.morning_shift_start_time?.split(":")[1]
      );
      const morningEnd = new Date(selectedDateTime);
      morningEnd.setHours(
        selectedDoctor.morning_shift_end_time?.split(":")[0],
        selectedDoctor.morning_shift_end_time?.split(":")[1]
      );
      const eveningStart = new Date(selectedDateTime);
      eveningStart.setHours(
        selectedDoctor.evening_shift_start_time?.split(":")[0],
        selectedDoctor.evening_shift_start_time?.split(":")[1]
      );
      const eveningEnd = new Date(selectedDateTime);
      eveningEnd.setHours(
        selectedDoctor.evening_shift_end_time?.split(":")[0],
        selectedDoctor.evening_shift_end_time?.split(":")[1]
      );

      return (
        (selectedDateTime >= morningStart && selectedDateTime <= morningEnd) ||
        (selectedDateTime >= eveningStart && selectedDateTime <= eveningEnd)
      );
    };

    const isSlotAvailable = filteredAllAppointmentData.every((appointment) => {
      // Check if the appointment is for the selected doctor and if it falls within the same datetime range
      const appointmentDate = new Date(appointment.appointment_dateTime);
      const selectedDate = new Date(data.appointment_dateTime);

      const isCanceled = appointment.appointment_status !== "Cancel";

      return !(
        appointment.assigned_doctor_id === selectedDoctor.employee_ID &&
        appointmentDate.getTime() === selectedDate.getTime() &&
        isCanceled
      );
    });

    // Check if the selected appointment date matches with the doctor's block day
    //  const blockDays = selectedDoctor.scheduleBlockDays; // Assuming scheduleBlockDays is an array of dates

    //  // Convert appointment date to the same format as block days
    //  const selectedDate = new Date(bookData.appDateTime);
    //  const formattedSelectedDateTime = selectedDate.toLocaleDateString("en-US");

    //  // Check if the appointment date matches any of the block days
    //  const isBlockDayMatched = blockDays.some((blockDay) => {
    //    const formattedBlockDay = new Date(blockDay).toLocaleDateString("en-US");
    //    return formattedBlockDay === formattedSelectedDateTime;
    //  });

    //  if(isBlockDayMatched){
    //   alert ("Doctor is not available in this day");
    //   return
    //  }

    if (isSlotAvailable) {
      // Slot is available, proceed with booking
      const newAppointment = {
        clinicName: branchDetail[0]?.hospital_name.toUpperCase(),
        clinicContact: branchDetail[0]?.branch_contact,
        clinicAddress: branchDetail[0]?.branch_address,
        clinicEmail: branchDetail[0]?.branch_email,
        patient_name: appointmentInfo.patient_name,
        patient_Email: appointmentInfo.emailid,
        appoint_id: appointmentInfo.appoint_id,
        appDateTime: data.appointment_dateTime,
        doctor_name: selectedDoctor.employee_name,
        doctor_email: selectedDoctor.employee_email,
        doctorId: selectedDoctor.employee_ID,
        treatment: selectedTreatment,
        notes: data.notes,
        appointment_updated_by: data.appointment_updated_by,
        appointment_updated_by_emp_id: data.appointment_updated_by_emp_id,
      };

      if (!isDoctorAvailable(selectedDateTime)) {
        // Doctor is not available at the specified time

        const confirmation = window.confirm(
          "The selected doctor is not available at the specified time. Do you want to proceed with booking?"
        );
        if (!confirmation) {
          return; // If the user cancels, return early
        }
      }

      try {
        setLoading(true)
        const response = await axios.put(
          "https://dentalgurureceptionist.doaguru.com/api/v1/receptionist/update-appointment",
          newAppointment,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response);
        if (response.data.success) {
          setLoading(false);
          cogoToast.success(response?.data?.message);
          dispatch(toggleTableRefresh());
          timelineData(appointmentInfo.uhid);
          onClose();
        } else {
          setLoading(false);
          cogoToast.error(response?.data?.message ||  "Failed to update appointment");

        }
      } catch (error) {
        setLoading(false);
        console.log(error);
        cogoToast.error(error?.response?.data?.message || "Failed to update appointment");
      }
      // setAppointmentData([...appointment_data,newAppointment]);
      // Reset form data

      // Reset selected doctor
      // setSelectedDoctor(null);

      // console.log("Appointment booked successfully!");
      // alert("Appointment booked successfully!");
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

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [doctorWithLeave, setDoctorWithLeave] = useState([]);
  const getDoctorsWithLeave = async () => {
    try {
      const response = await axios.get(
        `https://dentalgurureceptionist.doaguru.com/api/v1/receptionist/get-doctors-with-leave/${branch}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setDoctorWithLeave(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const [availableDoctorOnDate, setAvailableDoctorOnDate] = useState([]);

  useEffect(() => {
    const selectedDateTime = new Date(selectedDate);

    const filteredDoctors = doctors?.filter((doctor) => {
      // Find all leave entries for the current doctor
      const doctorLeaveEntries = doctorWithLeave?.filter(
        (doc) => doc.employee_ID === doctor.employee_ID
      );

      // If the doctor has leave entries, check if the selected date falls within any of them
      // if (doctorLeaveEntries?.length > 0) {
      //   return !doctorLeaveEntries?.some((entry) => {
      //     const leaveDates = entry?.leave_dates?.split(",");
      //     return leaveDates?.includes(
      //       selectedDateTime?.toISOString()?.split("T")[0]
      //     );
      //   });
      // }

      // Check if selectedDateTime is a valid date
if (selectedDateTime && !isNaN(selectedDateTime)) {
  // If the doctor has leave entries, check if the selected date falls within any of them
  if (doctorLeaveEntries?.length > 0) {
    return !doctorLeaveEntries.some((entry) => {
      const leaveDates = entry?.leave_dates?.split(",");
      return leaveDates?.includes(selectedDateTime.toISOString().split("T")[0]);
    });
  }
} else {
  // Handle the invalid date scenario (e.g., return false or throw an error)
  console.error('Invalid selected date');
  return false; // or any other appropriate action
}

      // If the doctor has no leave entries, include them in the filtered array
      return true;
    });

    setAvailableDoctorOnDate(filteredDoctors);
  }, [selectedDate, doctorWithLeave, doctors]);

  useEffect(() => {
    setSearchDoctor("");
  }, [selectedDate]);

  console.log(appointmentInfo);

  return (
    <>
      <Wrapper className="container">
        <>
          <Modal show={true} onHide={onClose}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Appointment</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={handleEditAppointment}>
                <div class="mb-3">
                  <label for="recipient-id" class="col-form-label">
                    Appointment Id:
                  </label>
                  <input
                    type="text"
                    value={data.appoint_id}
                    readOnly
                    class="form-control"
                    id="recipient-id"
                  />
                </div>
                <div class="mb-3">
                  <label for="recipient-name" class="col-form-label">
                    Patient Name:
                  </label>
                  <input
                    type="text"
                    value={data.patient_name}
                    readOnly
                    class="form-control text-capitalize"
                    id="recipient-name"
                  />
                </div>
                {/* <div class="mb-3">
            <label for="message-text" class="col-form-label">Date & Time:</label>
            <input type="datetime-local" value={data.appointment_dateTime} onChange={handleChange} name='appointment_dateTime'  className="form-control" id="recipient-name"/>
          </div> */}
                <div class="mb-3">
                  <div className="form-outline">
                    <label className="form-label" htmlFor="date1">
                      Appointment Date
                    </label>
                    <input
                      id="date1"
                      type="date"
                      value={selectedDate}
                      className="form-control"
                      // onChange={(e) => setSelectedDate(e.target.value)}
                      onChange={handleDateChange}
                      // min={formatDate(new Date())}
                      required
                    />
                  </div>
                </div>
                <div class="mb-3">
                  <div className="form-outline">
                    <label className="form-label">Appointment Time</label>
                    <Select
                      options={timeSlots}
                      required
                      value={timeSlots.find(
                        (slot) =>
                          slot.value === data.appointment_dateTime?.split("T")[1]
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
                  <label class="col-form-label">Doctor:</label>
                  <input
                    type="text"
                    value={searchDoctor}
                    onChange={handleSearchDoctor}
                    required
                    name="assigned_doctor_name"
                    class="form-control text-capitalize"
                    id="recipient-name"
                    autocomplete="off"
                    placeholder="Search doctor"
                  />
                  <DoctorList>
                    <div>
                      <ul className="list-group">
                        {searchDoctor &&
                          filteredDoctor?.map((doctor) => (
                            <li
                              key={doctor.employee_ID}
                              className={`list-group-item text-capitalize ${
                                selectedDoctor &&
                                selectedDoctor.employee_ID ===
                                  doctor.employee_ID
                                  ? "active"
                                  : ""
                              }`} // Add 'active' class if the patient is selected
                              onClick={() => handleDoctorSelect(doctor)} // Call handlePatientSelect function when the patient is clicked
                            >
                             {"Dr. "} {doctor.employee_name} {"-"} Id:{" "}
                              {doctor.employee_ID}
                              {/* Display other patient details as needed */}
                            </li>
                          ))}
                      </ul>
                    </div>
                  </DoctorList>
                </div>
                <div class="mb-3">
                  <label class="col-form-label">Treatment:</label>
                  {/* <Select
        id="treatment"
        name="treatment"
        options={treatments}
        value={selectedTreatment ? { value: selectedTreatment, label: selectedTreatment } : selectedTreatment}
        onChange={handleChangeTreatment}
        required
      /> */}
                  <input
                    type="text"
                    value={selectedTreatment}
                    readOnly
                    class="form-control"
                    id="recipient-name"
                  />
                </div>
                <div class="mb-3">
                  <label for="message-text" class="col-form-label">
                    Notes:
                  </label>
                  <input
                    type="text"
                    value={data.notes}
                    class="form-control"
                    name="notes"
                    onChange={handleChange}
                    id="message-text"
                    maxLength={250}
                  />
                </div>
                {/* <div class="mb-3">
            <label for="message-text" class="col-form-label">Status:</label>
            <input type="text" value={data.appointment_status} onChange={handleChange} name='appointment_status'  class="form-control" id="recipient-name"/>
          </div> */}
                <button type="submit" class="btn btn-primary" disabled={loading}>
                 {loading ? "Loading..." : "Submit"}
                </button>
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={onClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      </Wrapper>
    </>
  );
}

export default EditAppointment;
const Wrapper = styled.div``;
const DoctorList = styled.div`
  position: absolute;
  z-index: 999; /* Set a high z-index to ensure the list is displayed above other elements */
  width: 100%;
  overflow-y: auto;
  max-height: 400px;

  /* Your additional styling for the doctor list */
`;
