import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IoMdArrowRoundBack } from "react-icons/io";
import Header from "../../components/Header";
import Sider from "../../components/Sider";
import BranchDetails from "../../components/BranchDetails";
import { useSelector } from "react-redux";
import axios from "axios";
import moment from "moment";
import * as XLSX from "xlsx";

const TreatIncomeDownload = () => {
  const user = useSelector((state) => state.user);
  console.log("User State:", user);
  const [treatAmount, setTreatAmount] = useState([]);

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const getTreatmentAmt = async () => {
    try {
      const { data } = await axios.get(
        `https://dentalguruaccountant.doaguru.com/api/v1/accountant/getTreatmentTotal/${user.branch}`
      );
      setTreatAmount(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTreatmentAmt();
  }, []);

  const handleDownload = () => {
    const filteredData = treatAmount.filter((item) => {
      const date = moment(item.appointment_dateTime).format("YYYY-MM-DD");
      return moment(date).isBetween(fromDate, toDate, null, "[]");
    });

    const formattedData = filteredData.map((item) => ({
      "Appointment ID": item.appoint_id,
      "Appointment Date": moment(item.appointment_dateTime).format(
        "YYYY-MM-DD h:mm A"
      ),
      "Patient UHID": item.uhid,
      "Patient Name": item.patient_name,
      Contact: item.mobileno,
      "Doctor Name": item.assigned_doctor_name,
      "Doctor ID": item.assigned_doctor_id,
      Treatment: item.dental_treatment,
      "Treatment Fee": item.net_amount,
      "Payment Date": item.date.split("T")[0],
      "Payment Status": item.sitting_payment_status,
      // Add more fields as needed
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, worksheet, "Report");
    XLSX.writeFile(wb, "treatmentReport.xlsx");
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
                              <th className="sticky">Appointment ID</th>
                              <th className="sticky">Appointment Date</th>
                              <th className="sticky">Patient UHID</th>
                              <th className="sticky">Patient Name</th>
                              <th className="sticky">Contact</th>
                              <th className="sticky">Doctor Name</th>
                              <th className="sticky">Doctor ID</th>
                              <th className="sticky">Treatment</th>
                              <th className="sticky">Treatment Fee</th>
                              {/* <th className="sticky">Payment Mode</th> */}
                              <th className="sticky">Payment Date</th>
                              <th className="sticky">Payment Status</th>
                              {/* <th className="sticky">Action</th> */}
                            </tr>
                          </thead>
                          <tbody>
                            {treatAmount.map((item) => (
                              <>
                                <tr className="table-row">
                                  <td>{item.appoint_id}</td>
                                  <td>
                                    {moment(item.appointment_dateTime).format(
                                      "YYYY-MM-DD h:mm A"
                                    )}
                                  </td>
                                  <td>{item.uhid}</td>
                                  <td>{item.patient_name}</td>
                                  <td>{item.mobileno}</td>
                                  <td>{item.assigned_doctor_name}</td>
                                  <td>{item.assigned_doctor_id}</td>
                                  <td>{item.dental_treatment}</td>
                                  <td>{item.net_amount}</td>
                                  {/* <td>{item.payment_Mode}</td> */}
                                  <td>{item.date.split("T")[0]}</td>
                                  <td>{item.sitting_payment_status}</td>
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

export default TreatIncomeDownload;
const Container = styled.div`
  .select-style {
    border: none;
    background-color: #22a6b3;
    font-weight: bold;
    color: white;
  }
  .table-responsive {
    max-height: 30rem;
    overflow: auto;
  }

  th {
    background-color: #201658;
    color: #fff;
    font-weight: bold;
    position: sticky;
    white-space: nowrap;
  }
  td {
    white-space: nowrap;
  }

  .sticky {
    position: sticky;
    top: 0;
    color: white;
    z-index: 1;
  }
`;
