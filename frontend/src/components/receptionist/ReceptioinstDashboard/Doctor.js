import React, { useEffect, useState } from "react";
import styled from "styled-components";

function Doctor() {
  
  const [date,setDate] = useState(new Date().toISOString().split('T')[0]) ; // Set default date to today's date
  const [searchQuery, setSearchQuery] = useState("");
  const [timeSlots, setTimeSlots] = useState([]);

  
  
  const doctors = [
    { uid :"1", doctor_name:"Dr Umer Qureshi",department:"ortho", mobile: "9806324245", email:"doctor@gmail.com",gender:"Male",address:"Ranital Gate no.4 Jabalpur", morningStartTiming:"10:00" ,morningEndTiming:"14:00",eveningStartTiming:"18:00" ,eveningEndTiming:"21:00",  scheduleBlockDays:"20/02/2024",lunchTime: ""},
    { uid :"10", doctor_name:"Dr Rajiv",department:"ortho", mobile: "9806324245", email:"doctor@gmail.com",gender:"Male",address:"Ranital Gate no.4 Jabalpur" ,morningStartTiming:"10:00" ,morningEndTiming:"12:00",eveningStartTiming:"18:00" ,eveningEndTiming:"22:00", scheduleBlockDays:"02/02/2024",lunchTime: ""},
    { uid :"2", doctor_name:"Dr Ajay",department:"ortho", mobile: "9806324245", email:"doctor@gmail.com",gender:"Male",address:"Ranital Gate no.4 Jabalpur" ,morningStartTiming:"10:00" ,morningEndTiming:"18:00",eveningStartTiming:"10:00" ,eveningEndTiming:"18:00", scheduleBlockDays:"02/02/2024",lunchTime: ""},
    { uid :"4", doctor_name:"Dr Ajay",department:"ortho", mobile: "9806324245", email:"doctor@gmail.com",gender:"Male",address:"Ranital Gate no.4 Jabalpur" ,morningStartTiming:"10:00" ,morningEndTiming:"18:00",eveningStartTiming:"10:00" ,eveningEndTiming:"18:00", scheduleBlockDays:"02/04/2024",lunchTime: ""},
    { uid :"5", doctor_name:"Dr Ajay",department:"ortho", mobile: "9806324245", email:"doctor@gmail.com",gender:"Male",address:"Ranital Gate no.4 Jabalpur" ,morningStartTiming:"10:00" ,morningEndTiming:"18:00",eveningStartTiming:"10:00" ,eveningEndTiming:"18:00", scheduleBlockDays:"02/04/2024",lunchTime: ""},
    { uid :"6", doctor_name:"Dr Ajay",department:"ortho", mobile: "9806324245", email:"doctor@gmail.com",gender:"Male",address:"Ranital Gate no.4 Jabalpur" ,morningStartTiming:"10:00" ,morningEndTiming:"18:00",eveningStartTiming:"10:00" ,eveningEndTiming:"18:00", scheduleBlockDays:"02/04/2024",lunchTime: ""},
    { uid :"7", doctor_name:"Dr Ajay",department:"ortho", mobile: "9806324245", email:"doctor@gmail.com",gender:"Male",address:"Ranital Gate no.4 Jabalpur" ,morningStartTiming:"10:00" ,morningEndTiming:"18:00",eveningStartTiming:"10:00" ,eveningEndTiming:"18:00", scheduleBlockDays:"02/04/2024",lunchTime: ""},
    { uid :"8", doctor_name:"Dr Ajay",department:"ortho", mobile: "9806324245", email:"doctor@gmail.com",gender:"Male",address:"Ranital Gate no.4 Jabalpur" ,morningStartTiming:"10:00" ,morningEndTiming:"18:00",eveningStartTiming:"10:00" ,eveningEndTiming:"18:00", scheduleBlockDays:"20/02/2024",lunchTime: ""}
    

  ];

  const appointment_data = [
    { uid :"1", patient:"Mohit Shau",doctorId:"1", doctor:"Dr Umer Qureshi",mobile: "9806324245", treatment:"root canal",timing:"2024-02-17T10:45",status:"Missed",action:"edit"},
    { uid :"1", patient:"Mohit Shau", doctorId:"1",doctor:"Dr Umer Qureshi",mobile: "9806324245", treatment:"root canal",timing:"2024-02-17T10:00",status:"Missed",action:"edit"},
    { uid :"1", patient:"Mohit Shau", doctorId:"1" ,doctor:"Dr Umer Qureshi",mobile: "9806324245", treatment:"root canal",timing:"2024-02-17T11:30",status:"Missed",action:"edit"},
    { uid :"1", patient:"Mohit Shau",doctorId:"2", doctor:"Dr Ajay",mobile: "9806324245", treatment:"root canal",timing:"2024-02-17T12:30",status:"Missed",action:"edit"},
    { uid :"1", patient:"Mohit Shau",doctorId:"1", doctor:"Dr Umer Qureshi",mobile: "9806324245", treatment:"root canal",timing:"2024-02-17T12:45",status:"Missed",action:"edit"},
    { uid :"1", patient:"Mohit Shau",doctorId:"2", doctor:"Dr Ajay",mobile: "9806324245", treatment:"root canal",timing:"2024-02-18T10:45",status:"Missed",action:"edit"},
    { uid :"1", patient:"Mohit Shau",doctorId:"1", doctor:"Dr Umer Qureshi",mobile: "9806324245", treatment:"root canal",timing:"2024-02-18T12:00",status:"Missed",action:"edit"},
    { uid :"1", patient:"Mohit Shau",doctorId:"1", doctor:"Dr Umer Qureshi",mobile: "9806324245", treatment:"root canal",timing:"2024-02-18T13:00",status:"Missed",action:"edit"},
    { uid :"1", patient:"Mohit Shau",doctorId:"2", doctor:"Dr Ajay",mobile: "9806324245", treatment:"root canal",timing:"2024-02-18T13:00",status:"Missed",action:"edit"},

    
  ];
  
  const [availableDoctor,setAvailableDoctor] = useState();

  const [filteredDoctor,setFilteredDoctor] = useState();

  const filterDoctor = ()=>{
    const filteredDoctors = doctors.filter((doctor) => {
      const [day, month, year] = doctor.scheduleBlockDays.split("/");
      const doctorDateString = `${year}-${month}-${day}`;
      console.log(doctorDateString);
      console.log(date);
      // return doctorDateString !== date;
      return doctorDateString != date && doctor.doctor_name.toLowerCase().includes(searchQuery.toLowerCase());
    });

    setAvailableDoctor(filteredDoctors)
    setFilteredDoctor(filteredDoctor)
    
  }
  console.log(availableDoctor)
 

    // Function to format the date from "YYYY-MM-DD" to "DD-MM-YYYY"
    const formatDate = (dateString) => {
      const [year, month, day] = dateString.split("-");
      return `${day}-${month}-${year}`;
    };

    const handleSearchChange = (e) => {
      setSearchQuery(e.target.value);
    };

   
  

  


   
 

    useEffect(()=>{
      filterDoctor();
    },[date,searchQuery])

    // gerate time slots
    // const handleGenrateSlots = (selectedDate) => {
    //   // Clear any previous time slots
    //   setTimeSlots([]);
    
    //   // Loop through each doctor to generate time slots
    //   doctors.forEach((doctor) => {
    //     const startTime = new Date(date);
    //     const endTime = new Date(date);
    //     const [startHour, startMinute] = doctor.morningStartTiming.split(":").map(Number);
    //     const [endHour, endMinute] = doctor.morningEndTiming.split(":").map(Number);
    
    //     // Set start and end time
    //     startTime.setHours(startHour, startMinute, 0);
    //     endTime.setHours(endHour, endMinute, 0);
    
    //     const slots = [];
    //     let currentTime = new Date(startTime);
    
    //     // Generate time slots every 15 minutes within doctor's start and end time
    //     while (currentTime < endTime) {
    //       const timeSlot = currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    //       const dateTimeSlot = `${date} ${timeSlot}`; // Concatenate date and time
    //       slots.push(dateTimeSlot);
    //       currentTime.setMinutes(currentTime.getMinutes() + 15); // Add 15 minutes
    //     }
    
    //     // Add time slots for the current doctor to the state
    //     setTimeSlots(prevSlots => [...prevSlots, {doctorId:doctor.uid, doctorName: doctor.doctor_name, slots }]);
    //   });
    // };

    const handleGenrateSlots = (selectedDate) => {
      // Clear any previous time slots
      setTimeSlots([]);
    
      // Loop through each doctor to generate time slots
      doctors.forEach((doctor) => {

        // for genrate morning time slots
        const morningStartTime = new Date(date);
        const morningEndTime = new Date(date);
        const [morningStartHour, morningStartMinute] = doctor.morningStartTiming.split(":").map(Number);
        const [morningEndHour, MorningEndMinute] = doctor.morningEndTiming.split(":").map(Number);
    
        // Set start and end time
        morningStartTime.setHours(morningStartHour, morningStartMinute, 0);
        morningEndTime.setHours(morningEndHour, MorningEndMinute, 0);
    
        const morningSlots = [];
        let currentTime = new Date(morningStartTime);
    
        // Generate time slots every 15 minutes within doctor's start and end time
        while (currentTime < morningEndTime) {
          const timeSlot = currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
          const dateTimeSlot = `${date} ${timeSlot}`; // Concatenate date and time
          morningSlots.push(dateTimeSlot);
          currentTime.setMinutes(currentTime.getMinutes() + 15); // Add 15 minutes
        }

        // for genrate evening time slots
        const eveningStartTime = new Date(date);
        const eveningEndTime = new Date(date);
        const [eveningStartHour, eveningStartMinute] = doctor.eveningStartTiming.split(":").map(Number);
        const [eveningEndHour, eveningEndMinute] = doctor.eveningEndTiming.split(":").map(Number);
    
        // Set start and end time
        eveningStartTime.setHours(eveningStartHour, eveningStartMinute, 0);
        eveningEndTime.setHours(eveningEndHour, eveningEndMinute, 0);
    
        const eveningSlots = [];
        let currentTime1 = new Date(eveningStartTime);
    
        // Generate time slots every 15 minutes within doctor's start and end time
        while (currentTime1 < eveningEndTime) {
          const timeSlot = currentTime1.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
          const dateTimeSlot = `${date} ${timeSlot}`; // Concatenate date and time
          eveningSlots.push(dateTimeSlot);
          currentTime1.setMinutes(currentTime1.getMinutes() + 15); // Add 15 minutes
        }
    
        // Add time slots for the current doctor to the state
        setTimeSlots(prevSlots => [...prevSlots, {doctorId:doctor.uid, doctorName: doctor.doctor_name, morningSlots ,eveningSlots }]);
      });
    };

    useEffect(()=>{
         handleGenrateSlots();
    },[date])

    console.log(timeSlots)

  return (
    <Wrapper>
      <div className="widget-area-2 proclinic-box-shadow rounded bg-white px-1 me-2">
        <h3 className="widget-title text-center">Doctor Available for {formatDate(date)}</h3>
        <div className="d-flex px-2 gap-1">
        <input type="date" class="form-control mr-sm-2 mt-3 mb-2 w-75 m-auto"   value={date} onChange={(e)=>setDate(e.target.value)}/>
        <input class="form-control mr-sm-2 mt-3 mb-2 w-75 m-auto" type="search" placeholder="Search Doctor" aria-label="Search"  onChange={handleSearchChange}/>
        </div>
      
      
    
        <div className="table-responsive" id="tab">
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th style={{fontSize:"12px"}}>No.</th>
                <th>Doctor</th>
                <th>App.</th>
                <th>Available Slot</th>
              </tr>
            </thead>
            <tbody>
              {availableDoctor?.map((doctor,index)=>{
    // Filter appointment data for the current doctor
    const doctorAppointments = appointment_data.filter(
      (appointment) => appointment.doctorId === doctor.uid && 
      appointment.timing.includes(date)
    );

    // Find the time slots for the current doctor from the timeSlots state
const doctorTimeSlots = timeSlots.find(slot => slot.doctorId === doctor.uid);

// Filter out morning time slots where there are no overlapping appointments
const availableMorningSlots = doctorTimeSlots.morningSlots.filter(slot => {
  // Check if any appointment overlaps with the current slot
  return !doctorAppointments.some(appointment => {
    const slotTime = new Date(slot).getTime();
    const appointmentTime = new Date(appointment.timing).getTime();
    // Check if the appointment timing overlaps with the current slot
    return appointmentTime === slotTime;
  });
 
});
// Filter out evening time slots where there are no overlapping appointments
const availableEveningSlots = doctorTimeSlots.eveningSlots.filter(slot => {
  // Check if any appointment overlaps with the current slot
  return !doctorAppointments.some(appointment => {
    const slotTime = new Date(slot).getTime();
    const appointmentTime = new Date(appointment.timing).getTime();
    // Check if the appointment timing overlaps with the current slot
    return appointmentTime === slotTime;
  });
 
});
console.log(availableEveningSlots)
    return (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{doctor.doctor_name}</td>
        <td>{doctorAppointments.length}</td> {/* Display number of appointments */}
        <td>
         
         <div className="d-flex">
        <select className="form-select">
        <option value="Morning">Morning</option>
          {/* Display available time slots for the current doctor */}
          {availableMorningSlots && availableMorningSlots.map((slot, i) => (
            <option key={i} value={slot} disabled>{new Date(slot).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</option>
          ))}
        </select>
          
        
        
        <select className="form-select">
          {/* Display available time slots for the current doctor */}
          <option value="Morning">Evening</option>
          {availableEveningSlots && availableEveningSlots.map((slot, i) => (
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

#tab{
  @media screen and (max-width: 768px)  {
   width: 20rem;
  }
  @media screen and (min-width: 768px) and (max-width: 1020px)  {
      width: 41rem;
    }
  @media screen and (min-width: 1020px) and (max-width: 1700px) {
   height: 26rem;
  }
}
.widget-title{
  font-size: 20px;
  
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
