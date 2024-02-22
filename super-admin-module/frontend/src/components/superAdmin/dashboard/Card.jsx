import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Card = () => {
  const [appointmentList, setAppointmentList] = useState([]);

  const getAppointList = async () => {
    try {
      const response = await axios.get(
        "http://localhost:7777/api/v1/super-admin/getAppointmentData"
      );
      console.log(response.data);
      setAppointmentList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAppointList();
  }, []);

  console.log(appointmentList[0]?.treatment_status);
  //filter for patient treated today card
  const filterForPatTreatToday = appointmentList?.filter(
    (item) => item.treatment_status === "success"
  );

  console.log(filterForPatTreatToday);
  return (
    <>
      <Container>
        <div className="row d-flex justify-content-around">
          <div className="col-xxl-2 col-xl-2 col-lg-2 col-sm-8 col-8 col-md-2 my-3 p-0">
            <div className="card">
              <div className="card-body d-flex justify-content-center flex-column">
                <div>
                  <i className="bi bi-people-fill icon"></i>
                </div>
                <div className="cardtext">
                  <h5 className="card-title">Patient Treated Today</h5>
                  <p className="card-text">250</p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xxl-2 col-xl-2 col-lg-2 col-sm-8 col-8 col-md-2 my-3 p-0">
            <div className="card">
              <div className="card-body d-flex justify-content-center flex-column">
                <div>
                  <i className="bi bi-people-fill icon"></i>
                </div>
                <div className="cardtext">
                  <h5 className="card-title">Employees Present Today</h5>
                  <p className="card-text">25</p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xxl-2 col-xl-2 col-lg-2 col-sm-8 col-8 col-md-2 my-3 p-0">
            <div className="card">
              <div className="card-body d-flex justify-content-center flex-column">
                <div>
                  <i className="bi bi-people-fill icon"></i>
                </div>
                <div className="cardtext">
                  <h5 className="card-title">Total Earnings Today</h5>
                  <p className="card-text">25000</p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xxl-2 col-xl-2 col-lg-2 col-sm-8 col-8 col-md-2 my-3 p-0">
            <div className="card">
              <div className="card-body d-flex justify-content-center flex-column">
                <div>
                  <i className="bi bi-people-fill icon"></i>
                </div>
                <div className="cardtext">
                  <h5 className="card-title">Total Available Doctors Today</h5>
                  <p className="card-text">15</p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xxl-2 col-xl-2 col-lg-2 col-sm-8 col-8 col-md-2 my-3 p-0">
            <div className="card">
              <div className="card-body d-flex justify-content-center flex-column">
                <div>
                  <i className="bi bi-people-fill icon"></i>
                </div>

                <div className="cardtext">
                  <h5 className="card-title">Today's Appointments</h5>
                  <p className="card-text">56</p>
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
