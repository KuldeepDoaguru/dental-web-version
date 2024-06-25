import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { IoArrowBackSharp } from "react-icons/io5";
import axios from "axios";
import moment from "moment";
import { Button } from "react-bootstrap";
import Header from "../Header";
import Sider from "../Sider";
import { useSelector } from "react-redux";

const RadiologyTest = () => {
  const user = useSelector((state) => state.user);
  console.log(user);
  const token = user.token;
  console.log(token);
  const [patientDetails, setPatientDetails] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const response = await axios.get(
          `https://dentalguruaccountant.doaguru.com/api/v1/accountant/getPatientLabTest`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPatientDetails(response.data);
      } catch (error) {
        console.error("Error fetching patient details:", error);
      }
    };

    fetchPatientDetails();
  }, []);

  const filteredPatients = patientDetails.filter((patient) => {
    const fullName =
      `${patient.patient_name} ${patient.assigned_doctor_name}`.toLowerCase();
    const formattedDate = moment(patient.created_date).format("YYYY-MM-DD");
    return (
      fullName.includes(searchQuery.toLowerCase()) &&
      (!dateFilter || formattedDate === dateFilter)
    );
  });

  const goBack = () => {
    window.history.go(-1);
  };

  const exportToExcel = () => {
    const csvRows = [];
    const table = document.querySelector(".table");

    if (!table) {
      console.error("Table element not found");
      return;
    }

    table.querySelectorAll("tr").forEach((row) => {
      const rowData = [];
      row.querySelectorAll("td, th").forEach((cell) => {
        rowData.push(cell.innerText);
      });
      csvRows.push(rowData.join(","));
    });

    const csvContent = csvRows.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "table_data.csv";
    link.click();
    window.URL.revokeObjectURL(link.href);
  };
  return (
    <Wrapper>
      <Container>
        <div className="header">
          <Header />
        </div>
        <div className="container-fluid">
          <div className="row">
            <div
              className="col-xxl-1 col-xl-1 col-lg-1 col-md-2 col-sm-2 p-0"
              id="hd"
            >
              <Sider />
            </div>
            <div
              className="col-xxl-11 col-xl-11 col-lg-11 col-md-10 col-sm-10"
              id="set"
            >
              <div className="col-12 px-2 px-md-5">
                <IoArrowBackSharp
                  className="fs-1 text-black d-print-none"
                  onClick={goBack}
                />{" "}
              </div>

              <div className="container-fluid mt-4">
                <div className="row ms-md-3">
                  <div className="col-lg-12 col-md-12">
                    <h2>List of Radiology Test</h2>
                    <div className="mb-3">
                      <div className="row">
                        <div className="col-lg-2">
                          <input
                            type="text"
                            placeholder="Search by name or doctor"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="form-control"
                          />
                        </div>
                        <div className="col-lg-2">
                          <input
                            type="date"
                            value={dateFilter}
                            onChange={(e) => setDateFilter(e.target.value)}
                            className="form-control"
                          />
                        </div>
                      </div>
                    </div>
                    <div
                      className=""
                      style={{ maxHeight: "30rem", overflowY: "auto" }}
                    >
                      <table className="table table-bordered ">
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Patient UHID </th>
                            <th>Patient Name </th>
                            <th> Age </th>
                            <th> Gender </th>
                            <th>Branch Name </th>
                            <th>Assigned Doctor Name</th>
                            <th>Lab Name</th>
                            <th>Created Date</th>
                            <th>Patient Tests </th>
                            <th>Tests Status </th>
                          </tr>
                        </thead>

                        <tbody>
                          {filteredPatients.map((patient, index) => (
                            <>
                              {patient.lab_name === "radiology" && (
                                <tr key={patient.testid}>
                                  <td>{index + 1}</td>
                                  <td>{patient.patient_uhid}</td>
                                  <td>{patient.patient_name}</td>
                                  <td>{patient.age}</td>
                                  <td>{patient.gender}</td>
                                  <td>{patient.branch_name}</td>

                                  <td>{patient.assigned_doctor_name}</td>
                                  <td>{patient.lab_name}</td>
                                  <td>
                                    {moment(patient.created_date).format(
                                      "DD/MM/YYYY"
                                    )}
                                  </td>
                                  <td>{patient.test}</td>
                                  {patient.test_status === "done" && (
                                    <td>
                                      <p className="text-success fw-bold">
                                        {patient.test_status}
                                      </p>
                                    </td>
                                  )}

                                  {patient.test_status === "pending" && (
                                    <td>
                                      <p className="text-danger fw-bold">
                                        {patient.test_status}
                                      </p>
                                    </td>
                                  )}
                                </tr>
                              )}
                            </>
                            // Wrap the entire row inside a conditional statement based on test status
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-center mt-4">
                <div>
                  <exportToExcel />
                  <button
                    type="button"
                    class="btn btn1 text-light py-2 px-4"
                    onClick={exportToExcel}
                  >
                    Download
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Wrapper>
  );
};

export default RadiologyTest;

const Container = styled.div`
  .custom-cursor-pointer {
    cursor: pointer;
  }
  .btn1 {
    background-color: #201658;
  }
`;
const Wrapper = styled.div`
  th {
    background-color: #201658;
    color: white;
    white-space: nowrap;
  }
  #set {
    margin-left: -4.5rem;
    padding-left: 150px; /* Width of sidebar */
    padding-top: 90px; /* Height of header */
    flex-grow: 1;
    overflow-y: auto;

    @media screen and (max-width: 768px) {
      margin-left: -2rem;
    }
    @media screen and (min-width: 768px) and (max-width: 1020px) {
      margin-left: -1rem;
    }
    @media screen and (min-width: 1020px) and (max-width: 1500px) {
      margin-left: -1.5rem;
    }
    @media screen and (min-width: 1500px) and (max-width: 1700px) {
      margin-left: 0.1rem;
    }
    @media screen and (min-width: 1700px) and (max-width: 2000px) {
      margin-left: 0.1rem;
    }

    @media screen and (min-width: 2000px) and (max-width: 2500px) {
      margin-left: 0rem;
    }
  }

  #hd {
    padding-top: 60px; /* Height of header */
    min-height: 100vh;
    position: fixed;

    @media screen and (max-width: 768px) {
      height: 68rem;
    }
    @media screen and (min-width: 768px) and (max-width: 1020px) {
      height: 58rem;
    }
  }
  .header {
    position: fixed;
    min-width: 100%;
    z-index: 100;
  }
`;
