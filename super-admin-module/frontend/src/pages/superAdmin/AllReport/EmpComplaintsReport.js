import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../../../components/Header";
import Sider from "../../../components/Sider";
import BranchSelector from "../../../components/BranchSelector";
import { useLocation, useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { utils, writeFile } from "xlsx";

const EmpComplaintsReport = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  console.log(`User Name: ${user.name}, User ID: ${user.id}`);
  console.log("User State:", user);
  const branch = useSelector((state) => state.branch);
  console.log(`User Name: ${branch.name}`);
  const [complaintList, setComplaintList] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [status, setStatus] = useState("");

  const getComplainViaBranch = async () => {
    try {
      const { data } = await axios.get(
        `https://dentalgurusuperadmin.doaguru.com/api/v1/super-admin/getEmployeeComplainByBranch/${branch.name}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setComplaintList(data);
    } catch (error) {
      console.log(error);
    }
  };

  const goBack = () => {
    window.history.go(-1);
  };

  useEffect(() => {
    getComplainViaBranch();
  }, [branch.name]);

  console.log(complaintList);

  const todayDate = new Date();

  // Get year, month, and date
  const year = todayDate.getFullYear();
  const month = String(todayDate.getMonth() + 1).padStart(2, "0");
  const date = String(todayDate.getDate()).padStart(2, "0");

  // Format as 'YYYY-MM-DD'
  const formattedDate = `${year}-${month}-${date}`;

  console.log(formattedDate.slice(0, 7));

  const filterComplainDataByMonth = complaintList?.filter((item) => {
    return item.rec_on.split("T")[0].slice(0, 7) === formattedDate.slice(0, 7);
  });

  console.log(filterComplainDataByMonth);

  const downloadComplaintData = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `https://dentalgurusuperadmin.doaguru.com/api/v1/super-admin/downloadEmployeeComplaintReport/${branch.name}`,
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

        utils.book_append_sheet(
          workbook,
          worksheet,
          `Employee Complaints Report`
        );
        writeFile(
          workbook,
          `${fromDate} - ${toDate}-employee-complaints-report.xlsx`
        );
        console.log(data);
      } else {
        console.error("data is not an array");
      }
    } catch (error) {
      console.log(error);
    }
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
                  <div className="d-flex justify-content-between">
                    <BranchSelector />
                  </div>
                </div>
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
                            <h2 className="">Employee Complaints Reports</h2>
                          </div>
                        </nav>
                      </div>
                      <div className="container">
                        <div class="table-responsive mt-4">
                          <div className="d-flex justify-content-between mb-2">
                            <form onSubmit={downloadComplaintData}>
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
                            <div className="d-flex justify-content-between">
                              <div>
                                <button className="btn btn-info">
                                  Filter by Status
                                </button>
                              </div>

                              <div className="mx-2">
                                <select
                                  class="form-select"
                                  aria-label="Default select example"
                                  value={status}
                                  onChange={(e) => setStatus(e.target.value)}
                                >
                                  <option value="">Select-status</option>
                                  <option value="Pending">Pending</option>
                                  <option value="Solved">Solved</option>
                                </select>
                              </div>
                            </div>
                          </div>
                          <div className="container-fluid mt-3">
                            <div class="table-responsive rounded">
                              <table class="table table-bordered rounded shadow">
                                <thead className="table-head">
                                  <tr>
                                    <th className="table-sno">Complaint ID</th>
                                    <th>Employee ID</th>
                                    <th>Employee Name</th>
                                    <th>Complain</th>
                                    <th>Recieved Date</th>
                                    <th>Recieved Time</th>
                                    <th>Status</th>
                                    <th>Solved ON</th>
                                    <th>Pending Since</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {filterComplainDataByMonth
                                    ?.filter((val) => {
                                      if (status === "") {
                                        return true;
                                      } else if (
                                        val.status
                                          .toLowerCase()
                                          .includes(status.toLowerCase())
                                      ) {
                                        return val;
                                      }
                                    })
                                    .map((item) => (
                                      <>
                                        <tr className="table-row">
                                          <td className="table-sno">
                                            {item.complain_id}
                                          </td>
                                          <td>{item.emp_id}</td>
                                          <td>{item.employee_name}</td>
                                          <td>{item.complain}</td>
                                          <td>{item.rec_on.split("T")[0]}</td>

                                          <td>
                                            {item.rec_on
                                              .split("T")[1]
                                              .split(".")[0]
                                              .slice(0, 5)}
                                          </td>
                                          <td>{item.status}</td>
                                          <td>
                                            {item.solved_on?.split("T")[0]}{" "}
                                          </td>
                                          <td>{item.pending_since}</td>
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

export default EmpComplaintsReport;
const Container = styled.div`
  .select-style {
    border: none;
    background-color: #22a6b3;
    font-weight: bold;
    color: white;
  }

  th {
    background-color: #004aad;
    color: white;
  }
`;
