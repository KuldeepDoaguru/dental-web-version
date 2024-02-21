import React from "react";
import styled from "styled-components";
import { IoMdArrowDropdownCircle } from "react-icons/io";

const AdminFinanceReportHead = () => {
  return (
    <>
      <Container>
        <div className="container-fluid">
          <div className="row">
            <div className="col-1"></div>
            <div className="col-11"></div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default AdminFinanceReportHead;
const Container = styled.div`
  nav {
    background-color: #004aad;
  }

  .navbar-nav {
    background-color: red;
  }
`;
