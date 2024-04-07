import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import { Link, useParams } from "react-router-dom";
import Sider from "../components/Sider";
import { IoArrowBackSharp } from "react-icons/io5";
import axios from "axios";
import { useSelector } from "react-redux";
import cogoToast from "cogo-toast";

const PatintDuePaymentPrint = () => {
  const { bid } = useParams();
  const user = useSelector((state) => state.user);
  const [branchData, setBranchData] = useState([]);
  const [billAmount, setBillAmount] = useState([]);
  console.log(
    `User Name: ${user.name}, User ID: ${user.id}, branch: ${user.branch}`
  );
  console.log("User State:", user);

  const goBack = () => {
    window.history.go(-1);
  };

  const branchDetails = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8888/api/v1/accountant/getBranchDetailsByBranch/${user.branch}`
      );
      setBranchData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getBillDetails = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8888/api/v1/accountant/getPatientBillsAndSecurityAmountByBranch/${user.branch}/${bid}`
      );
      setBillAmount(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    branchDetails();
    getBillDetails();
  }, []);

  console.log(branchData);
  console.log(billAmount);

  const todayDate = new Date();
  const year = todayDate.getFullYear();
  const month = String(todayDate.getMonth() + 1).padStart(2, "0");
  const date = String(todayDate.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${date}`;

  console.log(formattedDate);

  const makePayment = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8888/api/v1/accountant/makeBillPayment/${user.branch}/${bid}`,
        {
          paid_amount:
            Number(billAmount[0]?.total_amount) +
            Number(billAmount[0]?.total_amount) * 0.18,
          payment_status: "paid",
          payment_date_time: formattedDate,
        }
      );
      cogoToast.success("payment successful");
      getBillDetails();
    } catch (error) {
      console.log(error);
    }
  };

  const handlePrint = () => {
    const contentToPrint =
      document.getElementById("printableContent").innerHTML;
    const originalContent = document.body.innerHTML;

    document.body.innerHTML = contentToPrint;

    window.print();
    window.location.reload();
    document.body.innerHTML = originalContent;
  };

  return (
    <>
      <Container>
        <Header />
        <div className="container-fluid">
          <div className="row">
            <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-10 col-sm-12 col-12">
              <IoArrowBackSharp
                className="fs-1 mt-2 text-black"
                onClick={goBack}
              />
              <div className="row mt-5" id="printableContent">
                <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
                  <div className="d-flex justify-content-center">
                    <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6">
                      <div className="">
                        <div>
                          <h4>Branch : {branchData[0]?.branch_name}</h4>

                          <form className="d-flex ">
                            <h6>Addresh </h6>
                            <h6>: {branchData[0]?.branch_address}</h6>
                          </form>
                        </div>
                      </div>
                    </div>

                    <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6">
                      <div className="d-flex justify-content-end">
                        <div>
                          <form className="d-flex">
                            {/* <h5>Email id : </h5> */}
                            <h3 className="">
                              {branchData[0]?.hospital_name.toUpperCase()}
                            </h3>
                          </form>

                          <form className="d-flex ">
                            <h4>Contact Number : </h4>
                            <h4> {branchData[0]?.branch_contact}</h4>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 ">
                    <div className="d-flex justify-content-center">
                      <div className="col-xxl-9 col-xl-9 col-lg-9 col-md-11 col-sm-11">
                        <div className="row  mt-2 d-flex justify-content-between">
                          <div className="col-xxl-5 col-xl-5 col-lg-5 col-md-5 col-sm-5">
                            <div class=" rounded mt-4">
                              <h4>PATIENT SUMMARY </h4>
                              <div className="d-flex ">
                                <h6>Patient Name </h6>
                                <h6 className="ms-1">
                                  {" "}
                                  : {billAmount[0]?.patient_name}{" "}
                                </h6>
                              </div>
                              <div className="d-flex">
                                <h6>Patient id </h6>
                                <h6 className="ms-1">
                                  {" "}
                                  : {billAmount[0]?.uhid}{" "}
                                </h6>
                              </div>
                              <div className="d-flex ">
                                <h6> Invoice Number </h6>
                                <h6 className="ms-1">
                                  {" "}
                                  : {billAmount[0]?.bill_id}{" "}
                                </h6>
                              </div>
                              <div className="d-flex">
                                <h6> Invoice Date </h6>
                                <h6 className="ms-1">
                                  {" "}
                                  : {
                                    billAmount[0]?.bill_date.split("T")[0]
                                  }{" "}
                                </h6>
                              </div>
                            </div>
                          </div>

                          <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6">
                            <div class=" rounded d-flex justify-content-end mt-5 me-5">
                              <div class="card" style={{ width: "18rem" }}>
                                <div className="ms-4 mt-2">
                                  <h1> ₹{billAmount[0]?.total_amount}</h1>
                                  <h5 className="text-danger ms-4">
                                    Patient Net Due
                                  </h5>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
                    <form className="d-flex justify-content-center mt-4">
                      <h2> Due Payment Description</h2>
                    </form>
                    <hr className="mt-5" />
                  </div>
                </div>
                <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 ">
                  <div className="d-flex justify-content-center mt-4">
                    <div className="col-xxl-9 col-xl-9 col-lg-9 col-md-11 col-sm-11">
                      <table class="table table-bordered shadow">
                        <thead class="table-primary  rounded">
                          <tr>
                            <th scope="col">Date</th>
                            <th scope="col">Description</th>
                            <th scope="col">Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope="row">
                              {billAmount[0]?.bill_date.split("T")[0]}
                            </th>
                            <td>{billAmount[0]?.dental_treatment}</td>
                            <td>{billAmount[0]?.total_amount}</td>
                          </tr>
                          <tr>
                            <td colspan="2">
                              <h6>
                                Add additional notes and payment information{" "}
                                <span class="space"></span>
                                SubTotal
                              </h6>
                            </td>

                            <td className="fw-bolder">₹1000</td>
                          </tr>
                          <tr>
                            <td colspan="2">
                              <h6>
                                <span class="spaces"></span>Gst(18%)
                              </h6>
                            </td>
                            <td className="fw-bolder">
                              ₹ {Number(billAmount[0]?.total_amount) * 0.18}
                            </td>
                          </tr>
                          <tr>
                            <td colspan="2">
                              <h6>
                                <span class="spaces"></span>Net Amount
                              </h6>
                            </td>
                            <td className="fw-bolder">
                              ₹{" "}
                              {Number(billAmount[0]?.total_amount) +
                                Number(billAmount[0]?.total_amount) * 0.18}
                            </td>
                          </tr>
                          <tr>
                            <td colspan="2">
                              <h6>
                                <span class="spaces"></span>Paid Amount
                              </h6>
                            </td>
                            <td className="fw-bolder">
                              {billAmount[0]?.paid_amount !== null
                                ? billAmount[0]?.paid_amount
                                : "-"}
                            </td>
                          </tr>
                        </tbody>
                      </table>

                      <div className="d-flex justify-content-between">
                        <h4 className="">Thank you </h4>
                        <h4 className="">Auth. signature</h4>
                      </div>
                    </div>
                    <div className="d-xxl-none d-xl-none d-lg-none col-md-1 col-sm-1"></div>
                  </div>
                </div>
              </div>
              <div>
                <div className="container d-flex justify-content-end mb-3">
                  <button
                    type="button"
                    class="btn btn-primary hide-during-print"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    Pay Now
                  </button>

                  <button
                    class="btn btn btn-success dum text-capitalize mx-2 hide-during-print"
                    onClick={handlePrint}
                  >
                    Print
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div
            class="modal fade"
            id="exampleModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h1
                    class="modal-title fs-5 text-center"
                    id="exampleModalLabel"
                  >
                    Do you want to make payment
                  </h1>
                </div>

                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    class="btn btn-success"
                    data-bs-dismiss="modal"
                    onClick={makePayment}
                  >
                    Pay Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default PatintDuePaymentPrint;
const Container = styled.div`
  .space {
    margin-right: 23.4rem;
  }
  .spaces {
    margin-right: 45rem;
  }
  @media print {
    .hide-during-print {
      display: none !important;
    }
  }
`;