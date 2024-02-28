import React from "react";
import styled from "styled-components";
import Sider from "../../SideBar";
import HeadBar from "../../HeadBar";
import TPrescription from "./TPrescription";

const TPrescriptionDash = () => {

  return (
    <>
      <Wrapper>
        <HeadBar />

        <div className="main">
          <div className="container-fluid">
            <div className="row flex-nowrap">
              <div className="col-lg-1 col-1 p-0">
                <Sider />
              </div>
              <div className="col-lg-11 col-11 ps-0 m-4">
                <TPrescription />
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default TPrescriptionDash;
const Wrapper = styled.div``;
