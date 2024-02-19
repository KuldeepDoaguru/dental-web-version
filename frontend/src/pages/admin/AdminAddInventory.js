import React from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import HeaderAdmin from "./HeaderAdmin";
import SiderAdmin from "./SiderAdmin";

const AdminAddInventory = () => {
  const location = useLocation();

  const goBack = () => {
    window.history.go(-1);
  };
  return (
    <>
      <Container>
        <HeaderAdmin />
        <div className="main">
          <div className="container-fluid">
            <div className="row flex-nowrap ">
              <div className="col-lg-1 col-1 p-0">
                <SiderAdmin />
              </div>
              <div className="col-lg-11 col-11 ps-0">
                <div className="container-fluid mt-3">
                  <button className="btn btn-success shadow" onClick={goBack}>
                    <IoMdArrowRoundBack /> Back
                  </button>
                  <h3 className="text-center">Add Inventory Item</h3>
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
                      <div className="form-group">
                        <div className="d-flex">
                          <div className="input-group">
                            <label htmlFor="" className="fw-bold">
                              Item Name
                            </label>
                            <input
                              type="text"
                              placeholder="Item Name"
                              className="rounded p-2 w-100"
                              // value={noticeData.linkURL}
                              // onChange={(e) =>
                              //   setNoticeData({
                              //     ...noticeData,
                              //     linkURL: e.target.value,
                              //   })
                              // }
                            />
                          </div>
                          <div className="input-group mx-2">
                            <label htmlFor="" className="fw-bold">
                              Item Code
                            </label>
                            <input
                              type="text"
                              placeholder="Item Code"
                              className="rounded p-2 w-100"
                            />
                          </div>
                        </div>
                        <div className="d-flex mt-2">
                          <div className="input-group">
                            <label htmlFor="" className="fw-bold">
                              HSN Code
                            </label>
                            <input
                              type="text"
                              placeholder="HSN Code"
                              className="rounded p-2 w-100"
                              // value={noticeData.linkURL}
                              // onChange={(e) =>
                              //   setNoticeData({
                              //     ...noticeData,
                              //     linkURL: e.target.value,
                              //   })
                              // }
                            />
                          </div>
                          <div className="input-group mx-2">
                            <label htmlFor="" className="fw-bold">
                              Item Type
                            </label>
                            <select name="" id="" className="rounded p-2 w-100">
                              <option value="">Drug</option>
                              <option value="">Equipment</option>
                              <option value="">Supplies</option>
                            </select>
                          </div>
                        </div>
                        <div className="d-flex mt-2">
                          <div className="input-group">
                            <label htmlFor="" className="fw-bold">
                              Last Generate Bill Date
                            </label>
                            <input
                              type="date"
                              placeholder="Last Generate Bill"
                              className="rounded p-2 w-100"
                              // value={noticeData.linkURL}
                              // onChange={(e) =>
                              //   setNoticeData({
                              //     ...noticeData,
                              //     linkURL: e.target.value,
                              //   })
                              // }
                            />
                          </div>
                          <div className="input-group mx-2">
                            <label htmlFor="" className="fw-bold">
                              MRP
                            </label>
                            <input
                              type="text"
                              placeholder="MRP"
                              className="rounded p-2 w-100"
                              // value={noticeData.linkURL}
                              // onChange={(e) =>
                              //   setNoticeData({
                              //     ...noticeData,
                              //     linkURL: e.target.value,
                              //   })
                              // }
                            />
                          </div>
                        </div>
                        <div className="d-flex mt-2">
                          <div className="input-group">
                            <label htmlFor="" className="fw-bold">
                              Available Stock
                            </label>
                            <input
                              type="text"
                              placeholder="Available Stock"
                              className="rounded p-2 w-100"
                              // value={noticeData.linkURL}
                              // onChange={(e) =>
                              //   setNoticeData({
                              //     ...noticeData,
                              //     linkURL: e.target.value,
                              //   })
                              // }
                            />
                          </div>
                          <div className="input-group mx-2">
                            <label htmlFor="" className="fw-bold">
                              Status
                            </label>
                            <select name="" id="" className="rounded p-2 w-100">
                              <option value="">inStock</option>
                              <option value="">OutStock</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex justify-content-center mt-3 ">
                        <button
                          className="btn btn-info fw-bold fs-4 shadow"
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
      </Container>
    </>
  );
};

export default AdminAddInventory;
const Container = styled.div`
  .select-style {
    border: none;
    background-color: #22a6b3;
    font-weight: bold;
    color: white;
  }
`;
