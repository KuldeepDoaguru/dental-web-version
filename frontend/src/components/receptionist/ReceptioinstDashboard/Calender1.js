import React, { useEffect, useState } from 'react'
import Calendar from 'react-calendar';
import "react-calendar/dist/Calendar.css";
import { IoArrowBackCircle } from "react-icons/io5";




import styled from 'styled-components';
import Detail from '../Bill/Detail';
import AppDetail from './AppDetails';
import Popup from '../Appointment/Popup';
import AppDetails from '../Appointment/AppDetail';





function Calender1() {
  const [value, onChange] = useState(new Date());
  const [isDisplay,setIsDisplay] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState("");

  // const [date,setDate] = useState("");
  // Add timeSlots state
const [timeSlots, setTimeSlots] = useState([]);
const [doctorName,setDoctorName] = useState("Dr Umer Qureshi");

console.log(value.toLocaleDateString());


// Update handleDayClick function
const handleDayClick = (selectedDate) => {
  // Clear any previous time slots
  setIsDisplay(true)
  setTimeSlots([]);

  // Generate time slots from 10 am to 8 pm
  const startTime = new Date(selectedDate);
  startTime.setHours(10, 0, 0); // Set start time to 10:00 AM
  const endTime = new Date(selectedDate);
  endTime.setHours(20, 0, 0); // Set end time to 8:00 PM

  const slots = [];
  let currentTime = new Date(startTime);

  // Generate time slots every 15 minutes
  while (currentTime < endTime) {
    const timeSlot = currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    const dateTimeSlot = `${selectedDate.toLocaleDateString()} ${timeSlot}`; // Concatenate date and time
    slots.push(dateTimeSlot);
    currentTime.setMinutes(currentTime.getMinutes() + 15); // Add 15 minutes
  }

  // Update state with the generated time slots
  setTimeSlots(slots);
};


// New function to handle time slot click
const handleTimeSlotClick = (timeSlot) => {
  // Find the appointment associated with the clicked time slot
  const slotTime = new Date(timeSlot);
  const clickedAppointment = appointment_data.find(appointment => {
    // Convert the appointment timing to match the format of time slots
    const appointmentTime = new Date(appointment.timing);
    console.log(appointmentTime)
    console.log(slotTime)
    return (

      
      appointmentTime.getFullYear() === slotTime.getFullYear() &&
      appointmentTime.getMonth() === slotTime.getMonth() &&
      appointmentTime.getDate() === slotTime.getDate() &&
      appointmentTime.getHours() === slotTime.getHours() &&
      appointmentTime.getMinutes() === slotTime.getMinutes() && 

      appointment.doctor === doctorName // Check if doctor's name matches


         
      //  appointmentTime.getTime() === slotTime.getTime()
         // Check if appointment time matches

    );
  });
   
  // Set the selected appointment and open the popup
  if (clickedAppointment) {
    setSelectedAppointment(clickedAppointment);
    setShowPopup(true);
  }
};

// Update handleDayClick function
// const handleDayClick = (selectedDate) => {
//   // Clear any previous time slots
//   setTimeSlots([]);
//   setIsDisplay(true)

//   // Generate time slots from 10 am to 8 pm
//   const startTime = new Date(selectedDate);
//   startTime.setHours(10, 0, 0); // Set start time to 10:00 AM
//   const endTime = new Date(selectedDate);
//   endTime.setHours(20, 0, 0); // Set end time to 8:00 PM

//   const slots = [];
//   let currentTime = new Date(startTime);

//   // Generate time slots every 15 minutes
//   while (currentTime < endTime) {
//     slots.push(currentTime.toLocaleString()); // Convert Date object to string using local date and time format
//     currentTime.setMinutes(currentTime.getMinutes() + 15); // Add 15 minutes
//   }

//   // Update state with the generated time slots
//   setTimeSlots(slots);
// };



const getCellStyle = (time) => {
  // Convert the time slot string to match the format of appointment timing
  const slotTime = new Date(time);

  // Find any appointment that matches the time slot
  const appointment = appointment_data.find(appointment => {
    // Convert the appointment timing to match the format of time slots
    const appointmentTime = new Date(appointment.timing);
    console.log(appointmentTime)
    console.log(slotTime)
    return (

      
      appointmentTime.getFullYear() === slotTime.getFullYear() &&
      appointmentTime.getMonth() === slotTime.getMonth() &&
      appointmentTime.getDate() === slotTime.getDate() &&
      appointmentTime.getHours() === slotTime.getHours() &&
      appointmentTime.getMinutes() === slotTime.getMinutes() && 

      appointment.doctor === doctorName // Check if doctor's name matches


         
      //  appointmentTime.getTime() === slotTime.getTime()
         // Check if appointment time matches

    );
  });
  console.log(appointment)
  // If there's no appointment at this time, return default class
  if (!appointment) {
    return 'bg-warning';
  }

  // If appointment is scheduled, return class for scheduled
  if (appointment) {
    return 'bg-success';
  }

  
};
 
  


  // Function to divide time slots into 10 columns
const divideIntoColumns = (timeSlots, columns) => {
  const dividedTimeSlots = [];
  const slotsPerColumn = Math.ceil(timeSlots.length / columns);

  for (let i = 0; i < columns; i++) {
    dividedTimeSlots.push(timeSlots.slice(i * slotsPerColumn, (i + 1) * slotsPerColumn));
  }

  return dividedTimeSlots;
};

// Divide time slots into 10 columns
const columns = 10;
const timeSlotsColumns = divideIntoColumns(timeSlots, columns);

  const appointment_data = [
    { uid :"1", patient:"Mohit Shau",doctor:"Dr Umer Qureshi",mobile: "9806324245", treatment:"root canal",timing:"2024-02-17T10:45",status:"Missed",action:"edit"},
    { uid :"1", patient:"Mohit Shau",doctor:"Dr Umer Qureshi",mobile: "9806324245", treatment:"root canal",timing:"2024-02-17T10:00",status:"Missed",action:"edit"},
    { uid :"1", patient:"Mohit Shau",doctor:"Dr Umer Qureshi",mobile: "9806324245", treatment:"root canal",timing:"2024-02-17T11:30",status:"Missed",action:"edit"},
    { uid :"1", patient:"Mohit Shau",doctor:"Dr. Ajay",mobile: "9806324245", treatment:"root canal",timing:"2024-02-17T12:30",status:"Missed",action:"edit"},
    { uid :"1", patient:"Mohit Shau",doctor:"Dr Umer Qureshi",mobile: "9806324245", treatment:"root canal",timing:"2024-02-17T12:45",status:"Missed",action:"edit"},
    { uid :"1", patient:"Mohit Shau",doctor:"Dr Umer Qureshi",mobile: "9806324245", treatment:"root canal",timing:"2024-02-17T10:00",status:"Missed",action:"edit"},
    { uid :"1", patient:"Mohit Shau",doctor:"Dr. Ajay",mobile: "9806324245", treatment:"root canal",timing:"2024-02-18T10:45",status:"Missed",action:"edit"},
    { uid :"1", patient:"Mohit Shau",doctor:"Dr Umer Qureshi",mobile: "9806324245", treatment:"root canal",timing:"2024-02-18T12:00",status:"Missed",action:"edit"},
    { uid :"1", patient:"Mohit Shau",doctor:"Dr Umer Qureshi",mobile: "9806324245", treatment:"root canal",timing:"2024-02-18T13:00",status:"Missed",action:"edit"},
    { uid :"1", patient:"Mohit Shau",doctor:"Dr. Ajay",mobile: "9806324245", treatment:"root canal",timing:"2024-02-18T13:00",status:"Missed",action:"edit"},

    
  ];


  
  const formatDate = (date) => {
    const offset = date.getTimezoneOffset(); // Get the time zone offset in minutes
    const adjustedDate = new Date(date.getTime() - (offset * 60 * 1000)); // Adjust the date by subtracting the offset in milliseconds
    return adjustedDate.toISOString().split('T')[0]; // Return the ISO string in "yyyy-mm-dd" format
  }

//  useEffect(()=>{
//    setDate(formatDate(value))
//  },[value]);

 

 


console.log(timeSlots)
 console.log(value) 
  
  console.log(value)
  return (
   <Wrapper>
    <div><h6 className='text-center'>View summary by date
      
      </h6></div>
    <div className={isDisplay?"d-none" : "d-block"}>
    <div className="cal "> <Calendar onChange={onChange}
    onClickDay={handleDayClick} value={value} /></div>
    </div>
  
  
  <div className={isDisplay?"d-block" : "d-none"}>
    <div className=' mx-auto
     mt-1 mb-1 d-flex justify-content-around'>
      <div className='w-50'><span className='backIcon' onClick={()=>{setIsDisplay(false)}}><IoArrowBackCircle /></span></div>
   <div className='w-50'> <select className="form-select" onChange={(e) => setDoctorName(e.target.value)} >
      <option value="Dr Umer Qureshi">Dr Umer Qureshi</option>
      <option value="Dr. Ajay">Dr. Ajay</option>
      <option value="Dr. Vijay">Dr. Vijay</option>
      <option value="Dr. Mohit">Dr. Mohit</option>
      
     
    </select>
    </div>
    </div>
    {/* <div className='text-end my-1'>
      <input type="text"   value={value.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: '2-digit', year: 'numeric' })} readOnly/>
    </div> */}
    <div className='text-end my-1'>
      <p className=''>{value.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: '2-digit', year: 'numeric' })}</p>
    </div>
    <div className='d-flex justify-content-around align-items-center'>
    <div className='bg-success mb-2 rounded-2'><p className='p-1 my-auto' >Scheduled</p></div>
    <div  className='bg-warning mb-2 rounded-2'><p className='p-1 my-auto'>Unscheduled</p></div>
    </div>
    
  <div className="table-responsive" id="tab">
           
          <table className="table table-bordered table-striped">
          
            <tbody>

            {timeSlotsColumns.map((column, columnIndex) => (
  <tr key={columnIndex}>
    {column.map((timeSlot, index) => (
      <td key={index} className={getCellStyle(timeSlot)} onClick={() => handleTimeSlotClick(timeSlot)}>{new Date(timeSlot).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
    ))}
  </tr>
))}
              {/* <tr>
                <td className={getCellStyle("10:00 AM")}>10:00 AM </td>
                <td className={getCellStyle("10:00 AM")}>10:15 AM</td>
                <td className={getCellStyle("10:00 AM")}>10:30 AM</td>
                <td className={getCellStyle("10:00 AM")}>10:45 AM</td>
               </tr>
              <tr>
                <td className={getCellStyle("10:00 AM")}>11:00 AM</td>
                <td className={getCellStyle("10:00 AM")}>11:15 AM</td>
                <td className={getCellStyle("10:00 AM")}>11:30 AM</td>
                <td className={getCellStyle("10:00 AM")}>11:45 AM</td>
               </tr >
              <tr>
                <td className={getCellStyle("10:00 AM")}>12:00 PM</td>
                <td className={getCellStyle("10:00 AM")}>12:15 PM</td>
                <td className={getCellStyle("10:00 AM")}>12:30 PM</td>
                <td>12:45 PM</td>
               </tr>
              <tr>
                <td className={getCellStyle("10:00 AM")}>1:00 PM</td>
                <td className={getCellStyle("10:00 AM")}>1:15 PM</td>
                <td className={getCellStyle("10:00 AM")}>1:30 PM</td>
                <td className={getCellStyle("10:00 AM")}>1:45 PM</td>
               </tr>
              <tr>
                <td className={getCellStyle("10:00 AM")}>2:00 PM</td>
                <td className={getCellStyle("10:00 AM")}>2:15 PM</td>
                <td className={getCellStyle("10:00 AM")}>2:30 PM</td>
                <td className={getCellStyle("10:00 AM")}>2:45 PM</td>
               </tr>
              <tr>
                <td className={getCellStyle("10:00 AM")}>3:00 PM</td>
                <td className={getCellStyle("10:00 AM")}>3:15 PM</td>
                <td className={getCellStyle("10:00 AM")}>3:30 PM</td>
                <td className={getCellStyle("10:00 AM")}>3:45 PM</td>
               </tr>
              <tr>
                <td>4:00 PM</td>
                <td className='bg-success'>4:15 PM</td>
                <td>4:30 PM</td>
                <td>4:45 PM</td>
               </tr >
              <tr>
                <td className='bg-success'>5:00 PM</td>
                <td>5:15 PM</td>
                <td>5:30 PM</td>
                <td>5:45 PM</td>
               </tr>
              <tr>
                <td>6:00 PM</td>
                <td className='bg-success'>6:15 PM</td>
                <td>6:30 PM</td>
                <td>6:45 PM</td>
               </tr>
              <tr>
                <td>7:00 PM</td>
                <td>7:15 PM</td>
                <td className='bg-success'>7:30 PM</td>
                <td>7:45 PM</td>
               </tr> */}
             
              
              
              
                

              
               
              
              
             
              
              
             
            </tbody>
          </table>
        </div>
    
  </div>

  {showPopup && (
        <AppDetails onClose={() => setShowPopup(false)} slotInfo={selectedAppointment} />
      )}
   </Wrapper>
  )
}

export default Calender1
const Wrapper = styled.div` 
background-color: white;
padding:10px;
.cal{
  @media screen and (max-width: 768px) {
      width: 20rem
    }
    @media screen and (min-width: 768px) and (max-width: 1020px)  {
      width: 22rem;
    }
}
.react-calendar{
  height: 28.8rem;
    width: 415px;
    max-width: 100%;
    background: white;
    border: 1px solid #a0a096;
    font-family: Arial, Helvetica, sans-serif;
    line-height: 2.6rem;
    @media screen and (max-width: 768px) {
      height: 20rem;
      line-height: 1rem;
    }
}
.backIcon{
 font-size: 30px;

}
td{
  padding-top: 3px;
  padding-bottom: 3px;
  border-radius: 7px;
}
   
   ` 