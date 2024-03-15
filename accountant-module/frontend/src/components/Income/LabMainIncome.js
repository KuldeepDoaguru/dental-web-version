import React from "react";
import Header from "../Header";
import Sider from "../Sider";
import styled from "styled-components";
import LabIncome from "../LabIncome";

const LabMainIncome = () => {
  return (
    <>
      <Container>
        <Header />
        <div className="main">
          <div className="container-fluid">
            <div className="row flex-nowrap ">
              <div className="col-xxl-1 col-xl-1 col-lg-1 col-md-2 col-sm-2 p-0">
                <Sider />
              </div>
              <div className="col-xxl-11 col-xl-11 col-lg-11 col-md-10 col-sm-10">
                <LabIncome />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default LabMainIncome;

const Container = styled.div``;
