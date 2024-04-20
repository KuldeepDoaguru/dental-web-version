import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate, useParams } from "react-router-dom";
import examinationImage from "../Assest/examination.png";
import { GiFastBackwardButton } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import cogoToast from "cogo-toast";

const ExaminationDashTwo = () => {
  const navigate = useNavigate();
  const { id, uhid } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const branch = user.currentUser.branch_name;
  console.log(branch);
  console.log(user.currentUser.branch_name);
  const [dcat, setDcat] = useState("");
  const [treatData, setTreatData] = useState({
    uhid: uhid,
    branch_name: user.currentUser.branch_name,
    appointment_id: id,
    examination_id: "",
    doctor_id: user.currentUser.employee_ID,
    doctor_name: user.currentUser.employee_name,
    diagnosis_category: dcat,
  });

  console.log(treatData);

  const timelineForExamination = async (cat) => {
    try {
      const response = await axios.post(
        "http://localhost:8888/api/doctor/insertTimelineEvent",
        {
          type: "Examiantion",
          description: `Selected Category ${cat}`,
          branch: branch,
          patientId: uhid,
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const addPackageTreat = async (updatedTreatData) => {
    try {
      const { data } = await axios.post(
        "http://localhost:8888/api/doctor/addTreatPackageDetails",
        updatedTreatData
      );
      console.log(data.result);
      cogoToast.success("treatment started added");
      timelineForExamination(data.result.diagnosis_category);
      if (data.result.diagnosis_category === "Dental-X") {
        navigate(
          `/ExaminationDashBoardPatient/${id}/${data.result.diagnosis_category}/${data.result.insertId}`
        );
      }
      if (data.result.diagnosis_category === "Pediatric") {
        navigate(
          `/ExaminationDashBoardPediatric/${id}/${data.result.diagnosis_category}/${data.result.insertId}`
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const uniFunc = async (id) => {
    try {
      setDcat(id);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(dcat);

  useEffect(() => {
    if (dcat) {
      const updatedTreatData = {
        ...treatData,
        diagnosis_category: dcat,
      };
      addPackageTreat(updatedTreatData);
    }
  }, [dcat]);
  return (
    <>
      <Wrapper>
        <div className="conatiner">
          <div className="row">
            <div className="d-flex justify-content-center mt-5">
              <div className="mt-2">
                <button
                  className="btn btn-secondary"
                  onClick={() => window.history.back()}
                >
                  <GiFastBackwardButton size={25} />
                </button>
              </div>
              <div className="mx-5">
                <p className="fs-1">Welcome To Examination Section</p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="co-lg-6 col-6">
              <div
                className="d-flex flex-column justify-content-end align-items-end"
                style={{ marginTop: "5rem" }}
              >
                <div
                  className="dental shadow p-5 m-3 bg-body rounded mx-3"
                  onClick={() => uniFunc("Dental-X")}
                >
                  Dental-X Chart
                </div>
                <div
                  className="dental shadow p-5 mt-5 bg-body rounded mx-3"
                  onClick={() => uniFunc("Pediatric")}
                >
                  Pediatric Chart
                </div>
              </div>
            </div>
            <div className="co-lg-6 col-6">
              <div className="d-flex justify-content-center-start align-items-start">
                <img
                  src={examinationImage}
                  alt="examination"
                  className="img-fluid"
                  data-aos="zoom-out"
                />
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default ExaminationDashTwo;
const Wrapper = styled.div`
  overflow: hidden;
  img {
    width: 650px;
    border-radius: 15px;
  }
  a {
    text-decoration: none;
    color: black;
  }
  p {
    font-family: "Poppins", sans-serif;
    font-size: 2.5rem;
    color: black;
  }
  .dental {
  }
`;
