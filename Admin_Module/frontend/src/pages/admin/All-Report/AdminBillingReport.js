// import React, { useEffect, useState } from "react";
// import styled from "styled-components";
// // import Sider from "../../../components/Sider";
// // import Header from "../../../components/Header";
// import { useLocation } from "react-router-dom";
// import { IoMdArrowRoundBack } from "react-icons/io";
// // import BranchSelector from "../../../components/BranchSelector";
// import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";
// import { utils, writeFile } from "xlsx";
// import HeaderAdmin from "../HeaderAdmin";
// import SiderAdmin from "../SiderAdmin";

// const AdminBillingReport = () => {
//   const location = useLocation();
//   const dispatch = useDispatch();
//   const user = useSelector((state) => state.user.currentUser);
//   console.log(user);
//   const [listBills, setListBills] = useState([]);
//   const [fromDate, setFromDate] = useState("");
//   const [toDate, setToDate] = useState("");

//   const getBillDetailsList = async () => {
//     try {
//       const { data } = await axios.get(
//         `https://dentalguruadmin.doaguru.com/api/v1/admin/getBillsByBranch/${user.branch_name}`,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${user.token}`,
//           },
//         }
//       );
//       console.log(data);
//       setListBills(data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const goBack = () => {
//     window.history.go(-1);
//   };

//   const todayDate = new Date();

//   // Get year, month, and date
//   const year = todayDate.getFullYear();
//   const month = String(todayDate.getMonth() + 1).padStart(2, "0"); // Adding 1 to adjust month, padStart ensures 2 digits
//   const date = String(todayDate.getDate()).padStart(2, "0"); // Ensuring 2 digits

//   // Format as 'YYYY-MM-DD'
//   const formattedDate = `${year}-${month}-${date}`;

//   console.log(formattedDate.slice(0, 7));

//   const filterBillDataByMonth = listBills?.filter((item) => {
//     return (
//       item.bill_date?.split("T")[0].slice(0, 7) === formattedDate.slice(0, 7)
//     );
//   });

//   console.log(filterBillDataByMonth);

