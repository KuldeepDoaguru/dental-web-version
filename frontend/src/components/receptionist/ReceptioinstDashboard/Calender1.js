import React, { useEffect, useState } from 'react'
import Calendar from 'react-calendar';
import "react-calendar/dist/Calendar.css";

import styled from 'styled-components';


function Calender1() {
  const [value, onChange] = useState(new Date());
  const [isDisplay,setIsDisplay] = useState(false);
  const [date,setDate] = useState("");
  
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
    <div><p className='text-center'>View summary by date
      
      </p></div>
    <div className={isDisplay?"d-none" : "d-block"}>
    <div className="cal "> <Calendar onChange={onChange} onClickDay={()=>{setIsDisplay(true)}} value={value} /></div>
    </div>
  
  
  <div className={isDisplay?"d-block" : "d-none"}>
    <div className='w-50 mx-auto mt-1 mb-1'>
    <select className="form-select">
      <option value="">Dr. Arun</option>
      <option value="">Dr. Arun</option>
      <option value="">Dr. Arun</option>
      <option value="">Dr. Arun</option>
      
     
    </select>
    </div>
    <div className='text-center my-1'>
      <input type="date"  onChange={(e)=>{setDate(e.target.value)}} value={date}/>
    </div>
    <div className='d-flex justify-content-around align-items-center'>
    <div className='bg-success'><p className='p-1 my-auto' >Scheduled</p></div>
    <div  className='bg-warning'><p className='p-1 my-auto'>Unscheduled</p></div>
    </div>
   
  <div className="table-responsive" id="tab">
           
          <table className="table table-bordered table-striped">
          
            <tbody>
              <tr>
                <td className='bg-success'>10:00 AM</td>
                <td className='bg-success'>10:15 AM</td>
                <td>10:30 AM</td>
                <td>10:45 AM</td>
               </tr>
              <tr>
                <td>11:00 AM</td>
                <td>11:15 AM</td>
                <td className='bg-success'>11:30 AM</td>
                <td>11:45 AM</td>
               </tr>
              <tr>
                <td className='bg-success'>12:00 PM</td>
                <td >12:15 PM</td>
                <td className='bg-success'>12:30 PM</td>
                <td>12:45 PM</td>
               </tr>
              <tr>
                <td className='bg-success'>1:00 PM</td>
                <td className='bg-success'>1:15 PM</td>
                <td>1:30 PM</td>
                <td>1:45 PM</td>
               </tr>
              <tr>
                <td>2:00 PM</td>
                <td className='bg-success'>2:15 PM</td>
                <td>2:30 PM</td>
                <td className='bg-success'>2:45 PM</td>
               </tr>
              <tr>
                <td className='bg-success'>3:00 PM</td>
                <td>3:15 PM</td>
                <td>3:30 PM</td>
                <td>3:45 PM</td>
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
               </tr>
             
              
              
              
                

              
               
              
              
             
              
              
             
            </tbody>
          </table>
        </div>
    
  </div>
   </Wrapper>
  )
}

export default Calender1
const Wrapper = styled.div` 
.cal{
  @media screen and (max-width: 768px) {
      width: 20rem
    }
    @media screen and (min-width: 768px) and (max-width: 1020px)  {
      width: 22rem;
    }
}
.react-calendar{
  height: 30.8rem;
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
   
   ` 