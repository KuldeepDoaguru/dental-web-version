import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { IoMdArrowRoundBack } from "react-icons/io";
import Header from "../../components/Header";
import Sider from "../../components/Sider";
import BranchDetails from "../../components/BranchDetails";
import { useSelector } from "react-redux";
import axios from "axios";
import moment from "moment";
import * as XLSX from "xlsx";

const SecAmountReport = () => {
  const user = useSelector((state) => state.user);
  console.log(
    `User Name: ${user.name}, User ID: ${user.id}, branch: ${user.branch}`
  );
  console.log("User State:", user);
  const [securityList, setSecurityList] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const getSecurityAmountList = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8888/api/v1/accountant/getSecurityAmountDataByBranch/${user.branch}`
      );
      setSecurityList(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSecurityAmountList();
  }, []);

  const handleDownload = () => {
    const filteredData = securityList.filter((item) => {
      const date = moment(item.date).format("YYYY-MM-DD");
      return moment(date).isBetween(fromDate, toDate, null, "[]");
    });

    const formattedData = securityList.map((item) => ({
      Date: item.date.split("T")[0],
      "Appointment ID": item.appointment_id,
      UHID: item.uhid,
      "Patient Name": item.patient_name,
      "Patient Number": item.patient_number,
      "Assigned Doctor": item.assigned_doctor,
      "Security Amount": item.amount,
      "Payment Mode": item.payment_Mode,
      "Transaction Id": item.transaction_Id,
      "Payment Status": item.payment_status,
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, worksheet, "Report");
    XLSX.writeFile(wb, "secuirtyamount.xlsx");
  };

  const goBack = () => {
    window.history.go(-1);
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
                <div className="container-fluid mt-3">
                  <div className="">
                    <BranchDetails />
                  </div>
                </div>
                <div className="container-fluid mt-3">
                  <button className="btn btn-success" onClick={goBack}>
                    <IoMdArrowRoundBack /> Back
                  </button>
                  <div className="container-fluid">
                    <div className="row mt-3">
                      {/* <div className="col-1"></div> */}

                      <div className="col-12">
                        <nav class="navbar navbar-expand-lg bg-body-tertiary">
                          <div class="container d-flex justify-content-center">
                            <h2 className="">Security Amount Reports</h2>
                          </div>
                        </nav>
                      </div>
                      <div className="container">
                        <div class="table-responsive mt-4">
                          <div className="d-flex justify-content-between mb-2">
                            <form>
                              <div className="d-flex justify-content-between">
                                <div>
                                  <input
                                    type="date"
                                    name=""
                                    id=""
                                    className="p-2 rounded"
                                    value={fromDate}
                                    onChange={(e) =>
                                      setFromDate(e.target.value)
                                    }
                                  />
                                </div>
                                <div className="mx-2">To</div>
                                <div>
                                  <input
                                    type="date"
                                    name=""
                                    id=""
                                    className="p-2 rounded"
                                    value={toDate}
                                    onChange={(e) => setToDate(e.target.value)}
                                  />
                                </div>
                                <button
                                  className="btn btn-warning mx-2"
                                  onClick={handleDownload}
                                >
                                  Download Report
                                </button>
                              </div>
                            </form>
                          </div>
                          <div
                            className="container-fluid mt-1 rounded"
                            style={{ overflowX: "auto" }}
                          >
                            <div class="table-responsive mt-4">
                              <table class="table table-bordered">
                                <thead className="table-head">
                                  <tr>
                                    <th>Date</th>
                                    <th>Appointment ID</th>
                                    <th>UHID</th>
                                    <th>Patient Name</th>
                                    <th>Patient Number</th>
                                    <th>Assigned Doctor</th>
                                    <th>Security Amount</th>
                                    <th>Payment Mode</th>
                                    <th>Transaction Id</th>
                                    <th>Payment Status</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {securityList.map((item) => (
                                    <>
                                      <tr className="table-row">
                                        <td>{item.date.split("T")[0]}</td>
                                        <td>{item.appointment_id}</td>
                                        <td>{item.uhid}</td>
                                        <td>{item.patient_name}</td>
                                        <td>{item.patient_number}</td>
                                        <td>{item.assigned_doctor}</td>
                                        <td>{item.amount}</td>
                                        <td>{item.payment_Mode}</td>
                                        <td>{item.transaction_Id}</td>
                                        <td>{item.payment_status}</td>
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
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default SecAmountReport;
const Container = styled.div`
  .select-style {
    border: none;
    background-color: #22a6b3;
    font-weight: bold;
    color: white;
  }
  th {
    background-color: #201658;
    color: white;
  }
`;
