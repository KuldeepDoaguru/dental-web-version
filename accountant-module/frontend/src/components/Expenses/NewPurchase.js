import React, { useState } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import cogoToast from "cogo-toast";
import Header from "../Header";
import Sider from "../Sider";
import BranchDetails from "../BranchDetails";

const NewPurchase = () => {
  const goBack = () => {
    window.history.go(-1);
  };

  return (
    <>
      <Container>
        <Header />
        <div className="">
          <div className="container-fluid">
            <div className="row">
              <div className="col-xxl-1 col-xl-1 col-lg-1 col-md-2 col-sm-2 col-2 p-0">
                <Sider />
              </div>
              <div className="col-xxl-11 col-xl-11 col-lg-11 col-md-10 col-sm-10 col-10 ps-0">
                <div className="container-fluid mt-3">
                  <div className="">
                    <BranchDetails />
                  </div>
                </div>
                <div className="container-fluid mt-3">
                  <button className="btn btn-success" onClick={goBack}>
                    <IoMdArrowRoundBack /> Back
                  </button>
                  <h3 className="text-center">Add Inventory Item</h3>
                  <hr />
                  <div className="container-fluid mt-3">
                    <div className="box-input">
                      <form
                        action=""
                        className=""
                        enctype="multipart/form-data"
                        // onSubmit={addPurchaseDetails}
                      >
                        <div class="container-fluid d-flex justify-content-start mt-2 pl-0">
                          <h5>Category : </h5>
                          <div class="form-check mx-2">
                            <input
                              class="form-check-input"
                              type="radio"
                              name="item_category"
                              id="drug"
                              // value="Drug"
                              // onChange={handleInputChange}
                            />
                            <label class="form-check-label" for="drug">
                              Drug
                            </label>
                          </div>
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              type="radio"
                              name="item_category"
                              id="Supplies"
                              // value="Supplies"
                              // onChange={handleInputChange}
                              checked
                            />
                            <label class="form-check-label" for="Supplies">
                              Supplies
                            </label>
                          </div>
                          <div class="form-check mx-2">
                            <input
                              class="form-check-input"
                              type="radio"
                              name="item_category"
                              id="Equipment"
                              // value="Equipment"
                              // onChange={handleInputChange}
                            />
                            <label class="form-check-label" for="Equipment">
                              Equipment
                            </label>
                          </div>
                        </div>
                        <div className="container-fluid">
                          <div className="row">
                            <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-12 col-12 ps-0">
                              <div class="input-group mb-3">
                                <label
                                  for="exampleFormControlInput1"
                                  class="form-label"
                                >
                                  Item Code
                                </label>
                                <input
                                  type="text"
                                  class="p-1 w-100 rounded"
                                  name="item_code"
                                  placeholder="Item Code"
                                  // value={recData.item_code}
                                  // onChange={handleInputChange}
                                />
                              </div>
                            </div>
                            <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-12 col-12 ps-0">
                              <div class="input-group mb-3">
                                <label
                                  for="exampleFormControlInput1"
                                  class="form-label rounded"
                                >
                                  Item Name
                                </label>
                                <input
                                  type="text"
                                  class="p-1 w-100 rounded"
                                  placeholder="Item Name"
                                  name="item_name"
                                  // value={recData.item_name}
                                  // onChange={handleInputChange}
                                />
                              </div>
                            </div>
                            <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-12 col-12 ps-0">
                              <div class="input-group mb-3">
                                <label
                                  for="exampleFormControlInput1"
                                  class="form-label"
                                >
                                  HSN Code
                                </label>
                                <input
                                  type="text"
                                  class="p-1 w-100 rounded"
                                  placeholder="HSN Code"
                                  name="HSN_code"
                                  // value={recData.HSN_code}
                                  // onChange={handleInputChange}
                                />
                              </div>
                            </div>
                            <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-12 col-12 ps-0">
                              <div class="input-group mb-3">
                                <label
                                  for="exampleFormControlInput1"
                                  class="form-label"
                                >
                                  HSN Code
                                </label>
                                <input
                                  type="text"
                                  class="p-1 w-100 rounded"
                                  placeholder="HSN Code"
                                  name="HSN_code"
                                  // value={recData.HSN_code}
                                  // onChange={handleInputChange}
                                />
                              </div>
                            </div>
                            <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-12 col-12 ps-0">
                              <div class="input-group mb-3">
                                <label
                                  for="exampleFormControlInput1"
                                  class="form-label"
                                >
                                  HSN Code
                                </label>
                                <input
                                  type="text"
                                  class="p-1 w-100 rounded"
                                  placeholder="HSN Code"
                                  name="HSN_code"
                                  // value={recData.HSN_code}
                                  // onChange={handleInputChange}
                                />
                              </div>
                            </div>
                            <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-12 col-12 ps-0">
                              <div class="input-group mb-3">
                                <label
                                  for="exampleFormControlInput1"
                                  class="form-label"
                                >
                                  Purchase Date
                                </label>
                                <input
                                  type="date"
                                  class="p-1 w-100 rounded"
                                  placeholder="purchase date"
                                  name="purchase_date"
                                  // value={recData.purchase_date}
                                  // onChange={handleInputChange}
                                />
                              </div>
                            </div>
                            <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-12 col-12 ps-0">
                              <div class="input-group mb-3">
                                <label
                                  for="exampleFormControlInput1"
                                  class="form-label"
                                >
                                  MRP
                                </label>
                                <input
                                  type="text"
                                  class="p-1 w-100 rounded"
                                  placeholder="Item MRP"
                                  name="item_mrp"
                                  // value={recData.item_mrp}
                                  // onChange={handleInputChange}
                                />
                              </div>
                            </div>
                            <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-12 col-12 ps-0">
                              <div class="input-group mb-3">
                                <label
                                  for="exampleFormControlInput1"
                                  class="form-label"
                                >
                                  Purchase Quantity
                                </label>
                                <input
                                  type="number"
                                  class="p-1 w-100 rounded"
                                  placeholder="purchase quantity"
                                  name="pur_quantity"
                                  // value={recData.pur_quantity}
                                  // onChange={handleInputChange}
                                />
                              </div>
                            </div>
                            <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-12 col-12 ps-0">
                              <div class="input-group mb-3">
                                <label
                                  for="exampleFormControlInput1"
                                  class="form-label"
                                >
                                  Low Stock Threshold
                                </label>
                                <input
                                  type="text"
                                  class="p-1 w-100 rounded"
                                  placeholder="Low Stock Threshold"
                                  name="low_stock_threshhold"
                                  // value={recData.low_stock_threshhold}
                                  // onChange={handleInputChange}
                                />
                              </div>
                            </div>
                            <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-12 col-12 ps-0">
                              <div class="input-group mb-3 mx-2">
                                <label
                                  for="exampleFormControlInput1"
                                  class="form-label"
                                >
                                  Reciept Document
                                </label>
                                <input
                                  type="file"
                                  class="p-1 w-100 rounded"
                                  placeholder="available stock"
                                  accept=".pdf, .jpg, .jpeg, .png"
                                  required
                                  name="reciept_doc"
                                  // onChange={handleReciept_doc}
                                />
                              </div>
                            </div>
                            <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-12 col-12 ps-0">
                              <div class="input-group mb-3">
                                <label
                                  for="exampleFormControlInput1"
                                  class="form-label"
                                >
                                  Branch
                                </label>
                                <select name="" id="" class="p-1 w-100 rounded">
                                  <option value="">branch</option>
                                </select>
                              </div>
                            </div>
                            <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-12 col-12 ps-0">
                              <div class="input-group mb-3">
                                <label
                                  for="exampleFormControlInput1"
                                  class="form-label"
                                >
                                  Distributor Name
                                </label>
                                <input
                                  type="text"
                                  class="p-1 w-100 rounded"
                                  placeholder="distributor_name"
                                  name="distributor_name"
                                  // value={recData.distributor_name}
                                  // onChange={handleInputChange}
                                />
                              </div>
                            </div>
                            <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-12 col-12 ps-0">
                              <div class="input-group mb-3">
                                <label
                                  for="exampleFormControlInput1"
                                  class="form-label"
                                >
                                  Distributor Number
                                </label>
                                <input
                                  type="text"
                                  class="p-1 w-100 rounded"
                                  maxLength={10}
                                  placeholder="distributor number"
                                  name="distributor_number"
                                  // value={recData.distributor_number}
                                  // onChange={handleInputChange}
                                />
                              </div>
                            </div>
                            <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-12 col-12 ps-0">
                              <div class="input-group mb-3">
                                <label
                                  for="exampleFormControlInput1"
                                  class="form-label"
                                >
                                  Discount
                                </label>
                                <input
                                  type="number"
                                  class="p-1 w-100 rounded"
                                  placeholder="discount"
                                  name="discount"
                                  // value={recData.discount}
                                  // onChange={handleInputChange}
                                />
                              </div>
                            </div>
                            <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-12 col-12 ps-0">
                              <div class="input-group mt-3">
                                {/* <label
                              for="exampleFormControlInput1"
                              class="form-label"
                            >
                              Total Amount
                            </label> */}
                                <h4 class="text-center p-1 w-100 rounded">
                                  Available Stock : 10
                                </h4>
                              </div>
                            </div>
                            <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-12 col-12 ps-0">
                              <div class="input-group mt-3">
                                {/* <label
                              for="exampleFormControlInput1"
                              class="form-label"
                            >
                              Total Amount
                            </label> */}
                                <h4 class="text-center p-1 w-100 rounded">
                                  Total Amount :10000
                                </h4>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="d-flex justify-content-start mt-2">
                          <button
                            className="btn btn-info btnbox fw-bold shadow"
                            type="submit"
                          >
                            Submit
                          </button>
                        </div>
                      </form>
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

export default NewPurchase;
const Container = styled.div`
  .select-style {
    border: none;
    background-color: #201658;
    font-weight: bold;
    color: white;
  }

  label {
    font-weight: bold;
    color: #201658;
  }

  .box-input {
    width: 100%;
  }

  input {
    border: 1px solid #201658;
  }
  .input-group {
    h4 {
      color: #201658;
    }
  }

  .btnbox {
    background-color: #201658;
    color: white;
  }

  /* .container-fluid {
    padding-left: 0rem;
  } */
`;
