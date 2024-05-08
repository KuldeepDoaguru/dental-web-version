import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../MainComponents/Header";
import Sider from "../MainComponents/Sider";
import moment from "moment";
import { Link } from "react-router-dom";
import { IoArrowBackSharp } from "react-icons/io5";

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
          `https://dentalgurulab.doaguru.com/api/lab/get-patient-details-by-id/${id}`
        );
        setPatientbill_no(response.data[0].testid);
        setPatientUHID(response.data[0].patient_uhid);
        setPatientName(response.data[0].patient_name);
        setPatientage(response.data[0].age);
        setPatientgender(response.data[0].gender);
        setPatientbranch_name(response.data[0].branch_name);
        setPatientAssigned_Doctor_Name(response.data[0].assigned_doctor_name);
        setLabName(response.data[0].lab_name);
      } catch (error) {
        console.error("Error fetching patient details:", error);
      }
    };

    fetchPatientDetails();
  }, []);

  useEffect(() => {
    const fetchPatientTestDetails = async () => {
      try {
        const response = await axios.get(
          `https://dentalgurulab.doaguru.com/api/lab/get-patient-test-details-by-id/${id}`
        );
        setPatienttest(response.data[0].test);
        setPatientresult(response.data[0].result);
        setPatientunit(response.data[0].unit);
        setPatientcost(response.data[0].cost);
        setPatientcollection_date(response.data[0].collection_date);
        setPatientauthenticate_date(response.data[0].authenticate_date);
      } catch (error) {
        console.error("Error fetching patient details:", error);
      }
    };

    fetchPatientTestDetails();
  }, []);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get(
          `https://dentalgurulab.doaguru.com/api/lab/getpatienttest-notes/${id}`
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
          `https://dentalgurulab.doaguru.com/api/lab/patent-details/${id}`
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

  return (
    <>
      <div className="d-print-none">
        <Header />
      </div>
    

      <div clasNameName="main">
          <div className="container-fluid">
          <div className="row flex-nowrap ">
        <div className="col-xxl-1 col-xl-1 col-lg-1 d-print-none col-sm-1 p-0">
          <Sider />
        </div>
        <div className="col-xxl-11 col-xl-11 col-lg-11 col-md-12 col-sm-12 p-0" style={{marginTop:"5rem"}}>
          <IoArrowBackSharp
            className="fs-1 text-black d-print-none"
            onClick={goBack}
          />

          <div className="mx-4">
            <div className="row">
              <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
                <div className="row d-flex justify-content-between">
                  <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-8 col-sm-6 mt-4">
                    <div>
                      <h5>Branch : Madan Mahal</h5>
                    </div>
                    <form className="d-flex fw-semibold">
                      <p>Addresh </p>
                      <p className="ms-1"> : </p>
                      <p className="ms-2">128,Near Gwarighat Jabalpur M.p</p>
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
                    <div className="text-center mt-2 footer ">
                      <img
                        className="ms-4"
                        src="https://res.cloudinary.com/dq5upuxm8/image/upload/v1707404036/dental%20guru/dentalguru_v1g7k0.png"
                        alt="Logo"
                        width="100"
                        height="85"
                      />
                      <h3 className="ms-2">Dental Guru</h3>
                    </div>
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
                          Bill No. :
                          <input
                            type="text"
                            className="border border-0 ms-3 w-50"
                            value={patientbill_no}
                          />
                        </td>
                        <td className="table-small" style={{ width: "20%" }}>
                          UHID :{" "}
                          <input
                            type="text"
                            className="border border-0 ms-2"
                            value={patientUHID}
                          />
                        </td>
                      </tr>
                    </tbody>

                    <tbody>
                      <tr className="table-row">
                        <td className="table-small" style={{ width: "20%" }}>
                          Age / Gender :
                          <input
                            type="Number"
                            className="border border-0 ms-3"
                            style={{ width: "40px" }}
                            value={patientage}
                          />{" "}
                          /
                          <input
                            type="text"
                            className="border border-0 w-25 ms-3"
                            value={patientgender}
                          />
                        </td>

                        <td
                          colSpan="2"
                          className="table-small"
                          style={{ width: "20%" }}
                        >
                          Patient Name :
                          <input
                            type="text"
                            className="border border-0 ms-3 w-50"
                            value={patientName}
                          />
                        </td>
                      </tr>
                    </tbody>
                    <tbody>
                      <tr className="table-row">
                        <td className="table-small" style={{ width: "20%" }}>
                          Advised By :{" "}
                          <input
                            type="text"
                            className="border border-0 ms-2"
                            value={patientAssigned_Doctor_Name}
                          />
                        </td>
                        <td className="table-small" style={{ width: "10%" }}>
                          Collection Date :{" "}
                          {moment(patientcollection_date).format("DD/MM/YYYY")}
                        </td>
                      </tr>
                    </tbody>

                    <tbody>
                      <tr className="table-row">
                        <td className="table-small" style={{ width: "20%" }}>
                          Center Name :{" "}
                          <input
                            type="text"
                            className="border border-0 ms-2"
                            value={patientbranch_name}
                          />
                        </td>
                        <td className="table-small" style={{ width: "10%" }}>
                          Authenticate Date:{" "}
                          {moment(patientauthenticate_date).format(
                            "DD/MM/YYYY"
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
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
                    {labName === "blood" && (
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
                      {labName === "blood" && <td>{patientunit}</td>}
                      {labName === "oral" && (
                        <>
                          <td>40 - 59</td>
                        </>
                      )}
                      {labName === "blood" && (
                        <>
                          <td>40 - 59</td>
                        </>
                      )}
                      {labName === "radiology" && <td>{patientcost}</td>}

                      <td>
                        <Link to={`/update-patient-test-data/${id}`}>
                          <button className="btn btn-secondary m-1">
                            Edit
                          </button>
                        </Link>
                        <button
                          className="btn btn-danger mx-sm-0 mx-lg-2 m-1"
                          onClick={() => handleDelete(patientbill_no)}
                        >
                          Delete
                        </button>
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
          <div className="container-fluid"></div>

          <div className="">
            <button
              className="btn btn-success p-3 w-75 mb-2 mt-4 w-100"
              onClick={handlePrintPage}
            >
              Print_Page
            </button>
          </div>
        </div>
      </div>
          </div>
        </div>
    </>
  );
}

export default FinalOral_Blood_Test;
