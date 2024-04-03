import React, { useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import cogoToast from "cogo-toast";
import { useSelector } from "react-redux";
import moment from "moment";

const TreatmentBills = () => {
  const pdfRef = useRef();
  const { bid } = useParams();
  const [opdAmount, setOpdAmount] = useState([]);
  const navigate = useNavigate();

  const handlePrint = () => {
    window.print();
  };

  console.log(bid);

  const getTreatmentBill = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8888/api/v1/accountant/getAppointmentDetailsViaID/${bid}`
      );
      setOpdAmount(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTreatmentBill();
  }, []);

  console.log(opdAmount);
  return (
    <Container>
      <div ref={pdfRef}>
        <div className="headimage">
          <img src={opdAmount?.header_img} alt="header" srcset="" />
        </div>
        <div className="container-fluid m-0 p-0">
          <h5>Bill Date : {opdAmount[0]?.payment_date_time.split("T")[0]}</h5>
          <h5 className="text-center heading"> Bill RECIEPT</h5>

          <div className="row">
            <div className="col-12">
              <table className="table table-borderless">
                <tbody>
                  <tr>
                    <th className="text-start">Appointment Id</th>
                    <td className="text-capitalize">
                      {": "}
                      {opdAmount[0]?.appoint_id}
                    </td>

                    <th scope="col" className="text-start">
                      Patient id
                    </th>
                    <td className="text-capitalize">
                      {": "}
                      {opdAmount[0]?.uhid}
                    </td>

                    <th scope="col" className="text-start">
                      Branch Name
                    </th>
                    <td className="text-capitalize">
                      {": "}
                      {opdAmount[0]?.branch_name}
                    </td>
                  </tr>
                  <tr>
                    <th scope="col" className="text-start">
                      Patient Name
                    </th>
                    <td className="text-capitalize">
                      {": "}
                      {opdAmount[0]?.patient_name}
                    </td>
                    <th scope="col" className="text-start pe-5">
                      Mobile No
                    </th>
                    <td className="text-capitalize">
                      {": "}
                      {opdAmount[0]?.mobileno}
                    </td>
                    <th scope="col" className="text-start">
                      Appointment Date
                    </th>
                    <td className="text-capitalize">
                      {": "}
                      {opdAmount[0]?.appointment_dateTime.split("T")[0]}
                    </td>
                  </tr>
                  <tr></tr>
                  <tr>
                    <th scope="col" className="text-start">
                      Doctor Name
                    </th>
                    <td className="text-capitalize">
                      {": "}
                      {opdAmount[0]?.assigned_doctor_name}
                    </td>
                    <th scope="col" className="text-start">
                      {" "}
                      Payment Date
                    </th>
                    <td className="text-capitalize">
                      {": "}
                      {opdAmount[0]?.payment_date_time.split("T")[0]}
                    </td>
                    <th scope="col" className="text-start">
                      Payment Mode
                    </th>
                    <td className="text-capitalize">
                      {": "}
                      {opdAmount[0]?.payment_Mode}
                    </td>
                  </tr>
                  <tr>
                    {opdAmount[0]?.payment_Mode === "online" && (
                      <>
                        <th scope="col" className="text-start">
                          Transaction Id
                        </th>
                        <td className="text-capitalize">
                          {": "}
                          {opdAmount[0]?.transaction_Id}
                        </td>{" "}
                      </>
                    )}
                    <th scope="col" className="text-start">
                      Payment Status
                    </th>
                    <td className="text-capitalize">
                      {": "}
                      {opdAmount[0]?.payment_Status}
                    </td>
                  </tr>
                  <tr></tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="row proc-detail">
            <div className="col-12">
              <table className="table table-borderless">
                <thead>
                  <tr>
                    <th className="text-start ps-4 pb-2 pt-1 ">S.No.</th>
                    <th
                      scope="col"
                      colSpan="1"
                      className="text-start pb-2 pt-1 code-column"
                    >
                      Treatment Name
                    </th>
                    <th scope="col" className="text-end pe-4 pb-2 pt-1">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-start ps-4 ">{"1"}</td>
                    <td
                      colSpan="1"
                      style={{ wordWrap: "break-word", whiteSpace: "normal" }}
                      className="text-start code-column"
                    >
                      {opdAmount[0]?.dental_treatment}
                    </td>
                    <td className="text-end pe-4">
                      <div>Total Amount : {opdAmount[0]?.total_amount}</div>
                      <div>Paid Amount : {opdAmount[0]?.paid_amount}</div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="row proc-detail">
          <div className="col-6 d-flex align-items-end ">
            <div>
              <h6 className="ms-5 preparedBy">
                Generated by{": "}
                <span className="text-uppercase">
                  {opdAmount[0]?.received_by}
                </span>
              </h6>
            </div>
          </div>
        </div>

        <div className="footimage">
          <img src={opdAmount?.footer_img} alt="header" srcset="" />
        </div>
      </div>
      <div className="d-flex justify-content-center my-3 gap-2">
        <button
          type="button"
          className="btn btn-primary btn-lg"
          onClick={handlePrint}
        >
          Print
        </button>
        <button
          type="button"
          className="btn btn-primary btn-lg"
          onClick={() => navigate("/security-amount")}
        >
          Go back
        </button>
        {/* <button
    type='button'
    className='btn btn-secondary btn-lg ms-3'
    onClick={generatePDF}
  >
    Generate PDF
  </button> */}
      </div>
    </Container>
  );
};

export default TreatmentBills;

const Container = styled.div`
  font-family: "Times New Roman", Times, serif;
  overflow-x: hidden;
  background-color: white;

  .code-column {
  }

  .headimage {
    height: 18rem;
    width: auto;
    img {
      height: 100%;
      width: 100%;
    }
  }
  .footimage {
    @media print {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
    }

    height: 60px;
    width: auto;
    img {
      height: 100%;
      width: 100%;
    }
  }

  .heading {
    border-bottom: 2px solid black;
    font-weight: 700;
    font-size: large;
  }
  .details-1 {
    border-bottom: 2px solid black;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    padding: 0;
    /* margin-bottom: 10px;  */
  }

  th {
    /* padding: 8px; */
    text-align: center;
    white-space: nowrap; /* Prevent text from wrapping */
    font-weight: 600;
    font-size: medium;
    color: black;
    /* letter-spacing: 1.5px; */
    padding-top: 0;
    padding-bottom: 0;
  }
  td {
    /* padding: 8px; */
    text-align: start;
    white-space: nowrap;
    font-weight: 600;
    font-size: medium;
    color: black;
    /* letter-spacing: 0.5px; */
    padding-top: 0;
    padding-bottom: 0;
  }
  .proc-detail {
    border-top: 2px solid black;
  }
  .btn-primary {
    @media print {
      display: none;
    }
  }
  .preparedBy {
    /* font-weight: 900; */
    font-weight: bolder;
    font-size: medium;
  }
  .sealimg:not(img) {
    border: 0 !important;
  }
  .signimg:not(img) {
    border: 0 !important;
  }
  .second-th {
    padding-left: 30%;
  }
`;
