import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Header from "../Header";
import Sider from "../Sider";
import BranchDetails from "../BranchDetails";
import { useSelector } from "react-redux";
import axios from "axios";

const PatientsDue = () => {
  const user = useSelector((state) => state.user);
  console.log(
    `User Name: ${user.name}, User ID: ${user.id}, branch: ${user.branch}`
  );
  console.log("User State:", user);
  const [patBill, setPatBill] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const getPatBills = async () => {
    try {
      const { data } = await axios.get(
        `https://dentalguruaccountant.doaguru.com/api/v1/accountant/getPatientBillsByBranch/${user.branch}`
      );
      setPatBill(data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(patBill);
  const filterForUnPaidBills = patBill?.filter((item) => {
    return item.payment_status !== "paid";
  });

  console.log(filterForUnPaidBills);

  useEffect(() => {
    getPatBills();
  }, []);

  console.log(patBill);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filterForUnPaidBills.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

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
                        <h2 className="text-center">All Patients Due Data </h2>
                        <div className="container mt-5">
                          <div class="table-responsive rounded">
                            <table class="table table-bordered rounded shadow">
                              <thead className="table-head">
                                <tr>
                                  <th className="table-sno sticky">TPID</th>
                                  <th className="sticky">Patient UHID</th>
                                  <th className=" sticky">Patients Name</th>
                                  <th className=" sticky">Patients Mobile</th>
                                  <th className=" sticky">Patients Email</th>
                                  <th className=" sticky">Doctor Name</th>
                                  <th className=" sticky">Total Amount</th>
                                  <th className=" sticky">
                                    Paid By Direct Amount
                                  </th>
                                  <th className=" sticky">
                                    Paid By Secuirty Amt
                                  </th>
                                  <th className=" sticky">Due Amount</th>
                                  <th className=" sticky">Bill Date</th>
                                  <th className=" sticky">Action</th>
                                </tr>
                              </thead>

                              <tbody>
                                {currentItems?.map((item) => (
                                  <>
                                    <tr className="table-row">
                                      <td className="table-sno">
                                        {item.tp_id}
                                      </td>
                                      <td>{item.uhid}</td>
                                      <td>{item.patient_name}</td>
                                      <td>{item.patient_mobile}</td>
                                      <td>{item.patient_email}</td>
                                      <td>{item.assigned_doctor_name}</td>
                                      <td>{item.total_amount}</td>
                                      <td>{item.paid_amount}</td>
                                      <td>{item.pay_by_sec_amt}</td>
                                      <td>
                                        {item.total_amount -
                                          (item.paid_amount +
                                            item.pay_by_sec_amt)}
                                      </td>
                                      <td>{item.bill_date.split("T")[0]}</td>
                                      <td>
                                        {item.total_amount >
                                        item.paid_amount ? (
                                          <Link
                                            to={`/PatintDuePaymentPrint/${item.bill_id}/${item.tp_id}/${item.uhid}`}
                                          >
                                            <button
                                              className="btn"
                                              style={{
                                                backgroundColor: "#FFA600",
                                              }}
                                            >
                                              Pay Now
                                            </button>
                                          </Link>
                                        ) : (
                                          <span>
                                            <button
                                              className="btn btn-secondary disabled"
                                              disabled
                                            >
                                              Pay Now
                                            </button>
                                          </span>
                                        )}
                                      </td>
                                    </tr>
                                  </>
                                ))}
                              </tbody>
                            </table>
                          </div>
                          <div className="d-flex justify-content-center mt-3">
                            <button
                              className="btn btn-primary mx-2"
                              onClick={prevPage}
                              disabled={currentPage === 1}
                            >
                              Previous Page
                            </button>
                            <button
                              className="btn btn-primary mx-2"
                              onClick={nextPage}
                              disabled={
                                indexOfLastItem >= filterForUnPaidBills.length
                              }
                            >
                              Next Page
                            </button>
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

export default PatientsDue;
const Container = styled.div`
  .table-responsive {
    overflow: auto;
  }

  th {
    background-color: #201658;
    color: #fff;
    font-weight: bold;
    position: sticky;
    white-space: nowrap;
  }
  td {
    white-space: nowrap;
  }

  .sticky {
    position: sticky;
    top: 0;
    color: white;
    z-index: 1;
  }
`;
