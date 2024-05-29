import axios from "axios";
import cogoToast from "cogo-toast";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import SideBar from "../../components/Doctor/SideBar";
import { IoArrowBackSharp } from "react-icons/io5";
// import signature from "../BloodTest/signature_maker_after_.webp";
import signature from "../../images/signature_maker_after_.webp";
import styled from "styled-components";
import { useSelector } from "react-redux";
import HeadBar from "../../components/Doctor/HeadBar";

const Print_Oral_Blood = () => {
  const { id } = useParams();
  console.log(id);
  const [labReportData, setLabReportData] = useState([]);
  const [patientDetails, setPatientDetails] = useState([]);
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.currentUser);
  console.log(user);

  const goBack = () => {
    window.history.go(-1);
  };

  const fetchPatientDetails = async () => {
    try {
      const { data } = await axios.get(
        `https://dentalgurudoctor.doaguru.com/api/doctor/get-patient-details-by-id/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setPatientDetails(data);
    } catch (error) {
      console.error("Error fetching patient details:", error);
    }
  };

  const fetchPatientTestDetails = async () => {
    try {
      const { data } = await axios.get(
        `https://dentalgurudoctor.doaguru.com/api/doctor/get-patient-test-details-by-id/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setLabReportData(data);
    } catch (error) {
      console.error("Error fetching patient details:", error);
    }
  };

  const fetchNotes = async () => {
    try {
      const response = await axios.get(
        `https://dentalgurudoctor.doaguru.com/api/doctor/getpatienttest-notes/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (response.status === 200) {
        setNotes(response.data);
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  useEffect(() => {
    fetchPatientDetails();
    fetchPatientTestDetails();
    fetchNotes();
  }, []);

  const handleprint = () => {
    window.print();
  };

  return (
    <Wrapper>
      <div className="d-print-none">
        <HeadBar />
      </div>

      <div clasNameName="main">
        <div className="container-fluid">
          <div className="row flex-nowrap ">
            <div className="col-xxl-1 col-xl-1 col-lg-1 d-print-none col-sm-1 p-0">
              <SideBar />
            </div>
            <div
              className="col-xxl-11 col-xl-11 col-lg-11 col-md-12 col-sm-12 p-0"
              style={{ marginTop: "5rem" }}
            >
              <IoArrowBackSharp
                className="fs-1 text-black d-print-none"
                onClick={goBack}
                style={{ cursor: "pointer" }}
              />

              <div className="mx-4">
                <div className="row">
                  <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
                    <div className="row d-flex justify-content-between">
                      <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-8 col-sm-6 mt-4">
                        <div>
                          <h5>Branch : {user.branch_name}</h5>
                        </div>
                        <form className="d-flex fw-semibold">
                          <p>Address </p>
                          <p className="ms-1"> : </p>
                          <p className="ms-2">{user.address}</p>
                        </form>

                        <form className="d-flex">
                          <h5>Email id : </h5>
                          <h5 className="ms-2">DentalGuru@Gmail.com</h5>
                        </form>

                        <form className="d-flex ms-auto my-sm mt-1">
                          <h5>Contact Number : </h5>
                          <h5 className="ms-2">+91-7000000058 </h5>
                        </form>
                      </div>

                      <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-4 col-sm-6 mt-4">
                        <div className="text-center mt-2 footer ">
                          <img
                            className="ms-4"
                            src="https://res.cloudinary.com/dq5upuxm8/image/upload/v1707404036/dental%20guru/dentalguru_v1g7k0.png"
                            alt="Logo"
                            width="100"
                            height="85"
                          />
                          <h3 className="ms-2">Dental Guru</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <hr
                  style={{
                    color: "Grey",
                    height: "2px",
                  }}
                /> */}

                <div className="row d-flex justify-content-between ">
                  <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
                    <div class="table-responsive rounded">
                      <table class="table tables table-bordered rounded">
                        <tbody>
                          <tr className="table-row">
                            <td
                              className="table-small"
                              style={{ width: "20%" }}
                            >
                              Bill No. : {patientDetails[0]?.testid}
                            </td>
                            <td
                              className="table-small"
                              style={{ width: "20%" }}
                            >
                              UHID : {patientDetails[0]?.patient_uhid}
                            </td>
                          </tr>
                        </tbody>

                        <tbody>
                          <tr className="table-row">
                            <td
                              className="table-small"
                              style={{ width: "20%" }}
                            >
                              Treatment Id : {patientDetails[0]?.tpid}
                            </td>

                            <td
                              colSpan="2"
                              className="table-small"
                              style={{ width: "20%" }}
                            >
                              Patient Name : {patientDetails[0]?.patient_name}
                            </td>
                          </tr>
                        </tbody>
                        <tbody>
                          <tr className="table-row">
                            <td
                              className="table-small"
                              style={{ width: "20%" }}
                            >
                              Advised By :{" "}
                              {patientDetails[0]?.assigned_doctor_name}
                            </td>
                            <td
                              className="table-small"
                              style={{ width: "10%" }}
                            >
                              Collection Date :{" "}
                              {moment(labReportData[0]?.collection_date).format(
                                "DD/MM/YYYY"
                              )}
                            </td>
                          </tr>
                        </tbody>

                        <tbody>
                          <tr className="table-row">
                            <td
                              className="table-small"
                              style={{ width: "20%" }}
                            >
                              Center Name : {patientDetails[0]?.branch_name}
                            </td>
                            <td
                              className="table-small"
                              style={{ width: "10%" }}
                            >
                              Authenticate Date:{" "}
                              {moment(
                                labReportData[0]?.authenticate_date
                              ).format("DD/MM/YYYY")}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <div className="">
                  <div className="row">
                    <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
                      <table className=" bg-white text-center table table-borderless">
                        <thead className="border">
                          <th className="p-3 text-start">Test</th>
                          <th className="p-3 text-start">Result</th>
                          {patientDetails[0]?.lab_name === "oral" && (
                            <>
                              <th className="p-3">Unit</th>{" "}
                              <th className="p-3">Range</th>
                            </>
                          )}
                          {patientDetails[0]?.lab_name === "pathology" && (
                            <>
                              <th className="p-3">Unit</th>{" "}
                              <th className="p-3">Range</th>
                            </>
                          )}
                          {patientDetails[0]?.lab_name === "radiology" && (
                            <th className="p-3 text-start">Cost</th>
                          )}
                        </thead>
                        <tbody className="border">
                          <tr>
                            <td className="text-start">
                              {labReportData[0]?.test}
                            </td>
                            <td className="text-start">
                              {labReportData[0]?.result}
                            </td>
                            {patientDetails[0]?.lab_name === "oral" && (
                              <td>{labReportData[0]?.unit}</td>
                            )}
                            {patientDetails[0]?.lab_name === "pathology" && (
                              <td>{labReportData[0]?.unit}</td>
                            )}
                            {patientDetails[0]?.lab_name === "oral" && (
                              <>
                                <td className="text-start">40 - 59</td>
                              </>
                            )}
                            {patientDetails[0]?.lab_name === "pathology" && (
                              <>
                                <td>40 - 59</td>
                              </>
                            )}
                            {patientDetails[0]?.lab_name === "radiology" && (
                              <td className="text-start">
                                {labReportData[0]?.cost}
                              </td>
                            )}
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="note mt-3">
                      <h5 className=" fw-bold">Notes:-</h5>

                      <ul>
                        {notes.map((note) => (
                          <li key={note.id}>
                            {note.note_text}
                            <p>{note.additional_info}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="">
                  <div className="row  mt-5">
                    <div className="d-flex justify-content-between">
                      <div className="col-lg-4 form-group">
                        <div className="text-center">
                          {/* <img
                            src={signature}
                            style={{ width: "100px", height: "50px" }}
                            alt="Today's Image"
                          /> */}
                        </div>
                        <h4 className=" text-center fs-5 fw-bold">
                          {user.employee_name}
                        </h4>
                        <h6 className=" text-center">LAB ATTENDANT</h6>
                      </div>

                      <div className="col-lg-4 form-group">
                        <div className="text-center">
                          {/* <img
                            src={signature}
                            style={{ width: "100px", height: "50px" }}
                            alt="Today's Image"
                          /> */}
                        </div>
                        <h4 className=" text-center fs-5 fw-bold">
                          {patientDetails[0]?.assigned_doctor_name}
                        </h4>
                        <h6 className=" text-center">ASSIGNED BY DOCTOR</h6>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="d-flex justify-content-center">
                  <button
                    className="btn btn-success p-3 mb-2 mt-5 btn-print"
                    onClick={handleprint}
                  >
                    Print page
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Print_Oral_Blood;

const Wrapper = styled.div`
  .btn-print {
    @media print {
      display: none;
    }
  }
`;
