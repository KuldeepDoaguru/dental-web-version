import React, { useEffect, useRef, useState } from 'react';
import { styled } from "styled-components";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import cogoToast from "cogo-toast";
import { useSelector } from "react-redux";
// import moment from "moment";

const PrintSecurityAmt = () => {
    const { sa_id } = useParams();
    console.log(sa_id);
    const pdfRef = useRef();
    // const { appointmentId } = useParams();
    const user = useSelector((state) => state.user);
    const { refreshTable, currentUser } = useSelector((state) => state.user);
    const branch = currentUser.branch_name;
    const [data, setData] = useState("");
    const [hospitalDoc, setHospitalDoc] = useState([]);
    const [showData, setShowData] = useState([]);
    const navigate = useNavigate();

    const displayDocHospital = async () => {
        console.log(user.id);
        try {
            const viewDoc = await axios.get(
                ` https://cghsbilling.com/api/v1/auth/displayHospitalDoc/${user.id}`
            );

            console.log(viewDoc.data);
            setHospitalDoc(viewDoc.data);
        } catch (error) {
            console.log(error);
        }
    };

    const getSecurityAmtID = async () => {
        try {
            const resps = await axios.get(`http://localhost:8888/api/doctor/getAllSecurityAmounts/${sa_id}`)
            console.log(resps.data.result);
            setShowData(resps.data.result);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        displayDocHospital();
        getSecurityAmtID();
    }, []);

    const handlePrint = () => {
        window.print();
    }
    return (
        <Container >
            <div ref={pdfRef}>
                <div className="headimage">
                    <img src={hospitalDoc?.header_img} alt="header" srcset="" />
                </div>
                <div className='container-fluid m-0 p-0'>
                    <div className='row'>
                        <div className='col-12 '>
                            <h5 className='text-center heading'>SECUIRTY AMOUNT RECIEPT</h5>
                        </div>

                    </div>
                    <div className="row">
                        <div className="col-12">
                            <table className="table table-borderless">
                                <tbody>
                                    {showData.map((data, index) => (
                                        <tbody key={index}>
                                            <tr className=''>
                                                <th className='text-start'>Appointment ID</th>
                                                <td className='text-capitalize'>{": "}{data.appointment_id}</td>
                                                <th scope="col" className='text-start'>Patient ID</th>
                                                <td className='text-capitalize'>{": "}{data.uhid}</td>
                                                <th scope="col" className='text-start'>Security Amt ID</th>
                                                <td className='text-capitalize'>{": "}{data.sa_id}</td>
                                            </tr>
                                            <tr className='mx-5'>
                                                <th scope="col" className='text-start'>Name</th>
                                                <td className='text-capitalize'>{": "}{data.patient_name}</td>
                                                <th scope="col" className='text-start pe-5'>Mobile No</th>
                                                <td className='text-capitalize'>{": "}{data.patient_number}</td>
                                                <th scope="col" className='text-start'>Branch Name</th>
                                                <td className='text-capitalize'>{": "}{data.branch_name}</td>
                                            </tr>
                                            <tr>
                                                <th scope="col" className='text-start'>Doctor Name</th>
                                                <td className='text-capitalize'>{": "}{data.assigned_doctor}</td>
                                                <th scope="col" className='text-start'> Date</th>
                                                <td className='text-capitalize'>{": "}{data.date}</td>
                                                <th scope="col" className='text-start'>Payment Status</th>
                                                <td className='text-capitalize'>{": "}{data.payment_status}</td>
                                            </tr>
                                        </tbody>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="row proc-detail" >
                        <div className="col-12">
                            <table className="table table-borderless">
                                <tbody>
                                {showData.map((data, index) => (
                                        <tbody key={index}>
                                    <tr >
                                        <th scope="col" className='' style={{ width: '30% !important' }}>
                                        </th>
                                        <th scope="col" className='text-start px-5 pt-4 second-th' >
                                            Receive Person {" "}
                                        </th>
                                        <th scope="col" className='text-end px-5 pt-4'>{data.received_by}</th>
                                    </tr>
                                    <tr>
                                        <th scope="col" className='' style={{ width: '30%' }}></th>
                                        <th scope="col" className='text-start second-th px-5'> Amount Paid {" "} INR</th>
                                        <th scope="col" className='px-5'>{data.amount}{".00"}</th>
                                    </tr>
                                    </tbody>
                                ))}
                                </tbody>
                            </table>

                        </div>
                    </div>

                </div>
                <div className='row'>
                    <div className='col-6 d-flex align-items-end '>
                        <div>
                            <h6 className='ms-5 preparedBy'>Prepared by <span className='text-uppercase'>{data?.appointment_created_by}</span></h6>
                        </div>
                    </div>

                    <div className='col-6 d-flex align-items-end gap-4'>
                        <div className="sealimg">
                            <img src={hospitalDoc?.sealimg} alt="header" srcset="" width="200px" height="150px" />
                        </div>

                        <div className="signimg">
                            <img src={hospitalDoc?.signimg} alt="header" srcset="" width="100px" height="100px" />
                        </div>

                    </div>
                </div>

                <div className="footimage">
                    <img src={hospitalDoc?.footer_img} alt="header" srcset="" />
                </div>
            </div>
            <div className='d-flex justify-content-center my-3 gap-2'>
                <button type="button" className="btn btn-primary btn-lg" onClick={handlePrint}>Print</button>
                <button type="button" className="btn btn-primary btn-lg" onClick={() => navigate('/receptionist-dashboard')}>Go to Dashboard</button>
                {/* <button
    type='button'
    className='btn btn-secondary btn-lg ms-3'
    onClick={generatePDF}
  >
    Generate PDF
  </button> */}
            </div>


        </Container>
    )
}

export default PrintSecurityAmt;

const Container = styled.div`

font-family: 'Times New Roman', Times, serif;
overflow-x: hidden;
background-color: white;

.code-column{
  
}


  .headimage {
    
    height: 18rem;
    width: auto;
    img {
      height: 100%;
      width: 100%;
    }
  }
  .footimage {
    @media print{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    }
    
    height: 60px;
    width: auto;
    img {
      height: 100%;
      width: 100%;
    }
  }
   
     .heading{
        
        border-bottom: 2px solid black;
        font-weight: 700;
        font-size: large;
        
     }
     .details-1{
        border-bottom: 2px solid black;
        
     }
     table {
    width: 100%;
    border-collapse: collapse;
    padding: 0;
    /* margin-bottom: 10px;  */
  }

  th {
    /* padding: 8px; */
    text-align: center;
    white-space: nowrap; /* Prevent text from wrapping */
    font-weight: 600;
    font-size: medium;
    color: black;
    /* letter-spacing: 1.5px; */
    padding-top: 0;
    padding-bottom: 0;
    
  }
   td {
    /* padding: 8px; */
    text-align: start;
    white-space: nowrap;
    font-weight: 600;
    font-size: medium;
    color: black;
    /* letter-spacing: 0.5px; */
    padding-top: 0;
    padding-bottom: 0;
  }
  .proc-detail{
    border-top: 2px solid black;
    
  }
  .btn-primary{
    
    @media print{

      display: none;
    }
  }
.preparedBy{
  /* font-weight: 900; */
  font-weight: bolder;
  font-size: medium;
}
.sealimg:not(img) {
  border: 0 !important;
}
.signimg:not(img) {
  border: 0 !important;
}
.second-th {
    padding-left: 30%;
    
    
}
`