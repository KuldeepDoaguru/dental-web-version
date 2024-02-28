import React, { useState } from "react";
import styled from "styled-components";

const HistoryPatient = () => {
    const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const Table_data = [
    {
      uid: "1",
      rhid: "1",
      patient: "Mohit Shau",
      mobile: "9806324245",
      date: "01/01/2024",
      timing: "9:00 Am",
    },
    {
        uid: "2",
        rhid: "2",
        patient: "Rohit Shau",
        mobile: "9806324245",
        date: "01/01/2024",
        timing: "9:00 Am",
    },
    {
        uid: "3",
        rhid: "3",
        patient: "Ritin Tiwari",
        mobile: "9806324245",
        date: "01/01/2024",
        timing: "9:00 Am",
    },
    {
        uid: "4",
        rhid: "4",
        patient: "Dev Ansh Dubey",
        mobile: "9806324245",
        date: "01/01/2024",
        timing: "9:00 Am",
    },
    {
        uid: "5",
        rhid: "5",
        patient: "Ragni Burma",
        mobile: "9806324245",
        date: "01/01/2024",
        timing: "9:00 Am",
    },
    {
        uid: "6",
        rhid: "6",
        patient: "Dhani Burma",
        mobile: "9806324245",
        date: "01/01/2024",
        timing: "9:00 Am",
    },
    {
        uid: "7",
        rhid: "7",
        patient: "Umer Qureshi",
        mobile: "9806324245",
        date: "01/01/2024",
        timing: "9:00 Am",
    },
    {
        uid: "8",
        rhid: "8",
        patient: "Mohit Shau",
        mobile: "9806324245",
        date: "01/01/2024",
        timing: "9:00 Am",
    },
    {
        uid: "9",
        rhid: "9",
        patient: "Shubham Soni",
        mobile: "9806324245",
        date: "01/01/2024",
        timing: "9:00 Am",
    },
    {
        uid: "10",
        rhid: "10",
        patient: "Vinay",
        mobile: "9806324245",
        date: "01/01/2024",
        timing: "9:00 Am",
    },
    {
        uid: "6",
        rhid: "6",
        patient: "Dhani Burma",
        mobile: "9806324245",
        date: "01/01/2024",
        timing: "9:00 Am",
    },
    {
        uid: "7",
        rhid: "7",
        patient: "Umer Qureshi",
        mobile: "9806324245",
        date: "01/01/2024",
        timing: "9:00 Am",
    },
    {
        uid: "8",
        rhid: "8",
        patient: "Mohit Shau",
        mobile: "9806324245",
        date: "01/01/2024",
        timing: "9:00 Am",
    },
    {
        uid: "9",
        rhid: "9",
        patient: "Shubham Soni",
        mobile: "9806324245",
        date: "01/01/2024",
        timing: "9:00 Am",
        medicine: "edit",
        treatment: "root canal",
    },
    {
        uid: "10",
        rhid: "10",
        patient: "Vinay",
        mobile: "9806324245",
        date: "01/01/2024",
        timing: "9:00 Am",
        // medicine: "edit",
        // treatment: "root canal",
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
        <>
            <Wrapper>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <div className="text-center fs-1 shadow-none p-1 mt-4 mb-4 bg-light rounded">
                                <p>Patient History</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container pt-4">
        <div className="widget-area-2 proclinic-box-shadow" id="tableres">
          <div className="d-md-flex justify-content-lg-between ">
            {" "}
            <h5 className="widget-title" id="title">
              <h5 className="d-inline ms-4">
                Total - {filteredTable_data.length}
              </h5>
            </h5>
            <input
              type="search"
              placeholder="Search Patient"
              onChange={handleChange}
              value={searchInput}
              className="mb-2 rounded-5 form-control w-25"
              id="form12"
            />
            {/* <input type="text" id="form12" class="form-control" /> */}
          </div>

          <div className="table-responsive">
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>UHID</th>
                  <th>RGID</th>
                  <th>Patient Name</th>
                  <th>Mobile</th>
                  <th>Date</th>
                  <th>Timing</th>
                  <th>Medicine</th>
                  <th>Treatment</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((country, index) => (
                  <tr key={index}>
                    <td>{country.uid}</td>
                    <td>{country.rhid}</td>
                    <td>{country.patient}</td>
                    <td>{country.mobile}</td>
                    <td>{country.date}</td>
                    <td>{country.timing}</td>
                    <td className="text-center"><button className="btn btn-secondary">View Report</button></td>
                    <td className="text-center"><button className="btn btn-secondary">View Treatment</button></td>
                    {/* <td>
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
                            <a className="dropdown-item mx-0" href="">
                              Checked-In
                            </a>
                          </li>
                          <li>
                            <a className="dropdown-item mx-0" href="">
                              Checked-Out
                            </a>
                          </li>
                          <li>
                            <a className="dropdown-item mx-0" href="">
                              Complete
                            </a>
                          </li>
                          <li>
                            <a className="dropdown-item mx-0" href="">
                              Cancle
                            </a>
                          </li>

                          <li>
                            <a className="dropdown-item mx-0" href="#"></a>
                          </li>
                        </ul>
                      </div>
                    </td> */}
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
        </>
    )
}

export default HistoryPatient;
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