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
import Equipment from "./PurchaseCategory/Equipment";
import Supplies from "./PurchaseCategory/Supplies";
import Durg from "./PurchaseCategory/Durg";

const NewPurchase = () => {
  const [category, setCategory] = useState("");

  const handleChangeCategory = (e) => {
    setCategory(e.target.value);
  };

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
                              value="Drug"
                              onChange={handleChangeCategory}
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
                              onChange={handleChangeCategory}
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
                              onChange={handleChangeCategory}
                            />
                            <label class="form-check-label" for="Equipment">
                              Equipment
                            </label>
                          </div>
                        </div>
                        {/* Form Start Here */}
                        {category === "Drug" && <Durg />}
                        {category === "Supplies" && <Supplies />}
                        {category === "Equipment" && <Equipment />}
                        {/* Form End Here */}
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
