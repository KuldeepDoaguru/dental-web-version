import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Header from '../../components/receptionist/Header'
import Sider from '../../components/receptionist/Sider'
import { Table, Input, Button, Form } from "react-bootstrap";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import EditPatientDetails from '../../components/receptionist/AllPatients/EditPatientDetails'
import moment from 'moment'
import MakePayment from '../../components/receptionist/SecurityAmount/MakePayment';
import cogoToast from 'cogo-toast';
import { Link, useNavigate } from "react-router-dom";
import Lottie from "react-lottie";
import animationData from "../../images/animation/loading-effect.json";


function SecurityAmount() {

  const { refreshTable, currentUser } = useSelector((state) => state.user);
  const branch = currentUser.branch_name
  const [patients, setPatients] = useState([]);
  const token = currentUser?.token;
  const [loading,setLoading] = useState(false);
  const [loadingEffect, setLoadingEffect] = useState(false);


  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  console.log(
    `User Name: ${user.name}, User ID: ${user.id}, branch: ${user.branch}`
  );
  console.log("User State:", user);
  const [patData, setPatData] = useState([]);
  const [securityList, setSecurityList] = useState([]);
  // const [refAmount, setRefAmount] = useState("");
  const [keyword, setKeyword] = useState("");
  const [showEditSecAmount, setShowEditSecAmount] = useState(false);
  const [showPaySecAmount, setShowPaySecAmount] = useState(false);
  const [outStanding, setOutStanding] = useState([]);
  const [selected, setSelected] = useState();
  // const [refAmount, setRefAmount] = useState();
  const [addSecurityAmount, setAddSecurityAmount] = useState({
    branch_name: user.branch,
    date: "",
    appointment_id: "",
    uhid: "",
    patient_name: "",
    patient_number: "",
    assigned_doctor: "",
    amount: "",
    payment_status: "",
    received_by: user.name,
  });

  const date = new Date();


  const [refund, setRefund] = useState({
    refund_date: date,
    refund_by: user.name,
    payment_status: "Refunded",
  });




  const handlePaySecChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };



  const handleInput = async (event) => {
    const { name, value } = event.target;
    if (name === "appointment_id") {
      try {
        const { data } = await axios.get(
          `http://localhost:8888/api/v1/accountant/getAppointmentDetailsViaID/${value}`
        );

        if (data) {
          setAddSecurityAmount((prevData) => ({
            ...prevData,
            uhid: data[0]?.patient_uhid,
            patient_name: data[0]?.patient_name,
            patient_number: data[0]?.mobileno,
            assigned_doctor: data[0]?.assigned_doctor_name,
            appointment_id: value,
          }));
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      // For other input fields, update the state as before
      setAddSecurityAmount((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  console.log(refund);

  // const handleInputChange = (event) => {
  //   const { name, value } = event.target;
  //   setRefund({ ...refund, [name]: value !== "" ? parseFloat(value) : "" });
  // };

  const insertSecurityAmount = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8888/api/v1/accountant/addSecurityAmount",
        addSecurityAmount
      );
      console.log(response);
      cogoToast.success("Security Amount Submitted Successfully");
    } catch (error) {
      console.log(error);
      cogoToast.success("failed to submit security amount");
    }
  };

  const getSecurityAmountList = async () => {
    setLoadingEffect(true)
    try {
      const { data } = await axios.get(
        `https://dentalgurureceptionist.doaguru.com/api/v1/receptionist/getSecurityAmountDataByBranch/${branch}`
        ,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
      }
      }
      );
      setSecurityList(data);
      setLoadingEffect(false)
    } catch (error) {
      console.log(error);
      setLoadingEffect(false)
    }
  };

  const makePaymentNow = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:8888/api/v1/accountant/updateSecurityAmount/${id}`
      );
      getSecurityAmountList();
    } catch (error) {
      console.log(error);
    }
  };

  const openSecAmountSubPopup = (id) => {
    setShowEditSecAmount(true);
    // getTotaloutstanding(id);
    setSelected(id);
    console.log(id);
  };
  const closeUpdatePopup = () => {
    setShowEditSecAmount(false);
    setShowPaySecAmount(false);
  };

  const openSecurityAmtPay = (id) => {
    setShowPaySecAmount(true);
    setSelected(id);
  };

  useEffect(() => {
    getSecurityAmountList();
  }, []);

  console.log(securityList);
  console.log(selected);
  // alert(selected);

  const filterForSecAmountDef = securityList.filter((item) => {
    return item.sa_id === selected;
  });

  console.log(filterForSecAmountDef);

  const [data, setData] = useState({
    payment_status: "success",
    payment_Mode: "",
    transaction_Id: "",
    notes: "",
    received_by: currentUser.employee_name,


  });
  console.log(data)

  const MakeRefund = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.put(
        `https://dentalgurureceptionist.doaguru.com/api/v1/receptionist/updateRefundAmount/${selected}`,
        {
          
          refund_by: currentUser.employee_name,
          payment_status: "Refunded",
          refund_amount: filterForSecAmountDef[0]?.remaining_amount,
          remaining_amount: 0,
        }
        ,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
        }
      );
      setLoading(false);
      cogoToast.success("Amount Refunded Successfully");
      getSecurityAmountList();
      closeUpdatePopup();
    } catch (error) {
      setLoading(false);
      console.log(error);
      cogoToast.error(error?.response?.data?.message || 'Something went wrong');

    }
  };



  const paySecurityCash = async (e) => {
    e.preventDefault();
    const updatedData = {
      ...data,
      remaining_amount: filterForSecAmountDef[0]?.amount
    }

    console.log(updatedData);
    try {
      setLoading(true);
      const response = await axios.put(
        `https://dentalgurureceptionist.doaguru.com/api/v1/receptionist/updatePatientSecurityAmt/${selected}`,
        updatedData   ,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
        }
      );
      setLoading(false);
      cogoToast.success("Amount Paid Successfully");
      setData({
        ...data,
        payment_Mode: "",
        transaction_Id: "",
        notes: ""

      })
      getSecurityAmountList();
      closeUpdatePopup();
    } catch (error) {
      setLoading(false);
      console.log(error);
      cogoToast.error(error?.response?.data?.message || "Something went wrong");

    }
  };

  //   const [showEditPatientPopup, setShowEditPatientPopup] = useState(false);
  //   const [selectedPatient, setSelectedPatient] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");


  //   const [showEditSecAmount, setShowEditSecAmount] = useState(false);
  //   const [outStanding, setOutStanding] = useState([]);
  //   const [selected, setSelected] = useState();
  //   const date = new Date();
  //   const [refAmount, setRefAmount] = useState("");

  //   const filterForSecAmountDef = patients.filter((item) => {
  //     return item.sa_id === selected;
  //   });





  //   const MakeRefund = async (e) => {
  //     e.preventDefault();
  //     try {
  //       const response = await axios.put(
  //         `https://dentalgurureceptionist.doaguru.com/api/v1/receptionist/updateRefundAmount/${selected}`,
  //         {
  //           refund_date: date,
  //           refund_by: currentUser.employee_name,
  //           payment_status: "Refunded",
  //           refund_amount: refAmount,
  //         }
  //       );
  //       cogoToast.success("Amount Refunded Successfully");
  //       getPatient();
  //       closeUpdatePopup();
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   const openSecAmountSubPopup = (id) => {
  //     setShowEditSecAmount(true);
  //     getTotaloutstanding(id);
  //     setSelected(id);
  //   };

  //   const closeUpdatePopup = () => {
  //     setShowEditSecAmount(false);

  //   };



  //   const getTotaloutstanding = async (id) => {
  //     console.log(id);
  //     try {
  //       const { data } = await axios.get(
  //         `https://dentalgurureceptionist.doaguru.com/api/v1/receptionist/getSecurityAmountDataBySID/${id}`
  //       );
  //       console.log(data);
  //       setOutStanding(data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   const filterForOut = outStanding?.filter((item) => {
  //     return item.payment_status !== "success";
  //   });

  //   const totalPrice = () => {
  //     try {
  //       let total = 0;
  //       filterForOut.forEach((item) => {
  //         total = total + parseFloat(item.total_amount);
  //       });
  //       console.log(total);
  //       return total;
  //     } catch (error) {
  //       console.log(error);
  //       return 0;
  //     }
  //   };

  //   const totalValue = totalPrice();



  //   const makeRefData = () => {
  //     if (outStanding.length === 0) {
  //       return filterForSecAmountDef[0]?.amount;
  //     } else {
  //       return outStanding[0]?.amount - totalValue;
  //     }
  //   };
  //   console.log(totalValue)
  //   const amtRefund = makeRefData();
  //   console.log(amtRefund);
  //   useEffect(() => {
  //     setRefAmount(amtRefund);
  //   }, [amtRefund]);

  //   const getPatient = async () =>{
  //     try{
  //       const response = await axios.get(`https://dentalgurureceptionist.doaguru.com/api/v1/receptionist/patient-securityAmt/${branch}`);
  //       console.log(response);
  //       setPatients(response?.data?.data)
  //      }
  //      catch(error){
  //         console.log(error)
  //      }

  //   }

  //   console.log(patients)

  //   useEffect(()=>{
  //     getPatient();


  //  },[refreshTable]);

  //  const handleEditPatient = (Patient)=>{
  //   setSelectedPatient(Patient);
  //   setShowEditPatientPopup(true);
  // }





  // Searching function
  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    setCurrentPage(1); // Reset to the first page when searching

    const filteredResults = securityList.filter((row) =>
      row?.patient_name.toLowerCase().includes(searchTerm.trim()) || row?.patient_number.includes(searchTerm.trim()) || row?.uhid.toLowerCase().includes(searchTerm.trim())
    );

    setFilteredData(filteredResults);
  };



  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  // Pagination functions
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = searchTerm ? filteredData.slice(indexOfFirstRow, indexOfLastRow) : securityList.slice(indexOfFirstRow, indexOfLastRow);


  const totalPages = Math.ceil(securityList.length / rowsPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(securityList.length / rowsPerPage); i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = pageNumbers?.map((number, index) => {
    // Display the first two page numbers
    if (index < 2) {
      return (
        <Button
          key={number}
          onClick={() => paginate(number)}
          className={number === currentPage ? "active" : ""}
        >
          {number}
        </Button>
      );
    }
    // Display an ellipsis for the first middle section
    else if (index === 2 && currentPage > 3) {
      return (
        <Button key={number} disabled>
          ...
        </Button>
      );
    }
    // Display the current page and the two adjacent pages
    else if (
      (index >= currentPage - 1 && index <= currentPage + 1) ||
      (index === 2 && currentPage <= 3)
    ) {
      return (
        <Button
          key={number}
          onClick={() => paginate(number)}
          className={number === currentPage ? "active" : ""}
        >
          {number}
        </Button>
      );
    }
    // Display an ellipsis for the last middle section
    else if (index === pageNumbers.length - 3 && currentPage < pageNumbers.length - 2) {
      return (
        <Button key={number} disabled>
          ...
        </Button>
      );
    }
    // Display the last two page numbers
    else if (index >= pageNumbers.length - 2) {
      return (
        <Button
          key={number}
          onClick={() => paginate(number)}
          className={number === currentPage ? "active" : ""}
        >
          {number}
        </Button>
      );
    }
    return null;
  });

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
      
    },
  };

  return (
    <Wrapper>
      <div className='header'>
        <Header />
      </div>

      <div className="row flex-nowrap ">
        <div className="col-lg-1 col-1" id='hd'>
          <Sider />
        </div>
        <div className="col-lg-11 mt-2" id='set'>
          <div className='text-center'>
            <h3>Security Amount</h3>
          </div>
          <div className="row" >
            <div className="col-lg-12" id='head'>
              <nav class="shadow rounded navbar navbar-light bg-light">
                <h6 className='mx-3 my-1 my-md-0'>Search By Patient</h6>
                <div class="container-fluid" id='cont'>
                  <div class="navbar1 " >
                    <input className="form-control me-2 rounded-5" type="search" placeholder="Enter Patient Name or Mobile or UHID" aria-label="Search" onChange={handleSearch}
                      value={searchTerm} />
                    {/* <button class="btn btn-outline-success" type="submit">Search</button> */}
                  </div>
                  <div>
                    <Form.Group
                      controlId="rowsPerPageSelect"
                      style={{ display: "flex" }}
                    >
                      <h6 className="d-flex align-items-center"> Rows Per Page :{" "}</h6>
                      <Form.Control
                        as="select"
                        value={rowsPerPage}
                        className="m-2"
                        style={{ width: "auto" }}
                        onChange={handleRowsPerPageChange}
                      >

                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                        {/* Add more options as needed */}
                      </Form.Control>
                    </Form.Group>
                  </div>
                  <div><h5>Total Patients - {securityList?.length}</h5></div>

                  {/* <div class="dropdown" id='drop'>
  
  <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
  Filter Patient by Bill Status
  </button>
  <ul class="dropdown-menu">
    <li><a class="dropdown-item" href="#">Unpaid</a></li>
    <li><a class="dropdown-item" href="#">Partially Paid</a></li>
    <li><a class="dropdown-item" href="#">Paid</a></li>
    <li><a class="dropdown-item" href="#">All</a></li>
  </ul>
</div> */}
                </div>
              </nav>
            </div>

            <div className="col-lg-12">
              <div className="widget-area-2 proclinic-box-shadow  mt-5" id='tableres'>

              {loadingEffect ? (
            
            <Lottie
                          options={defaultOptions}
                          height={300}
                          width={400}
                          style={{ background: "transparent" }}
                        ></Lottie>
          
          ) : (
                <div className="table-responsive">
                  <table className="table table-bordered table-striped">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Appointment ID</th>
                        <th>UHID</th>
                        <th>Patient Name</th>
                        <th>Patient Number</th>
                        <th>Assigned Doctor</th>
                        <th>Deposit Security Amount</th>
                        <th>Remaning Security Amount</th>
                        <th>Payment Mode</th>
                        <th>Transaction Id</th>
                        <th>Payment Date</th>
                        <th>Refund Date</th>
                        <th>Payment Status</th>
                        <th>Refund Amount</th>
                        <th>Action</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    {  currentRows?.length === 0 ? (
              <div className="no-data-container">
              <h4>No Data Found</h4>
            </div>
            ) : (
                    <tbody>
                      {currentRows?.map((item) => (
                        <>
                          <tr className="table-row">
                            <td>{item?.date ? moment(item?.date,'DD-MM-YYYYTHH:mm:ss').format('DD/MM/YYYY') : ""}</td>
                            <td>{item.appointment_id}</td>
                            <td><Link to={`/patient_profile/${item.uhid}`}>{item.uhid}</Link></td>
                            <td className="text-capitalize">{item.patient_name}</td>
                            <td>{item.patient_number}</td>
                            <td className="text-capitalize">{"Dr. "}{item.assigned_doctor}</td>
                            <td>{item.amount}</td>
                            <td>{item.remaining_amount}</td>
                            <td className="text-capitalize">{item.payment_Mode}</td>
                            <td>{item.transaction_Id}</td>
                            <td>{item.payment_date ? moment(item?.payment_date,'DD-MM-YYYYTHH:mm:ss').format("DD/MM/YYYY hh:mm A") : ""}</td>
                            <td>{item?.refund_date ? moment(item?.refund_date, 'DD-MM-YYYYTHH:mm:ss').format("DD/MM/YYYY hh:mm A") : ""}</td>
                            <td>
                              <div className="d-flex">
                                <h6 className="text-capitalize">{item.payment_status}</h6>

                              </div>
                            </td>
                            <td>{item.refund_amount}</td>
                            <td>
                              {/* {item?.remaining_amount === 0 && ( */}
                              {
                                item.payment_status === "pending" ?
                                  <>
                                    <button
                                      className="mx-2 btn btn-info"
                                      onClick={() =>
                                        openSecurityAmtPay(item.sa_id)
                                      }
                                    >
                                      Pay now
                                    </button>
                                  </>

                                  :
                                  <>
                                    <button
                                      className={`mx-2 btn btn-warning ${item.remaining_amount == 0
                                          ? "disabled"
                                          : ""
                                        } `}
                                      onClick={() =>
                                        openSecAmountSubPopup(item.sa_id)
                                      }
                                    >
                                      Make Refund
                                    </button>
                                  </>

                              }

                              {/* )} */}
                            </td>
                            <td>
                              <Link
                                to={`/print_security_amount/${item.sa_id}`}
                              >
                                {item.payment_status !== "Pending" && <button className="btn btn-success">
                                  View Reciept
                                </button>}

                              </Link>
                            </td>
                          </tr>
                        </>
                      ))}
                    </tbody>
            )}
                  </table>
                </div>
          )}
                <div className="container mt-3 mb-3">
                  <div className="row">
                    <div className="col-lg-10 col-xl-8 col-md-12 col-sm-12 col-8">  <h4
                      style={{
                        color: "black",
                        marginLeft: "5px",
                        marginRight: "5px",
                        fontSize: "1.1rem"
                      }}

                    >
                      {/* Showing Page {currentPage} of {totalPages} from {data?.length} entries */}
                      {searchTerm ? <> Showing Page {currentPage} of {totalPages} from {filteredData?.length} entries (filtered from {securityList?.length} total entries) </> : <>Showing Page {currentPage} of {totalPages} from {securityList?.length} entries</>}

                    </h4></div>
                    <div className="col-lg-3 col-md-3 col-sm-3 col-12">
                      <div className="d-flex justify-content-evenly">
                        <Button
                          onClick={() => paginate(currentPage - 1)}
                          disabled={currentPage === 1}
                          variant="warning"
                        >
                          Previous
                        </Button>
                        {renderPageNumbers}

                        <Button
                          onClick={() => paginate(currentPage + 1)}
                          disabled={indexOfLastRow >= securityList.length}
                          variant="success"
                        >
                          Next
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>




          </div>
        </div>
      </div>


      {/* pop-up for refund amount */}
      {/* pop-up for refund amount */}
      <div
        className={`popup-container${showEditSecAmount ? " active" : ""}`}
      >
        <div className="popup">
          <h4 className="text-center">Refund Amount</h4>
          <hr />
          <form className="d-flex flex-column" onSubmit={MakeRefund}>
            <div className="container">
              <div>
                <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label">
                    Security Amount Submitted -{": "}
                    {outStanding.length === 0
                      ? filterForSecAmountDef[0]?.amount
                      : outStanding[0]?.amount}
                  </label>
                </div>
                <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label">
                    {/* Total Outstanding - {totalValue} */}
                    Remaning Secuirty Amount -{": "}
                    {filterForSecAmountDef[0]?.remaining_amount}
                  </label>
                </div>
                <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label">
                    Refund Amount -:{" "}
                    {/* {outStanding.length === 0
                          ? filterForSecAmountDef[0]?.amount
                          : outStanding[0]?.amount - totalValue} */}
                    {filterForSecAmountDef[0]?.remaining_amount}
                  </label>
                  {/* <input
                        type="text"
                        class="form-control"
                        id="exampleFormControlInput1"
                        placeholder="Enter Amount"
                        name="refund_amount"
                        value={
                          outStanding.length === 0
                            ? filterForSecAmountDef[0]?.amount
                            : outStanding[0]?.amount - totalValue
                        }
                        onChange={handleInputChange}
                      /> */}
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-center">
              <button type="submit" className="btn btn-success mt-2" disabled={loading}>
                {loading ? "Loading..."  :  "Refund" }
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



      {/* pop-up for Pay security amount */}
      <div
        className={`popup-container${showPaySecAmount ? " active" : ""}`}
      >
        <div className="popup">
          <h4 className="text-center">Pay Security Amount</h4>
          <hr />
          <form className="d-flex flex-column" onSubmit={paySecurityCash}>
            <div className="container">
              <div>
                <div class="mb-3">
                  <label className="form-label" htmlFor="">
                    Payment Mode
                  </label>
                  <select
                    className="form-select"
                    id="payment_Mode"
                    name="payment_Mode"
                    value={data.payment_Mode}
                    required
                    onChange={handlePaySecChange}
                  >
                    <option value="">Select</option>
                    <option value="cash">Cash</option>
                    <option value="online">Online</option>
                  </select>
                </div>

                {data.payment_Mode === "online" && (
                  <div class="mb-3">
                    <label className="form-label" for="form6Example1">
                      Transaction Id
                    </label>
                    <input
                      type="text"
                      id="form6Example1"
                      className="form-control"
                      name="transaction_Id"
                      onChange={handlePaySecChange}
                      value={data.transaction_Id}
                      required
                    />
                  </div>
                )}

                <div class="mb-3">
                  <label className="form-label" for="form6Example1">
                    Notes
                  </label>
                  <input
                    type="text"
                    id="form6Example1"
                    className="form-control"
                    name="notes"
                    onChange={handlePaySecChange}
                    value={data.notes}
                  />
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-center">
              <button type="submit" className="btn btn-success mt-2" disabled={loading}>
                {loading ? "Loading..." : "Pay"}
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

      {/* pop-up for Pay security amount */}
      {/* ************************************************************************************* */}

    </Wrapper>
  )
}

