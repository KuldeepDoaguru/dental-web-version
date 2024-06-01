import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
// import Header from "../../../components/Header";
// import Sider from "../../../components/Sider";
import { IoMdArrowRoundBack } from "react-icons/io";
import Branches from "../../Branches";
// import BranchSelector from "../../../components/BranchSelector";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { utils, writeFile } from "xlsx";
import HeaderAdmin from "../HeaderAdmin";
import SiderAdmin from "../SiderAdmin";

const AdminInventoryReport = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  console.log(user);
  const location = useLocation();
  const [appointmentList, setAppointmentList] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const getPurchaseList = async () => {
    try {
      const { data } = await axios.get(
        `https://dentalguruadmin.doaguru.com/api/v1/admin/getPurInventoryByBranch/${user.branch_name}`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setAppointmentList(data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(appointmentList);

  const todayDate = new Date();

  // Get year, month, and date
  const year = todayDate.getFullYear();
  const month = String(todayDate.getMonth() + 1).padStart(2, "0"); // Adding 1 to adjust month, padStart ensures 2 digits
  const date = String(todayDate.getDate()).padStart(2, "0"); // Ensuring 2 digits

  // Format as 'YYYY-MM-DD'
  const formattedDate = `${year}-${month}-${date}`;

  console.log(formattedDate.slice(0, 7));

  //filterforexpenses
  const filterForExpenses = appointmentList?.filter((item) => {
    return (
      item.purchase_date?.split("T")[0].slice(0, 7) ===
      formattedDate.slice(0, 7)
    );
  });

  const downloadExpenseData = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `https://dentalguruadmin.doaguru.com/api/v1/admin/downloadExpenseReportByTime/${user.branch_name}`,
        { fromDate: fromDate, toDate: toDate },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log(data);
      // setSelectedEarn(data);
      if (Array.isArray(data)) {
        // Create a new workbook
        const workbook = utils.book_new();

        // Convert the report data to worksheet format
        const worksheet = utils.json_to_sheet(data);

        utils.book_append_sheet(workbook, worksheet, `Purchase Report`);
        writeFile(workbook, `${fromDate} - ${toDate}-purchase-report.xlsx`);
        console.log(data);
      } else {
        console.error("data is not an array");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPurchaseList();
  }, [user.branch_name]);

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
              <div className="col-lg-1 col-1 p-0">
                <SiderAdmin />
              </div>
              <div className="col-lg-11 col-11 ps-0">
                <div className="container-fluid mt-3">
                  <div className="d-flex justify-content-between">
                    {/* <BranchSelector /> */}
                  </div>
                </div>
                <div className="container-fluid mt-3">
                  <button className="btn btn-success" onClick={goBack}>
                    <IoMdArrowRoundBack /> Back
                  </button>
                  <div className="container-fluid">
                    <div className="row mt-3">
                      {/* <div className="col-1"></div> */}

                      <div className="col-12">
                        <nav class="navbar navbar-expand-lg bg-body-tertiary">
                          <div class="container d-flex justify-content-center">
                            <h2 className="">Inventory Reports</h2>
                          </div>
                        </nav>
                      </div>
                      <div className="container">
                        <div class="table-responsive mt-4">
                          <div className="d-flex justify-content-between mb-2">
                            <form onSubmit={downloadExpenseData}>
                              <div className="d-flex justify-content-between">
                                <div>
                                  <input
                                    type="date"
                                    name=""
                                    id=""
                                    className="p-2 rounded"
                                    onChange={(e) =>
                                      setFromDate(e.target.value)
                                    }
                                  />
                                </div>
                                <div className="mx-2">To</div>
                                <div>
                                  <input
                                    type="date"
                                    name=""
                                    id=""
                                    className="p-2 rounded"
                                    onChange={(e) => setToDate(e.target.value)}
                                  />
                                </div>
                                <button className="btn btn-warning mx-2">
                                  Download Report
                                </button>
                              </div>
                            </form>

                            {/* <div className="d-flex justify-content-between">
                              <div>
                                <select
                                  class="form-select"
                                  aria-label="Default select example"
                                >
                                  <option selected>select year</option>
                                  <option value="1">2024</option>
                                  <option value="2">2023</option>
                                  <option value="3">2022</option>
                                </select>
                              </div>
                              <div>
                                <select
                                  class="form-select"
                                  aria-label="Default select example"
                                >
                                  <option selected>select Month</option>
                                  <option value="1">Jan</option>
                                  <option value="2">Feb</option>
                                  <option value="3">Mar</option>
                                  <option value="1">Apr</option>
                                  <option value="2">May</option>
                                  <option value="3">June</option>
                                  <option value="1">July</option>
                                  <option value="2">Aug</option>
                                  <option value="3">Sept</option>
                                  <option value="1">Oct</option>
                                  <option value="2">Nov</option>
                                  <option value="3">Dec</option>
                                </select>
                              </div>
                            </div> */}
                          </div>
                          <div
                            className="container-fluid mt-1 rounded"
                            style={{ overflowX: "auto" }}
                          >
                            <div class="table-responsive rounded">
                              <table class="table table-bordered rounded shadow">
                                <thead className="table-head">
                                  <tr>
                                    <th className="thead">Purchase ID</th>
                                    <th className="thead">Item Code</th>
                                    <th className="thead">HSN Code</th>
                                    <th className="thead">Item Name</th>
                                    <th className="thead">Item Type</th>
                                    <th className="thead">MRP</th>
                                    <th className="thead">Purchase Quantity</th>
                                    <th className="thead">Discount</th>
                                    <th className="thead">Total Amount</th>
                                    <th className="thead">Purchase Date</th>

                                    <th className="thead">Available Stock</th>
                                    <th className="thead">
                                      Low Stock Threshhold
                                    </th>
                                    <th className="thead">Distributor Name</th>
                                    <th className="thead">
                                      Distributor Number
                                    </th>
                                    {/* <th
                              
                              
                            >
                              Edit
                            </th> */}
                                  </tr>
                                </thead>
                                <tbody>
                                  {filterForExpenses
                                    ?.filter((item) => {
                                      const billDate =
                                        item.purchase_date?.split("T")[0]; // Extracting the date part
                                      if (fromDate && toDate) {
                                        return (
                                          billDate >= fromDate &&
                                          billDate <= toDate
                                        );
                                      } else {
                                        return true; // If no date range is selected, show all items
                                      }
                                    })
                                    .map((item) => (
                                      <>
                                        <tr className="table-row">
                                          <td className="thead">
                                            {item.pur_id}
                                          </td>
                                          <td className="thead">
                                            {item.item_code}
                                          </td>
                                          <td className="thead">
                                            {item.HSN_code}
                                          </td>
                                          <td className="thead">
                                            {item.item_name}
                                          </td>
                                          <td className="thead">
                                            {item.item_category}
                                          </td>
                                          <td className="thead">
                                            {item.item_mrp}
                                          </td>
                                          <td className="thead">
                                            {item.pur_quantity}
                                          </td>
                                          <td className="thead">
                                            {item.discount}
                                          </td>
                                          <td className="thead">
                                            {item.total_amount}
                                          </td>
                                          <td className="thead">
                                            {item.purchase_date?.split("T")[0]}
                                          </td>
                                          <td className="thead">
                                            {item.available_stock}
                                          </td>
                                          <td className="thead">
                                            {item.low_stock_threshhold}
                                          </td>
                                          <td className="thead">
                                            {item.distributor_name}
                                          </td>
                                          <td className="thead">
                                            {item.distributor_number}
                                          </td>
                                        </tr>
                                      </>
                                    ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
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

export default AdminInventoryReport;
const Container = styled.div`
  .select-style {
    border: none;
    background-color: #22a6b3;
    font-weight: bold;
    color: white;
  }
  th {
    background-color: #1abc9c;
    color: white;
  }
`;
