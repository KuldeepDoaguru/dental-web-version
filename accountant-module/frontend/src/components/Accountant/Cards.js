import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { PiStethoscopeBold } from "react-icons/pi";
import { MdOutlineLocalPharmacy } from "react-icons/md";
import { LiaMicroscopeSolid } from "react-icons/lia";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { TbReportSearch } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const Cards = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  console.log(`User Name: ${user.name}, User ID: ${user.id}`);
  console.log("User State:", user);
  const branch = useSelector((state) => state.branch);
  console.log(`User Name: ${branch.name}`);
  const [opdData, setOpdData] = useState([]);
  const [treatData, setTreatData] = useState([]);
  const [voucherAmt, setVoucherAmt] = useState([]);
  const [patientBill, setPatientBill] = useState([]);

  const getOpdData = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8888/api/v1/accountant/getOPDDetailsByBranch/${branch.name}`
      );
      setOpdData(data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(opdData);
  //filter for patient treated today card
  const getDate = new Date();
  const year = getDate.getFullYear();
  const month = String(getDate.getMonth() + 1).padStart(2, "0");
  const day = String(getDate.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;
  console.log(formattedDate);

  //filterForPatAppointToday
  const filterForOpdAppointToday = opdData?.filter(
    (item) =>
      item.appointment_dateTime.split("T")[0] === formattedDate &&
      item.treatment_provided === "OPD"
  );

  console.log(filterForOpdAppointToday);

  const filterForAppointToday = opdData?.filter(
    (item) => item.appointment_dateTime.split("T")[0] === formattedDate
  );

  console.log(filterForAppointToday.length);

  const totalOpdPrice = () => {
    try {
      let total = 0;
      filterForOpdAppointToday.forEach((item) => {
        total = total + parseFloat(item.opd_amount);
      });
      console.log(total);
      return total;
    } catch (error) {
      console.log(error);
      return 0;
    }
  };

  const totalOpdValue = totalOpdPrice();
  console.log(totalOpdValue);

  const getTreatmentData = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8888/api/v1/accountant/getTreatmentDetailsByBranch/${branch.name}`
      );
      setTreatData(data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(treatData);
  //filterForPatAppointToday
  const filterForTreatAppointToday = treatData?.filter(
    (item) => item.bill_date.split("T")[0] === formattedDate
  );

  console.log(filterForTreatAppointToday);

  const totalTreatPrice = () => {
    try {
      let total = 0;
      filterForTreatAppointToday.forEach((item) => {
        total = total + item.net_amount;
      });
      console.log(total);
      return total;
    } catch (error) {
      console.log(error);
      return 0;
    }
  };

  const totalTreatValue = totalTreatPrice();
  console.log(totalTreatValue);

  const getVoucherAmount = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8888/api/v1/accountant/getVoucherListByBranch/${branch.name}`
      );
      console.log(data);
      setVoucherAmt(data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(voucherAmt[0]?.voucher_date);
  console.log(formattedDate);
  const filterForVoucherAmountToday = voucherAmt?.filter(
    (item) => item.voucher_date.split("T")[0] === formattedDate
  );

  console.log(filterForVoucherAmountToday);
  const totalVoucherPrice = () => {
    try {
      let total = 0;
      filterForVoucherAmountToday.forEach((item) => {
        total = total + item.voucher_amount;
      });
      console.log(total);
      return total;
    } catch (error) {
      console.log(error);
      return 0;
    }
  };

  const totalVoucherValue = totalVoucherPrice();
  console.log(totalVoucherValue);

  const getPatientBill = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8888/api/v1/accountant/getPatientBillsByBranch/${branch.name}`
      );
      setPatientBill(data);
    } catch (error) {
      console.log(error);
    }
  };

  const filterForPatientBillToday = patientBill?.filter(
    (item) => item.bill_date?.split("T")[0] === formattedDate
  );

  console.log(filterForPatientBillToday);

  useEffect(() => {
    getOpdData();
    getTreatmentData();
    getVoucherAmount();
    getPatientBill();
  }, []);

  return (
    <>
      <Container>
        <div className="row d-flex justify-content-around">
          <div className="col-xxl-2 col-xl-2 col-lg-2 col-sm-8 col-xxl-2 col-xl-2 col-lg-2 col-sm-8 col-8 col-md-2 my-3 p-0">
            <div className="card">
              <div className="card-body d-flex justify-content-center flex-column mb-3">
                <div className="text-light fs-1">
                  <PiStethoscopeBold />
                </div>
                <div className="cardtext">
                  <h5 className="card-title text-light">OPD Income</h5>
                  <p className="card-text text-light fw-semibold">
                    {totalOpdValue}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xxl-2 col-xl-2 col-lg-2 col-sm-8 col-8 col-md-2 my-3 p-0">
            <div className="card">
              <div className="card-body d-flex justify-content-center flex-column mb-3">
                <div className="text-light fs-1">
                  <MdOutlineLocalPharmacy />
                </div>
                <div className="cardtext">
                  <h5 className="card-title text-light">Total Appointments</h5>
                  <p className="card-text text-light fw-semibold">
                    {filterForAppointToday.length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xxl-2 col-xl-2 col-lg-2 col-sm-8 col-8 col-md-2 my-3 p-0">
            <div className="card">
              <div className="card-body d-flex justify-content-center flex-column mb-3">
                <div className="text-light fs-1">
                  <LiaMicroscopeSolid />
                </div>
                <div className="cardtext">
                  <h5 className="card-title text-light">Treatment Income</h5>
                  <p className="card-text text-light fw-semibold">
                    {totalTreatValue}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xxl-2 col-xl-2 col-lg-2 col-sm-8 col-8 col-md-2 my-3 p-0">
            <div className="card">
              <div className="card-body d-flex justify-content-center flex-column mb-3">
                <div className="text-light fs-1">
                  <LiaFileInvoiceDollarSolid />
                </div>
                <div className="cardtext">
                  <h5 className="card-title text-light">Expense Amount</h5>
                  <p className="card-text text-light fw-semibold">
                    {totalVoucherValue}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xxl-2 col-xl-2 col-lg-2 col-sm-8 col-8 col-md-2 my-3 p-0">
            <Link to="/AddPatientBill" className="noUnderline">
              <div className="card">
                <div className="card-body d-flex justify-content-center flex-column">
                  <div>
                    <TbReportSearch className="bi bi-people-fill icon" />
                  </div>

                  <div className="cardtext">
                    <h5 className="card-title text-light">Total Bills</h5>
                    <p className="card-text text-light fw-semibold">
                      {filterForPatientBillToday.length}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Cards;

const Container = styled.div`
  .card {
    background: #201658;
    height: 9.5rem;
    border: none;
    box-shadow: 1px 2px 8px black;
    &:hover {
      background: #9b59b6;
    }
  }

  .icon {
    font-size: 40px;
    /* align-items: start; */
    color: white;
    /* display: flex; */
  }
  .card-body {
    text-align: center;
    padding: 5px;
  }
  .card-link {
    text-decoration: none;
    font-size: small;
  }

  .cardtext {
    h5 {
      color: white;
    }
    p {
      color: white;
    }
  }
  .noUnderline {
    text-decoration: none;
    /* Add any other styles you want for the link here */
  }
`;
