import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { setUser } from "../../../../redux/user/userSlice";

const ViewTreatPrescription = () => {
  const { appoint_id, tpid, sitting, treatment } = useParams();
  console.log(appoint_id);
  const navigate = useNavigate();
  const [getPatientData, setGetPatientData] = useState([]);
  const user = useSelector((state) => state.user);
  console.log(user);
  const branch = user.currentUser.branch_name;
  console.log(branch);
  const [getExaminData, setGetExaminData] = useState([]);
  const [getTreatData, setGetTreatData] = useState([]);
  const [getTreatMedicine, setGetTreatMedicine] = useState([]);
  const [getTreatSug, setGetTreatSug] = useState([]);
  const [getBranch, setGetBranch] = useState([]);
  const [getLabData, setGetLabData] = useState([]);

  const getBranchDetails = async () => {
    try {
      const { data } = await axios.get(
        `https://dentalgurudoctor.doaguru.com/api/doctor/getBranchDetails/${branch}`
      );
      console.log(data);
      setGetBranch(data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(getBranch);

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

  const getLabAllData = async () => {
    try {
      const res = await axios.get(
        `https://dentalgurudoctor.doaguru.com/api/doctor/lab-details/${tpid}`
      );
      setGetLabData(res.data.lab_details);
      console.log(res.data.lab_details);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPatientDetail();
    getBranchDetails();
    getLabAllData();
  }, []);
  // Get Patient Details END

  // Get Patient Examintion Details START
  const getExaminDetail = async () => {
    try {
      const res = await axios.get(
        `https://dentalgurudoctor.doaguru.com/api/doctor/getDentalDataByTpid/${tpid}/${branch}`
      );
      setGetExaminData(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getExaminDetail();
  }, []);
  // Get Patient Examintion Details END

  // Get Patient Treatment Details START
  const getTreatDetail = async () => {
    try {
      const { data } = await axios.get(
        `https://dentalgurudoctor.doaguru.com/api/doctor/getTreatmentDetailsViaSitting/${branch}/${tpid}/${sitting}`
      );
      setGetTreatData(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(getTreatData);
  useEffect(() => {
    getTreatDetail();
  }, []);
  // Get Patient Treatment Details END

  // Get Treatment Medical Prescription Data START
  const getTreatPrescriptionByAppointId = async () => {
    try {
      const res = await axios.get(
        `https://dentalgurudoctor.doaguru.com/api/doctor/getTreatPrescriptionByAppointId/${appoint_id}/${tpid}/${treatment}`
      );
      setGetTreatMedicine(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTreatPrescriptionByAppointId();
  }, []);
  // Get Treatment Medical Prescription Data END

  // Get Treatment Suggest START
  const getTreatmentSuggestAppointId = async () => {
    try {
      const res = await axios.get(
        `https://dentalgurudoctor.doaguru.com/api/doctor/getTreatmentData/${appoint_id}/${tpid}/${branch}/${sitting}`
      );
      setGetTreatSug(res.data.data);
      console.log(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTreatmentSuggestAppointId();
  }, []);
  // Get Treatment Suggest END

  const handleButton = async () => {
    try {
      window.print();
    } catch (error) {
      console.log("Error updating sitting count", error);
    }
  };

  const handleTreatNavigattion = () => {
    alert(appoint_id);
    navigate(`/TreatmentDashBoard/${tpid}/${appoint_id}`);
  };

  return (
    <>
      <Wrapper>
        <div className="container-fluid">
          <div className="row">
            <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="clinic-logo">
                <img
                  src={getBranch[0]?.head_img}
                  alt="header"
                  className="img-fluid"
                />
              </div>
            </div>
          </div>
          <hr />
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4">
              <div className="header-left">
                <h3 className="text-start">
                  Dr. {user.currentUser.employee_name}
                </h3>
                <h6
                  className="fw-bold text-capitalize text-start"
                  style={{ color: "#00b894" }}
                >
                  {user.currentUser.doctor_expertise}
                </h6>

                <h6 className="fw-bold text-capitalize text-start">
                  {user.currentUser.doctor_education_details}
                </h6>

                <h6 className="fw-bold text-capitalize text-start">
                  {getBranch[0]?.hospital_name}
                </h6>
                <h6 className="fw-bold text-capitalize text-start">
                  {user.currentUser.employee_mobile}
                </h6>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid dummy-cont h-100">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <h6 className="fw-bold text-capitalize text-end">
                Sitting Number : {sitting}
              </h6>
              <table className="table table-bordered border">
                <tbody>
                  {getPatientData?.map((item, index) => (
                    <React.Fragment key={index}>
                      <tr>
                        <th scope="row">Treatment Package ID</th>
                        <td>{tpid}</td>
                        <th scope="row">Blood Group</th>
                        <td>{item.bloodgroup}</td>
                      </tr>
                      <tr>
                        <th scope="row">Patient Name</th>
                        <td>{item.patient_name}</td>
                        <th scope="row">Disease</th>
                        <td>{item.disease}</td>
                      </tr>
                      <tr>
                        <th scope="row">Patient Mobile No.</th>
                        <td>{item.mobileno}</td>
                        <th scope="row">Allergy</th>
                        <td>{item.allergy}</td>
                      </tr>
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
              <div className="treatment">
                {/* <p className="fs-4 fw-bold">Treatment</p> */}
                {getTreatSug?.map((item, index) => (
                  <div key={index}>
                    <p className="fs-6 px-3">{item.treatment_name}</p>
                  </div>
                ))}
              </div>
              <div className="diagnosis">
                <p className="text-start fs-4 fw-bold">Diagnosis</p>
                <table className="table table-bordered border">
                  <thead>
                    <tr>
                      <th>Seleted Teeth</th>
                      <th>Disease</th>
                      <th>Chief Complain</th>
                      <th>On Exmination</th>
                      <th>Advice</th>
                    </tr>
                  </thead>
                  {getExaminData?.map((item, index) => (
                    <tbody>
                      <React.Fragment>
                        <tr>
                          <td>{item.selected_teeth}</td>
                          <td>{item.disease}</td>
                          <td>{item.chief_complain}</td>
                          <td>{item.on_examination}</td>
                          <td>{item.advice}</td>
                        </tr>
                      </React.Fragment>
                    </tbody>
                  ))}
                </table>
              </div>
              <div className="diagnosis">
                <p className="text-start fs-4 fw-bold">Lab Test</p>
                <table className="table table-bordered border">
                  <thead>
                    <tr>
                      <th>Test Name</th>
                      <th>Test</th>
                    </tr>
                  </thead>
                  {getLabData?.map((item, index) => (
                    <tbody>
                      <React.Fragment>
                        <tr>
                          <td>{item.lab_name}</td>
                          <td>{item.test}</td>
                        </tr>
                      </React.Fragment>
                    </tbody>
                  ))}
                </table>
              </div>
              <div className="Treatment">
                <p className="text-start fs-4 fw-bold">Treatment Procedure</p>
                <table className="table table-bordered border">
                  <thead>
                    <tr>
                      <th>Treatment</th>
                      <th>Teeth</th>
                      <th>Qty</th>
                      <th>Cost</th>
                      <th>Cst * Qty</th>
                      <th>Disc %</th>
                      <th>Final Cost</th>
                      <th>Note</th>
                    </tr>
                  </thead>
                  {getTreatData?.map((item, index) => (
                    <tbody>
                      <React.Fragment>
                        <tr>
                          <td>{item.dental_treatment}</td>
                          <td>{item.no_teeth}</td>
                          <td>{item.qty}</td>
                          <td>{item.cost_amt}</td>
                          <td>{item.total_amt}</td>
                          <td>{item.disc_amt}</td>
                          <td>{item.net_amount}</td>
                          <td>{item.note}</td>
                        </tr>
                      </React.Fragment>
                    </tbody>
                  ))}
                </table>
              </div>
              <div className="Medicine">
                <p className="text-start fs-4 fw-bold">Medicine Details</p>
                <table className="table table-bordered border">
                  <thead>
                    <tr>
                      <th>Medicine Name</th>
                      <th>Dosage</th>
                      <th>Frequency</th>
                      <th>Duration</th>
                      <th>Note</th>
                    </tr>
                  </thead>
                  {getTreatMedicine?.map((item, index) => (
                    <tbody>
                      <React.Fragment>
                        <tr>
                          <td>{item.medicine_name}</td>
                          <td>{item.dosage}</td>
                          <td>{item.frequency}</td>
                          <td>{item.duration}</td>
                          <td>{item.note}</td>
                        </tr>
                      </React.Fragment>
                    </tbody>
                  ))}
                </table>
              </div>
              <div className="sign-seal">
                <div>
                  <h4>Doctor's signature</h4>
                </div>
                <div>
                  <h4>Patient's signature</h4>
                </div>
              </div>
              <div className="text-center">
                <button
                  className="btn btn-success no-print mx-3 mb-3 mt-2 no-print"
                  onClick={handleButton}
                >
                  Print
                </button>
                <button
                  className="btn btn-info no-print mx-3 mb-3 mt-2"
                  onClick={() => navigate("/doctor-dashboard")}
                >
                  Appointment Dashboard
                </button>
                <button
                  className="btn btn-info no-print mx-3 mb-3 mt-2"
                  onClick={handleTreatNavigattion}
                >
                  Treatment Dashboard
                </button>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default ViewTreatPrescription;
const Wrapper = styled.div`
  overflow: hidden;
  background-color: white;
  height: 100%;
  /* .dummy-cont {
    width: 90%;
  } */
  .doctor-detail {
    margin-bottom: 0.5rem;
  }
  @media print {
    @page {
      margin: 2rem; /* Remove default page margins */
    }

    body {
      margin: 0; /* Ensure no margin on the body */
    }

    .container-fluid {
      width: 100%; /* Optionally set the width */
      margin: 0; /* Remove margin */
      padding: 0; /* Remove padding */
      page-break-before: auto;
    }
  }
  @media print {
    .no-print {
      display: none !important;
    }
  }

  .headerimg {
    img {
      width: 100%;
      height: 8.5rem;
    }
  }

  .sign-seal {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 2rem;
  }

  .clinic-logo {
    height: 9rem;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      height: 100%;
      width: 100%;
    }
  }
`;
