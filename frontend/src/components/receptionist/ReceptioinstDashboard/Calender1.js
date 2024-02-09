import React from 'react'
import Calendar from 'react-calendar';
import "react-calendar/dist/Calendar.css";

import styled from 'styled-components';

function Calender1() {
  return (
   <Wrapper>
  <div className="cal"> <Calendar/></div>
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