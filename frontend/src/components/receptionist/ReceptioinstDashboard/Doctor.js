import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from 'react-redux';
import { toggleTableRefresh } from '../../../redux/user/userSlice';
import axios from "axios";
import moment from "moment";
import { FaUserDoctor } from "react-icons/fa6";

function Doctor() {
  
  const [date,setDate] = useState(new Date().toISOString()?.split('T')[0]) ; // Set default date to today's date
  const [searchQuery, setSearchQuery] = useState("");
  const [timeSlots, setTimeSlots] = useState([]);

  const dispatch = useDispatch();
  const {refreshTable,currentUser} = useSelector((state) => state.user);
  const token = currentUser?.token;
  const  branch = currentUser.branch_name
  const [patients, setPatients] = useState([]);
  const [doctors,setDoctors] = useState([]);
  const [appointmentsData,setAppointmentsData] = useState([]);
  const [branchDetail,setBranchDetail] = useState([]);
  const [weekOffDay,setWeekOffDay] = useState("");
  const [branchHolidays,setBranchHolidays] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null); // State to store the selected Doctor
  const [searchDoctor, setSearchDoctor] = useState("");

 
  const filteredAppointmentData = appointmentsData.filter(appointment => 
       appointment.appointment_status !== "Cancel"
  )
  console.log(filteredAppointmentData);

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

  // Function to format date in YYYY-MM-DD format
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
 
  const [selectedDate, setSelectedDate] = useState(formatDate(new Date()));

  const getDoctors = async ()=>{
    try{
      const response = await axios.get(`https://dentalgurureceptionist.doaguru.com/api/v1/receptionist/get-doctors/${branch}` ,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
      }
      });
      setDoctors(response?.data?.data)
    }
    catch(error){
      console.log(error)
    }
  }

  const getPatient = async () =>{
    try{
      const response = await axios.get(`https://dentalgurureceptionist.doaguru.com/api/v1/receptionist/get-Patients/${branch}` ,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
      }
      });
      console.log(response);
      setPatients(response?.data?.data)
     }
     catch(error){
        console.log(error)
     }
    
  }

  
  const getAppointments = async ()=>{
    try{
      const response = await axios.get(`https://dentalgurureceptionist.doaguru.com/api/v1/receptionist/get-appointments/${branch}` ,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
      }
      });
      setAppointmentsData(response?.data?.data)
    }
    catch(error){
      console.log(error)
    }
  }

  const [doctorWithLeave,setDoctorWithLeave] = useState([]);
  const getDoctorsWithLeave = async ()=>{
    try{
      const response = await axios.get(`https://dentalgurureceptionist.doaguru.com/api/v1/receptionist/get-doctors-with-leave/${branch}` ,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
      }
      });
      setDoctorWithLeave(response?.data?.data)
    }
    catch(error){
      console.log(error)
    }
  }

  const getBranchDetail = async ()=>{
    try{
       const response = await axios.get(`https://dentalgurureceptionist.doaguru.com/api/v1/receptionist/get-branch-detail/${branch}`)
       console.log(response)
       setBranchDetail(response.data.data)
    }
    catch(error){
      console.log(error)
    }
  }
  const getBranchHolidays = async ()=>{
    try{
       const response = await axios.get(`https://dentalgurureceptionist.doaguru.com/api/v1/receptionist/get-branch-holidays/${branch}` ,
       {
         headers: {
           'Content-Type': 'application/json',
           'Authorization': `Bearer ${token}`
       }
       })
       console.log(response)
       setBranchHolidays(response.data.data)
    }
    catch(error){
      console.log(error)
    }
  }
 

  useEffect(()=>{
    getPatient();
    
    getDoctors();
    getAppointments();
    getDoctorsWithLeave();
    getBranchDetail();
    getBranchHolidays();
    handleGenrateSlots();
    filterDoctor();
    
 },[]);

 useEffect(()=>{
  handleWeekOfDay(branchDetail[0]?.week_off);
},[branchDetail]);

useEffect(()=>{
  getPatient();
  getAppointments();
  handleGenrateSlots();
},[refreshTable])



useEffect(()=>{
  handleGenrateSlots();
},[selectedDate])
const [availableDoctorOnDate,setAvailableDoctorOnDate] = useState([]);


