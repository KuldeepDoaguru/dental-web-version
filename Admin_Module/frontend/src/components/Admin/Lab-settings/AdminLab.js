// import axios from "axios";
// import cogoToast from "cogo-toast";
// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import styled from "styled-components";

// const AdminLab = () => {
//   const user = useSelector((state) => state.user.currentUser);
//   console.log(user);
//   const [showPopup, setShowPopup] = useState(false);
//   const [branchList, setBranchList] = useState([]);
//   const { refreshTable } = useSelector((state) => state.user);
//   const [selectedItem, setSelectedItem] = useState([]);
//   const [labList, setLabList] = useState([]);
//   const [totalLab, setTotalLab] = useState(0);
//   const [upLabField, setUpLabField] = useState({
//     branch: "",
//     lab_name: "",
//     lab_type: "",
//     lab_contact: "",
//     lab_email: "",
//     address: "",
//     status: "",
   
//   });

//   const handleAddLabChange = (event) => {
//     const { name, value } = event.target;
//     setUpLabField((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   console.log(upLabField);

//   const openUpdatePopup = (item) => {
//     setSelectedItem(item);
//     console.log("open pop up");
//     const updatedLabField = {
//       branch: item.branch, // Assuming item.branch holds branch data
//       lab_name: item.lab_name,
//       lab_type: item.lab_type,
//       lab_contact: item.lab_contact,
//       lab_email: item.lab_email,
//       address: item.address,
//       status: item.status,
//     };
//     setUpLabField(updatedLabField);
//     // setUpLabField(item)
//     setShowPopup(true);
//   };

//   console.log(selectedItem);

//   const closeUpdatePopup = () => {
//     setShowPopup(false);
//   };

//   console.log(showPopup);

//   const getListLabDetails = async () => {
//     try {
//       const { data } = await axios.get(
//         `https://dentalguruadmin.doaguru.com/api/v1/admin/getLabList/${user.branch_name}`,
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
//   }, [refreshTable]);

//   console.log(labList);

