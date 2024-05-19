import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
// import Calendar from 'react-calendar';
// import "react-calendar/dist/Calendar.css";
const Payment = () => {
  const dispatch = useDispatch();
  const { pid } = useParams();
  const user = useSelector((state) => state.user);
  console.log(`User Name: ${user.name}, User ID: ${user.id}`);
  console.log("User State:", user);
  const branch = useSelector((state) => state.branch);
  console.log(`User Name: ${branch.name}`);
  const [payData, setPayData] = useState([]);

  const getPaymentDetails = async () => {
    try {
      const { data } = await axios.get(
        `https://dentalgurusuperadmin.doaguru.com/api/v1/super-admin/getPaymentDetailsByPatId/${pid}` , 
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setPayData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPaymentDetails();
  }, []);

  return (
    <Wrapper>
      <div className="container cont-box">
        <div className="" id="table">
          <div
            className="widget-area-2 proclinic-box-shadow mx-3 mt-5"
            id="tableres"
          >
            <div className="table-responsive">
              <table className="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th>Receipt Id</th>
                    <th>Bill Id</th>
                    <th>Patient UHID</th>
                    <th>Branch</th>
                    <th>Bill Amount</th>
                    <th>Amount Paid(INR)</th>
                    <th>Pending Amount</th>
                    <th>Billed Service</th>
                    <th>Payment Mode</th>
                    <th>Payment Status</th>
                    <th>Payment Date</th>
                    <th>Payment Time</th>
                  </tr>
                </thead>
                <tbody>
                  {payData?.map((item) => (
                    <>
                      <tr>
                        <td>{item.pay_id}</td>
                        <td>{item.bill_id}</td>
                        <td>{item.uhid}</td>
                        <td>{item.branch_name}</td>
                        <td>{item.bill_amount}</td>
                        <td>{item.paid_amount}</td>
                        <td>{item.pending_amount}</td>
                        <td>{item.billed_service}</td>
                        <td>{item.payment_mode}</td>
                        <td>{item.payment_status}</td>
                        <td>{item.payment_date?.split("T")[0]}</td>
                        <td>{item.payment_time?.split(".")[0]}</td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Payment;
const Wrapper = styled.div`
  #card1 {
    background-image: linear-gradient(#9dc5f8, #cbfdd9);
    width: 20rem;
    height: 8rem;

    @media screen and (max-width: 768px) {
      width: 87%;
      margin-bottom: 12px;
    }
    @media screen and (min-width: 768px) and (max-width: 1020px) {
      width: 41rem;
    }
    @media screen and (min-width: 1020px) and (max-width: 1600px) {
      width: 13rem;
    }
  }

  .dotrem1 {
    list-style-type: none;
    width: 25px;
    padding-left: 4px;
  }
  .dotrem {
    list-style-type: none;
  }
  .cal {
    width: 19rem;

    @media screen and (max-width: 768px) {
      width: 88%;
    }
  }
  #table {
    @media screen and (max-width: 768px) {
      width: 22rem;
      margin-left: -1rem;
    }
  }

  .cont-box {
    width: 68rem;
    @media screen and (max-width: 768px) {
      width: 100%;
    }
  }
`;
