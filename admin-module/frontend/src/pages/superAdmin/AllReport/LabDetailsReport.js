import React from "react";
import styled from "styled-components";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";
import Sider from "../../../components/Sider";
import Header from "../../../components/Header";

const LabDetailsReport = () => {
  const location = useLocation();

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
                  <div className="d-flex justify-content-between">
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
                        </Link> */}
                    </div>
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
                          <div class="container-fluid d-flex justify-content-center">
                            <h2 className="">Lab Details Report</h2>
                          </div>
                        </nav>
                      </div>
                      <div className="container-fluid mt-2">
                        <div className="d-flex justify-content-center mb-2 mt-2">
                          <button className="btn btn-warning mx-2">
                            Download Report
                          </button>
                        </div>
                        <div class="table-responsive mt-2">
                          <table class="table table-bordered">
                            <thead className="table-head">
                              <tr>
                                <th>Lab Name</th>
                                <th>Lab Type</th>
                                <th>Contact</th>
                                <th>Email</th>
                                <th>Lab Address</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="table-row">
                                <td>Inhouse Dental Lab Works</td>
                                <td>Internal</td>
                                <td>+91-999965651</td>
                                <td>maheshkuldeep@gmail.com</td>
                                <td>Madan Mahal</td>
                              </tr>
                              <tr className="table-row">
                                <td>Inhouse Dental Lab Works</td>
                                <td>Internal</td>
                                <td>+91-999965651</td>
                                <td>maheshkuldeep@gmail.com</td>
                                <td>Madan Mahal</td>
                              </tr>
                              <tr className="table-row">
                                <td>Inhouse Dental Lab Works</td>
                                <td>Internal</td>
                                <td>+91-999965651</td>
                                <td>maheshkuldeep@gmail.com</td>
                                <td>Madan Mahal</td>
                              </tr>
                              <tr className="table-row">
                                <td>Inhouse Dental Lab Works</td>
                                <td>Internal</td>
                                <td>+91-999965651</td>
                                <td>maheshkuldeep@gmail.com</td>
                                <td>Madan Mahal</td>
                              </tr>
                              <tr className="table-row">
                                <td>Inhouse Dental Lab Works</td>
                                <td>Internal</td>
                                <td>+91-999965651</td>
                                <td>maheshkuldeep@gmail.com</td>
                                <td>Madan Mahal</td>
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
        </div>
      </Container>
    </>
  );
};

export default LabDetailsReport;
const Container = styled.div`
  .select-style {
    border: none;
    background-color: #22a6b3;
    font-weight: bold;
    color: white;
  }
`;
