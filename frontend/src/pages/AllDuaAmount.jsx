import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { IoArrowBackSharp } from "react-icons/io5";

const AllDuaAmount = () => {
  const goBack = () => {
    window.history.go(-1);
  };
  return (
    <>
      <Container>
        <Header />
        <div className="container-fluid">
          <div className="row">
            <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
              <IoArrowBackSharp className="fs-1 text-black" onClick={goBack} />
              <div className=" d-flex justify-content-center ">
                <div className="col-12 col-md-4 mt-4 ms-lg-3">
                  {/* <div className="d-flex justify-content-center">
                    <h2>Dental Guru</h2>
                  </div> */}
                  {/* <form className="d-flex justify-content-center mt-2">
                    <h6>Addresh : </h6>
                    <h6 className="ms-2">
                      128,Near Gwarighat Jabalpur M.p (482001)
                    </h6>
                  </form> */}
                  <form className="d-flex justify-content-center mt-2">
                    <h3>Due Amount For the Month </h3>
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
              <div class=" rounded mt-5">
                <h4>EMPLOYEES SUMMARY </h4>
                <div className="d-flex">
                  <h6>Employee name </h6>
                  <h6 className="ms-1"> : Vinay Dhariya </h6>
                </div>
                <div className="d-flex">
                  <h6>Employee id </h6>
                  <h6 className="ms-1"> : 123 </h6>
                </div>
                <div className="d-flex">
                  <h6> Pay Period </h6>
                  <h6 className="ms-1"> : March 2023 </h6>
                </div>
                <div className="d-flex">
                  <h6> Pay Date </h6>
                  <h6 className="ms-1"> : 31/23/2023 </h6>
                </div>
              </div>
            </div>

            <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6">
              <div class=" rounded d-flex justify-content-end">
                <div class="card" style={{ width: "18rem" }}>
                  <div className="ms-4 mt-2">
                    <h1>- ₹45,400.00</h1>
                    <h6 className="text-danger ms-4">HAVE TO PAID</h6>
                    <hr />
                  </div>

                  <div class="card-body ms-4">
                    <p class="card-text">PAID AMOUNT : 75800</p>
                    <p class="card-text">PAY AMOUNT : 30400</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container-fluid  mt-5">
          <div className="row d-flex justify-content-center ">
            <div className="col-xxl-10 col-xl-10 col-lg-10 col-md-10 col-sm-10">
              <div class="table-responsive rounded">
                <table class="table table-bordered rounded shadow">
                  <thead className="table-head">
                    <tr>
                      <th className="table-sno" style={{ width: "20%" }}>
                        Earnings
                      </th>
                      <th className="table-small" style={{ width: "20%" }}>
                        {" "}
                        Amounts
                      </th>

                      <th className="table-small" style={{ width: "20%" }}>
                        Deduction
                      </th>
                      <th className="table-small" style={{ width: "20%" }}>
                        Amounts
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr className="table-row">
                      <td className="table-sno" style={{ width: "20%" }}>
                        Basic
                      </td>
                      <td className="table-small" style={{ width: "20%" }}>
                        ₹ 33,333.00
                      </td>
                      <td className="table-small" style={{ width: "20%" }}>
                        Income Tex
                      </td>
                      <td className="table-small" style={{ width: "20%" }}>
                        0
                      </td>
                    </tr>
                  </tbody>
                  <tbody>
                    <tr className="table-row">
                      <td className="table-sno" style={{ width: "20%" }}>
                        House Rent Allowance
                      </td>
                      <td className="table-small" style={{ width: "20%" }}>
                        ₹ 16,667.00
                      </td>
                      <td className="table-small" style={{ width: "20%" }}>
                        Provident Fund
                      </td>
                      <td className="table-small" style={{ width: "20%" }}>
                        ₹ 4,000.00
                      </td>
                    </tr>
                  </tbody>

                  <tbody>
                    <tr className="table-row">
                      <td className="table-sno" style={{ width: "10%" }}></td>
                      <td className="table-small" style={{ width: "20%" }}></td>
                      <td className="table-small" style={{ width: "20%" }}>
                        Professional Tax
                      </td>
                      <td className="table-small" style={{ width: "20%" }}>
                        ₹ 2,00.00
                      </td>
                    </tr>
                  </tbody>
                  <tbody>
                    <tr className="table-row">
                      <td className="table-sno" style={{ width: "10%" }}>
                        Gross Earnings
                      </td>
                      <td className="table-small" style={{ width: "20%" }}>
                        ₹ 50,000.00
                      </td>
                      <td className="table-small" style={{ width: "20%" }}>
                        Total Deductions
                      </td>
                      <td className="table-small" style={{ width: "20%" }}>
                        ₹ 4,200.00
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
            <div className="col-xxl-10 col-xl-10 col-lg-10 col-md-10 col-sm-10">
              <div class="table-responsive">
                <table class="table table-bordered rounded shadow">
                  <tbody>
                    <tr className="table-row">
                      <td className="table-sno" style={{ width: "83%" }}>
                        <h5>TOTAL NET PAYABLE</h5>
                        <p>Gross Earnings - Total Deductions</p>
                      </td>
                      <td className="table-small" style={{ width: "17%" }}>
                        - ₹ 45,800.00
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
            <div className="col-xxl-10 col-xl-10 col-lg-10 col-md-10 col-sm-10">
              <div class="table-responsive">
                <table class="table table-bordered rounded shadow">
                  <tbody>
                    <tr className="table-row">
                      <td className="table-sno">
                        <p>
                          Amount In Words: Indian Rupee Fourt-Five Thousand
                          Eight Hundred Only
                        </p>
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

export default AllDuaAmount;
const Container = styled.div``;
