import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const ExaminationDashTwo = () => {
  return (
    <>
      <Wrapper>
        <div className="conatiner">
            <div className="row">
                <div className="co-lg-12 col-12">
                    <div className="text-center m-5">
                        <p className="fs-1 text-info">Welcome To Examination Section</p>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="co-lg-12 col-12">
                    <div className="d-flex justify-content-center align-items-center">
                        <Link to="/ExaminationDashBoardPatient"><div className="dental shadow p-3 bg-body rounded mx-3">Dental-X Chart</div></Link>
                        <Link to="/ExaminationDashBoardPediatric"><div className="dental shadow p-3 bg-body rounded mx-3">Pediatric Dental-X Chart</div></Link>
                    </div>
                </div>
            </div>
        </div>
      </Wrapper>
    </>
  );
};

export default ExaminationDashTwo;
const Wrapper = styled.div`
a{
    text-decoration: none;
    color: black;
}
.dental{
 
}
`;
