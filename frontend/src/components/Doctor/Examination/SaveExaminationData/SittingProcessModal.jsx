import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import cogoToast from "cogo-toast";

const SittingProcessModal = ({ onClose, selectedData }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const branch = user.currentUser.branch_name;
  console.log(branch);
  console.log(selectedData);
  const [show, setShow] = useState(true);
  const [sitConsider, setSitConsider] = useState("");
  const [treat, setTreat] = useState([]);
  const [showBook, setShowBook] = useState(false);
  const [formData, setFormData] = useState({
    current_sitting: selectedData.current_sitting + 1,
    current_sitting_status: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevInputItem) => ({
      ...prevInputItem,
      [name]: value,
    }));
  };

  // Access the updated formData in the callback

  console.log(formData);
  const updateSitting = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `http://localhost:8888/api/doctor/updateTreatSitting/${branch}/${selectedData.ts_id}`,
        formData
      );
      cogoToast.success("sitting considered");
      console.log(data.result.consider_sitting);
      setTreat(data.result.consider_sitting);
      navigate(
        `/treatmentDashTwo/${selectedData.ts_id}/${selectedData.appoint_id}/${selectedData.tp_id}/${selectedData.treatment_name}`
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Wrapper className="container">
        <>
          <Modal show={true} onHide={onClose}>
            <Modal.Header closeButton>
              <Modal.Title>Set Sitting</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {show && (
                <form onSubmit={updateSitting}>
                  {/* <div class="mb-3 d-flex flex-column">
                    <label for="recipient-id" class="col-form-label">
                      Select Treatment
                    </label>
                    <select
                      name="consider_sitting"
                      id=""
                      required
                      className="rounded p-1"
                      onChange={handleChange}
                      value={formData.consider_sitting}
                    >
                      <option value="">-select-</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div> */}
                  <div class="mb-3">
                    <label for="recipient-id" class="col-form-label">
                      Current Sitting
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="recipient-id"
                      name="current_sitting"
                      value={formData.current_sitting}
                    />
                  </div>

                  <div class="mb-3">
                    <label for="recipient-id" class="col-form-label">
                      Current Sitting Status
                    </label>
                    <select
                      class="form-control"
                      id=""
                      name="current_sitting_status"
                      onChange={handleChange}
                      value={formData.current_sitting_status}
                    >
                      <option value="">-select-</option>
                      <option value="pending">Pending</option>
                      <option value="ongoing">Ongoing</option>
                    </select>
                  </div>

                  <div class="mb-3 d-flex justify-content-between">
                    {/* {sitConsider === "yes" ? (
                    <button className="btn btn-warning shadow d-none">
                      Book Next Sitting
                    </button>
                  ) : (
                    <button className="btn btn-warning shadow">
                      Book Next Sitting
                    </button>
                  )} */}

                    <button type="submit" class="btn btn-primary">
                      Submit
                    </button>
                  </div>
                </form>
              )}
              {/* {showBook && (
                <>
                  <button
                    className="btn btn-warning shadow"
                    onClick={openBookAppoint}
                  >
                    Book Next Sitting
                  </button>
                </>
              )} */}
            </Modal.Body>
          </Modal>
        </>
      </Wrapper>
    </>
  );
};

export default SittingProcessModal;
const Wrapper = styled.div``;
