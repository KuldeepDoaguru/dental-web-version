import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Sider from "../../../components/Sider";
import Header from "../../../components/Header";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import BranchSelector from "../../../components/BranchSelector";
import { useDispatch, useSelector } from "react-redux";
import { IoMdArrowRoundBack } from "react-icons/io";
import axios from "axios";
import cogoToast from "cogo-toast";

const PrescriptionTemplate = () => {
  const [showAddPreTemp, setShowAddPreTemp] = useState(false);
  const [showEditPreTemp, setShowEditPreTemp] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  console.log(`User Name: ${user.name}, User ID: ${user.id}`);
  console.log("User State:", user);
  const branch = useSelector((state) => state.branch);
  console.log(`User Name: ${branch.name}`);
  const location = useLocation();
  const [getPresList, setGetPresList] = useState([]);
  const [keyword, setkeyword] = useState("");
  const [selected, setSelected] = useState();
  const [pressById, setPressById] = useState([]);
  const [addPres, setAddPres] = useState({
    branch_name: branch.name,
    medicine_name: "",
    dosage: "",
    frequency: "",
    duration: "",
    notes: "",
  });

  const [upPres, setUpPres] = useState({
    medicine_name: "",
    dosage: "",
    frequency: "",
    duration: "",
    notes: "",
  });

  const handleAddPres = (event) => {
    const { name, value } = event.target;
    setAddPres({
      ...addPres,
      [name]: value,
    });
  };

  const handleUpdatePres = (event) => {
    const { name, value } = event.target;
    setUpPres({
      ...upPres,
      [name]: value,
    });
  };

  console.log(addPres);
  console.log(upPres);

  const openAddPreTempPopup = (index, item) => {
    // setSelectedItem(item);
    console.log("open pop up");
    setShowAddPreTemp(true);
  };

  const openEditPreTempPopup = (id) => {
    setSelected(id);
    console.log("open pop up");
    setShowEditPreTemp(true);
  };

  const closeUpdatePopup = () => {
    setShowAddPreTemp(false);
    setShowEditPreTemp(false);
  };

  const goBack = () => {
    window.history.go(-1);
  };

  const getPrescriptionDetails = async () => {
    try {
      const { data } = await axios.get(
        `https://dentalgurusuperadmin.doaguru.com/api/v1/super-admin/getPrescription/${branch.name}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setGetPresList(data);
    } catch (error) {
      console.log(error);
    }
  };

  const addPrescriptionDetails = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://dentalgurusuperadmin.doaguru.com/api/v1/super-admin/addPrescription",
        addPres,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      closeUpdatePopup();
      getPrescriptionDetails();
      cogoToast.success("prescription details added successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const getPresDetailsById = async () => {
    try {
      const { data } = await axios.get(
        `https://dentalgurusuperadmin.doaguru.com/api/v1/super-admin/getPrescriptionById/${selected}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setPressById(data);
    } catch (error) {
      console.log(error);
    }
  };

  const updatePresData = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `https://dentalgurusuperadmin.doaguru.com/api/v1/super-admin/updatePrescriptionDetails/${selected}`,
        upPres,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      closeUpdatePopup();
      getPrescriptionDetails();
      cogoToast.success("prescription details updated successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const deletePrescription = async (id) => {
    alert("hello");
    try {
      const response = await axios.delete(
        `https://dentalgurusuperadmin.doaguru.com/api/v1/super-admin/deletePrescription/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      getPrescriptionDetails();
      cogoToast.success("prescription deleted successfully");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPrescriptionDetails();
  }, [branch.name]);

  console.log(pressById);
  console.log(selected);

  useEffect(() => {
    getPresDetailsById();
  }, [selected]);

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
                      {/* <Link to="/superadmin-add-branch">
                          <button className="btn btn-success">
                            Add Branch
                          </button>
                        </Link> */}
                    </div>
                  </div>
                </div>
                <div className="container-fluid mt-3">
                  <button className="btn btn-success" onClick={goBack}>
                    <IoMdArrowRoundBack /> Back
                  </button>
                  <h3 className="text-center">
                    {" "}
                    Prescription Template Settings
                  </h3>
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
                        <button className="mx-2 btn btn-info">
                          <FaSearch />
                        </button>
                      </div>
                      <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                        <button
                          className="btn btn-info"
                          onClick={() => openAddPreTempPopup()}
                        >
                          Add Prescription Template
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="container-fluid mt-3">
                    <div className="banner-mid">
                      <div>
                        <h6 className="text-light">
                          Prescription Template List
                        </h6>
                      </div>
                      <div>
                        <p className="fw-bold text-light">Total - 30</p>
                      </div>
                    </div>
                    <div class="table-responsive rounded">
                      <table class="table table-bordered rounded shadow">
                        <thead className="table-head">
                          <tr>
                            <th className="table-sno">Prescription ID</th>
                            <th className="table-small">Medicine Name</th>
                            <th className="table-small">Dosage</th>
                            <th className="table-small">Frequency</th>
                            <th className="table-small">Duration</th>
                            <th>Note</th>
                            <th className="table-small">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {getPresList
                            ?.filter((val) => {
                              if (keyword === "") {
                                return true;
                              } else if (
                                val.medicine_name
                                  .toLowerCase()
                                  .includes(keyword.toLowerCase())
                              ) {
                                return val;
                              }
                            })
                            .map((item) => (
                              <>
                                <tr className="table-row">
                                  <td className="table-sno">{item.pr_id}</td>
                                  <td className="table-small">
                                    {item.medicine_name}
                                  </td>
                                  <td className="table-small">{item.dosage}</td>
                                  <td className="table-small">
                                    {item.frequency}
                                  </td>
                                  <td className="table-small">
                                    {item.duration}
                                  </td>
                                  <td>{item.notes}</td>
                                  <td>
                                    <button
                                      className="btn btn-warning"
                                      onClick={() =>
                                        openEditPreTempPopup(item.pr_id)
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
                                            deletePrescription(item.pr_id)
                                          }
                                        >
                                          Confirm
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
          <div className={`popup-container${showAddPreTemp ? " active" : ""}`}>
            <div className="popup">
              <h4 className="text-center">Add Prescription Template</h4>
              <form
                className="d-flex flex-column"
                onSubmit={addPrescriptionDetails}
              >
                <input
                  type="text"
                  placeholder="Prescription Name"
                  className="rounded p-2"
                  name="medicine_name"
                  value={addPres.medicine_name}
                  onChange={handleAddPres}
                />
                <br />
                <input
                  type="text"
                  placeholder="Add dosage"
                  className="rounded p-2"
                  name="dosage"
                  value={addPres.dosage}
                  onChange={handleAddPres}
                />
                <br />
                <input
                  type="text"
                  placeholder="Add frequency"
                  className="rounded p-2"
                  name="frequency"
                  value={addPres.frequency}
                  onChange={handleAddPres}
                />
                <br />
                <input
                  type="text"
                  placeholder="Add duration"
                  className="rounded p-2"
                  name="duration"
                  value={addPres.duration}
                  onChange={handleAddPres}
                />
                <br />
                <input
                  type="text"
                  placeholder="Add notes"
                  className="rounded p-2"
                  name="notes"
                  value={addPres.notes}
                  onChange={handleAddPres}
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
          <div className={`popup-container${showEditPreTemp ? " active" : ""}`}>
            <div className="popup">
              <h4 className="text-center">Edit Prescription Template</h4>
              <form className="d-flex flex-column" onSubmit={updatePresData}>
                <input
                  type="text"
                  placeholder={pressById[0]?.medicine_name}
                  className="rounded p-2"
                  name="medicine_name"
                  value={upPres.medicine_name}
                  onChange={handleUpdatePres}
                />
                <br />
                <input
                  type="text"
                  placeholder={pressById[0]?.dosage}
                  className="rounded p-2"
                  name="dosage"
                  value={upPres.dosage}
                  onChange={handleUpdatePres}
                />
                <br />
                <input
                  type="text"
                  placeholder={pressById[0]?.frequency}
                  className="rounded p-2"
                  name="frequency"
                  value={upPres.frequency}
                  onChange={handleUpdatePres}
                />
                <br />
                <input
                  type="text"
                  placeholder={pressById[0]?.duration}
                  className="rounded p-2"
                  name="duration"
                  value={upPres.duration}
                  onChange={handleUpdatePres}
                />
                <br />
                <input
                  type="text"
                  placeholder={pressById[0]?.notes}
                  className="rounded p-2"
                  name="notes"
                  value={upPres.notes}
                  onChange={handleUpdatePres}
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

export default PrescriptionTemplate;
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