useEffect(() => {
  setSearchDoctor("");
  setSelectedDoctor(null)
  if(!selectedDate){
   setSelectedDate(formatDate(new Date()))
    
  }
  
  const selectedDateTime = new Date(selectedDate);
  
  const filteredDoctors = doctors.filter(doctor => {
    // Find all leave entries for the current doctor
    const doctorLeaveEntries = doctorWithLeave.filter(doc => doc.employee_ID === doctor.employee_ID);
    
    // If the doctor has leave entries, check if the selected date falls within any of them
    if (doctorLeaveEntries.length > 0) {
      return !doctorLeaveEntries.some(entry => {
        const leaveDates = entry.leave_dates?.split(',');
        console.log(leaveDates);
        console.log(moment(selectedDateTime).format('YYYY-MM-DD'))
        return leaveDates.includes(moment(selectedDateTime).format('YYYY-MM-DD') );
      });
    }
 
    // If the doctor has no leave entries, include them in the filtered array
    return true;
  });

  setAvailableDoctorOnDate(filteredDoctors);
}, [selectedDate, doctorWithLeave, doctors]);


const handleGenrateSlots = () => {
  // Clear any previous time slots
  setTimeSlots([]);
 console.log(selectedDate)
 console.log(availableDoctorOnDate)

  // Loop through each doctor to generate time slots
  availableDoctorOnDate?.forEach((doctor) => {
   
    // for genrate morning time slots
    const morningStartTime = new Date(selectedDate);
    const morningEndTime = new Date(selectedDate);
    const [morningStartHour, morningStartMinute] = doctor?.morning_shift_start_time?.split(":")?.map(Number);
    const [morningEndHour, MorningEndMinute] = doctor?.morning_shift_end_time?.split(":")?.map(Number);

    // Set start and end time
    morningStartTime.setHours(morningStartHour, morningStartMinute, 0);
    morningEndTime.setHours(morningEndHour, MorningEndMinute, 0);

    const morningSlots = [];
    let currentTime = new Date(morningStartTime);

    // Generate time slots every 15 minutes within doctor's start and end time
    while (currentTime < morningEndTime) {
      const timeSlot = currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
      const dateTimeSlot = `${selectedDate} ${timeSlot}`; // Concatenate date and time
      morningSlots.push(dateTimeSlot);
      currentTime.setMinutes(currentTime.getMinutes() + parseInt(branchDetail[0]?.appoint_slot_duration?.split(" ")[0])); // Add 15 minutes
    }

    // for genrate evening time slots
    const eveningStartTime = new Date(selectedDate);
    const eveningEndTime = new Date(selectedDate);
    const [eveningStartHour, eveningStartMinute] = doctor?.evening_shift_start_time?.split(":")?.map(Number);
    const [eveningEndHour, eveningEndMinute] = doctor?.evening_shift_end_time?.split(":")?.map(Number);

    // Set start and end time
    eveningStartTime.setHours(eveningStartHour, eveningStartMinute, 0);
    eveningEndTime.setHours(eveningEndHour, eveningEndMinute, 0);

    const eveningSlots = [];
    let currentTime1 = new Date(eveningStartTime);

    // Generate time slots every 15 minutes within doctor's start and end time
    while (currentTime1 < eveningEndTime) {
      const timeSlot = currentTime1?.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
      const dateTimeSlot = `${selectedDate} ${timeSlot}`; // Concatenate date and time
      eveningSlots.push(dateTimeSlot);
      currentTime1.setMinutes(currentTime1.getMinutes() + parseInt(branchDetail[0]?.appoint_slot_duration?.split(" ")[0])); // Add 15 minutes
    }

    // Add time slots for the current doctor to the state
    setTimeSlots(prevSlots => [...prevSlots, {doctorId:doctor.employee_ID, doctorName: doctor.employee_name, morningSlots ,eveningSlots }]);
  });
};



