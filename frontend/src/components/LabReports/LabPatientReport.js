import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IoArrowBackSharp } from "react-icons/io5";
import axios from "axios";
import moment from "moment";
import Header from "../Header";
import Sider from "../Sider";
import ReportCardPage from "./ReportCardPage";
import { useSelector } from "react-redux";
// import BranchSelector from "../../../components/BranchSelector";
// import ReportCardPage from "./ReportCardPage";

const LabPatientReport = () => {
  const user = useSelector((state) => state.user);
  const token = user.token;
  console.log("User State:", user);
  const [patientDetails, setPatientDetails] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  const goBack = () => {
    window.history.go(-1);
  };

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
      fullName.includes(searchQuery.toLowerCase().trim()) &&
      (!dateFilter || formattedDate === dateFilter)
    );
  });

  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/BloodTest/${id}`);
  };

  // ***********This for Excel sheet**********
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
  const [sorted, setSorted] = useState();
  const [inp, setInp] = useState("");

  const handleSearch = () => {
    let newArr = sorted.filter((patient) => {
      let searchWork = inp.toLowerCase();
      for (let prop in patient) {
        let word = patient[prop].toString().toLowerCase();
        if (word.includes(searchWork)) {
          return true;
        }
      }
      return false;
    });
    setSorted(newArr);
  };

  const handleSort = () => {
    let newArr = [...sorted].sort((a, b) => {
      let nameA = a.name.toLowerCase();
      let nameB = b.name.toLowerCase();
      if (nameA < nameB) {
        return -1;
      } else if (nameA > nameB) {
        return 1;
      } else {
        return 0;
      }
    });
    setSorted(newArr);
  };
  return (
    <>
      <Container>
        <Header />
        <div className="main">
          <div className="container-fluid">
            <div className="row flex-nowrap ">
              <div className="col-lg-1 col-1 p-0">
                <Sider />
              </div>
              <div className="col-lg-11 col-11 ps-0">
                <IoArrowBackSharp
                  className="fs-1 text-black d-print-none"
                  onClick={goBack}
                />
                <div className="container-fluid mt-3">
                  <div className="d-flex justify-content-between">
                    {/* <BranchSelector /> */}
                  </div>
                </div>
                <div className="container mt-3">
                  <div className="container-fluid">
                    <div className="row mt-3">
                      {/* <div className="col-1"></div> */}

                      <div className="col-12">
                        <nav class="navbar navbar-expand-lg bg-body-tertiary">
                          <div class="container d-flex justify-content-center">
                            <h2 className=""> Lab Reports Dashboard</h2>
                          </div>
                        </nav>

                        <ReportCardPage />
                        <div className="container-fluid mt-4">
                          <h2 style={{ color: "#201658" }}>
                            List of All Report
                          </h2>
                          <div className="mb-3">
                            <div className="row">
                              <div className="col-lg-4">
                                <input
                                  type="text"
                                  placeholder="Search by name or doctor"
                                  value={searchQuery}
                                  onChange={(e) =>
                                    setSearchQuery(e.target.value)
                                  }
                                  className="form-control mb-lg-0  mb-md-2 rounded p-2"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="res-table">
                            <table className="table table-bordered">
                              <thead>
                                <tr>
                                  <th className="sticky">Test ID</th>
                                  <th className="sticky">Patient UHID </th>
                                  <th className="sticky">Patient Name </th>
                                  <th className="sticky"> Age </th>
                                  <th className="sticky"> Gender </th>
                                  <th className="sticky">Branch Name </th>
                                  <th className="sticky">
                                    Assigned Doctor Name
                                  </th>
                                  <th className="sticky">Lab Name</th>
                                  <th className="sticky">Created Date</th>
                                  <th className="sticky">Patient Tests </th>
                                  <th className="sticky">Tests Status </th>
                                </tr>
                              </thead>

                              <tbody>
                                {filteredPatients.map((patient, index) => (
                                  <>
                                    <tr key={patient.testid}>
                                      <td>{patient.testid}</td>
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
                                          <p className="text-success fs-6 themecolor">
                                            {patient.test_status}
                                          </p>
                                        </td>
                                      )}

                                      {patient.test_status === "pending" && (
                                        <td>
                                          <p className="text-danger fs-6">
                                            {patient.test_status}
                                          </p>
                                        </td>
                                      )}
                                    </tr>
                                  </>
                                  // Wrap the entire row inside a conditional statement based on test status
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>

                        <div className="d-flex justify-content-center">
                          <div>
                            <exportToExcel />
                            <button
                              type="button"
                              class="btn btn-primary themecolor text-light py-2 px-4"
                              onClick={exportToExcel}
                            >
                              Download
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default LabPatientReport;
const Container = styled.div`
  .res-table {
    max-height: 30rem;
    overflow: auto;
  }

  th {
    background-color: #201658;
    color: white;
    position: sticky;
    white-space: nowrap;
  }

  .sticky {
    position: sticky;
    top: 0;
    background-color: #201658;
    color: white;
    z-index: 1;
  }
  /* .themecolor {
    background-color: #201658 !important;
    border: none;
  } */
`;
