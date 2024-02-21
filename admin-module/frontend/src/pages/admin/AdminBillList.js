import React, { useState } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import Sider from "../../components/Sider";
import { Dropdown, Nav } from "react-bootstrap";
// import BillTypeData from "../../components/superAdmin/BillType/BillTypeData";
import HospitalPurchaseBills from "../../components/superAdmin/BillType/HospitalPurchaseBills";
import PatientsBills from "../../components/superAdmin/BillType/PatientsBills";
import HeaderAdmin from "./HeaderAdmin";
import SiderAdmin from "./SiderAdmin";

const AdminBillList = () => {
  const [showEditBillList, setShowEditBillList] = useState(false);

  const openEditBillListPopup = (index, item) => {
    // setSelectedItem(item);
    console.log("open pop up");
    setShowEditBillList(true);
  };

  const closeUpdatePopup = () => {
    setShowEditBillList(false);
  };

  return (
    <>
      <Container>
        <HeaderAdmin />
        <div className="main">
          <div className="container-fluid">
            <div className="row flex-nowrap ">
              <div className="col-lg-1 col-1 p-0">
                <SiderAdmin />
              </div>
              <div className="col-lg-11 col-11 ps-0">
                <div className="container-fluid mt-3">
                  <h3 className="text-center">Bill List</h3>
                  <div className="container-fluid mt-3">
                    <div class="table-responsive rounded">
                      <table class="table table-bordered rounded shadow">
                        <thead className="table-head">
                          <tr>
                            <th className="table-sno">SN</th>
                            <th>Bill Date</th>
                            <th className="table-small">Patient UHID</th>
                            <th className="table-small">Patient Name</th>
                            <th className="table-small">Patient Mobile</th>
                            <th className="table-small">Patient Email</th>
                            <th className="table-small">Treatment</th>
                            <th className="table-small">Drugs with Quantity</th>
                            <th className="table-small">Total Amount</th>
                            <th>Paid Amount</th>
                            <th>Payment Status</th>
                            <th>Payment Date & Time</th>
                            <th
                              className="table-small"
                              onClick={openEditBillListPopup}
                            >
                              Edit
                            </th>
                            <th className="table-small">Print</th>
                            <th className="table-small">Delete</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="table-row">
                            <td className="table-sno">1</td>
                            <td className="table-small">12/12/2024</td>
                            <td className="table-small">007</td>
                            <td className="table-small">Shubham patel</td>
                            <td>+918602161019</td>
                            <td>shubham@gmail.com</td>
                            <td>2 injections</td>
                            <td>5</td>
                            <td className="table-small">1000</td>
                            <td className="table-small">1000</td>
                            <td>Completed</td>
                            <td>12/12/2024 12:00PM</td>
                            <td className="table-small">
                              <button
                                className="btn btn-info"
                                onClick={openEditBillListPopup}
                              >
                                Edit
                              </button>
                            </td>
                            <td className="table-small">
                              <button className="btn btn-warning">Print</button>
                            </td>
                            <td className="table-small">
                              <button className="btn btn-danger">Delete</button>
                            </td>
                          </tr>
                          <tr className="table-row">
                            <td className="table-sno">1</td>
                            <td className="table-small">12/12/2024</td>
                            <td className="table-small">007</td>
                            <td className="table-small">Shubham patel</td>
                            <td>+918602161019</td>
                            <td>shubham@gmail.com</td>
                            <td>2 injections</td>
                            <td>5</td>
                            <td className="table-small">1000</td>
                            <td className="table-small">1000</td>
                            <td>Completed</td>
                            <td>12/12/2024 12:00PM</td>
                            <td className="table-small">
                              <button
                                className="btn btn-info"
                                onClick={openEditBillListPopup}
                              >
                                Edit
                              </button>
                            </td>
                            <td className="table-small">
                              <button className="btn btn-warning">Print</button>
                            </td>
                            <td className="table-small">
                              <button className="btn btn-danger">Delete</button>
                            </td>
                          </tr>
                          <tr className="table-row">
                            <td className="table-sno">1</td>
                            <td className="table-small">12/12/2024</td>
                            <td className="table-small">007</td>
                            <td className="table-small">Shubham patel</td>
                            <td>+918602161019</td>
                            <td>shubham@gmail.com</td>
                            <td>2 injections</td>
                            <td>5</td>
                            <td className="table-small">1000</td>
                            <td className="table-small">1000</td>
                            <td>Completed</td>
                            <td>12/12/2024 12:00PM</td>
                            <td className="table-small">
                              <button
                                className="btn btn-info"
                                onClick={openEditBillListPopup}
                              >
                                Edit
                              </button>
                            </td>
                            <td className="table-small">
                              <button className="btn btn-warning">Print</button>
                            </td>
                            <td className="table-small">
                              <button className="btn btn-danger">Delete</button>
                            </td>
                          </tr>
                          <tr className="table-row">
                            <td className="table-sno">1</td>
                            <td className="table-small">12/12/2024</td>
                            <td className="table-small">007</td>
                            <td className="table-small">Shubham patel</td>
                            <td>+918602161019</td>
                            <td>shubham@gmail.com</td>
                            <td>2 injections</td>
                            <td>5</td>
                            <td className="table-small">1000</td>
                            <td className="table-small">1000</td>
                            <td>Completed</td>
                            <td>12/12/2024 12:00PM</td>
                            <td className="table-small">
                              <button
                                className="btn btn-info"
                                onClick={openEditBillListPopup}
                              >
                                Edit
                              </button>
                            </td>
                            <td className="table-small">
                              <button className="btn btn-warning">Print</button>
                            </td>
                            <td className="table-small">
                              <button className="btn btn-danger">Delete</button>
                            </td>
                          </tr>
                          <tr className="table-row">
                            <td className="table-sno">1</td>
                            <td className="table-small">12/12/2024</td>
                            <td className="table-small">007</td>
                            <td className="table-small">Shubham patel</td>
                            <td>+918602161019</td>
                            <td>shubham@gmail.com</td>
                            <td>2 injections</td>
                            <td>5</td>
                            <td className="table-small">1000</td>
                            <td className="table-small">1000</td>
                            <td>Completed</td>
                            <td>12/12/2024 12:00PM</td>
                            <td className="table-small">
                              <button
                                className="btn btn-info"
                                onClick={openEditBillListPopup}
                              >
                                Edit
                              </button>
                            </td>
                            <td className="table-small">
                              <button className="btn btn-warning">Print</button>
                            </td>
                            <td className="table-small">
                              <button className="btn btn-danger">Delete</button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* ******************************************************************************************** */}
          {/* pop-up for edit bills */}
          <div
            className={`popup-container${showEditBillList ? " active" : ""}`}
          >
            <div className="popup">
              <h4 className="text-center">Edit Bill Details</h4>
              <form
                className="form-group"
                // onSubmit={handleNoticeSubmit}
              >
                <div className="form-group">
                  <div className="d-flex">
                    <div className="input-group">
                      <label htmlFor="" className="fw-bold">
                        Bill Date
                      </label>
                      <input
                        type="date"
                        placeholder="Lab Name"
                        className="rounded p-2 w-100"
                        // value={noticeData.linkURL}
                        // onChange={(e) =>
                        //   setNoticeData({
                        //     ...noticeData,
                        //     linkURL: e.target.value,
                        //   })
                        // }
                      />
                    </div>
                    <div className="input-group mx-2">
                      <label htmlFor="" className="fw-bold">
                        Patient UHID
                      </label>
                      <input
                        type="text"
                        placeholder="Patient UHID"
                        className="rounded p-2 w-100"
                      />
                    </div>
                  </div>
                  <div className="d-flex mt-2">
                    <div className="input-group">
                      <label htmlFor="" className="fw-bold">
                        Patient Name
                      </label>
                      <input
                        type="text"
                        placeholder="Patient Name"
                        className="rounded p-2 w-100"
                        // value={noticeData.linkURL}
                        // onChange={(e) =>
                        //   setNoticeData({
                        //     ...noticeData,
                        //     linkURL: e.target.value,
                        //   })
                        // }
                      />
                    </div>
                    <div className="input-group mx-2">
                      <label htmlFor="" className="fw-bold">
                        Patient Mobile
                      </label>
                      <input
                        type="text"
                        placeholder="Patient Mobile"
                        className="rounded p-2 w-100"
                        maxLength={10}
                        // value={noticeData.linkURL}
                        // onChange={(e) =>
                        //   setNoticeData({
                        //     ...noticeData,
                        //     linkURL: e.target.value,
                        //   })
                        // }
                      />
                    </div>
                  </div>
                  <div className="d-flex mt-2">
                    <div className="input-group">
                      <label htmlFor="" className="fw-bold">
                        Patient Email
                      </label>
                      <input
                        type="email"
                        placeholder="Patient email"
                        className="rounded p-2 w-100"
                        // value={noticeData.linkURL}
                        // onChange={(e) =>
                        //   setNoticeData({
                        //     ...noticeData,
                        //     linkURL: e.target.value,
                        //   })
                        // }
                      />
                    </div>
                    <div className="input-group mx-2">
                      <label htmlFor="" className="fw-bold">
                        Treatment
                      </label>
                      <select name="" id="" className="rounded p-2 w-100">
                        <option value="">2 Injection</option>
                        <option value="">4 Injection</option>
                      </select>
                    </div>
                  </div>
                  <div className="d-flex mt-2">
                    <div className="input-group">
                      <label htmlFor="" className="fw-bold">
                        Drugs with Quantity
                      </label>
                      <input
                        type="text"
                        placeholder="Drugs with Quantity"
                        className="rounded p-2 w-100"
                        // value={noticeData.linkURL}
                        // onChange={(e) =>
                        //   setNoticeData({
                        //     ...noticeData,
                        //     linkURL: e.target.value,
                        //   })
                        // }
                      />
                    </div>
                    <div className="input-group mx-2">
                      <label htmlFor="" className="fw-bold">
                        Total Amount
                      </label>
                      <input
                        type="text"
                        placeholder="Total Amount"
                        className="rounded p-2 w-100"
                        // value={noticeData.linkURL}
                        // onChange={(e) =>
                        //   setNoticeData({
                        //     ...noticeData,
                        //     linkURL: e.target.value,
                        //   })
                        // }
                      />
                    </div>
                  </div>
                  <div className="d-flex mt-2">
                    <div className="input-group">
                      <label htmlFor="" className="fw-bold">
                        Paid Amount
                      </label>
                      <input
                        type="text"
                        placeholder="Paid Amount"
                        className="rounded p-2 w-100"
                        // value={noticeData.linkURL}
                        // onChange={(e) =>
                        //   setNoticeData({
                        //     ...noticeData,
                        //     linkURL: e.target.value,
                        //   })
                        // }
                      />
                    </div>
                    <div className="input-group mx-2">
                      <label htmlFor="" className="fw-bold">
                        Payment Status
                      </label>
                      <input
                        type="text"
                        placeholder="Payment Status"
                        className="rounded p-2 w-100"
                        // value={noticeData.linkURL}
                        // onChange={(e) =>
                        //   setNoticeData({
                        //     ...noticeData,
                        //     linkURL: e.target.value,
                        //   })
                        // }
                      />
                    </div>
                  </div>
                  <div className="d-flex mt-2">
                    <div className="input-group">
                      <label htmlFor="" className="fw-bold">
                        Payment Date and Time
                      </label>
                      <input
                        type="text"
                        placeholder="Payment Date and Time"
                        className="rounded p-2 w-100"
                        // value={noticeData.linkURL}
                        // onChange={(e) =>
                        //   setNoticeData({
                        //     ...noticeData,
                        //     linkURL: e.target.value,
                        //   })
                        // }
                      />
                    </div>
                  </div>
                </div>

                <div className="d-flex justify-content-evenly">
                  <button type="submit" className="btn btn-success mt-2">
                    Save
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger mt-2"
                    onClick={closeUpdatePopup}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* pop-up for edit Bills */}
          {/* ************************************************************************************* */}
        </div>
      </Container>
    </>
  );
};

export default AdminBillList;
const Container = styled.div`
  .navlink.active {
    background-color: #f53237 !important;
    border-radius: 1rem;
    color: white !important;
  }

  th {
    background-color: #1abc9c;
    color: #000;
  }

  .select-style {
    border: none;
    background-color: #22a6b3;
    font-weight: bold;
    color: white;
  }

  .popup-container {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    align-items: center;
    justify-content: center;
  }

  .popup-container.active {
    display: flex;
    background-color: #00000075;
  }

  .popup {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
`;
