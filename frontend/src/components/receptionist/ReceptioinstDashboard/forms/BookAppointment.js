import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Select from 'react-select';
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { toggleTableRefresh } from '../../../../redux/user/userSlice';




function BookAppointment() {
  
  const dispatch = useDispatch();
  const {refreshTable,currentUser} = useSelector((state) => state.user);
  const  branch = currentUser.branch_name
  const [searchQuery, setSearchQuery] = useState("");
  const [searchDoctor, setSearchDoctor] = useState("");
  const [showDoctorList,setShowDoctorList] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null); // State to store the selected patient
  const [selectedDoctor, setSelectedDoctor] = useState(null); // State to store the selected Doctor
  const [selectedTreatment, setSelectedTreatment] = useState([]);
  const [patients, setPatients] = useState([]);
  const [treatments,setTreatment] = useState([]);
  const [appointmentsData,setAppointmentsData] = useState([]);
  const [branchDetail,setBranchDetail] = useState([]);
  const [weekOffDay,setWeekOffDay] = useState("");
  const [branchHolidays,setBranchHolidays] = useState([]);
  console.log(branchHolidays)
  const  handleWeekOfDay = (day)=>{
        if(day == "sunday"){
          setWeekOffDay(0);
        }
        else if (day == "monday"){
          setWeekOffDay(1);
        }
       
        else if (day == "tuesday"){
          setWeekOffDay(2);
        }
        else if (day == "wednesday"){
          setWeekOffDay(3);
        }
        else if (day == "thursday"){
          setWeekOffDay(4);
        }
        else if (day == "friday"){
          setWeekOffDay(5);
        }
        else if (day == "saturday"){
          setWeekOffDay(6);
        }
        else{
          setWeekOffDay("")
        }
  }

  // Function to check if the given date is a week off day
  // const isWeekOffDay = (date) => {
  //   const dayOfWeek = date.getDay(); // Get the day of the week (0 for Sunday, 1 for Monday, etc.)
  //   return dayOfWeek === weekOffDay;
  // };

  const getBranchDetail = async ()=>{
    try{
       const response = await axios.get(`http://localhost:4000/api/v1/receptionist/get-branch-detail/${branch}`)
       console.log(response)
       setBranchDetail(response.data.data)
    }
    catch(error){
      console.log(error)
    }
  }
  const getBranchHolidays = async ()=>{
    try{
       const response = await axios.get(`http://localhost:4000/api/v1/receptionist/get-branch-holidays/${branch}`)
       console.log(response)
       setBranchHolidays(response.data.data)
    }
    catch(error){
      console.log(error)
    }
  }
 
  
  // Generate time slots with 15-minute intervals
  const generateTimeSlots = () => {
    const slots = [];
    // for (let hour = branchDetail[0]?.open_time.split(":")[0]; hour < branchDetail[0]?.close_time.split(":")[0]; hour++) {
    //   for (let minute = 0; minute < 60; minute += parseInt(branchDetail[0]?.appoint_slot_duration.split(" ")[0])) {
    //     const period = hour < 12 ? "AM" : "PM";
    //     const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
    //     const time = `${formattedHour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
    //     slots.push({ value: time, label: `${time} ${period}` });
    //   }
    // }
  //   for (let hour = parseInt(branchDetail[0]?.open_time.split(":")[0]); hour < parseInt(branchDetail[0]?.close_time.split(":")[0]); hour++) {
  //     for (let minute = 0; minute < 60; minute += parseInt(branchDetail[0]?.appoint_slot_duration.split(" ")[0])) {
  //         const formattedHour = hour.toString().padStart(2, '0');
  //         const formattedMinute = minute.toString().padStart(2, '0');
  //         const time = `${formattedHour}:${formattedMinute}`;
  //         slots.push({ value: time, label: time });
  //     }
  // }

  for (let hour = parseInt(branchDetail[0]?.open_time.split(":")[0]); hour < parseInt(branchDetail[0]?.close_time.split(":")[0]); hour++) {
    for (let minute = 0; minute < 60; minute += parseInt(branchDetail[0]?.appoint_slot_duration.split(" ")[0])) {
        const formattedHour24 = hour.toString().padStart(2, '0');
        const formattedMinute = minute.toString().padStart(2, '0');

        // Convert hour to 12-hour format for label
        const period = hour < 12 ? "AM" : "PM";
        const formattedHour12 = ((hour + 11) % 12 + 1).toString().padStart(2, '0');

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
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
 
  const [selectedDate, setSelectedDate] = useState(formatDate(new Date()));
  

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setBookData({
      ...bookData,
      [name]: value,
      appDateTime: `${value}T${bookData.appDateTime.split('T')[1]}` // Update the appointment_dateTime with the new date and existing time
    });
    setSelectedDate(value)
  };



  const getPatient = async () =>{
    try{
      const response = await axios.get(`http://localhost:4000/api/v1/receptionist/get-Patients/${branch}`);
      console.log(response);
      setPatients(response?.data?.data)
     }
     catch(error){
        console.log(error)
     }
    
  }

  
  const getAppointments = async ()=>{
    try{
      const response = await axios.get(`http://localhost:4000/api/v1/receptionist/get-appointments/${branch}`);
      setAppointmentsData(response?.data?.data)
    }
    catch(error){
      console.log(error)
    }
  }

  const getTreatment = async () =>{
    try{
     const response = await axios.get('http://localhost:4000/api/v1/receptionist/get-treatments');
     console.log(response);
     setTreatment(response?.data?.data)
    }
    catch(error){
       console.log(error)
    }
   

 }

 const [doctors,setDoctors] = useState([]);


  const getDoctors = async ()=>{
    try{
      const response = await axios.get(`http://localhost:4000/api/v1/receptionist/get-doctors/${branch}`);
      setDoctors(response?.data?.data)
    }
    catch(error){
      console.log(error)
    }
  }

  useEffect(()=>{
     getPatient();
     getTreatment();
     getDoctors();
     getAppointments();
     getDoctorsWithLeave();
     getBranchDetail();
     getBranchHolidays();
     
  },[]);
  useEffect(()=>{
    handleWeekOfDay(branchDetail[0]?.week_off);
  },[branchDetail]);

  useEffect(()=>{
    getPatient();
    getAppointments();
  },[refreshTable])

console.log(branchDetail)

 const [doctorWithLeave,setDoctorWithLeave] = useState([]);
  const getDoctorsWithLeave = async ()=>{
    try{
      const response = await axios.get(`http://localhost:4000/api/v1/receptionist/get-doctors-with-leave/${branch}`);
      setDoctorWithLeave(response?.data?.data)
    }
    catch(error){
      console.log(error)
    }
  }

  console.log(weekOffDay)


  






  // const handleChangeDisease = (selectedOptions) => {
  //   setSelectedDisease(selectedOptions.map(option => option.value));
  // };

  const handleChangeTreatment = (selectedOption) => {
    setSelectedTreatment(selectedOption.value);
  };


  
  const [data,setData] = useState(
    { uid :"1", patient_Name:"",mobile: "",email: "",gender: "", contact_Person : "" , contact_Person_Name: "", blood_Group : "" , dob : "", age : "",weight:"",allergy:"",disease:"", patientType:"", status:"",doctorId:"",doctor_name:"",appDateTime:"",treatment:"",notes:"",  address: ""}
    
  ) 


  const [bookData,setBookData] = useState(
    { branch_name:"", patient_Name:"",mobile: "", status:"",doctorId:"",doctor_name:"",appDateTime:"",treatment:"",notes:"", appointment_created_by:"",appointment_updated_by:"",appointment_created_by_emp_id	:"", appointment_updated_by_emp_id	:""}
  ) 
  console.log(bookData)
  console.log(bookData.appDateTime)
  // const doctors = [
  //   { uid :"1", doctor_name:"Dr Umer Qureshi",department:"ortho", mobile: "9806324245", email:"doctor@gmail.com",gender:"Male",address:"Ranital Gate no.4 Jabalpur", morningStartTiming:"10:00" ,morningEndTiming:"14:00",eveningStartTiming:"18:00" ,eveningEndTiming:"21:00",  scheduleBlockDays:["2024/02/21","2024/02/20","2024/02/19"],lunchTime: ""},
  //   { uid :"10", doctor_name:"Dr Rajiv",department:"ortho", mobile: "9806324245", email:"doctor@gmail.com",gender:"Male",address:"Ranital Gate no.4 Jabalpur" ,morningStartTiming:"10:00" ,morningEndTiming:"12:00",eveningStartTiming:"18:00" ,eveningEndTiming:"22:00", scheduleBlockDays:"2024/02/21",lunchTime: ""},
  //   { uid :"2", doctor_name:"Dr Ajay",department:"ortho", mobile: "9806324245", email:"doctor@gmail.com",gender:"Male",address:"Ranital Gate no.4 Jabalpur" ,morningStartTiming:"10:00" ,morningEndTiming:"18:00",eveningStartTiming:"10:00" ,eveningEndTiming:"18:00", scheduleBlockDays:"02/02/2024",lunchTime: ""},
  //   { uid :"4", doctor_name:"Dr Ajay",department:"ortho", mobile: "9806324245", email:"doctor@gmail.com",gender:"Male",address:"Ranital Gate no.4 Jabalpur" ,morningStartTiming:"10:00" ,morningEndTiming:"18:00",eveningStartTiming:"10:00" ,eveningEndTiming:"18:00", scheduleBlockDays:"02/04/2024",lunchTime: ""},
  //   { uid :"5", doctor_name:"Dr Ajay",department:"ortho", mobile: "9806324245", email:"doctor@gmail.com",gender:"Male",address:"Ranital Gate no.4 Jabalpur" ,morningStartTiming:"10:00" ,morningEndTiming:"18:00",eveningStartTiming:"10:00" ,eveningEndTiming:"18:00", scheduleBlockDays:"02/04/2024",lunchTime: ""},
  //   { uid :"6", doctor_name:"Dr Ajay",department:"ortho", mobile: "9806324245", email:"doctor@gmail.com",gender:"Male",address:"Ranital Gate no.4 Jabalpur" ,morningStartTiming:"10:00" ,morningEndTiming:"18:00",eveningStartTiming:"10:00" ,eveningEndTiming:"18:00", scheduleBlockDays:"02/04/2024",lunchTime: ""},
  //   { uid :"7", doctor_name:"Dr Ajay",department:"ortho", mobile: "9806324245", email:"doctor@gmail.com",gender:"Male",address:"Ranital Gate no.4 Jabalpur" ,morningStartTiming:"10:00" ,morningEndTiming:"18:00",eveningStartTiming:"10:00" ,eveningEndTiming:"18:00", scheduleBlockDays:"02/04/2024",lunchTime: ""},
  //   { uid :"8", doctor_name:"Dr Ajay",department:"ortho", mobile: "9806324245", email:"doctor@gmail.com",gender:"Male",address:"Ranital Gate no.4 Jabalpur" ,morningStartTiming:"10:00" ,morningEndTiming:"18:00",eveningStartTiming:"10:00" ,eveningEndTiming:"18:00", scheduleBlockDays:"20/02/2024",lunchTime: ""}
    

  // ];

  const [appointment_data,setAppointmentData] = useState([
    { uid :"1", patient:"Mohit Shau",doctorId:"1", doctor:"Dr Umer Qureshi",mobile: "9806324245", treatment:"root canal",timing:"2024-02-17T10:45",status:"Missed",action:"edit"},
    { uid :"1", patient:"Mohit Shau", doctorId:"1",doctor:"Dr Umer Qureshi",mobile: "9806324245", treatment:"root canal",timing:"2024-02-17T10:00",status:"Missed",action:"edit"},
    { uid :"1", patient:"Mohit Shau", doctorId:"1" ,doctor:"Dr Umer Qureshi",mobile: "9806324245", treatment:"root canal",timing:"2024-02-17T11:30",status:"Missed",action:"edit"},
    { uid :"1", patient:"Mohit Shau",doctorId:"2", doctor:"Dr Ajay",mobile: "9806324245", treatment:"root canal",timing:"2024-02-17T12:30",status:"Missed",action:"edit"},
    { uid :"1", patient:"Mohit Shau",doctorId:"1", doctor:"Dr Umer Qureshi",mobile: "9806324245", treatment:"root canal",timing:"2024-02-17T12:45",status:"Missed",action:"edit"},
    { uid :"1", patient:"Mohit Shau",doctorId:"2", doctor:"Dr Ajay",mobile: "9806324245", treatment:"root canal",timing:"2024-02-18T10:45",status:"Missed",action:"edit"},
    { uid :"1", patient:"Mohit Shau",doctorId:"1", doctor:"Dr Umer Qureshi",mobile: "9806324245", treatment:"root canal",timing:"2024-02-18T12:00",status:"Missed",action:"edit"},
    { uid :"1", patient:"Mohit Shau",doctorId:"1", doctor:"Dr Umer Qureshi",mobile: "9806324245", treatment:"root canal",timing:"2024-02-18T13:00",status:"Missed",action:"edit"},
    { uid :"1", patient:"Mohit Shau",doctorId:"2", doctor:"Dr Ajay",mobile: "9806324245", treatment:"root canal",timing:"2024-02-18T13:00",status:"Missed",action:"edit"},
    { uid :"1", patient:"Mohit Shau",doctorId:"1", doctor:"Dr Umer Qureshi",mobile: "9806324245", treatment:"root canal",timing:"2024-02-17T15:00",status:"Missed",action:"edit"},
    

    
  ]);

  // const [patients, setPatients] = useState([
  //   {
  //     uid: "1",
  //     patient_Name: "Mohit sahu",
  //     mobile: "9806324245",
  //     email: "patinet@gmail.com",
  //     gender: "Male",
  //     contact_Person: "father",
  //     contact_Person_Name: "rahul",
  //     blood_Group: "o+",
  //     dob: "",
  //     age: "25",
  //     address: "Ranital gate no. 4 , jabalpur",
  //   },
  //   {
  //     uid: "2",
  //     patient_Name: "Rahul sahu",
  //     mobile: "9806324245",
  //     email: "patinet@gmail.com",
  //     gender: "Male",
  //     contact_Person: "father",
  //     contact_Person_Name: "rahul",
  //     blood_Group: "o+",
  //     dob: "",
  //     age: "25",
  //     address: "Ranital gate no. 4 , jabalpur",
  //   },
  //   {
  //     uid: "3",
  //     patient_Name: "dev",
  //     mobile: "9806324245",
  //     email: "patinet@gmail.com",
  //     gender: "Male",
  //     contact_Person: "father",
  //     contact_Person_Name: "rahul",
  //     blood_Group: "o+",
  //     dob: "",
  //     age: "25",
  //     address: "Ranital gate no. 4 , jabalpur",
  //   },
  //   {
  //     uid: "3",
  //     patient_Name: "dev",
  //     mobile: "9806324245",
  //     email: "patinet@gmail.com",
  //     gender: "Male",
  //     contact_Person: "father",
  //     contact_Person_Name: "rahul",
  //     blood_Group: "o+",
  //     dob: "",
  //     age: "25",
  //     address: "Ranital gate no. 4 , jabalpur",
  //   },
  //   {
  //     uid: "3",
  //     patient_Name: "dev",
  //     mobile: "9806324245",
  //     email: "patinet@gmail.com",
  //     gender: "Male",
  //     contact_Person: "father",
  //     contact_Person_Name: "rahul",
  //     blood_Group: "o+",
  //     dob: "",
  //     age: "25",
  //     address: "Ranital gate no. 4 , jabalpur",
  //   },
  //   {
  //     uid: "3",
  //     patient_Name: "dev",
  //     mobile: "9806324245",
  //     email: "patinet@gmail.com",
  //     gender: "Male",
  //     contact_Person: "father",
  //     contact_Person_Name: "rahul",
  //     blood_Group: "o+",
  //     dob: "",
  //     age: "25",
  //     address: "Ranital gate no. 4 , jabalpur",
  //   },
   
    
  // ]);

  
  
const [availableDoctorOnDate,setAvailableDoctorOnDate] = useState([]);


useEffect(() => {
  setSearchDoctor("");
  setSelectedDoctor(null)
  
  const selectedDateTime = new Date(selectedDate);
  
  const filteredDoctors = doctors.filter(doctor => {
    // Find all leave entries for the current doctor
    const doctorLeaveEntries = doctorWithLeave.filter(doc => doc.employee_ID === doctor.employee_ID);
    
    // If the doctor has leave entries, check if the selected date falls within any of them
    if (doctorLeaveEntries.length > 0) {
      return !doctorLeaveEntries.some(entry => {
        const leaveDates = entry.leave_dates.split(',');
        return leaveDates.includes(selectedDateTime.toISOString().split('T')[0]);
      });
    }

    // If the doctor has no leave entries, include them in the filtered array
    return true;
  });

  setAvailableDoctorOnDate(filteredDoctors);
}, [selectedDate, doctorWithLeave, doctors]);

console.log(availableDoctorOnDate);

  const [filteredPatients, setFilteredPatients] = useState([]);
  const [filteredDoctor,setFilteredDoctor] = useState([]);

  // useEffect(() => {
  //   // Filter patients based on the search query
  //   const filtered = patients.filter((patient) =>
  //     data.patient_Name.toLowerCase().includes(searchQuery.toLowerCase())
  //   );
  //   setFilteredPatients(filtered);
  // }, [searchQuery, patients]);

  useEffect(() => {
    // Filter patients based on the search query if there's a search query, otherwise set an empty array
    const filtered = searchQuery
      ? patients.filter((patient) =>
          patient.patient_name.toLowerCase().includes(searchQuery.toLowerCase()) || patient.mobileno.includes(searchQuery)
        )
      : [];
    setFilteredPatients(filtered);
  }, [searchQuery, patients]);

  const handleSearch = (e) => {
    
    setSearchQuery(e.target.value);
  };


  useEffect(() => {
    // Filter patients based on the search query if there's a search query, otherwise set an empty array
    
    const filtered = showDoctorList
      ? availableDoctorOnDate.filter((doctor) =>
          doctor.employee_name.toLowerCase().includes(searchDoctor.toLowerCase())
        )
      : [];
    setFilteredDoctor(filtered);
  }, [searchDoctor]);

  const handleSearchDoctor = (e) => {
    setShowDoctorList(true)
    setSearchDoctor(e.target.value);
  };


  console.log(bookData)



  useEffect(()=>{
    const calculateAge = (date) => {
      const dob = new Date(date);
      const now = new Date();
      let years = now.getFullYear() - dob.getFullYear();
      
      // Adjust for leap years
      const dobThisYear = new Date(now.getFullYear(), dob.getMonth(), dob.getDate());
      if (now < dobThisYear) {
        years--;
      }
      
      setData({...data, age: years});
    };
    calculateAge(data.dob);
  },[data.dob])
  
  const handleChange = (e)=>{
      const {name,value} = e.target;
      setData({
        ...data,
        [name]: value
      });
  }





const handlePatientSelect = (patient) => {
  setSelectedPatient(patient); // Set the selected patient when it's clicked
  setSearchQuery(""); // Reset the search query to close the search list
};
const handleDoctorSelect = (doctor) => {
  setSelectedDoctor(doctor); // Set the selected patient when it's clicked
  setShowDoctorList(false)
  setSearchDoctor(doctor.employee_name); // Reset the search query to close the search list
};


  console.log(filteredDoctor)
  console.log(selectedDoctor)


  const handleBookChange = (e)=>{
    const {name,value} = e.target;
    setBookData({
      ...bookData,
      [name]: value
    });
}

 const handleBookAppointment = async (e) =>{
    
  e.preventDefault();

   // Check if the selected doctor is null
   if (!selectedDoctor) {
    alert("Please select doctor from the list")
    console.log("Please select a doctor");
    return;
  }

  const selectedDay = new Date(selectedDate).getDay();
  if(selectedDay === weekOffDay){
     alert("Selected date is a week off day. Please choose another date.");
     return ;
  }

   // Convert appointment time to Date object
const selectedDateTime = new Date(bookData.appDateTime);

// const isBranchHoliday = branchHolidays.some(holiday => {
//      let holidayDate = new Date(holiday.holiday_date);
//        if(holidayDate == selectedDate) {
//         const holidayStart = new Date(selectedDateTime);
//         holidayStart.setHours(holiday?.holiday_start_time?.split(":")[0], holiday?.holiday_start_time?.split(":")[1]);
//         const holidayEnd = new Date(selectedDateTime);
//         holidayEnd.setHours(holiday?.holiday_end_time?.split(":")[0], holiday?.holiday_end_time?.split(":")[1]);
//         return (
//           (selectedDateTime >= holidayStart && selectedDateTime <= holidayEnd)
//         )
//        }
//  })
 
const isBranchHoliday = branchHolidays.some(holiday => {
  let holidayDate = new Date(holiday.holiday_date);
  holidayDate = new Date(holidayDate.getFullYear(), holidayDate.getMonth(), holidayDate.getDate());
  const compareDateandTime = new Date(bookData.appDateTime);
  // const time24h = formatToFullDate24Hour(compareDateandTime);
  // Convert selectedDateTime to full date
  let selectedDateTime = new Date(bookData.appDateTime);
  selectedDateTime = new Date(selectedDateTime.getFullYear(), selectedDateTime.getMonth(), selectedDateTime.getDate());
  console.log(holidayDate.getTime(),selectedDateTime.getTime())
  if (holidayDate.getTime() === selectedDateTime.getTime()) {
      
      const holidayStart = new Date(selectedDateTime);
      holidayStart.setHours(holiday?.holiday_start_time?.split(":")[0], holiday?.holiday_start_time?.split(":")[1]);
      const holidayEnd = new Date(selectedDateTime);
      holidayEnd.setHours(holiday?.holiday_end_time?.split(":")[0], holiday?.holiday_end_time?.split(":")[1]);

      console.log(holidayStart , holidayEnd , compareDateandTime)
      console.log((compareDateandTime >= holidayStart && compareDateandTime <= holidayEnd))
      return (
          (compareDateandTime >= holidayStart && compareDateandTime <= holidayEnd)
      )
  }
  return false; // If holidayDate doesn't match selectedDate, return false
})

 if(isBranchHoliday){
   alert(`Selected date is branch holiday please selected other date`)
   return
 }

// Check if the selected doctor is available during the appointment time
const isDoctorAvailable = (selectedDateTime) => {
  const morningStart = new Date(selectedDateTime);
  morningStart.setHours(selectedDoctor.morning_shift_start_time.split(":")[0], selectedDoctor.morning_shift_start_time.split(":")[1]);
  const morningEnd = new Date(selectedDateTime);
  morningEnd.setHours(selectedDoctor.morning_shift_end_time.split(":")[0], selectedDoctor.morning_shift_end_time.split(":")[1]);
  const eveningStart = new Date(selectedDateTime);
  eveningStart.setHours(selectedDoctor.evening_shift_start_time.split(":")[0], selectedDoctor.evening_shift_start_time.split(":")[1]);
  const eveningEnd = new Date(selectedDateTime);
  eveningEnd.setHours(selectedDoctor.evening_shift_end_time.split(":")[0], selectedDoctor.evening_shift_end_time.split(":")[1]);
  
  return (
    (selectedDateTime >= morningStart && selectedDateTime <= morningEnd) ||
    (selectedDateTime >= eveningStart && selectedDateTime <= eveningEnd)
  );
};

 
  const isSlotAvailable = appointmentsData.every((appointment) => {
    // Check if the appointment is for the selected doctor and if it falls within the same datetime range
    const appointmentDate = new Date(appointment.appointment_dateTime);
    const selectedDate = new Date(bookData.appDateTime);
    
    return !(appointment.assigned_doctor_id === selectedDoctor.employee_ID && appointmentDate.getTime() === selectedDate.getTime());
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
      branch_name : branch,
      patient_uhid : selectedPatient.uhid,
      doctorId: selectedDoctor.employee_ID,
      doctor_name: selectedDoctor.employee_name,
      appDateTime: bookData.appDateTime,
      treatment: selectedTreatment,
      notes: bookData.notes,
      status : "Appoint",
      appointment_created_by: currentUser.employee_name,
      appointment_created_by_emp_id: currentUser.employee_ID
    };
  

    if (!isDoctorAvailable(selectedDateTime)) {
      // Doctor is not available at the specified time


      const confirmation = window.confirm("The selected doctor is not available at the specified time. Do you want to proceed with booking?");
      if (!confirmation) {
        return; // If the user cancels, return early
      }

    }

    try{
      const response = await axios.post('http://localhost:4000/api/v1/receptionist/book-appointment',newAppointment);
      console.log(response);
      if(response.data.success){
        alert(response?.data?.message);
        dispatch(toggleTableRefresh());
       }
       else{
        alert(response?.data?.message);
       }

   }
   catch(error){
     console.log(error)
        alert(error?.response?.data?.message);

   }
    // setAppointmentData([...appointment_data,newAppointment]);
    // Reset form data
    

    // Reset selected doctor
    // setSelectedDoctor(null);

    // console.log("Appointment booked successfully!");
    // alert("Appointment booked successfully!");
  } else {
    // Slot is not available
    alert("The selected doctor's slot is already booked at the specified time");
    console.log("The selected doctor's slot is already booked at the specified time");
  }
 }


 

// const handleBook = (e) => {
//     e.preventDefault();
  
//     // Check if the selected doctor is null
//     if (!selectedDoctor) {
//       console.log("Please select a doctor");
//       return;
//     }
  
//     // Convert appointment time to Date object
//     const selectedDateTime = new Date(bookData.appDateTime);
  
//     // Check if the selected doctor is available during the appointment time
//     const isDoctorAvailable = (selectedDateTime) => {
//       const morningStart = new Date(selectedDateTime);
//       morningStart.setHours(
//         selectedDoctor.morningStartTiming.split(":")[0],
//         selectedDoctor.morningStartTiming.split(":")[1]
//       );
//       const morningEnd = new Date(selectedDateTime);
//       morningEnd.setHours(
//         selectedDoctor.morningEndTiming.split(":")[0],
//         selectedDoctor.morningEndTiming.split(":")[1]
//       );
//       const eveningStart = new Date(selectedDateTime);
//       eveningStart.setHours(
//         selectedDoctor.eveningStartTiming.split(":")[0],
//         selectedDoctor.eveningStartTiming.split(":")[1]
//       );
//       const eveningEnd = new Date(selectedDateTime);
//       eveningEnd.setHours(
//         selectedDoctor.eveningEndTiming.split(":")[0],
//         selectedDoctor.eveningEndTiming.split(":")[1]
//       );
  
//       return (
//         (selectedDateTime >= morningStart && selectedDateTime <= morningEnd) ||
//         (selectedDateTime >= eveningStart && selectedDateTime <= eveningEnd)
//       );
//     };
  
//     // Check if the appointment slot is available
//     const isSlotAvailable = appointment_data.every((appointment) => {
//       // Check if the appointment is for the selected doctor and if it falls within the same datetime range
//       const appointmentDate = new Date(appointment.timing);
//       const selectedDate = new Date(bookData.appDateTime);
  
//       return !(
//         appointment.doctorId === selectedDoctor.uid &&
//         appointmentDate.getTime() === selectedDate.getTime()
//       );
//     });
  
//     // Check if the selected appointment date matches with the doctor's block day
//     const isBlockDayMatched =
//       selectedDoctor.scheduleBlockDays ===
//       selectedDateTime.toLocaleDateString("en-US");
  
//     if (isSlotAvailable && isDoctorAvailable(selectedDateTime) && !isBlockDayMatched) {
//       // Slot is available, proceed with booking
//       const newAppointment = {
//         patient_uid: selectedPatient.uid,
//         patient_Name: selectedPatient.patient_Name,
//         doctorId: selectedDoctor.uid,
//         doctor_name: selectedDoctor.doctor_name,
//         appDateTime: bookData.appDateTime,
//         treatment: selectedTreatment,
//         notes: bookData.notes,
//         status: "apoint",
//       };
  
//       setAppointmentData([...appointment_data, newAppointment]);
//       console.log("Appointment booked successfully!");
//       alert("Appointment booked successfully!");
//     } else {
//       // Slot is not available or doctor is not available or appointment date matches with the doctor's block day
//       if (!isSlotAvailable) {
//         alert("The selected doctor's slot is already booked at the specified time");
//         console.log("The selected doctor's slot is already booked at the specified time");
//       } else if (!isDoctorAvailable(selectedDateTime)) {
//         alert("The selected doctor is not available at the specified time");
//         console.log("The selected doctor is not available at the specified time");
//       } else if (isBlockDayMatched) {
//         alert("The selected doctor has a scheduled block on this day");
//         console.log("The selected doctor has a scheduled block on this day");
//       }
//     }
//   };
  

 
  return (
    <Wrapper>
                <form onSubmit={handleBookAppointment}>
                <ul className="list-group">
                 
                  <li className="list-group-item">
                 
                  <input
                    class="form-control mr-sm-2 mt-3 mb-2 m-auto"
                    type="search"
                    placeholder="Search Patient Name or Mobile"
                    aria-label="Search"
                    value={searchQuery}
                    onChange={handleSearch}
                  />
                   <PatientList>
                   <ul className="list-group" >
                      {filteredPatients.map((patient) => (
                        <li key={patient.uid}
                        className={`list-group-item ${selectedPatient && selectedPatient.uhid === patient.uhid ? "active" : ""}`} // Add 'active' class if the patient is selected
            onClick={() => handlePatientSelect(patient)} // Call handlePatientSelect function when the patient is clicked 
                        >
                     {patient.uhid} {"-"}{patient.patient_name}{"-"} Mobile : {patient.mobileno}
                          {/* Display other patient details as needed */}
                        </li>
                      ))}
                    </ul>
                    </PatientList>
                    
                    <div className="row mt-5">
                      <div className="col-sm-6">
                        <div className="form-outline" id="form1">
                        <label className="form-label" for="form6Example1">
                            Patient name
                          </label>
                          <input
                            type="text"
                            id="form6Example1"
                            className="form-control"
                            value={selectedPatient ? selectedPatient.patient_name : ""}
                            required
                          />
                          

                         
                        </div>
                      </div>
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
                          <label className="form-label" for="form6Example2">Appointment Date</label>
      <input
        type="date"
        value={selectedDate}
        className="form-control"
        onChange={handleDateChange}
        required
      />
                         
                        </div>
                      </div>
                      <div className="col-sm-6 ">
                        <div className="form-outline">
                        
                        <label  className="form-label" for="form6Example2">Appointment Time</label>
      <Select
        options={timeSlots}
        required
        value={timeSlots.find(slot => slot.value === bookData.appDateTime.split('T')[1])}
        onChange={(selectedOption) => setBookData({ ...bookData, appDateTime: `${selectedDate}T${selectedOption.value}` })}
      />
                         
                        </div>
                      </div>
                      
                      <div className="col-sm-6">
                        <div className="form-outline">

                        <label className="form-label" for="form6Example1">
                            Doctor
                          </label>
                          
                          <input
                            type="search"
                            id="form6Example1"
                            className="form-control"
                            value={searchDoctor}
                    onChange={handleSearchDoctor}
                    required
                    
                  

                          />
                          <DoctorList>
                          <div >
                          
                          <ul className="list-group">
                      {searchDoctor && filteredDoctor.map((doctor) => (
                        <li key={doctor.employee_ID}
                        className={`list-group-item ${selectedDoctor && selectedDoctor.employee_ID === doctor.employee_ID ? "active" : ""}`} // Add 'active' class if the patient is selected
            onClick={() => handleDoctorSelect(doctor)} // Call handlePatientSelect function when the patient is clicked 
                        >
                          {doctor.employee_name} {"-"} Id: {doctor.employee_ID}
                          {/* Display other patient details as needed */}
                        </li>
                      ))}
                    </ul>

                    </div>
                    </DoctorList>
                          
                        </div>
                      
                      </div>
                      <div className="col-sm-6">
                        <div className="form-outline" id="form1">
                        <label className="form-label" for="form6Example2">
                            Add Treatment
                          </label>
                          <Select
        id="treatment"
        name="treatment"
        required
        options={treatments}
        value={selectedTreatment ? { value: selectedTreatment, label: selectedTreatment } : null}
        onChange={handleChangeTreatment}
        
        
      />
                          
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-outline">
                        <label className="form-label" for="form6Example1">
                            Notes
                          </label>
                          <input
                            type="text"
                            id="form6Example1"
                            className="form-control"
                            onChange={handleBookChange}
                            name="notes"
                          />
                         
                        </div>
                      </div>
                      <div className="col-sm-6">
                     
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
                     </div>
                     <div className="d-flex ">
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

                     <div className="formbtn d-flex justify-content-center">
                        <button className="btn btn-success " type="submit" id="btn2">
                          {" "}
                          Book Appointment
                        </button>
                        </div>
                    </div>
                    
                  </li>
                </ul>
                </form>      
    </Wrapper>
  );
}

export default BookAppointment;

const Wrapper = styled.div`

  
 position: relative;
  #section3 {
    @media screen and (max-width: 768px) {
      margin-top: 1rem;
      width: 20rem;
    
    }
    @media screen and (min-width: 768px) and (max-width: 1020px)  {
      width: 41rem;
    }
  }
    .formbtn {
      margin-top: 1rem;
      
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
        margin-left: 1rem;
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
    #myTabContent{
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

