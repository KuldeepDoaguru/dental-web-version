import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import Sider from "../../components/Sider";
import { Dropdown, Nav } from "react-bootstrap";
// import BillTypeData from "../../components/superAdmin/BillType/BillTypeData";
import HospitalPurchaseBills from "../../components/superAdmin/BillType/HospitalPurchaseBills";
import PatientsBills from "../../components/superAdmin/BillType/PatientsBills";
import BranchSelector from "../../components/BranchSelector";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import cogoToast from "cogo-toast";
// import "bootstrap/dist/css/bootstrap.min.css";

const AllBills = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  console.log(`User Name: ${user.name}, User ID: ${user.id}`);
  console.log("User State:", user);
  const branch = useSelector((state) => state.branch);
  console.log(`User Name: ${branch.name}`);
  const [listBills, setListBills] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedItem, setSelectedItem] = useState();
  const [popupVisible, setPopupVisible] = useState(false);
  const [placehold, setPlacehold] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [upData, setUpData] = useState({
    bill_date: "",
    uhid: "",
    branch_name: branch.name,
    patient_name: "",
    patient_mobile: "",
    patient_email: "",
    treatment: "",
    treatment_status: "",
    drugs_quantity: "",
    total_amount: "",
    paid_amount: "",
    payment_status: "",
    payment_date_time: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUpData({ ...upData, [name]: value });
  };

  const openUpdatePopup = (id) => {
    setSelectedItem(id);
    setShowPopup(true);
  };

  const closeUpdatePopup = () => {
    setShowPopup(false);
  };

  const getBillDetailsList = async () => {
    try {
      const { data } = await axios.get(
        `https://dentalgurusuperadmin.doaguru.com/api/v1/super-admin/getBillsByBranch/${branch.name}`
      );
      console.log(data);
      setListBills(data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteBillData = async (id) => {
    try {
      const response = await axios.delete(
        `https://dentalgurusuperadmin.doaguru.com/api/v1/super-admin/deleteBills/${id}`
      );
      console.log(response);
      cogoToast.success("Appointment Deleted Successfully");
      getBillDetailsList();
    } catch (error) {
      console.log(error);
    }
  };

  const getBillDetailsByBid = async () => {
    try {
      const { data } = await axios.get(
        `https://dentalgurusuperadmin.doaguru.com/api/v1/super-admin/getBillBYBillId/${selectedItem}`
      );
      setPlacehold(data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateBillDetails = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `https://dentalgurusuperadmin.doaguru.com/api/v1/super-admin/updateBillDetailsByBillId/${selectedItem}`,
        upData
      );
      console.log(response);
      getBillDetailsList();
      cogoToast.success("bill details updated successfully");
      closeUpdatePopup();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBillDetailsList();
  }, [branch.name]);

  useEffect(() => {
    getBillDetailsByBid();
  }, [selectedItem]);

  console.log(listBills);
  console.log(selectedItem);
  console.log(placehold);

  console.log(upData);

  const todayDate = new Date();

  // Get year, month, and date
  const year = todayDate.getFullYear();
  const month = String(todayDate.getMonth() + 1).padStart(2, "0"); // Adding 1 to adjust month, padStart ensures 2 digits
  const date = String(todayDate.getDate()).padStart(2, "0"); // Ensuring 2 digits

  // Format as 'YYYY-MM-DD'
  const formattedDate = `${year}-${month}-${date}`;

  console.log(formattedDate.slice(0, 7));

  // const filterBillDataByMonth = listBills?.filter((item) => {
  //   return (
  //     item.bill_date.split("T")[0].slice(0, 7) === formattedDate.slice(0, 7)
  //   );
  // });

  // console.log(filterBillDataByMonth);

  const totalPages = Math.ceil(listBills.length / itemsPerPage);

  const filterBillDataByMonth = () => {
    // Filter and paginate appointment data based on currentPage and itemsPerPage
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return listBills
      .filter(
        (item) =>
          item.bill_date.split("T")[0].slice(0, 7) === formattedDate.slice(0, 7)
      )
      .slice(startIndex, endIndex);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <li key={i}>
          <button
            className="btn btn-secondary"
            onClick={() => handlePageChange(i)}
          >
            {i}
          </button>
        </li>
      );
    }
    return buttons;
  };
  return (
    <>
      <Container>
        <Header />
        <div className="main">
          <div className="container-fluid">
            <div className="row flex-nowrap ">
              <div className="col-lg-1 col-md-1 col-1 p-0">
                <Sider />
              </div>
              <div className="col-lg-11 col-md-11 col-11 ps-0">
                <div className="container-fluid mt-3">
                  <div className="d-flex justify-content-between mx-2">
                    <BranchSelector />
                  </div>
                </div>
                <div className="container-fluid mt-3">
                  <h3 className="text-center">Bill List</h3>
                  <hr />
                  <div className="container-fluid mt-3">
                    {filterBillDataByMonth?.length > 0 ? (
                      <>
                        <div class="table-responsive rounded">
                          <table class="table table-bordered rounded shadow">
                            <thead className="table-head">
                              <tr>
                                <th className="table-sno">Bill ID</th>
                                <th>Bill Date</th>
                                <th className="table-small">Patient UHID</th>
                                <th className="table-small">Patient Name</th>
                                <th className="table-small">Patient Mobile</th>
                                <th className="table-small">Patient Email</th>
                                <th className="table-small">Treatment</th>
                                <th className="table-small">
                                  Treatment Status
                                </th>
                                <th className="table-small">
                                  Drugs with Quantity
                                </th>
                                <th className="table-small">Total Amount</th>
                                <th>Paid Amount</th>
                                <th>Payment Status</th>
                                <th>Payment Date & Time</th>
                                <th>Edit Details</th>
                                <th className="table-small">Delete</th>
                              </tr>
                            </thead>
                            <tbody>
                              {filterBillDataByMonth()?.map((item) => (
                                <>
                                  <tr className="table-row">
                                    <td className="table-sno">
                                      {item.bill_id}
                                    </td>
                                    <td className="table-small">
                                      {item.bill_date?.split("T")[0]}
                                    </td>
                                    <td className="table-small">{item.uhid}</td>
                                    <td className="table-small">
                                      {item.patient_name}
                                    </td>
                                    <td>{item.patient_mobile}</td>
                                    <td>{item.patient_email}</td>
                                    <td>{item.treatment}</td>
                                    <td>{item.treatment_status}</td>
                                    <td>{item.drugs_quantity}</td>
                                    <td className="table-small">
                                      {item.total_amount}
                                    </td>
                                    <td className="table-small">
                                      {item.paid_amount}
                                    </td>
                                    <td>{item.payment_status}</td>
                                    <td>{item.payment_date_time}</td>
                                    <td className="table-small">
                                      <button
                                        className="btn btn-warning fw-bold"
                                        onClick={() =>
                                          openUpdatePopup(item.bill_id)
                                        }
                                      >
                                        Edit
                                      </button>
                                    </td>
                                    <td className="table-small">
                                      <button
                                        className="btn btn-danger"
                                        onClick={() =>
                                          deleteBillData(item.bill_id)
                                        }
                                      >
                                        Delete
                                      </button>
                                    </td>
                                  </tr>
                                </>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        <div className="pagination">
                          <ul>
                            <li>
                              <button
                                onClick={() =>
                                  handlePageChange(currentPage - 1)
                                }
                                disabled={currentPage === 1}
                                className="btn btn-danger"
                              >
                                Previous
                              </button>
                            </li>
                            {renderPaginationButtons()}
                            <li>
                              <button
                                onClick={() =>
                                  handlePageChange(currentPage + 1)
                                }
                                disabled={currentPage === totalPages}
                                className="btn btn-info"
                              >
                                Next
                              </button>
                            </li>
                          </ul>
                        </div>
                      </>
                    ) : (
                      <>
                        <h1>No Bill Found</h1>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ********************************************************************************************* */}
        {/* pop-up for creating notice */}
        <div className={`popup-container${showPopup ? " active" : ""}`}>
          <div className="popup">
            <h2 className="text-center">Update Branch Details</h2>
            <hr />
            <form className="d-flex flex-column" onSubmit={updateBillDetails}>
              <div className="container">
                <div className="row">
                  <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                    <div className="mb-3">
                      <label for="exampleInputEmail1" class="form-label">
                        Bill Date
                      </label>
                      <input
                        type="date"
                        class="form-control"
                        placeholder="branch name"
                        value={upData.bill_date}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                    <div className="mb-3">
                      <label for="exampleInputEmail1" class="form-label">
                        Patient UHID
                      </label>
                      <input
                        placeholder={placehold[0]?.uhid}
                        class="form-control"
                        name="uhid"
                        value={upData.uhid}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                    <div className="mb-3">
                      <label for="exampleInputEmail1" class="form-label">
                        Patient Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder={placehold[0]?.patient_name}
                        name="patient_name"
                        value={upData.patient_name}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                    <div className="mb-3">
                      <label for="exampleInputEmail1" class="form-label">
                        Patient Mobile
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder={placehold[0]?.patient_mobile}
                        name="patient_mobile"
                        value={upData.patient_mobile}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                    <div className="mb-3">
                      <label for="exampleInputEmail1" class="form-label">
                        Patient Email
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder={placehold[0]?.patient_email}
                        name="patient_email"
                        value={upData.patient_email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                    <div className="mb-3">
                      <label for="exampleInputEmail1" class="form-label">
                        Treatment
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder={placehold[0]?.treatment}
                        name="treatment"
                        value={upData.treatment}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                    <div className="mb-3">
                      <label for="exampleInputEmail1" class="form-label">
                        Treatment Status
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder={placehold[0]?.treatment_status}
                        name="treatment_status"
                        value={upData.treatment_status}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                    <div className="mb-3">
                      <label for="exampleInputEmail1" class="form-label">
                        Drugs with Quantity
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder={placehold[0]?.drugs_quantity}
                        name="drugs_quantity"
                        value={upData.drugs_quantity}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                    <div className="mb-3">
                      <label for="exampleInputEmail1" class="form-label">
                        Total Amount
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder={placehold[0]?.total_amount}
                        name="total_amount"
                        value={upData.total_amount}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                    <div className="mb-3">
                      <label for="exampleInputEmail1" class="form-label">
                        Paid Amount
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder={placehold[0]?.paid_amount}
                        name="paid_amount"
                        value={upData.paid_amount}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                    <div className="mb-3">
                      <label for="exampleInputEmail1" class="form-label">
                        Payment Status
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder={placehold[0]?.payment_status}
                        name="payment_status"
                        value={upData.payment_status}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                    <div className="mb-3">
                      <label for="exampleInputEmail1" class="form-label">
                        Pending Amount
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder={placehold[0]?.pending_amount}
                        name="pending_amount"
                        value={upData.pending_amount}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                    <div className="mb-3">
                      <label for="exampleInputEmail1" class="form-label">
                        Payment Date & Time
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder={placehold[0]?.payment_date_time}
                        name="payment_date_time"
                        value={upData.payment_date_time}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="container d-flex justify-content-start">
                <button type="submit" className="btn btn-success mt-2">
                  update
                </button>
                <button
                  type="button"
                  className="btn btn-danger mt-2 mx-2"
                  onClick={closeUpdatePopup}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* popup for updating notice */}
        {/* ******************************************************************************************** */}
      </Container>
    </>
  );
};

export default AllBills;
const Container = styled.div`
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

  .navlink.active {
    background-color: #f53237 !important;
    border-radius: 1rem;
    color: white !important;
  }

  th {
    background-color: #004aad;
    color: white;
  }

  .select-style {
    border: none;
    background-color: #22a6b3;
    font-weight: bold;
    color: white;
  }

  .pagination {
    display: flex;
    justify-content: flex-end;
    ul {
      display: flex;
      justify-content: space-between;
      gap: 15px;
      li {
        list-style: none;
      }
    }
  }
`;
