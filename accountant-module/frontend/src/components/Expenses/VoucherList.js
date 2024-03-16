import React from "react";
import styled from "styled-components";
import Header from "../Header";
import Sider from "../Sider";
import { Link } from "react-router-dom";
import BranchDetails from "../BranchDetails";
const VoucherList = () => {
  return (
    <>
      <Container>
        <Header />
        <div className="main">
          <div className="container-fluid">
            <div className="row flex-nowrap ">
              <div className="col-xxl-1 col-xl-1 col-lg-1 col-md-2 col-sm-2 p-0">
                <Sider />
              </div>
              <div className="col-xxl-11 col-xl-11 col-lg-11 col-md-10 col-sm-10">
                <div className="container-fluid">
                  <BranchDetails />
                  <div className="container mt-4">
                    <h2 className="text-center">All Voucher's List</h2>
                    <div className="container mt-5">
                      <div class="table-responsive rounded">
                        <table class="table table-bordered rounded shadow">
                          <thead className="table-head">
                            <tr>
                              <th className="table-sno">SN</th>
                              <th className="table-small">Name</th>
                              <th className="table-small">For</th>
                              <th className="table-small">Amount</th>

                              <th className="table-small">Date</th>
                              <th className="table-small">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="table-row">
                              <td className="table-sno">1</td>
                              <td className="table-small">Ramesh Patel</td>
                              <td className="table-small">Coffee</td>
                              <td className="table-small">50</td>

                              <td className="table-small">01/04/2024</td>
                              <td className="table-small">
                                <Link to="/VoucherPaidListPrint">
                                  <button
                                    className="btn fw-medium fs-5  px-4 py-1 text-white"
                                    style={{
                                      backgroundColor: "#201658",
                                    }}
                                  >
                                    View Details
                                  </button>
                                </Link>
                              </td>
                            </tr>
                          </tbody>

                          <tbody>
                            <tr className="table-row">
                              <td className="table-sno">2</td>
                              <td className="table-small">Res.Umair Qureshi</td>
                              <td className="table-small">X-ray</td>
                              <td className="table-small">750</td>

                              <td className="table-small">01/04/2024</td>
                              <td className="table-small">
                                <Link to="/VoucherPaidListPrint">
                                  <button
                                    className="btn fw-medium fs-5  px-4 py-1 text-white"
                                    style={{
                                      backgroundColor: "#201658",
                                    }}
                                  >
                                    View Details
                                  </button>
                                </Link>
                              </td>
                            </tr>
                          </tbody>

                          <tbody>
                            <tr className="table-row">
                              <td className="table-sno">3</td>
                              <td className="table-small">Ac.Suhani Patel</td>
                              <td className="table-small">Pages</td>
                              <td className="table-small">210</td>

                              <td className="table-small">01/04/2024</td>
                              <td className="table-small">
                                <Link to="/VoucherPaidListPrint">
                                  <button
                                    className="btn fw-medium fs-5  px-4 py-1 text-white"
                                    style={{
                                      backgroundColor: "#201658",
                                    }}
                                  >
                                    View Details
                                  </button>
                                </Link>
                              </td>
                            </tr>
                          </tbody>

                          <tbody>
                            <tr className="table-row">
                              <td className="table-sno">4</td>
                              <td className="table-small">Shubham patel</td>
                              <td className="table-small">Toilet Cleaner</td>
                              <td className="table-small">140</td>

                              <td className="table-small">01/04/2024</td>

                              <td className="table-small">
                                <Link to="/VoucherPaidListPrint">
                                  <button
                                    className="btn fw-medium fs-5  px-4 py-1 text-white"
                                    style={{
                                      backgroundColor: "#201658",
                                    }}
                                  >
                                    View Details
                                  </button>
                                </Link>
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

export default VoucherList;

const Container = styled.div``;
