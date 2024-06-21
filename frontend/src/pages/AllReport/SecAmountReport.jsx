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
  const token = user.token;
  // console.log(token);
  // console.log(
  //   `User Name: ${user.name}, User ID: ${user.id}, branch: ${user.branch}`
  // );
  console.log("User State:", user);
  const [securityList, setSecurityList] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [ViewSecurityList, setViewSecurityList] = useState([]);

  const getSecurityAmountList = async () => {
    try {
      const { data } = await axios.get(
        `https://dentalguruaccountant.doaguru.com/api/v1/accountant/getSecurityAmountDataByBranch/${user.branch}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSecurityList(data);
      setViewSecurityList(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSecurityAmountList();
  }, []);

  // const handleDownload = () => {
  //   const filteredData = securityList.filter((item) => {
  //     const date = moment(item.date).format("YYYY-MM-DD");
  //     return moment(date).isBetween(fromDate, toDate, null, "[]");
  //   });

  //   const formattedData = securityList.map((item) => ({
  //     Date: item.date.split("T")[0],
  //     "Appointment ID": item.appointment_id,
  //     UHID: item.uhid,
  //     "Patient Name": item.patient_name,
  //     "Patient Number": item.patient_number,
  //     "Assigned Doctor": item.assigned_doctor,
  //     "Security Amount": item.amount,
  //     "Payment Mode": item.payment_Mode,
  //     "Transaction Id": item.transaction_Id,
  //     "Payment Status": item.payment_status,
  //   }));

  //   const worksheet = XLSX.utils.json_to_sheet(formattedData);
  //   const wb = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(wb, worksheet, "Report");
  //   XLSX.writeFile(wb, "secuirtyamount.xlsx");
  // };

  const handleRefresh = (e) => {
    e.preventDefault();
    setFromDate("");
    setToDate("");
    setViewSecurityList(securityList);
  };

  // const validateDateRange = () => {
  //   if (!fromDate || !toDate) {
  //     alert("Please select Date");
  //     return false;
  //   }
  //   const start = moment(fromDate);
  //   const end = moment(toDate);
  //   const diff = end.diff(start, "days");
  //   if (diff > 30) {
  //     alert("The date range should not exceed 30 days");
  //     return false;
  //   }
  //   return true;
  // };

  const validateDateRange = () => {
    if (!fromDate || !toDate) {
      alert("Please select Date");
      return false;
    }
    const start = moment(fromDate, "YYYY-MM-DD");
    const end = moment(toDate, "YYYY-MM-DD");
    const diff = end.diff(start, "days");
    if (diff > 30) {
      alert("The date range should not exceed 30 days");
      return false;
    }
    return true;
  };

  const handleView = (e) => {
    e.preventDefault();
    if (!validateDateRange()) {
      return;
    }
    const start = moment(fromDate, "YYYY-MM-DD");
    const end = moment(toDate, "YYYY-MM-DD").add(1, "day");

    console.log(
      "Date Range: ",
      start.format("DD-MM-YYYY"),
      "-",
      end.format("DD-MM-YYYY")
    );

    const filteredData = securityList.filter((item) => {
      const itemDate = moment(item.date, "DD-MM-YYYY HH:mm:ss");
      return itemDate.isBetween(start, end, null, "[]");
    });

    console.log("Filtered Data: ", filteredData);
    setViewSecurityList(filteredData);
  };

  // const handleView = (e) => {
  //   e.preventDefault();

  //   if (!validateDateRange()) {
  //     return;
  //   }

  //   const filteredData = securityList.filter((item) => {
  //     const date = moment(item.date).format("DD-MM-YYYY");
  //     return moment(date).isBetween(fromDate, toDate, null, "[]");
  //   });
  //   setViewSecurityList(filteredData);
  // };

  const handleDownload = (e) => {
    e.preventDefault();
    // if (!fromDate || !toDate) {
    //   alert("Please select Date");
    //   return;
    // }

    if (!validateDateRange()) {
      return;
    }

    // const filteredData = securityList.filter((item) => {
    //   const date = moment(item.date).format("DD-MM-YYYY");
    //   return moment(date).isBetween(fromDate, toDate, null, "[]");
    // });

    const start = moment(fromDate, "YYYY-MM-DD");
    const end = moment(toDate, "YYYY-MM-DD").add(1, "day"); // Include end date

    const filteredData = securityList.filter((item) => {
      const date = moment(item.date, "DD-MM-YYYY HH:mm:ss");
      return date.isBetween(start, end, null, "[]");
    });

    // const filteredData = securityList.filter((item) => {
    //   const date = moment(item.date, "DD-MM-YYYY HH:mm:ss");
    //   return date.isBetween(fromDate, toDate, null, "[]");
    // });

    const formattedData = filteredData.map((item) => ({
      "Security Amount ID": item.sa_id,
      TPID: item.tp_id,
      Date: item.date?.split("T")[0],
      "Appointment ID": item.appointment_id,
      UHID: item.uhid,
      "Patient Name": item.patient_name,
      "Patient Number": item.patient_number,
      "Assigned Doctor": item.assigned_doctor,
      "Security Amount": item.amount,
      "Remaining Amount": item.remaining_amount,
      "Payment Mode": item.payment_Mode,
      "Transaction Id": item.transaction_Id,
      "Payment Status": item.payment_status,
      "Refund Amount": item.refund_amount,
      "Refund Date": item.refund_date?.split("T")[0],
      "Received By": item.received_by,
      "Refund By": item.refund_by,
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, worksheet, "Report");
    XLSX.writeFile(wb, "securityamount_report.xlsx");
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
              <div className="col-lg-11 col-11 ps-0 set">
                <div className="container-fluid mt-3">
                  <div className="">
                    <BranchDetails />
                  </div>
                </div>
                <div className="container-fluid mt-3">
                  {/* <button className="btn btn-success" onClick={goBack}>
                    <IoMdArrowRoundBack /> Back
                  </button> */}
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
                        <div class="mt-4">
                          <div className="d-flex justify-content-center mb-2">
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
                                  className="btn btn-info mx-2"
                                  onClick={(e) => handleView(e)}
                                >
                                  View Report
                                </button>

                                <button
                                  className="btn btn-primary mx-2"
                                  onClick={(e) => handleRefresh(e)}
                                >
                                  Clear
                                </button>

                                <button
                                  className="btn btn-warning mx-2"
                                  onClick={(e) => handleDownload(e)}
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
                                    <th className="sticky">
                                      Security Amount ID
                                    </th>
                                    <th className="sticky">TPID</th>
                                    <th className="sticky">Date</th>
                                    <th className="sticky">Appointment ID</th>
                                    <th className="sticky">UHID</th>
                                    <th className="sticky">Patient Name</th>
                                    <th className="sticky">Patient Number</th>
                                    <th className="sticky">Assigned Doctor</th>
                                    <th className="sticky">Security Amount</th>
                                    <th className="sticky">Remaning Amount</th>
                                    <th className="sticky">Payment Mode</th>
                                    <th className="sticky">Transaction Id</th>
                                    <th className="sticky">Payment Status</th>
                                    <th className="sticky">Refund Amount</th>
                                    <th className="sticky">Refund Date</th>
                                    <th className="sticky">Received By</th>
                                    <th className="sticky">Refund By</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {ViewSecurityList?.map((item) => (
                                    <>
                                      <tr className="table-row">
                                        <td>{item.sa_id}</td>
                                        <td>{item.tp_id}</td>
                                        <td>{item.date?.split("T")[0]}</td>
                                        <td>{item.appointment_id}</td>
                                        <td>{item.uhid}</td>
                                        <td>{item.patient_name}</td>
                                        <td>{item.patient_number}</td>
                                        <td>{item.assigned_doctor}</td>
                                        <td>{item.amount}</td>
                                        <td>{item.remaining_amount}</td>
                                        <td>{item.payment_Mode}</td>
                                        <td>{item.transaction_Id}</td>
                                        <td>{item.payment_status}</td>
                                        <td>{item.refund_amount}</td>
                                        <td>
                                          {item.refund_date?.split("T")[0]}
                                        </td>
                                        <td>{item.received_by}</td>
                                        <td>{item.refund_by}</td>
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
  .table-responsive {
    height: 30rem;
    overflow: auto;
  }
  th {
    background-color: #201658;
    color: white;
    white-space: nowrap;
  }
  td {
    white-space: nowrap;
  }
  .set {
    @media screen and (max-width: 1050px) {
      width: 85%;
      margin-left: 3rem;
    }
    @media screen and (min-width: 768px) and (max-width: 900px) {
      width: 85%;
      margin-left: 3rem;
    }
  }
  .sticky {
    position: sticky;
    top: 0;
    color: white;
    z-index: 1;
  }
`;
