import React from "react";
import styled from "styled-components";
import Header from "../Header";
import Sider from "../Sider";
import AllStaffSalar from "./AllStaffSalar";
import BranchDetails from "../BranchDetails";

const StaffSalary = () => {
  return (
    <>
      <Container>
        <Header />
        <div className="main">
          <div className="container-fluid">
            <div className="row d-flex justify-content-between">
              <div className="col-xxl-1 col-xl-1 col-lg-1 col-md-2 col-sm-2 p-0">
                <Sider />
              </div>
              <div className="col-xxl-11 col-xl-11 col-lg-11 col-md-11 col-sm-2 p-0">
                <div className="container-fluid">
                  <div className="row">
                    <BranchDetails />
                    <div className="">
                      <AllStaffSalar />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default StaffSalary;

const Container = styled.div``;
