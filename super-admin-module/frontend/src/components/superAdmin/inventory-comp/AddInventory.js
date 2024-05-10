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
    item_category: "drugs",
    item_mrp: "",
    item_code: "",
    HSN_code: "",
    pur_quantity: "",
    discount: 0,
    total_amount: 0,
    branch_name: branch.name,
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
  console.log(recData);

  // const handleInputChange = (event) => {
  //   const { name, value, type, checked } = event.target;

  //   // Use spread syntax to update only the changed field
  //   setRecData((prevRecData) => ({
  //     ...prevRecData,
  //     [name]: type === "radio" || type === "checkbox" ? checked : value,
  //     total_amount:
  //       name === "item_mrp" || name === "pur_quantity" || name === "discount"
  //         ? (name === "item_mrp" ? value : recData.item_mrp) *
  //             (name === "pur_quantity" ? value : recData.pur_quantity) -
  //           (name === "discount" ? value : recData.discount)
  //         : prevRecData.total_amount,
  //     available_stock: name === "pur_quantity" ? value : recData.pur_quantity,
  //   }));
  // };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    // Use spread syntax to update only the changed field
    setRecData((prevRecData) => ({
      ...prevRecData,
      [name]: value,
      total_amount:
        (name === "item_mrp" ? value : prevRecData.item_mrp) *
          (name === "pur_quantity" ? value : prevRecData.pur_quantity) -
        (name === "discount" ? value : prevRecData.discount),
      available_stock:
        name === "pur_quantity" ? value : prevRecData.pur_quantity,
    }));
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
        "https://dentalgurusuperadmin.doaguru.com/api/v1/super-admin/purchaseInventory",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      cogoToast.success("Registration successful!");
      navigate("/inventory");
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
              <div className="col-lg-11 col-11 ps-0 mx-2">
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
                  <div className="container-fluid d-flex justify-content-center mt-3">
                    <div className="box-input">
                      <form
                        action=""
                        className=""
                        enctype="multipart/form-data"
                        onSubmit={addPurchaseDetails}
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
                              type="number"
                              class="p-1 w-100 rounded"
                              name="item_code"
                              placeholder="Item Code"
                              required
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
                              required
                              name="item_name"
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
                              type="number"
                              class="p-1 w-100 rounded"
                              placeholder="HSN Code"
                              name="HSN_code"
                              required
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
                              required
                              name="purchase_date"
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
                              checked
                            />
                            <label class="form-check-label" for="drug">
                              Drug
                            </label>
                          </div>
                          {/* <div class="form-check">
                            <input
                              class="form-check-input"
                              type="radio"
                              name="item_category"
                              id="Supplies"
                              value="Supplies"
                              onChange={handleInputChange}
                            />
                            <label class="form-check-label" for="Supplies">
                              Supplies
                            </label>
                          </div> */}
                          {/* <div class="form-check mx-2">
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
                          </div> */}
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
                              type="number"
                              class="p-1 w-100 rounded"
                              placeholder="Item MRP"
                              name="item_mrp"
                              required
                              value={recData.item_mrp}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div class="input-group mb-3 mx-2">
                            <label for="exampleFormControlInput1" class="">
                              Purchase Quantity
                            </label>
                            <input
                              type="number"
                              class="p-1 w-100 rounded"
                              placeholder="purchase quantity"
                              name="pur_quantity"
                              required
                              value={recData.pur_quantity}
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
                              name="low_stock_threshhold"
                              required
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
                        <div className="d-flex justify-content-center mt-2">
                          <div class="input-group mb-3">
                            <label for="exampleFormControlInput1" class="">
                              Branch
                            </label>
                            <select name="" id="" class="p-1 w-100 rounded">
                              <option value={branch.name}>{branch.name}</option>
                            </select>
                          </div>
                          <div class="input-group mb-3 mx-2">
                            <label for="exampleFormControlInput1" class="">
                              Distributor Name
                            </label>
                            <input
                              type="text"
                              class="p-1 w-100 rounded"
                              placeholder="distributor_name"
                              required
                              name="distributor_name"
                              value={recData.distributor_name}
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
                              Distributor Number
                            </label>
                            <input
                              type="text"
                              class="p-1 w-100 rounded"
                              maxLength={10}
                              placeholder="distributor number"
                              required
                              name="distributor_number"
                              value={recData.distributor_number}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div class="input-group mb-3 mx-2">
                            <label for="exampleFormControlInput1" class="">
                              Discount
                            </label>
                            <input
                              type="number"
                              class="p-1 w-100 rounded"
                              placeholder="discount"
                              name="discount"
                              required
                              value={recData.discount}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="d-flex justify-content-center mt-2">
                          <div class="input-group mt-3">
                            {/* <label
                              for="exampleFormControlInput1"
                              class="form-label"
                            >
                              Total Amount
                            </label> */}
                            <h4 class="p-1 w-100 rounded">
                              Available Stock : {recData.available_stock}
                            </h4>
                          </div>
                          <div class="input-group mx-2 mt-3">
                            {/* <label
                              for="exampleFormControlInput1"
                              class="form-label"
                            >
                              Total Amount
                            </label> */}
                            <h4 class="p-1 w-100 rounded">
                              Total Amount :{recData.total_amount}
                            </h4>
                          </div>
                        </div>
                        <div className="d-flex justify-content-start mt-2">
                          {" "}
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
    color: #004aad;
  }

  .box-input {
    width: 50%;
  }

  input {
    border: 1px solid #004aad;
  }
  .input-group {
    h4 {
      color: #004aad;
    }
  }

  .btnbox {
    background-color: #004aad;
    color: white;
  }
`;
