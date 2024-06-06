// import React, { useEffect, useState } from "react";
// import styled from "styled-components";
// // import Header from "../../../components/Header";
// // import Sider from "../../../components/Sider";
// // import BranchSelector from "../../../components/BranchSelector";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import HeaderAdmin from "./HeaderAdmin";
// import SiderAdmin from "./SiderAdmin";

// const AdminPatientLIst = () => {
//   const dispatch = useDispatch();
//   const user = useSelector((state) => state.user.currentUser);
//   console.log(user);
//   const [patList, setPatList] = useState([]);
//   const [keyword, setkeyword] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(10);

//   const getPatByBranch = async () => {
//     try {
//       const { data } = await axios.get(
//         `https://dentalguruadmin.doaguru.com/api/v1/admin/getPatientDetailsByBranch/${user.branch_name}`,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${user.token}`,
//           },
//         }
//       );
//       console.log(data);
//       setPatList(data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getPatByBranch();
//   }, []);

//   console.log(patList);

//   return (
//     <>
//       <Container>
//         <HeaderAdmin />
//         <div className="main">
//           <div className="container-fluid">
//             <div className="row flex-nowrap ">
//               <div className="col-lg-1 col-md-2 col-1 p-0">
//                 <SiderAdmin />
//               </div>
//               <div className="col-lg-11 col-md-10 col-11 ps-0" style={{marginTop:"4rem"}}>
//                 <div className="container-fluid mt-3">
//                   <div className="d-flex justify-content-between">
//                     {/* <BranchSelector /> */}
//                   </div>
//                 </div>
//                 <div className="container-fluid mt-3">
//                   <h2 className="text-center">Patient Details List</h2>
//                   <div className="d-flex justify-content-between">
//                     <div>
//                       <label>Patient Name :</label>
//                       <input
//                         type="text"
//                         placeholder="search patient name"
//                         className="mx-3 p-1 rounded"
//                         value={keyword}
//                         onChange={(e) =>
//                           setkeyword(e.target.value.toLowerCase())
//                         }
//                       />
//                     </div>
//                     <div>
//                       {/* <button
//                         className="btn btn-success"
//                         // onClick={() => openAddEmployeePopup()}
//                       >
//                         Add Employee
//                       </button> */}
//                     </div>
//                   </div>

//                   <div class="table-responsive mt-4">
//                     <table class="table table-bordered">
//                       <thead className="table-head">
//                         <tr>
//                           <th className="thead sticky">Patient UHID</th>
//                           <th className="thead sticky">Name</th>
//                           <th className="thead sticky">Mobile</th>
//                           <th className="thead sticky">Gender</th>
//                           <th className="thead sticky">Email</th>
//                           <th className="thead sticky">Date of Birth</th>
//                           <th className="thead sticky">Marital Status</th>
//                           <th className="thead sticky">Patient Type</th>
//                           <th className="thead sticky">Address</th>
//                           <th className="thead sticky">Adhaar Number</th>
//                           <th className="sticky" style={{ minWidth: "10rem" }}>
//                             Actions
//                           </th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {patList
//                           ?.filter((val) => {
//                             if (keyword === "") {
//                               return true;
//                             } else if (
//                               val.patient_name
//                                 .toLowerCase()
//                                 .includes(keyword.toLowerCase())
//                             ) {
//                               return val;
//                             }
//                           })
//                           .map((item) => (
//                             <>
//                               <tr className="table-row">
//                                 <td className="thead">
//                                   <Link to={`/patient-profile/${item.uhid}`}>
//                                     {item.uhid}
//                                   </Link>
//                                 </td>
//                                 <td className="thead">{item.patient_name}</td>
//                                 <td className="thead">{item.mobileno}</td>
//                                 <td className="thead">{item.gender}</td>
//                                 <td className="thead">{item.emailid}</td>
//                                 <td className="thead">{item.dob}</td>
//                                 <td className="thead">{item.maritalstatus}</td>
//                                 <td className="thead">{item.patient_type}</td>
//                                 <td className="thead">{item.address}</td>
//                                 <td className="thead">{item.adharno}</td>
//                                 <td className="" style={{ minWidth: "10rem" }}>
//                                   <div className="d-flex">
//                                     <Link to={`/patient-profile/${item.uhid}`}>
//                                       <button className="btn btn-warning">
//                                         View Details
//                                       </button>
//                                     </Link>

