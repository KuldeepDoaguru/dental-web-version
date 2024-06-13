import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../MainComponents/Header";
import Sider from "../MainComponents/Sider";
import moment from "moment";
import { Link } from "react-router-dom";
import { IoArrowBackSharp } from "react-icons/io5";
import { useSelector } from "react-redux";

import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form } from 'react-bootstrap';
import styled from "styled-components";


function FinalOral_Blood_Test() {
  const [patientbill_no, setPatientbill_no] = useState("");
  const [patientUHID, setPatientUHID] = useState("");
  const [patientName, setPatientName] = useState("");
  const [patientage, setPatientage] = useState("");
  const [patientgender, setPatientgender] = useState("");
  const [patientbranch_name, setPatientbranch_name] = useState("");
  const [patientAssigned_Doctor_Name, setPatientAssigned_Doctor_Name] =
    useState("");
  const [patienttest, setPatienttest] = useState("");
  const [patientresult, setPatientresult] = useState("");
  const [patientunit, setPatientunit] = useState("");
  const [patientcost, setPatientcost] = useState("");
  const [patientcollection_date, setPatientcollection_date] = useState("");
  const [patientauthenticate_date, setPatientauthenticate_date] = useState("");
  const [labName, setLabName] = useState("");
  const [filetest, setFiletest] = useState("");
  const [patienttid , setPatienttid] = useState('')
  const [showModal, setShowModal] = useState(false); 
  const [message, setMessage] = useState("");
  const currentUser = useSelector(state => state.auth.user);
  
  const token = currentUser?.token;
  const branch = currentUser.branch_name
  const address = currentUser.address
  
  const { id } = useParams();
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();
  const goBack = () => {
    window.history.go(-1);
  };
  const handleTopPageLink = () => {
    window.scrollTo(0, 0);
  };


  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const response = await axios.get(
          `https://dentalgurulab.doaguru.com/api/lab/get-patient-details-by-id/${id}`,
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
          }}
        );
        setPatientbill_no(response.data[0].testid);
        setPatientUHID(response.data[0].patient_uhid);
        setPatientName(response.data[0].patient_name);
        setPatientage(response.data[0].age);
        setPatientgender(response.data[0].gender);
        setPatientbranch_name(response.data[0].branch_name);
        setPatientAssigned_Doctor_Name(response.data[0].assigned_doctor_name);
        setLabName(response.data[0].lab_name);
        setPatienttid(response.data[0].tpid);
       
      } catch (error) {
        console.error("Error fetching patient details:", error);
      }
    };

    fetchPatientDetails();
  }, []);


    const fetchPatientTestDetails = async () => {
      try {
        const response = await axios.get(
          `https://dentalgurulab.doaguru.com/api/lab/get-patient-test-details-by-id/${id}`,
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
          }}
        );
        setPatienttest(response.data[0].test);
        setPatientresult(response.data[0].result);
        setPatientunit(response.data[0].unit);
        setPatientcost(response.data[0].cost);
        setPatientcollection_date(response.data[0].collection_date);
        setPatientauthenticate_date(response.data[0].authenticate_date);
        setFiletest(response.data[0].file_path);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching patient details:", error);
      }
    };

    useEffect(() => {
      fetchPatientTestDetails();
    }, []);

    
  

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get(
          `https://dentalgurulab.doaguru.com/api/lab/getpatienttest-notes/${id}`,
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
          }}
        );

        if (response.status === 200) {
          setNotes(response.data);
        }
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };
    fetchNotes();
  }, []);

  const handleDelete = async (id) => {
    // Display a confirmation dialog
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this patient detail?"
    );

    if (isConfirmed) {
      try {
        const response = await axios.delete(
          `https://dentalgurulab.doaguru.com/api/lab/patent-details/${id}`,
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
          }}
        );

        if (response.status === 200) {
          console.log("Patient Lab detail deleted successfully");
          navigate("/");
        }
      } catch (error) {
        console.error("Error deleting Patient Lab detail:", error);
      }
    }
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () =>{ setShowModal(false);
  fetchPatientTestDetails();
  }
 const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.put(
        `https://dentalgurulab.doaguru.com/api/lab/update-patent-test/${id}`,
        {
         
          result: patientresult,
          unit: patientunit,
         
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );
      if (response.status === 200) {
        setMessage(response.data.message);
        
        fetchPatientTestDetails();
       
      } else {
        setMessage(response.data.error || "Failed to update Patient test data");
      }
    } catch (error) {
      console.error("Error updating Patient test data", error);
    }

    setShowModal(false);
  };





  const handlePrintPage = () => {
    navigate(`/print-oral-testing/${patientbill_no}`);
    handleTopPageLink();
  };

  const handleAddNotes = () => {
    navigate(`/create-patient-notes/${id}`);
  };
  const handleDeleteNotes = () => {
    navigate(`/delete-patient-notes/${id}`);
  };
  const handleEditNotes = () => {
    navigate(`/edit-patient-notes/${id}`);
    
  };


  const parsedCollection_Date = moment(patientcollection_date);

