import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import Sider from "../../components/Sider";
import { Link } from "react-router-dom";
import BranchSelector from "../../components/BranchSelector";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const DoctorList = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  console.log(`User Name: ${user.name}, User ID: ${user.id}`);
  console.log("User State:", user);
  const branch = useSelector((state) => state.branch);
  console.log(`User Name: ${branch.name}`);
  const [doctorList, setDoctorList] = useState([]);

  const getDocDetailsList = async () => {
    try {
      const { data } = await axios.get(
        `https://dentalgurusuperadmin.doaguru.com/api/v1/super-admin/getEmployeeDetails/${branch.name}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log(data);
      setDoctorList(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDocDetailsList();
  }, []);

  console.log(doctorList);
  //filter for designation
  const filterForDesignation = doctorList?.filter((item) => {
    return item.employee_designation === "doctor";
  });

  console.log(filterForDesignation);

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
                <div className="container-fluid mt-3">
                  <div className="d-flex justify-content-between">
                    <BranchSelector />
                  </div>
                </div>
                <div className="container mt-3">
                  <h3 className="text-center">Doctor List</h3>
                  <div className="container mt-3">
                    <div class="table-responsive rounded">
                      <table class="table table-bordered rounded shadow">
                        <thead className="table-head">
                          <tr>
                            <th className="table-sno">emp_id</th>
                            <th className="table-small">Doctor Name</th>
                            <th className="table-small">Mobile</th>
                            <th className="table-small">Email</th>
                            <th className="table-small">Gender</th>
                            <th className="table-small">Address</th>
                            <th className="table-small">Salary</th>
                            <th></th>
                            <th className="table-small">View Details</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filterForDesignation?.map((item) => (
                            <>
                              <tr className="table-row">
                                <td className="table-sno">
                                  {item.employee_ID}
                                </td>
                                <td className="table-small">
                                  {item.employee_name}
                                </td>
                                <td className="table-small">
                                  {item.employee_mobile}
                                </td>
                                <td className="table-small">
                                  {item.employee_email}
                                </td>
                                <td className="table-small">{item.gender}</td>
                                <td className="table-small">{item.address}</td>
                                <td>{item.salary}</td>
                                <td>Available</td>
                                <td className="table-small">
                                  <Link to="/doctor-profile">
                                    <button className="btn btn-warning">
                                      View Details
                                    </button>
                                  </Link>
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
        </div>
      </Container>
    </>
  );
};

export default DoctorList;
const Container = styled.div`
  th {
    background-color: #004aad;
    color: white;
  }

  .select-style {
    border: none;
    background-color: #22a6b3;
    font-weight: bold;
    color: white;
  }
`;
