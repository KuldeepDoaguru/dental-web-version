import React from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import Sider from "../../components/Sider";

const ManageStaff = () => {
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
                  <div className="d-flex justify-content-between">
                    <div className="d-flex">
                      <div>
                        <h6>Select Branch : </h6>
                      </div>
                      <div>
                        <select name="branch" id="branch" className="mx-2">
                          <option value="Madan Mahal">Madan Mahal</option>
                          <option value="Madan Mahal">Ranjhi</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      {/* <Link to="/superadmin-add-branch">
                          <button className="btn btn-success">
                            Add Branch
                          </button>
                        </Link> */}
                    </div>
                  </div>
                </div>
                <div className="container mt-3">
                  <h2 className="text-center">Manage Staff</h2>
                  <div class="table-responsive mt-4">
                    <table class="table table-bordered">
                      <thead className="table-head">
                        <tr>
                          <th>Emp ID</th>
                          <th>Name</th>
                          <th>Mobile</th>
                          <th>Email</th>
                          <th>Access Type</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="table-row">
                          <td>007</td>
                          <td>Dr.Mahesh Kuldeep</td>
                          <td>+91-999965651</td>
                          <td>maheshkuldeep@gmail.com</td>
                          <td>Cunsultant</td>
                          <td>Pending</td>
                          <td>
                            <button className="btn btn-warning">Edit</button>
                            <button className="btn btn-danger mx-1">
                              Delete
                            </button>
                          </td>
                        </tr>
                        <tr className="table-row">
                          <td>007</td>
                          <td>Dr.Mahesh Kuldeep</td>
                          <td>+91-999965651</td>
                          <td>maheshkuldeep@gmail.com</td>
                          <td>Cunsultant</td>
                          <td>Pending</td>
                          <td>
                            <button className="btn btn-warning">Edit</button>
                            <button className="btn btn-danger mx-1">
                              Delete
                            </button>
                          </td>
                        </tr>
                        <tr className="table-row">
                          <td>007</td>
                          <td>Dr.Mahesh Kuldeep</td>
                          <td>+91-999965651</td>
                          <td>maheshkuldeep@gmail.com</td>
                          <td>Cunsultant</td>
                          <td>Pending</td>
                          <td>
                            <button className="btn btn-warning">Edit</button>
                            <button className="btn btn-danger mx-1">
                              Delete
                            </button>
                          </td>
                        </tr>
                        <tr className="table-row">
                          <td>007</td>
                          <td>Dr.Mahesh Kuldeep</td>
                          <td>+91-999965651</td>
                          <td>maheshkuldeep@gmail.com</td>
                          <td>Cunsultant</td>
                          <td>Pending</td>
                          <td>
                            <button className="btn btn-warning">Edit</button>
                            <button className="btn btn-danger mx-1">
                              Delete
                            </button>
                          </td>
                        </tr>
                        <tr className="table-row">
                          <td>007</td>
                          <td>Dr.Mahesh Kuldeep</td>
                          <td>+91-999965651</td>
                          <td>maheshkuldeep@gmail.com</td>
                          <td>Cunsultant</td>
                          <td>Pending</td>
                          <td>
                            <button className="btn btn-warning">Edit</button>
                            <button className="btn btn-danger mx-1">
                              Delete
                            </button>
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
      </Container>
    </>
  );
};

export default ManageStaff;
const Container = styled.div``;
