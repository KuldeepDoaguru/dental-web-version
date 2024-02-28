import React, { useState } from "react";
import styled from "styled-components";
import Header from "../../Header";
import Sider from "../../Sider";
import { useLocation, useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import BranchSelector from "../../BranchSelector";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import cogoToast from "cogo-toast";

const AddInventory = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  console.log(`User Name: ${user.name}, User ID: ${user.id}`);
  console.log("User State:", user);
  const branch = useSelector((state) => state.branch);
  console.log(`User Name: ${branch.name}`);

  const [reciept_doc, setReciept_doc] = useState(null);
  const [recData, setRecData] = useState({
    item_name: "",
    item_category: "",
    item_mrp: "",
    item_code: "",
    HSN_code: "",
    pur_quantity: "",
    discount: "",
    total_amount: "",
    branch_name: "",
    available_stock: "",
    low_stock_threshhold: "",
    distributor_name: "",
    distributor_number: "",
    purchase_date: "",
  });

  const handleReciept_doc = (e) => {
    const selectedFile = e.target.files[0];
    console.log(selectedFile);
    if (selectedFile) {
      setReciept_doc(selectedFile);
    }
  };
  console.log(reciept_doc);

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;

    // Use spread syntax to update only the changed field
    setRecData({
      ...recData,
      [name]: type === "radio" || type === "checkbox" ? checked : value,
    });
  };

  const goBack = () => {
    window.history.go(-1);
  };

  const addPurchaseDetails = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    // Append user.data fields to formData
    for (const key in recData) {
      formData.append(key, recData[key]);
    }
    formData.append("reciept_doc", reciept_doc);
    console.log(recData, reciept_doc);
    try {
      const { data } = await axios.post(
        "http://localhost:7777/api/v1/super-admin/purchaseInventory",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      cogoToast.success("Registration successful!");
      // navigate("/inventory");
    } catch (error) {
      console.log(error);
    }
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
                  <h3 className="text-center">Add Inventory Item</h3>
                  <hr />
                  <div className="container d-flex justify-content-center mt-3">
                    <div className="box-input">
                      <form
                        action=""
                        className=""
                        enctype="multipart/form-data"
                      >
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
                              value={recData.item_code}
                              onChange={handleInputChange}
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
                              value={recData.item_name}
                              onChange={handleInputChange}
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
                              value={recData.HSN_code}
                              onChange={handleInputChange}
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
                              value={recData.purchase_date}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        <div class="container-fluid d-flex justify-content-start mt-2">
                          <h5>Category : </h5>
                          <div class="form-check mx-2">
                            <input
                              class="form-check-input"
                              type="radio"
                              name="item_category"
                              id="drug"
                              value="Drug"
                              onChange={handleInputChange}
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
                              value="Supplies"
                              onChange={handleInputChange}
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
                              value="Equipment"
                              onChange={handleInputChange}
                            />
                            <label class="form-check-label" for="Equipment">
                              Equipment
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
                              value={recData.item_mrp}
                              onChange={handleInputChange}
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
                              value={recData.available_stock}
                              onChange={handleInputChange}
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
                              value={recData.low_stock_threshhold}
                              onChange={handleInputChange}
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
                              accept=".pdf, .jpg, .jpeg, .png"
                              required
                              name="reciept_doc"
                              onChange={handleReciept_doc}
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

export default AddInventory;
const Container = styled.div`
  .select-style {
    border: none;
    background-color: #22a6b3;
    font-weight: bold;
    color: white;
  }

  label {
    font-weight: bold;
  }
  .box-input {
    width: 50%;
  }
`;
