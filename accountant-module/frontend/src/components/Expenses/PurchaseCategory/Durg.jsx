import React from "react";
import styled from "styled-components";

const Durg = () => {
  return (
    <>
      <Container>
        <div className="container-fluid">
          <div className="row">
            <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-12 col-12 ps-0">
              <div class="input-group mb-3">
                <label for="exampleFormControlInput1" class="form-label">
                Code
                </label>
                <input
                  type="text"
                  class="p-1 w-100 rounded"
                  name="item_code"
                  placeholder="Enter Code"
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
                  Durg Code 
                </label>
                <input
                  type="text"
                  class="p-1 w-100 rounded"
                  placeholder="Enter Durg Code"
                  name="item_name"
                  // value={recData.item_name}
                  // onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-12 col-12 ps-0">
              <div class="input-group mb-3">
                <label for="exampleFormControlInput1" class="form-label">
                Durg Name 
                </label>
                <input
                  type="text"
                  class="p-1 w-100 rounded"
                  placeholder="Enter Durg Name "
                  name="HSN_code"
                  // value={recData.HSN_code}
                  // onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-12 col-12 ps-0">
              <div class="input-group mb-3">
                <label for="exampleFormControlInput1" class="form-label">
                  Specification Model
                </label>
                <input
                  type="text"
                  class="p-1 w-100 rounded"
                  placeholder="Enter Specification Model"
                  name="HSN_code"
                  // value={recData.HSN_code}
                  // onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-12 col-12 ps-0">
              <div class="input-group mb-3">
                <label for="exampleFormControlInput1" class="form-label">
                  Production Batch
                </label>
                <input
                  type="text"
                  class="p-1 w-100 rounded"
                  placeholder="Enter Production Batch"
                  name="HSN_code"
                  // value={recData.HSN_code}
                  // onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-12 col-12 ps-0">
              <div class="input-group mb-3">
                <label for="exampleFormControlInput1" class="form-label">
                  Period of Validity
                </label>
                <input
                  type="date"
                  class="p-1 w-100 rounded"
                  placeholder="Enter Validity"
                  name="purchase_date"
                  // value={recData.purchase_date}
                  // onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-12 col-12 ps-0">
              <div class="input-group mb-3">
                <label for="exampleFormControlInput1" class="form-label">
                  Manufacture
                </label>
                <input
                  type="text"
                  class="p-1 w-100 rounded"
                  placeholder="Enter Manufacture"
                  name="item_mrp"
                  // value={recData.item_mrp}
                  // onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-12 col-12 ps-0">
              <div class="input-group mb-3">
                <label for="exampleFormControlInput1" class="form-label">
                Quantity
                </label>
                <input
                  type="number"
                  class="p-1 w-100 rounded"
                  placeholder="Enter Quantity"
                  name="pur_quantity"
                  // value={recData.pur_quantity}
                  // onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-12 col-12 ps-0">
              <div class="input-group mb-3">
                <label for="exampleFormControlInput1" class="form-label">
                  Unit Price
                </label>
                <input
                  type="text"
                  class="p-1 w-100 rounded"
                  placeholder="Enter Unit Price"
                  name="low_stock_threshhold"
                  // value={recData.low_stock_threshhold}
                  // onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-12 col-12 ps-0">
              <div class="input-group mb-3 mx-2">
                <label for="exampleFormControlInput1" class="form-label">
                  Amount 
                </label>
                <input
                  type="file"
                  class="p-1 w-100 rounded"
                  placeholder="Enter Amount"
                  accept=".pdf, .jpg, .jpeg, .png"
                  required
                  name="reciept_doc"
                  // onChange={handleReciept_doc}
                />
              </div>
            </div>
            <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-12 col-12 ps-0">
              <div class="input-group mb-3">
                <label for="exampleFormControlInput1" class="form-label">
                  Branch
                </label>
                <select name="" id="" class="p-1 w-100 rounded">
                  <option value="">branch</option>
                </select>
              </div>
            </div>
            <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-12 col-12 ps-0">
              <div class="input-group mb-3">
                <label for="exampleFormControlInput1" class="form-label">
                  Distributor Name
                </label>
                <input
                  type="text"
                  class="p-1 w-100 rounded"
                  placeholder="distributor_name"
                  name="distributor_name"
                />
              </div>
            </div>
            <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-12 col-12 ps-0">
              <div class="input-group mb-3">
                <label for="exampleFormControlInput1" class="form-label">
                  Distributor Number
                </label>
                <input
                  type="text"
                  class="p-1 w-100 rounded"
                  maxLength={10}
                  placeholder="distributor number"
                  name="distributor_number"
                />
              </div>
            </div>
            <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-12 col-12 ps-0">
              <div class="input-group mb-3">
                <label for="exampleFormControlInput1" class="form-label">
                  Discount
                </label>
                <input
                  type="number"
                  class="p-1 w-100 rounded"
                  placeholder="discount"
                  name="discount"
                />
              </div>
            </div>
            <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-12 col-12 ps-0">
              <div class="input-group mt-3">
                <h4 class="text-center p-1 w-100 rounded">
                  Available Stock : 10
                </h4>
              </div>
            </div>
            <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-12 col-12 ps-0">
              <div class="input-group mt-3">
                <h4 class="text-center p-1 w-100 rounded">
                  Total Amount :10000
                </h4>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-start mt-2">
          <button className="btn btn-info btnbox fw-bold shadow" type="submit">
            Submit
          </button>
        </div>
      </Container>
    </>
  );
};

export default Durg;
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
`;
