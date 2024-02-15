import React, { useState } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import Sider from "../../components/Sider";
import { Dropdown, Nav } from "react-bootstrap";
// import BillTypeData from "../../components/superAdmin/BillType/BillTypeData";
import HospitalPurchaseBills from "../../components/superAdmin/BillType/HospitalPurchaseBills";
import PatientsBills from "../../components/superAdmin/BillType/PatientsBills";
// import "bootstrap/dist/css/bootstrap.min.css";

const AllBills = () => {
  //   const [billType, setBillType] = useState(null);
  const initialTab = localStorage.getItem("selectedTab") || "tab1";
  const [selectedTab, setSelectedTab] = useState(initialTab);

  console.log(selectedTab);
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
                <div className="container mt-3">
                  <div className="d-flex justify-content-between">
                    <div className="d-flex">
                      <div>
                        <h6>Select Branch : </h6>
                      </div>
                      <div>
                        <select name="branch" id="branch" className="mx-2">
                          <option value="Madan Mahal">Madan Mahal</option>
                          <option value="Madan Mahal">Ranjhi</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      {/* <Link to="/superadmin-add-branch">
                          <button className="btn btn-success">
                            Add Branch
                          </button>
                        </Link> */}
                    </div>
                  </div>
                </div>
                <div className="container mt-3">
                  <h3 className="text-center">Bill List</h3>
                  <div className="container mt-3">
                    <div class="table-responsive rounded">
                      <table class="table table-bordered rounded shadow">
                        <thead className="table-head">
                          <tr>
                            <th className="table-sno">SN</th>
                            <th className="table-small">Patient UHID</th>
                            <th className="table-small">Patient Name</th>
                            <th className="table-small">Total Amount</th>
                            <th>Payment Status</th>
                            <th>Payment Date & Time</th>
                            <th className="table-small">Bill Date</th>
                            <th className="table-small">Delete</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="table-row">
                            <td className="table-sno">1</td>
                            <td className="table-small">007</td>
                            <td className="table-small">Shubham patel</td>
                            <td className="table-small">1000</td>
                            <td>Completed</td>
                            <td>12/12/2024 12:00PM</td>
                            <td className="table-small">12/12/2024</td>
                            <td className="table-small">
                              <button className="btn btn-danger">Delete</button>
                            </td>
                          </tr>
                          <tr className="table-row">
                            <td className="table-sno">1</td>
                            <td className="table-small">007</td>
                            <td className="table-small">Shubham patel</td>
                            <td className="table-small">1000</td>
                            <td>Completed</td>
                            <td>12/12/2024 12:00PM</td>
                            <td className="table-small">12/12/2024</td>
                            <td className="table-small">
                              <button className="btn btn-danger">Delete</button>
                            </td>
                          </tr>
                          <tr className="table-row">
                            <td className="table-sno">1</td>
                            <td className="table-small">007</td>
                            <td className="table-small">Shubham patel</td>
                            <td className="table-small">1000</td>
                            <td>Completed</td>
                            <td>12/12/2024 12:00PM</td>
                            <td className="table-small">12/12/2024</td>
                            <td className="table-small">
                              <button className="btn btn-danger">Delete</button>
                            </td>
                          </tr>
                          <tr className="table-row">
                            <td className="table-sno">1</td>
                            <td className="table-small">007</td>
                            <td className="table-small">Shubham patel</td>
                            <td className="table-small">1000</td>
                            <td>Completed</td>
                            <td>12/12/2024 12:00PM</td>
                            <td className="table-small">12/12/2024</td>
                            <td className="table-small">
                              <button className="btn btn-danger">Delete</button>
                            </td>
                          </tr>
                          <tr className="table-row">
                            <td className="table-sno">1</td>
                            <td className="table-small">007</td>
                            <td className="table-small">Shubham patel</td>
                            <td className="table-small">1000</td>
                            <td>Completed</td>
                            <td>12/12/2024 12:00PM</td>
                            <td className="table-small">12/12/2024</td>
                            <td className="table-small">
                              <button className="btn btn-danger">Delete</button>
                            </td>
                          </tr>
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

export default AllBills;
const Container = styled.div`
  .navlink.active {
    background-color: #f53237 !important;
    border-radius: 1rem;
    color: white !important;
  }

  th {
    background-color: #004aad;
    color: white;
  }
`;
