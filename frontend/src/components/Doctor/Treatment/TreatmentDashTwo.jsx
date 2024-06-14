import React, { useEffect } from "react";
import styled from "styled-components";
import HeadBar from "../HeadBar";
import SideBar from "../SideBar";
import { useNavigate, useParams } from "react-router-dom";
import TreatmentForm from "./TreatmentForm";

const TreatmentDashTwo = () => {
  const { exid, appoint_id, tp_id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const handlePopState = (event) => {
      // Push a new state to ensure the user stays on the current page
      window.history.pushState(null, "", window.location.href);
    };

    // Listen for popstate events
    window.addEventListener("popstate", handlePopState);

    // Push the initial state
    window.history.pushState(null, "", window.location.href);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

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
              <div className="col-lg-11 col-11 ps-0 m-0">
                <TreatmentForm />
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default TreatmentDashTwo;
const Wrapper = styled.div``;
