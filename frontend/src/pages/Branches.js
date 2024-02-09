import React from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Sider from "../components/Sider";
import { Link } from "react-router-dom";

const Branches = () => {
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
                <div className="row d-flex justify-content-between mx-3">
                  <div className="col-12 col-md-12 mt-4">
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
                        <Link to="/superadmin-add-branch">
                          <button className="btn btn-success">
                            Add Branch
                          </button>
                        </Link>
                      </div>
                    </div>

                    <h2 className="text-center"> Branch List </h2>
                    <div className="container mt-3">
                      <div class="table-responsive rounded">
                        <table class="table table-bordered rounded shadow">
                          <thead className="table-head">
                            <tr>
                              <th
                                className="table-sno"
                                style={{ width: "10%" }}
                              >
                                SN
                              </th>
                              <th
                                className="table-small"
                                style={{ width: "20%" }}
                              >
                                Branch Name
                              </th>
                              <th
                                className="table-small"
                                style={{ width: "20%" }}
                              >
                                Branch Address
                              </th>
                              <th
                                className="table-small"
                                style={{ width: "10%" }}
                              >
                                Contact Number
                              </th>
                              <th
                                className="table-small"
                                style={{ width: "10%" }}
                              >
                                Edit
                              </th>
                              <th
                                className="table-small"
                                style={{ width: "10%" }}
                              >
                                Delete
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="table-row">
                              <td
                                className="table-sno"
                                style={{ width: "10%" }}
                              >
                                1
                              </td>
                              <td
                                className="table-small"
                                style={{ width: "20%" }}
                              >
                                Madan Mahal
                              </td>
                              <td
                                className="table-small"
                                style={{ width: "20%" }}
                              >
                                Madan Mahal, Nagpur Road
                              </td>
                              <td
                                className="table-small"
                                style={{ width: "10%" }}
                              >
                                8602161019
                              </td>
                              <td
                                className="table-small"
                                style={{ width: "10%" }}
                              >
                                <button className="btn btn-warning">
                                  Edit Details
                                </button>
                              </td>
                              <td
                                className="table-small"
                                style={{ width: "10%" }}
                              >
                                <button className="btn btn-danger">
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
          </div>
        </div>
      </Container>
    </>
  );
};

export default Branches;
const Container = styled.div``;
