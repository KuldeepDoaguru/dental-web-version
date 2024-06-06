import axios from "axios";
import cogoToast from "cogo-toast";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ReactPaginate from "react-paginate";
import moment from "moment";
import animationData from "../animation/loading-effect.json";
import Lottie from "react-lottie";

const TreatBills = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  
  const branch = user.branch_name;
 
  const [loading, setLoading] = useState(false);
  const [listBills, setListBills] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedItem, setSelectedItem] = useState();
  const [popupVisible, setPopupVisible] = useState(false);
  const [placehold, setPlacehold] = useState([]);
  const [keyword, setkeyword] = useState("");
  // const [currentPage, setCurrentPage] = useState(1);
  // const [itemsPerPage] = useState(10);

  const [currentPage, setCurrentPage] = useState(0); // Start from the first page
  
  const [upData, setUpData] = useState({
    bill_date: "",
    uhid: "",
    branch_name: branch,
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
    setLoading(true);
    try {
      const { data } = await axios.get(
        `https://dentalguruadmin.doaguru.com/api/v1/admin/getTreatSuggest/${branch}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setLoading(false);
      console.log(data);
      setListBills(data);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  console.log(listBills);

  const deleteBillData = async (id) => {
    try {
      const response = await axios.delete(
        `https://dentalguruadmin.doaguru.com/api/v1/admin/deleteBills/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log(response);
      cogoToast.success("Appointment Deleted Successfully");
      getBillDetailsList();
    } catch (error) {
      console.log(error);
    }
  };

  const getBillDetailsByBid = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `https://dentalguruadmin.doaguru.com/api/v1/admin/getBillBYBillId/${selectedItem}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setLoading(false);
      setPlacehold(data);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const updateBillDetails = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `https://dentalguruadmin.doaguru.com/api/v1/admin/updateBillDetailsByBillId/${selectedItem}`,
        upData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
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
  }, [branch]);

  useEffect(() => {
    getBillDetailsByBid();
  }, [selectedItem]);

  console.log(listBills[0]?.payment_date_time);
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

  useEffect(() => {
    setCurrentPage(0);
  }, [keyword]);

  const searchFilter = listBills.filter((lab) =>
    lab.patient_name.toLowerCase().includes(keyword.toLowerCase())
  );
  const billPerPage = 10;
  const totalPages = Math.ceil(searchFilter.length / billPerPage);

  const filterAppointDataByMonth = () => {
    const startIndex = currentPage * billPerPage;
    const endIndex = startIndex + billPerPage;
    return searchFilter?.slice(startIndex, endIndex);
  };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };


  const displayedAppointments = filterAppointDataByMonth();
  return (
    <>
      <Container>
        <div className="d-flex justify-content-between">
          <div>
            {/* <label>Patient Name :</label> */}
            <input
              type="text"
              placeholder="Search Patient Name"
              className=""
              value={keyword}
              onChange={(e) => setkeyword(e.target.value.toLowerCase())}
            />
          </div>
          <div>
            {/* <button
                        className="btn btn-success"
                        // onClick={() => openAddEmployeePopup()}
                      >
                        Add Employee
                      </button> */}
          </div>
        </div>
        {loading ? (
            <Lottie options={defaultOptions} height={300} width={400}></Lottie>
          ) : (
            <>
            {displayedAppointments?.length > 0 ? (
              <>
  

                <div class="table-responsive rounded mt-4">
                  <table class="table table-bordered rounded shadow">
                    <thead className="table-head">
                      <tr>
                        <th className="table-sno">Bill ID</th>
                        <th>Bill Date</th>
                        <th className="table-small">Patient UHID</th>
                        <th className="table-small">Treatment Package ID</th>
                        <th className="table-small">Patient Name</th>
                        <th className="table-small">Patient Mobile</th>
                        <th className="table-small">Patient Email</th>
                        <th className="table-small">Total Amount</th>
                        <th>Paid Amount</th>
                        <th>Payment Status</th>
                        <th>Payment Date</th>
                        <th>Pending Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {displayedAppointments?.map((item) => (
                        <>
                          <tr className="table-row">
                            <td className="table-sno">{item.bill_id}</td>
                            <td className="table-small">
                              {item.bill_date?.split("T")[0]}
                            </td>
                            <td className="table-small">
                              <Link
                                to={`/patient-profile/${item.uhid}`}
                                style={{ textDecoration: "none" }}
                              >
                                {item.uhid}
                              </Link>
                            </td>
                            <td className="table-small">{item.tp_id}</td>
                            <td className="table-small">{item.patient_name}</td>
                            <td>{item.patient_mobile}</td>
                            <td>{item.patient_email}</td>
                            <td className="table-small">{item.total_amount}</td>
                            <td className="table-small">{item.paid_amount}</td>
                            <td>{item.payment_status}</td>
                            <td>{item?.payment_date_time}</td>
                            <td>
                              <td>{item.total_amount - item.paid_amount}</td>
                            </td>
                          </tr>
                        </>
                      ))}
                    </tbody>
                  </table>
                </div>
                <PaginationContainer>
                  <ReactPaginate
                    previousLabel={"previous"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    pageCount={totalPages}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageChange}
                    containerClassName={"pagination"}
                    activeClassName={"active"}
                  />
                </PaginationContainer>
                {/* <div className="pagination">
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
                        </div> */}
                       
              </>
            ) : (
              <>
                <h1>No Bill Found</h1>
              </>
            )}
  </>
          )}
            
        

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

export default TreatBills;
const Container = styled.div``;

const PaginationContainer = styled.div`
  .pagination {
    display: flex;
    justify-content: center;
    padding: 10px;
    list-style: none;
    border-radius: 5px;
  }

  .pagination li {
    margin: 0 5px;
  }

  .pagination li a {
    display: block;
    padding: 8px 16px;
    border: 1px solid black;
    color: #007bff;
    cursor: pointer;
    text-decoration: none;
  }

  .pagination li.active a {
    background-color: #007bff;
    color: white;
    border: 1px solid #007bff;
  }

  .pagination li.disabled a {
    color: #ddd;
    cursor: not-allowed;
  }

  .pagination li a:hover:not(.active) {
    background-color: #ddd;
  }
`;