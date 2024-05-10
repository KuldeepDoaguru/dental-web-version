import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import Sider from "../../components/Sider";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import BranchSelector from "../../components/BranchSelector";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import cogoToast from "cogo-toast";

const Inventory = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  console.log(`User Name: ${user.name}, User ID: ${user.id}`);
  console.log("User State:", user);
  const branch = useSelector((state) => state.branch);
  console.log(`User Name: ${branch.name}`);
  const [invList, setInvList] = useState([]);
  const [keyword, setkeyword] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSortOption, setSelectedSortOption] = useState("RecentlyAdded");

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const getPurchaseList = async () => {
    try {
      const { data } = await axios.get(
        `https://dentalgurusuperadmin.doaguru.com/api/v1/super-admin/getPurInventoryByBranch/${branch.name}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log(data);
      setInvList(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPurchaseList();
  }, [branch.name]);

  const sortByItemNameAZ = (a, b) => {
    if (a.item_name < b.item_name) return -1;
    if (a.item_name > b.item_name) return 1;
    return 0;
  };

  // Define a function for sorting by item name (Z to A)
  const sortByItemNameZA = (a, b) => {
    if (a.item_name > b.item_name) return -1;
    if (a.item_name < b.item_name) return 1;
    return 0;
  };

  // Define a function for sorting by total amount (Lowest to Highest)
  const sortByTotalAmountLowToHigh = (a, b) => {
    return a.total_amount - b.total_amount;
  };

  // Define a function for sorting by total amount (Highest to Lowest)
  const sortByTotalAmountHighToLow = (a, b) => {
    return b.total_amount - a.total_amount;
  };

  const deletePurInvDetails = async (id) => {
    try {
      const response = await axios.delete(
        `https://dentalgurusuperadmin.doaguru.com/api/v1/super-admin/deletePurInvoice/${branch.name}/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log(response);
      cogoToast.success("Successfully Deleted the Data");
      getPurchaseList();
    } catch (error) {
      console.log(error);
    }
  };

  const downloadInvoice = async (file) => {
    console.log(file);
    try {
      const response = await axios.get(
        `https://dentalgurusuperadmin.doaguru.com/api/v1/super-admin/downloadBillRecById/${file}`,
        {
          responseType: "blob",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      let contentType;
      if (file.endsWith(".pdf")) {
        contentType = "application/pdf";
      } else if (file.endsWith(".jpg") || file.endsWith(".jpeg")) {
        contentType = "image/jpeg";
      } else if (file.endsWith(".png")) {
        contentType = "image/png";
      } else {
        console.error("Unsupported file format");
        return;
      }

      // Create a blob URL and trigger the download
      const blob = new Blob([response.data], { type: contentType });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = file;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
    }
  };

  const todayDate = new Date();

  // Get year, month, and date
  const year = todayDate.getFullYear();
  const month = String(todayDate.getMonth() + 1).padStart(2, "0"); // Adding 1 to adjust month, padStart ensures 2 digits
  const date = String(todayDate.getDate()).padStart(2, "0"); // Ensuring 2 digits

  // Format as 'YYYY-MM-DD'
  const formattedDate = `${year}-${month}-${date}`;

  console.log(formattedDate.slice(0, 7));

  const filterForMonth = invList?.filter((item) => {
    return (
      item.purchase_date.split("T")[0].slice(0, 7) === formattedDate.slice(0, 7)
    );
  });

  console.log(filterForMonth);

  return (
    <>
      <Container>
        <Header />
        <div className="main">
          <div className="container-fluid">
            <div className="row flex-nowrap ">
              <div className="col-lg-1 col-md-1 col-1 p-0">
                <Sider />
              </div>
              <div className="col-lg-11 col-md-11 col-11 ps-0 mx-2">
                <div className="container-fluid mt-3">
                  <div className="d-flex justify-content-between mx-2">
                    <BranchSelector />
                    <div>
                      <Link to="/add-invetory">
                        <button className="btn btn-success">
                          Add Inventory
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="container-fluid mt-3">
                  <h3 className="text-center">Inventory Management</h3>
                  <div className="br-box mt-4">
                    <div className="row">
                      <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                        <div>
                          <label>Item Name :</label>
                          <input
                            type="text"
                            placeholder="search inventory item"
                            className="mx-3 p-1 rounded"
                            value={keyword}
                            onChange={(e) =>
                              setkeyword(e.target.value.toLowerCase())
                            }
                          />
                        </div>
                      </div>
                      <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                        <div>
                          <label>Select Type :</label>
                          <select
                            name=""
                            id=""
                            className="mx-3 p-1 rounded"
                            onChange={handleCategoryChange}
                          >
                            <option value="all">All</option>
                            <option value="drugs">Drugs</option>
                            <option value="supplies">Supplies</option>
                            <option value="equipment">Equipment</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                        <div className="d-flex justify-content-end">
                          <div>
                            <label>Sort by :</label>
                            <select
                              name=""
                              id=""
                              className="mx-3 p-1 rounded"
                              value={selectedSortOption}
                              onChange={(e) =>
                                setSelectedSortOption(e.target.value)
                              }
                            >
                              <option value="RecentlyAdded">
                                Recently Added
                              </option>
                              <option value="AtoZ">
                                Sort by name - (A to Z)
                              </option>
                              <option value="ZtoA">
                                Sort by name - (Z to A)
                              </option>
                              <option value="LowToHigh">
                                Sort by MRP - (Lowest to Highest)
                              </option>
                              <option value="HighToLow">
                                Sort by MRP - (Highest to Lowest)
                              </option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
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
                            <th className="thead">Low Stock Threshhold</th>
                            <th className="thead">Distributor Name</th>
                            <th className="thead">Distributor Number</th>
                            {/* <th
                              
                              
                            >
                              Edit
                            </th> */}
                            <th className="table-small text-center">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filterForMonth
                            ?.filter((val) => {
                              if (keyword === "") {
                                return true;
                              } else if (
                                val.item_name.toLowerCase().includes(keyword) ||
                                val.item_name.toLowerCase().includes(keyword)
                              ) {
                                return val;
                              }
                            })
                            .filter((val) => {
                              if (selectedCategory === "all") {
                                return true;
                              } else if (
                                val.item_category.toLowerCase() ===
                                selectedCategory
                              ) {
                                return val;
                              }
                            })
                            .sort((a, b) => {
                              // Apply sorting based on selected option
                              switch (selectedSortOption) {
                                case "AtoZ":
                                  return sortByItemNameAZ(a, b);
                                case "ZtoA":
                                  return sortByItemNameZA(a, b);
                                case "LowToHigh":
                                  return sortByTotalAmountLowToHigh(a, b);
                                case "HighToLow":
                                  return sortByTotalAmountHighToLow(a, b);
                                case "RecentlyAdded":
                                  return b.pur_id - a.pur_id;
                                default:
                                  return 0;
                              }
                            })
                            .map((item) => (
                              <>
                                <tr className="table-row">
                                  <td className="thead">{item.pur_id}</td>
                                  <td className="thead">{item.item_code}</td>
                                  <td className="thead">{item.HSN_code}</td>
                                  <td className="thead">{item.item_name}</td>
                                  <td className="thead">
                                    {item.item_category}
                                  </td>
                                  <td className="thead">{item.item_mrp}</td>
                                  <td className="thead">{item.pur_quantity}</td>
                                  <td className="thead">{item.discount}</td>
                                  <td className="thead">{item.total_amount}</td>
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
                                  <td className="thead">
                                    <div className="d-flex">
                                      <button
                                        className="btn btn-success mx-1"
                                        onClick={() =>
                                          downloadInvoice(
                                            item.bill_receipt_doc?.split(
                                              "/reciept_doc/"
                                            )[1]
                                          )
                                        }
                                      >
                                        Download Reciept
                                      </button>

                                      <Link
                                        to={`/edit-invetory/${item.pur_id}`}
                                      >
                                        <button className="btn btn-warning">
                                          Edit Items
                                        </button>
                                      </Link>

                                      <button
                                        type="button"
                                        class="btn btn-danger mx-2"
                                        data-bs-toggle="modal"
                                        data-bs-target="#exampleModal"
                                      >
                                        Delete Items
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                                <div
                                  class="modal fade rounded"
                                  id="exampleModal"
                                  tabindex="-1"
                                  aria-labelledby="exampleModalLabel"
                                  aria-hidden="true"
                                >
                                  <div class="modal-dialog rounded">
                                    <div class="modal-content">
                                      <div class="modal-header">
                                        <h1
                                          class="modal-title fs-5"
                                          id="exampleModalLabel"
                                        >
                                          Are you sure you want to delete this
                                          data
                                        </h1>
                                      </div>

                                      <div class="modal-footer d-flex justify-content-center">
                                        <button
                                          type="button"
                                          class="btn btn-danger"
                                          data-bs-dismiss="modal"
                                          onClick={() =>
                                            deletePurInvDetails(item.pur_id)
                                          }
                                        >
                                          Yes
                                        </button>
                                        <button
                                          type="button"
                                          class="btn btn-secondary"
                                          data-bs-dismiss="modal"
                                        >
                                          Close
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
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
      </Container>
    </>
  );
};

export default Inventory;
const Container = styled.div`
  th {
    background-color: #004aad;
    color: white;
  }

  .select-style {
    border: none;
    background-color: #22a6b3;
    font-weight: bold;
    color: white;
  }

  .thead {
    min-width: 6rem;
  }
`;
