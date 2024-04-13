import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const PatientBillsByTpid = () => {
  const { tpid } = useParams();
  const navigate = useNavigate();
  const [getPatientData, setGetPatientData] = useState([]);
  const user = useSelector((state) => state.user);
  const branch = user.currentUser.branch_name;
  console.log(branch);
  const [getExaminData, setGetExaminData] = useState([]);
  const [getTreatData, setGetTreatData] = useState([]);
  const [getTreatMedicine, setGetTreatMedicine] = useState([]);
  const [getTreatSug, setGetTreatSug] = useState([]);

  // Get Patient Details START
  //   const getPatientDetail = async () => {
  //     try {
  //       const res = await axios.get(
  //         `http://localhost:8888/api/doctor/getAppointmentsWithPatientDetailsById/${id}`
  //       );
  //       setGetPatientData(res.data.result);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   useEffect(() => {
  //     getPatientDetail();
  //   }, []);
  // Get Patient Details END

  // Get Patient Examintion Details START
  //   const getExaminDetail = async () => {
  //     try {
  //       const res = await axios.get(
  //         `http://localhost:8888/api/doctor/getDentalDataByID/${id}/${tpid}`
  //       );
  //       setGetExaminData(res.data);
  //       console.log(res.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   useEffect(() => {
  //     getExaminDetail();
  //   }, []);
  // Get Patient Examintion Details END

  // Get Patient Treatment Details START
  //   const getTreatDetail = async () => {
  //     try {
  //       const { data } = await axios.get(
  //         `http://localhost:8888/api/doctor/getTreatmentDetailsViaSitting/${branch}/${id}/${tpid}/${sitting}`
  //       );
  //       setGetTreatData(data);
  //       console.log(data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   console.log(getTreatData);
  //   useEffect(() => {
  //     getTreatDetail();
  //   }, []);
  // Get Patient Treatment Details END

  // Get Treatment Medical Prescription Data START
  //   const getTreatPrescriptionByAppointId = async () => {
  //     try {
  //       const res = await axios.get(
  //         `http://localhost:8888/api/doctor/getTreatPrescriptionByAppointId/${id}/${tpid}`
  //       );
  //       setGetTreatMedicine(res.data);
  //       console.log(res.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   useEffect(() => {
  //     getTreatPrescriptionByAppointId();
  //   }, []);
  // Get Treatment Medical Prescription Data END

  // Get Treatment Suggest START
  //   const getTreatmentSuggestAppointId = async () => {
  //     try {
  //       const res = await axios.get(
  //         `http://localhost:8888/api/doctor/getTreatmentData/${id}/${tpid}/${branch}/${sitting}`
  //       );
  //       setGetTreatSug(res.data.data);
  //       console.log(res.data.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   useEffect(() => {
  //     getTreatmentSuggestAppointId();
  //   }, []);
  // Get Treatment Suggest END

  const handleButton = async () => {
    try {
      window.print();
    } catch (error) {
      console.log("Error updating sitting count", error);
    }
  };

  return (
    <>
      <Wrapper>
        <div className="container-fluid dummy-cont h-100">
          <div className="headerimg">
            <img
              src="https://res.cloudinary.com/duiiayf3d/image/upload/v1699947747/samples/landscapes/landscape-panorama.jpg"
              alt=""
            />
          </div>
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <div className="doctor-detail">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="text-start">
                    <h2>Dr. {user.currentUser.employee_name}</h2>
                    <p className="fs-5">
                      ({user.currentUser.employee_designation})
                    </p>
                    <p className="fs-5 m-0">Treatment Package ID : {tpid}</p>
                  </div>
                  <div className="text-start">
                    <h5>Mobile Number</h5>
                    <p className="m-0 fs-5">
                      {user.currentUser.employee_mobile}
                    </p>
                    <p className="m-0 fs-5">{user.currentUser.email}</p>
                  </div>
                </div>
              </div>
              <table className="table table-bordered border">
                <tbody>
                  {getPatientData?.map((item, index) => (
                    <React.Fragment key={index}>
                      <tr>
                        <th scope="row">Appoint ID</th>
                        <td>{item.appoint_id}</td>
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
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default PatientBillsByTpid;
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
`;
