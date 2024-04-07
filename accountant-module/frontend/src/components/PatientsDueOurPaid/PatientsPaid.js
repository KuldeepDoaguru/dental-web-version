import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Header from "../Header";
import Sider from "../Sider";
import BranchDetails from "../BranchDetails";
import { useSelector } from "react-redux";
import axios from "axios";

const PatientsPaid = () => {
  const user = useSelector((state) => state.user);
  console.log(
    `User Name: ${user.name}, User ID: ${user.id}, branch: ${user.branch}`
  );
  console.log("User State:", user);
  const [paidList, setPaidList] = useState([]);

  const getBillPaidList = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8888/api/v1/accountant/paidBillLIst/${user.branch}`
      );
      setPaidList(data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(paidList);
  const filterForPaidBills = paidList?.filter((item) => {
    return item.paid_amount !== null;
  });

  console.log(filterForPaidBills);

  useEffect(() => {
    getBillPaidList();
  }, []);

  return (
    <>
      <Container>
        <Header />
        <div className="main">
          <div className="container-fluid">
            <div className="row d-flex justify-content-between">
              <div className="col-xxl-1 col-xl-1 col-lg-1 col-md-2 col-sm-2 p-0">
                <Sider />
              </div>
              <div className="col-xxl-11 col-xl-11 col-lg-11 col-md-10 col-sm-10">
                <div className="container-fluid">
                  <div className="row flex-nowrap ">
                    <div className="col-xxl-12 col-xl-12 col-lg-12 col-12 ps-0">
                      <BranchDetails />
                      <div className="container mt-3">
                        <h2 className="text-center">Patients Paid Data</h2>
                        <div className="container mt-5">
                          <div class="table-responsive rounded">
                            <table class="table table-bordered rounded shadow">
                              <thead className="table-head">
                                <tr>
                                  <th className="sticky">Bill ID</th>
                                  <th className="sticky">Bill Date</th>
                                  <th className="sticky">Appointment ID</th>
                                  <th className="sticky">Patient UHID</th>
                                  <th className="sticky">Patient Name</th>
                                  <th className="sticky">Doctor Name</th>
                                  <th className="sticky">Treatment</th>
                                  <th className="sticky">Total Amount</th>
                                  <th className="sticky">Paid Amount</th>
                                  <th className="sticky">Payment Date</th>
                                  <th className="sticky">Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {filterForPaidBills?.map((item) => (
                                  <>
                                    <tr className="table-row">
                                      <td>{item.bill_id}</td>
                                      <td>{item.bill_date.split("T")[0]}</td>
                                      <td>{item.appoint_id}</td>
                                      <td>{item.uhid}</td>
                                      <td>{item.patient_name}</td>
                                      <td>{item.assigned_doctor_name}</td>
                                      <td>{item.dental_treatment}</td>
                                      <td>{item.total_amount}</td>
                                      <td>{item.paid_amount}</td>
                                      <td>
                                        {item.payment_date_time?.split("T")[0]}
                                      </td>
                                      <td>
                                        <Link
                                          to={`/PatintPaidPaymentPrint/${item.bill_id}`}
                                        >
                                          <button
                                            className="btn"
                                            style={{
                                              backgroundColor: "#FFA600",
                                            }}
                                          >
                                            Print
                                          </button>
                                        </Link>
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default PatientsPaid;

const Container = styled.div`
  .table-responsive {
    height: 30rem;
    overflow: auto;
  }

  th {
    background-color: #201658;
    color: #fff;
    font-weight: bold;
    position: sticky;
  }

  .sticky {
    position: sticky;
    top: 0;
    color: white;
    z-index: 1;
  }
`;
