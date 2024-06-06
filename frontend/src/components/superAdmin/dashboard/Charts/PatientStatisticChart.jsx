import React, { useState } from "react";
import Calendar from "react-calendar";
import styled from "styled-components";

const PatientStatisticChart = () => {
  const [value, onChange] = useState(new Date());

  return (
    <Wrapper>
      <div className="container-fluid mt-4" id="main">
        <div className="row">
          <div className="col-12 d-flex justify-content-center">
            <Calendar onChange={onChange} value={value} />
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default PatientStatisticChart;

const Wrapper = styled.div`
  #main {
    background-color: #55efc4;
    width: 100%;
    border-radius: 5px;
    padding: 2rem;
    box-shadow: 0px 2px 18px #bdbaba;
  }
  @media screen and (max-width: 768px) {
    padding: 20px;
    font-size: small;
  }
`;
