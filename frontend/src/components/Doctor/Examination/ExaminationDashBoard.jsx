import React from "react";
import styled from "styled-components";
import HeadBar from "../HeadBar";
import SideBar from "../SideBar";
import ExaminationPatient from "./ExaminationPatient";

const ExaminationDashBoard = () => {
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
              <div className="col-lg-11 col-11 ps-0">
                <ExaminationPatient />
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
