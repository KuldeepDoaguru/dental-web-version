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
  const { tpid, appoint_id } = useParams();
  console.log(appoint_id);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [selectedData, setSelectedData] = useState();

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
        `https://dentalgurudoctor.doaguru.com/api/doctor/getAppointmentsWithPatientDetailsById/${tpid}`
      );
      setGetPatientData(res.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(getPatientData[0]?.uhid);

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
        `https://dentalgurudoctor.doaguru.com/api/doctor/getExaminedataById/${tpid}`
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
        `https://dentalgurudoctor.doaguru.com/api/doctor/getFilteredTreat/13/${branch}`
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
        `https://dentalgurudoctor.doaguru.com/api/doctor/getDentalDataByID/${appoint_id}`
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
          <div className="">
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
            </div>
          </div>
          <p className="fs-1 shadow-none p-2 bg-light rounded text-center">
            Treatment Procedure
          </p>
        </div>

        <div className="container-fluid patient">
          <div className="row shadow-sm p-3 mb-3 bg-body rounded">
            {getPatientData.map((item, index) => (
              <>
                <div key={index} className="col-lg-12">
                  <div className="row">
                    <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6 col-6">
                      <p>
                        <strong>Treatment Package ID</strong> :{" "}
                        {getExamTeeth[0]?.tp_id}
                      </p>
                    </div>

                    <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6 col-6">
                      <p>
                        <strong>Patient Name</strong> : {item.patient_name}
                      </p>
                    </div>
                    <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6 col-6">
                      <p>
                        <strong>Patient Mobile No.</strong> : {item.mobileno}
                      </p>
                    </div>
                  </div>
                </div>
                <div key={index + "secondRow"} className="col-lg-12">
                  <div className="row">
                    <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6 col-6">
                      <p className="mb-0">
                        <strong>Blood Group</strong> : {item.bloodgroup}
                      </p>
                    </div>
                    <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6 col-6">
                      <p className="mb-0">
                        <strong>Disease</strong> : {item.disease}
                      </p>
                    </div>
                    <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6 col-6">
                      <p className="mb-0">
                        <strong>Allergy</strong> : {item.allergy}
                      </p>
                    </div>
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
                          {item.treatment_status === "complete" ? (
                            <button className="btn btn-success" disabled>
                              <FaHandHoldingMedical size={25} />
                            </button>
                          ) : (
                            <button
                              className="btn btn-secondary"
                              onClick={() => handleShowTreatProcess(item)}
                            >
                              <FaHandHoldingMedical size={25} />
                            </button>
                          )}
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
            uhid={getPatientData[0]?.uhid}
            appoint_id={appoint_id}
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
      /* width: 40rem; */
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
      width: 100%;
    }
    @media screen and (min-width: 480px) and (max-width: 768px) {
      width: 100%;
    }
  }
  .patient {
    @media screen and (min-width: 768px) and (max-width: 1024px) {
      width: 100%;
    }
    @media screen and (min-width: 480px) and (max-width: 768px) {
      width: 100%;
    }
  }
`;