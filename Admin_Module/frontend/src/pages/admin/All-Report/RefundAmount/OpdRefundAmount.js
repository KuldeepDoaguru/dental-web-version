import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
// import Sider from "../../../components/Sider";
// import Header from "../../../components/Header";
import { IoMdArrowRoundBack } from "react-icons/io";
// import BranchSelector from "../../../components/BranchSelector";
import { useSelector } from "react-redux";
import axios from "axios";
import { utils, writeFile } from "xlsx";
import Lottie from "react-lottie";

import animationData from "../../../animation/loading-effect.json";

import moment from "moment";
import cogoToast from "cogo-toast";


const OpdRefundAmount = () => {
  const user = useSelector((state) => state.user.currentUser);
  const branch = user.branch_name;
 
  const [refundList, setRefundList] = useState([]);
  const location = useLocation();
  const [fromDate, setFromDate] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState("");
  const [toDate, setToDate] = useState("");

  const differenceError = () => {
    const from = new Date(fromDate).getTime();
    const to = new Date(toDate).getTime();
    const differenceInMilliseconds = to - from;
    const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);
    if (differenceInDays >= 30) {
      setError(true);
      cogoToast.error(
        "The difference between the dates should be less than 30 days"
      );
    } else {
      setError(false);
    }
  };

  useEffect(() => {
    differenceError();
  }, [toDate, fromDate]);

  const getRefundList = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `https://dentalguruadmin.doaguru.com/api/v1/admin/getRefundOpdAmountData/${branch}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setLoading(false);
      console.log(data);
      setRefundList(data);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getRefundList();
  }, [branch]);

  const todayDate = new Date();

  // Get year, month, and date
  const year = todayDate.getFullYear();
  const month = String(todayDate.getMonth() + 1).padStart(2, "0"); // Adding 1 to adjust month, padStart ensures 2 digits
  const date = String(todayDate.getDate()).padStart(2, "0"); // Ensuring 2 digits

  // Format as 'YYYY-MM-DD'
  const formattedDate = `${date}-${month}-${year}`;

  console.log(formattedDate.slice(3, 10));

  console.log(refundList);
  // const dateChange = moment(refundList[0].refund_date_time).format(
  //   "DD-MM-YYYY"
  // );
  // console.log(dateChange);

  const filterAppointDataByMonth = refundList?.filter((item) => {
    return item.refund_date_time.slice(3, 10) === formattedDate.slice(3, 10);
  });

  console.log(filterAppointDataByMonth);

  const goBack = () => {
    window.history.go(-1);
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  console.log(fromDate, "-To-", toDate);
  const formDateCorrectFormat = moment(fromDate).format("DD-MM-YYYY");
  console.log(formDateCorrectFormat);

  const toDateCorrectFormat = moment(toDate).format("DD-MM-YYYY");
  console.log(toDateCorrectFormat);

  const exportToExcel = (e) => {
    e.preventDefault();
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
    link.download = "Refunded-opd-amount-report.csv";
    link.click();
    window.URL.revokeObjectURL(link.href);
  };

  console.log(error);

  return (
    <>
      <Container>
        <div className="container-fluid">
          <div class="mt-4">
            <div className="d-flex justify-content-between mb-2">
              <form onSubmit={exportToExcel}>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <input
                      type="date"
                      name=""
                      id=""
                      required
                      className="p-2 rounded"
                      onChange={(e) => setFromDate(e.target.value)}
                    />
                  </div>
                  <div className="mx-2">To</div>
                  <div>
                    <input
                      type="date"
                      name=""
                      id=""
                      required
                      className="p-2 rounded"
                      onChange={(e) => setToDate(e.target.value)}
                    />
                  </div>
                  <button
                    className="btn btn-warning mx-2"
                    type="submit"
                    disabled={error}
                  >
                    Download Report
                  </button>
                </div>
              </form>
            </div>
            <div className="container-fluid">
              {loading ? (
                <Lottie
                  options={defaultOptions}
                  height={300}
                  width={400}
                ></Lottie>
              ) : (
                <>
                  <div class="table-responsive rounded">
                    <table class="table table-bordered rounded shadow">
                      <thead className="table-head">
                        <tr>
                          <th className="table-sno sticky">Appointment ID</th>
                          <th className="sticky">Patient UHID</th>
                          <th className="sticky">TPID</th>

                          <th className="table-small sticky">Patient Name</th>
                          <th className="table-small sticky">Contact Number</th>
                          <th className="table-small sticky">
                            Assigned Doctor
                          </th>

                          <th className="table-small sticky">
                            Refunded Amount
                          </th>
                          {/* <th className="table-small sticky">Refunded by</th> */}
                          <th className="table-small sticky">
                            Refund Date & Time
                          </th>
                          <th className="table-small sticky">Refund Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filterAppointDataByMonth
                          ?.filter((item) => {
                            const billDate =
                              item.refund_date_time?.split(" ")[0];
                            if (fromDate && toDate) {
                              return (
                                billDate >= formDateCorrectFormat &&
                                billDate <= toDateCorrectFormat
                              );
                            } else {
                              return true;
                            }
                          })
                          .map((item) => (
                            <>
                              <tr className="table-row">
                                <td className="table-sno">{item.appoint_id}</td>
                                <td className="table-small">
                                  <Link
                                    to={`/patient-profile/${item.patient_uhid}`}
                                    style={{
                                      textDecoration: "none",
                                    }}
                                  >
                                    {item.patient_uhid}
                                  </Link>
                                </td>
                                <td>{item.tp_id}</td>
                                <td>{item.patient_name}</td>
                                <td className="table-small">{item.mobileno}</td>
                                <td className="table-small">
                                  {item.assigned_doctor_name}
                                </td>

                                <td className="table-small">
                                  {item.opd_amount}
                                </td>
                                {/* <td className="table-small">
                                  {item.refund_by}
                                </td> */}
                                <td className="table-small">
                                  {item.refund_date_time?.split(" ")[0]}{" "}
                                  {moment(
                                    item.refund_date_time?.split(" ")[1],
                                    "HH:mm:ss"
                                  ).format("hh:mm A")}
                                </td>
                                <td>{item.payment_Status}</td>
                              </tr>
                            </>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default OpdRefundAmount;
const Container = styled.div`
  .select-style {
    border: none;
    background-color: #1abc9c;
    font-weight: bold;
    color: white;
  }

  th {
    background-color:#1abc9c;
    color: white;
    position: sticky;
    white-space: nowrap;
  }
  td {
    white-space: nowrap;
  }
  .table-responsive {
    max-height: 30rem;
  }

  .sticky {
    position: sticky;
    top: 0;
    background-color:#1abc9c;
    color: white;
    z-index: 1;
  }

  .second-table {
    height: 30rem;
    overflow: auto;
  }
`;