import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "../../components/MainComponents/Header";
import Sider from "../../components/MainComponents/Sider";
import { IoArrowBackSharp } from "react-icons/io5";

import ReportCardPage from "./ReportCardPage";
import axios from "axios";
import moment  from 'moment';
import { Button } from 'react-bootstrap';
import { useSelector } from "react-redux";

const equipmentList = [
  {
    id: 1,
    idx: "1",
    name: "Pragya",
    testperform: "Allergy Test",
    status: "Pending",
    CallectionDate: ["18/04/2024"],
    TestedDate: ["20/04/2024"],
    ReportDate: ["22/04/2024"],
  },
  {
    id: 2,
    idx: "2",
    name: "Vinay Dhariya",
    testperform: "CBC Test",
    status: "Completed",
    CallectionDate: ["20/04/2024"],
    TestedDate: ["21/04/2024"],
    ReportDate: ["22/04/2024"],
  },

  {
    id: 3,
    idx: "3",
    name: "Sourabh Mishra",
    testperform: "Allergy Test",
    status: "process",
    CallectionDate: ["20/04/2024"],
    TestedDate: ["21/04/2024"],
    ReportDate: ["22/04/2024"],
  },
  {
    id: 4,
    idx: "4",
    name: "Shubhanshu JAiswal",
    testperform: "Bitewing X-rays",
    status: "Pending",
    CallectionDate: ["20/04/2024"],
    TestedDate: ["21/04/2024"],
    ReportDate: ["22/04/2024"],
  },
];


