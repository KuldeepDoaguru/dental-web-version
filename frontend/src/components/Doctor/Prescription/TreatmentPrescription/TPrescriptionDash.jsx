import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Sider from "../../SideBar";
import HeadBar from "../../HeadBar";
import NewTreatPrescription from "./NewTreatPrescription";

const TPrescriptionDash = () => {
  const { tsid, tpid, appoint_id, sitting } = useParams();
  console.log(tsid, appoint_id);
  const navigate = useNavigate();
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
              <div className="col-lg-11 col-11 ps-0">
                <NewTreatPrescription />
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
