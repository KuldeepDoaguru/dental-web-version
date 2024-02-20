import React, { useEffect, useState } from "react";
import styled from "styled-components";

function Doctor() {
  
  const [date,setDate] = useState(new Date().toISOString().split('T')[0]) ; // Set default date to today's date
  const [searchQuery, setSearchQuery] = useState("");
  const [timeSlots, setTimeSlots] = useState([]);
  
  const doctors = [
    { uid :"1", doctor_name:"Dr Umer Qureshi",department:"ortho", mobile: "9806324245", email:"doctor@gmail.com",gender:"Male",address:"Ranital Gate no.4 Jabalpur", startTiming:"10:00" ,endTiming:"18:00", scheduleBlockDays:"20/02/2024",lunchTime: ""},
    { uid :"10", doctor_name:"Dr Umer Qureshi",department:"ortho", mobile: "9806324245", email:"doctor@gmail.com",gender:"Male",address:"Ranital Gate no.4 Jabalpur" ,startTiming:"10:00" ,endTiming:"20:00", scheduleBlockDays:"02/02/2024",lunchTime: ""},
    { uid :"2", doctor_name:"Dr Ajay",department:"ortho", mobile: "9806324245", email:"doctor@gmail.com",gender:"Male",address:"Ranital Gate no.4 Jabalpur" ,startTiming:"10:00" ,endTiming:"20:00", scheduleBlockDays:"02/02/2024",lunchTime: ""},
    { uid :"4", doctor_name:"Dr Ajay",department:"ortho", mobile: "9806324245", email:"doctor@gmail.com",gender:"Male",address:"Ranital Gate no.4 Jabalpur" ,startTiming:"10:00" ,endTiming:"20:00", scheduleBlockDays:"02/04/2024",lunchTime: ""},
    { uid :"5", doctor_name:"Dr Ajay",department:"ortho", mobile: "9806324245", email:"doctor@gmail.com",gender:"Male",address:"Ranital Gate no.4 Jabalpur" ,startTiming:"10:00" ,endTiming:"20:00", scheduleBlockDays:"02/04/2024",lunchTime: ""},
    { uid :"6", doctor_name:"Dr Ajay",department:"ortho", mobile: "9806324245", email:"doctor@gmail.com",gender:"Male",address:"Ranital Gate no.4 Jabalpur" ,startTiming:"10:00" ,endTiming:"20:00", scheduleBlockDays:"02/04/2024",lunchTime: ""},
    { uid :"7", doctor_name:"Dr Ajay",department:"ortho", mobile: "9806324245", email:"doctor@gmail.com",gender:"Male",address:"Ranital Gate no.4 Jabalpur" ,startTiming:"10:00" ,endTiming:"20:00", scheduleBlockDays:"02/04/2024",lunchTime: ""},
    { uid :"8", doctor_name:"Dr Ajay",department:"ortho", mobile: "9806324245", email:"doctor@gmail.com",gender:"Male",address:"Ranital Gate no.4 Jabalpur" ,startTiming:"10:00" ,endTiming:"20:00", scheduleBlockDays:"20/02/2024",lunchTime: ""}
    

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
    
  }
  console.log(availableDoctor)
  useEffect(()=>{
    filterDoctor();
  },[date,searchQuery])

    // Function to format the date from "YYYY-MM-DD" to "DD-MM-YYYY"
    const formatDate = (dateString) => {
      const [year, month, day] = dateString.split("-");
      return `${day}-${month}-${year}`;
    };

    const handleSearchChange = (e) => {
      setSearchQuery(e.target.value);
    };



    // gerate time slots
    const handleGerateSlots = (selectedDate) => {
      // Clear any previous time slots
      setTimeSlots([]);
    
      // Loop through each doctor to generate time slots
      doctors.forEach((doctor) => {
        const startTime = new Date(date);
        const endTime = new Date(date);
        const [startHour, startMinute] = doctor.startTiming.split(":").map(Number);
        const [endHour, endMinute] = doctor.endTiming.split(":").map(Number);
    
        // Set start and end time
        startTime.setHours(startHour, startMinute, 0);
        endTime.setHours(endHour, endMinute, 0);
    
        const slots = [];
        let currentTime = new Date(startTime);
    
        // Generate time slots every 15 minutes within doctor's start and end time
        while (currentTime < endTime) {
          const timeSlot = currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
          const dateTimeSlot = `${date} ${timeSlot}`; // Concatenate date and time
          slots.push(dateTimeSlot);
          currentTime.setMinutes(currentTime.getMinutes() + 15); // Add 15 minutes
        }
    
        // Add time slots for the current doctor to the state
        setTimeSlots(prevSlots => [...prevSlots, {doctorId:doctor.uid, doctorName: doctor.doctor_name, slots }]);
      });
    };

    useEffect(()=>{
         handleGerateSlots();
    },[date])

    console.log(timeSlots)

  return (
    <Wrapper>
      <div className="widget-area-2 proclinic-box-shadow bg-white">
        <h3 className="widget-title text-center">Doctor Available for {formatDate(date)}</h3>
        <div className="d-flex px-2 gap-1">
        <input type="date" class="form-control mr-sm-2 mt-3 mb-2 w-75 m-auto"   value={date} onChange={(e)=>setDate(e.target.value)}/>
        <input class="form-control mr-sm-2 mt-3 mb-2 w-75 m-auto" type="search" placeholder="Search" aria-label="Search"  onChange={handleSearchChange}/>
        </div>
      
      
    
        <div className="table-responsive" id="tab">
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>S:NO</th>
                <th>Doctor</th>
                <th>No. of App.</th>
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

// Filter out time slots where there are no overlapping appointments
const availableSlots = doctorTimeSlots.slots.filter(slot => {
  // Check if any appointment overlaps with the current slot
  return !doctorAppointments.some(appointment => {
    const slotTime = new Date(slot).getTime();
    const appointmentTime = new Date(appointment.timing).getTime();
    // Check if the appointment timing overlaps with the current slot
    return appointmentTime === slotTime;
  });
 
});
console.log(availableSlots)
    return (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{doctor.doctor_name}</td>
        <td>{doctorAppointments.length}</td> {/* Display number of appointments */}
        <td>
        <select className="form-select">
          {/* Display available time slots for the current doctor */}
          {availableSlots && availableSlots.map((slot, i) => (
            <option key={i} value={slot}>{slot}</option>
          ))}
        </select>
        </td>
      </tr>
    );
  })}
             
             
             
              
             
             
            
             
         
             
            </tbody>
          </table>
        </div>
      </div>
     <div className="d-flex justify-content-center mt-1">
  <ul className="pagination">
    <li className="page-item">
      <a className="page-link">Previous</a>
    </li>
    <li className="page-item"><a className="page-link" href="#">1</a></li>
    <li className="page-item active" aria-current="page">
      <a className="page-link" href="#">2</a>
    </li>
    <li className="page-item"><a className="page-link" href="#">3</a></li>
    <li className="page-item">
      <a className="page-link" href="#">Next</a>
    </li>
  </ul>
  </div> 

    </Wrapper>
  );
}

export default Doctor;
const Wrapper = styled.div`
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
`
