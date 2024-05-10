import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";

const ComplaintsEmp = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  console.log(`User Name: ${user.name}, User ID: ${user.id}`);
  console.log("User State:", user);
  const branch = useSelector((state) => state.branch);
  console.log(`User Name: ${branch.name}`);
  const [complaints, setComplaints] = useState([]);

  const getEmpComByBranch = async () => {
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
      console.log(data);
      setComplaints(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getEmpComByBranch();
  }, [branch.name]);

  console.log(complaints);

  return (
    <>
      <Container>
        <div className="container-fluid main-cont">
          <h3 className="text-center">Employees Complaints</h3>
          <div class="table-responsive rounded">
            <table class="table table-bordered rounded shadow">
              <thead className="table-head">
                <tr>
                  <th className="table-sno sticky">EMP_id</th>
                  <th className="table-small sticky">Employee Name</th>
                  <th className="table-small sticky">Complaint</th>
                  <th className="table-small sticky">Received On</th>
                  <th className="sticky">Status</th>
                  <th className="table-small sticky">Solved On</th>
                  <th className="table-small sticky">Pending Since</th>
                  <th className="table-small sticky">Action</th>
                </tr>
              </thead>
              <tbody>
                {complaints?.map((item) => (
                  <>
                    <tr className="table-row">
                      <td className="table-sno">{item.emp_id}</td>

                      <td className="table-small">{item.employee_name}</td>
                      <td className="table-small">{item.complain}</td>
                      <td className="table-small">
                        {item.rec_on?.split("T")[0]}
                      </td>
                      <td>{item.status}</td>
                      <td>
                        {item.solved_on ? item.solved_on?.split("T")[0] : "-"}
                      </td>
                      <td>{item.pending_since ? item.pending_since : "-"}</td>
                      <td>
                        <Link to={`/complaint-page/${item.complain_id}`}>
                          <button className="btn btn-dark">
                            View Complaint
                          </button>
                        </Link>
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Container>
    </>
  );
};

export default ComplaintsEmp;
const Container = styled.div`
  .main-cont {
    .table-responsive {
      height: 20rem;
      overflow: auto;
    }
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
