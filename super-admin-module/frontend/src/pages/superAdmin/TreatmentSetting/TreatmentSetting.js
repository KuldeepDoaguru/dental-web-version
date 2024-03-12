import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import Sider from "../../../components/Sider";
import Header from "../../../components/Header";
import { FaSearch } from "react-icons/fa";
import BranchSelector from "../../../components/BranchSelector";
import axios from "axios";
import cogoToast from "cogo-toast";
import { IoMdArrowRoundBack } from "react-icons/io";

const TreatmentSetting = () => {
  const location = useLocation();
  const [showAddTreatments, setShowAddTreatments] = useState(false);
  const [showEditTreatments, setShowEditTreatments] = useState(false);
  const [keyword, setkeyword] = useState("");
  const [treatList, setTreatList] = useState([]);
  const [trID, setTrID] = useState();
  const [treatData, setTreatData] = useState({
    treatName: "",
    treatCost: "",
    treatDiscount: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    // Use spread syntax to update only the changed field
    setTreatData({
      ...treatData,
      [name]: value,
    });
  };

  console.log(treatData);

  const openAddTreatmentsPopup = (index, item) => {
    // setSelectedItem(item);
    console.log("open pop up");
    setShowAddTreatments(true);
  };

  const openEditTreatmentsPopup = (id) => {
    console.log(id);
    setTrID(id);
    // setSelectedItem(item);
    console.log("open pop up");
    setShowEditTreatments(true);
  };

  const closeUpdatePopup = () => {
    setShowAddTreatments(false);
    setShowEditTreatments(false);
  };

  const addTreatments = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://dentalgurusuperadmin.doaguru.com/api/v1/super-admin/addTreatment",
        treatData
      );
      console.log(response);
      cogoToast.success("Treatment Addded Successfully");
      closeUpdatePopup();
      getTreatmentList();
      treatData.treatName = "";
      treatData.treatCost = "";
      treatData.treatDiscount = "";
    } catch (error) {
      console.log(error);
    }
  };

  const getTreatmentList = async () => {
    try {
      const { data } = await axios.get(
        "https://dentalgurusuperadmin.doaguru.com/api/v1/super-admin/getTreatmentList"
      );
      console.log(data);
      setTreatList(data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateTreatmentDetails = async (e, id) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `https://dentalgurusuperadmin.doaguru.com/api/v1/super-admin/updateTreatmentDetails/${id}`,
        treatData
      );

      console.log(response);
      cogoToast.success("Treatment updated successfully");
      closeUpdatePopup();
      getTreatmentList();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTreatment = async (id) => {
    try {
      const response = await axios.delete(
        `https://dentalgurusuperadmin.doaguru.com/api/v1/super-admin/deleteTreatment/${id}`
      );
      getTreatmentList();
      cogoToast.success("Treatment deleted successfully");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTreatmentList();
  }, []);

  console.log(trID);

  const goBack = () => {
    window.history.go(-1);
  };
  return (
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
                <BranchSelector />
              </div>
              <div className="container-fluid mt-3">
                <button className="btn btn-success" onClick={goBack}>
                  <IoMdArrowRoundBack /> Back
                </button>
                <div className="container-fluid">
                  <div className="row mt-3">
                    {/* <div className="col-1"></div> */}

                    <div className="col-12">
                      <nav class="navbar navbar-expand-lg bg-body-tertiary">
                        <div class="container-fluid d-flex justify-content-center">
                          <h2 className="">Treatment Settings</h2>
                        </div>
                      </nav>
                    </div>
                    <div className="container-fluid">
                      <div className="row mt-5">
                        <div className="col-xxl-10 col-xl-10 col-lg-10 col-md-10 col-sm-12 col-12">
                          <input
                            type="text"
                            placeholder="search here"
                            className="inputser"
                            value={keyword}
                            onChange={(e) =>
                              setkeyword(e.target.value.toLowerCase())
                            }
                          />
                          <button className="mx-2 btn btn-info btnback">
                            <FaSearch />
                          </button>
                        </div>
                        <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                          <button
                            className="btn btn-info btnback"
                            onClick={() => openAddTreatmentsPopup()}
                          >
                            Add Treatment
                          </button>
                        </div>
                      </div>
                    </div>

                    <div class="table-responsive rounded">
                      <div className="banner-mid mt-2">
                        <div>
                          <h6 className="text-light">Treatments</h6>
                        </div>
                        <div>
                          <p className="fw-bold text-light">
                            Total Treatments - 25
                          </p>
                        </div>
                      </div>
                      <table class="table table-bordered rounded shadow">
                        <thead className="table-head">
                          <tr>
                            <th className="table-sno">Treatment ID</th>
                            <th className="table-small">Treatment Name</th>
                            <th className="table-small">Cost(INR)</th>
                            <th className="table-small">
                              Maximum Discount To give
                            </th>
                            <th className="table-small">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {treatList
                            ?.filter((val) => {
                              if (keyword === "") {
                                return true;
                              } else if (
                                val.treatment_name
                                  .toLowerCase()
                                  .includes(keyword) ||
                                val.treatment_name
                                  .toLowerCase()
                                  .includes(keyword)
                              ) {
                                return val;
                              }
                            })
                            .map((item) => (
                              <>
                                <tr className="table-row">
                                  <td className="table-sno">
                                    {item.treatment_id}
                                  </td>
                                  <td className="table-small">
                                    {item.treatment_name}
                                  </td>
                                  <td className="table-small">
                                    {item.treatment_cost}
                                  </td>
                                  <td className="table-small">
                                    {item.treatment_discount}
                                  </td>
                                  <td>
                                    <button
                                      className="btn btn-warning"
                                      onClick={() =>
                                        openEditTreatmentsPopup(
                                          item.treatment_id
                                        )
                                      }
                                    >
                                      Edit
                                    </button>
                                    <button
                                      type="button"
                                      class="btn btn-danger mx-2"
                                      data-bs-toggle="modal"
                                      data-bs-target="#exampleModal"
                                    >
                                      Delete
                                    </button>
                                  </td>
                                </tr>
                                <div
                                  class="modal fade rounded"
                                  id="exampleModal"
                                  tabindex="-1"
                                  aria-labelledby="exampleModalLabel"
                                  aria-hidden="true"
                                >
                                  <div class="modal-dialog rounded">
                                    <div class="modal-content">
                                      <div class="modal-header">
                                        <h1
                                          class="modal-title fs-5"
                                          id="exampleModalLabel"
                                        >
                                          Are you sure you want to delete this
                                          data
                                        </h1>
                                      </div>

                                      <div class="modal-footer d-flex justify-content-center">
                                        <button
                                          type="button"
                                          class="btn btn-danger"
                                          data-bs-dismiss="modal"
                                          onClick={() =>
                                            deleteTreatment(item.treatment_id)
                                          }
                                        >
                                          Yes
                                        </button>
                                        <button
                                          type="button"
                                          class="btn btn-secondary"
                                          data-bs-dismiss="modal"
                                        >
                                          Close
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* ***************************************************************************************************** */}
        {/* other pop-up */}
        {/* pop-up for adding lab */}
        <div className={`popup-container${showAddTreatments ? " active" : ""}`}>
          <div className="popup">
            <h4 className="text-center">Add Treatment</h4>
            <form
              onSubmit={addTreatments}
              className="d-flex flex-column"
              // onSubmit={handleNoticeSubmit}
            >
              <input
                type="text"
                placeholder="Add Treatment Name"
                className="rounded p-2"
                name="treatName"
                value={treatData.treatName}
                onChange={handleInputChange}
              />
              <br />
              <input
                type="text"
                placeholder="Add Cost"
                className="rounded p-2"
                name="treatCost"
                value={treatData.treatCost}
                onChange={handleInputChange}
              />
              <br />
              <input
                type="text"
                placeholder="Max Discount to give"
                className="rounded p-2"
                name="treatDiscount"
                value={treatData.treatDiscount}
                onChange={handleInputChange}
              />
              <br />

              <div className="d-flex justify-content-evenly">
                <button type="submit" className="btn btn-success mt-2">
                  Save
                </button>
                <button
                  type="button"
                  className="btn btn-danger mt-2"
                  onClick={closeUpdatePopup}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* pop-up for adding lab */}
        {/* ************************************************************************************* */}

        {/* ***************************************************************************************************** */}
        {/* other pop-up */}
        {/* pop-up for adding lab */}
        <div
          className={`popup-container${showEditTreatments ? " active" : ""}`}
        >
          <div className="popup">
            <h4 className="text-center">Edit Drugs Details</h4>
            <form
              className="d-flex flex-column"
              onSubmit={(e) => updateTreatmentDetails(e, trID)}
            >
              <input
                type="text"
                placeholder="Add Treatment Name"
                className="rounded p-2"
                name="treatName"
                value={treatData.treatName}
                onChange={handleInputChange}
              />
              <br />
              <input
                type="text"
                placeholder="Add Cost"
                className="rounded p-2"
                name="treatCost"
                value={treatData.treatCost}
                onChange={handleInputChange}
              />
              <br />
              <input
                type="text"
                placeholder="Max Discount to give"
                className="rounded p-2"
                name="treatDiscount"
                value={treatData.treatDiscount}
                onChange={handleInputChange}
              />
              <br />

              <div className="d-flex justify-content-evenly">
                <button type="submit" className="btn btn-success mt-2">
                  Save
                </button>
                <button
                  type="button"
                  className="btn btn-danger mt-2"
                  onClick={closeUpdatePopup}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* pop-up for adding lab */}
        {/* ************************************************************************************* */}
      </div>
    </Container>
  );
};

export default TreatmentSetting;
const Container = styled.div`
  .inputser {
    border-radius: 1.5rem;
    padding: 0.5rem;
    width: 80%;
  }

  .navlink.active {
    background-color: red;
    color: white;
    border-radius: 1rem;
  }

  .banner-mid {
    background-color: #004aad;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .popup-container {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    align-items: center;
    justify-content: center;
  }

  .popup-container.active {
    display: flex;
    background-color: #00000075;
  }

  .popup {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  .btnback {
    background: #004aad;
    color: white;
  }
`;
