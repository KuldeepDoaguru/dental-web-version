import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import { Link, useParams } from "react-router-dom";
import { IoArrowBackSharp } from "react-icons/io5";
import { useSelector } from "react-redux";
import axios from "axios";

const PatintPaidPaymentPrint = () => {
  const { bid } = useParams();
  const [branchData, setBranchData] = useState([]);
  const user = useSelector((state) => state.user);
  const token = user.token;
  console.log(token);
  console.log(
    `User Name: ${user.name}, User ID: ${user.id}, branch: ${user.branch}`
  );
  console.log("User State:", user);
  const [paidBill, setPaidBill] = useState([]);

  const goBack = () => {
    window.history.go(-1);
  };

  const getPaidBillData = async () => {
    try {
      const { data } = await axios.get(
        `https://dentalguruaccountant.doaguru.com/api/v1/accountant/paidBillDetails/${user.branch}/${bid}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPaidBill(data);
    } catch (error) {
      console.log(error);
    }
  };

  const branchDetails = async () => {
    try {
      const { data } = await axios.get(
        `https://dentalguruaccountant.doaguru.com/api/v1/accountant/getBranchDetailsByBranch/${user.branch}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setBranchData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPaidBillData();
    branchDetails();
  }, []);

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
          <div className="row mt-5">
            <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 ">
              <IoArrowBackSharp
                className="fs-1 mt-2 text-black"
                onClick={goBack}
              />
              <div id="printableContent">
                <div className="container-fluid d-flex justify-content-between">
                  <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6">
                    <div className="d-flex justify-content-start">
                      <div>
                        <h5>Branch : {branchData[0]?.branch_name}</h5>

                        <form className="d-flex">
                          <h6>Address </h6>
                          <h6>: {branchData[0]?.branch_address}</h6>
                        </form>
                      </div>
                    </div>
                  </div>

                  <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6">
                    <div className="d-flex justify-content-end">
                      <div>
                        <form className="d-flex">
                          <h4 className="">
                            {branchData[0]?.hospital_name.toUpperCase()}
                          </h4>
                        </form>

                        <form className="d-flex ">
                          <h4>Contact Number : </h4>
                          <h4>{branchData[0]?.branch_contact}</h4>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 ">
                  <div className="d-flex justify-content-center">
                    <div className="col-xxl-9 col-xl-9 col-lg-9 col-md-11 col-sm-11">
                      <div className="row mt-2 d-flex justify-content-between">
                        <div className="col-xxl-5 col-xl-5 col-lg-5 col-md-5 col-sm-5">
                          <div class=" rounded mt-4">
                            <h4>PATIENT SUMMARY </h4>
                            <div className="d-flex ">
                              <h6>Patient Name </h6>
                              <h6 className="ms-1">
                                {" "}
                                : {paidBill[0]?.patient_name}{" "}
                              </h6>
                            </div>
                            <div className="d-flex">
                              <h6>Patient UHID </h6>
                              <h6 className="ms-1">: {paidBill[0]?.uhid}</h6>
                            </div>
                            <div className="d-flex ">
                              <h6> Invoice Number </h6>
                              <h6 className="ms-1">
                                {" "}
                                : {paidBill[0]?.bill_id}{" "}
                              </h6>
                            </div>
                            <div className="d-flex">
                              <h6> Invoice Date </h6>
                              <h6 className="ms-1">
                                {" "}
                                : {paidBill[0]?.bill_date.split("T")[0]}
                              </h6>
                            </div>
                          </div>
                        </div>

                        <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6">
                          <div class=" rounded d-flex justify-content-end mt-5 me-5">
                            <div class="card" style={{ width: "18rem" }}>
                              <div className="ms-4 mt-2">
                                <h1> ₹{paidBill[0]?.total_amount}</h1>
                                <h5 className="text-success ms-4">
                                  Patient Net Paid
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
                    <h2> Payment Description</h2>
                  </form>
                  <hr className="mt-5" />
                </div>
                <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 ">
                  <div className="d-flex justify-content-center mt-4">
                    <div className="col-xxl-9 col-xl-9 col-lg-9 col-md-11 col-sm-11">
                      <table class="table table-bordered shadow">
                        <thead class="table-primary  rounded">
                          <tr>
                            <th scope="col" style={{ width: "10%" }}>
                              Date
                            </th>
                            <th scope="col" style={{ width: "20%" }}>
                              Description
                            </th>
                            <th scope="col" style={{ width: "20%" }}>
                              Amount
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope="row">{paidBill[0]?.bill_date}</th>
                            <td>{paidBill[0]?.dental_treatment}</td>
                            <td>{paidBill[0]?.total_amount}</td>
                          </tr>
                          <tr>
                            <td colspan="2">
                              <h6>
                                Add additional notes and payment information{" "}
                                <span class="space"></span>
                                SubTotal
                              </h6>
                            </td>

                            <td className="fw-bolder">
                              {paidBill[0]?.total_amount}
                            </td>
                          </tr>
                          <tr>
                            <td colspan="2">
                              <h6>
                                <span class="spaces"></span>Gst(18%)
                              </h6>
                            </td>
                            <td className="fw-bolder">
                              ₹{Number(paidBill[0]?.total_amount) * 0.18}
                            </td>
                          </tr>
                          <tr>
                            <td colspan="2">
                              <h6>
                                <span class="spaces"></span>Paid Amount
                              </h6>
                            </td>
                            <td className="fw-bolder">
                              ₹{paidBill[0]?.paid_amount}
                            </td>
                          </tr>
                        </tbody>
                      </table>

                      <div class="row mt-5 d-flex">
                        <div className="d-flex justify-content-between">
                          <h4 className="">Thank you </h4>
                          <h4 className="">Auth. signature</h4>
                        </div>
                      </div>
                    </div>
                    <div className="d-xxl-none d-xl-none d-lg-none col-md-1 col-sm-1"></div>
                  </div>
                </div>
              </div>
              <div className="container d-flex justify-content-end mb-5">
                <button
                  class="btn btn btn-success dum text-capitalize"
                  onClick={handlePrint}
                >
                  Print
                </button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default PatintPaidPaymentPrint;
const Container = styled.div`
  .space {
    margin-right: 23.4rem;
  }
  .spaces {
    margin-right: 45rem;
  }
  @media print {
    .dum {
      display: none;
    }
  }
`;
