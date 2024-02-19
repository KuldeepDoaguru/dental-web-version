import React from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import Sider from "../../components/Sider";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import HeaderAdmin from "./HeaderAdmin";
import SiderAdmin from "./SiderAdmin";

const AdminInventory = () => {
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
                    <div>
                      <Link to="/admin-add-invetory">
                        <button className="btn btn-success p-2 fw-bold shadow">
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
                        <div className="d-flex justify-content-center">
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
                            <th className="table-sno">SN</th>
                            <th className="table-sno">Purchase ID</th>
                            <th className="table-small">Item Name</th>
                            <th>Item Code</th>
                            <th>HSN Code</th>
                            <th className="table-small">Item Type</th>
                            <th className="table-small">Last Generate Bill</th>
                            <th className="table-small">MRP</th>
                            <th className="table-small">Available Stock</th>
                            <th className="table-small">Status</th>
                            {/* <th
                              className="table-small"
                              
                            >
                              Edit
                            </th> */}
                            <th className="table-small text-center">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="table-row">
                            <td className="table-sno">1</td>
                            <td>pur_01</td>
                            <td className="table-small">
                              Tablet 10 mg Item Code - 101 HSN Code - 101
                            </td>
                            <td>00761</td>
                            <td>9761</td>

                            <td className="table-small">Drug</td>
                            <td className="table-small">
                              Purchase Date - 15 jul 2023
                            </td>
                            <td className="table-small">Rs - 100/-</td>
                            <td className="table-small">50</td>
                            <td className="table-small">inStock</td>
                            <td className="table-small">
                              <div className="d-flex">
                                <button className="btn btn-success mx-1">
                                  Generate Bill
                                </button>
                                <Link to="/admin-edit-invetory">
                                  {" "}
                                  <button className="btn btn-warning">
                                    Edit
                                  </button>
                                </Link>

                                <button className="btn btn-danger mx-1">
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                          <tr className="table-row">
                            <td className="table-sno">1</td>
                            <td>pur_01</td>
                            <td className="table-small">
                              Tablet 10 mg Item Code - 101 HSN Code - 101
                            </td>
                            <td>00761</td>
                            <td>9761</td>
                            <td className="table-small">Drug</td>
                            <td className="table-small">
                              Purchase Date - 15 jul 2023
                            </td>
                            <td className="table-small">Rs - 100/-</td>
                            <td className="table-small">50</td>
                            <td className="table-small">inStock</td>
                            <td className="table-small">
                              <div className="d-flex">
                                <button className="btn btn-success mx-1">
                                  Generate Bill
                                </button>
                                <Link to="/admin-edit-invetory">
                                  {" "}
                                  <button className="btn btn-warning">
                                    Edit
                                  </button>
                                </Link>

                                <button className="btn btn-danger mx-1">
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                          <tr className="table-row">
                            <td className="table-sno">1</td>
                            <td>pur_01</td>
                            <td className="table-small">
                              Tablet 10 mg Item Code - 101 HSN Code - 101
                            </td>
                            <td>00761</td>
                            <td>9761</td>
                            <td className="table-small">Drug</td>
                            <td className="table-small">
                              Purchase Date - 15 jul 2023
                            </td>
                            <td className="table-small">Rs - 100/-</td>
                            <td className="table-small">50</td>
                            <td className="table-small">inStock</td>
                            <td className="table-small">
                              <div className="d-flex">
                                <button className="btn btn-success mx-1">
                                  Generate Bill
                                </button>
                                <Link to="/admin-edit-invetory">
                                  {" "}
                                  <button className="btn btn-warning">
                                    Edit
                                  </button>
                                </Link>

                                <button className="btn btn-danger mx-1">
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                          <tr className="table-row">
                            <td className="table-sno">1</td>
                            <td>pur_01</td>
                            <td className="table-small">
                              Tablet 10 mg Item Code - 101 HSN Code - 101
                            </td>
                            <td>00761</td>
                            <td>9761</td>
                            <td className="table-small">Drug</td>
                            <td className="table-small">
                              Purchase Date - 15 jul 2023
                            </td>
                            <td className="table-small">Rs - 100/-</td>
                            <td className="table-small">50</td>
                            <td className="table-small">inStock</td>
                            <td className="table-small">
                              <div className="d-flex">
                                <button className="btn btn-success mx-1">
                                  Generate Bill
                                </button>
                                <Link to="/admin-edit-invetory">
                                  {" "}
                                  <button className="btn btn-warning">
                                    Edit
                                  </button>
                                </Link>

                                <button className="btn btn-danger mx-1">
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                          <tr className="table-row">
                            <td className="table-sno">1</td>
                            <td>pur_01</td>
                            <td className="table-small">
                              Tablet 10 mg Item Code - 101 HSN Code - 101
                            </td>
                            <td>00761</td>
                            <td>9761</td>
                            <td className="table-small">Drug</td>
                            <td className="table-small">
                              Purchase Date - 15 jul 2023
                            </td>
                            <td className="table-small">Rs - 100/-</td>
                            <td className="table-small">50</td>
                            <td className="table-small">inStock</td>
                            <td className="table-small">
                              <div className="d-flex">
                                <button className="btn btn-success mx-1">
                                  Generate Bill
                                </button>
                                <Link to="/admin-edit-invetory">
                                  {" "}
                                  <button className="btn btn-warning">
                                    Edit
                                  </button>
                                </Link>

                                <button className="btn btn-danger mx-1">
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
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

export default AdminInventory;
const Container = styled.div`
  th {
    background-color: #1abc9c;
    color: #000;
  }

  .select-style {
    border: none;
    background-color: #22a6b3;
    font-weight: bold;
    color: white;
  }
`;
