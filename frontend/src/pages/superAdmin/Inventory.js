import React from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import Sider from "../../components/Sider";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const Inventory = () => {
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
                <div className="container mt-3">
                  <div className="d-flex justify-content-between">
                    <div className="d-flex">
                      <div>
                        <h6>Select Branch : </h6>
                      </div>
                      <div>
                        <select name="branch" id="branch" className="mx-2">
                          <option value="Madan Mahal">Madan Mahal</option>
                          <option value="Madan Mahal">Ranjhi</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <Link to="/superadmin-add-inventory">
                        <button className="btn btn-success">
                          Add Inventory
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="container mt-3">
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
                          <select name="" id="" className="mx-3">
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
                            <select name="" id="" className="mx-3">
                              <option value="All">Recently Added</option>
                              <option value="out-of-stock">Sort by name</option>
                              <option value="in-stock">Sort by Type</option>
                              <option value="in-stock">Sort by MRP</option>
                            </select>
                          </div>
                          <div>
                            <button className="btn btn-success">
                              {" "}
                              <FaSearch />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="container mt-3 rounded">
                    <div class="table-responsive rounded">
                      <table class="table table-bordered rounded shadow">
                        <thead className="table-head">
                          <tr>
                            <th className="table-sno" style={{ width: "10%" }}>
                              ID
                            </th>
                            <th
                              className="table-small"
                              style={{ width: "20%" }}
                            >
                              Branch Name
                            </th>
                            <th
                              className="table-small"
                              style={{ width: "20%" }}
                            >
                              Item Name
                            </th>
                            <th
                              className="table-small"
                              style={{ width: "10%" }}
                            >
                              Type
                            </th>
                            <th
                              className="table-small"
                              style={{ width: "10%" }}
                            >
                              Last Purchase Details
                            </th>
                            <th
                              className="table-small"
                              style={{ width: "10%" }}
                            >
                              Last MRP
                            </th>
                            <th
                              className="table-small"
                              style={{ width: "10%" }}
                            >
                              Available Stock
                            </th>
                            <th
                              className="table-small"
                              style={{ width: "10%" }}
                            >
                              Status
                            </th>
                            {/* <th
                              className="table-small"
                              style={{ width: "10%" }}
                            >
                              Edit
                            </th> */}
                            <th
                              className="table-small text-center"
                              style={{ width: "10%" }}
                            >
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="table-row">
                            <td className="table-sno" style={{ width: "10%" }}>
                              1
                            </td>
                            <td
                              className="table-small"
                              style={{ width: "20%" }}
                            >
                              Madan Mahal
                            </td>
                            <td
                              className="table-small"
                              style={{ width: "20%" }}
                            >
                              Tablet 10 mg Item Code - 101 HSN Code - 101
                            </td>
                            <td
                              className="table-small"
                              style={{ width: "10%" }}
                            >
                              Drug
                            </td>
                            <td
                              className="table-small"
                              style={{ width: "10%" }}
                            >
                              Purchase Date - 15 jul 2023
                            </td>
                            <td
                              className="table-small"
                              style={{ width: "10%" }}
                            >
                              Rs - 100/-
                            </td>
                            <td
                              className="table-small"
                              style={{ width: "10%" }}
                            >
                              50
                            </td>
                            <td
                              className="table-small"
                              style={{ width: "10%" }}
                            >
                              inStock
                            </td>
                            <td
                              className="table-small"
                              style={{ width: "10%" }}
                            >
                              <div className="d-flex">
                                <Link to="/add-invetory">
                                  {" "}
                                  <button className="btn btn-info">
                                    Add Stock
                                  </button>
                                </Link>

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
const Container = styled.div``;
