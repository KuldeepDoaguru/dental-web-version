import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../../Header";
import Sider from "../../Sider";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import BranchSelector from "../../BranchSelector";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import cogoToast from "cogo-toast";

const EditInventory = () => {
  const { pid } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  console.log(`User Name: ${user.name}, User ID: ${user.id}`);
  console.log("User State:", user);
  const branch = useSelector((state) => state.branch);
  console.log(`User Name: ${branch.name}`);
  const [purInvDetails, setPurInvDetails] = useState([]);

  const [reciept_doc, setReciept_doc] = useState(null);
  const [updateData, setUpdateData] = useState({
    item_name: "",
    item_category: "",
    item_mrp: "",
    item_code: "",
    HSN_code: "",
    pur_quantity: "",
    discount: "",
    total_amount: "",
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

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    // Use spread syntax to update only the changed field
    setUpdateData((prevRecData) => ({
      ...prevRecData,
      [name]: value,
      total_amount:
        name === "item_mrp" || name === "pur_quantity" || name === "discount"
          ? (name === "item_mrp"
              ? value
              : prevRecData.item_mrp || purInvDetails[0].item_mrp) *
              (name === "pur_quantity" ? value : prevRecData.pur_quantity) -
            (name === "discount" ? value : prevRecData.discount)
          : prevRecData.total_amount,
      available_stock:
        name === "pur_quantity" ? value : prevRecData.available_stock,
    }));
  };

  const goBack = () => {
    window.history.go(-1);
  };

  const getInvListDetails = async () => {
    try {
      const { data } = await axios.get(
        `https://dentalgurusuperadmin.doaguru.com/api/v1/super-admin/getPurchaseInvByPurId/${branch.name}/${pid}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log(data);
      setPurInvDetails(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getInvListDetails();
  }, [branch.name]);

  console.log(purInvDetails);

  const updatePurchaseDetails = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    // Append user.data fields to formData
    for (const key in updateData) {
      formData.append(key, updateData[key]);
    }
    formData.append("reciept_doc", reciept_doc);
    console.log(updateData, reciept_doc);
    try {
      const { data } = await axios.put(
        `https://dentalgurusuperadmin.doaguru.com/api/v1/super-admin/updatePurInvoice/${branch.name}/${pid}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      cogoToast.success("Details updated successful!");
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
              <div className="col-lg-1 col-md-1 col-1 p-0">
                <Sider />
              </div>
              <div className="col-lg-11 col-md-11 col-11 ps-0 mx-2">
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
                    <div className="container-fluid">
                      <form
                        action=""
                        className=""
                        enctype="multipart/form-data"
                        onSubmit={updatePurchaseDetails}
                      >
                        <div class="container-fluid d-flex justify-content-start mt-2 mb-2">
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
                        <div className="row">
                          <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
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
                                placeholder={purInvDetails[0]?.item_code}
                                value={updateData.item_code}
                                onChange={handleInputChange}
                              />
                            </div>
                          </div>
                          <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
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
                                placeholder={purInvDetails[0]?.item_name}
                                name="item_name"
                                value={updateData.item_name}
                                onChange={handleInputChange}
                              />
                            </div>
                          </div>
                          <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
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
                                placeholder={purInvDetails[0]?.HSN_code}
                                name="HSN_code"
                                value={updateData.HSN_code}
                                onChange={handleInputChange}
                              />
                            </div>
                          </div>
                          <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                            <div class="input-group mb-3">
                              <label for="exampleFormControlInput1" class="">
                                Purchase Date
                              </label>
                              <input
                                type="date"
                                class="p-1 w-100 rounded mt-2"
                                placeholder={purInvDetails[0]?.purchase_date}
                                name="purchase_date"
                                value={updateData.purchase_date}
                                onChange={handleInputChange}
                              />
                            </div>
                          </div>
                          <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
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
                                placeholder={purInvDetails[0]?.item_mrp}
                                name="item_mrp"
                                value={updateData.item_mrp}
                                onChange={handleInputChange}
                              />
                            </div>
                          </div>
                          <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                            <div class="input-group mb-3">
                              <label for="exampleFormControlInput1" class="">
                                Purchase Quantity
                              </label>
                              <input
                                type="number"
                                class="p-1 w-100 rounded mt-2"
                                placeholder={purInvDetails[0]?.pur_quantity}
                                name="pur_quantity"
                                value={updateData.pur_quantity}
                                onChange={handleInputChange}
                              />
                            </div>
                          </div>
                          <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
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
                                placeholder={
                                  purInvDetails[0]?.low_stock_threshhold
                                }
                                name="low_stock_threshhold"
                                value={updateData.low_stock_threshhold}
                                onChange={handleInputChange}
                              />
                            </div>
                          </div>
                          <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                            <div class="input-group mb-3">
                              <label for="exampleFormControlInput1" class="">
                                Discount
                              </label>
                              <input
                                type="number"
                                class="p-1 w-100 rounded mt-2"
                                placeholder={purInvDetails[0]?.discount}
                                name="discount"
                                value={updateData.discount}
                                onChange={handleInputChange}
                              />
                            </div>
                          </div>
                          <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                            <div class="input-group mb-3">
                              <label for="exampleFormControlInput1" class="">
                                Branch
                              </label>
                              <select name="" id="" class="p-1 w-100 rounded">
                                <option value={branch.name}>
                                  {branch.name}
                                </option>
                              </select>
                            </div>
                          </div>
                          <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                            <div class="input-group mb-3">
                              <label for="exampleFormControlInput1" class="">
                                Distributor Name
                              </label>
                              <input
                                type="text"
                                class="p-1 w-100 rounded"
                                placeholder={purInvDetails[0]?.distributor_name}
                                name="distributor_name"
                                value={updateData.distributor_name}
                                onChange={handleInputChange}
                              />
                            </div>
                          </div>
                          <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                            <div class="input-group mb-3">
                              <label for="exampleFormControlInput1" class="">
                                Distributor Number
                              </label>
                              <input
                                type="text"
                                class="p-1 w-100 rounded"
                                maxLength={10}
                                placeholder={
                                  purInvDetails[0]?.distributor_number
                                }
                                name="distributor_number"
                                value={updateData.distributor_number}
                                onChange={handleInputChange}
                              />
                            </div>
                          </div>
                          <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                            <div class="input-group mt-3">
                              {/* <label
                              for="exampleFormControlInput1"
                              class="form-label"
                            >
                              Total Amount
                            </label> */}
                              <h4 class="p-1 w-100 rounded">
                                Available Stock :
                                {updateData.available_stock
                                  ? updateData.available_stock
                                  : purInvDetails[0]?.available_stock}
                              </h4>
                            </div>
                          </div>
                          <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                            <div class="input-group mx-2 mt-3">
                              {/* <label
                              for="exampleFormControlInput1"
                              class="form-label"
                            >
                              Total Amount
                            </label> */}
                              <h4 class="p-1 w-100 rounded">
                                Total Amount :
                                {updateData.total_amount
                                  ? updateData.total_amount
                                  : purInvDetails[0]?.total_amount}
                              </h4>
                            </div>
                          </div>
                          <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                            <div class="input-group mb-3">
                              <label for="exampleFormControlInput1" class="">
                                Reciept Document
                              </label>
                              <input
                                type="file"
                                class="p-1 w-100 rounded"
                                placeholder="available stock"
                                accept=".pdf, .jpg, .jpeg, .png"
                                name="reciept_doc"
                                onChange={handleReciept_doc}
                              />
                            </div>
                          </div>
                        </div>

                        <div class="input-group mb-3 mx-2">
                          <img
                            src={purInvDetails[0]?.bill_receipt_doc}
                            alt="bill_receipt_doc"
                            className="imgStyle"
                          />
                        </div>

                        <div className="d-flex justify-content-start mt-2">
                          {" "}
                          <button
                            className="btn btn-info btnbox fw-bold shadow"
                            type="submit"
                          >
                            Submit Update
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

  .imgStyle {
    height: 16rem;
    width: auto;
  }
`;
