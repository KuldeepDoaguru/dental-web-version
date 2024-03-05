import React, { useState } from "react";
import styled from "styled-components";
import HeadBar from "../HeadBar";
import Sider from "../SideBar";

const AllAppoint = () => {
  const Table_data = [
    {
      uid: "1",
      patient: "Mohit Shau",
      mobile: "9806324245",
      timing: "9:00 Am",
      treatment: "root canal",
      bloodgroup: "O +ve",
      dob: "05/07/1998",
      age: "25",
      weight: "70",
      allergy: "no",
      disease: "sugar",
      patienttype: "A",
      note: "No issue",
      status: "Missed",
      action: "edit",
      status: ""
    },
    {
      uid: "2",
      patient: "Umer Qureshi",
      mobile: "9806324245",
      timing: "9:00 Am",
      treatment: "root canal",
      bloodgroup: "O +ve",
      dob: "05/07/1998",
      age: "25",
      weight: "70",
      allergy: "no",
      disease: "sugar",
      patienttype: "A",
      note: "No issue",
      status: "Missed",
      action: "edit",
      status: ""
    },
    {
      uid: "3",
      patient: "Dhani Burma",
      mobile: "9806324245",
      timing: "9:00 Am",
      treatment: "root canal",
      bloodgroup: "O +ve",
      dob: "05/07/1998",
      age: "25",
      weight: "70",
      allergy: "no",
      disease: "sugar",
      patienttype: "A",
      note: "No issue",
      status: "Missed",
      action: "edit",
      status: ""
    },
    {
      uid: "4",
      patient: "Ragni Burma",
      mobile: "9806324245",
      timing: "9:00 Am",
      treatment: "root canal",
      bloodgroup: "O +ve",
      dob: "05/07/1998",
      age: "25",
      weight: "70",
      allergy: "no",
      disease: "sugar",
      patienttype: "A",
      note: "No issue",
      status: "Missed",
      action: "edit",
      status: ""
    },
    {
      uid: "5",
      patient: "Rohit Shau",
      mobile: "9806324245",
      timing: "9:00 Am",
      treatment: "root canal",
      bloodgroup: "O +ve",
      dob: "05/07/1998",
      age: "25",
      weight: "70",
      allergy: "no",
      disease: "sugar",
      patienttype: "A",
      note: "No issue",
      status: "Missed",
      action: "edit",
      status: ""
    },
    {
      uid: "6",
      patient: "Ritin Tiwari",
      mobile: "9806324245",
      timing: "9:00 Am",
      treatment: "root canal",
      bloodgroup: "O +ve",
      dob: "05/07/1998",
      age: "25",
      weight: "70",
      allergy: "no",
      disease: "sugar",
      patienttype: "A",
      note: "No issue",
      status: "Missed",
      action: "edit",
      status: ""
    },
    {
      uid: "7",
      patient: "Dev Ansh Dubey",
      mobile: "9806324245",
      timing: "9:00 Am",
      treatment: "root canal",
      bloodgroup: "O +ve",
      dob: "05/07/1998",
      age: "25",
      weight: "70",
      allergy: "no",
      disease: "sugar",
      patienttype: "A",
      note: "No issue",
      status: "Missed",
      action: "edit",
      status: ""
    }
  ];

  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);
  const [currentItems, setCurrentItems] = useState(Table_data); // Your initial data state


  const handleAction = (index, action) => {
    const updatedItems = [...currentItems];
    updatedItems[index].status = action;
    setCurrentItems(updatedItems);
  };


  const handleChange = (e) => {
    setSearchInput(e.target.value);
    setCurrentPage(1); // Reset current page when search input changes
  };
  const filteredTableData = Table_data.filter((data) => {
    return data.patient.toLowerCase().includes(searchInput.toLowerCase());
  });

  // Logic to calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItemsOnPage = filteredTableData.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Container>
        <HeadBar />
        <div className="main">
          <div className="container-fluid">
            <div className="row flex-nowrap ">
              <div className="col-lg-1 col-1 p-0">
                <Sider />
              </div>
              <div className="container pt-4">
                <div className="widget-area-2 proclinic-box-shadow" id="tableres">
                  <div className="d-md-flex justify-content-lg-between ">
                    {" "}
                    <h5 className="widget-title" id="title">
                      Current Appointment
                      <h5 className="d-inline ms-4">
                        Total - {filteredTableData.length}
                      </h5>
                    </h5>
                    <input
                      type="search"
                      placeholder="Search here"
                      onChange={handleChange}
                      value={searchInput}
                      className="mb-2 rounded-5"
                    />
                  </div>

                  <div className="table-responsive">
                    <table className="table table-bordered table-striped">
                      <thead>
                        <tr>
                          <th>Uid</th>
                          <th>Patient Name</th>
                          <th>Mobile</th>
                          <th>Timing</th>
                          <th>Treatment</th>
                          <th>Blood Group</th>
                          <th>DOB</th>
                          <th>Age</th>
                          <th>Weight</th>
                          <th>Allergy</th>
                          <th>Disease</th>
                          <th>Patient Type</th>
                          <th>Note</th>
                          <th>Status</th>
                          <th>Type of Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentItems.map((country, index) => (
                          <tr key={index}>
                            <td>{country.uid}</td>
                            <td>{country.patient}</td>
                            <td>{country.mobile}</td>
                            <td>{country.timing}</td>
                            <td>{country.treatment}</td>
                            <td>{country.bloodgroup}</td>
                            <td>{country.dob}</td>
                            <td>{country.age}</td>
                            <td>{country.weight}</td>
                            <td>{country.allergy}</td>
                            <td>{country.disease}</td>
                            <td>{country.patienttype}</td>
                            <td>{country.note}</td>
                            <td>{country.status}</td> {/* Display the status */}
                            <td>
                              <div className="dropdown">
                                <button
                                  className="btn btn-secondary dropdown-toggle"
                                  type="button"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                >
                                  Action
                                </button>
                                <ul className="dropdown-menu">
                                  <li>
                                    <button
                                      className="dropdown-item mx-0"
                                      onClick={() => handleAction(index, 'Start Treatment')}
                                    >
                                      Start Treatment
                                    </button>
                                  </li>
                                  <li>
                                    <button
                                      className="dropdown-item mx-0"
                                      onClick={() => handleAction(index, 'Cancel Treatment')}
                                    >
                                      Cancel Treatment
                                    </button>
                                  </li>
                                  <li>
                                    <button
                                      className="dropdown-item mx-0"
                                      onClick={() => handleAction(index, 'Hold')}
                                    >
                                      Hold
                                    </button>
                                  </li>
                                </ul>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination */}
                  {/* <nav>
                    <ul className="pagination">
                      {Array.from({ length: Math.ceil(filteredTableData.length / itemsPerPage) }).map(
                        (_, index) => (
                          <li
                            key={index}
                            className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                          >
                            <button className="page-link" onClick={() => paginate(index + 1)}>
                              {index + 1}
                            </button>
                          </li>
                        )
                      )}
                    </ul>
                  </nav> */}

                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default AllAppoint;
// const Container = styled.div``;
const Container = styled.div`
.container{
    width: 90rem;
}
  #tableres {
    margin-top: 0rem;
    @media screen and (max-width: 768px) {
      width: 20rem;
    }
    @media screen and (min-width: 768px) and (max-width: 1020px) {
      width: 41rem;
    }
  }
  #title {
    @media screen and (max-width: 768px) {
      margin-top: 20px;
    }
  }

  #btn1 {
    width: 100%;

    @media screen and (min-width: 1600px) and (max-width: 3700px) {
      width: 75%;
    }
  }
`;
