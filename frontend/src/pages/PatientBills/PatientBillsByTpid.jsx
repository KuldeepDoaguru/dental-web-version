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
  const [getBranch, setGetBranch] = useState([]);

  const getBranchDetails = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8888/api/doctor/getBranchDetails/${branch}`
      );
      console.log(data);
      setGetBranch(data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(getBranch[0]?.hospital_name);
  // Get Patient Details START
  const getPatientDetail = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8888/api/doctor/getAppointmentsWithPatientDetailsById/${tpid}`
      );
      setGetPatientData(res.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(getPatientData[0]?.address);
  useEffect(() => {
    getPatientDetail();
    getBranchDetails();
  }, []);
  // Get Patient Details END

  // Get Patient Examintion Details START
  const getExaminDetail = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8888/api/doctor/getDentalDataByTpid/${tpid}/${branch}`
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
        `http://localhost:8888/api/doctor/getTreatmentDetailsViaTpid/${tpid}/${branch}`
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
      const { data } = await axios.get(
        `http://localhost:8888/api/doctor/getTreatPrescriptionByTpid/${tpid}/${branch}`
      );
      setGetTreatMedicine(data);
      console.log(data);
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
      const { data } = await axios.get(
        `http://localhost:8888/api/doctor/getTreatSuggestViaTpid/${tpid}/${branch}`
      );
      setGetTreatSug(data.data);
      console.log(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTreatmentSuggestAppointId();
  }, []);

  console.log(getTreatSug);
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
        {/* branch details */}
        <div className="container-fluid">
          <div className="row">
            <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
              <div className="clinic-logo">
                <img
                  src="https://res.cloudinary.com/duiiayf3d/image/upload/v1699947747/samples/landscapes/landscape-panorama.jpg"
                  alt=""
                  className="img-fluid"
                />
              </div>
            </div>
            <div className="col-xxl-8 col-xl-8 col-lg-8 col-md-6 col-sm-12 col-12">
              <div className="header-left">
                <h1 className="text-center">Invoice</h1>
                <hr />
                <h5>
                  <strong>Clinic Name :</strong>{" "}
                  <span
                    className="fw-bold text-capitalize"
                    style={{ color: "#00b894" }}
                  >
                    {getBranch[0]?.hospital_name}
                  </span>
                </h5>
                <hr />
                <h5>
                  <strong>Address :</strong>{" "}
                  <span
                    className="fw-bold text-capitalize"
                    style={{ color: "#00b894" }}
                  >
                    {getBranch[0]?.branch_address}
                  </span>
                </h5>
                <hr />
                <h5>
                  <strong>Phone No. :</strong>{" "}
                  <span
                    className="fw-bold text-capitalize"
                    style={{ color: "#00b894" }}
                  >
                    {getBranch[0]?.branch_contact}
                  </span>
                </h5>
                <hr />
                <h5>
                  <strong>Email ID :</strong>{" "}
                  <span
                    className="fw-bold text-capitalize"
                    style={{ color: "#00b894" }}
                  >
                    {getBranch[0]?.branch_email}
                  </span>
                </h5>
                <hr />
              </div>
            </div>
          </div>
        </div>
        {/* patient details */}
        <div className="container-fluid">
          <div className="heading-title">
            <h4>Patient Details :</h4>
          </div>
          <table className="table table-bordered border">
            <tbody>
              {getPatientData?.map((item, index) => (
                <React.Fragment key={index}>
                  <tr>
                    <th scope="row">UHID</th>
                    <td>{item.uhid}</td>
                    <th scope="row">Gender</th>
                    <td>{item.gender}</td>
                  </tr>

                  <tr>
                    <th scope="row">Name</th>
                    <td>{item.patient_name}</td>
                    <th scope="row">Age</th>
                    <td>{item.age}</td>
                  </tr>
                  <tr>
                    <th scope="row">Address</th>
                    <td>{item.address}</td>
                    <th scope="row">Invoice No.</th>
                    <td>{tpid}</td>
                  </tr>
                  <tr>
                    <th scope="row">Mobile No.</th>
                    <td>{item.mobileno}</td>
                    <th scope="row">Date</th>
                    <td>{item.allergy}</td>
                  </tr>
                  <tr>
                    <th scope="row">Email</th>
                    <td>{item.emailid}</td>
                    <th scope="row">Treatment Package ID</th>
                    <td>{tpid}</td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
        {/* doctor details */}
        <div className="container-fluid">
          <div className="heading-title">
            <h4>Doctor Details :</h4>
          </div>
          <div className="d-flex justify-content-between">
            <div className="text-start docDetails">
              <p>
                <strong>Doctor Name :</strong> Dr.{" "}
                {user.currentUser.employee_name}
              </p>
              <p>
                <strong>Mobile :</strong> {user.currentUser.employee_mobile}
              </p>
              <p>
                <strong>Email :</strong> {user.currentUser.email}
              </p>
            </div>
          </div>
        </div>

        {/* patient observation */}
        <div className="container-fluid">
          <div className="heading-title">
            <h4>Patient Observation :</h4>
          </div>
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

        {/* treatment provided */}
        <div className="container-fluid">
          <div className="heading-title">
            <h4>Treatment Procedure :</h4>
          </div>
          <div className="Treatment">
            {/* <p className="text-start fs-4 fw-bold">Treatment Procedure</p> */}
            <table className="table table-bordered border">
              <thead>
                <tr>
                  <th>Sitting Number</th>
                  <th>Treatment</th>
                  <th>Teeth</th>
                  <th>Qty</th>
                  <th>Cost</th>
                  <th>Cst * Qty</th>
                  <th>Disc %</th>
                  <th>Final Cost</th>
                </tr>
              </thead>
              {getTreatData?.map((item, index) => (
                <tbody>
                  <React.Fragment>
                    <tr
                      className={
                        index % 2 === 0 ? "table-primary" : "table-info"
                      }
                    >
                      <td>{item.sitting_number}</td>
                      <td>{item.dental_treatment}</td>
                      <td>{item.no_teeth}</td>
                      <td>{item.qty}</td>
                      <td>{item.cost_amt}</td>
                      <td>{item.total_amt}</td>
                      <td>{item.disc_amt}</td>
                      <td>{item.net_amount}</td>
                    </tr>
                  </React.Fragment>
                </tbody>
              ))}
              <tfoot>
                <tr>
                  <td
                    colSpan="7"
                    style={{ textAlign: "center", color: "white" }}
                    className="heading-title"
                  >
                    Total Cost:
                  </td>
                  <td className="heading-title" style={{ color: "white" }}>
                    {/* Calculate total cost here */}
                    {/* Assuming getTreatData is an array of objects with 'net_amount' property */}
                    {getTreatData.reduce(
                      (total, item) => total + item.net_amount,
                      0
                    )}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        <div className="container-fluid">
          <div className="row gutter">
            <div className="col-xxl-8 col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12">
              <div className="border">
                <div className="heading-title mt-0">
                  <h4>Total Amount In Words :</h4>
                </div>
                <div className="text-word"></div>
              </div>
              <div className="border">
                <div className="heading-title mt-0">
                  <h4>Payment Info :</h4>
                </div>
                <div className="">
                  <table className="table table-bordered">
                    <tbody>
                      <tr>
                        <td className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 border p-1">
                          Account No.:
                        </td>
                        <td className="col-xxl-8 col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12 border p-1">
                          Account No.:
                        </td>
                      </tr>
                      <tr>
                        <td className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 border p-1">
                          Account Name:
                        </td>
                        <td className="col-xxl-8 col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12 border p-1">
                          Account No.:
                        </td>
                      </tr>
                      <tr>
                        <td className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 border p-1">
                          Bank Name:
                        </td>
                        <td className="col-xxl-8 col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12 border p-1">
                          Account No.:
                        </td>
                      </tr>
                      <tr>
                        <td className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 border p-1">
                          IFSC/Bank Code:
                        </td>
                        <td className="col-xxl-8 col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12 border p-1">
                          Account No.:
                        </td>
                      </tr>
                      <tr>
                        <td className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 border p-1">
                          UPI ID:
                        </td>
                        <td className="col-xxl-8 col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12 border p-1">
                          Account No.:
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="col-xxl-8 col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12"></div>
          </div>
        </div>

        {/* previous bill structure */}
        {/* <div className="container-fluid dummy-cont h-100">
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
                      <th>Sitting Number</th>
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
                          <td>{item.sitting_number}</td>
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
                      <th>Sitting Number</th>
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
                          <td>{item.sitting_number}</td>
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
        </div> */}
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
  .clinic-logo {
    height: 13rem;
    img {
      height: 100%;
    }
  }
  .heading-title {
    background-color: #34495e;
    margin-top: 1rem;
    padding: 2px;
    padding-left: 0.5rem;
    border-radius: 3px;
    h4 {
      color: white;
    }
  }

  .docDetails {
    p {
      margin: 0rem;
    }
  }

  hr {
    margin: 0.2rem;
  }
  .text-word {
    height: 3rem;
  }

  .gutter {
    --bs-gutter-x: 0rem !important;
  }
`;
