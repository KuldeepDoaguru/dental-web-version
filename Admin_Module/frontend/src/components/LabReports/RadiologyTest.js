import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { IoArrowBackSharp } from "react-icons/io5";
import axios from "axios";
import moment from "moment";
import { Button } from "react-bootstrap";
import HeaderAdmin from "../../pages/admin/HeaderAdmin";
import SiderAdmin from "../../pages/admin/SiderAdmin";
import { useSelector } from "react-redux";

const RadiologyTest = () => {
  const user = useSelector((state) => state.user.currentUser);
  console.log(user);
  const [patientDetails, setPatientDetails] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const response = await axios.get(
          `https://dentalguruadmin.doaguru.com/api/v1/admin/getPatientLabTest`,
          {
            headers: {
              "Content-Type": "multipart/form-data",
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
  // Filter the patient details to include only those with a "radiologytest" status
  const radiologytestPatients = patientDetails?.filter(patient => patient.lab_name === "radiology");

  // Apply search and date filters to the radiologytest patients
  const filteredPatients = radiologytestPatients?.filter((patient) => {
    const fullName = `${patient.patient_name}`.toLowerCase();
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
        <HeaderAdmin />
        <div className="container-fluid">
          <div className="row">
            <div className="col-1 p-0">
              <SiderAdmin />
            </div>
            <div className="col-11" style={{ marginTop: "5rem" }}>
              <div className="col-12 p-0">
                <IoArrowBackSharp
                  className="fs-1 text-black d-print-none"
                  onClick={goBack}
                />{" "}
              </div>

              <div className="container-fluid mt-4">
                <h2>List of Radiology Test</h2>
                <div className="mb-3">
                  <div className="row">
                    <div className="col-lg-2">
                      <input
                        type="text"
                        placeholder="search by patient name"
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
                  {filteredPatients.length === 0 ? (
          <div className='mb-2 fs-4 fw-bold text-center'>No radiology test available</div>
          ) : (

<>
                  <table className="table table-bordered">
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
                  </>
          )
        }
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
    background-color: #1abc9c;
  }
`;
const Wrapper = styled.div`
  th {
    background-color: #1abc9c;
    color: white;
  }
`;
