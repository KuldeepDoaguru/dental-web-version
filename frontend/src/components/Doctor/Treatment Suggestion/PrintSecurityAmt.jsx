import React, { useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import cogoToast from "cogo-toast";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../../redux/user/userSlice";

const PrintSecurityAmt = () => {
  const { sa_id } = useParams();
  console.log(sa_id);
  const pdfRef = useRef();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const token = user.currentUser.token;
  const branch = currentUser.branch_name;
  const [data, setData] = useState("");
  const [hospitalDoc, setHospitalDoc] = useState([]);
  const [showData, setShowData] = useState([]);
  const navigate = useNavigate();
  console.log(branch);
  //   const [appointId, setAppointId] = useState("");
  //   const [patientId, setPatientId] = useState("");
  //   const [securityAmtId, setSecurityAmtId] = useState("");
  //   const [patientName, setPatientName] = useState("");
  //   const [mobile, setMobile] = useState("");
  //   const [branchName, setBranchName] = useState("");
  //   const [doctorName, setDoctorName] = useState("");
  //   const [date, setDate] = useState("");
  //   const [paymentStatus, setPaymentStatus] = useState("");

  const displayDocHospital = async () => {
    console.log(user.id);
    try {
      const viewDoc = await axios.get(
        ` https://dentalgurudoctor.doaguru.com/api/doctor/getBranchDetails/${branch}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(viewDoc.data);
      setHospitalDoc(viewDoc.data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(hospitalDoc);

  useEffect(() => {
    const getSecurityAmtID = async () => {
      try {
        const resps = await axios.get(
          `https://dentalgurudoctor.doaguru.com/api/doctor/getAllSecurityAmounts/${sa_id}/${branch}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(resps.data.result);
        setShowData(resps.data.result);
        if (resps.status === 200) {
          const { data } = resps;
          console.log(data.result);
          //   setAppointId(data.result[0].appointment_id);
          //   setPatientId(data.result[0].uhid);
          //   setSecurityAmtId(data.result[0].sa_id);
          //   setPatientName(data.result[0].patient_name);
          //   setMobile(data.result[0].patient_number);
          //   setBranchName(data.result[0].branch_name);
          //   setDoctorName(data.result[0].assigned_doctor);
          //   setDate(data.result[0].date);
          //   setPaymentStatus(data.result[0].payment_status);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getSecurityAmtID();
  }, [sa_id]);

  useEffect(() => {
    displayDocHospital();
  }, []);

  const handlePrint = () => {
    window.print();
  };
  return (
    <Container>
      <div ref={pdfRef}>
        <div className="headimage">
          <img src={hospitalDoc[0]?.head_img} alt="header" />
        </div>
        <div className="container-fluid m-0 p-0">
          <div className="row">
            <div className="col-12 ">
              <h5 className="text-center heading">SECUIRTY AMOUNT RECIEPT</h5>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <table className="table table-borderless">
                <tbody>
                  <tr className="">
                    <th className="text-start">Appointment ID</th>
                    <td className="text-capitalize">
                      {": "}
                      {showData[0]?.appointment_id}
                    </td>
                    <th scope="col" className="text-start">
                      Patient ID
                    </th>
                    <td className="text-capitalize">
                      {": "}
                      {showData[0]?.uhid}
                    </td>
                    <th scope="col" className="text-start">
                      TPID
                    </th>
                    <td className="text-capitalize">
                      {": "}
                      {showData[0]?.tp_id}
                    </td>
                  </tr>
                  <tr className="mx-5">
                    <th scope="col" className="text-start">
                      Name
                    </th>
                    <td className="text-capitalize">
                      {": "}
                      {showData[0]?.patient_name}
                    </td>
                    <th scope="col" className="text-start pe-5">
                      Mobile No
                    </th>
                    <td className="text-capitalize">
                      {": "}
                      {showData[0]?.patient_number}
                    </td>
                    <th scope="col" className="text-start">
                      Branch Name
                    </th>
                    <td className="text-capitalize">
                      {": "}
                      {showData[0]?.branch_name}
                    </td>
                  </tr>
                  <tr>
                    <th scope="col" className="text-start">
                      Doctor Name
                    </th>
                    <td className="text-capitalize">
                      {": "}
                      {showData[0]?.assigned_doctor}
                    </td>
                    <th scope="col" className="text-start">
                      {" "}
                      Date
                    </th>
                    <td className="text-capitalize">
                      {": "}
                      {showData[0]?.payment_date}
                    </td>
                    <th scope="col" className="text-start">
                      Payment Type
                    </th>
                    <td className="text-capitalize">
                      {": "}
                      {showData[0]?.payment_Mode}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* <div className="row proc-detail" >
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
                    </div> */}
          <div className="row proc-detail">
            <div className="col-12">
              <table className="table table-borderless">
                <tbody>
                  <tr>
                    <th
                      scope="col"
                      className=""
                      style={{ width: "30% !important" }}
                    ></th>

                    <th scope="col" className="text-start pt-4 second-th">
                      Payable Amount INR
                    </th>

                    <th scope="col" className="text-end pe-4 pt-4">
                      {" "}
                      {showData[0]?.amount}
                      {".00"}
                    </th>
                  </tr>
                  <tr>
                    <th scope="col" className="" style={{ width: "30%" }}></th>
                    <th scope="col" className="text-start second-th">
                      {" "}
                      Amount Paid INR
                    </th>

                    <th scope="col" className="text-end pe-4">
                      {showData[0]?.amount}
                      {".00"}
                    </th>
                  </tr>

                  {/* <tr>
                  <th scope="col" className='' style={{ width: '30%' }}></th>
                  <th scope="col" className='text-start second-th'>Net Payable {" "}INR</th>
                  
                  <th scope="col" className='text-end pe-4'>{totalAmount}{".00"}</th>
                   </tr> */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-6 d-flex align-items-end ">
            <div>
              <h6 className="ms-5 preparedBy">
                Prepared by :{" "}
                <span className="text-uppercase">
                  {showData[0]?.assigned_doctor}
                </span>
              </h6>
            </div>
          </div>

          {/* <div className="col-6 d-flex align-items-end gap-4">
            <div className="sealimg">
              <img
                src={hospitalDoc?.sealimg}
                alt="header"
                srcset=""
                width="200px"
                height="150px"
              />
            </div>

            <div className="signimg">
              <img
                src={hospitalDoc?.signimg}
                alt="header"
                srcset=""
                width="100px"
                height="100px"
              />
            </div>
          </div> */}
        </div>

        <div className="footimage">
          <img src={hospitalDoc[0]?.foot_img} alt="header" srcset="" />
        </div>
      </div>
      <div className="d-flex justify-content-center my-3 gap-2">
        <button
          type="button"
          className="btn btn-primary btn-lg text-white shadow"
          style={{
            backgroundColor: "#0dcaf0",
            border: "#0dcaf0",
          }}
          onClick={handlePrint}
        >
          Print
        </button>
        <button
          type="button"
          className="btn btn-primary btn-lg text-white shadow"
          style={{
            backgroundColor: "#0dcaf0",
            border: "#0dcaf0",
          }}
          onClick={() => window.history.back()}
        >
          Go to Back
        </button>
        {/* <button
    type='button'
    className='btn btn-secondary btn-lg ms-3'
    onClick={generatePDF}
  >
    Generate PDF
  </button> */}
      </div>
    </Container>
  );
};

export default PrintSecurityAmt;

const Container = styled.div`
  font-family: "Times New Roman", Times, serif;
  overflow-x: hidden;
  background-color: white;

  .code-column {
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
    @media print {
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

  .heading {
    border-bottom: 2px solid black;
    font-weight: 700;
    font-size: large;
  }
  .details-1 {
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
  .proc-detail {
    border-top: 2px solid black;
  }
  .btn-primary {
    @media print {
      display: none;
    }
  }
  .preparedBy {
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
`;
