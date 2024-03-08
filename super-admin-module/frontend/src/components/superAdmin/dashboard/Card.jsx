import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Card = () => {
  const branch = useSelector((state) => state.branch);
  console.log(`User Name: ${branch.name}`);
  const [appointmentList, setAppointmentList] = useState([]);
  const [availableEmp, setAvailableEmp] = useState([]);
  const [billTot, setBillTot] = useState();

  console.log(branch.name);
  const getAppointList = async () => {
    try {
      const response = await axios.get(
        `http://localhost:7777/api/v1/super-admin/getAppointmentData/${branch.name}`
      );
      console.log(response.data);
      setAppointmentList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getEmployeeAvailable = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:7777/api/v1/super-admin/getAvailableEmp/${branch.name}`
      );
      // console.log(data);
      setAvailableEmp(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAppointList();
    getEmployeeAvailable();
  }, [branch.name]);

  console.log(appointmentList);
  //filter for patient treated today card
  const getDate = new Date();
  const year = getDate.getFullYear();
  const month = String(getDate.getMonth() + 1).padStart(2, "0");
  const day = String(getDate.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;
  console.log(formattedDate);

  //filterForPatAppointToday
  const filterForPatAppointToday = appointmentList?.filter(
    (item) => item.appointment_dateTime.split("T")[0] === formattedDate
  );

  console.log(filterForPatAppointToday);

  //filter for patient treated today
  const filterForPatTreatToday = appointmentList?.filter(
    (item) =>
      item.treatment_status === "Treated" &&
      item.appointment_dateTime.split("T")[0] === formattedDate
  );

  console.log(filterForPatTreatToday);

  //filter for available doctor
  console.log(availableEmp[0]?.date.split("T")[0]);
  const filterForEmpAVToday = availableEmp?.filter(
    (item) =>
      item.availability === "yes" &&
      item.date.split("T")[0] === formattedDate &&
      item.employee_designation === "doctor"
  );

  console.log(filterForEmpAVToday);

  //filter for present employee today
  console.log(availableEmp[0]?.date.split("T")[0]);
  const filterForEmpPresentToday = availableEmp?.filter(
    (item) =>
      item.availability === "yes" && item.date.split("T")[0] === formattedDate
  );

  console.log(filterForEmpPresentToday);

  //filter for today's earning
  console.log(appointmentList[0]?.appointment_dateTime?.split("T")[0]);
  const filterForEarningToday = appointmentList?.filter(
    (item) =>
      item.payment_status === "success" &&
      item.appointment_dateTime?.split("T")[0] === formattedDate
  );

  // console.log(filterForEarningToday);

  const totalPrice = () => {
    try {
      let total = 0;
      filterForEarningToday.forEach((item) => {
        total = total + parseFloat(item.bill_amount);
      });
      console.log(total);
      return total;
    } catch (error) {
      console.log(error);
      return 0;
    }
  };

  const totalValue = totalPrice();

  return (
    <>
      <Container>
        <div className="row d-flex justify-content-around">
          <div className="col-xxl-2 col-xl-2 col-lg-2 col-sm-8 col-8 col-md-4 my-3 p-0">
            <div className="card">
              <div className="card-body d-flex justify-content-center flex-column align-items-center">
                <div>
                  <i className="bi bi-people-fill icon"></i>
                </div>
                <div className="cardtext">
                  <h5 className="card-title">Patient Treated Today</h5>
                  <p className="card-text">{filterForPatTreatToday.length}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xxl-2 col-xl-2 col-lg-2 col-sm-8 col-8 col-md-4 my-3 p-0">
            <div className="card">
              <div className="card-body d-flex justify-content-center flex-column align-items-center">
                <div>
                  <i className="bi bi-people-fill icon"></i>
                </div>
                <div className="cardtext">
                  <h5 className="card-title">Employees Present Today</h5>
                  <p className="card-text">{filterForEmpPresentToday.length}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xxl-2 col-xl-2 col-lg-2 col-sm-8 col-8 col-md-4 my-3 p-0">
            <div className="card">
              <div className="card-body d-flex justify-content-center flex-column align-items-center">
                <div>
                  <i className="bi bi-people-fill icon"></i>
                </div>
                <div className="cardtext">
                  <h5 className="card-title">Total Earnings Today</h5>
                  <p className="card-text">{totalValue}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xxl-2 col-xl-2 col-lg-2 col-sm-8 col-8 col-md-4 my-3 p-0">
            <div className="card">
              <div className="card-body d-flex justify-content-center flex-column align-items-center">
                <div>
                  <i className="bi bi-people-fill icon"></i>
                </div>
                <div className="cardtext">
                  <h5 className="card-title">Total Available Doctors Today</h5>
                  <p className="card-text">{filterForEmpAVToday.length}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xxl-2 col-xl-2 col-lg-2 col-sm-8 col-8 col-md-4 my-3 p-0">
            <div className="card">
              <div className="card-body d-flex justify-content-center flex-column align-items-center">
                <div>
                  <i className="bi bi-people-fill icon"></i>
                </div>

                <div className="cardtext">
                  <h5 className="card-title">Today's Appointments</h5>
                  <p className="card-text">{filterForPatAppointToday.length}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Card;

const Container = styled.div`
  .card {
    background: #004aad;
    height: 9.5rem;
    border: none;
    box-shadow: 1px 2px 8px black;
    &:hover {
      background: black;
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
`;
