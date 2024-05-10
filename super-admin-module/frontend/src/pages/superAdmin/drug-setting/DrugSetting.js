import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../../../components/Header";
import Sider from "../../../components/Sider";
import { Link, useLocation } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import BranchSelector from "../../../components/BranchSelector";
import { useDispatch, useSelector } from "react-redux";
import { IoMdArrowRoundBack } from "react-icons/io";
import axios from "axios";
import cogoToast from "cogo-toast";

const DrugSetting = () => {
  const [showAddDrugs, setShowAddDrugs] = useState(false);
  const [showEditDrugs, setShowEditDrugs] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  console.log(`User Name: ${user.name}, User ID: ${user.id}`);
  console.log("User State:", user);
  const branch = useSelector((state) => state.branch);
  console.log(`User Name: ${branch.name}`);
  const location = useLocation();
  const [getDrugList, setGetDrugList] = useState([]);
  const [selected, setSelected] = useState();
  const [addDrugs, setAddDrugs] = useState({
    HSN_code: "",
    item_code: "",
    drug_name: "",
    drug_strength: "",
    instruction: "",
    branch_name: branch.name,
  });
  const [upaAddDrugs, setUpAddDrugs] = useState({
    HSN_code: "",
    item_code: "",
    drug_name: "",
    drug_strength: "",
    instruction: "",
  });

  const handleAddDrugs = (event) => {
    const { name, value } = event.target;
    setAddDrugs({
      ...addDrugs,
      [name]: value,
    });
  };

  const handleUpdateDrugs = (event) => {
    const { name, value } = event.target;
    setUpAddDrugs({
      ...upaAddDrugs,
      [name]: value,
    });
  };

  const openAddDrugsPopup = (index, item) => {
    // setSelectedItem(item);
    console.log("open pop up");
    setShowAddDrugs(true);
  };

  const openEditDrugsPopup = (id) => {
    setSelected(id);
    console.log("open pop up");
    setShowEditDrugs(true);
  };

  const closeUpdatePopup = () => {
    setShowAddDrugs(false);
    setShowEditDrugs(false);
  };

  const getDrugsData = async () => {
    try {
      const { data } = await axios.get(
        `https://dentalgurusuperadmin.doaguru.com/api/v1/super-admin/getDrugs/${branch.name}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setGetDrugList(data);
    } catch (error) {
      console.log(error);
    }
  };

  const addDrugData = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://dentalgurusuperadmin.doaguru.com/api/v1/super-admin/addDrugs",
        addDrugs,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log(response);
      closeUpdatePopup();
      getDrugsData();
      cogoToast.success("drugs details updated successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const updateDrugDetails = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `https://dentalgurusuperadmin.doaguru.com/api/v1/super-admin/updateDrugDetails/${selected}`,
        upaAddDrugs,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      closeUpdatePopup();
      console.log(response);
      getDrugsData();
      cogoToast.success("drugs details updated successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const deleteDrug = async (id) => {
    try {
      const response = await axios.delete(
        `https://dentalgurusuperadmin.doaguru.com/api/v1/super-admin/deleteDrug/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      getDrugsData();
      cogoToast.success("drugs details deleted successfully");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDrugsData();
  }, [branch.name]);

  const goBack = () => {
    window.history.go(-1);
  };

  console.log(getDrugList);
  console.log(addDrugs);

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
                    <div>
                      {/* <Link to="/register-doctor">
                        <button className="btn btn-success">Add Doctor</button>
                      </Link> */}
                    </div>
                  </div>
                </div>
                <div className="container-fluid mt-3">
                  <button className="btn btn-success" onClick={goBack}>
                    <IoMdArrowRoundBack /> Back
                  </button>
                  <h3 className="text-center">Drug Settings</h3>
                  <div className="container-fluid">
                    <div className="row mt-5">
                      <div className="col-xxl-10 col-xl-10 col-lg-10 col-md-10 col-sm-12 col-12">
                        <input
                          type="text"
                          placeholder="search here"
                          className="inputser"
                        />
                        <button className="mx-2 btn btn-info">
                          <FaSearch />
                        </button>
                      </div>
                      <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                        <button
                          className="btn btn-info fw-bold"
                          onClick={() => openAddDrugsPopup()}
                        >
                          Add Drugs
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="container-fluid mt-3">
                    <div className="banner-mid">
                      <div>
                        <h6 className="text-light">Drug List</h6>
                      </div>
                      <div>
                        <p className="fw-bold text-light">Total Drug - 52</p>
                      </div>
                    </div>
                    <div class="table-responsive rounded">
                      <table class="table table-bordered rounded shadow">
                        <thead className="table-head">
                          <tr>
                            <th className="table-sno">Drug ID</th>
                            <th>HSN Code</th>
                            <th>Item Code</th>
                            <th
                              className="table-small"
                              style={{ width: "20%" }}
                            >
                              Drug Name
                            </th>
                            <th
                              className="table-small"
                              style={{ width: "20%" }}
                            >
                              Drug Strength
                            </th>
                            <th className="table-small">Instructions</th>
                            <th className="table-small">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {getDrugList?.map((item) => (
                            <>
                              <tr className="table-row">
                                <td className="table-sno">{item.drug_id}</td>
                                <td>{item.HSN_code}</td>
                                <td>{item.item_code}</td>
                                <td
                                  className="table-small"
                                  style={{ width: "20%" }}
                                >
                                  {item.drug_name}
                                </td>
                                <td
                                  className="table-small"
                                  style={{ width: "20%" }}
                                >
                                  {item.drug_strength}
                                </td>
                                <td className="table-small">
                                  {item.instruction}
                                </td>
                                <td>
                                  <button
                                    className="btn btn-warning"
                                    onClick={() =>
                                      openEditDrugsPopup(item.drug_id)
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
                                        onClick={() => deleteDrug(item.drug_id)}
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
          {/* ***************************************************************************************************** */}
          {/* other pop-up */}
          {/* pop-up for adding lab */}
          <div className={`popup-container${showAddDrugs ? " active" : ""}`}>
            <div className="popup">
              <h4 className="text-center">Add Drugs</h4>
              <form className="d-flex flex-column" onSubmit={addDrugData}>
                <input
                  type="text"
                  placeholder="Add HSN Code"
                  className="rounded p-2"
                  name="HSN_code"
                  value={addDrugs.HSN_code}
                  onChange={handleAddDrugs}
                />
                <br />
                <input
                  type="text"
                  placeholder="Add Item Code"
                  className="rounded p-2"
                  name="item_code"
                  value={addDrugs.item_code}
                  onChange={handleAddDrugs}
                />
                <br />
                <input
                  type="text"
                  placeholder="Add Drug Name"
                  className="rounded p-2"
                  name="drug_name"
                  value={addDrugs.drug_name}
                  onChange={handleAddDrugs}
                />
                <br />
                <input
                  type="text"
                  placeholder="Add strength"
                  className="rounded p-2"
                  name="drug_strength"
                  value={addDrugs.drug_strength}
                  onChange={handleAddDrugs}
                />
                <br />
                <input
                  type="text"
                  placeholder="Add Instruction"
                  className="rounded p-2"
                  name="instruction"
                  value={addDrugs.instruction}
                  onChange={handleAddDrugs}
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
          <div className={`popup-container${showEditDrugs ? " active" : ""}`}>
            <div className="popup">
              <h4 className="text-center">Edit Drugs Details</h4>
              <form className="d-flex flex-column" onSubmit={updateDrugDetails}>
                <input
                  type="text"
                  placeholder="Add HSN Code"
                  className="rounded p-2"
                  name="HSN_code"
                  value={upaAddDrugs.HSN_code}
                  onChange={handleUpdateDrugs}
                />
                <br />
                <input
                  type="text"
                  placeholder="Add Item Code"
                  className="rounded p-2"
                  name="item_code"
                  value={upaAddDrugs.item_code}
                  onChange={handleUpdateDrugs}
                />
                <br />
                <input
                  type="text"
                  placeholder="Add Drug Name"
                  className="rounded p-2"
                  name="drug_name"
                  value={upaAddDrugs.drug_name}
                  onChange={handleUpdateDrugs}
                />
                <br />
                <input
                  type="text"
                  placeholder="Add strength"
                  className="rounded p-2"
                  name="drug_strength"
                  value={upaAddDrugs.drug_strength}
                  onChange={handleUpdateDrugs}
                />
                <br />
                <input
                  type="text"
                  placeholder="Add Instruction"
                  className="rounded p-2"
                  name="instruction"
                  value={upaAddDrugs.instruction}
                  onChange={handleUpdateDrugs}
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
    </>
  );
};

export default DrugSetting;
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
`;
