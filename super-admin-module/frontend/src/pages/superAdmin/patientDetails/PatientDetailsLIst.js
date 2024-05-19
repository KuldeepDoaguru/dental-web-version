import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../../../components/Header";
import Sider from "../../../components/Sider";
import BranchSelector from "../../../components/BranchSelector";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

const PatientDetailsLIst = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  console.log(`User Name: ${user.name}, User ID: ${user.id}`);
  console.log("User State:", user);
  const branch = useSelector((state) => state.branch);
  console.log(`User Name: ${branch.name}`);
  const [patList, setPatList] = useState([]);
  const [keyword, setkeyword] = useState("");

  const getPatByBranch = async () => {
    try {
      const { data } = await axios.get(
        `https://dentalgurusuperadmin.doaguru.com/api/v1/super-admin/getPatientDetailsByBranch/${branch.name}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log(data);
      setPatList(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPatByBranch();
  }, [branch.name]);

  console.log(patList);
  return (
    <>
      <Container>
        <Header />
        <div className="main">
          <div className="container-fluid">
            <div className="row flex-nowrap ">
              <div className="col-lg-1 col-md-1 col-1 p-0">
                <Sider />
              </div>
              <div className="col-lg-11 col-md-11 col-11 ps-0 mx-2">
                <div className="container-fluid mt-3">
                  <div className="d-flex justify-content-between">
                    <BranchSelector />
                  </div>
                </div>
                <div className="container-fluid mt-3">
                  <h2 className="text-center">Patient Details List</h2>
                  <div className="d-flex justify-content-between">
                    <div>
                      <label>Employee Name :</label>
                      <input
                        type="text"
                        placeholder="search patient name"
                        className="mx-3 p-1 rounded"
                        value={keyword}
                        onChange={(e) =>
                          setkeyword(e.target.value.toLowerCase())
                        }
                      />
                    </div>
                    <div>
                      {/* <button
                        className="btn btn-success"
                        // onClick={() => openAddEmployeePopup()}
                      >
                        Add Employee
                      </button> */}
                    </div>
                  </div>

                  <div class="table-responsive mt-4">
                    <table class="table table-bordered">
                      <thead className="table-head">
                        <tr>
                          <th className="thead sticky">Patient UHID</th>
                          <th className="thead sticky">Name</th>
                          <th className="thead sticky">Mobile</th>
                          <th className="thead sticky">Gender</th>
                          <th className="thead sticky">Email</th>
                          <th className="thead sticky">Date of Birth</th>
                          <th className="thead sticky">Marital Status</th>
                          <th className="thead sticky">Patient Type</th>
                          <th className="thead sticky">Address</th>
                          <th className="thead sticky">Adhaar Number</th>
                          <th className="sticky" style={{ minWidth: "10rem" }}>
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {patList
                          ?.filter((val) => {
                            if (keyword === "") {
                              return true;
                            } else if (
                              val.patient_name
                                .toLowerCase()
                                .includes(keyword.toLowerCase())
                            ) {
                              return val;
                            }
                          }).reverse()
                          .map((item) => (
                            <>
                              <tr className="table-row">
                                <td className="thead">
                                  <Link
                                    to={`/patient-profile/${item.uhid}`}
                                    style={{ textDecoration: "none" }}
                                  >
                                    {item.uhid}
                                  </Link>
                                </td>
                                <td className="thead">{item.patient_name}</td>
                                <td className="thead">{item.mobileno}</td>
                                <td className="thead">{item.gender}</td>
                                <td className="thead">{item.emailid}</td>
                                <td className="thead">{item.dob}</td>
                                <td className="thead">{item.maritalstatus}</td>
                                <td className="thead">{item.patient_type}</td>
                                <td className="thead">{item.address}</td>
                                <td className="thead">{item.adharno}</td>
                                <td className="" style={{ minWidth: "10rem" }}>
                                  <div className="d-flex">
                                    <Link to={`/patient-profile/${item.uhid}`}>
                                      <button className="btn btn-warning">
                                        View Details
                                      </button>
                                    </Link>
                                  </div>
                                </td>
                              </tr>
                            </>
                          ))}
                      </tbody>
                    </table>
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

export default PatientDetailsLIst;
const Container = styled.div`
  th {
    background-color: #004aad;
    color: white;
    text-align: center;
  }
  td {
    text-align: center;
  }

  .thead {
    min-width: 8rem;
  }

  .table-responsive {
    height: 30rem;
    overflow: auto;
  }

  th {
    background-color: #004aad;
    color: white;
    position: sticky;
  }

  .sticky {
    position: sticky;
    top: 0;
    background-color: #004aad;
    color: white;
    z-index: 1;
  }
`;
