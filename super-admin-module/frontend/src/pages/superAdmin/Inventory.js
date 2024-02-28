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

  const getPurchaseList = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:7777/api/v1/super-admin/getPurInventoryByBranch/${branch.name}`
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

  return (
    <>
      <Container>
        <Header />
        <div className="main">
          <div className="container-fluid">
            <div className="row flex-nowrap ">
              <div className="col-lg-1 col-1 p-0">
                <Sider />
              </div>
              <div className="col-lg-11 col-11 ps-0">
                <div className="container-fluid mt-3">
                  <div className="d-flex justify-content-between">
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
                      <div className="col-xl-4">
                        <div>
                          <label>Item Name :</label>
                          <input
                            type="text"
                            placeholder="search inventory item"
                            className="mx-3 p-1 rounded"
                          />
                        </div>
                      </div>
                      <div className="col-xl-4">
                        <div>
                          <label>Stock Status :</label>
                          <select name="" id="" className="mx-3 p-1 rounded">
                            <option value="All">All</option>
                            <option value="out-of-stock">Out-Stock</option>
                            <option value="in-stock">in-Stock</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-xl-4">
                        <div className="d-flex justify-content-evenly">
                          <div>
                            <label>Sort by :</label>
                            <select name="" id="" className="mx-3 p-1 rounded">
                              <option value="All">Recently Added</option>
                              <option value="out-of-stock">Sort by name</option>
                              <option value="in-stock">Sort by Type</option>
                              <option value="in-stock">Sort by MRP</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="container-fluid mt-1 rounded">
                    <div class="table-responsive rounded">
                      <table class="table table-bordered rounded shadow">
                        <thead className="table-head">
                          <tr>
                            <th className="table-sno">Purchase ID</th>
                            <th>Item Code</th>
                            <th>HSN Code</th>
                            <th className="table-small">Item Name</th>
                            <th className="table-small">Item Type</th>
                            <th className="table-small">Purchase Date</th>
                            <th className="table-small">MRP</th>
                            <th className="table-small">Available Stock</th>
                            <th className="table-small">
                              Low Stock Threshhold
                            </th>
                            {/* <th
                              className="table-small"
                              
                            >
                              Edit
                            </th> */}
                            <th className="table-small text-center">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {invList?.map((item) => (
                            <>
                              <tr className="table-row">
                                <td className="table-sno">{item.pur_id}</td>
                                <td>{item.item_code}</td>
                                <td>{item.HSN_code}</td>
                                <td className="table-small">
                                  {item.item_name}
                                </td>
                                <td className="table-small">
                                  {item.item_category}
                                </td>
                                <td className="table-small">
                                  {item.purchase_date?.split("T")[0]}
                                </td>
                                <td className="table-small">{item.item_mrp}</td>
                                <td className="table-small">
                                  {item.available_stock}
                                </td>
                                <td className="table-small">
                                  {item.low_stock_threshhold}
                                </td>
                                <td className="table-small">
                                  <div className="d-flex">
                                    <button className="btn btn-success mx-1">
                                      Purchase Details
                                    </button>
                                    <Link to="/edit-invetory">
                                      {" "}
                                      <button className="btn btn-warning">
                                        Edit Items
                                      </button>
                                    </Link>

                                    <button className="btn btn-danger mx-1">
                                      Delete Items
                                    </button>
                                  </div>
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
`;
