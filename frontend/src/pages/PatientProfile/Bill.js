import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
// import Calendar from 'react-calendar';
// import "react-calendar/dist/Calendar.css";
const Bill = () => {
  const dispatch = useDispatch();
  const { pid } = useParams();
  const user = useSelector((state) => state.user);

  const branch = user.branch;
  const token = user.token;

  const [bills, setBills] = useState([]);

  const getBillDetails = async () => {
    try {
      const { data } = await axios.get(
        `https://dentalguruaccountant.doaguru.com/api/v1/accountant/getBillsViaUhid/${branch}/${pid}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setBills(data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBillDetails();
  }, []);

  console.log(bills);

  return (
    <Wrapper>
      <div className="container-fluid cont-box">
        <div className="" id="table">
          <div
            className="widget-area-2 proclinic-box-shadow mx-3 mt-5"
            id="tableres"
          >
            <div className="table-responsive">
              <table className="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th>Bill Date</th>
                    <th>Bill Id</th>

                    <th>Doctor</th>
                    <th>Total Amount(INR)</th>
                    <th>Direct Paid Amount(INR)</th>

                    <th>Pay by Security Amount</th>
                    <th>Payment Mode</th>
                    <th>Payment Date</th>

                    <th>Payment Status</th>
                  </tr>
                </thead>
                <tbody>
                  {bills?.map((item) => (
                    <>
                      <tr>
                        <td>
                          {moment(item.bill_date, "DD-MM-YYYYTHH:mm:ss").format(
                            "DD/MM/YYYY hh:mm A"
                          )}
                        </td>
                        <td>{item.bill_id}</td>

                        <td>{item.assigned_doctor_name}</td>
                        <td>{item.total_amount}</td>
                        <td>{item.paid_amount}</td>
                        <td>{item.pay_by_sec_amt}</td>
                        <td>{item.payment_mode}</td>
                        <td>
                          {moment(
                            item.payment_date_time,
                            "DD-MM-YYYYTHH:mm:ss"
                          ).format("DD/MM/YYYY")}
                        </td>
                        <td>{item.payment_status}</td>
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

export default Bill;
const Wrapper = styled.div`
  /* overflow-x: hidden; */
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
      width: auto;
      /* margin-left: -1rem; */
    }
  }
  th {
    white-space: nowrap;
  }
  td {
    white-space: nowrap;
  }

  .cont-box {
    width: 68rem;
    @media screen and (max-width: 900px) {
      width: 100%;
    }
  }
  /* .table-responsive {
  
    -ms-overflow-style: none;  // IE and Edge 
    scrollbar-width: none;  // Firefox 
  }

  .table-responsive::-webkit-scrollbar {
    display: none; // Hides the scrollbar in Chrome, Safari, and Opera 
  } */
`;