useEffect(() => {
  // Call handleGenrateSlots when availableDoctorOnDate changes
  handleGenrateSlots();
}, [availableDoctorOnDate]);


  const [filteredDoctor,setFilteredDoctor] = useState();

  const filterDoctor = () => {
    if (searchDoctor.trim() !== "") {
      const filteredDoctors = availableDoctorOnDate.filter((doctor) => {
        return doctor.employee_name.toLowerCase().includes(searchDoctor.toLowerCase().trim());
      });
      setFilteredDoctor(filteredDoctors);
    } else {
      setFilteredDoctor(availableDoctorOnDate);
    }
  
    
  };

    const handleSearchChange = (e) => {
      setSearchDoctor(e.target.value);
    };

    useEffect(() => {
      filterDoctor();
    }, [searchDoctor,availableDoctorOnDate]);
  



   

    

 

    console.log(timeSlots)
    console.log(appointmentsData)
    
  return (
    <Wrapper>
      <div className="shadow widget-area-2 proclinic-box-shadow rounded bg-white px-1 main">
     
        <h3 className="widget-title text-center fw-bold"> Doctors Available for { moment(selectedDate).format('DD/MM/YYYY')}</h3>
        <div className="d-flex px-2 gap-1">
        <input type="date" 
         class="form-control mr-sm-2 mt-3 mb-2 w-75 m-auto"
         min={formatDate(new Date())} // Set min attribute to today's date   
         value={selectedDate} onChange={(e)=>setSelectedDate(e.target.value)}/>
        <input class="form-control mr-sm-2 mt-3 mb-2 w-75 m-auto" type="search" placeholder="Search Doctor" aria-label="Search"  onChange={handleSearchChange}/>
        </div>
      
      
    
        <div className="table-responsive" id="tab">
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                {/* <th style={{fontSize:"12px"}}>No.</th> */}
                <th>Doctor Name</th>
                <th>Apps.</th>
                <th>Available Slots</th>
              </tr>
            </thead>
            <tbody>
              {filteredDoctor?.map((doctor,index)=>{
    // Filter appointment data for the current doctor
    const doctorAppointments = filteredAppointmentData.filter(
      (appointment) => appointment.assigned_doctor_id === doctor.employee_ID && 
      appointment.appointment_dateTime.includes(selectedDate)
    );
     
    // Find the time slots for the current doctor from the timeSlots state
const doctorTimeSlots = timeSlots.find(slot => slot.doctorId === doctor.employee_ID);



// Filter out morning time slots where there are no overlapping appointments
const availableMorningSlots = doctorTimeSlots?.morningSlots.filter(slot => {
  // Check if any appointment overlaps with the current slot
  return !doctorAppointments.some(appointment => {
    const slotTime = new Date(slot).getTime();
    const appointmentTime = new Date(appointment.appointment_dateTime).getTime();
    // Check if the appointment timing overlaps with the current slot
    console.log(new Date(slot));
    console.log(new Date(appointment.appointment_dateTime));
    return appointmentTime === slotTime;
  });
 
});
// Filter out evening time slots where there are no overlapping appointments
const availableEveningSlots = doctorTimeSlots?.eveningSlots.filter(slot => {
  // Check if any appointment overlaps with the current slot
  return !doctorAppointments.some(appointment => {
    const slotTime = new Date(slot).getTime();
    const appointmentTime = new Date(appointment.appointment_dateTime).getTime();
    // Check if the appointment timing overlaps with the current slot
    
    return appointmentTime === slotTime;
  });
 
});

    return (
      <tr key={index}>
        {/* <td>{index + 1}</td> */}
        <td className="text-capitalize">{"Dr. "} {doctor.employee_name}</td>
        <td>{doctorAppointments.length}</td> {/* Display number of appointments */}
        <td>
         
         <div className="d-flex">
        <select className="form-select" style={{ cursor: "pointer"}}>
        <option value="Morning">Morning</option>
          {/* Display available time slots for the current doctor */}
          {availableMorningSlots && availableMorningSlots?.map((slot, i) => (
            <option key={i} value={slot} disabled>{new Date(slot).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</option>
          ))}
        </select>
          
        
        
        <select className="form-select" style={{cursor: "pointer"}}>
          {/* Display available time slots for the current doctor */}
          <option value="Morning">Evening</option>
          {availableEveningSlots && availableEveningSlots?.map((slot, i) => (
            <option key={i} value={slot} disabled>{new Date(slot).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</option>
          ))}
        </select>
        </div>
        
         
        </td>
      </tr>
    );
  })}
             
             
             
              
             
             
            
             
         
             
            </tbody>
          </table>
        </div>
      </div>
     

    </Wrapper>
  );
}

export default Doctor;
const Wrapper = styled.div`
width: 110%;

@media screen and (max-width: 768px) {
   width: auto;
   margin-bottom: 20px;
   
  }
  @media screen and (min-width: 768px) and (max-width: 1020px)  {
    width: auto;
    margin-bottom: 20px;
    }

.main{
  @media screen and (max-width: 768px)  {
   width: 75%;
   margin: auto;
  }
  @media screen and (min-width: 768px) and (max-width: 1020px)  {
    width: 75%;
    margin: auto;
    min-height: 400px;
    }
}

#tab{
  @media screen and (max-width: 768px)  {
   width: 90%;
  }
  @media screen and (min-width: 768px) and (max-width: 1020px)  {
      width: 90%;
      margin: auto;
    }
    @media screen and (min-width: 1020px) and (max-width: 1300px) {
   height: 25.5rem;
  }
  @media screen and (min-width: 1300px) and (max-width: 2500px) {
   height: 25.2rem;
  }
}
.widget-title{
  font-size: 18px;
  padding-top: 10px;
  @media screen and (min-width: 1020px) and (max-width: 1300px) {
    font-size: 15px;
  }
  
  @media screen and (max-width: 768px)  {
   margin-top: 15px;
   font-size: 20px;
  }
}
th{
  font-size: 13px;
  font-weight: 500;
  white-space: nowrap;
}
td{
  white-space: nowrap;
  font-size: 14px;
  
}


`
