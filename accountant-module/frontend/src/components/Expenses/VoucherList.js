import React from "react";
import styled from "styled-components";
import Header from "../Header";
import Sider from "../Sider";
import { Link } from "react-router-dom";
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
                  <div className="row d-flex justify-content-between">
                    <div className="col-12 col-md-4 mt-4">
                      <div>
                        <h5>Branch : Madan Mahal</h5>
                      </div>
                      <div className="mt-2">
                        <h3> Welcome to Dental Guru! </h3>
                      </div>
                      <div className="mt-3">
                        <h6>Accountant Dashboard</h6>
                      </div>
                    </div>

                    <div className="col-12 col-md-4 me-2 mt-5">
                      <form className="d-flex ms-auto my-sm" role="search">
                        <input
                          className="form-control me-2"
                          type="search"
                          placeholder="Search"
                          aria-label="Search"
                        />
                        <button
                          className="btn btn-primary"
                          style={{ backgroundColor: "#201658" }}
                          type="submit"
                        >
                          Search
                        </button>
                      </form>
                    </div>
                  </div>
                  <div className="container mt-4">
                    <h2 className="text-center">All Voucher's List</h2>
                    <div className="container mt-5">
                      <div class="table-responsive rounded">
                        <table class="table table-bordered rounded shadow">
                          <thead className="table-head">
                            <tr>
                              <th className="table-sno" style={{ width: "3%" }}>
                                SN
                              </th>
                              <th
                                className="table-small"
                                style={{ width: "10%" }}
                              >
                                Name
                              </th>
                              <th
                                className="table-small"
                                style={{ width: "15%" }}
                              >
                                For
                              </th>
                              <th
                                className="table-small"
                                style={{ width: "10%" }}
                              >
                                Amount
                              </th>

                              <th
                                className="table-small"
                                style={{ width: "10%" }}
                              >
                                Date
                              </th>
                              <th
                                className="table-small"
                                style={{ width: "10%" }}
                              >
                                Action
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="table-row">
                              <td className="table-sno" style={{ width: "3%" }}>
                                1
                              </td>
                              <td
                                className="table-small"
                                style={{ width: "10%" }}
                              >
                                Ramesh Patel
                              </td>
                              <td
                                className="table-small"
                                style={{ width: "20%" }}
                              >
                                Coffee
                              </td>
                              <td
                                className="table-small"
                                style={{ width: "10%" }}
                              >
                                50
                              </td>

                              <td
                                className="table-small"
                                style={{ width: "10%" }}
                              >
                                01/04/2024
                              </td>
                              <td
                                className="table-small"
                                style={{ width: "15%" }}
                              >
                                <Link to="/VoucherPaidListPrint">
                                  <button
                                    className="btn fw-medium fs-5  px-4 py-1 text-white"
                                    style={{
                                      backgroundColor: "#201658",
                                    }}
                                  >
                                    Get Action
                                  </button>
                                </Link>
                              </td>
                            </tr>
                          </tbody>

                          <tbody>
                            <tr className="table-row">
                              <td
                                className="table-sno"
                                style={{ width: "10%" }}
                              >
                                2
                              </td>
                              <td
                                className="table-small"
                                style={{ width: "15%" }}
                              >
                                Res.Umair Qureshi
                              </td>
                              <td
                                className="table-small"
                                style={{ width: "20%" }}
                              >
                                X-ray
                              </td>
                              <td
                                className="table-small"
                                style={{ width: "20%" }}
                              >
                                750
                              </td>

                              <td
                                className="table-small"
                                style={{ width: "10%" }}
                              >
                                01/04/2024
                              </td>
                              <td
                                className="table-small"
                                style={{ width: "15%" }}
                              >
                                <Link to="/VoucherPaidListPrint">
                                  <button
                                    className="btn fw-medium fs-5  px-4 py-1 text-white"
                                    style={{
                                      backgroundColor: "#201658",
                                    }}
                                  >
                                    Get Action
                                  </button>
                                </Link>
                              </td>
                            </tr>
                          </tbody>

                          <tbody>
                            <tr className="table-row">
                              <td
                                className="table-sno"
                                style={{ width: "10%" }}
                              >
                                3
                              </td>
                              <td
                                className="table-small"
                                style={{ width: "15%" }}
                              >
                                Ac.Suhani Patel
                              </td>
                              <td
                                className="table-small"
                                style={{ width: "20%" }}
                              >
                                Pages
                              </td>
                              <td
                                className="table-small"
                                style={{ width: "10%" }}
                              >
                                210
                              </td>

                              <td
                                className="table-small"
                                style={{ width: "10%" }}
                              >
                                01/04/2024
                              </td>
                              <td
                                className="table-small"
                                style={{ width: "15%" }}
                              >
                                <Link to="/VoucherPaidListPrint">
                                  <button
                                    className="btn fw-medium fs-5  px-4 py-1 text-white"
                                    style={{
                                      backgroundColor: "#201658",
                                    }}
                                  >
                                    Get Action
                                  </button>
                                </Link>
                              </td>
                            </tr>
                          </tbody>

                          <tbody>
                            <tr className="table-row">
                              <td
                                className="table-sno"
                                style={{ width: "10%" }}
                              >
                                4
                              </td>
                              <td
                                className="table-small"
                                style={{ width: "15%" }}
                              >
                                Shubham patel
                              </td>
                              <td
                                className="table-small"
                                style={{ width: "20%" }}
                              >
                                Toilet Cleaner
                              </td>
                              <td
                                className="table-small"
                                style={{ width: "10%" }}
                              >
                                140
                              </td>

                              <td
                                className="table-small"
                                style={{ width: "10%" }}
                              >
                                01/04/2024
                              </td>

                              <td
                                className="table-small"
                                style={{ width: "15%" }}
                              >
                                <Link to="/VoucherPaidListPrint">
                                  <button
                                    className="btn fw-medium fs-5  px-4 py-1 text-white"
                                    style={{
                                      backgroundColor: "#201658",
                                    }}
                                  >
                                    Get Action
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