export default SecurityAmount;
const Wrapper = styled.div`
overflow: hidden;
.navbar1{
  display: flex;
  width: 25%;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
}
#cont{
  display: flex;
  @media screen and (max-width: 768px) {
    /* flex-direction: column; */
    gap: 1rem;
  }
}
#drop{
  @media screen and (max-width: 768px) {
   width: 100%;
  }
}
#head{
  
  @media screen and (max-width: 768px) {
  width: 98%;
  /* margin-left: 1.2rem; */
  }
  @media screen and (min-width: 768px) and (max-width: 1020px) {
   margin-left: 1rem;
   
   margin: auto;
  }
  @media screen and (min-width: 1500px) and (max-width: 2000px) {
    width: 98%;
  
}
@media screen and (min-width: 2000px) and (max-width: 2500px) {
     width: 98%;
  
}
}
#hd{
  padding-top: 60px; /* Height of header */
  min-height: 100vh;
  position: fixed;
  @media screen and (max-width: 768px) {
   height: 68rem;
  }
  @media screen and (min-width: 768px) and (max-width: 1020px) {
   height: 58rem;
  }
}

#set{

margin-left: -4.5rem;
padding-left: 150px; /* Width of sidebar */
padding-top: 90px; /* Height of header */
flex-grow: 1;
overflow-y: auto;

@media screen and (max-width: 768px) {
  margin-left: -2rem;
}
@media screen and (min-width: 768px) and (max-width : 1020px) {
  margin-left: -2rem;
}
@media screen and (min-width: 1020px) and (max-width: 1500px) {
  margin-left: -2rem;
  
}
@media screen and (min-width: 1500px) and (max-width: 1700px) {
  margin-left: -1.9rem;
  
}
@media screen and (min-width: 1700px) and (max-width: 2000px) {
  margin-left: -1rem;
  
}

  @media screen and (min-width: 2000px) and (max-width: 2500px) {
   margin-left: 0rem;
    
  }
}
#tableres{
  @media screen and (max-width: 768px) {
    width: auto;
    margin: auto;
   
  }
  @media screen and (min-width: 768px) and (max-width: 1020px) {
    width: auto;
   margin: auto;
  }
  @media screen and (min-width: 1500px) and (max-width: 2000px) {
     width: 98%;
  
}
@media screen and (min-width: 2000px) and (max-width: 2500px) {
     width: 98%;
  
}
  
}
th{
  background-color: teal;
  color: white;
  white-space: nowrap;
  
}
td{
  white-space: nowrap;
}

.popup-container {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    overflow: scroll;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    align-items: center;
    justify-content: center;
  }

  .popup-container.active {
    display: flex;
    background-color: #00000075;
    z-index: 200;
  }

  .popup {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    height: auto;
    width: auto;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    
  }
  .header{
  position: fixed;
  min-width: 100%;
  z-index: 100;
}
.table-responsive {
  position: relative;
  min-height: 10rem;
}

.loading-container,
.no-data-container {
  display: flex;
  justify-content: center;
  align-items: end;
  height: 100px; /* Adjust as necessary */
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

.no-data-container h4 {
  margin: 0;
}
`
