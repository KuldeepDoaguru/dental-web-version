import axios from "axios";
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
  console.log(`User Name: ${user.name}, User ID: ${user.id}`);
  console.log("User State:", user);
  const branch = useSelector((state) => state.branch);
  console.log(`User Name: ${branch.name}`);
  const [billData, setBillData] = useState([]);

  const getBillDetails = async () => {
    try {
      const { data } = await axios.get(
        `https://dentalgurusuperadmin.doaguru.com/api/v1/super-admin/getPatientBillByBranchAndId/${pid}`
      );
      console.log(data);
      setBillData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBillDetails();
  }, []);

  console.log(billData);

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
                    <th>Bill Id</th>
                    <th>Treatment</th>
                    <th>Consultant</th>
                    <th>Cost(INR)</th>
                    <th>Discount(INR)</th>
                    <th>Tax%</th>
                    <th>Net Amount</th>
                    <th>Paid</th>
                    <th>Pending</th>
                    <th>Billing Status</th>
                  </tr>
                </thead>
                <tbody>
                  {billData?.map((item) => (
                    <>
                      <tr>
                        <td>{item.bill_id}</td>
                        <td>{item.treatment}</td>
                        <td>{item.assigned_doctor}</td>
                        <td>{item.total_amount}</td>
                        <td>{item.discount}</td>
                        <td>{item.tax_percent}%</td>
                        <td>{item.net_amount}</td>
                        <td>{item.paid_amount}</td>
                        <td>{item.pending_amount}</td>
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
    @media screen and (max-width: 900px) {
      width: 100%;
    }
  }
`;