//                                     {/* <button className="btn btn-danger mx-1">
//                                       Delete
//                                     </button> */}
//                                   </div>
//                                 </td>
//                               </tr>
//                             </>
//                           ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </Container>
//     </>
//   );
// };

// export default AdminPatientLIst;
// const Container = styled.div`
//   .main {
//     .table-responsive {
//       height: 30rem;
//       overflow: auto;
//     }
//   }
//   th {
//     background-color: #1abc9c;
//     color: white;
//     position: sticky;
//   }

//   .sticky {
//     position: sticky;
//     top: 0;
//     background-color: #1abc9c;
//     color: white;
//     z-index: 1;
//   }
//   td {
//     text-align: center;
//   }

//   .thead {
//     min-width: 8rem;
//   }

//   a {
//     text-decoration: none;
//   }
// `;



import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import HeaderAdmin from "./HeaderAdmin";
import SiderAdmin from "./SiderAdmin";
import animationData from "../animation/loading-effect.json";
import Lottie from "react-lottie";


const AdminPatientLIst = () => {
  const dispatch = useDispatch();
  const user =  useSelector((state) => state.user.currentUser);
  
  const branch = user.branch_name;
 
  const [patList, setPatList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [keyword, setkeyword] = useState("");
  const complaintsPerPage = 8; // Number of complaints per page
  const [currentPage, setCurrentPage] = useState(0); // Start from the first page

  const getPatByBranch = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `https://dentalguruadmin.doaguru.com/api/v1/admin/getPatientDetailsByBranch/${branch}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setLoading(false);
      console.log(data);
      setPatList(data);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getPatByBranch();
  }, [branch]);

 

  console.log(patList);

  useEffect(() => {
    setCurrentPage(0);
  }, [keyword]);

  const searchFilter = patList.filter((lab) =>
    lab.patient_name.toLowerCase().includes(keyword.toLowerCase())
  );

  const totalPages = Math.ceil(searchFilter.length / complaintsPerPage);

  const filterAppointDataByMonth = () => {
    const startIndex = currentPage * complaintsPerPage;
    const endIndex = startIndex + complaintsPerPage;
    return searchFilter?.slice(startIndex, endIndex);
  };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };


  const displayedAppointments = filterAppointDataByMonth();

  return (
    <>
      <Container>
        <HeaderAdmin />
        <div className="main">
          <div className="container-fluid">
            <div className="row flex-nowrap ">
              <div className="col-lg-1 col-md-1 col-1 p-0">
                <SiderAdmin />
              </div>
              <div className="col-lg-11 col-md-11 col-11 ps-0 mx-2" style={{marginTop:"5rem"}}>
                {/* <div className="container-fluid mt-3">
                  <div className="d-flex justify-content-between">
                    <BranchSelector />
                  </div>
                </div> */}
                <div className="container-fluid mt-3">
                  <h2 className="text-center">Patient Details List</h2>
                  <div className="d-flex justify-content-between">
                    <div>
                      {/* <label>Patient Name :</label> */}
                      <input
                        type="text"
                        placeholder="Search Patient Name"
                        className=""
                        value={keyword}
                        onChange={(e) =>
                          setkeyword(e.target.value.toLowerCase())
                        }
                      />
                    </div>
                    <div>
                      {/* <button
                        className="btn btn-success"
                        // onClick={() => openAddEmployeePopup()}
                      >
                        Add Employee
                      </button> */}
                    </div>
                  </div>
                  {loading ? (
            <Lottie options={defaultOptions} height={300} width={400}></Lottie>
          ) : (
            <>
                
                      <div class="table-responsive mt-4">
                        <table class="table table-bordered">
                          <thead className="table-head">
                            <tr>
                              <th className="thead sticky">Patient UHID</th>
                              <th className="thead sticky">Name</th>
                              <th className="thead sticky">Mobile</th>
                              <th className="thead sticky">Gender</th>
                              <th className="thead sticky">Email</th>
                              <th className="thead sticky">Date of Birth</th>
                              {/* <th className="thead sticky">Marital Status</th> */}
                              <th className="thead sticky">Patient Type</th>
                              <th className="thead sticky">Address</th>
                              <th className="thead sticky">Adhaar Number</th>
                              <th
                                className="sticky"
                                style={{ minWidth: "10rem" }}
                              >
                                Actions
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {displayedAppointments.map((item) => (
                              <>
                                <tr className="table-row">
                                  <td className="thead">
                                    <Link
                                      to={`/patient-profile/${item.uhid}`}
                                      style={{ textDecoration: "none" }}
                                    >
                                      {item.uhid}
                                    </Link>
                                  </td>
                                  <td className="thead">{item.patient_name}</td>
                                  <td className="thead">{item.mobileno}</td>
                                  <td className="thead">{item.gender}</td>
                                  <td className="thead">{item.emailid}</td>
                                  <td className="thead">{item.dob}</td>
                                  {/* <td className="thead">{item.maritalstatus}</td> */}
                                  <td className="thead">{item.patient_type}</td>
                                  <td className="thead">{item.address}</td>
                                  <td className="thead">{item.adharno}</td>
                                  <td
                                    className=""
                                    style={{ minWidth: "10rem" }}
                                  >
                                    <div className="d-flex">
                                      <Link
                                        to={`/patient-profile/${item.uhid}`}
                                      >
                                        <button className="btn btn-warning">
                                          View Details
                                        </button>
                                      </Link>
                                    </div>
                                  </td>
                                </tr>
                              </>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      </>
          )}
                      <PaginationContainer>
                        <ReactPaginate
                          previousLabel={"previous"}
                          nextLabel={"next"}
                          breakLabel={"..."}
                          pageCount={totalPages}
                          marginPagesDisplayed={2}
                          pageRangeDisplayed={5}
                          onPageChange={handlePageChange}
                          containerClassName={"pagination"}
                          activeClassName={"active"}
                        />
                      </PaginationContainer>
                    
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default AdminPatientLIst;
const Container = styled.div`
  th {
    background-color:  #1abc9c;
    color: white;
    text-align: center;
  }
  td {
    text-align: center;
  }

  .thead {
    min-width: 8rem;
  }

  /* .table-responsive {
    height: 30rem;
    overflow: auto;
  } */

  th {
    background-color:  #1abc9c;
    color: white;
    position: sticky;
    white-space: nowrap;
  }

  .sticky {
    position: sticky;
    top: 0;
    background-color:  #1abc9c;
    color: white;
    z-index: 1;
  }

  input::placeholder {
    color: #aaa;
    opacity: 1; /* Ensure placeholder is visible */
    font-size: 1.2rem;
    transition: color 0.3s ease;
  }

  input:focus::placeholder {
    color: transparent; /* Hide placeholder on focus */
  }

  input {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 20px;
    box-sizing: border-box;
    transition: border-color 0.3s ease;
  }

  input:focus {
    border-color:  #1abc9c;
  }
`;

const PaginationContainer = styled.div`
  .pagination {
    display: flex;
    justify-content: center;
    padding: 10px;
    list-style: none;
    border-radius: 5px;
  }

  .pagination li {
    margin: 0 5px;
  }

  .pagination li a {
    display: block;
    padding: 8px 16px;
    border: 1px solid black;
    color: #1abc9c;
    cursor: pointer;
    text-decoration: none;
  }

  .pagination li.active a {
    background-color: #1abc9c;
    color: white;
    border: 1px solid #1abc9c;
  }

  .pagination li.disabled a {
    color: #ddd;
    cursor: not-allowed;
  }

  .pagination li a:hover:not(.active) {
    background-color: #ddd;
  }
`;