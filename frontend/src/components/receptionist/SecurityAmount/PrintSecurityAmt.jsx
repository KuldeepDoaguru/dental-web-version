import React, { useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import cogoToast from "cogo-toast";
import { useSelector } from "react-redux";
import moment from "moment";

const PrintSecurityAmt = () => {
  const pdfRef = useRef();
  const { SId } = useParams();
  const user = useSelector((state) => state.user);

  const { refreshTable, currentUser } = useSelector((state) => state.user);
  const branch = currentUser.branch_name;
  const token = currentUser?.token;
  const [getBranch, setGetBranch] = useState([]);

  const [data, setData] = useState("");

  const navigate = useNavigate();

  const getBranchDetails = async () => {
    try {
      const { data } = await axios.get(
        `https://dentalgurureceptionist.doaguru.com/api/v1/receptionist/getBranchDetailsByBranch/${branch}`
      );
      console.log(data);
      setGetBranch(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getBill = async () => {
    try {
      const response = await axios.get(
        `https://dentalgurureceptionist.doaguru.com/api/v1/receptionist/getSinglePatientSecurityAmt/${branch}/${SId}`
        ,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
        }
      );
      console.log(response?.data?.data);
      setData(response?.data?.data);
    } catch (error) {
      console.log(error);
      cogoToast.error("error in getting appointment");
    }
  };

  useEffect(() => {
    getBill();
    getBranchDetails();
  }, []);

  console.log(data);

  const handlePrint = () => {
    window.print();
  };

  return (
    <Container>
      <div ref={pdfRef}>
        <div className="headimage">
          <img src={getBranch[0]?.head_img} alt="header" srcset="" />
        </div>
        <div className="container-fluid mt-2 p-0">
          <div className="row">
            <div className="col-12 ">
              <h4 className="text-center heading">SECURITY AMOUNT RECIEPT</h4>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <table className="table table-borderless">
                <tbody>
                  <tr>
                    <th className="text-start">Appointment Id</th>
                    <td className="text-capitalize">
                      {": "}
                      {data[0]?.appointment_id}
                    </td>

                    <th scope="col" className="text-start">
                      Patient id
                    </th>
                    <td className="text-capitalize">
                      {": "}
                      {data[0]?.uhid}
                    </td>

                    <th scope="col" className="text-start">
                      Branch Name
                    </th>
                    <td className="text-capitalize">
                      {": "}
                      {data[0]?.branch_name}
                    </td>
                  </tr>
                  <tr>
                    <th scope="col" className="text-start">
                      Name
                    </th>
                    <td className="text-capitalize">
                      {": "}
                      {data[0]?.patient_name}
                    </td>
                    <th scope="col" className="text-start pe-5">
                      Mobile No
                    </th>
                    <td className="text-capitalize">
                      {": "}
                      {data[0]?.patient_number}
                    </td>
                  </tr>
                  <tr></tr>
                  <tr>
                    <th scope="col" className="text-start">
                      Doctor Name
                    </th>
                    <td className="text-capitalize">
                      {": "}
                      {data[0]?.assigned_doctor}
                    </td>
                    <th scope="col" className="text-start">
                      Payment Date
                    </th>
                    <td className="text-capitalize">
                      {": "}
                      {data[0]?.payment_date
                        ? moment(data?.created_at).format("DD/MM/YYYY")
                        : ""}
                    </td>
                    <th scope="col" className="text-start">
                      Payment Mode
                    </th>
                    <td className="text-capitalize">
                      {": "}
                      {data[0]?.payment_Mode}
                    </td>
                  </tr>
                  <tr>
                    {data.payment_Mode == "online" && (
                      <>
                        <th scope="col" className="text-start">
                          Transaction Id
                        </th>
                        <td className="text-capitalize">
                          {": "}
                          {data[0]?.transaction_Id}
                        </td>{" "}
                      </>
                    )}
                  </tr>
                  <tr></tr>
                </tbody>
              </table>
            </div>
          </div>

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
                      {data[0]?.amount}
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
                      {data[0]?.amount}
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
                Prepared by :
                <span className="text-uppercase">{data[0]?.received_by}</span>
              </h6>
            </div>
          </div>

          {/* <div className='col-6 d-flex align-items-end gap-4'>
          <div className="sealimg">
            <img src={hospitalDoc?.sealimg} alt="header" srcset="" width="200px" height="150px"/>
          </div>

          <div className="signimg">
            <img src={hospitalDoc?.signimg} alt="header" srcset="" width="100px" height="100px"/>
          </div>

        </div> */}
        </div>

        <div className="footimage">
          <img src={getBranch[0]?.foot_img} alt="footer" srcset="" />
        </div>
      </div>
      <div className="d-flex justify-content-center my-3 gap-2">
        <button
          type="button"
          className="btn btn-primary btn-lg"
          onClick={handlePrint}
        >
          Print
        </button>
        <button
          type="button"
          className="btn btn-primary btn-lg"
          onClick={() => window.history.go(-1)}
         
        >
          Back
        </button>
        <button
          type="button"
          className="btn btn-primary btn-lg"
          onClick={() => navigate("/receptionist-dashboard")}
        >
          Go to Dashboard
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
