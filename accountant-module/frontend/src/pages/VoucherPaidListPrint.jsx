import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import Header from "../components/Header";
import { IoArrowBackSharp } from "react-icons/io5";
import axios from "axios";
import { useSelector } from "react-redux";
import numToWords from "num-to-words";

const VoucherPaidListPrint = () => {
  const { vid } = useParams();
  const user = useSelector((state) => state.user);
  const { refreshTable } = useSelector((state) => state.user);
  const branch = user.branch;
  const employeeName = user.employee_name;
  const [getVoucher, setGetVoucher] = useState([]);

  const getVoucherDataByIdBranch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8888/api/v1/accountant/voucher/${branch}/${vid}`
      );
      console.log(response.data);
      setGetVoucher(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getVoucherDataByIdBranch();
  }, []);

  const amountInWords = numToWords(getVoucher[0]?.voucher_amount);

  const goBack = () => {
    window.history.go(-1);
  };
  return (
    <>
      <Container>
        <Header />
        <div className="container-fluid">
          <div className="row Button mt-2">
            <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
              <IoArrowBackSharp className="fs-1 text-black" onClick={goBack} />
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
              <div className=" d-flex justify-content-center ">
                <div className="col-12 col-md-4 mt-4 ms-lg-3">
                  <form className="d-flex justify-content-center mt-2">
                    <h3>PAYMENT VOUCHER </h3>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <hr
            style={{
              color: "Grey",
              height: "2px",
            }}
          />
        </div>

        <div className="container-fluid">
          <div className="row  mt-4  d-flex justify-content-center">
            <div className="col-xxl-8 col-xl-8 col-lg-8 col-md-6 col-sm-6">
              <div className="d-flex rounded mt-5">
                <h4 className="ms-3"> Branch </h4>
                <h4 className="ms-1"> : {getVoucher[0]?.branch_name}</h4>
              </div>
            </div>

            <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-4 col-sm-4 ms-lg-4 ms-sm-5 ">
              <h5 className="mt-5 ms-lg-3 ms-md-5 ms-sm-4">
                Date : {getVoucher[0]?.voucher_date.split("T")[0]}
              </h5>
            </div>
          </div>
        </div>

        <div className="container-fluid  mt-5">
          <div className="row d-flex justify-content-center ">
            <div className="col-xxl-10 col-xl-10 col-lg-10 col-md-10 col-sm-10">
              <div class="table-responsive rounded">
                <table class="table table-bordered rounded shadow">
                  <tbody>
                    <tr className="table-row">
                      <td className="table-sno" style={{ width: "40%" }}>
                        <td className="table-sno" style={{ width: "85%" }}>
                          <td className="table-sno" style={{ width: "85%" }}>
                            <h6>Name :</h6>
                          </td>
                          <td className="table-sno" style={{ width: "85%" }}>
                            <h6> {getVoucher[0]?.for_name}</h6>
                          </td>
                        </td>
                      </td>
                      <td className="table-small" style={{ width: "15%" }}>
                        <h6>AMOUNT Rs.</h6>
                      </td>
                      {/* <td className="table-small" style={{ width: "5%" }}>
                        <h6>Ps.</h6>
                      </td> */}
                    </tr>
                  </tbody>
                  {/* <tbody>
                    <tr className="table-row">
                      <td className="table-sno" style={{ width: "40%" }}>
                        <td className="table-sno" style={{ width: "85%" }}>
                          <td className="table-sno" style={{ width: "85%" }}>
                            <h6>A/C :</h6>
                          </td>
                          <td className="table-sno" style={{ width: "85%" }}>
                            <h6>4000100042441</h6>
                          </td>
                        </td>
                      </td>
                      <td className="table-small" style={{ width: "15%" }}></td>
                      <td className="table-small" style={{ width: "5%" }}></td>
                    </tr>
                  </tbody> */}
                  <tbody>
                    <tr className="table-row">
                      <td className="table-small" style={{ width: "20%" }}>
                        <td className="table-sno" style={{ width: "85%" }}>
                          <td className="table-sno" style={{ width: "85%" }}>
                            <h6>Paid For :</h6>
                          </td>
                          <td className="table-sno" style={{ width: "85%" }}>
                            <h6>{getVoucher[0]?.for_use} </h6>
                          </td>
                        </td>
                      </td>
                      <td className="table-small" style={{ width: "20%" }}></td>
                      {/* <td className="table-small" style={{ width: "20%" }}>
                        00
                      </td> */}
                    </tr>
                  </tbody>

                  {/* <tbody>
                    <tr className="table-row">
                      <td className="table-sno" style={{ width: "85%" }}>
                        <td className="table-sno" style={{ width: "13%" }}>
                          <h6> </h6>
                        </td>
                        <td className="table-sno" style={{ width: "30%" }}>
                          <h6>Cold Coffee </h6>
                        </td>
                      </td>
                      <td className="table-small" style={{ width: "20%" }}>
                        500
                      </td>
                      <td className="table-small" style={{ width: "20%" }}>
                        00
                      </td>
                    </tr>
                  </tbody>
                  <tbody>
                    <tr className="table-row">
                      <td className="table-sno" style={{ width: "85%" }}>
                        <td className="table-sno" style={{ width: "15%" }}>
                          <h6> </h6>
                        </td>
                        <td className="table-sno" style={{ width: "30%" }}>
                          <h6>Hot Coffee </h6>
                        </td>
                      </td>
                      <td className="table-small" style={{ width: "20%" }}>
                        450
                      </td>
                      <td className="table-small" style={{ width: "20%" }}>
                        00
                      </td>
                    </tr>
                  </tbody> */}
                  <tbody>
                    <tr className="table-row">
                      <td className="table-sno" style={{ width: "60%" }}>
                        <td className="table-sno" style={{ width: "85%" }}>
                          <h6>Create By : {employeeName}</h6>
                        </td>
                        <td className="table-small" style={{ width: "6%" }}>
                          <h6>TOTAL</h6>
                        </td>
                      </td>
                      <td className="table-small" style={{ width: "20%" }}>
                        <h6>{getVoucher[0]?.voucher_amount}</h6>
                      </td>
                      {/* 
                      <td className="table-small" style={{ width: "20%" }}>
                        00
                      </td> */}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="container-fluid">
          <div className="row d-flex justify-content-center ">
            <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6">
              <div className="d-flex justify-content-start">
                <h6 className="fw-bold">
                  Rupees (in Words) :{" "}
                  <span className="text-uppercase">{amountInWords}</span>
                </h6>
              </div>
            </div>
            <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-4">
              <div className="d-flex justify-content-end">
                <p className="fw-bold">Receiver's Signature</p>
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-center mb-5 mt-5 ms-5">
          <div className="table-small">
            <button
              className="btn btn-print text-light px-5 py-3"
              style={{
                backgroundColor: "#201658",
              }}
              onClick={() => window.print()}
            >
              Print
            </button>
          </div>
        </div>
      </Container>
    </>
  );
};

export default VoucherPaidListPrint;
const Container = styled.div`
  @media print {
    .Button {
      display: none; /* Hide the button when printing */
    }
  }
`;