//   const downloadBillingData = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await axios.post(
//         `https://dentalguruadmin.doaguru.com/api/v1/admin/downloadBillingReportByTime/${user.branch_name}`,
//         { fromDate, toDate },
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${user.token}`,
//           },
//         }
//       );
//       console.log(data);
//       // setSelectedEarn(data);
//       if (Array.isArray(data)) {
//         // Create a new workbook
//         const workbook = utils.book_new();

//         // Convert the report data to worksheet format
//         const worksheet = utils.json_to_sheet(data);

//         utils.book_append_sheet(workbook, worksheet, `Billing Report`);
//         writeFile(workbook, `${fromDate} - ${toDate}-billing-report.xlsx`);
//         console.log(data);
//       } else {
//         console.error("data is not an array");
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getBillDetailsList();
//   }, [user.branch_name]);

//   return (
//     <>
//       <Container>
//         <HeaderAdmin />
//         <div className="main">
//           <div className="container-fluid">
//             <div className="row flex-nowrap ">
//               <div className="col-lg-1 col-1 p-0">
//                 <SiderAdmin />
//               </div>
//               <div className="col-lg-11 col-11 ps-0">
//                 <div className="container-fluid mt-3">
//                   <div className="d-flex justify-content-between">
//                     {/* <BranchSelector /> */}
//                   </div>
//                 </div>
//                 <div className="container-fluid mt-3">
//                   <button className="btn btn-success" onClick={goBack}>
//                     <IoMdArrowRoundBack /> Back
//                   </button>
//                   <div className="container-fluid">
//                     <div className="row mt-3">
//                       {/* <div className="col-1"></div> */}

//                       <div className="col-12">
//                         <nav class="navbar navbar-expand-lg bg-body-tertiary">
//                           <div class="container d-flex justify-content-center">
//                             <h2 className="">Billing Reports</h2>
//                           </div>
//                         </nav>
//                       </div>
//                       <div className="container">
//                         <div class="table-responsive mt-4">
//                           <div className="d-flex justify-content-between mb-2">
//                             <form onSubmit={downloadBillingData}>
//                               <div className="d-flex justify-content-between">
//                                 <div>
//                                   <input
//                                     type="date"
//                                     name=""
//                                     id=""
//                                     className="p-2 rounded"
//                                     onChange={(e) =>
//                                       setFromDate(e.target.value)
//                                     }
//                                   />
//                                 </div>
//                                 <div className="mx-2">To</div>
//                                 <div>
//                                   <input
//                                     type="date"
//                                     name=""
//                                     id=""
//                                     className="p-2 rounded"
//                                     onChange={(e) => setToDate(e.target.value)}
//                                   />
//                                 </div>
//                                 <button
//                                   className="btn btn-warning mx-2"
//                                   type="submit"
//                                 >
//                                   Download Report
//                                 </button>
//                               </div>
//                             </form>

//                             {/* <div className="d-flex justify-content-between">
//                               <div>
//                                 <select
//                                   class="form-select"
//                                   aria-label="Default select example"
//                                 >
//                                   <option selected>select year</option>
//                                   <option value="1">2024</option>
//                                   <option value="2">2023</option>
//                                   <option value="3">2022</option>
//                                 </select>
//                               </div>
//                               <div>
//                                 <select
//                                   class="form-select"
//                                   aria-label="Default select example"
//                                 >
//                                   <option selected>select Month</option>
//                                   <option value="1">Jan</option>
//                                   <option value="2">Feb</option>
//                                   <option value="3">Mar</option>
//                                   <option value="1">Apr</option>
//                                   <option value="2">May</option>
//                                   <option value="3">June</option>
//                                   <option value="1">July</option>
//                                   <option value="2">Aug</option>
//                                   <option value="3">Sept</option>
//                                   <option value="1">Oct</option>
//                                   <option value="2">Nov</option>
//                                   <option value="3">Dec</option>
//                                 </select>
//                               </div>
//                             </div> */}
//                           </div>
//                           <div className="container-fluid mt-3">
//                             <div class="table-responsive rounded">
//                               <table class="table table-bordered rounded shadow">
//                                 <thead className="table-head">
//                                   <tr>
//                                     <th className="table-sno">Bill ID</th>
//                                     <th>Bill Date</th>
//                                     <th className="table-small">
//                                       Patient UHID
//                                     </th>
//                                     <th className="table-small">
//                                       Patient Name
//                                     </th>
//                                     <th className="table-small">
//                                       Patient Mobile
//                                     </th>
//                                     <th className="table-small">
//                                       Patient Email
//                                     </th>
//                                     {/* <th className="table-small">Treatment</th>
//                                     <th className="table-small">
//                                       Treatment Status
//                                     </th>
//                                     <th className="table-small">
//                                       Drugs with Quantity
//                                     </th> */}
//                                     <th className="table-small">
//                                       Total Amount
//                                     </th>
//                                     <th>Paid Amount</th>
//                                     <th>Payment Status</th>
//                                     <th>Payment Date & Time</th>
//                                     {/* <th>Edit Details</th>
//                                     <th className="table-small">Delete</th> */}
//                                   </tr>
//                                 </thead>
//                                 <tbody>
//                                   {filterBillDataByMonth
//                                     ?.filter((item) => {
//                                       const billDate =
//                                         item.bill_date?.split("T")[0]; // Extracting the date part
//                                       if (fromDate && toDate) {
//                                         return (
//                                           billDate >= fromDate &&
//                                           billDate <= toDate
//                                         );
//                                       } else {
//                                         return true; // If no date range is selected, show all items
//                                       }
//                                     })
//                                     .map((item) => (
//                                       <>
//                                         <tr className="table-row">
//                                           <td className="table-sno">
//                                             {item.bill_id}
//                                           </td>
//                                           <td className="table-small">
//                                             {item.bill_date?.split("T")[0]}
//                                           </td>
//                                           <td className="table-small">
//                                             {item.uhid}
//                                           </td>
//                                           <td className="table-small">
//                                             {item.patient_name}
//                                           </td>
//                                           <td>{item.patient_mobile}</td>
//                                           <td>{item.patient_email}</td>
//                                           {/* <td>{item.treatment}</td>
//                                         <td>{item.treatment_status}</td>
//                                         <td>{item.drugs_quantity}</td> */}
//                                           <td className="table-small">
//                                             {item.total_amount}
//                                           </td>
//                                           <td className="table-small">
//                                             {item.paid_amount}
//                                           </td>
//                                           <td>{item.payment_status}</td>
//                                           <td>
//                                             {
//                                               item.payment_date_time?.split(
//                                                 "T"
//                                               )[0]
//                                             }{" "}
//                                             -{" "}
//                                             {item.payment_date_time
//                                               ?.split("T")[1]
//                                               ?.split(".")[0]
//                                               ?.slice(0, 5)}
//                                           </td>
//                                           {/* <td className="table-small">
//                                           <button
//                                             className="btn btn-warning fw-bold"
//                                             onClick={() =>
//                                               openUpdatePopup(item.bill_id)
//                                             }
//                                           >
//                                             Edit
//                                           </button>
//                                         </td>
//                                         <td className="table-small">
//                                           <button
//                                             className="btn btn-danger"
//                                             onClick={() =>
//                                               deleteBillData(item.bill_id)
//                                             }
//                                           >
//                                             Delete
//                                           </button>
//                                         </td> */}
//                                         </tr>
//                                       </>
//                                     ))}
//                                 </tbody>
//                               </table>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
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

// export default AdminBillingReport;
// const Container = styled.div`
//   .select-style {
//     border: none;
//     background-color: #22a6b3;
//     font-weight: bold;
//     color: white;
//   }

