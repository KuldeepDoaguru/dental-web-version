import React from "react";
import styled from "styled-components";
import Header from "../../Header";
import Sider from "../../Sider";
import { useLocation } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";

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
                    <div className="d-flex">
                      <div>
                        <h4>Select Branch : </h4>
                      </div>
                      <div>
                        <select
                          name="branch"
                          id="branch"
                          className="mx-2 p-2 rounded shadow select-style"
                        >
                          <option value="Madan Mahal" className="fw-bold">
                            Madan Mahal
                          </option>
                          <option value="Madan Mahal" className="fw-bold">
                            Ranjhi
                          </option>
                        </select>
                      </div>
                    </div>
                    <div>
                      {/* <Link to="/superadmin-add-branch">
                          <button className="btn btn-success">
                            Add Branch
                          </button>
                        </Link> */}
                    </div>
                  </div>
                </div>
                <div className="container mt-3">
                  <button className="btn btn-success" onClick={goBack}>
                    <IoMdArrowRoundBack /> Back
                  </button>
                  <h3 className="text-center">Edit Inventory Item</h3>
                  <div className="container mt-3">
                    <form action="">
                      <div className="container d-flex justify-content-center mt-5">
                        <h5>Type : </h5>
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
                      <div className="d-flex justify-content-center mt-4">
                        <div class="mb-3">
                          <label
                            for="exampleFormControlInput1"
                            class="form-label"
                          >
                            Item Name
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            placeholder="Item Name"
                          />
                        </div>
                        <div class="mb-3 mx-3">
                          <label
                            for="exampleFormControlInput1"
                            class="form-label"
                          >
                            Item Code
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            placeholder="Item Code"
                          />
                        </div>
                      </div>
                      <div className="d-flex justify-content-center">
                        <div class="mb-3">
                          <label
                            for="exampleFormControlInput1"
                            class="form-label"
                          >
                            HSN Code
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            placeholder="HSN Code"
                          />
                        </div>
                        <div class="mb-3 mx-3">
                          <label
                            for="exampleFormControlInput1"
                            class="form-label"
                          >
                            HSN Code
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            placeholder="HSN Code"
                          />
                        </div>
                      </div>
                      <div className="d-flex justify-content-center">
                        <div class="mb-3">
                          <label
                            for="exampleFormControlInput1"
                            class="form-label"
                          >
                            Manufacturer
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            placeholder="Manufacturer"
                          />
                        </div>
                        <div class="mb-3 mx-3">
                          <label
                            for="exampleFormControlInput1"
                            class="form-label"
                          >
                            Low Stock Threshhold
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            placeholder="Low Stock Threshhold"
                          />
                        </div>
                      </div>
                      <div className="d-flex justify-content-center">
                        {" "}
                        <button className="btn btn-info" type="submit">
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
