import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { IoPeople } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa6";
import { useSelector } from "react-redux";
import axios from "axios";

const AdminCards = () => {
  const user = useSelector((state) => state.user.currentUser);
  console.log(user);
  const [appointmentList, setAppointmentList] = useState([]);
  const [availableEmp, setAvailableEmp] = useState([]);
  const [treatValue, setTreatValue] = useState([]);

  const getAppointList = async () => {
    try {
      const { data } = await axios.get(
        `https://dentalguruadmin.doaguru.com/api/v1/admin/getAppointmentData/${user.branch_name}`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log(data);
      setAppointmentList(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getEmployeeAvailable = async () => {
    try {
      const { data } = await axios.get(
        `https://dentalguruadmin.doaguru.com/api/v1/admin/getAvailableEmp/${user.branch_name}`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      // console.log(data);
      setAvailableEmp(data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(availableEmp);

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
    (item) => item.appointment_dateTime?.split("T")[0] === formattedDate
  );

  console.log(filterForPatAppointToday);

  //filter for patient treated today
  const filterForPatTreatToday = appointmentList?.filter(
    (item) => item.appointment_dateTime?.split("T")[0] === formattedDate
  );

  console.log(filterForPatTreatToday);

  //filter for today's earning
  console.log(appointmentList[0]?.appointment_dateTime?.split("T")[0]);
  const filterForEarningToday = appointmentList?.filter(
    (item) =>
      item.payment_Status === "paid" &&
      item.appointment_dateTime?.split("T")[0] === formattedDate
  );

  console.log(filterForEarningToday);

  const totalPrice = () => {
    try {
      let total = 0;
      filterForEarningToday.forEach((item) => {
        total = total + parseFloat(item.opd_amount);
      });
      console.log(total);
      return total;
    } catch (error) {
      console.log(error);
      return 0;
    }
  };

  const totalValue = totalPrice();

  const getTreatmentValues = async () => {
    try {
      const { data } = await axios.get(
        `https://dentalguruadmin.doaguru.com/api/v1/admin/getTreatSuggest/${user.branch_name}`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log(data);
      setTreatValue(data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(treatValue);
  const filterForEarningTreatToday = treatValue?.filter(
    (item) =>
      item.payment_status === "paid" &&
      item.bill_date?.split("T")[0] === formattedDate
  );

  console.log(filterForEarningTreatToday);

  const totalBillPrice = () => {
    try {
      let total = 0;
      filterForEarningTreatToday.forEach((item) => {
        total =
          total +
          parseFloat(item.paid_amount) +
          parseFloat(item.pay_by_sec_amt);
      });
      console.log(total);
      return total;
    } catch (error) {
      console.log(error);
      return 0;
    }
  };

  const totalBillValue = totalBillPrice();
  console.log(totalBillValue);

  //filter for available doctor
  console.log(availableEmp);
  const filterForEmpAVToday = availableEmp?.filter(
    (item) =>
      item.availability === "yes" &&
      item.date?.split("T")[0] === formattedDate &&
      item.employee_designation === "doctor"
  );

  console.log(filterForEmpAVToday);

  //filter for present employee today
  console.log(availableEmp);
  const filterForEmpPresentToday = availableEmp?.filter(
    (item) =>
      item.availability === "yes" && item.date?.split("T")[0] === formattedDate
  );

  console.log(filterForEmpPresentToday);
  useEffect(() => {
    getAppointList();
    getEmployeeAvailable();
    getTreatmentValues();
  }, []);
  return (
    <>
      <Container>
        <div className="row d-flex justify-content-around">
          <div className="col-xxl-2 col-xl-2 col-lg-2 col-sm-8 col-8 col-md-3 my-3 p-0 mx-2">
            <div className="card">
              <div className="card-body d-flex justify-content-center flex-column">
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

          <div className="col-xxl-2 col-xl-2 col-lg-2 col-sm-8 col-8 col-md-3 my-3 p-0">
            <div className="card">
              <div className="card-body d-flex justify-content-center flex-column">
                <div>
                  <i className="bi bi-people-fill icon"></i>
                </div>
                <div className="cardtext">
                  <h5 className="card-title">Earn OPD Today</h5>
                  <p className="card-text">₹{totalValue}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xxl-2 col-xl-2 col-lg-2 col-sm-8 col-8 col-md-3 my-3 p-0">
            <div className="card">
              <div className="card-body d-flex justify-content-center flex-column">
                <div>
                  <i className="bi bi-people-fill icon"></i>
                </div>
                <div className="cardtext">
                  <h5 className="card-title">Earn Treatment Today</h5>
                  <p className="card-text">₹{totalBillValue}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xxl-2 col-xl-2 col-lg-2 col-sm-8 col-8 col-md-3 my-3 p-0 mx-2">
            <div className="card">
              <div className="card-body d-flex justify-content-center flex-column">
                <div>
                  <i className="bi bi-people-fill icon"></i>
                </div>
                <div className="cardtext">
                  <h5 className="card-title">Available Doctors Today</h5>
                  <p className="card-text">{filterForEmpAVToday.length}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xxl-2 col-xl-2 col-lg-2 col-sm-8 col-8 col-md-3 my-3 p-0">
            <div className="card">
              <div className="card-body d-flex justify-content-center flex-column">
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

export default AdminCards;
const Container = styled.div`
  .card {
    background: #1abc9c;
    height: 9.5rem;
    border: none;
    box-shadow: 1px 2px 8px black;
    &:hover {
      background: #3498db;
    }
  }

  .icon {
    font-size: 40px;
    /* align-items: start; */
    color: #000;
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
      color: #000;
    }
    p {
      color: #000;
    }
  }
`;
