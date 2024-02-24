import React from "react";
import styled from "styled-components";
import PrescDoctorDetails from "./PrescDoctorDetails";
import PrescriptionType from "./PrescriptionType";
import PrescriptionTypes from "./PrescriptionTypes";

const CreatePrescrip = () => {
  return (
    <>
      <Wrapper>
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <div className="shadow-none p-3 mb-5 bg-light rounded">
                <PrescDoctorDetails />
                <hr />
                <PrescriptionType />
                <PrescriptionTypes />
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default CreatePrescrip;
const Wrapper = styled.div``;