// Add one day to the parsed date
const adjustedCollection_Date = parsedCollection_Date.add(1, 'days');

// Format the adjusted date as a string in the desired format (YYYY-MM-DD)
const formattedAdjustedCollection_Date = adjustedCollection_Date.format('DD-MM-YYYY');
 

const parsedAuthenticate_Date = moment(patientauthenticate_date);

// Add one day to the parsed date
const adjustedAuthenticate_Date = parsedAuthenticate_Date.add(1, 'days');

// Format the adjusted date as a string in the desired format (YYYY-MM-DD)
const formattedAdjustedAuthenticate_Date = adjustedAuthenticate_Date.format('DD-MM-YYYY');

console.log(filetest);
const handleViewPDF = () => {
  if (!filetest) {
    console.error("PDF file path is empty");
    return;
  }

  const newTab = window.open(filetest, "_blank");
  if (!newTab) {
    console.error("Failed to open PDF in a new tab. Please check popup blocker settings.");
  }
};

  return (
    <Wrapper>
      <div className="d-print-none">
        <Header />
      </div>
    

      <div clasNameName="main">
          <div className="container-fluid">
          <div className="row flex-nowrap ">
        <div className="col-xxl-1 col-xl-1 col-lg-1 d-print-none col-sm-1 p-0">
          <Sider />
        </div>
        <div className="col-xxl-11 col-xl-11 col-lg-11 col-md-12 col-sm-12 p-0 resp " style={{marginTop:"5rem"}}>
        <IoArrowBackSharp
            className="fs-1 text-black d-print-none mx-4"
            onClick={goBack}
            style={{ cursor: "pointer" }}
          />

          <div className="mx-5">
            <div className="row">
              <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
                <div className="row d-flex justify-content-between">
                  <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-8 col-sm-6 mt-4">
                  <div>
                            <h5>Branch : {branch}</h5>
                          </div>
                          <form className="d-flex fw-semibold">
                            <p>Address </p>
                            <p className="ms-1"> : </p>
                            <p className="ms-2">
                             {address}
                            </p>
                          </form>

                    <form className="d-flex">
                      <h5>Email id : </h5>
                      <h5 className="ms-2">DentalGuru@Gmail.com</h5>
                    </form>

                    <form className="d-flex ms-auto my-sm mt-1">
                      <h5>Contact Number : </h5>
                      <h5 className="ms-2">+91-7000000058 </h5>
                    </form>
                  </div>

                  <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-4 col-sm-6 mt-4">
                    {/* <div className="text-center mt-2 footer ">
                      <img
                        className="ms-4"
                        src="https://res.cloudinary.com/dq5upuxm8/image/upload/v1707404036/dental%20guru/dentalguru_v1g7k0.png"
                        alt="Logo"
                        width="100"
                        height="85"
                      />
                      <h3 className="ms-2">Dental Guru</h3>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
            <hr
              style={{
                color: "Grey",
                height: "2px",
              }}
            />

            <div className="row d-flex justify-content-between ">
              <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
                <div class="table-responsive rounded">
                  <table class="table tables table-bordered rounded shadow">
                    <tbody>
                      <tr className="table-row">
                        <td className="table-small" style={{ width: "20%" }}>
                          Bill No. : {patientbill_no}
                          
                        </td>
                        <td className="table-small" style={{ width: "20%" }}>
                          UHID : {patientUHID}
                         
                        </td>
                      </tr>
                    </tbody>

                    <tbody>
                            <tr className="table-row">
                              <td
                                className="table-small"
                                style={{ width: "20%" }}
                              >
                              Treatment Id :  {patienttid}
                                
                                
                              </td>

                              <td
                                colSpan="2"
                                className="table-small"
                                style={{ width: "20%" }}
                              >
                                Patient Name : {patientName}
                               
                              </td>

                              
                              {/* <td
                                className="table-small"
                                style={{ width: "10%" }}
                              >
                                Bill Date :
                                <input
                                  type="date"
                                  className="border border-0 ms-2"

                                />
                              </td> */}
                            </tr>
                          </tbody>
                    <tbody>
                      <tr className="table-row">
                        <td className="table-small" style={{ width: "20%" }}>
                          Advised By : {patientAssigned_Doctor_Name}
               
                        </td>
                        <td className="table-small" style={{ width: "10%" }}>
                          Collection Date :{" "}
                          {formattedAdjustedCollection_Date}
                        </td>
                      </tr>
                    </tbody>

                    <tbody>
                      <tr className="table-row">
                        <td className="table-small" style={{ width: "20%" }}>
                          Center Name : {patientbranch_name}
                
                        </td>
                        <td className="table-small" style={{ width: "10%" }}>
                          Authenticate Date:{" "}
                          {formattedAdjustedAuthenticate_Date}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            
              <div className="container-fluid">
            <div className="row">
              <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
                <table className=" bg-white text-center table table-borderless">
                  <thead className="border ">
                    <th className="p-3">Test</th>
                    <th className="p-3">Result</th>

                    {labName === "oral" && (
                      <>
                        <th className="p-3">Unit</th>{" "}
                        <th className="p-3">Range</th>
                      </>
                    )}
                    {labName === "pathology" && (
                      <>
                        <th className="p-3">Unit</th>{" "}
                        <th className="p-3">Range</th>
                      </>
                    )}

                    {labName === "radiology" && <th className="p-3">Cost</th>}
                    <th className="p-3 d-print-none">Action</th>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{patienttest}</td>
                      <td>{patientresult}</td>
                      {labName === "oral" && <td>{patientunit}</td>}
                      {labName === "pathology" && <td>{patientunit}</td>}
                      {labName === "oral" && (
                        <>
                          <td>40 - 59</td>
                        </>
                      )}
                      {labName === "pathology" && (
                        <>
                          <td>40 - 59</td>
                        </>
                      )}
                      {labName === "radiology" && <td>{patientcost}</td>}

                      <td  style={{whiteSpace:"nowrap"}}>
                        {/* <Link to={`/update-patient-test-data/${id}`}>
                          <button className="btn btn-secondary m-1">
                            Edit
                          </button>
                        </Link> */}
                        <Button onClick={handleShowModal} variant="primary">Edit</Button>
                        <button
                          className="btn btn-danger  mx-2"
                          onClick={() => handleDelete(patientbill_no)}
                        >
                          Delete
                        </button>
                        <button  className="btn btn-success  mx-2" onClick={handleViewPDF}>View PDF</button>
                      </td>
                    </tr>
                  </tbody>

                  <tbody></tbody>
                </table>
                <div className="note mt-3">
                  <h5 className=" fw-bold">Notes:-</h5>

                  <ul>
                    {notes.map((note) => (
                      <li key={note.id}>
                        {note.note_text}
                        <p>{note.additional_info}</p>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="">
                  <button
                    className="btn btn-primary mx-1  "
                    onClick={handleAddNotes}
                  >
                    Add Notes
                  </button>
                  <button
                    className="btn btn-primary mx-1  "
                    onClick={handleEditNotes}
                  >
                    Edit Notes
                  </button>

                  <button
                    className="btn btn-danger mx-1"
                    onClick={handleDeleteNotes}
                  >
                    Delete Notes
                  </button>
                
                </div>
              </div>
            </div>
          </div>
          <div className="text-center">
            <button
              className="btn btn-success  mb-2 mt-4 "
              onClick={handlePrintPage}
            >
              Print_Page
            </button>
          </div>
          </div>

        
          <Modal show={showModal} >
                      <Modal.Header closeButton onClick={handleCloseModal}>
                        <Modal.Title>Edit Patient Details</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formpatienttest">
            <Form.Label> Test Name</Form.Label>
            <Form.Control
              type="text"
              placeholder=" Test Name"
              value={patienttest}
              onChange={(e) => setPatienttest(e.target.value)}
              disabled
            />
            <Form.Label className="mt-3"> result</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter new  result"
              value={patientresult}
              onChange={(e) => setPatientresult(e.target.value)}
            />
              {labName === "pathology" && (
                <>
            <Form.Label className="mt-3"> Unit</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter new  Unit"
              value={patientunit}
              onChange={(e) => setPatientunit(e.target.value)}
            />
            
            </>
              )}
              {labName === "oral" && (
                <>
            <Form.Label className="mt-3"> Unit</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter new  Unit"
              value={patientunit}
              onChange={(e) => setPatientunit(e.target.value)}
            />
            
            </>
              )}
             {patientcost > ''   && (
                <> <Form.Label className="mt-3">cost</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter new cost"
              value={patientcost}
             
              disabled
            />
        </>
             )}
            
          </Form.Group>

                       

                          <Button variant="primary" type="submit" className="mt-3">
                            Save Changes
                          </Button>
                        </Form>
                      </Modal.Body>
                    </Modal>

       
        </div>
      </div>
          </div>
        </div>
    </Wrapper>
  );
}

export default FinalOral_Blood_Test;

const Wrapper = styled.div`
  .resp{
    @media (min-width: 768px) and (max-width: 1020px) {
      width: 95%;
    }
   
  }
`
