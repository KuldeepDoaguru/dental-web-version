import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import { Link, useParams } from "react-router-dom";
import { IoArrowBackSharp } from "react-icons/io5";
import { useSelector } from "react-redux";
import axios from "axios";

const OpdBills = () => {
  const { bid } = useParams();
  const [opdAmount, setOpdAmount] = useState([]);
  const user = useSelector((state) => state.user);
  const [branchData, setBranchData] = useState([]);
  const containerRef = useRef(null);
  console.log(
    `User Name: ${user.name}, User ID: ${user.id}, branch: ${user.branch}`
  );
  console.log("User State:", user);

  const goBack = () => {
    window.history.go(-1);
  };

  console.log(bid);
  const getOpdAmt = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8888/api/v1/accountant/getAppointmentDetailsViaIDOPD/${bid}`
      );
      setOpdAmount(data);
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
    getOpdAmt();
    branchDetails();
  }, []);

  console.log(opdAmount);
  console.log(branchData);

  const handlePrint = () => {
    const contentToPrint =
      document.getElementById("printableContent").innerHTML;
    const originalContent = document.body.innerHTML;

    document.body.innerHTML = contentToPrint;

    window.print();

    document.body.innerHTML = originalContent;
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

        <div className="container print-box" id="printableContent">
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
          <hr
            style={{
              color: "Grey",
              height: "2px",
            }}
          />

          <div className="mt-4">
            <div class="table-responsive rounded">
              <table class="table table-bordered rounded shadow">
                <tbody>
                  <tr className="table-row">
                    <td>
                      Patient Name :{" "}
                      <strong>
                        {opdAmount[0]?.patient_name.toUpperCase()}
                      </strong>
                    </td>
                    <td>
                      Date :{" "}
                      <strong>
                        {opdAmount[0]?.appointment_dateTime
                          .split("T")[0]
                          .toUpperCase()}
                      </strong>
                    </td>
                  </tr>
                </tbody>
                <tbody>
                  <tr className="table-row">
                    <td>
                      Patient Address :{" "}
                      <strong>{opdAmount[0]?.address.toUpperCase()}</strong>
                    </td>
                    <td>
                      Age/Sex :{" "}
                      <strong>
                        {opdAmount[0]?.age.toUpperCase()} /{" "}
                        {opdAmount[0]?.gender.toUpperCase()}
                      </strong>
                    </td>
                  </tr>
                </tbody>
                <tbody>
                  <tr className="table-row">
                    <td>
                      Phone Number :{" "}
                      <strong>{opdAmount[0]?.mobileno.toUpperCase()}</strong>
                    </td>
                    <td>
                      Consaltant :{" "}
                      <strong>
                        {opdAmount[0]?.assigned_doctor_name.toUpperCase()}
                      </strong>
                    </td>
                  </tr>
                </tbody>
                <tbody>
                  <tr className="table-row">
                    <td>
                      Email id :{" "}
                      <strong>{opdAmount[0]?.emailid.toUpperCase()}</strong>
                    </td>
                    <td>
                      OPD Fee :{" "}
                      <strong>{opdAmount[0]?.opd_amount.toUpperCase()}</strong>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center mb-5 mt-3">
          <div className="table-small">
            <button className="btn px-5 py-3" onClick={handlePrint}>
              Print
            </button>
          </div>
        </div>
      </Container>
    </>
  );
};

export default OpdBills;
const Container = styled.div`
  @media print {
    .Button {
      display: none; /* Hide the button when printing */
    }
    .print-box {
      width: 100%;
    }
  }
  .table-small {
    button {
      background: #201658;
      color: white;
    }
  }
`;
