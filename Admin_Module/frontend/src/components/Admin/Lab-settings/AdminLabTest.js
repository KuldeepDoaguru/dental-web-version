// import axios from "axios";
// import cogoToast from "cogo-toast";
// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import styled from "styled-components";

// const AdminLabTest = () => {
//   const user = useSelector((state) => state.user.currentUser);
//   console.log(user);
//   const [showPopup, setShowPopup] = useState(false);
//   const [labTestList, setLabTestList] = useState([]);
//   const { refreshTable } = useSelector((state) => state.user);
//   const [selectedItem, setSelectedItem] = useState([]);
//   const [labList, setLabList] = useState([]);
//   const [totalLab, setTotalLab] = useState(0);

//   const [upLabTestField, setUpLabTestField] = useState({
//     test_name: "",
//     test_code: "",
//     waiting_days: "",
//     default_lab: "",
//     test_date: "",
//     test_cost: "",
//   });

//   const handleAddLabTestChange = (event) => {
//     const { name, value } = event.target;
//     setUpLabTestField((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   console.log(upLabTestField);

//   const openUpdatePopup = (item) => {
//     setSelectedItem(item);
//     console.log("open pop up");
//     console.log(selectedItem);
//     setShowPopup(true);
//   };

  

//   const closeUpdatePopup = () => {
//     setShowPopup(false);
//   };

