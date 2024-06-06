import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { IoArrowBackSharp } from "react-icons/io5";
const VoucherPaid = () => {
  return (
    <>
      <Container>
        <Header />
        <div className="container-fluid">
          <div className="row Button mt-2">
            <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
              <Link to="/VoucherCreater">
                <IoArrowBackSharp className="fs-1 text-black" />
              </Link>
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

        <div className="container">
          <div className="row  mt-4 d-flex justify-content-between">
            <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6">
              <div className="d-flex rounded mt-5 ms-xxl-5 ms-xl-5 ms-lg-5 ms-md-0 ms-sm-0">
                <h4> Name </h4>
                <h4 className="ms-1"> : Vinay Dhariya </h4>
              </div>
            </div>

            <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-3 mt-5">
              <h3 className="me-xxl-5 me-xl-5 me-lg-5 me-md-0 me-sm-0">
                Date :
              </h3>
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
                          <h6>DEBIT</h6>
                        </td>
                      </td>
                      <td className="table-small" style={{ width: "15%" }}>
                        <h6>AMOUNT Rs.</h6>
                      </td>
                      <td className="table-small" style={{ width: "5%" }}>
                        <h6>Ps.</h6>
                      </td>
                    </tr>
                  </tbody>
                  <tbody>
                    <tr className="table-row">
                      <td className="table-sno" style={{ width: "40%" }}>
                        <h6>A/C</h6>
                      </td>
                      <td className="table-small" style={{ width: "15%" }}></td>
                      <td className="table-small" style={{ width: "5%" }}>
                        .
                      </td>
                    </tr>
                  </tbody>
                  <tbody>
                    <tr className="table-row">
                      <td className="table-small" style={{ width: "20%" }}>
                        <h6>Paid to :</h6>
                      </td>
                      <td className="table-small" style={{ width: "20%" }}></td>
                      <td className="table-small" style={{ width: "20%" }}>
                        .
                      </td>
                    </tr>
                  </tbody>

                  <tbody>
                    <tr className="table-row">
                      <td className="table-small" style={{ width: "20%" }}></td>
                      <td className="table-small" style={{ width: "20%" }}></td>
                      <td className="table-small" style={{ width: "20%" }}>
                        .
                      </td>
                    </tr>
                  </tbody>
                  <tbody>
                    <tr className="table-row">
                      <td className="table-small" style={{ width: "20%" }}></td>
                      <td className="table-small" style={{ width: "20%" }}></td>
                      <td className="table-small" style={{ width: "20%" }}>
                        .
                      </td>
                    </tr>
                  </tbody>
                  <tbody>
                    <tr className="table-row">
                      <td className="table-sno" style={{ width: "60%" }}>
                        <td className="table-sno" style={{ width: "85%" }}>
                          <h6>Paid by Cash / Cheque No.</h6>
                        </td>
                        <td className="table-small" style={{ width: "6%" }}>
                          <h6>TOTAL</h6>
                        </td>
                      </td>
                      <td className="table-small" style={{ width: "20%" }}></td>

                      <td className="table-small" style={{ width: "20%" }}>
                        .
                      </td>
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
              <div class="table-responsive">
                <table class="table table-bordered rounded shadow">
                  <tbody>
                    <tr className="table-row">
                      <td className="table-sno">
                        <td className="table-sno" style={{ width: "60%" }}>
                          <h6>
                            Rupees (in Words) : Indian Rupee Fourt-Five Thousand
                            Eight Hundred Only
                          </h6>
                        </td>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-4">
              <div class="table-responsive">
                <table class="table table-bordered rounded shadow">
                  <tbody>
                    <tr className="table-row">
                      <td className="table-sno">
                        <td className="table-small" style={{ width: "40%" }}>
                          <p>Receiver's Signature</p>
                        </td>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-center mb-5 mt-3 ms-5">
          <div className="table-small">
            <button
              className="btn btn-print px-5 py-3"
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

export default VoucherPaid;

const Container = styled.div`
  @media print {
    .Button {
      display: none; /* Hide the button when printing */
    }
  }
`;