//   const updateLabData = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.put(
//         `https://dentalguruadmin.doaguru.com/api/v1/admin/updateLabDetails/${selectedItem.lab_id}`,
//         upLabField,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${user.token}`,
//           },
//         }
//       );
//       cogoToast.success("Lab details updated successfully");
//       getListLabDetails();
//       closeUpdatePopup();
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const deleteLabData = async (id) => {
//     try {
//       const isConfirmed = window.confirm("Are you sure you want to delete?");
//       if (isConfirmed) {
//         const response = await axios.delete(
//           `https://dentalguruadmin.doaguru.com/api/v1/admin/labDelete/${id}`,
//           {
//             headers: {
//               "Content-Type": "multipart/form-data",
//               Authorization: `Bearer ${user.token}`,
//             },
//           }
//         );
//         cogoToast.success("lab deleted successfully");
//         getListLabDetails();
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const getBranchList = async () => {
//     try {
//       const { data } = await axios.get(
//         "https://dentalguruadmin.doaguru.com/api/v1/admin/getBranch",
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${user.token}`,
//           },
//         }
//       );
//       console.log(data);
//       setBranchList(data);
//       setTotalLab(data.length ); 
//     } catch (error) {
//       console.log(error);
//     }
//   };
 

//   useEffect(() => {
//     getBranchList();
//   }, []);

//   console.log(branchList);
//   return (
//     <>
//     <Container>
//       <div class="table-responsive mt-4">
//         <div>
//           <p className="fw-bold">Total Lab - {totalLab + 1}</p>
//         </div>
//         <table class="table table-bordered">
//           <thead className="table-head">
//             <tr>
//               <th>Lab Name</th>
//               <th>Lab Type</th>
//               <th>Contact</th>
//               <th>Email</th>
//               <th>Address</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {labList?.map((item) => (
//               <tr className="table-row" key={item.lab_id}> {/* Added key prop */}
//                 <td>{item.branch_name}</td>
//                 <td>{item.lab_name}</td>
//                 <td>{item.lab_type}</td>
//                 <td>{item.lab_contact}</td>
//                 <td>{item.lab_email}</td>
//                 <td>{item.address}</td>
//                 <td>{item.status}</td>
//                 <td>
//                   <button
//                     className="btn btn-warning"
//                     onClick={() => openUpdatePopup(item)}
//                   >
//                     Edit
//                   </button>
//                   <button
//                     className="btn btn-danger mx-1"
//                     onClick={() => deleteLabData(item.lab_id)}
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
  
//         {/* Pop-up for updating lab details */}
//         <div className={`popup-container${showPopup ? " active" : ""}`}>
//           <div className="popup">
//             <h2>Update Lab Details</h2>
//             <form className="d-flex flex-column" onSubmit={updateLabData}>
//               <div className="d-flex flex-column">
//                 <div className="d-flex flex-column">
//                   <label htmlFor="">Select Branch</label>
//                   <select
//                     className="rounded p-2"
//                     name="branch"
//                     value={upLabField.branch}
//                     onChange={handleAddLabChange}
//                   >
//                     <option value="">-select-</option>
//                     {branchList?.map((item) => (
//                       <option key={item.branch} value={item.branch}>
//                         {item.branch_name}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//                 <div className="d-flex mt-2">
//                   <div className="d-flex flex-column">
//                     <label htmlFor="">Lab Name</label>
//                     <input
//                       type="text"
//                       placeholder="Lab Name"
//                       className="rounded p-2"
//                       name="lab_name"
//                       value={upLabField.lab_name}
//                       onChange={handleAddLabChange}
//                     />
//                   </div>
//                   <div className="d-flex flex-column mx-2 w-100">
//                     <label htmlFor="">Type</label>
//                     <select
//                       className="typeset w-100"
//                       name="lab_type"
//                       value={upLabField.lab_type}
//                       onChange={handleAddLabChange}
//                     >
//                       <option value="">-select-</option>
//                       <option value="internal">Internal</option>
//                       <option value="external">External</option>
//                     </select>
//                   </div>
//                 </div>
//                 <br />
//                 <div className="d-flex">
//                   <div className="d-flex flex-column">
//                     <label htmlFor="">Number</label>
//                     <input
//                       type="text"
//                       placeholder="contact number"
//                       className="rounded p-2"
//                       name="lab_contact"
//                       value={upLabField.lab_contact}
//                       onChange={handleAddLabChange}
//                     />
//                   </div>
//                   <div className="d-flex flex-column mx-2">
//                     <label htmlFor="">Email</label>
//                     <input
//                       type="email"
//                       placeholder="add email"
//                       className="rounded p-2"
//                       name="lab_email"
//                       value={upLabField.lab_email}
//                       onChange={handleAddLabChange}
//                     />
//                   </div>
//                 </div>
//                 <br />
//                 <div className="d-flex flex-column">
//                   <label htmlFor="">Address</label>
//                   <textarea
//                     name="address"
//                     id=""
//                     cols="30"
//                     rows="3"
//                     value={upLabField.address}
//                     onChange={handleAddLabChange}
//                   ></textarea>
//                 </div>
//                 <br />
//                 <div className="d-flex flex-column w-100">
//                   <label htmlFor="">Status</label>
//                   <select
//                     className="typeset w-100"
//                     name="status"
//                     value={upLabField.status}
//                     onChange={handleAddLabChange}
//                   >
//                     <option value="">-select-</option>
//                     <option value="pending">Pending</option>
//                     <option value="approved">Approve</option>
//                   </select>
//                 </div>
//               </div>
  
//               <div className="d-flex justify-content-evenly">
//                 <button type="submit" className="btn btn-success mt-2">
//                   Save
//                 </button>
//                 <button
//                   type="button"
//                   className="btn btn-danger mt-2"
//                   onClick={closeUpdatePopup}
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </Container>
//   </>
  
//   );
// };

// export default AdminLab;
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


const Lab = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [labList, setLabList] = useState([]);
  const [branchList, setBranchList] = useState([]);
  const [selectedItem, setSelectedItem] = useState();
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user.currentUser);
  const [keyword, setkeyword] = useState("");
  const { refreshTable } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const complaintsPerPage = 8; // Number of complaints per page
  const [currentPage, setCurrentPage] = useState(0); // Start from the first page
  const [totalLab, setTotalLab] = useState(0);
  
  const [upLabField, setUpLabField] = useState({
    branch: "",
    name: "",
    type: "",
    contact: "",
    email: "",
    address: "",
    status: "",
  });

  const handleAddLabChange = (event) => {
    const { name, value } = event.target;
    setUpLabField((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  console.log(upLabField);

  const openUpdatePopup = (item) => {
    setSelectedItem(item);
    console.log("open pop up");
    setUpLabField({
      branch: item.branch_name,
      name: item.lab_name,
      type: item.lab_type,
      contact: item.lab_contact,
      email: item.lab_email,
      address: item.address,
      status: item.status,
    });
    setShowPopup(true);
  };

  const closeUpdatePopup = () => {
    setShowPopup(false);
  };

  console.log(showPopup);
  const getListLabDetails = async () => {
    setLoading(true);
    try {
      const data = await axios.get(
        `https://dentalguruadmin.doaguru.com/api/v1/admin/getLabList/${user.branch_name}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setLoading(false);
      setLabList(data.data);
      setTotalLab(data.data.length); 
      console.log(data.data);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  console.log(labList);
  console.log(selectedItem);

  useEffect(() => {
    getListLabDetails();
  }, []);

  useEffect(() => {
    getListLabDetails();
  }, [user.branch_name]);

  const updateLabData = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `https://dentalguruadmin.doaguru.com/api/v1/admin/updateLabDetails/${selectedItem.lab_id}`,
        upLabField,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      cogoToast.success("Lab details updated successfully");
      getListLabDetails();
      closeUpdatePopup();
    } catch (error) {
      console.log(error);
    }
  };

  console.log(selectedItem);

  const deleteLabData = async (id) => {
    try {
      const isConfirmed = window.confirm("Are you sure you want to delete?");
      if (isConfirmed) {
        const response = await axios.delete(
          `https://dentalguruadmin.doaguru.com/api/v1/admin/labDelete/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        cogoToast.success("lab deleted successfully");
        getListLabDetails();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getBranchList = async () => {
    try {
      const response = await axios.get(
        "https://dentalguruadmin.doaguru.com/api/v1/admin/getBranch"
      );
      console.log(response.data);
      setBranchList(response.data);
      
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBranchList();
  }, []);

  console.log(branchList); 

  const handleSearchChange = (e) =>{
    setSearchTerm(e.target.value);
  }

  useEffect(() => {
    setCurrentPage(0);
  }, [keyword]);


  const searchFilter = labList.filter((lab)=>lab.lab_name.toLowerCase().includes(keyword.toLowerCase()));

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

  // useEffect(()=>{
  //   setUpLabField({
  //     branch: labList.branch_name,
  //     name: labList.name,
  //     type: labList.type,
  //     contact: labList.contact,
  //     email: labList.email,
  //     address: labList.address,
  //     status: labList.status,
  //   })
  // }, [labList]);

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
           <p className="fw-bold">Total Lab - {totalLab}</p>
         </div>
          <table class="table table-bordered">
            <thead className="table-head">
              <tr>
                <th>Branch</th>
                <th>Lab Name</th>
                <th>Lab Type</th>
                <th>Contact</th>
                <th>Email</th>
                <th>Address</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayedAppointments?.map((item) => (
                <>
                  <tr className="table-row">
                    <td>{item.branch_name}</td>
                    <td>{item.lab_name}</td>
                    <td>{item.lab_type}</td>
                    <td>{item.lab_contact}</td>
                    <td>{item.lab_email}</td>
                    <td>{item.address}</td>
                    <td>{item.status}</td>
                    <td>
                      <button
                        className="btn btn-warning text-light"
                        onClick={() => openUpdatePopup(item)}
                      >
                        <TbEdit size={22}/>
                      </button>
                      <button
                        className="btn btn-danger mx-1"
                        onClick={() => deleteLabData(item.lab_id)}
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

          {/* pop-up for creating notice */}
          <div className={`popup-container${showPopup ? " active" : ""}`}>
            <div className="popup">
              <h2>Update Lab Details</h2>
              <form className="d-flex flex-column" onSubmit={updateLabData}>
                <div className="d-flex flex-column">
                  <div className="d-flex flex-column">
                    <label htmlFor="">Select Branch</label>
                    <select
                      className="rounded p-2"
                      name="branch"
                      value={upLabField.branch}
                      onChange={handleAddLabChange}
                    >
                      <option value="">-select-</option>
                      {branchList?.map((item) => (
                        <>
                          <option value={item.branch_name}>
                            {item.branch_name}
                          </option>
                        </>
                      ))}
                    </select>

                    {/* <input
                      type="text"
                      placeholder="Lab Name"
                      className="rounded p-2"
                      name="name"
                      value={upLabField.name}
                      onChange={handleAddLabChange}
                    /> */}
                  </div>
                  <div className="d-flex mt-2">
                    <div className="d-flex flex-column">
                      <label htmlFor="">Lab Name</label>
                      <input
                        type="text"
                        placeholder="Lab Name"
                        className="rounded p-2"
                        name="name"
                        value={upLabField.name}
                        onChange={handleAddLabChange}
                        readOnly
                      />
                    </div>
                    <div className="d-flex flex-column mx-2 mt-2 w-100">
                      <label htmlFor="">Type</label>
                      <select
                        className="typeset w-100"
                        name="type"
                        value={upLabField.type}
                        onChange={handleAddLabChange}
                      >
                        <option value="">-select-</option>
                        <option value="internal">Internal</option>
                       
                      </select>
                    </div>
                  </div>
                  <br />
                  <div className="d-flex">
                    <div className="d-flex flex-column">
                      <label htmlFor="">Number</label>
                      <input
                        type="text"
                        placeholder="contact number"
                        className="rounded p-2"
                        name="contact"
                        value={upLabField.contact}
                        onChange={handleAddLabChange}
                      />
                    </div>
                    <div className="d-flex flex-column mx-2">
                      <label htmlFor="">Email</label>
                      <input
                        type="email"
                        placeholder="add email"
                        className="rounded p-2"
                        name="email"
                        value={upLabField.email}
                        onChange={handleAddLabChange}
                      />
                    </div>
                  </div>
                  <br />
                  <div className="d-flex flex-column">
                    <label htmlFor="">Address</label>
                    <textarea
                      name="address"
                      id=""
                      cols="30"
                      rows="3"
                      value={upLabField.address}
                      onChange={handleAddLabChange}
                    ></textarea>
                  </div>
                  <br />
                  <div className="d-flex flex-column w-100">
                    <label htmlFor="">Status</label>
                    <select
                      className="typeset w-100"
                      name="status"
                      value={upLabField.status}
                      onChange={handleAddLabChange}
                    >
                      <option value="">-select-</option>
                      <option value="pending">Pending</option>
                      <option value="approved">Approve</option>
                    </select>
                  </div>
                </div>

                <div className="d-flex justify-content-evenly">
                  <button type="submit" className="btn btn-success mt-2">
                    Save
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger mt-2"
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

export default Lab;
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
`;
