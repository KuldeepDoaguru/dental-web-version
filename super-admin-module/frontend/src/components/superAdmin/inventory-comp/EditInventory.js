import React from "react";
import styled from "styled-components";
import Header from "../../Header";
import Sider from "../../Sider";
import { useLocation } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import BranchSelector from "../../BranchSelector";

const EditInventory = () => {
  const location = useLocation();

  const goBack = () => {
    window.history.go(-1);
  };
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
                  </div>
                </div>
                <div className="container-fluid mt-3">
                  <button className="btn btn-success" onClick={goBack}>
                    <IoMdArrowRoundBack /> Back
                  </button>
                  <h3 className="text-center">Edit Inventory Item</h3>
                  <hr />
                  <div className="container d-flex justify-content-center mt-3">
                    <div className="box-input">
                      <form action="" className="">
                        <div className="d-flex justify-content-center">
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
                              placeholder="Item Code"
                            />
                          </div>
                          <div class="input-group mb-3 mx-2">
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
                            />
                          </div>
                        </div>
                        <div className="d-flex justify-content-center">
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
                            />
                          </div>
                          <div class="input-group mb-3 mx-2">
                            <label for="exampleFormControlInput1" class="">
                              Purchase Date
                            </label>
                            <input
                              type="date"
                              class="p-1 w-100 rounded"
                              placeholder="purchase date"
                            />
                          </div>
                        </div>
                        <div className="container-fluid d-flex justify-content-start mt-2">
                          <h5>Category : </h5>
                          <div class="form-check mx-2">
                            <input
                              class="form-check-input"
                              type="radio"
                              name="flexRadioDisabled"
                              id="flexRadioDisabled"
                            />
                            <label
                              class="form-check-label"
                              for="flexRadioDisabled"
                            >
                              Drug
                            </label>
                          </div>
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              type="radio"
                              name="flexRadioDisabled"
                              id="flexRadioCheckedDisabled"
                              checked
                            />
                            <label
                              class="form-check-label"
                              for="flexRadioCheckedDisabled"
                            >
                              Supplies
                            </label>
                          </div>
                          <div class="form-check mx-2">
                            <input
                              class="form-check-input"
                              type="radio"
                              name="flexRadioDisabled"
                              id="flexRadioCheckedDisabled"
                              checked
                            />
                            <label
                              class="form-check-label"
                              for="flexRadioCheckedDisabled"
                            >
                              Equipments
                            </label>
                          </div>
                        </div>

                        <div className="d-flex justify-content-center mt-2">
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
                            />
                          </div>
                          <div class="input-group mb-3 mx-2">
                            <label for="exampleFormControlInput1" class="">
                              Available Stock
                            </label>
                            <input
                              type="number"
                              class="p-1 w-100 rounded"
                              placeholder="available stock"
                            />
                          </div>
                        </div>
                        <div className="d-flex justify-content-center mt-2">
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
                            />
                          </div>
                          <div class="input-group mb-3 mx-2">
                            <label for="exampleFormControlInput1" class="">
                              Reciept Document
                            </label>
                            <input
                              type="file"
                              class="p-1 w-100 rounded"
                              placeholder="available stock"
                            />
                          </div>
                        </div>
                        <div className="d-flex justify-content-start mt-2">
                          {" "}
                          <button
                            className="btn btn-info fw-bold shadow"
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

export default EditInventory;
const Container = styled.div`
  .select-style {
    border: none;
    background-color: #22a6b3;
    font-weight: bold;
    color: white;
  }
`;
