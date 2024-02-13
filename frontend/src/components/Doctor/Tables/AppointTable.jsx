import React, { useState } from "react";
import styled from "styled-components";

const AppointTable = () => {
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const Table_data = [
    {
      uid: "1",
      patient: "Mohit Shau",
      mobile: "9806324245",
      treatment: "root canal",
      timing: "9:00 Am",
      status: "Missed",
      action: "edit",
    },
    {
      uid: "2",
      patient: "Umer Qureshi",
      mobile: "9806324245",
      treatment: "root canal",
      timing: "9:00 Am",
      status: "Missed",
      action: "edit",
    },
    {
      uid: "3",
      patient: "Dhani Burma",
      mobile: "9806324245",
      treatment: "root canal",
      timing: "9:00 Am",
      status: "Missed",
      action: "edit",
    },
    {
      uid: "4",
      patient: "Ragni Burma",
      mobile: "9806324245",
      treatment: "root canal",
      timing: "9:00 Am",
      status: "Missed",
      action: "edit",
    },
    {
      uid: "5",
      patient: "Rohit Shau",
      mobile: "9806324245",
      treatment: "root canal",
      timing: "9:00 Am",
      status: "Missed",
      action: "edit",
    },
    {
      uid: "6",
      patient: "Ritin Tiwari",
      mobile: "9806324245",
      treatment: "root canal",
      timing: "9:00 Am",
      status: "Missed",
      action: "edit",
    },
    {
      uid: "7",
      patient: "Dev Ansh Dubey",
      mobile: "9806324245",
      treatment: "root canal",
      timing: "9:00 Am",
      status: "Missed",
      action: "edit",
    },
    {
      uid: "8",
      patient: "Juber",
      mobile: "9806324245",
      treatment: "root canal",
      timing: "9:00 Am",
      status: "Missed",
      action: "edit",
    },
    {
      uid: "9",
      patient: "Mohit Shau",
      mobile: "9806324245",
      treatment: "root canal",
      timing: "9:00 Am",
      status: "Missed",
      action: "edit",
    },
    {
      uid: "10",
      patient: "Mohit Shau",
      mobile: "9806324245",
      treatment: "root canal",
      timing: "9:00 Am",
      status: "Missed",
      action: "edit",
    },
  ];

  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };

  const filteredTable_data = Table_data.filter((data) => {
    return data.patient.toLowerCase().includes(searchInput.toLowerCase());
  });

   // Logic to calculate pagination
   const indexOfLastItem = currentPage * itemsPerPage;
   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
   const currentItems = filteredTable_data.slice(indexOfFirstItem, indexOfLastItem);
 
   // Change page
   const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Wrapper>
      <div className="container pt-4">
        <div className="widget-area-2 proclinic-box-shadow" id="tableres">
          <div className="d-md-flex justify-content-lg-between ">
            {" "}
            <h5 className="widget-title" id="title">
              Current Appointment
              <h5 className="d-inline ms-4">
                Total - {filteredTable_data.length}
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
                  <th>Treatment</th>
                  <th>Mobile</th>
                  <th>Timing</th>
                  <th>Status</th>
                  <th>Type of Action</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((country, index) => (
                  <tr key={index}>
                    <td>{country.uid}</td>
                    <td>{country.patient}</td>
                    <td>{country.treatment}</td>
                    <td>{country.mobile}</td>
                    <td>{country.timing}</td>
                    <td>{country.status}</td>
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
                            <a className="dropdown-item mx-0" href="#">
                              Checked-In
                            </a>
                          </li>
                          <li>
                            <a className="dropdown-item mx-0" href="#">
                              Checked-Out
                            </a>
                          </li>
                          <li>
                            <a className="dropdown-item mx-0" href="#">
                              Complete
                            </a>
                          </li>
                          <li>
                            <a className="dropdown-item mx-0" href="#">
                              Cancle
                            </a>
                          </li>

                          <li>
                            <a className="dropdown-item mx-0" href="#"></a>
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <nav>
            <ul className="pagination">
              <li className="page-item">
                <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className="page-link">Previous</button>
              </li>
              <li className="page-item">
                <button onClick={() => paginate(currentPage + 1)} disabled={indexOfLastItem >= filteredTable_data.length} className="page-link">Next</button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </Wrapper>
  );
};

export default AppointTable;
const Wrapper = styled.div`
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
