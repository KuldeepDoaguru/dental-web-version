import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";

const Bill = () => {
  const dispatch = useDispatch();
  const { pid } = useParams();
  const { uhid } = useParams();
  const user = useSelector((state) => state.user);
  const token = user.currentUser.token;
  // console.log(`User Name: ${user.name}, User ID: ${user.id}`);
  // console.log("User State:", user);
  const branch = useSelector((state) => state.branch);

  const [billData, setBillData] = useState([]);

  const getBillDetails = async () => {
    try {
      const { data } = await axios.get(
        `https://dentalgurudoctor.doaguru.com/api/doctor/get-patientBill-data/${uhid}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
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
            className="widget-area-2 proclinic-box-shadow mt-5"
            id="tableres"
          >
            <div className="table-responsive">
              <table className="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th>Bill Date</th>
                    <th>Bill ID</th>
                    {/* <th>Doctor</th> */}
                    <th>Total Amount(INR)</th>
                    <th>Direct Paid Amount(INR)</th>
                    <th>Pay By Security Amount</th>
                    <th>Payment Mode</th>
                    <th>Payment Date</th>
                    <th>Payment Status</th>
                    <th>View Bill</th>
                  </tr>
                </thead>
                <tbody>
                  {billData?.map((item) => (
                    <>
                      <tr>
                        <td>{item?.bill_date?.split(" ")[0]}</td>
                        <td>{item.bill_id}</td>
                        {/* <td>{item.assigned_doctor_name}</td> */}
                        <td>{item.total_amount}</td>
                        <td>{item.paid_amount}</td>
                        <td>{item.pay_by_sec_amt}</td>
                        <td>{item.payment_mode}</td>
                        <td>{item.payment_date_time?.split(" ")[0]}</td>
                        <td>{item.payment_status}</td>
                        <td>
                          <a
                            href={`/ViewPatientTotalBill/${item.tp_id}`}
                            target="_blank"
                          >
                            <button
                              className="btn btn-warning shadow text-white"
                              style={{
                                backgroundColor: "#0dcaf0",
                                border: "#0dcaf0",
                              }}
                            >
                              View Bill
                            </button>
                          </a>
                        </td>
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
      width: 100%;
      margin-left: 0rem;
    }
  }

  .cont-box {
    width: 100%;
    @media screen and (max-width: 900px) {
      width: 100%;
    }
  }

  th,
  td {
    white-space: nowrap;
  }

  .table-responsive {
    width: 80%;
    overflow-x: auto;
    @media screen and (max-width: 1000px) {
      width: 55%;
    }
  }
`;