//   console.log(showPopup);
//   const getLabtestDetails = async () => {
//     try {
//       const { data } = await axios.get(
//         "https://dentalguruadmin.doaguru.com/api/v1/admin/getLabTest",
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${user.token}`,
//           },
//         }
//       );
//       setLabTestList(data);
//       setTotalLab(data.length); 
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getLabtestDetails();
//   }, [refreshTable]);

//   console.log(labTestList);

//   const updateLabData = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.put(
//         `https://dentalguruadmin.doaguru.com/api/v1/admin/updateLabTestDetails/${selectedItem.lab_tid}`,
//         upLabTestField,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${user.token}`,
//           },
//         }
//       );
//       cogoToast.success("Lab Test details updated successfully");
//       getLabtestDetails();
//       closeUpdatePopup();
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const getListLabDetails = async () => {
//     try {
//       const { data } = await axios.get(
//         `https://dentalguruadmin.doaguru.com/api/v1/admin/getLabList`,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${user.token}`,
//           },
//         }
//       );
//       setLabList(data);
    
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getListLabDetails();
//   }, []);

//   const deleteLabTestData = async (id) => {
//     try {
//       const isConfirmed = window.confirm("Are you sure you want to delete?");
//       if (isConfirmed) {
//         const response = await axios.delete(
//           `https://dentalguruadmin.doaguru.com/api/v1/admin/labTestDelete/${id}`,
//           {
//             headers: {
//               "Content-Type": "multipart/form-data",
//               Authorization: `Bearer ${user.token}`,
//             },
//           }
//         );
//         cogoToast.success("lab test deleted successfully");
//         getLabtestDetails();
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <>
//       <Container>
//         <div class="table-responsive mt-4">
//         <div>
//                         <p className="fw-bold">Total Test - {totalLab + 1}</p>
//                       </div>
//           <table class="table table-bordered">
//             <thead className="table-head">
//               <tr>
//                 <th>Lab Test Name</th>
//                 <th>Lab Test Code</th>
//                 <th>Total Waiting Days for Report</th>
//                 <th>Default Lab</th>
//                 <th>Date</th>
//                 <th>Cost</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {labTestList?.map((item) => (
//                 <>
//                   <tr className="table-row">
//                     <td>{item.test_name}</td>
//                     <td>{item.test_code}</td>
//                     <td>{item.waiting_days}</td>
//                     <td>{item.default_lab}</td>
//                     <td>{item.test_date?.split("T")[0]}</td>
//                     <td>{item.test_cost}</td>
//                     <td>
//                       <button
//                         className="btn btn-warning"
//                         onClick={() => openUpdatePopup(item)}
//                       >
//                         Edit
//                       </button>
//                       <button
//                         className="btn btn-danger mx-1"
//                         onClick={() => deleteLabTestData(item.lab_tid)}
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 </>
//               ))}
//             </tbody>
//           </table>
//           {/* pop-up for creating notice */}
//           <div className={`popup-container${showPopup ? " active" : ""}`}>
//             <div className="popup">
//               <h2>Update Lab Test Details</h2>
//               <form className="d-flex flex-column" onSubmit={updateLabData}>
//                 <div className="container">
//                   <div className="row">
//                     <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
//                       <div className="d-flex flex-column w-100">
//                         <label htmlFor="">Test Name</label>
//                         <input
//                           type="text"
//                           placeholder={selectedItem.test_name}
//                           className="rounded p-2"
//                           name="test_name"
//                           value={upLabTestField.test_name}
//                           onChange={handleAddLabTestChange}
//                         />
//                       </div>
//                     </div>
//                     <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
//                       <div className="d-flex flex-column w-100">
//                         <label htmlFor="">Test Code</label>
//                         <input
//                           type="text"
//                           placeholder={selectedItem.test_code}
//                           className="rounded p-2"
//                           name="test_code"
//                           value={upLabTestField.test_code}
//                           onChange={handleAddLabTestChange}
//                         />
//                       </div>
//                     </div>
//                     <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
//                       <div className="d-flex flex-column w-100">
//                         <label htmlFor="">Waiting for Report Days</label>
//                         <input
//                           type="text"
//                           placeholder={selectedItem.waiting_days}
//                           className="rounded p-2"
//                           name="waiting_days"
//                           value={upLabTestField.waiting_days}
//                           onChange={handleAddLabTestChange}
//                         />
//                       </div>
//                     </div>
//                     <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
//                       <div className="d-flex flex-column w-100">
//                         <label htmlFor="">Lab Name</label>
//                         <select
//                           className="rounded p-2"
//                           name="default_lab"
//                           value={upLabTestField.default_lab}
//                           onChange={handleAddLabTestChange}
//                         >
//                           <option value="">-select-</option>
//                           {labList?.map((item) => (
//                             <>
//                               <option value={item.lab_name}>
//                                 {item.lab_name}
//                               </option>
//                             </>
//                           ))}
//                         </select>
//                       </div>
//                     </div>
//                     <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
//                       <div className="d-flex flex-column w-100">
//                         <label htmlFor="">Test Date</label>
//                         <input
//                           type="date"
//                           placeholder={selectedItem.test_date}
//                           className="rounded p-2"
//                           name="test_date"
//                           value={upLabTestField.test_date}
//                           onChange={handleAddLabTestChange}
//                         />
//                       </div>
//                     </div>
//                     <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
//                       <div className="d-flex flex-column w-100">
//                         <label htmlFor="">Test Cost</label>
//                         <input
//                           type="text"
//                           placeholder={selectedItem.test_cost}
//                           className="rounded p-2"
//                           name="test_cost"
//                           value={upLabTestField.test_cost}
//                           onChange={handleAddLabTestChange}
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="d-flex justify-content-center">
//                   <button type="submit" className="btn btn-success mt-2">
//                     Save
//                   </button>
//                   <button
//                     type="button"
//                     className="btn btn-danger mt-2 ms-2"
//                     onClick={closeUpdatePopup}
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>

//           {/* popup for updating notice */}
//         </div>
//       </Container>
//     </>
//   );
// };

// export default AdminLabTest;
// const Container = styled.div`
//   .popup-container {
//     display: none;
//     position: fixed;
//     top: 0;
//     left: 0;
//     width: 100%;
//     height: 100%;
//     background-color: rgba(0, 0, 0, 0.5);
//     align-items: center;
//     justify-content: center;
//   }

//   .popup-container.active {
//     display: flex;
//     background-color: #00000075;
//   }

//   .popup {
//     background-color: white;
//     padding: 20px;
//     border-radius: 8px;
//     box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
//   }
// `;



import axios from "axios";
import cogoToast from "cogo-toast";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { AiFillDelete } from "react-icons/ai";
import { TbEdit } from "react-icons/tb";
import ReactPaginate from "react-paginate";
import animationData from "../../../pages/animation/loading-effect.json";
import Lottie from "react-lottie";


const LabTest = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [labTestList, setLabTestList] = useState([]);
  const user = useSelector((state) => state.user.currentUser);
  const { refreshTable } = useSelector((state) => state.user);
  const [selectedItem, setSelectedItem] = useState([]);
  const [labList, setLabList] = useState([]);
  const complaintsPerPage = 5; // Number of complaints per page
  const [currentPage, setCurrentPage] = useState(0); // Start from the first page
  const [totalLab, setTotalLab] = useState(0); 
  const [searchTerm, setSearchTerm] = useState("");
  const [keyword, setkeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [upLabTestField, setUpLabTestField] = useState({
    test_name: "",
    test_code: "",
    waiting_days: "",
    default_lab: "",
    test_date: "",
    test_cost: "",
  });

  const handleAddLabTestChange = (event) => {
    const { name, value } = event.target;
    setUpLabTestField((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  console.log(upLabTestField);

  const openUpdatePopup = (item) => {
    setSelectedItem(item);
    console.log("open pop up");
    setUpLabTestField({
      test_name: item.test_name,
      test_code: item.test_code,
      waiting_days: item.waiting_days,
      default_lab: item.default_lab,
      test_date: item.test_date,
      test_cost: item.test_cost,
    })
    setShowPopup(true);
  };

  console.log(selectedItem);

  const closeUpdatePopup = () => {
    setShowPopup(false);
  }; 

  console.log(showPopup);
  const getLabtestDetails = async () => {
    
    setLoading(true);
    try {
      const { data } = await axios.get(
        "https://dentalguruadmin.doaguru.com/api/v1/admin/getLabTest",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setLoading(false);
      setLabTestList(data);
      setTotalLab(data.length)
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getLabtestDetails();
  }, [refreshTable]);

  console.log(labTestList);

  const updateLabData = async (e) => {

    e.preventDefault();
    try {
      const response = await axios.put(
        `https://dentalguruadmin.doaguru.com/api/v1/admin/updateLabTestDetails/${selectedItem.lab_tid}`,
        upLabTestField,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      cogoToast.success("Lab Test details updated successfully");
      getLabtestDetails();
      closeUpdatePopup();
    } catch (error) {
      console.log(error);
    }
  };

  const getListLabDetails = async () => {
    try {
      const { data } = await axios.get(
        `https://dentalguruadmin.doaguru.com/api/v1/admin/getLabList/${user.branch_name}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setLabList(data);
      
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getListLabDetails();
  }, []);

  const deleteLabTestData = async (id) => {
    try {
      const isConfirmed = window.confirm("Are you sure you want to delete?");
      if (isConfirmed) {
        const response = await axios.delete(
          `https://dentalguruadmin.doaguru.com/api/v1/admin/labTestDelete/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        cogoToast.success("lab test deleted successfully");
        getLabtestDetails();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchChange = (e) =>{
    setSearchTerm(e.target.value);
  }
  useEffect(() => {
    setCurrentPage(0);
  }, [keyword]);


  const searchFilter = labTestList.filter((lab)=>lab.test_name.toLowerCase().includes(keyword.toLowerCase()));


  const totalPages = Math.ceil(searchFilter.length / complaintsPerPage);

  const filterAppointDataByMonth = () => {
    const startIndex = currentPage * complaintsPerPage;
    const endIndex = startIndex + complaintsPerPage;
    return searchFilter?.slice(startIndex, endIndex);
  };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const displayedAppointments = filterAppointDataByMonth();
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <>
      <Container>
      <div className="mid-box">
          <div className="row mt-2 background">
            <div className="col-xxl-9 col-xl-9 col-lg-9 col-md-9 col-sm-12 col-12">
              <input
                type="text"
                placeholder="search here"
                className="inputser"
                value={keyword}
                onChange={(e) =>
                  setkeyword(e.target.value.toLowerCase())
                }
              />
            </div>
          </div>
        </div>
      {loading ? (
            <Lottie options={defaultOptions} height={300} width={400}></Lottie>
          ) : (
            <>
        <div class="table-responsive mt-4">
          <div>
         <p className="fw-bold">Total Lab Test - {totalLab +1 }</p>
       </div>
          <table class="table table-bordered">
            <thead className="table-head">
              <tr>
                <th>Lab Test Name</th>
                <th>Lab Test Code</th>
                <th>Total Waiting Days for Report</th>
                <th>Default Lab</th>

                <th>Cost</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayedAppointments?.map((item) => (
                <>
                  <tr className="table-row">
                    <td>{item.test_name}</td>
                    <td>{item.test_code}</td>
                    <td>{item.waiting_days}</td>
                    <td>{item.default_lab}</td>

                    <td>{item.test_cost}</td>
                    <td>
                      <button
                        className="btn btn-warning text-light"
                        onClick={() => openUpdatePopup(item)}
                      >
                        <TbEdit size={22}/>
                      </button>
                      <button
                        className="btn btn-danger mx-1"
                        onClick={() => deleteLabTestData(item.lab_tid)}
                      >
                        <AiFillDelete size={22}/>
                      </button>
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>

          <PaginationContainer>
                      <ReactPaginate
                        previousLabel={"Previous"}
                        nextLabel={"Next"}
                        breakLabel={"..."}
                        pageCount={totalPages}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={handlePageChange}
                        containerClassName={"pagination"}
                        activeClassName={"active"}
                      />
                       </PaginationContainer>

          {/* pop-up for creating notice */}
          <div className={`popup-container${showPopup ? " active" : ""}`}>
            <div className="popup">
              <h2>Update Lab Test Details</h2>
              <form className="d-flex flex-column" onSubmit={updateLabData}>
                <div className="container">
                  <div className="row">
                    <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                      <div className="d-flex flex-column w-100">
                        <label htmlFor="">Test Name</label>
                        <input
                          type="text"
                          placeholder={selectedItem.test_name}
                          className="rounded p-2"
                          name="test_name"
                          value={upLabTestField.test_name}
                          onChange={handleAddLabTestChange}
                        />
                      </div>
                    </div>
                    <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                      <div className="d-flex flex-column w-100">
                        <label htmlFor="">Test Code</label>
                        <input
                          type="text"
                          placeholder={selectedItem.test_code}
                          className="rounded p-2"
                          name="test_code"
                          value={upLabTestField.test_code}
                          onChange={handleAddLabTestChange}
                        />
                      </div>
                    </div>
                    <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                      <div className="d-flex flex-column w-100">
                        <label htmlFor="">Waiting for Report Days</label>
                        <input
                          type="text"
                          placeholder={selectedItem.waiting_days}
                          className="rounded p-2"
                          name="waiting_days"
                          value={upLabTestField.waiting_days}
                          onChange={handleAddLabTestChange}
                        />
                      </div>
                    </div>
                    <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                      <div className="d-flex flex-column w-100">
                        <label htmlFor="">Lab Name</label>
                        <select
                          className="rounded p-2"
                          name="default_lab"
                          value={upLabTestField.default_lab}
                          onChange={handleAddLabTestChange}
                        >
                          <option value="">-select-</option>
                          {labList?.map((item) => (
                            <>
                              <option value={item.lab_name}>
                                {item.lab_name}
                              </option>
                            </>
                          ))}
                        </select>
                      </div>
                    </div>
                    {/* <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                      <div className="d-flex flex-column w-100">
                        <label htmlFor="">Test Date</label>
                        <input
                          type="date"
                          placeholder={selectedItem.test_date}
                          className="rounded p-2"
                          name="test_date"
                          value={upLabTestField.test_date}
                          onChange={handleAddLabTestChange}
                        />
                      </div>
                    </div> */}
                    <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                      <div className="d-flex flex-column w-100">
                        <label htmlFor="">Test Cost</label>
                        <input
                          type="text"
                          placeholder={selectedItem.test_cost}
                          className="rounded p-2"
                          name="test_cost"
                          value={upLabTestField.test_cost}
                          onChange={handleAddLabTestChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-center">
                  <button type="submit" className="btn btn-success mt-2">
                    Save
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger mt-2 ms-2"
                    onClick={closeUpdatePopup}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* popup for updating notice */}
        </div>
        </>
          )}
      </Container>
    </>
  );
};

export default LabTest;
const Container = styled.div`
  .popup-container {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    align-items: center;
    justify-content: center;
  }

  .popup-container.active {
    display: flex;
    background-color: #00000075;
  }

  .popup {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
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
    color: #007bff;
    cursor: pointer;
    text-decoration: none;
  }

  .pagination li.active a {
    background-color: #007bff;
    color: white;
    border: 1px solid #007bff;
  }

  .pagination li.disabled a {
    color: #ddd;
    cursor: not-allowed;
  }

  .pagination li a:hover:not(.active) {
    background-color: #ddd;
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
            border-radius: 4px;
            box-sizing: border-box;
            transition: border-color 0.3s ease;
        }

        input:focus {
            border-color: #007bff; /* Change border color on focus */
        }
`;