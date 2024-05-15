import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { IoArrowBackSharp } from "react-icons/io5";
import Sider from "../../components/MainComponents/Sider";
import Header from "../../components/MainComponents/Header";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import moment from 'moment';
import signature from "../../Pages/BloodTestExternal/signature_maker_after_.webp";
import cogoToast  from 'cogo-toast';
import { useSelector } from "react-redux";



const PaymentTest = () => {
  const [patienttest, setPatienttest] = useState('');
  const [patientcost, setPatientcost] = useState(0); // Initialize as number instead of array
  const [patientbill_no, setPatientbill_no] = useState('');
  const [patientUHID, setPatientUHID] = useState('');
  const [patientName, setPatientName] = useState('');
  const [patientcreateddate, setPatientcreateddate] = useState('');
  const [labName, setLabName] = useState('');
  const [labtestpaymentstatus, setLabtestpaymentstatus] = useState('done');
  const [patientAssigned_Doctor_Name, setPatientAssigned_Doctor_Name] = useState("");
  const [paymentStatus, setPaymentStatus] = useState('pending');
  const [isPaid, setIsPaid] = useState(false);

  const userName = useSelector(state => state.auth.user);
  const goBack = () => {
    window.history.go(-1);
  };
   
  const currentUser = useSelector(state => state.auth.user);
  
  const token = currentUser?.token;


  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state && location.state.test) {
      const { test } = location.state;
      setPatienttest(test);
    }
  }, [location.state]);

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const response = await axios.get(`https://dentalgurulab.doaguru.com/api/lab/get-patient-details-by-id/${id}`,{
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
        });
        const data = response.data[0];
        setPatientbill_no(data.testid);
        setPatientUHID(data.patient_uhid);
        setPatientName(data.patient_name);
        setPatientcreateddate(data.created_date);
        setLabName(data.lab_name);
        setPatientAssigned_Doctor_Name(data.assigned_doctor_name);
      } catch (error) {
        console.error("Error fetching patient details:", error);
      }
    };

    const fetchPatientTestCost = async () => {
      try {
        const response = await axios.post(`https://dentalgurulab.doaguru.com/api/lab/get-patient-test-cost`, {
          test_name: patienttest
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }}
        );
        setPatientcost(response.data.test_cost);
      } catch (error) {
        console.error("Error fetching patient test cost:", error);
      }
    };

    fetchPatientDetails();
    fetchPatientTestCost();
  }, [id, patienttest]);

  // const handlePayButtonClick = async () => {
  //   try {
  //     const response = await axios.post(`https://dentalgurulab.doaguru.com/api/lab/patient-test-payment/${id}`, {
  //       patient_uhid: patientUHID,
  //       patient_name: patientName,
  //       payment: patientcost,
  //       payment_status: labtestpaymentstatus,
  //     });
  //     window.print();
  //     navigate(`/oral-testing/${id}`, { state: { test: patienttest } });
  //     cogoToast.success('Successfully Paid Amount');
  //   } catch (error) {
  //     console.error('Server Error:', error.message);
  //   }
  // };

  const handlePayButtonClick = async () => {
    try {
      const response = await axios.post(`https://dentalgurulab.doaguru.com/api/lab/patient-test-payment/${id}`, {
        patient_uhid: patientUHID,
        patient_name: patientName,
        payment: patientcost,
        payment_status: labtestpaymentstatus,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
      }});
      // If payment is successful
      cogoToast.success('Successfully Paid Amount');
      setPaymentStatus('paid');
      setIsPaid(true);
    } catch (error) {
      console.error('Server Error:', error.message);
    }
  };



  return (
    <>
      <Wrapper>
        <Header />
        <div className="main">
          <div className="container-fluid">
            <div className="row flex-nowrap ">
              <div className="col-xxl-1 col-xl-1 col-lg-1 col-md-1 col-sm-1 p-0">
                <Sider />
              </div>
              <div className="col-xxl-11 col-xl-11 col-lg-11 col-md-11 col-sm-11 p-0" style={{marginTop:"5rem"}}> 
                <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 ">
                  <IoArrowBackSharp
                    className="fs-1 mt-2 text-black d-print-none"
                    onClick={goBack}
                  />{" "}
                </div>

                <div className="d-flex justify-content-center mt-4">
                  <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6 ">
                    <div className="d-flex justify-content-start ms-lg-5 ms-md-1">
                      <div>
                        <h5>Branch : Madan Mahal</h5>

                        <form className="d-flex ">
                          <p>Address </p>
                          <p>: 128,Near Gwarighat Jabalpur M.P.</p>
                        </form>
                      </div>
                    </div>
                  </div>

                  <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6">
                    <div className="d-flex justify-content-end me-lg-5 me-md-1">
                      <div>
                        <form className="d-flex">
                          <h5>Email id : </h5>
                          <h5 className="ms-2">DentalGuru@Gmail.com</h5>
                        </form>

                        <form className="d-flex ">
                          <h5>Contact Number : </h5>
                          <h5>+91-7000000058 </h5>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="d-flex justify-content-center">
                  <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6 rounded mt-4">
                    <div className="d-flex justify-content-start ms-lg-5 ms-md-1">
                      <div>
                        <h4>PATIENT SUMMARY </h4>

                        <div className="d-flex ">
                          <h6>Patient Name </h6>
                          <h6 className="ms-1">:- {patientName} </h6>
                        </div>

                        <div className="d-flex">
                          <h6>Patient UHID </h6>
                          <h6 className="ms-1"> :- {patientUHID} </h6>
                        </div>

                        <div className="d-flex ">
                          <h6> Invoice Number </h6>
                          <h6 className="ms-1"> : {patientbill_no} </h6>
                        </div>

                        <div className="d-flex">
                          <h6> Invoice Date </h6>
                          <h6 className="ms-1">:- {moment(patientcreateddate).format("DD/MM/YYYY")} </h6>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6">
                    <div class=" rounded d-flex justify-content-end mt-5 me-lg-5 me-md-1">
                      <div class="card" style={{ width: "18rem" }}>
                        <div className="ms-4 mt-2">
                          <h1> ₹ {patientcost}</h1>
                          <h5 className="text-success ms-4">
                            Patient Amount {paymentStatus}
                          </h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
                  <form className="d-flex justify-content-center mt-4">
                    <h2> Payment Description</h2>
                  </form>
                  <hr className="mt-5" />
                </div>

                <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 ">
                  <div className="d-flex justify-content-center mt-4">
                    <div className="col-xxl-9 col-xl-9 col-lg-9 col-md-11 col-sm-11">
                      <table class="table table-bordered shadow">
                        <thead class="table-primary  rounded">
                          <tr>
                            <th scope="col" style={{ width: "10%" }}>
                              Date
                            </th>
                            <th scope="col" style={{ width: "40%" }}>
                              Test Name
                            </th>

                            <th scope="col" style={{ width: "20%" }}>
                              Amount
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope="row">{moment(patientcreateddate).format("DD/MM/YYYY")}</th>
                            <td>{patienttest}</td>
                            <td>{patientcost}</td>
                          </tr>
                        </tbody>
                      </table>

               
                    </div>
                  </div>
                </div>
                <div className="">
                  <div className="row  mt-5">
                  <div className="d-flex justify-content-between">
                      <div className="col-lg-4 form-group">
                        <div className="text-center">
                          <img
                            src={signature}
                            style={{ width: "100px", height: "50px" }}
                            alt="Today's Image"
                          />
                        </div>
                        <h4 className=" text-center fs-5 fw-bold">
                        {userName.employee_name}
                        </h4>
                        <h6 className=" text-center">LAB ATTENDANT</h6>
                      </div>

                      <div className="col-lg-4 form-group">
                        <div className="text-center">
                          <img
                            src={signature}
                            style={{ width: "100px", height: "50px" }}
                            alt="Today's Image"
                          />
                        </div>
                        <h4 className=" text-center fs-5 fw-bold">
                          {patientAssigned_Doctor_Name}
                        </h4>
                        <h6 className=" text-center">ASSIGNED BY DOCTOR</h6>
                      </div>
                    </div>
                  </div>
                </div>

              
                    <h4 className="text-center ">Thank you </h4>
              

{/*                
        <div className="text-center">

        <button
                      class="btn text-light text-capitalize px-4"
                      style={{ backgroundColor: "#213555" }}
                      onClick={handlePayButtonClick}
                    >
                      PAY
                    </button>
              </div> */}

<div className="text-center">
        {paymentStatus === 'pending' && (
          <button
            className="btn text-light text-capitalize px-4 btn-print"
            style={{ backgroundColor: "#213555" }}
            onClick={handlePayButtonClick}
            disabled={isPaid} // Disable button if payment is already made
          >
            PAY
          </button>
        )}
        {paymentStatus === 'paid' && (
          <>
            <button
              className="btn text-light text-capitalize px-4 mx-2 btn-print"
              style={{ backgroundColor: "#213555" }}
              onClick={() => window.print()}
            >
              Print
            </button>
            <button
              className="btn text-light text-capitalize px-4 btn-print"
              style={{ backgroundColor: "#213555" }}
              onClick={() => navigate(`/oral-testing/${id}`, { state: { test: patienttest , cost: patientcost} })}
            >
              Go Test
            </button>
          </>
        )}
      </div>
    
                
              </div>
              
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default PaymentTest;

const Wrapper = styled.div`
  .space {
    margin-right: 23.4rem;
  }
  .spaces {
    margin-right: 45rem;
  }
  @media print {
    .btn-print {
      display: none;
    }
  }
`;