//   th {
//     background-color: #1abc9c;
//     color: white;
//   }
// `;




import React, { useState } from "react";
import styled from "styled-components";

import { IoMdArrowRoundBack } from "react-icons/io";

import { Nav } from "react-bootstrap";
import TreatBillReport from "./BillReport/TreatBillReport";
import LabReport from "./BillReport/LabReport";
import OpdReport from "./BillReport/OpdReport";
import HeaderAdmin from "../HeaderAdmin";
import SiderAdmin from "../SiderAdmin";


const BillingReport = () => {
  const initialTab = localStorage.getItem("selectedTab") || "tab1";
  const [selectedTab, setSelectedTab] = useState(initialTab);

  const goBack = () => {
    window.history.go(-1);
  };

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
              <div className="col-lg-11 col-md-11 col-11 ps-0 mx-3" style={{marginTop:"5rem"}}>
                {/* <div className="container-fluid mt-3">
                  <div className="d-flex justify-content-between mx-2">
                    <BranchSelector />
                  </div>
                </div> */}
                <div className="container-fluid mt-3">
                  <button className="btn btn-success" onClick={goBack}>
                    <IoMdArrowRoundBack /> Back
                  </button>
                  <h3 className="text-center">Bill Report</h3>
                  <div className="container-fluid mt-5 navsect background">
                    <Nav
                      className="d-flex justify-content-between side-cont"
                      activeKey={selectedTab}
                      onSelect={(selectedKey) => setSelectedTab(selectedKey)}
                    >
                      <div className="d-flex flex-row">
                        <Nav.Item>
                          <Nav.Link eventKey="tab1" className="navlink shadow">
                            Treatment Bills
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link
                            eventKey="tab2"
                            className={`navlink shadow mx-2 `}
                          >
                            Lab Bills
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link
                            eventKey="tab3"
                            className={`navlink shadow`}
                          >
                            OPD Bills
                          </Nav.Link>
                        </Nav.Item>
                      </div>
                      <div>
                        {/* <p className="fw-bold">Total Lab - 09</p> */}
                      </div>
                    </Nav>
                    <div className="flex-grow-1 p-3 mainback">
                      {selectedTab === "tab1" && <TreatBillReport />}
                      {selectedTab === "tab2" && <LabReport />}
                      {selectedTab === "tab3" && <OpdReport />}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default BillingReport;
const Container = styled.div`
  .navlink.active {
    background-color: #f53237 !important;
    border-radius: 1rem;
    color: white !important;
  }

  .navlink {
    background-color: #ffff !important;
    color: black;
    border-radius: 1rem;
  }
`;