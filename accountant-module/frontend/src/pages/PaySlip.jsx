import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import Header from "../components/Header";
import { IoArrowBackSharp } from "react-icons/io5";
import axios from "axios";
import { useSelector } from "react-redux";
import BranchDetails from "../components/BranchDetails";

const PaySlip = () => {
  const user = useSelector((state) => state.user);
  console.log(
    `User Name: ${user.name}, User ID: ${user.id}, branch: ${user.branch}`
  );
  console.log("User State:", user);
  const { slid } = useParams();
  const [slipData, setSlipData] = useState([]);
  const [branchData, setBranchData] = useState([]);
  const goBack = () => {
    window.history.go(-1);
  };

  const getSalarySlip = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8888/api/v1/accountant/getEmployeeListByBranchByID/${user.branch}/${slid}`
      );
      setSlipData(data);
    } catch (error) {
      console.log(error);
    }
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

  useEffect(() => {
    getSalarySlip();
    branchDetails();
  }, []);

  console.log(slipData);

  const handlePrint = () => {
    const contentToPrint =
      document.getElementById("printableContent").innerHTML;
    const originalContent = document.body.innerHTML;

    document.body.innerHTML = contentToPrint;

    window.print();

    document.body.innerHTML = originalContent;
    window.location.reload();
  };
  return (
    <>
      <Container>
        <Header />
        <div className="container-fluid">
          <div className="row Button mt-2">
            <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
              <Link to="#">
                <IoArrowBackSharp
                  className="fs-1 text-black"
                  onClick={goBack}
                />
              </Link>
            </div>
          </div>
        </div>
        <div className="container print-box" id="printableContent">
          <div className="container-fluid">
            <div className="row">
              <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
                <div className="row d-flex justify-content-between mt-3">
                  <div className="">
                    <div className="mt-3">
                      <h3>{branchData[0]?.hospital_name.toUpperCase()}</h3>
                      <h5>Branch : {user.branch}</h5>
                    </div>
                    <form className="d-flex ms-auto my-sm">
                      <h6>Addresh : </h6>
                      <h6 className="ms-2">{branchData[0]?.branch_address}</h6>
                    </form>
                    <form className="d-flex ms-auto my-sm mt-1">
                      <h4>Contact Number : </h4>
                      <h4 className="ms-2">{branchData[0]?.branch_contact}</h4>
                    </form>
                  </div>
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
          <div className="container-fluid">
            <div className="row">
              <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
                <div className=" d-flex justify-content-center ">
                  <div className="col-12 col-md-4 ms-lg-3">
                    <form className="d-flex justify-content-center mt-2">
                      <h3>Pay Slip For the Month </h3>
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
            <div className="row">
              <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6">
                <div class="rounded">
                  <h4>EMPLOYEES SUMMARY </h4>
                  <div className="d-flex">
                    <h6>Employee name </h6>
                    <h6 className="ms-1">
                      {" "}
                      : {slipData[0]?.employee_name.toUpperCase()}
                    </h6>
                  </div>
                  <div className="d-flex">
                    <h6>Employee id </h6>
                    <h6 className="ms-1">
                      {" "}
                      : {slipData[0]?.employee_ID.toUpperCase()}
                    </h6>
                  </div>
                  <div className="d-flex">
                    <h6> Pay Month </h6>
                    <h6 className="ms-1">
                      {" "}
                      : {slipData[0]?.pay_month.toUpperCase()}
                    </h6>
                  </div>
                  <div className="d-flex">
                    <h6> Pay Date </h6>
                    <h6 className="ms-1">
                      {" "}
                      : {slipData[0]?.pay_date.split("T")[0]}
                    </h6>
                  </div>
                </div>
              </div>

              <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6">
                <div class=" rounded d-flex justify-content-end">
                  <div class="card" style={{ width: "18rem" }}>
                    <div className="ms-4 mt-2">
                      <h1>₹{slipData[0]?.payable_salary}</h1>
                      <h6 className="text-success">Employee Net Pay</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="container-fluid mt-5">
            <div className="">
              <div class="table-responsive rounded">
                <table class="table table-bordered rounded shadow">
                  <thead className="table-head">
                    <tr>
                      <th className="table-sno">Earnings</th>
                      <th className="table-small"> Amounts</th>
                      <th className="table-small">Deduction</th>
                      <th className="table-small">Amounts</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr className="table-row">
                      <td className="table-sno">Basic</td>
                      <td className="table-small">₹ {slipData[0]?.salary}</td>
                      <td className="table-small">Income Tax</td>
                      <td className="table-small">₹ 0</td>
                    </tr>
                  </tbody>
                  <tbody>
                    <tr className="table-row">
                      <td className="table-sno">House Rent Allowance</td>
                      <td className="table-small">₹ 0</td>
                      <td className="table-small">Provident Fund</td>
                      <td className="table-small">₹ 0</td>
                    </tr>
                  </tbody>

                  <tbody>
                    <tr className="table-row">
                      <td className="table-sno" style={{ width: "10%" }}></td>
                      <td className="table-small"></td>
                      <td className="table-small">Leave Deduction</td>
                      <td className="table-small">₹ 0</td>
                    </tr>
                  </tbody>
                  <tbody>
                    <tr className="table-row">
                      <td className="table-sno" style={{ width: "10%" }}>
                        Gross Earnings
                      </td>
                      <td className="table-small">₹ {slipData[0]?.salary}</td>
                      <td className="table-small">Total Deductions</td>
                      <td className="table-small">₹ 10000.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="container-fluid">
            <div class="table-responsive">
              <table class="table table-bordered rounded shadow">
                <tbody>
                  <tr className="table-row">
                    <td className="table-sno" style={{ width: "83%" }}>
                      <h5>TOTAL NET PAYABLE</h5>
                      <p>Gross Earnings - Total Deductions</p>
                    </td>
                    <td className="table-small" style={{ width: "17%" }}>
                      ₹ {slipData[0]?.payable_salary}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="container-fluid">
            <div class="table-responsive">
              <table class="table table-bordered rounded shadow">
                <tbody>
                  <tr className="table-row">
                    <td className="table-sno">
                      <p>
                        Amount In Words: Indian Rupee Fourt-Five Thousand Eight
                        Hundred Only
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-center mb-5 mt-3 ms-5">
          <div className="table-small">
            <button className="btn btn-print px-5 py-3" onClick={handlePrint}>
              Print
            </button>
          </div>
        </div>
      </Container>
    </>
  );
};

export default PaySlip;
const Container = styled.div`
  @media print {
    .Button {
      display: none; /* Hide the button when printing */
    }
  }
  .table-small {
    button {
      background: #201658;
      color: white;
    }
  }
`;
