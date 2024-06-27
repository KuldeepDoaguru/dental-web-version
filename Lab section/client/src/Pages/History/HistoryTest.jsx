import axios from "axios";
import React, { useEffect, useState } from "react";
import moment from "moment";
import Header from "../../components/MainComponents/Header";
import Sider from "../../components/MainComponents/Sider";
import { IoArrowBackSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { FaSearch } from "react-icons/fa";
import animationData from "../../Pages/animation/loading-effect.json";
import Lottie from "react-lottie";

function HistoryTest() {
  const [patientDetails, setPatientDetails] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const currentUser = useSelector((state) => state.auth.user);

  const token = currentUser?.token;

  const fetchPatientDetails = async () => {
    try {
      setLoading(true)
      const response = await axios.get(
        `https://dentalgurulab.doaguru.com/api/lab/get-patient-details`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoading(false)
      setPatientDetails(response.data.result);
      console.log(patientDetails);
    } catch (error) {
      setLoading(false)
      console.error("Error fetching patient details:", error);
    }
  };

  useEffect(() => {
    fetchPatientDetails();
  }, [token]);

  // Filter the patient details to include only those with a "done" status
  const donePatients = patientDetails?.filter(
    (patient) => patient.test_status === "done"
  );

  // Apply search and date filters to the done patients
  const filteredPatients = donePatients?.filter((patient) => {
    const fullName = patient.patient_name.toLowerCase().trim();
    const lowerSearchQuery = searchQuery.toLowerCase().trim();
    const formattedDate = moment(patient.created_date).format("YYYY-MM-DD");

    return (
      (fullName.includes(lowerSearchQuery) ||
        patient.patient_uhid.toLowerCase().trim().includes(lowerSearchQuery) ) &&
      (!dateFilter || formattedDate === dateFilter)
    );
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPatients.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const goBack = () => {
    window.history.go(-1);
  };

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this patient detail?"
    );
    if (isConfirmed) {
      try {
        const response = await axios.delete(
          `https://dentalgurulab.doaguru.com/api/lab/patent-details/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          console.log("Patient Lab detail deleted successfully");
          fetchPatientDetails();
        }
      } catch (error) {
        console.error("Error deleting Patient Lab detail:", error);
      }
    }
  };
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <Wrapper>
      <Header />
      <div className="main">
        <div className="container-fluid">
          <div className="row flex-nowrap">
            <div className="col-xxl-1 col-xl-1 col-lg-1 col-md-1 col-sm-1 p-0">
              <Sider />
            </div>
            <div
              className="col-xxl-11 col-xl-11 col-lg-11 col-md-11 col-sm-11"
              style={{ marginTop: "5rem" }}
            >
              {/* <IoArrowBackSharp
                className="fs-1 text-black d-print-none mx-2"
                onClick={goBack}
                style={{ cursor: "pointer" }}
              /> */}
              <div className="mt-4 mx-3">
                <h2 style={{ color: "#213555" }}>List of Tests</h2>
                <div className="mb-3">
                  <div className="row">
                    <div className="col-lg-4">
                      <div className="d-flex">
                      <input
                        type="text"
                        placeholder="Search by Patient Name or UHID"
                        value={searchQuery}
                        onChange={(e) => {
                          setSearchQuery(e.target.value);
                          setCurrentPage(1); // Reset to the first page on search
                        }}
                        className="form-control searchbar mb-2"
                      />
                     
                      </div>
                    </div>
                    <div className="col-lg-2">
                      <input
                        type="date"
                        value={dateFilter}
                        onChange={(e) => {
                          setDateFilter(e.target.value);
                          setCurrentPage(1); // Reset to the first page on date filter change
                        }}
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>
                <div
                  className=""
                  style={{ maxHeight: "700px", overflowY: "auto" }}
                >
 {loading ? (
            <Lottie options={defaultOptions} height={300} width={400}></Lottie>
          ) : (
            <>
                  {filteredPatients.length === 0 ? (
                    <div className="mb-2 fs-4 fw-bold text-center">
                      No tests available
                    </div>
                  ) : (
                    <>
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th>S.no</th>
                            <th>Patient UHID</th>
                            <th>Patient Name</th>
                            <th>Age</th>
                            <th>Gender</th>
                            <th>Branch Name</th>
                            <th>Assigned Doctor Name</th>
                            <th>Lab Name</th>
                            <th>Created Date</th>
                            <th>Test Name</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentItems.map((patient, index) => (
                            <>
                              {patient.test_status === "done" && (
                                <tr key={patient.testid}>
                                  <td>{indexOfFirstItem + index + 1}</td>
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
                                  <td className="text-success fw-bold">
                                    {patient.test_status}
                                  </td>
                                  <td>
                                    <div className="">
                                      <Link
                                        to={`/final-oral-testing/${patient.testid}`}
                                      >
                                        <button className="btn btn-success m-1">
                                          View
                                        </button>
                                      </Link>
                                      <button
                                        className="btn btn-danger mx-sm-0 mx-lg-2 m-1"
                                        onClick={() =>
                                          handleDelete(patient.testid)
                                        }
                                      >
                                        Delete
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              )}
                            </>
                          ))}
                        </tbody>
                      </table>
                    
                
                <nav>
                  <ul className="pagination">
                    <li
                      className={`page-item ${
                        currentPage === 1 ? "disabled" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                      >
                        Previous
                      </button>
                    </li>
                    {Array.from(
                      {
                        length: Math.ceil(
                          filteredPatients.length / itemsPerPage
                        ),
                      },
                      (_, i) => (
                        <li
                          key={i}
                          className={`page-item ${
                            currentPage === i + 1 ? "active" : ""
                          }`}
                        >
                          <button
                            className="page-link"
                            onClick={() => paginate(i + 1)}
                          >
                            {i + 1}
                          </button>
                        </li>
                      )
                    )}
                    <li
                      className={`page-item ${
                        currentPage ===
                        Math.ceil(filteredPatients.length / itemsPerPage)
                          ? "disabled"
                          : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => paginate(currentPage + 1)}
                        disabled={
                          currentPage ===
                          Math.ceil(filteredPatients.length / itemsPerPage)
                        }
                      >
                        Next
                      </button>
                    </li>
                  </ul>
                </nav>
                </>
                  )}
 </>
            )}

                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

export default HistoryTest;

const Wrapper = styled.div`
  width: 100%;
  th {
    background-color: #213555;
    color: white;
    white-space: nowrap;
  }
  td {
    white-space: nowrap;
    
  }
  .searchbar {
    @media (min-width: 1024px) and (max-width: 1280px) {
      width: 100%;
    }
    @media (min-width: 1281px) and (max-width: 2000px) {
      width: 100%;
    }
  }
`;
