import React, { useState } from "react";
import styled from "styled-components";
import Header from "../Header";
import Sider from "../Sider";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import cogoToast from "cogo-toast";

const VoucherCreater = () => {
  const user = useSelector((state) => state.user);
  console.log(
    `User Name: ${user.name}, User ID: ${user.id}, branch: ${user.branch}`
  );
  console.log("User State:", user);

  //filter for patient treated today card
  const getDate = new Date();
  const year = getDate.getFullYear();
  const month = String(getDate.getMonth() + 1).padStart(2, "0");
  const day = String(getDate.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;
  console.log(formattedDate);
  const [vdata, setVdata] = useState({
    branch_name: user.branch,
    for_name: "",
    for_use: "",
    voucher_amount: "",
    voucher_date: formattedDate,
    created_by: user.name,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setVdata({
      ...vdata,
      [name]: value,
    });
  };

  console.log(vdata);

  const addVoucher = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8888/api/v1/accountant/voucherCreate",
        vdata
      );
      cogoToast.success("voucher created successfully");
      setVdata({
        for_name: "",
        for_use: "",
        voucher_amount: "",
      });
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
              <div className="col-xxl-1 col-xl-1 col-lg-1 col-md-2 col-sm-2 p-0">
                <Sider />
              </div>

              <div className="col-xxl-11 col-xl-11 col-lg-11 col-md-10 col-sm-10">
                <div className="row d-flex justify-content-between">
                  <div className="col-12 col-md-4 mt-4">
                    <div>
                      <h5>Branch : Madan Mahal</h5>
                    </div>
                    <div className="mt-2">
                      <h3> Welcome to Dental Guru! </h3>
                    </div>
                    <div className="mt-3">
                      <h6>Accountant Dashboard</h6>
                    </div>
                  </div>

                  <div className="col-12 col-md-4 me-5 mt-5">
                    <form className="d-flex ms-auto my-sm" role="search">
                      <input
                        className="form-control me-2"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                      />
                      <button
                        className="btn btn-primary"
                        style={{ backgroundColor: "#201658" }}
                        type="submit"
                      >
                        Search
                      </button>
                    </form>
                  </div>
                </div>
                <form onSubmit={addVoucher}>
                  <div className="container-fluid mt-5">
                    <div className="row d-flex justify-content-center ms-5">
                      <div className="col-xxl-5 col-xl-5 col-lg-5 col-md-5 col-sm-5 ">
                        <h1 className="mb-3 ms-2">Voucher Create</h1>

                        <div class="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6 mt-4">
                          <div class="d-flex justify-content-center fs-5 mb-4 ms-5">
                            <div className="col-xxl-8 col-xl-8 col-lg-8 text-start fw-medium ms-5">
                              Paid to :
                            </div>
                            <div class="col-xxl-12 col-xl-12 col-lg-12">
                              <input
                                class="rounded"
                                type="text"
                                placeholder="Full Name"
                                name="for_name"
                                value={vdata.for_name}
                                onChange={handleChange}
                                required
                              />
                            </div>
                          </div>

                          <div class="d-flex justify-content-center fs-5 mb-4 ms-5">
                            <div className="col-xxl-8 col-xl-8 col-lg-8 text-start fw-medium ms-5">
                              Paid for :
                            </div>
                            <div class="col-xxl-12 col-xl-12 col-lg-12">
                              <input
                                class="rounded"
                                type="text"
                                placeholder="For What"
                                name="for_use"
                                value={vdata.for_use}
                                onChange={handleChange}
                                required
                              />
                            </div>
                          </div>
                          <div class="d-flex justify-content-center fs-5 mb-4 ms-5">
                            <div className="col-xxl-8 col-xl-8 col-lg-8 text-start fw-medium ms-5">
                              Amount :
                            </div>
                            <div class="col-xxl-12 col-xl-12 col-lg-12">
                              <input
                                class="rounded"
                                type="number"
                                placeholder="Ent Amount"
                                name="voucher_amount"
                                value={vdata.voucher_amount}
                                onChange={handleChange}
                                required
                              />
                            </div>
                          </div>

                          <div className="d-flex justify-content-end mt-4">
                            <td className="table-small">
                              <button
                                type="submit"
                                className="btn fw-medium fs-5 text-white"
                                style={{ backgroundColor: "#201658" }}
                              >
                                Submit
                              </button>
                            </td>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default VoucherCreater;

const Container = styled.div`
  h1 {
    font-weight: 600;
    font-size: 45px;
    margin-bottom: 30px;
  }
  input {
    width: 100%;
  }
`;
