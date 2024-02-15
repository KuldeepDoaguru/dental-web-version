import React, { useState } from "react";
import styled from "styled-components";
import HeadBar from "../HeadBar";
import SideBar from "../SideBar";
import ExaminationPatient from "./ExaminationPatient";
import PediatricDental from "./PediatricDental";

const ExaminationDashBoard = () => {
  const [showComponent2, setShowComponent2] = useState(false);
  return (
    <>
      <Wrapper>
        <HeadBar />

        <div className="main">
          <div className="container-fluid">
            <div className="row flex-nowrap">
              <div className="col-lg-1 col-1 p-0">
                <SideBar />
              </div>
              <div className="col-lg-11 col-11 ps-0 m-2">
              <button onClick={() => setShowComponent2(!showComponent2)} className="btn btn-secondary">
                  {showComponent2 ? "Dental-X Chart" : "Pediatric Dental-X Chart"}
                </button>
                {showComponent2 ? <PediatricDental /> : <ExaminationPatient />}
                
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default ExaminationDashBoard;
const Wrapper = styled.div``;
