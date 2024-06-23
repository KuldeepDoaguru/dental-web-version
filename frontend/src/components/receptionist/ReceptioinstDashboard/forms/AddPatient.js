import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toggleTableRefresh } from "../../../../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import cogoToast from "cogo-toast";

function AddPatient() {
  const formRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const { refreshTable } = useSelector((state) => state.user);
  const branch = user?.currentUser?.branch_name;
  const token = user?.currentUser?.token;

  const [searchDoctor, setSearchDoctor] = useState("");
  const [showDoctorList, setShowDoctorList] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null); // State to store the selected Doctor
  // const [selectedTreatment, setSelectedTreatment] = useState([]);
  const [selectedTreatment, setSelectedTreatment] = useState("OPD");

  const [selectedDisease, setSelectedDisease] = useState([]);
  const [inputDisease, setInputDisease] = useState("");

  const [disease, setDisease] = useState([]);
  const [treatments, setTreatment] = useState([]);
  const [doctors, setDoctors] = useState([]);

  const [patients, setPatients] = useState([]);
  const [appointmentsData, setAppointmentsData] = useState([]);
  const [branchDetail, setBranchDetail] = useState([]);
  const [branchHolidays, setBranchHolidays] = useState([]);
  const [loading,setLoading] = useState(false);

  const opdCost = treatments?.filter(
    (treatment) => treatment?.treatment_name === "OPD"
  )[0]?.treatment_cost;

  const [opdAmount, setOpdAmount] = useState(opdCost); // State to store the OPD amount, initialized with opdCost

  // Update opdAmount when opdCost changes
  useEffect(() => {
    setOpdAmount(opdCost);
  }, [opdCost]);

  // Handle change in opdAmount
  const handleOpdAmountChange = (e) => {
    setOpdAmount(e.target.value);
  };

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
        `https://dentalgurureceptionist.doaguru.com/api/v1/receptionist/get-branch-holidays/${branch}` ,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
        }
      );
      console.log(response);
      setBranchHolidays(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const [weekOffDay, setWeekOffDay] = useState("");
  console.log(selectedTreatment)
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

  const [selectedDate, setSelectedDate] = useState(formatDate(new Date()));

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
      appDateTime: `${value}T${data.appDateTime?.split("T")[1]}`, // Update the appointment_dateTime with the new date and existing time
    });
    setSelectedDate(value);
  };

  const getPatient = async () => {
    try {
      const response = await axios.get(
        `https://dentalgurureceptionist.doaguru.com/api/v1/receptionist/get-Patients/${branch}` ,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
        }
      );
      console.log(response);
      setPatients(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAppointments = async () => {
    try {
      const response = await axios.get(
        `https://dentalgurureceptionist.doaguru.com/api/v1/receptionist/get-appointments/${branch}` ,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
        }
      );
      setAppointmentsData(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getDoctors = async () => {
    try {
      const response = await axios.get(
        `https://dentalgurureceptionist.doaguru.com/api/v1/receptionist/get-doctors/${branch}` ,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
        }
      );
      setDoctors(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(doctors);

  const getDisease = async () => {
    try {
      const response = await axios.get(
        "https://dentalgurureceptionist.doaguru.com/api/v1/receptionist/get-disease"
      );
      console.log(response);
      setDisease(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(disease);

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

  const [doctorWithLeave, setDoctorWithLeave] = useState([]);
  const getDoctorsWithLeave = async () => {
    try {
      const response = await axios.get(
        `https://dentalgurureceptionist.doaguru.com/api/v1/receptionist/get-doctors-with-leave/${branch}` ,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
        }
      );
      setDoctorWithLeave(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(doctorWithLeave);

  useEffect(() => {
    getPatient();
    getAppointments();
    getDisease();
    getTreatment();
    getDoctors();
    getDoctorsWithLeave();
    getBranchDetail();
    getBranchHolidays();
  }, []);

  useEffect(() => {
    getPatient();
    getAppointments();
  }, [refreshTable]);

  useEffect(() => {
    handleWeekOfDay(branchDetail[0]?.week_off);
  }, [branchDetail]);

  const handleChangeDisease = (newValue, actionMeta) => {
    setSelectedDisease(newValue);
    if (actionMeta.action === "create-option") {
      // If a new option is created, add it to the list of options
      const newOption = {
        value: newValue[newValue.length - 1].value,
        label: newValue[newValue.length - 1].label,
      };
      disease.push(newOption);
    }
  };

  // const handleChangeDisease = (selectedOptions) => {
  //   setSelectedDisease(selectedOptions.map(option => option.value));
  // };

  const handleChangeTreatment = (selectedOption) => {
    setSelectedTreatment(selectedOption.value);
  };

  const [data, setData] = useState({
    branch_name: "",
    patient_Name: "",
    mobile: "",
    email: "",
    gender: "",
    aadhaar_no: "",
    contact_Person: "",
    contact_Person_Name: "",
    blood_Group: "",
    dob: "",
    age: "",
    weight: "",
    allergy: "",
    disease: "",
    patientType: "",
    status: "",
    doctorId: "",
    doctor_name: "",
    appDateTime: "",
    treatment: "",
    opd_amount: "",
    payment_Mode: "",
    transaction_Id: "",
    payment_Status: "",
    notes: "",
    address: "",
    patient_added_by: "",
    patient_updated_by: "",
    patient_added_by_emp_id: "",
    patient_updated_by_emp_id: "",
  });

  console.log(data);

  const [filteredDoctor, setFilteredDoctor] = useState([]);

  // useEffect(() => {
  //   // Filter patients based on the search query
  //   const filtered = patients.filter((patient) =>
  //     data.patient_Name.toLowerCase().includes(searchQuery.toLowerCase())
  //   );
  //   setFilteredPatients(filtered);
  // }, [searchQuery, patients]);

  const [availableDoctorOnDate, setAvailableDoctorOnDate] = useState([]);
  useEffect(() => {
    setSearchDoctor("");
    setSelectedDoctor(null);
    if (!selectedDate) {
      return;
    }
    const selectedDateTime = new Date(selectedDate);

    const filteredDoctors = doctors.filter((doctor) => {
      // Find all leave entries for the current doctor
      const doctorLeaveEntries = doctorWithLeave.filter(
        (doc) => doc.employee_ID === doctor.employee_ID
      );

      // If the doctor has leave entries, check if the selected date falls within any of them
      if (doctorLeaveEntries.length > 0) {
        return !doctorLeaveEntries.some((entry) => {
          const leaveDates = entry.leave_dates?.split(",");
          return leaveDates.includes(
            selectedDateTime.toISOString()?.split("T")[0]
          );
        });
      }

      // If the doctor has no leave entries, include them in the filtered array
      return true;
    });

    setAvailableDoctorOnDate(filteredDoctors);
  }, [selectedDate, doctorWithLeave, doctors]);

  useEffect(() => {
    // Filter patients based on the search query if there's a search query, otherwise set an empty array
    const filtered = showDoctorList
      ? availableDoctorOnDate.filter((doctor) =>
          doctor.employee_name
            .toLowerCase()
            .includes(searchDoctor.toLowerCase().trim())
        )
      : [];
    setFilteredDoctor(filtered);
  }, [searchDoctor]);

  const handleSearchDoctor = (e) => {
    setShowDoctorList(true);
    setSearchDoctor(e.target.value);
  };

  console.log(appointmentsData);
  useEffect(() => {
    const calculateAge = (date) => {
      const dob = new Date(date);
      const now = new Date();
      let years = now.getFullYear() - dob.getFullYear();

      // Adjust for leap years
      const dobThisYear = new Date(
        now.getFullYear(),
        dob.getMonth(),
        dob.getDate()
      );
      if (now < dobThisYear) {
        years--;
      }

      setData({ ...data, age: years });
    };
    calculateAge(data.dob);
  }, [data.dob]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const timelineData = async (id) => {
    try {
      const response = await axios.post(
        "https://dentalgurureceptionist.doaguru.com/api/v1/receptionist/insertTimelineEvent",
        {
          type: "Add Patient",
          description: "Add Patient and Appointment scheduled",
          branch: branch,
          patientId: id,
        }
        ,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
      }
      }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the selected doctor is null
    if (!selectedDoctor) {
      cogoToast.error("Please select doctor from the list");
      console.log("Please select a doctor");
      return;
    }

    if (selectedTreatment?.length == 0) {
      cogoToast.error("Please select treatment");
      console.log("Please select treatment");
      return;
    }

    const selectedDay = new Date(selectedDate).getDay();
    if (selectedDay === weekOffDay) {
      cogoToast.info(
        "Selected date is a week off day. Please choose another date."
      );
      return;
    }

    if (
      patients.some(
        (patient) =>
          patient.patient_name === data.patient_Name &&
          patient.mobileno === data.mobile
      )
    ) {
      cogoToast.info("Patient already exists");
      return;
    }

    if (data.payment_Status === "unpaid") {
      cogoToast.info("Please paid the OPD amount to book appointment");
      return;
    }

    // Convert appointment time to Date object
    const selectedDateTime = new Date(data.appDateTime);

    const isBranchHoliday = branchHolidays.some((holiday) => {
      let holidayDate = new Date(holiday.holiday_date);
      holidayDate = new Date(
        holidayDate.getFullYear(),
        holidayDate.getMonth(),
        holidayDate.getDate()
      );
      const compareDateandTime = new Date(data.appDateTime);
      // const time24h = formatToFullDate24Hour(compareDateandTime);
      // Convert selectedDateTime to full date
      let selectedDateTime = new Date(data.appDateTime);
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
      cogoToast.info(
        `Selected date is branch holiday please select other date`
      );
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

    // if (!isDoctorAvailable(selectedDateTime)) {
    //   // Doctor is not available at the specified time
    //   alert("The selected doctor is not available at the specified time");
    //   console.log("The selected doctor is not available at the specified time");
    //   return;
    // }

    const isSlotAvailable = appointmentsData.every((appointment) => {
      // Check if the appointment is for the selected doctor and if it falls within the same datetime range
      const appointmentDate = new Date(appointment.appointment_dateTime);
      const selectedDate = new Date(data.appDateTime);

      // Check if the appointment status is 'Cancel'
      const isCanceled = appointment.appointment_status !== "Cancel";

      return !(
        appointment.assigned_doctor_id === selectedDoctor.employee_ID &&
        appointmentDate.getTime() === selectedDate.getTime() &&
        isCanceled
      );
    });

    if (isSlotAvailable) {
      // Slot is available, proceed with booking
      const newPatient = {
        branch_name: branch,
        clinicName : branchDetail[0]?.hospital_name.toUpperCase(),
        clinicContact : branchDetail[0]?.branch_contact,
        clinicAddress : branchDetail[0]?.branch_address,
        clinicEmail : branchDetail[0]?.branch_email,
        patient_Name: data.patient_Name,
        mobile: data.mobile,
        email: data.email,
        gender: data.gender,
        aadhaar_no: data.aadhaar_no,
        contact_Person: data.contact_Person,
        contact_Person_Name: data.contact_Person_Name,
        blood_Group: data.blood_Group,
        dob: data.dob,
        age: data.age,
        address: data.address,
        weight: data.weight,
        allergy: data.allergy,
        status: "Appoint",
        disease: selectedDisease?.map((option) => option.value).toString(),
        patientType: data.patientType,
        doctorId: selectedDoctor.employee_ID,
        doctor_name: selectedDoctor.employee_name,
        doctor_email : selectedDoctor.employee_email,
        appDateTime: data.appDateTime,
        treatment: selectedTreatment,
        opd_amount: selectedTreatment === "OPD" ? opdAmount : "0",
        payment_Mode: data.payment_Mode,
        transaction_Id: data.transaction_Id,
        payment_Status: data.payment_Status,
        notes: data.notes,
        patient_added_by: user.currentUser.employee_name,
        patient_added_by_emp_id: user.currentUser.employee_ID,
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
        const response = await axios.post(
          "https://dentalgurureceptionist.doaguru.com/api/v1/receptionist/add-patient", 
          newPatient , 
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
          }
          }
        );
        console.log(response);
        if (response?.data?.success) {
          setLoading(false);
          cogoToast.success(response?.data?.message);
          dispatch(toggleTableRefresh());
          timelineData(response?.data?.user?.patientId);
          formRef.current.reset();
          setSelectedDoctor(null);
          setSelectedDisease([]);
          setSelectedTreatment([]);
          setSearchDoctor("");
          setData({
            branch_name: "",
            patient_Name: "",
            mobile: "",
            email: "",
            gender: "",
            aadhaar_no: "",
            contact_Person: "",
            contact_Person_Name: "",
            blood_Group: "",
            dob: "",
            age: "",
            weight: "",
            allergy: "",
            disease: "",
            patientType: "",
            status: "",
            doctorId: "",
            doctor_name: "",
            appDateTime: "",
            treatment: "",
            opd_amount: "",
            payment_Mode: "",
            transaction_Id: "",
            payment_Status: "",
            notes: "",
            address: "",
            patient_added_by: "",
            patient_updated_by: "",
            patient_added_by_emp_id: "",
            patient_updated_by_emp_id: "",
          });

          if (response?.data?.treatment === "OPD") {
            navigate(`/print_Opd_Reciept/${response?.data?.data?.insertId}`);
          }
        } else {
          setLoading(false);
          cogoToast.error(response?.data?.message || "Something went wrong");
        }
      } catch (error) {
        setLoading(false);
        console.log(error);
        cogoToast.error(error.response.data.message || "Something went wrong");
      }

      // setPatients([...patients, newPatient]);
      // setAppointmentData([...appointment_data,newPatient]);

      // Reset form data
      // setData({
      //   patient_Name: "",
      //   mobile: "",
      //   email: "",
      //   gender:"",
      //   contact_Person: "",
      //   contact_Person_Name: "",
      //   blood_Group: "",
      //   dob: "",
      //   age: "",
      //   address: "",
      //   weight: "",
      //   allergy: "",
      //   disease: "",
      //   patientType: "",
      //   doctorId: "",
      //   doctor_name: "",
      //   appDateTime: "",
      //   treatment: "",
      //   notes: "",
      // });

      // Reset selected doctor
      // setSelectedDoctor(null);

      // console.log("Appointment booked successfully!");
      // alert("Appointment booked successfully!");
    } else {
      // Slot is not available
      cogoToast.error(
        "The selected doctor's slot is already booked at the specified time"
      );
      console.log(
        "The selected doctor's slot is already booked at the specified time"
      );
    }
  };

  const handleDoctorSelect = (doctor) => {
    setSelectedDoctor(doctor); // Set the selected patient when it's clicked
    setShowDoctorList(false);
    setSearchDoctor(doctor.employee_name); // Reset the search query to close the search list
  };

  console.log(filteredDoctor);
  console.log(selectedDoctor);

  return (
    <Wrapper>
      <form ref={formRef} onSubmit={handleSubmit}>
        <ul className="list-group">
          <li className="list-group-item">
            <div className="row">
              <div className="col-sm-6">
                <div className="form-outline" id="form1">
                  <label className="form-label" for="name">
                    Patient name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="form-control"
                    name="patient_Name"
                    onChange={handleChange}
                    pattern="[A-Za-z\s]*"
        title="Text should contain only letters"
        placeholder="Enter full name"
                    required
                    autocomplete="off"
                    maxLength={100}
                  />
                </div>
              </div>
              <div className="col-sm-6 ">
                <div className="form-outline">
                  <label className="form-label" for="gender">
                    Gender *
                  </label>
                  <select
                    className="form-select"
                    id="gender"
                    name="gender"
                    required
                    onChange={handleChange}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="form-outline">
                  <label className="form-label mt-2" for="mobile">
                    Mobile No. *
                  </label>
                  <input
                  id="mobile"
                    required
                    type="text"
                    className="form-control"
                    name="mobile"
                    placeholder="Enter 10-digit mobile number"
                    pattern="[0-9]{10}"
                    title="Mobile number should be 10 digits"
                    maxLength={10}
                    minLength={10}

            
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="col-sm-6">
                <div className="form-outline" id="form1">
                  <label className="form-label mt-2" for="email">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="form-control"
                    name="email"
                    onChange={handleChange}
                    placeholder="Enter email"
                  />
                </div>
              </div>
              <div className="col-sm-6">
                <div className="form-outline">
                  <label className="form-label mt-2" for="address">
                    Address *
                  </label>
                  <input
                    type="text"
                    id="address"
                    className="form-control"
                    name="address"
                    onChange={handleChange}
                    required
                    placeholder="Enter address"
                    maxLength={250}
                  />
                </div>
              </div>
              <div className="col-sm-6">
                <div className="form-outline">
                  <label className="form-label mt-2" for="aadhaar">
                    Aadhaar No.
                  </label>
                  <input
                    type="text"
                    id="aadhaar"
                    className="form-control"
                    name="aadhaar_no"
                    onChange={handleChange}
                    placeholder="Enter 12-digit aadhaar number"
                    pattern="[0-9]{12}"
                    title="Aadhaar number should be 12 digits"
                    maxLength={12}
                    minLength={12}
                  />
                </div>
              </div>
              <div className="col-sm-6">
                <div className="form-outline">
                  <label className="form-label mt-2" for="contact_Person">
                    Contact Person *
                  </label>
                  <select
                    className="form-select"
                    id="contact_Person"
                    name="contact_Person"
                    required
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    <option value="Self">Self</option>
                    <option value="Father">Father</option>
                    <option value="Mother">Mother</option>
                    <option value="Husband">Husband</option>
                    <option value="Wife">Wife</option>
                    <option value="Son">Son</option>
                    <option value="Daughter">Daughter</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="form-outline">
                  <label className="form-label mt-2" htmlFor="blood_Group">
                    Blood Group
                  </label>
                  <select
                    className="form-select"
                    id="blood_Group"
                    name="blood_Group"
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    <option value="A+">A+</option>
                    <option value="B+">B+</option>
                    <option value="O+">O+</option>
                    <option value="AB+">AB+</option>
                    <option value="A-">A-</option>
                    <option value="B-">B-</option>
                    <option value="O-">O-</option>
                    <option value="AB-">AB-</option>
                  </select>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="form-outline">
                  <label className="form-label mt-2" for="contact_Person_Name">
                    Cont. Per. Name
                  </label>
                  <input
                    type="text"
                    id="contact_Person_Name"
                    name="contact_Person_Name"
                    className="form-control"
                    onChange={handleChange}
                    disabled={data.contact_Person == "Self"}
                    pattern="[A-Za-z\s]*"
                    title="Text should contain only letters"
                    placeholder="Enter contact person name"
                    maxLength={100}
                  />
                </div>
              </div>
              <div className="col-sm-6">
                <div className="form-outline">
                  <label className="form-label mt-2" for="dob">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    id="dob"
                    className="form-control"
                    max={formatDate(new Date())}
                    name="dob"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                </div>
              </div>
              <div className="col-sm-6">
                <div className="form-outline">
                  <label className="form-label mt-2" for="age">
                    Age *
                  </label>

                  <input
                    type="text"
                    id="age"
                    className="form-control"
                    name="age"
                    onChange={handleChange}
                    value={data.age ? data.age : ""}
                    required
                    placeholder="Enter age in years"
                    pattern="[0-9]*"
                    title="Age should contain only numbers"
                    maxLength={3}
                  />
                </div>
              </div>
              <div className="col-sm-6">
                <div className="form-outline">
                  <label className="form-label mt-2" for="weight">
                    Weight *
                  </label>

                  <input
                    type="text"
                    id="weight"
                    className="form-control"
                    name="weight"
                    onChange={handleChange}
                    required
                    placeholder="Enter weight in kg"
                    pattern="[0-9]*"
                    title="weight should contain only numbers"
                    maxLength={3}
                  />
                </div>
              </div>
              <div className="col-sm-6">
                <div className="form-outline">
                  <label className="form-label mt-2" for="allergy">
                    Have any allergy
                  </label>

                  <input
                    type="text"
                    id="allergy"
                    className="form-control"
                    name="allergy"
                    onChange={handleChange}
                    placeholder="Enter allergy"
                  />
                </div>
              </div>

              <div className="col-sm-12">
                <div className="form-outline">
                  <label className="form-label mt-2" for="disease">
                    Have any disease
                  </label>
                  <CreatableSelect
                    id="disease"
                    isMulti
                    onChange={handleChangeDisease}
                    options={disease}
                    value={selectedDisease}
                    inputValue={inputDisease}
                    onInputChange={setInputDisease}
                    placeholder="Select or type to add..."
                    autocomplete="off"
                  />
                </div>
              </div>

              <div className="col-sm-6">
                <div className="form-outline">
                  <label className="form-label mt-2" for="patientType">
                    Patient Type *
                  </label>

                  <select
                    className="form-select"
                    id="patientType"
                    name="patientType"
                    required
                    onChange={handleChange}
                  >
                    <option value="">Select Patient Type</option>
                    <option value="General">General</option>
                    <option value="CGHS(Serving)">CGHS(Serving)</option>
                    <option value="CGHS(Pensioner)">CGHS(Pensioner)</option>
                    <option value="CSMA">CSMA</option>
                  </select>
                </div>
              </div>

              <p className="mt-4">Fill details for Book Appointment</p>

              <ul className="list-group">
                <li className="list-group-item">
                  <div className="row">
                    <div className="col-sm-6 ">
                      <div className="form-outline">
                        {/* <label className="form-label" for="form6Example2">
                            Date&Time
                          </label>
                          <input
                            type="datetime-local"
                            id="form6Example2"
                            className="form-control"
                            name="appDateTime"
                            onChange={(e)=>handleBookChange(e)}
                            required
                           
                          /> */}
                        <label className="form-label" for="date">
                          Appointment Date *
                        </label>
                        <input
                        id="date"
                          type="date"
                          value={selectedDate}
                          className="form-control"
                          onChange={handleDateChange}
                          // min={formatDate(new Date())}
                          required
                        />
                      </div>
                    </div>
                    {/* <div className="col-sm-6 ">
                      <div className="form-outline">
                        <label className="form-label" for="form6Example2">
                          Appointment Time *
                        </label>
                        <Select
                          options={timeSlots}
                          required
                          value={timeSlots.find(
                            (slot) =>
                              slot.value === data.appDateTime?.split("T")[1]
                          )}
                          onChange={(selectedOption) =>
                            setData({
                              ...data,
                              appDateTime: `${selectedDate}T${selectedOption.value}`,
                            })
                          }
                        />
                      </div>
                    </div> */}
                      <div className="col-sm-6 ">
                <div className="form-outline">
                  <label className="form-label" for="form6Example2">
                    Appointment Time *
                  </label>
                  <select
                    
                    required
                    className="form-select"
                    onChange={(e) =>
                      setData({
                        ...data,
                        appDateTime: `${selectedDate}T${e.target.value}`,
                      })
                    }
                  >
                    <option value="">Select slot</option>
                    {timeSlots.map((time)=>(
                      <option value={time.value}>{time.label}</option>
                    ))}
                  </select>
                </div>
              </div>
                    
                 
                    <div className="col-sm-6">
                      <div className="form-outline">
                        <label className="form-label mt-2" for="doctor">
                          Doctor *
                        </label>

                        <input
                          type="search"
                          id="doctor"
                          name="doctor"
                          className="form-control text-capitalize"
                          value={searchDoctor}
                          onChange={handleSearchDoctor}
                          required
                          placeholder="Search Doctor"
                          autocomplete="off"
                        />
                        <DoctorList>
                          <div>
                            <ul className="list-group">
                            {
                          showDoctorList && filteredDoctor.length === 0 ? (
                            <li className="list-group-item">
                              <h6>No Data Found</h6>
                            </li>
                          )
                          :
                              searchDoctor &&
                                filteredDoctor?.map((doctor) => (
                                  <li
                                    key={doctor.employee_ID}
                                    className={`list-group-item text-capitalize${
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
                    </div>
                    {/* <div className="col-sm-6 ">
                       <div className="form-outline">
                       <label className="form-label" for="form6Example2">
                           Date&Time
                         </label>
                         <input
                           type="datetime-local"
                           id="form6Example2"
                           className="form-control"
                           name="appDateTime"
                           onChange={handleChange}
                           required
                          
                         />
                        
                       </div>
                     </div> */}

                    {/* <div className="col-sm-6">
                      <div className="form-outline" id="form1">
                        <label className="form-label" for="form6Example2">
                          Add Treatment
                        </label>
                        <Select
                          id="treatment"
                          name="treatment"
                          options={treatments}
                          value={
                            selectedTreatment
                              ? {
                                  value: selectedTreatment,
                                  label: selectedTreatment,
                                }
                              : null
                          }
                          onChange={handleChangeTreatment}
                        />
                      </div>
                    </div> */}

                    {selectedTreatment === "OPD" && (
                      <>
                        <div className="col-sm-6">
                          <div className="form-outline">
                            <label className="form-label mt-2" for="opd_amount">
                              OPD Amount *
                            </label>
                            <input
                              type="number"
                              id="opd_amount"
                              className="form-control"
                              onChange={handleOpdAmountChange}
                              name="opd_amount"
                              required
                              value={opdAmount}
                            />
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-outline">
                            <label className="form-label mt-2" for="paymentMode">
                              Payment Mode *
                            </label>
                            <select
                              className="form-select"
                              id="paymentMode"
                              name="payment_Mode"
                              onChange={handleChange}
                              required
                            >
                              <option value="">Select</option>
                              <option value="cash">Cash</option>
                              <option value="online">Online</option>
                            </select>
                          </div>
                        </div>
                        {data.payment_Mode === "online" && (
                          <div className="col-sm-6">
                            <div className="form-outline">
                              <label className="form-label mt-2" for="transaction_Id">
                                Transaction Id *
                              </label>
                              <input
                                type="text"
                                id="transaction_Id"
                                className="form-control"
                                onChange={handleChange}
                                name="transaction_Id"
                                required
                                placeholder="Enter transaction Id"
                                maxLength={50}
                              />
                            </div>
                          </div>
                        )}
                        <div className="col-sm-6">
                          <div className="form-outline">
                            <label className="form-label mt-2" for="payment_Status">
                              Payment Status *
                            </label>
                            <select
                              className="form-select"
                              id="payment_Status"
                              name="payment_Status"
                              onChange={handleChange}
                              required
                            >
                              <option value="">Select</option>
                              <option value="paid">Paid</option>
                              <option value="unpaid">Unpaid</option>
                            </select>
                          </div>
                        </div>
                      </>
                    )}

                    <div className="col-sm-6">
                      <div className="form-outline">
                        <label className="form-label mt-2" for="notes">
                          Notes
                        </label>
                        <input
                          type="text"
                          id="notes"
                          className="form-control"
                          name="notes"
                          onChange={handleChange}
                          maxLength={250}
                        />
                      </div>
                    </div>

                    {/* <div className="d-flex  mt-4">
                     <div className="col-sm-3 p-0 ">
                       <div className="form-outline">
                         <label className="form-label" for="form6Example1">
                           Doctor :
                         </label>
                       </div>
                     </div>
                     <div className="col-sm-4 p-0">
                       <div className="form-outline">
                         <input
                           class="form-check-input"
                           type="checkbox"
                           value=""
                           id="flexCheckDefault"
                         />
                         <label
                           class="form-check-label mx-1"
                           for="flexCheckDefault"
                         >
                           Sms
                         </label>
                       </div>
                     </div>
                     <div className="col-sm-5 p-0">
                       <div className="form-outline">
                         <input
                           class="form-check-input"
                           type="checkbox"
                           value=""
                           id="flexCheckDefault"
                         />
                         <label
                           class="form-check-label mx-1"
                           for="flexCheckDefault"
                         >
                           Send Email
                         </label>
                       </div>
                     </div>
                     </div> */}
                    {/* <div className="d-flex ">
                     <div className="col-sm-3 p-0">
                       <div className="form-outline">
                         <label className="form-label" for="form6Example1">
                           Patient :
                         </label>
                       </div>
                     </div>
                     <div className="col-sm-4 p-0">
                       <div className="form-outline">
                         <input
                           class="form-check-input"
                           type="checkbox"
                           value=""
                           id="flexCheckDefault"
                         />
                         <label
                           class="form-check-label mx-1"
                           for="flexCheckDefault"
                         >
                           Sms
                         </label>
                       </div>
                     </div>
                     <div className="col-sm-5 p-0">
                       <div className="form-outline">
                         <input
                           class="form-check-input"
                           type="checkbox"
                           value=""
                           id="flexCheckDefault"
                         />
                         <label
                           class="form-check-label mx-1"
                           for="flexCheckDefault"
                         >
                           Send Email
                         </label>
                       </div>
                     </div>
                     </div> */}
                  </div>
                </li>
              </ul>
              <div className="formbtn d-flex justify-content-lg-center justify-content-md-center">
                <button className="btn btn-success " type="submit" id="btn2" disabled={loading}>
                  {" "}
                 {loading ? "Loading...": "Add Patient & Book Appointment"} 
                </button>
              </div>
            </div>
          </li>
        </ul>
      </form>
    </Wrapper>
  );
}

export default AddPatient;

const Wrapper = styled.div`
  position: relative;
  #section3 {
    @media screen and (max-width: 768px) {
      margin-top: 1rem;
      width: 20rem;
    }
    @media screen and (min-width: 768px) and (max-width: 1020px) {
      width: 41rem;
    }
  }
  .formbtn {
    margin-top: 1rem;
    @media screen and (max-width: 768px) {
    }
  }

  #tab1 {
    height: 12rem;
    overflow-y: auto;
    @media screen and (max-width: 768px) {
      margin-left: -1.1rem;
    }
  }

  #btn2 {
    @media screen and (max-width: 768px) {
      font-size: small;
      margin-left: 5.5rem;
    }
    @media screen and (min-width: 768px) and (max-width: 1020px) {
      font-size: small;
      margin: 1rem auto;
    }
    @media screen and (min-width: 1020px) and (max-width: 1600px) {
      margin-bottom: 1rem;
      font-size: small;
    }
    @media screen and (min-width: 1600px) and (max-width: 3700px) {
      margin-bottom: 1rem;
      font-size: small;
    }
  }
  #myTabContent {
    height: 28.5rem;
    overflow-y: auto;
  }
`;

// const FormContainer = styled.div`
//   /* Your styling for the form container */
//   margin-top: 50px;
// `;

const PatientList = styled.div`
  position: absolute;

  z-index: 1000;
  width: 100%;
  overflow-y: auto;
  max-height: 400px;
  /* Your styling for the patient list */
`;
const DoctorList = styled.div`
  position: absolute;
  z-index: 999; /* Set a high z-index to ensure the list is displayed above other elements */
  width: 100%;
  overflow-y: auto;
  max-height: 400px;

  /* Your additional styling for the doctor list */
`;
