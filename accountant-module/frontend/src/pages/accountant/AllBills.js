import React, { useState } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import Sider from "../../components/Sider";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const AllBills = () => {
  //   const [billType, setBillType] = useState(null);
  const initialTab = localStorage.getItem("selectedTab") || "tab1";
  const [selectedTab, setSelectedTab] = useState(initialTab);

  console.log(selectedTab);
  return (
    <>
      <Container>
        <Header />
        <div className="main">
          <div className="container-fluid">
            <div className="row flex-nowrap ">
              <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-2 col-sm-2 p-0">
                <Sider />
              </div>
              <div className="col-xxl-10 col-xl-10 col-lg-10 col-md-10 col-sm-10">
                <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
                  <div className="row d-flex justify-content-between ">
                    <div className="col-12 col-md-4 mt-4">
                      <div>
                        <h5>Branch : Madan Mahal</h5>
                      </div>
                      <div className="mt-2">
                        <h3> Welcome to Dental Guru! </h3>
                      </div>
                      <div className="mt-3">
                        <h6>Accountant Dashboard</h6>
                      </div>
                    </div>

                    <div className="col-12 col-md-4 me-4 mt-5">
                      <form className="d-flex ms-auto my-sm" role="search">
                        <input
                          className="form-control me-2"
                          type="search"
                          placeholder="Search"
                          aria-label="Search"
                        />
                        <button
                          className="btn btn-primary"
                          style={{ backgroundColor: "#201658" }}
                          type="submit"
                        >
                          Search
                        </button>
                      </form>
                    </div>
                  </div>

                  {/* <div className="container mt-3">
                  <h3 className="text-center">All Patient Bill List</h3>
                  <div className="container mt-3">
                    <div class="table-responsive rounded">
                      <table class="table table-bordered rounded shadow">
                        <thead className="table-head">
                          <tr>
                            <th className="table-sno" style={{ width: "10%" }}>
                              SN
                            </th>
                            <th
                              className="table-small"
                              style={{ width: "15%" }}
                            >
                              Patient Name
                            </th>
                            <th
                              className="table-small"
                              style={{ width: "15%" }}
                            >
                              Doctor Name
                            </th>
                            <th
                              className="table-small"
                              style={{ width: "20%" }}
                            >
                              For
                            </th>
                            <th
                              className="table-small"
                              style={{ width: "10%" }}
                            >
                              Amount
                            </th>
                            <th
                              className="table-small"
                              style={{ width: "10%" }}
                            >
                              Gst%
                            </th>
                            <th
                              className="table-small"
                              style={{ width: "10%" }}
                            >
                              Discount
                            </th>
                            <th
                              className="table-small"
                              style={{ width: "10%" }}
                            >
                              Net Amount
                            </th>
                            <th
                              className="table-small"
                              style={{ width: "10%" }}
                            >
                              Bill Date
                            </th>
                            <th
                              className="table-small"
                              style={{ width: "10%" }}
                            >
                              Action
                            </th>
                          </tr>
                        </thead>

                        <tbody>
                          <tr className="table-row">
                            <td className="table-sno" style={{ width: "10%" }}>
                              1
                            </td>
                            <td
                              className="table-small"
                              style={{ width: "20%" }}
                            >
                              Ram Lal
                            </td>
                            <td
                              className="table-small"
                              style={{ width: "20%" }}
                            >
                              Dr.Shubham patel
                            </td>
                            <td
                              className="table-small"
                              style={{ width: "20%" }}
                            >
                              Teeth Cleaning
                            </td>
                            <td
                              className="table-small"
                              style={{ width: "10%" }}
                            >
                              1000
                            </td>
                            <td
                              className="table-small"
                              style={{ width: "10%" }}
                            >
                              18%
                            </td>
                            <td
                              className="table-small"
                              style={{ width: "10%" }}
                            >
                              20%
                            </td>
                            <td
                              className="table-small"
                              style={{ width: "10%" }}
                            >
                              980
                            </td>
                            <td
                              className="table-small"
                              style={{ width: "10%" }}
                            >
                              12/12/2024
                            </td>
                            <td
                              className="table-small"
                              style={{ width: "10%" }}
                            >
                              <button
                                className="btn"
                                style={{
                                  backgroundColor: "#FFA600",
                                }}
                              >
                                Edit
                              </button>
                            </td>
                          </tr>
                        </tbody>

                        <tbody>
                          <tr className="table-row">
                            <td className="table-sno" style={{ width: "10%" }}>
                              2
                            </td>
                            <td
                              className="table-small"
                              style={{ width: "20%" }}
                            >
                              Jyoti Prashad
                            </td>
                            <td
                              className="table-small"
                              style={{ width: "20%" }}
                            >
                              Dr.Shivassh Sen
                            </td>
                            <td
                              className="table-small"
                              style={{ width: "20%" }}
                            >
                              Wisdom Tooth are Paining
                            </td>
                            <td
                              className="table-small"
                              style={{ width: "10%" }}
                            >
                              600
                            </td>
                            <td
                              className="table-small"
                              style={{ width: "10%" }}
                            >
                              18%
                            </td>
                            <td
                              className="table-small"
                              style={{ width: "10%" }}
                            >
                              18%
                            </td>
                            <td
                              className="table-small"
                              style={{ width: "10%" }}
                            >
                              600
                            </td>

                            <td
                              className="table-small"
                              style={{ width: "10%" }}
                            >
                              12/12/2024
                            </td>
                            <td
                              className="table-small"
                              style={{ width: "10%" }}
                            >
                              <button
                                className="btn"
                                style={{
                                  backgroundColor: "#FFA600",
                                }}
                              >
                                Edit
                              </button>
                            </td>
                          </tr>
                        </tbody>

                        <tbody>
                          <tr className="table-row">
                            <td className="table-sno" style={{ width: "10%" }}>
                              2
                            </td>
                            <td
                              className="table-small"
                              style={{ width: "20%" }}
                            >
                              Jyoti Prashad
                            </td>
                            <td
                              className="table-small"
                              style={{ width: "20%" }}
                            >
                              Dr.Shivassh Sen
                            </td>
                            <td
                              className="table-small"
                              style={{ width: "20%" }}
                            >
                              Wisdom Tooth are Paining
                            </td>
                            <td
                              className="table-small"
                              style={{ width: "10%" }}
                            >
                              600
                            </td>
                            <td
                              className="table-small"
                              style={{ width: "10%" }}
                            >
                              18%
                            </td>
                            <td
                              className="table-small"
                              style={{ width: "10%" }}
                            >
                              18%
                            </td>
                            <td
                              className="table-small"
                              style={{ width: "10%" }}
                            >
                              600
                            </td>

                            <td
                              className="table-small"
                              style={{ width: "10%" }}
                            >
                              12/12/2024
                            </td>
                            <td
                              className="table-small"
                              style={{ width: "10%" }}
                            >
                              <button
                                className="btn"
                                style={{
                                  backgroundColor: "#FFA600",
                                }}
                              >
                                Edit
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div> */}
                </div>

                <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
                  <div className="row d-flex justify-content-between mt-5 me-4">
                    <form className="form-control">
                      <div className="row g-2  p-2">
                        <div className="col-lg-3  "> </div>

                        <div className="col-lg-6 text-lg-center text-sm-start ">
                          {" "}
                          <h3 className="mb-4 ">Invoice Generation </h3>
                        </div>
                        <div className="col-lg-2">
                          <button className="btn btn-success ">
                            <Link
                              to="/invoicelist"
                              className="text-white text-decoration-none"
                            >
                              Invoice List
                            </Link>
                          </button>
                        </div>
                        <div className="col-lg-1  "> </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-3 mb-3">
                          <input
                            type="text"
                            className="form-control text-center"
                            id="invoiceName"
                            name="Patient_Id"
                            placeholder="Patient Id"
                            required
                          />
                        </div>
                        <div className="col-lg-3 mb-3">
                          <input
                            type="text"
                            className="form-control text-center"
                            id="invoiceName"
                            name="Patient_Name"
                            placeholder="Patient Name"
                            required
                          />
                        </div>{" "}
                        <div className="col-lg-3 mb-3">
                          <input
                            type="text"
                            className="form-control text-center"
                            id="Invoice_Number"
                            name="Invoice_Number"
                            placeholder="Invoice_Number"
                            required
                          />
                        </div>
                        <div className="col-lg-3 mb-3">
                          <input
                            type="text"
                            className="form-control text-center"
                            id="Invoice_Date"
                            name="Invoice_Date"
                            placeholder="Invoice_Date"
                            required
                          />
                        </div>
                        <div className="col-lg-3 mb-3">
                          <input
                            type="text"
                            className="form-control text-center"
                            id="Description"
                            name="Description"
                            placeholder="Description"
                            required
                          />
                        </div>
                        <div className="col-lg-3">
                          <select
                            className="form-select"
                            name="payment_mode"
                            required
                          >
                            <option value="" disabled>
                              Payment Mode
                            </option>
                            <option value="Payment Cheque">
                              Payment Cheque
                            </option>
                            <option value="Net Banking">Net Banking</option>
                            <option value="UPI">UPI</option>
                            <option value="Cash">Cash</option>
                            {/* Add other Payment Modes as needed */}
                          </select>
                        </div>
                        {/* <div className="col-lg-2 mb-3">
                <input
                  type="number"
                  className="form-control text-center"
                  id="invoiceAdvancePayment"
                  name="advance_payment"
                  placeholder=" Advance Payment"
                  value={invoiceAdvancePayment}
                  onChange={(e) => setInvoiceAdvancePayment(e.target.value)}
                  required
                />
              </div> */}
                        <div className="col-lg-3 mb-3">
                          <input
                            type="text"
                            className="form-control text-center"
                            id="invoiceGST"
                            name="client_gst_no"
                            placeholder="Invoice GST NO."
                            required
                          />
                        </div>
                        <div className="col-lg-3 mb-3">
                          <textarea
                            type="text"
                            className="form-control text-center"
                            id="invoiceName"
                            name="invoice_address"
                            placeholder="Invoice Address"
                            required
                          />
                        </div>
                      </div>

                      <div className="row  gap-2">
                        <h6>Service </h6>

                        <div className="col-lg-2">
                          <label className="form-check-label">
                            Service Type:
                            <select
                              className="form-select"
                              name="service_type"
                              required
                            >
                              <option value="" disabled>
                                Select Service Type
                              </option>
                              <option value="Paid">Paid Service</option>
                              <option value="Complimentary">
                                Complimentary Service
                              </option>
                              {/* Add other service types as needed */}
                            </select>
                          </label>
                        </div>

                        <div className="col-lg-2">
                          <label className="form-check-label">
                            Subscription:
                            <select
                              className="form-select"
                              name="subscription_frequency"
                              required
                            >
                              <option value="" disabled>
                                Select Subscription Frequency
                              </option>
                            </select>
                          </label>
                        </div>

                        <div className="col-lg-2">
                          <label className="form-check-label">
                            Service Name:
                            <input
                              type="text"
                              className="form-control"
                              required
                            />
                            <select
                              className="form-select"
                              name="service_name"
                              required
                            >
                              <option value="" disabled>
                                Select Service Type
                              </option>

                              <option value="Other Service">
                                Other Service
                              </option>
                            </select>
                          </label>
                        </div>

                        <div className="col-lg-2">
                          <label className="form-check-label">
                            Actual Price:
                            <input
                              type="number"
                              className="form-control"
                              required
                            />
                          </label>
                        </div>
                        <div className="col-lg-2">
                          <label className="form-check-label">
                            Offer Price:
                            <input
                              type="number"
                              className="form-control"
                              required
                            />
                          </label>
                        </div>
                        <div className="col-lg-1 mt-3 mx-lg-4 mx-sm-1 p-1 ">
                          <button type="button" className="btn btn-danger  ">
                            Remove
                          </button>
                        </div>
                      </div>

                      <button type="button" className="btn btn-success mt-3">
                        Add Service
                      </button>

                      <button
                        type="submit"
                        className="btn btn-success mx-3 mt-3 "
                      >
                        Submit
                      </button>
                    </form>
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

export default AllBills;
const Container = styled.div`
  .navlink.active {
    background-color: #f53237 !important;
    border-radius: 1rem;
    color: white !important;
  }
`;
