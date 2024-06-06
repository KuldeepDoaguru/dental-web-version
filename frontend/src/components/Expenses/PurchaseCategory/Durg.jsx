import React from "react";
import styled from "styled-components";

const Durg = () => {
  return (
    <>
      <Container>
        <form>
          <div className="container-fluid">
            <div className="row">
              <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-12 col-12 ps-0">
                <div class="input-group mb-3">
                  <label for="exampleFormControlInput1" class="form-label">
                    Date of Invoice
                  </label>
                  <input
                    type="date"
                    class="p-1 w-100 rounded"
                    placeholder="Enter Batch No"
                    name="HSN_code"
                    // value={recData.HSN_code}
                    // onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-12 col-12 ps-0">
                <div class="input-group mb-3">
                  <label for="exampleFormControlInput1" class="form-label">
                    Vendor Name
                  </label>
                  <input
                    type="text"
                    class="p-1 w-100 rounded"
                    placeholder="Enter Vendor Name"
                    name="purchase_date"
                    // value={recData.purchase_date}
                    // onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-12 col-12 ps-0">
                <div class="input-group mb-3">
                  <label for="exampleFormControlInput1" class="form-label">
                    HSN Code
                  </label>
                  <input
                    type="text"
                    class="p-1 w-100 rounded"
                    name="item_code"
                    placeholder="Enter HSN Code"
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
                    Durg Name
                  </label>
                  <input
                    type="text"
                    class="p-1 w-100 rounded"
                    placeholder="Enter Durg Name"
                    name="item_name"
                    // value={recData.item_name}
                    // onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-12 col-12 ps-0">
                <div class="input-group mb-3">
                  <label for="exampleFormControlInput1" class="form-label">
                    Batch No
                  </label>
                  <input
                    type="text"
                    class="p-1 w-100 rounded"
                    placeholder="Enter Batch No"
                    name="HSN_code"
                    // value={recData.HSN_code}
                    // onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-12 col-12 ps-0">
                <div class="input-group mb-3">
                  <label for="exampleFormControlInput1" class="form-label">
                    Expiry Date
                  </label>
                  <input
                    type="date"
                    class="p-1 w-100 rounded"
                    placeholder="Enter Expiry Date"
                    name="HSN_code"
                    // value={recData.HSN_code}
                    // onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-12 col-12 ps-0">
                <div class="input-group mb-3">
                  <label for="exampleFormControlInput1" class="form-label">
                    MFG Date
                  </label>
                  <input
                    type="date"
                    class="p-1 w-100 rounded"
                    placeholder="Enter MFG Date"
                    name="HSN_code"
                    // value={recData.HSN_code}
                    // onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-12 col-12 ps-0">
                <div class="input-group mb-3">
                  <label for="exampleFormControlInput1" class="form-label">
                    MRP
                  </label>
                  <input
                    type="number"
                    class="p-1 w-100 rounded"
                    placeholder="Enter MRP"
                    name="pur_quantity"
                    // value={recData.pur_quantity}
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
                    name="purchase_date"
                    // value={recData.purchase_date}
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
                    name="item_mrp"
                    // value={recData.item_mrp}
                    // onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-12 col-12 ps-0">
                <div class="input-group mb-3">
                  <label for="exampleFormControlInput1" class="form-label">
                    Total GST Amount
                  </label>
                  <input
                    type="text"
                    class="p-1 w-100 rounded"
                    placeholder="Enter Total GST Amount"
                    name="low_stock_threshhold"
                    // value={recData.low_stock_threshhold}
                    // onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-12 col-12 ps-0">
                <div class="input-group mb-3">
                  <label for="exampleFormControlInput1" class="form-label">
                    Total Invoice Amount
                  </label>
                  <input
                    type="text"
                    class="p-1 w-100 rounded"
                    placeholder="Enter Total Invoice Amount"
                    name="low_stock_threshhold"
                    // value={recData.low_stock_threshhold}
                    // onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-12 col-12 ps-0">
                <div class="input-group mb-3 mx-2">
                  <label for="exampleFormControlInput1" class="form-label">
                    Remark
                  </label>
                  <input
                    type="text"
                    class="p-1 w-100 rounded"
                    placeholder="Enter Remark"
                    required
                    name="reciept_doc"
                    // onChange={handleReciept_doc}
                  />
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
