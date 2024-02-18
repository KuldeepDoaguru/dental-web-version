import React from "react";
import styled from "styled-components";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";
import Sider from "../../../components/Sider";
import Header from "../../../components/Header";
import HeaderAdmin from "../HeaderAdmin";
import SiderAdmin from "../SiderAdmin";

const AdminLabDetailsRepo = () => {
  const location = useLocation();

  const goBack = () => {
    window.history.go(-1);
  };
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
              <div className="col-lg-11 col-11 ps-0">
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

export default AdminLabDetailsRepo;
const Container = styled.div`
  .select-style {
    border: none;
    background-color: #22a6b3;
    font-weight: bold;
    color: white;
  }

  th {
    background-color: #1abc9c;
    color: #000;
  }
`;
