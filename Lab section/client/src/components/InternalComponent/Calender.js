import React, { useState } from "react";
import styled from "styled-components";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const Calender = () => {
  const [date, setDate] = useState(new Date());

  const onChange = (newDate) => {
    setDate(newDate);
  };

  return (
    <>
      <Container>
        <h1 className="text-center">Reports</h1>
        <div className="cal mt-4">
          <Calendar onChange={onChange} value={date} />
        </div>
      </Container>
    </>
  );
};

export default Calender;

const Container = styled.div`
  .cal {
    height: "100%";
  }
`;
