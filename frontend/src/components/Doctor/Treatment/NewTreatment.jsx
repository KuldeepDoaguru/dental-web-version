import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { FaHandHoldingMedical } from "react-icons/fa";
import NewTreatmentTable from "./NewTreatmentTable";
import { GiFastBackwardButton } from "react-icons/gi";
import SittingProcessModal from "../Examination/SaveExaminationData/SittingProcessModal";

const NewTreatment = () => {
  const { id } = useParams();
  const { tpid } = useParams();
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [selectedData, setSelectedData] = useState();
  console.log(id, tpid);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { refreshTable, currentUser } = useSelector((state) => state.user);
  const branch = user.currentUser.branch_name;
  const [getPatientData, setGetPatientData] = useState([]);
  const [uniqueValue, setUniqueValue] = useState([]);
  const [getExamTeeth, setGetExamTeeth] = useState([]);
  const [vdata, setVdata] = useState([]);
  const navigate = useNavigate();

  // Get Patient Details START
  const getPatientDetail = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8888/api/doctor/getAppointmentsWithPatientDetailsById/${id}`
      );
      setGetPatientData(res.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPatientDetail();
  }, []);
  console.log(getPatientData);
  const handleShowTreatProcess = (item) => {
    setSelectedData(item);
    setShowEditPopup(true);
  };
  // Get Patient Details END

  // Get Examintion Teeth Details START

  const getExamintionTeeth = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8888/api/doctor/getExaminedataById/${tpid}`
      );
      setGetExamTeeth(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getExamintionTeeth();
  }, []);

  // Get Examintion Teeth Details END

  const handleNavigate = (exid, appointment_id, desease) => {
    navigate(`/treatmentDashTwo/${exid}/${appointment_id}/${tpid}`, {
      state: desease,
    });
  };

  console.log(getExamTeeth);
  const getUniqueTreatValues = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8888/api/doctor/getFilteredTreat/13/${branch}`
      );
      setUniqueValue(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUniqueTreatValues();
  }, []);

  const getData = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8888/api/doctor/getDentalDataByID/${id}`
      );
      setVdata(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Wrapper>
        <div className="container-fluid main">
          <div className="row justify-content-center">
            {" "}
            {/* Center the content horizontally */}
            <div className="text-start">
              {" "}
              {/* Center the content inside this column */}
              <button
                className="btn btn-secondary mb-2"
                onClick={() => window.history.back()}
              >
                <GiFastBackwardButton size={22} />
              </button>
              <p className="fs-1 shadow-none p-2 bg-light rounded text-center">
                Treatment Procedure
              </p>
            </div>
          </div>
        </div>

        <div className="container-fluid patient">
          <div className="row shadow-sm p-3 mb-3 bg-body rounded">
            <div className="col-lg-4">
              <p>
                <strong>Treatment Package ID</strong> : {getExamTeeth[0]?.tp_id}
              </p>
            </div>
            {getPatientData.map((item, index) => (
              <>
                <div
                  key={index}
                  className="col-lg-12 d-flex justify-content-between align-items-center"
                >
                  <div className="col-lg-4">
                    <p>
                      <strong>Appoint ID</strong> : {item.appoint_id}
                    </p>
                  </div>

                  <div className="col-lg-4">
                    <p>
                      <strong>Patient Name</strong> : {item.patient_name}
                    </p>
                  </div>
                  <div className="col-lg-4">
                    <p>
                      <strong>Patient Mobile No.</strong> : {item.mobileno}
                    </p>
                  </div>
                </div>
                <div
                  key={index + "secondRow"}
                  className="col-lg-12 d-flex justify-content-between align-items-center"
                >
                  <div className="col-lg-4">
                    <p className="mb-0">
                      <strong>Blood Group</strong> : {item.bloodgroup}
                    </p>
                  </div>
                  <div className="col-lg-4">
                    <p className="mb-0">
                      <strong>Disease</strong> : {item.disease}
                    </p>
                  </div>
                  <div className="col-lg-4">
                    <p className="mb-0">
                      <strong>Allergy</strong> : {item.allergy}
                    </p>
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
        <div className="box">
          <div className="table-responsive">
            <table
              className="table table-bordered table-striped border"
              style={{ overflowX: "scroll" }}
            >
              <thead>
                <tr>
                  <th>Treatment</th>
                  <th>Desease</th>
                  <th>Teeth</th>
                  <th>Chief Complain</th>
                  <th>Advice</th>
                  <th>On Examination</th>
                  <th>Treatment status</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {getExamTeeth
                  .sort((a, b) => {
                    // Assuming you want to sort by a property called 'propertyName'
                    const itemA = a.disease.toLowerCase();
                    const itemB = b.disease.toLowerCase();

                    if (itemA < itemB) {
                      return -1;
                    }
                    if (itemA > itemB) {
                      return 1;
                    }
                    return 0;
                  })
                  .map((item) => (
                    <>
                      <tr>
                        <td>{item.treatment_name}</td>
                        <td>{item.disease}</td>
                        <td>{item.selected_teeth}</td>
                        <td>{item.chief_complain}</td>
                        <td>{item.advice}</td>
                        <td>{item.on_examination}</td>
                        <td>{item.treatment_status}</td>
                        <td>
                          <button
                            className="btn btn-secondary"
                            onClick={() => handleShowTreatProcess(item)}
                          >
                            <FaHandHoldingMedical size={25} />
                          </button>
                        </td>
                      </tr>
                    </>
                  ))}
              </tbody>
            </table>
            {/* <div>
              <h5>Grand Total : {grandTotal}</h5>
            </div> */}
          </div>
        </div>

        {showEditPopup && (
          <SittingProcessModal
            onClose={() => setShowEditPopup(false)}
            selectedData={selectedData}
          />
        )}
        <div>
          <NewTreatmentTable />
        </div>
      </Wrapper>
    </>
  );
};

export default NewTreatment;
const Wrapper = styled.div`
  overflow: hidden;
  span {
    font-size: 2.5rem;
  }
  .container-fluid {
    @media (min-width: 765px) and (max-width: 1024px) {
      width: 40rem;
    }
  }
  .container-fluid .p {
    font-size: 10px;
  }
  th {
    background: #0dcaf0;
    white-space: nowrap;
  }
  .main {
    @media screen and (min-width: 768px) and (max-width: 1024px) {
      width: 41rem;
    }
    @media screen and (min-width: 480px) and (max-width: 768px) {
      width: 31rem;
    }
  }
  .patient {
    @media screen and (min-width: 768px) and (max-width: 1024px) {
      width: 53rem;
    }
    @media screen and (min-width: 480px) and (max-width: 768px) {
      width: 37rem;
    }
  }
`;
