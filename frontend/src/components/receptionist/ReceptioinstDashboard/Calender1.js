import React, { useEffect, useState } from 'react'
import Calendar from 'react-calendar';
import "react-calendar/dist/Calendar.css";
import { IoArrowBackCircle } from "react-icons/io5";

import styled from 'styled-components';
import Detail from '../Bill/Detail';
import AppDetail from './AppDetails';



function Calender1() {
  const [value, onChange] = useState(new Date());
  const [isDisplay,setIsDisplay] = useState(false);
  const [date,setDate] = useState("");

  const getCellStyle = (time) => {
    // Find the appointment with the matching timing
    const appointment = appointment_data.find(appointment => appointment.timing === time);
  
    // If there's no appointment at this time, return default class
    if (!appointment) {
      return '';
    }
  
    // If appointment is scheduled, return class for scheduled
    if (appointment.status === 'Scheduled') {
      return 'bg-success';
    }
  
    // If appointment is unscheduled, return class for unscheduled
    if (appointment.status === 'Unscheduled') {
      return 'bg-warning';
    }
  };
 
  // Define an array of time slots
  const timeSlots = [
    "10:00 AM", "10:15 AM", "10:30 AM", "10:45 AM",
    "11:00 AM", "11:15 AM", "11:30 AM", "11:45 AM",
    "12:00 PM", "12:15 PM", "12:30 PM", "12:45 PM",
    "1:00 PM", "1:15 PM", "1:30 PM", "1:45 PM",
    "2:00 PM", "2:15 PM", "2:30 PM", "2:45 PM",
    "3:00 PM", "3:15 PM", "3:30 PM", "3:45 PM",
    "4:00 PM", "4:15 PM", "4:30 PM", "4:45 PM",
    "5:00 PM", "5:15 PM", "5:30 PM", "5:45 PM",
    "6:00 PM", "6:15 PM", "6:30 PM", "6:45 PM",
    "7:00 PM", "7:15 PM", "7:30 PM", "7:45 PM",
  ];


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
    { uid :"1", patient:"Mohit Shau",doctor:"Dr Umer Qureshi",mobile: "9806324245", treatment:"root canal",timing:"10:15 Am",status:"Missed",action:"edit"},
    { uid :"2", patient:"Umer Qureshi",doctor:"Dr Umer Qureshi",mobile: "9806324245", treatment:"root canal",timing:"10:30 Am",status:"Missed",action:"edit"},
    { uid :"3", patient:"Dhani Burma",doctor:"Dr Umer Qureshi",mobile: "9806324245", treatment:"root canal",timing:"10:45 Am",status:"Missed",action:"edit"},
    { uid :"4", patient:"Ragni Burma",doctor:"Dr Umer Qureshi",mobile: "9806324245", treatment:"root canal",timing:"11:00 Am",status:"Missed",action:"edit"},
    { uid :"5", patient:"Rohit Shau",doctor:"Dr Umer Qureshi",mobile: "9806324245", treatment:"root canal",timing:"11:15 Am",status:"Missed",action:"edit"},
    { uid :"6", patient:"Ritin Tiwari",doctor:"Dr Umer Qureshi",mobile: "9806324245",treatment:"root canal",timing:"11:45 Am",status:"Missed",action:"edit"},
    { uid :"7", patient:"Dev Ansh Dubey",doctor:"Dr Umer Qureshi",mobile: "9806324245",treatment:"root canal",timing:"12:15 Am",status:"Missed",action:"edit"},
    { uid :"8", patient:"Juber",doctor:"Dr Umer Qureshi",mobile: "9806324245",treatment:"root canal",timing:"12:45 Am",status:"Missed",action:"edit"},
    { uid :"9", patient:"Mohit Shau",doctor:"Dr Umer Qureshi",mobile: "9806324245",treatment:"root canal",timing:"12:30 Am",status:"Missed",action:"edit"},
    { uid :"10", patient:"Mohit Shau",doctor:"Dr Umer Qureshi",mobile: "9806324245",treatment:"root canal",timing:"1:00 Pm",status:"Missed",action:"edit"},
    { uid :"11", patient:"Mohit Shau",doctor:"Dr Umer Qureshi",mobile: "9806324245", treatment:"root canal",timing:"1:15 Pm",status:"Missed",action:"edit"},
    { uid :"12", patient:"Umer Qureshi",doctor:"Dr Umer Qureshi",mobile: "9806324245", treatment:"root canal",timing:"2:15 Pm",status:"Missed",action:"edit"},
    { uid :"13", patient:"Dhani Burma",doctor:"Dr Umer Qureshi",mobile: "9806324245", treatment:"root canal",timing:"2:30 Pm",status:"Missed",action:"edit"},
    { uid :"14", patient:"Ragni Burma",doctor:"Dr Umer Qureshi",mobile: "9806324245", treatment:"root canal",timing:"3:00 Pm",status:"Missed",action:"edit"},
    { uid :"15", patient:"Rohit Shau",doctor:"Dr Umer Qureshi",mobile: "9806324245", treatment:"root canal",timing:"4:00 Am",status:"Missed",action:"edit"},
    { uid :"16", patient:"Ritin Tiwari",doctor:"Dr Umer Qureshi",mobile: "9806324245",treatment:"root canal",timing:"5:00 Pm",status:"Missed",action:"edit"},
    { uid :"17", patient:"Dev Ansh Dubey",doctor:"Dr Umer Qureshi",mobile: "9806324245",treatment:"root canal",timing:"6:00 Pm",status:"Missed",action:"edit"},
    { uid :"18", patient:"Juber",doctor:"Dr Umer Qureshi",mobile: "9806324245",treatment:"root canal",timing:"7:00 Pm",status:"Missed",action:"edit"},
    { uid :"19", patient:"Mohit Shau",doctor:"Dr Umer Qureshi",mobile: "9806324245",treatment:"root canal",timing:"9:00 Am",status:"Missed",action:"edit"},
    { uid :"20", patient:"Mohit Shau",doctor:"Dr Umer Qureshi",mobile: "9806324245",treatment:"root canal",timing:"9:00 Am",status:"Missed",action:"edit"},
    { uid :"1", patient:"Mohit Shau",doctor:"Dr Umer Qureshi",mobile: "9806324245", treatment:"root canal",timing:"9:00 Am",status:"Missed",action:"edit"},
    { uid :"2", patient:"Umer Qureshi",doctor:"Dr Umer Qureshi",mobile: "9806324245", treatment:"root canal",timing:"9:00 Am",status:"Missed",action:"edit"},
    { uid :"3", patient:"Dhani Burma",doctor:"Dr Umer Qureshi",mobile: "9806324245", treatment:"root canal",timing:"9:00 Am",status:"Missed",action:"edit"},
    { uid :"4", patient:"Ragni Burma",doctor:"Dr Umer Qureshi",mobile: "9806324245", treatment:"root canal",timing:"9:00 Am",status:"Missed",action:"edit"},
    { uid :"5", patient:"Rohit Shau",doctor:"Dr Umer Qureshi",mobile: "9806324245", treatment:"root canal",timing:"9:00 Am",status:"Missed",action:"edit"},
    { uid :"6", patient:"Ritin Tiwari",doctor:"Dr Umer Qureshi",mobile: "9806324245",treatment:"root canal",timing:"9:00 Am",status:"Missed",action:"edit"},
    { uid :"7", patient:"Dev Ansh Dubey",doctor:"Dr Umer Qureshi",mobile: "9806324245",treatment:"root canal",timing:"9:00 Am",status:"Missed",action:"edit"},
    { uid :"8", patient:"Juber",doctor:"Dr Umer Qureshi",mobile: "9806324245",treatment:"root canal",timing:"9:00 Am",status:"Missed",action:"edit"},
    { uid :"9", patient:"Mohit Shau",doctor:"Dr Umer Qureshi",mobile: "9806324245",treatment:"root canal",timing:"9:00 Am",status:"Missed",action:"edit"},
    { uid :"10", patient:"Mohit Shau",doctor:"Dr Umer Qureshi",mobile: "9806324245",treatment:"root canal",timing:"9:00 Am",status:"Missed",action:"edit"},
    { uid :"11", patient:"Mohit Shau",doctor:"Dr Umer Qureshi",mobile: "9806324245", treatment:"root canal",timing:"9:00 Am",status:"Missed",action:"edit"},
    { uid :"12", patient:"Umer Qureshi",doctor:"Dr Umer Qureshi",mobile: "9806324245", treatment:"root canal",timing:"9:00 Am",status:"Missed",action:"edit"},
    { uid :"13", patient:"Dhani Burma",doctor:"Dr Umer Qureshi",mobile: "9806324245", treatment:"root canal",timing:"9:00 Am",status:"Missed",action:"edit"},
    { uid :"14", patient:"Ragni Burma",doctor:"Dr Umer Qureshi",mobile: "9806324245", treatment:"root canal",timing:"9:00 Am",status:"Missed",action:"edit"},
    { uid :"15", patient:"Rohit Shau",doctor:"Dr Umer Qureshi",mobile: "9806324245", treatment:"root canal",timing:"9:00 Am",status:"Missed",action:"edit"},
    { uid :"16", patient:"Ritin Tiwari",doctor:"Dr Umer Qureshi",mobile: "9806324245",treatment:"root canal",timing:"9:00 Am",status:"Missed",action:"edit"},
    { uid :"17", patient:"Dev Ansh Dubey",doctor:"Dr Umer Qureshi",mobile: "9806324245",treatment:"root canal",timing:"9:00 Am",status:"Missed",action:"edit"},
    { uid :"18", patient:"Juber",doctor:"Dr Umer Qureshi",mobile: "9806324245",treatment:"root canal",timing:"9:00 Am",status:"Missed",action:"edit"},
    { uid :"19", patient:"Mohit Shau",doctor:"Dr Umer Qureshi",mobile: "9806324245",treatment:"root canal",timing:"9:00 Am",status:"Missed",action:"edit"},
    { uid :"20", patient:"Mohit Shau",doctor:"Dr Umer Qureshi",mobile: "9806324245",treatment:"root canal",timing:"9:00 Am",status:"Missed",action:"edit"},
    { uid :"1", patient:"Mohit Shau",doctor:"Dr Umer Qureshi",mobile: "9806324245", treatment:"root canal",timing:"9:00 Am",status:"Missed",action:"edit"},
    { uid :"2", patient:"Umer Qureshi",doctor:"Dr Umer Qureshi",mobile: "9806324245", treatment:"root canal",timing:"9:00 Am",status:"Missed",action:"edit"},
    { uid :"3", patient:"Dhani Burma",doctor:"Dr Umer Qureshi",mobile: "9806324245", treatment:"root canal",timing:"9:00 Am",status:"Missed",action:"edit"},
    { uid :"4", patient:"Ragni Burma",doctor:"Dr Umer Qureshi",mobile: "9806324245", treatment:"root canal",timing:"9:00 Am",status:"Missed",action:"edit"},
    { uid :"5", patient:"Rohit Shau",doctor:"Dr Umer Qureshi",mobile: "9806324245", treatment:"root canal",timing:"9:00 Am",status:"Missed",action:"edit"},
    { uid :"6", patient:"Ritin Tiwari",doctor:"Dr Umer Qureshi",mobile: "9806324245",treatment:"root canal",timing:"9:00 Am",status:"Missed",action:"edit"},
    { uid :"7", patient:"Dev Ansh Dubey",doctor:"Dr Umer Qureshi",mobile: "9806324245",treatment:"root canal",timing:"9:00 Am",status:"Missed",action:"edit"},
    { uid :"8", patient:"Juber",doctor:"Dr Umer Qureshi",mobile: "9806324245",treatment:"root canal",timing:"9:00 Am",status:"Missed",action:"edit"},
    { uid :"9", patient:"Mohit Shau",doctor:"Dr Umer Qureshi",mobile: "9806324245",treatment:"root canal",timing:"9:00 Am",status:"Missed",action:"edit"},
    { uid :"10", patient:"Mohit Shau",doctor:"Dr Umer Qureshi",mobile: "9806324245",treatment:"root canal",timing:"9:00 Am",status:"Missed",action:"edit"},
    { uid :"11", patient:"Mohit Shau",doctor:"Dr Umer Qureshi",mobile: "9806324245", treatment:"root canal",timing:"9:00 Am",status:"Missed",action:"edit"},
    { uid :"12", patient:"Umer Qureshi",doctor:"Dr Umer Qureshi",mobile: "9806324245", treatment:"root canal",timing:"9:00 Am",status:"Missed",action:"edit"},
    { uid :"13", patient:"Dhani Burma",doctor:"Dr Umer Qureshi",mobile: "9806324245", treatment:"root canal",timing:"9:00 Am",status:"Missed",action:"edit"},
    { uid :"14", patient:"Ragni Burma",doctor:"Dr Umer Qureshi",mobile: "9806324245", treatment:"root canal",timing:"9:00 Am",status:"Missed",action:"edit"},
    { uid :"15", patient:"Rohit Shau",doctor:"Dr Umer Qureshi",mobile: "9806324245", treatment:"root canal",timing:"9:00 Am",status:"Missed",action:"edit"},
    { uid :"16", patient:"Ritin Tiwari",doctor:"Dr Umer Qureshi",mobile: "9806324245",treatment:"root canal",timing:"9:00 Am",status:"Missed",action:"edit"},
    { uid :"17", patient:"Dev Ansh Dubey",doctor:"Dr Umer Qureshi",mobile: "9806324245",treatment:"root canal",timing:"9:00 Am",status:"Missed",action:"edit"},
    { uid :"18", patient:"Juber",doctor:"Dr Umer Qureshi",mobile: "9806324245",treatment:"root canal",timing:"9:00 Am",status:"Missed",action:"edit"},
    { uid :"19", patient:"Mohit Shau",doctor:"Dr Umer Qureshi",mobile: "9806324245",treatment:"root canal",timing:"9:00 Am",status:"Missed",action:"edit"},
    { uid :"20", patient:"Mohit Shau",doctor:"Dr Umer Qureshi",mobile: "9806324245",treatment:"root canal",timing:"9:00 Am",status:"Missed",action:"edit"},
    
  ];


  
  const formatDate = (date) => {
    const offset = date.getTimezoneOffset(); // Get the time zone offset in minutes
    const adjustedDate = new Date(date.getTime() - (offset * 60 * 1000)); // Adjust the date by subtracting the offset in milliseconds
    return adjustedDate.toISOString().split('T')[0]; // Return the ISO string in "yyyy-mm-dd" format
  }

 useEffect(()=>{
   setDate(formatDate(value))
 },[isDisplay])
  
  
  console.log(value)
  return (
   <Wrapper>
    <div><h6 className='text-center'>View summary by date
      
      </h6></div>
    <div className={isDisplay?"d-none" : "d-block"}>
    <div className="cal "> <Calendar onChange={onChange} onClickDay={()=>{setIsDisplay(true)}} value={value} /></div>
    </div>
  
  
  <div className={isDisplay?"d-block" : "d-none"}>
    <div className=' mx-auto
     mt-1 mb-1 d-flex justify-content-around'>
      <div className='w-50'><span className='backIcon' onClick={()=>{setIsDisplay(false)}}><IoArrowBackCircle /></span></div>
   <div className='w-50'> <select className="form-select">
      <option value="">Dr. Arun</option>
      <option value="">Dr. Arun</option>
      <option value="">Dr. Arun</option>
      <option value="">Dr. Arun</option>
      
     
    </select>
    </div>
    </div>
    <div className='text-end my-1'>
      <input type="date"  onChange={(e)=>{setDate(e.target.value)}} value={date}/>
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
      <td key={index} className={getCellStyle(timeSlot)}>{timeSlot}</td>
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