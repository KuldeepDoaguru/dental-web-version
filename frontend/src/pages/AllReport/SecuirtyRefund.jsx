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

const SecuirtyRefund = () => {
  const user = useSelector((state) => state.user);
  const token = user.token;
  console.log("User State:", user);
  const [patBill, setPatBill] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const getBillPaidList = async () => {
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
      setPatBill(data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(patBill);
  const [filterForUnPaidBills, setFilterForUnPaidBills] = useState([]);
  const [viewPatBill, setViewPatBill] = useState([]);

  const filterdata = () => {
    const filterBills = patBill?.filter((item) => {
      return item.payment_status === "Refunded";
    });
    setFilterForUnPaidBills(filterBills);
    setViewPatBill(filterBills);
  };

  console.log(filterForUnPaidBills);

  console.log(viewPatBill);
  useEffect(() => {
    filterdata();
  }, [patBill]);

  const handleRefresh = (e) => {
    e.preventDefault();
    setFromDate("");
    setToDate("");
    setViewPatBill(filterForUnPaidBills);
  };

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

  //   const handleView = (e) => {
  //     e.preventDefault();
  //     // if (!fromDate || !toDate) {
  //     //   alert("Please select Date");
  //     //   return;
  //     // }

  //     if (!validateDateRange()) {
  //       return;
  //     }

  //     const start = moment(fromDate, "YYYY-MM-DD");
  //     const end = moment(toDate, "YYYY-MM-DD").add(1, "day");

  //     // const filteredData = filterForUnPaidBills.filter((item) => {
  //     //   const date = moment(item.refund_date_time).format("YYYY-MM-DD");
  //     //   return moment(date).isBetween(fromDate, toDate, null, "[]");
  //     // });

  //     const filteredData = filterForUnPaidBills.filter((item) => {
  //       const itemDate = moment(item.refund_date_time, "DD-MM-YYYY HH:mm:ss");
  //       return itemDate.isBetween(start, end, null, "[]");
  //     });

  //     setViewPatBill(filteredData);
  //   };

  const handleView = (e) => {
    e.preventDefault();

    if (!validateDateRange()) {
      return;
    }

    const start = moment(fromDate, "YYYY-MM-DD").startOf("day");
    const end = moment(toDate, "YYYY-MM-DD").endOf("day");

    console.log("Start Date:", start.format("DD-MM-YYYY"));
    console.log("End Date:", end.format("DD-MM-YYYY"));

    const filteredData = filterForUnPaidBills.filter((item) => {
      const itemDate = moment(item.refund_date, "DD-MM-YYYY HH:mm:ss");
      console.log("Item Date:", itemDate.format("DD-MM-YYYY HH:mm:ss"));
      return itemDate.isBetween(start, end, null, "[]");
    });

    console.log("Filtered Data:", filteredData);
    setViewPatBill(filteredData);
  };

  const handleDownload = (e) => {
    e.preventDefault();
    // if (!fromDate || !toDate) {
    //   alert("Please select Date");
    //   return;
    // }

    if (!validateDateRange()) {
      return;
    }

    const start = moment(fromDate, "YYYY-MM-DD");
    const end = moment(toDate, "YYYY-MM-DD").add(1, "day");

    // const filteredData = filterForUnPaidBills.filter((item) => {
    //   const date = moment(item.refund_date_time).format("YYYY-MM-DD");
    //   return moment(date).isBetween(fromDate, toDate, null, "[]");
    // });

    const filteredData = filterForUnPaidBills.filter((item) => {
      const date = moment(item.refund_date, "DD-MM-YYYY HH:mm:ss");
      return date.isBetween(start, end, null, "[]");
    });

    const formattedData = filteredData.map((item) => ({
      APPID: item.appointment_id,
      "Refund Date": moment(item.refund_date, "DD-MM-YYYYTHH:mm:ss").format(
        "DD/MM/YYYY"
      ),
      UHID: item.uhid,
      Branch: user.branch,
      "Patient Name": item.patient_name,
      "Patient Number": item.patient_number,
      "Refund Amount": item.refund_amount,
      "Refund by": item.refund_by,
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, worksheet, "Report");
    XLSX.writeFile(wb, "OpdRefund.xlsx");
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
        <div className="header">
          <Header />
        </div>
        <div className="main">
          <div className="container-fluid">
            <div className="row flex-nowrap ">
              <div
                className="col-xxl-1 col-xl-1 col-lg-1 col-md-2 col-sm-2 p-0"
                id="hd"
              >
                <Sider />
              </div>
              <div
                className="col-xxl-11 col-xl-11 col-lg-11 col-md-10 col-sm-10"
                id="set"
              >
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
                            <h2 className="">Security Refund Reports</h2>
                          </div>
                        </nav>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="container-fluid">
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
                      <div class="table-responsive rounded">
                        <table class="table table-bordered rounded shadow">
                          <thead className="table-head">
                            <tr>
                              <th className="thead sticky">Appoint ID</th>
                              <th className="thead sticky">Refund Date</th>
                              <th className="thead sticky">UHID</th>
                              <th className="thead sticky">Patient Name</th>
                              <th className="thead sticky">Patient Number</th>
                              <th className="thead sticky">Refund Amount</th>
                              <th className="thead sticky">Refund by</th>
                            </tr>
                          </thead>
                          <tbody>
                            {viewPatBill?.map((item) => (
                              <>
                                <tr className="table-row">
                                  <td>{item.appointment_id}</td>
                                  <td>
                                    {moment(
                                      item.refund_date,
                                      "DD-MM-YYYYTHH:mm:ss"
                                    ).format("DD/MM/YYYY")}
                                  </td>
                                  <td>{item.uhid}</td>
                                  <td>{item.patient_name}</td>
                                  <td>{item.patient_number}</td>
                                  <td>{item.refund_amount}</td>
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
      </Container>
    </>
  );
};

export default SecuirtyRefund;
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
  #set {
    margin-left: -4.5rem;
    padding-left: 150px; /* Width of sidebar */
    padding-top: 90px; /* Height of header */
    flex-grow: 1;
    overflow-y: auto;

    @media screen and (max-width: 768px) {
      margin-left: -2rem;
    }
    @media screen and (min-width: 768px) and (max-width: 1020px) {
      margin-left: -1rem;
    }
    @media screen and (min-width: 1020px) and (max-width: 1500px) {
      margin-left: -1.5rem;
    }
    @media screen and (min-width: 1500px) and (max-width: 1700px) {
      margin-left: 0.1rem;
    }
    @media screen and (min-width: 1700px) and (max-width: 2000px) {
      margin-left: 0.1rem;
    }

    @media screen and (min-width: 2000px) and (max-width: 2500px) {
      margin-left: 0rem;
    }
  }

  #hd {
    padding-top: 60px; /* Height of header */
    min-height: 100vh;
    position: fixed;

    @media screen and (max-width: 768px) {
      height: 68rem;
    }
    @media screen and (min-width: 768px) and (max-width: 1020px) {
      height: 58rem;
    }
  }
  .header {
    position: fixed;
    min-width: 100%;
    z-index: 100;
  }
`;
