import React from "react";
import styled from "styled-components";
import HeadBar from "../HeadBar";
import SideBar from "../SideBar";
// import { useNavigate } from "react-router-dom";
import CreatePrescrip from "./CreatePrescrip";

const PrescriptionDashBoard = () => {

  // const navigate = useNavigate();

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
                <div className="container">
                  <div className="row">
                    <div className="col-lg-12 col-md-12">
                      <div className="text-center">
                        <h2 className="m-4">Create a new prescription</h2>
                      {/* <button className="btn btn-secondary" onClick={()=>navigate("/CreatePrescrip")}>Create Prescription</button> */}
                      <CreatePrescrip />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default PrescriptionDashBoard;
const Wrapper = styled.div`

`;
