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

const PaidPaymentReport = () => {
  const user = useSelector((state) => state.user);
  console.log("User State:", user);
  const [paidList, setPaidList] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const getBillPaidList = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8888/api/v1/accountant/paidBillLIst/${user.branch}`
      );
      setPaidList(data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(paidList);
  const filterForPaidBills = paidList?.filter((item) => {
    return item.payment_status === "paid";
  });

  console.log(filterForPaidBills);

  const handleDownload = () => {
    const filteredData = filterForPaidBills.filter((item) => {
      const date = moment(item.bill_date).format("YYYY-MM-DD");
      return moment(date).isBetween(fromDate, toDate, null, "[]");
    });

    const formattedData = filteredData.map((item) => ({
      ID: item.bill_id,
      "Bill Date": item.bill_date.split("T")[0],
      UHID: item.uhid,
      TPID: item.tp_id,
      Branch: item.branch_name,
      "Patient Name": item.patient_name,
      "Patient Number": item.patient_mobile,
      "Patient Email": item.patient_email,
      "Assigned Doctor": item.assigned_doctor_name,
      "Total Amount": item.total_amount,
      "Paid Amount": item.paid_amount,
      "Payment Status": item.payment_status,
      "Payment Date Time": item.payment_date_time?.split("T")[0],
      "Receiver Name": item.receiver_name,
      "Receiver ID": item.receiver_emp_id,
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, worksheet, "Report");
    XLSX.writeFile(wb, "PaidPaymentReport.xlsx");
  };

  useEffect(() => {
    getBillPaidList();
  }, []);
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
                            <h2 className="">Treatment Income Reports</h2>
                          </div>
                        </nav>
                      </div>
                    </div>
                  </div>
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
                              onChange={(e) => setFromDate(e.target.value)}
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
                      <div class="table-responsive rounded">
                        <table class="table table-bordered rounded shadow">
                          <thead className="table-head">
                            <tr>
                              <th className="thead">ID</th>
                              <th className="thead">Bill Date</th>
                              <th className="thead">UHID</th>
                              <th className="thead">TPID</th>
                              <th className="thead">Branch</th>
                              <th className="thead">Patient Name</th>
                              <th className="thead">Patient Number</th>
                              <th className="thead">Patient Email</th>
                              <th className="thead">Assigned Doctor</th>
                              <th className="thead">Total Amount</th>
                              <th className="thead">Paid Amount</th>
                              <th className="thead">Payment Status</th>
                              <th className="thead">Payment Date Time</th>
                              <th className="thead">Receiver Name</th>
                              <th className="thead">Receiver ID</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filterForPaidBills?.map((item) => (
                              <>
                                <tr className="table-row">
                                  <td>{item.bill_id}</td>
                                  <td>{item.bill_date.split("T")[0]}</td>
                                  <td>{item.uhid}</td>
                                  <td>{item.tp_id}</td>
                                  <td>{item.branch_name}</td>
                                  <td>{item.patient_name}</td>
                                  <td>{item.patient_mobile}</td>
                                  <td>{item.patient_email}</td>
                                  <td>{item.assigned_doctor_name}</td>
                                  <td>{item.total_amount}</td>
                                  <td>{item.paid_amount}</td>
                                  <td>{item.payment_status}</td>
                                  <td>
                                    {item.payment_date_time?.split("T")[0]}
                                  </td>
                                  <td>{item.receiver_name}</td>
                                  <td>{item.receiver_emp_id}</td>
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
      </Container>
    </>
  );
};

export default PaidPaymentReport;
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
    white-space: nowrap;
  }
  td {
    white-space: nowrap;
  }
`;
