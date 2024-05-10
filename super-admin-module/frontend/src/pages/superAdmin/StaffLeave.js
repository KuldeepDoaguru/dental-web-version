import React, { useEffect, useState } from "react";
import BranchSelector from "../../components/BranchSelector";
import Sider from "../../components/Sider";
import Header from "../../components/Header";
import styled from "styled-components";
import { useSelector } from "react-redux";
import axios from "axios";
import cogoToast from "cogo-toast";

const StaffLeave = () => {
  const user = useSelector((state) => state.user);
  console.log(`User Name: ${user.name}, User ID: ${user.id}`);
  console.log("User State:", user);
  const branch = useSelector((state) => state.branch);
  console.log(`User Name: ${branch.name}`);
  const [leaveData, setLeaveData] = useState([]);
  const [afterAction, setAfterAction] = useState(false);
  const [keyword, setkeyword] = useState("");

  const getLeaveList = async () => {
    try {
      const { data } = await axios.get(
        `https://dentalgurusuperadmin.doaguru.com/api/v1/super-admin/getLeaveList`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setLeaveData(data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(leaveData);

  useEffect(() => {
    getLeaveList();
  }, []);

  const handleLeaveApprove = async (id) => {
    try {
      const response = await axios.put(
        `https://dentalgurusuperadmin.doaguru.com/api/v1/super-admin/approveLeave/${id}`,
        {
          status: "Approved",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      cogoToast.success("Leave Approved");
      setAfterAction(true);
      getLeaveList();
    } catch (error) {
      console.log(error);
    }
  };

  const handleLeaveReject = async (id) => {
    try {
      const response = await axios.put(
        `https://dentalgurusuperadmin.doaguru.com/api/v1/super-admin/approveLeave/${id}`,
        {
          status: "Rejected",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      cogoToast.warning("Leave Rejected");
      setAfterAction(true);
      getLeaveList();
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
                <div className="container mt-3">
                  <div className="container-fluid">
                    <h3>Employee Leave Management</h3>
                    <label>Employee Name :</label>
                    <input
                      type="text"
                      placeholder="search employee name"
                      className="mx-3 p-1 rounded"
                      value={keyword}
                      onChange={(e) => setkeyword(e.target.value.toLowerCase())}
                    />
                    <div class="table-responsive rounded">
                      <table class="table table-bordered rounded shadow mt-2">
                        <thead className="table-head">
                          <tr>
                            <th className="table-sno sticky">Employee ID</th>
                            <th className="sticky">Branch</th>
                            <th className="table-small sticky">
                              Employee Name
                            </th>
                            <th className="table-small sticky">Leave Dates</th>
                            <th className="table-small sticky">Leave Reason</th>
                            <th className="table-small sticky">Applied Date</th>
                            <th className="table-small sticky">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {leaveData
                            ?.filter((val) => {
                              if (keyword === "") {
                                return true;
                              } else if (
                                val.employee_name
                                  .toLowerCase()
                                  .includes(keyword.toLowerCase())
                              ) {
                                return val;
                              }
                            })
                            .map((item) => (
                              <>
                                <tr className="table-row">
                                  <td className="table-sno">
                                    {item.employee_ID}
                                  </td>
                                  <td className="table-small">
                                    {item.branch_name}
                                  </td>
                                  <td className="table-small">
                                    {item.employee_name}
                                  </td>
                                  <td className="table-small">
                                    {item.leave_dates}
                                  </td>
                                  <td>{item.leave_reason}</td>
                                  <td>{item.created_at.split("T")[0]}</td>
                                  <td>
                                    {item.leave_status !== "pending" ||
                                    item.leave_status === null ? (
                                      <button
                                        className={`btn ${
                                          item.leave_status === "Approved"
                                            ? "btn-warning"
                                            : "btn-danger"
                                        }`}
                                      >
                                        {item.leave_status
                                          ? item.leave_status.toUpperCase()
                                          : "Unknown"}
                                      </button>
                                    ) : (
                                      <>
                                        {" "}
                                        <div className="d-flex">
                                          <button
                                            className="btn btn-success"
                                            onClick={() =>
                                              handleLeaveApprove(item.id)
                                            }
                                          >
                                            Approve
                                          </button>
                                          <button
                                            className="btn btn-danger ms-2"
                                            onClick={() =>
                                              handleLeaveReject(item.id)
                                            }
                                          >
                                            Reject
                                          </button>
                                        </div>
                                      </>
                                    )}
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

export default StaffLeave;
const Container = styled.div`
  .table-responsive {
    height: 30rem;
    overflow: auto;
  }

  th {
    background-color: #004aad;
    color: white;
    position: sticky;
  }

  .sticky {
    position: sticky;
    top: 0;
    background-color: #004aad;
    color: white;
    z-index: 1;
  }
`;