const AllTests = ({ data }) => {

  const [patientDetails, setPatientDetails] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
    const [dateFilter, setDateFilter] = useState('');
    
 
    const currentUser = useSelector(state => state.auth.user);
  
    const token = currentUser?.token;
  

    useEffect(() => {
      const fetchPatientDetails = async () => {
        try {
          const response = await axios.get(
            `https://dentalgurulab.doaguru.com/api/lab/get-patient-details`
            ,{
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
            });
          setPatientDetails(response.data.result);
        } catch (error) {
          console.error("Error fetching patient details:", error);
        }
      };
  
      fetchPatientDetails();
    }, []);

    const filteredPatients = patientDetails.filter(patient => {
       const fullName = `${patient.patient_name}`.toLowerCase();
      const formattedDate = moment(patient.created_date).format("YYYY-MM-DD");
      return fullName.includes(searchQuery.toLowerCase()) && (!dateFilter || formattedDate === dateFilter);
    });


  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/BloodTest/${id}`);
  };

  const goBack = () => {
    window.history.go(-1);
  };
 
  // ***********This for Excel sheet**********
  const exportToExcel = () => {
    const csvRows = [];
    const table = document.querySelector(".table");

    if (!table) {
      console.error("Table element not found");
      return;
    }

    table.querySelectorAll("tr").forEach((row) => {
      const rowData = [];
      row.querySelectorAll("td, th").forEach((cell) => {
        rowData.push(cell.innerText);
      });
      csvRows.push(rowData.join(","));
    });

    const csvContent = csvRows.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "table_data.csv";
    link.click();
    window.URL.revokeObjectURL(link.href);
  };
  const [sorted, setSorted] = useState(equipmentList);
  const [inp, setInp] = useState("");

  const handleSearch = () => {
    let newArr = sorted.filter((patient) => {
      let searchWork = inp.toLowerCase();
      for (let prop in patient) {
        let word = patient[prop].toString().toLowerCase();
        if (word.includes(searchWork)) {
          return true;
        }
      }
      return false;
    });
    setSorted(newArr);
  };

  const handleSort = () => {
    let newArr = [...sorted].sort((a, b) => {
      let nameA = a.name.toLowerCase();
      let nameB = b.name.toLowerCase();
      if (nameA < nameB) {
        return -1;
      } else if (nameA > nameB) {
        return 1;
      } else {
        return 0;
      }
    });
    setSorted(newArr);
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
              <div className="col-xxl-11 col-xl-11 col-lg-11 col-md-11 col-sm-11 p-0 mx-3" style={{marginTop:"5rem"}}>
              <IoArrowBackSharp
            className="fs-1 text-black d-print-none"
            onClick={goBack}
            style={{ cursor: "pointer" }}
          />
       <ReportCardPage/>

                

                <div className="container-fluid">
                  {/* <div className="row mt-4">
                    <div className="d-flex justify-content-between">
                      <div>
                        <h2 className="mt-4 "> All Reports </h2>
                      </div>
                      <div>
                        {" "}
                        <th className="d-flex gap-2">
                          <input
                            className="rounded"
                            onChange={(e) => setInp(e.target.value)}
                            value={inp}
                          />
                          <button
                            type="button"
                            class="btn btn1 text-light"
                            onClick={handleSearch}
                          >
                            search
                          </button>
                          <button
                            type="button"
                            class="btn btn1 text-light py-2 px-4"
                            onClick={handleSort}
                          >
                            sort
                          </button>
                        </th>
                      </div>
                    </div>

                    <table
                      id="dataTable"
                      border="1"
                      className="table table-bordered shadow text-center mt-4"
                    >
                      <thead className="table-primary  rounded">
                        <tr>
                          <th scope="col" style={{ width: "5%" }}>
                            Sr.
                          </th>
                          <th
                            scope="col"
                            style={{ width: "25%" }}
                            onClick={handleSort}
                          >
                            Name
                          </th>

                          <th scope="col" style={{ width: "20%" }}>
                            Test perform
                          </th>
                          <th scope="col" style={{ width: "20%" }}>
                            Status
                          </th>

                          <th scope="col" style={{ width: "10%" }}>
                            Callection Date
                          </th>
                          <th scope="col" style={{ width: "10%" }}>
                            Tested Date
                          </th>
                          <th scope="col" style={{ width: "10%" }}>
                            Report Date
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {sorted.map((patient, index) => (
                          <tr
                            className="custom-cursor-pointer"
                            key={patient.id}
                            onClick={() => handleClick(patient.id)}
                          >
                            <td>{index + 1}</td>
                            <td>{patient.name}</td>
                            <td>{patient.testperform}</td>
                            <td>{patient.status}</td>
                            <td>{patient.CallectionDate}</td>
                            <td>{patient.TestedDate}</td>
                            <td>{patient.ReportDate}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div> */}
                  <div className="container-fluid mt-4">
        <h2 style={{color:"#213555"}}>List of All Test</h2>
        <div className="mb-3">
        <div className="row">
          <div className="col-lg-2">
          <input
            type="text"
            placeholder="Search by Patient Name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="form-control mb-lg-0  mb-md-2"
          />
          </div>
          <div className="col-lg-2">
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="form-control"
          />
          </div>
        </div>
         
        
        </div>
        <div className="" style={{ maxHeight: "700px", overflow: "auto" }}>

        {filteredPatients.length === 0 ? (
        <div className='mb-2 fs-4 fw-bold text-center'>No tests available</div>
        ) : (
          <>
             <table className="table table-bordered">
            <thead>
              <tr>
                <th>S.no</th>
                <th>Patient UHID </th>
                <th>Patient Name </th>
                <th> Age </th>
                <th> Gender </th>
                <th>Branch Name </th>
                <th>Assigned Doctor Name</th>
                <th>Lab Name</th>
                <th>Created Date</th>
                <th>Tests Name </th>
                <th>Tests Status </th>
           
              </tr>
            </thead>
       

<tbody>

  {filteredPatients.map((patient, index) => (
    <>
     
      <tr key={patient.testid}>
        <td>{index + 1}</td>
        <td>{patient.patient_uhid}</td>
        <td>{patient.patient_name}</td>
        <td>{patient.age}</td>
        <td>{patient.gender}</td>
        <td>{patient.branch_name}</td>

        <td>{patient.assigned_doctor_name}</td>
        <td>{patient.lab_name}</td>
        <td>{moment(patient.created_date).format("DD/MM/YYYY")}</td>
        <td>{patient.test}</td>
        {patient.test_status === "done" && (
       <td className=" text-success fw-bold"> 
          {patient.test_status}
         
          </td>
       
        )}
       
        {patient.test_status === "pending" && (
       <td className=" text-danger fw-bold"> 
      {patient.test_status}
   
      </td>
       
        )}
       
    
        
      </tr>
  
    </>
    // Wrap the entire row inside a conditional statement based on test status
  
  ))}
</tbody>


          </table>
          </>

        )}
       
        </div>
      </div>


                  

                  <div className="d-flex justify-content-center">
                    <div>
                      <exportToExcel />
                      <button
                        type="button"
                        class="btn btn1 text-light py-2 px-4 mb-3 mt-3"
                        onClick={exportToExcel}
                      >
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default AllTests;

const Wrapper = styled.div`
  ul {
    text-align: left;
  }
  li {
    list-style: none;
  }

  .maintainceList {
    transform: translateX(20%);
  }
  

  .clinik {
    height: 100px;
    border: 1px solid #0000000f;
    background-color: #00ffff26;
  }
  .boxes-container {
    display: flex;
    gap: 30px;
    justify-content: center;
    padding: 20px 10px;
  }
  .boxes {
    width: 160px;
    height: 100px;
    background-color: #b7787840;
  }

  .card {
    background: #213555;
    height: 9.5rem;
    border: none;
    box-shadow: 1px 2px 8px black;
    &:hover {
      background: #264679;
    }
  }

  .icon {
    font-size: 40px;
    color: white;
  }
  .card-body {
    text-align: center;
    padding: 5px;
  }
  .card-link {
    text-decoration: none;
    font-size: small;
  }

  .cardtext {
    h5 {
      color: white;
    }
    p {
      color: white;
    }
  }
  .report-date-column {
    width: 30%;
  }
  .custom-cursor-pointer {
    cursor: pointer;
  }
  .btn1 {
    background-color: #213555;
  }
  th{
  background-color: #213555;
    color: white;
}
`;
