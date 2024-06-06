import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Header from "../Header";
import Sider from "../Sider";
import BranchDetails from "../BranchDetails";
import { useSelector } from "react-redux";
import axios from "axios";
import moment from "moment";

const PatientsPaid = () => {
  const user = useSelector((state) => state.user);
  const token = user.token;
  console.log(token);
  console.log(
    `User Name: ${user.name}, User ID: ${user.id}, branch: ${user.branch}`
  );
  console.log("User State:", user);
  const [paidList, setPaidList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(7);
  const [keyword, setKeyword] = useState("");

  const getBillPaidList = async () => {
    try {
      const { data } = await axios.get(
        `https://dentalguruaccountant.doaguru.com/api/v1/accountant/paidBillLIst/${user.branch}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPaidList(data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(paidList);
  const filterForPaidBills = paidList?.filter((item) => {
    return item.payment_status === "paid";
  });

  console.log(filterForPaidBills);

  useEffect(() => {
    getBillPaidList();
  }, []);

  const filteredItems = filterForPaidBills.filter((item) =>
    item.patient_name.toLowerCase().includes(keyword)
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  // const nextPage = () => {
  //   setCurrentPage((prevPage) => prevPage + 1);
  // };

  // const prevPage = () => {
  //   setCurrentPage((prevPage) => prevPage - 1);
  // };

  const nextPage = () => {
    if (currentPage < Math.ceil(filteredItems.length / itemsPerPage)) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
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
                        <h2 className="text-center">Patients Paid Data</h2>
                        <div className="container mt-5">
                          <div>
                            <input
                              type="text"
                              placeholder="Search by Patient Name"
                              className="p-1 rounded input"
                              value={keyword}
                              // onChange={(e) =>
                              //   setKeyword(e.target.value.toLowerCase())
                              // }
                              onChange={(e) => {
                                setKeyword(e.target.value.toLowerCase());
                                setCurrentPage(1);
                              }}
                            />
                          </div>
                          <div class="table-responsive rounded mt-4">
                            <table class="table table-bordered rounded shadow">
                              <thead className="table-head">
                                <tr>
                                  <th className="sticky">Bill ID</th>
                                  <th className="sticky">Bill Date</th>
                                  <th className="sticky">TPID</th>
                                  <th className="sticky">Patient UHID</th>
                                  <th className="sticky">Patient Name</th>
                                  <th className="sticky">Patient No</th>
                                  <th className="sticky">Doctor Name</th>
                                  <th className="sticky">Total Amount</th>
                                  <th className="sticky">
                                    Paid By Direct Amount
                                  </th>
                                  <th className="sticky">
                                    Paid By Secuirty Amt
                                  </th>
                                  <th className="sticky">Payment Date</th>
                                  <th className="sticky">Payment Status</th>
                                  <th className="sticky">Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {currentItems?.map((item) => (
                                  <>
                                    <tr className="table-row">
                                      <td>{item.bill_id}</td>
                                      <td>
                                        {moment(
                                          item.bill_date?.split("T")[0],
                                          "YYYY-MM-DD"
                                        ).format("DD/MM/YYYY")}
                                      </td>
                                      <td>{item.tp_id}</td>
                                      <td>{item.uhid}</td>
                                      <td>{item.patient_name}</td>
                                      <td>{item.patient_mobile}</td>
                                      <td>{item.assigned_doctor_name}</td>
                                      <td>{item.total_amount}</td>
                                      <td>{item.paid_amount}</td>
                                      <td>{item.pay_by_sec_amt}</td>
                                      <td>
                                        {moment(
                                          item.payment_date_time?.split("T")[0],
                                          "YYYY-MM-DD"
                                        ).format("DD/MM/YYYY")}
                                      </td>
                                      <td>{item.payment_status}</td>
                                      <td>
                                        <Link
                                          // to={`/PatintPaidPaymentPrint/${item.bill_id}`}
                                          to={`/patient-bill/${item.bill_id}/${item.tp_id}`}
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
                                indexOfLastItem >= filterForPaidBills.length
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
  .input::placeholder {
    color: #aaa;
    opacity: 1; /* Ensure placeholder is visible */
    font-size: 1.2rem;
    transition: color 0.3s ease;
  }

  .input:focus::placeholder {
    color: transparent; /* Hide placeholder on focus */
  }

  .input {
    width: 25%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 20px;
    box-sizing: border-box;
    transition: border-color 0.3s ease;

    @media (min-width: 1024px) and (max-width: 1280px) {
      width: 28%;
    }
    @media (min-width: 768px) and (max-width: 1023px) {
      width: 38%;
    }
  }

  .input:focus {
    border-color: #007bff; /* Change border color on focus */
  }
`;