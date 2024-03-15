import React from "react";
import styled from "styled-components";
import Header from "../Header";
import Sider from "../Sider";

const PatentBills = () => {
  return (
    <>
      <Container>
        <Header />
        <div className="main">
          <div className="container-fluid">
            <div className="row flex-nowrap ">
              <div className="col-lg-1 col-1 p-0">
                <Sider />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default PatentBills;

const Container = styled.div``;
