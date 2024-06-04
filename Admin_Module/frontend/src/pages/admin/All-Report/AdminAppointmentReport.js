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
import SiderAdmin from "../SiderAdmin";
import HeaderAdmin from "../HeaderAdmin";



const AdminAppointmentReport = () => {
  const user = useSelector((state) => state.user.currentUser);
  
  const branch = user.branch_name;

  const [appointmentList, setAppointmentList] = useState([]);
  const location = useLocation();
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const getAppointList = async () => {
    try {
      const response = await axios.get(
        `https://dentalguruadmin.doaguru.com/api/v1/admin/getAppointmentData/${branch}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log(response);
      setAppointmentList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAppointList();
  }, [branch]);

  const todayDate = new Date();

  // Get year, month, and date
  const year = todayDate.getFullYear();
  const month = String(todayDate.getMonth() + 1).padStart(2, "0"); // Adding 1 to adjust month, padStart ensures 2 digits
  const date = String(todayDate.getDate()).padStart(2, "0"); // Ensuring 2 digits

  // Format as 'YYYY-MM-DD'
  const formattedDate = `${year}-${month}-${date}`;

  console.log(formattedDate.slice(0, 7));

  const filterAppointDataByMonth = appointmentList?.filter((item) => {
    return (
      item.appointment_dateTime.split("T")[0].slice(0, 7) ===
      formattedDate.slice(0, 7)
    );
  });

  console.log(filterAppointDataByMonth);

  const goBack = () => {
    window.history.go(-1);
  };

  const downloadAppointmentData = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `https://dentalguruadmin.doaguru.com/api/v1/admin/downloadAppointReportByTime/${branch}`,
        { fromDate: fromDate, toDate: toDate },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log(data);
      // setSelectedEarn(data);
      if (Array.isArray(data)) {
        // Create a new workbook
        const workbook = utils.book_new();

        // Convert the report data to worksheet format
        const worksheet = utils.json_to_sheet(data);

        utils.book_append_sheet(workbook, worksheet, `Appointment Report`);
        writeFile(workbook, `${fromDate} - ${toDate}-appointment-report.xlsx`);
        console.log(data);
      } else {
        console.error("data is not an array");
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(fromDate, "-To-", toDate);
  return (
    <>
      <Container>
        <HeaderAdmin />
        <div className="main">
          <div className="container-fluid">
            <div className="row flex-nowrap ">
              <div className="col-lg-1 col-1 p-0">
                <SiderAdmin />
              </div>
              <div className="col-lg-11 col-11 ps-0" style={{marginTop:"5rem"}}>
                {/* <div className="container-fluid mt-3">
                  <div className="d-flex justify-content-between">
                    <BranchSelector />
                  </div>
                </div> */}
                <div className="container-fluid mt-3">
                  <div className="container-fluid">
                    <button className="btn btn-success" onClick={goBack}>
                      <IoMdArrowRoundBack /> Back
                    </button>
                    <div className="row mt-3">
                      {/* <div className="col-1"></div> */}

                      <div className="col-12">
                        <nav class="navbar navbar-expand-lg bg-body-tertiary">
                          <div class="container d-flex justify-content-center">
                            <h2 className="">Appointment Reports</h2>
                          </div>
                        </nav>
                      </div>
                      <div className="container">
                        <div class="mt-4">
                          <div className="d-flex justify-content-between mb-2">
                            <form onSubmit={downloadAppointmentData}>
                              <div className="d-flex justify-content-between">
                                <div>
                                  <input
                                    type="date"
                                    name=""
                                    id=""
                                    required
                                    className="p-2 rounded"
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
                                    required
                                    className="p-2 rounded"
                                    onChange={(e) => setToDate(e.target.value)}
                                  />
                                </div>
                                <button
                                  className="btn btn-warning mx-2"
                                  type="submit"
                                >
                                  Download Report
                                </button>
                              </div>
                            </form>

                            {/* <div className="d-flex justify-content-between">
                              <div>
                                <select
                                  class="form-select"
                                  aria-label="Default select example"
                                >
                                  <option selected>select year</option>
                                  <option value="1">2024</option>
                                  <option value="2">2023</option>
                                  <option value="3">2022</option>
                                </select>
                              </div>
                              <div>
                                <select
                                  class="form-select"
                                  aria-label="Default select example"
                                >
                                  <option selected>select Month</option>
                                  <option value="1">Jan</option>
                                  <option value="2">Feb</option>
                                  <option value="3">Mar</option>
                                  <option value="1">Apr</option>
                                  <option value="2">May</option>
                                  <option value="3">June</option>
                                  <option value="1">July</option>
                                  <option value="2">Aug</option>
                                  <option value="3">Sept</option>
                                  <option value="1">Oct</option>
                                  <option value="2">Nov</option>
                                  <option value="3">Dec</option>
                                </select>
                              </div>
                            </div> */}
                          </div>
                          <div className="container-fluid mt-3">
                            <div class="table-responsive rounded">
                              <table class="table table-bordered rounded shadow">
                                <thead className="table-head">
                                  <tr>
                                    <th className="table-sno sticky">
                                      Appointment ID
                                    </th>
                                    <th className="sticky">Patient UHID</th>

                                    <th className="table-small sticky">
                                      Patient Name
                                    </th>
                                    <th className="table-small sticky">
                                      Contact Number
                                    </th>
                                    <th className="table-small sticky">
                                      Assigned Doctor
                                    </th>
                                    {/* <th className="table-small">
                                Treatment Provided
                              </th> */}
                                    {/* <th className="table-small">Treatment Status</th>
                              <th className="table-small">Payment Status</th>
                              <th className="table-small">
                                Payment Date & Time
                              </th> */}

                                    <th className="table-small sticky">
                                      Appointed by
                                    </th>
                                    <th className="table-small sticky">Updated by</th>
                                    <th className="table-small sticky">
                                      Appointment Date & Time
                                    </th>
                                    <th className="table-small sticky">
                                      Appointment Status
                                    </th>
                                    <th className="sticky">Cancel Reason</th>
                                    {/* <th className="table-small">Edit</th>
                                    <th className="table-small">Delete</th> */}
                                  </tr>
                                </thead>
                                <tbody>
                                  {filterAppointDataByMonth
                                    ?.filter((item) => {
                                      const billDate =
                                        item.appointment_dateTime?.split(
                                          "T"
                                        )[0]; // Extracting the date part
                                      if (fromDate && toDate) {
                                        return (
                                          billDate >= fromDate &&
                                          billDate <= toDate
                                        );
                                      } else {
                                        return true; // If no date range is selected, show all items
                                      }
                                    })
                                    .map((item) => (
                                      <>
                                        <tr className="table-row">
                                          <td className="table-sno">
                                            {item.appoint_id}
                                          </td>
                                          <td className="table-small">
                                            {item.uhid}
                                          </td>
                                          <td>{item.patient_name}</td>
                                          <td className="table-small">
                                            {item.mobileno}
                                          </td>
                                          <td className="table-small">
                                            {item.assigned_doctor_name}
                                          </td>
                                          {/* <td className="table-small">
                                    {item.treatment_provided}
                                  </td>
                                  <td className="table-small">
                                    {item.treatment_status}
                                  </td>
                                  <td className="table-small">
                                    {item.payment_status}
                                  </td>
                                  <td className="table-small">
                                    {item.payment_date_time?.split("T")[0]}{" "}
                                    {item.payment_date_time?.split("T")[1]}
                                  </td> */}
                                          <td className="table-small">
                                            {item.appointment_created_by}
                                          </td>
                                          <td className="table-small">
                                            {item.updated_by
                                              ? item.updated_by
                                              : "-"}
                                          </td>
                                          <td className="table-small">
                                            {
                                              item.appointment_dateTime?.split(
                                                "T"
                                              )[0]
                                            }{" "}
                                            {
                                              item.appointment_dateTime?.split(
                                                "T"
                                              )[1]
                                            }
                                          </td>
                                          <td>{item.appointment_status}</td>
                                          <td>{item.cancel_reason}</td>
                                          {/* <td className="table-small">
                                          <button
                                            className="btn btn-warning"
                                            onClick={() =>
                                              openUpdatePopup(item.appoint_id)
                                            }
                                          >
                                            Edit
                                          </button>
                                        </td> */}
                                          {/* <td className="table-small">
                                          <button
                                            className="btn btn-danger"
                                            onClick={() =>
                                              deleteAppointment(item.appoint_id)
                                            }
                                          >
                                            Delete
                                          </button>
                                        </td> */}
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


export default AdminAppointmentReport;
const Container = styled.div`
  .select-style {
    border: none;
    background-color: #22a6b3;
    font-weight: bold;
    color: white;
  }

  th {
    background-color: #1abc9c;
    color: white;
    position: sticky;
  }
  .table-responsive{
    height: 30rem;
  }

  .sticky {
    position: sticky;
    top: 0;
    background-color: #1abc9c;
    color: white;
    z-index: 1;
  }

  .second-table {
    height: 30rem;
    overflow: auto;
  }
`;
