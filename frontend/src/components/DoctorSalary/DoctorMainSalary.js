import React from "react";
import styled from "styled-components";
import Header from "../Header";
import Sider from "../Sider";
import DoctorSalary from "./DoctorSalary";
import RightSider from "../RightSider";

const DoctorMainSalary = () => {
  return (
    <>
      <Container>
        <Header />
        <div className="main">
          <div className="container-fluid">
            <div className="row d-flex justify-content-between">
              <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-2 col-sm-2 p-0">
                <Sider />
              </div>
              <div className="col-xxl-8 col-xl-8 col-lg-8 col-md-8 col-sm-8">
                <DoctorSalary />
              </div>
              <div className="col-2 p-0">
                <RightSider />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default DoctorMainSalary;

const Container = styled.div`
  .navlink.active {
    background-color: #f53237 !important;
    border-radius: 1rem;
    color: white !important;
  }
`;
