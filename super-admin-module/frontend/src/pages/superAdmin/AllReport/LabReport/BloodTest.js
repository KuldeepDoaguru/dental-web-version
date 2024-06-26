import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { IoArrowBackSharp } from "react-icons/io5";
import axios from "axios";
import moment from "moment";
import { Button } from "react-bootstrap";
import Header from "../../../../components/Header";
import Sider from "../../../../components/Sider";
import { useSelector } from "react-redux";

const BloodTest = () => {
  const [patientDetails, setPatientDetails] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const user = useSelector((state) => state.user);
  console.log(`User Name: ${user.name}, User ID: ${user.id}`);
  console.log("User State:", user);

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const response = await axios.get(
          `https://dentalgurusuperadmin.doaguru.com/api/v1/super-admin/getPatientLabTest`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
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
        <Header />
        <div className="container-fluid">
          <div className="row">
            <div className="col-1 p-0">
              <Sider />
            </div>
            <div className="col-11" style={{ marginTop: "5rem" }}>
              <div className="col-12 p-0">
                <IoArrowBackSharp
                  className="fs-1 text-black d-print-none"
                  onClick={goBack}
                />
              </div>

              <div className="container-fluid mt-4">
                <h2>List of Blood Test</h2>
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
                  style={{ maxHeight: "700px", overflowY: "auto" }}
                >
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Patient UHID</th>
                        <th>Patient Name</th>
                        <th>Age</th>
                        <th>Gender</th>
                        <th>Branch Name</th>
                        <th>Assigned Doctor Name</th>
                        <th>Lab Name</th>
                        <th>Created Date</th>
                        <th>Patient Tests</th>
                        <th>Tests Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredPatients.map((patient, index) => (
                        <React.Fragment key={patient.testid}>
                          {patient.lab_name === "blood" && (
                            <tr>
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
                        </React.Fragment>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="d-flex justify-content-center mt-4">
                <div>
                  <button
                    type="button"
                    className="btn btn1 text-light py-2 px-4"
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

export default BloodTest;

const Container = styled.div`
  .custom-cursor-pointer {
    cursor: pointer;
  }
  .btn1 {
    background-color: #004aad;
  }
`;
const Wrapper = styled.div`
  th {
    background-color: #004aad;
    color: white;
  }
`;
