import React from "react";
import styled from "styled-components";
import Header from "../Header";
import Sider from "../Sider";

const SuperAdProfile = () => {
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
                <div className="container mt-3">
                  {/* <div className="d-flex justify-content-between">
                    <div className="d-flex">
                      <div>
                        <h4>Select Branch : </h4>
                      </div>
                      <div>
                        <select
                          name="branch"
                          id="branch"
                          className="mx-2 p-2 rounded shadow select-style"
                        >
                          <option value="Madan Mahal" className="fw-bold">
                            Madan Mahal
                          </option>
                          <option value="Madan Mahal" className="fw-bold">
                            Ranjhi
                          </option>
                        </select>
                      </div>
                    </div>
                    <div>
                      {/* <Link to="/superadmin-add-branch">
                          <button className="btn btn-success">
                            Add Branch
                          </button>
                        </Link> *}
                    </div>
                  </div> */}
                </div>
                <div className="container mt-3">
                  <h2 className="text-center">Welcome to Dental Guru!</h2>
                  <h5 className="text-center">Super Admin Profile</h5>
                  {/* <hr /> */}
                  <div className="container mt-3 d-flex justify-content-center">
                    {/* <div className="card shadow" style={{ width: "18rem" }}>
                      <div class="card-body">
                        <h5 class="card-title">Name : Super Admin Name</h5>
                        <h5 class="card-title">Role : Super Admin</h5>
                        <h5 class="card-title">Email : Super@gmail.com</h5>
                        <h5 class="card-title">Mobile : 8602161019</h5>
                      </div>
                    </div> */}

                    <div class="table-responsive rounded">
                      <table class="table table-bordered rounded shadow">
                        <thead className="table-head">
                          <tr>
                            <th className="table-small">Name</th>
                            <th className="table-small">Role</th>
                            <th className="table-small">Mobile</th>
                            <th className="table-small">Email</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="table-row">
                            <td className="table-small">Mahesh Kuldeep</td>
                            <td className="table-small">Super Admin</td>
                            <td className="table-small">8602161019</td>
                            <td className="table-small">
                              superadmin@gmail.com
                            </td>
                          </tr>
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

export default SuperAdProfile;
const Container = styled.div`
  th,
  td {
    font-size: 2rem;
    padding: 1rem;
  }

  th {
    background-color: #004aad;
    color: white;
  }

  .select-style {
    border: none;
    background-color: #22a6b3;
    font-weight: bold;
    color: white;
  }
`;
