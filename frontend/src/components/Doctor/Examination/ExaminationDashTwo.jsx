import React from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import examinationImage from "../Assest/examination.png";

const ExaminationDashTwo = () => {
  const { id } = useParams();
  console.log(id);
  return (
    <>
      <Wrapper>
        <div className="conatiner">
            <div className="row">
                <div className="co-lg-12 col-12">
                    <div className="text-center m-5">
                        <p className="fs-1">Welcome To Examination Section</p>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="co-lg-6 col-6">
                    <div className="d-flex flex-column justify-content-end align-items-end mx-5" style={{marginTop:"5rem"}}>
                        <Link to={`/ExaminationDashBoardPatient/${id}`}><div className="dental shadow p-5 m-3 bg-body rounded mx-3">Dental-X Chart</div></Link>
                        <Link to={`/ExaminationDashBoardPediatric/${id}`}><div className="dental shadow p-5 mt-5 bg-body rounded mx-3">Pediatric Chart</div></Link>
                    </div>
                </div>
                <div className="co-lg-6 col-6">
                    <div className="d-flex justify-content-center-start align-items-start">
                        <img src={examinationImage} alt="examination" className="img-fluid" data-aos="zoom-out"/>
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
img{
  width: 650px;
  border-radius: 15px;
}
a{
    text-decoration: none;
    color: black;
}
p{
  font-family: 'Poppins', sans-serif;
  font-size: 2.5rem;
  color: black;
}
.dental{
 
}
`;
