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

const SittingProcessModal = ({ onClose, selectedData, openBookAppoint }) => {
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
    consider_sitting: "",
    current_sitting: "",
    upcoming_sitting: "",
    current_sitting_status: "",
    upcoming_sitting_status: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    // Update formData with the new value
    setFormData((prevInputItem) => ({
      ...prevInputItem,
      [name]: value,
    }));

    // Access the updated formData in the callback

    setFormData((prevInputItem) => {
      if (
        selectedData.total_sitting === "1" &&
        prevInputItem.consider_sitting === "yes"
      ) {
        return {
          ...prevInputItem,
          current_sitting: "1",
          upcoming_sitting: "",
          current_sitting_status: "ongoing",
          upcoming_sitting_status: "",
        };
      } else if (
        selectedData.total_sitting > "1" &&
        prevInputItem.consider_sitting === "yes"
      ) {
        return {
          ...prevInputItem,
          current_sitting: "1",
          upcoming_sitting: "2",
          current_sitting_status: "ongoing",
          upcoming_sitting_status: "hold",
        };
      } else {
        return {
          ...prevInputItem,
          current_sitting: "",
          upcoming_sitting: "1",
          current_sitting_status: "",
          upcoming_sitting_status: "hold",
        };
      }
    });
  };

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
        `/SecurityAmount/${selectedData.appoint_id}/${selectedData.tp_id}`
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (treat === "yes" && selectedData.total_sitting === "1") {
      setShow(true);
      setShowBook(false);
      onClose();
    } else if (treat === "no" && selectedData.total_sitting === "1") {
      setShow(false);
      setShowBook(true);
    } else if (treat === "yes" && selectedData.total_sitting > 1) {
      setShow(false);
      setShowBook(true);
    } else if (treat === "no" && selectedData.total_sitting > 1) {
      setShow(false);
      setShowBook(true);
    }
  }, [treat, selectedData.total_sitting]);

  console.log(treat);
  console.log(show, showBook);

  return (
    <>
      <Wrapper className="container">
        <>
          <Modal show={true} onHide={onClose}>
            <Modal.Header closeButton>
              <Modal.Title>Book Next Sitting</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {show && (
                <form onSubmit={updateSitting}>
                  <div class="mb-3 d-flex flex-column">
                    <label for="recipient-id" class="col-form-label">
                      Consider this First Sitting?
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
                  </div>
                  <div class="mb-3">
                    <label for="recipient-id" class="col-form-label">
                      Current Sitting
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="recipient-id"
                      name="current_sitting"
                      onChange={handleChange}
                      value={formData.current_sitting}
                    />
                  </div>

                  <div class="mb-3">
                    <label for="recipient-id" class="col-form-label">
                      Upcoming Sitting
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id=""
                      name="upcoming_sitting"
                      onChange={handleChange}
                      value={formData.upcoming_sitting}
                    />
                  </div>
                  <div class="mb-3">
                    <label for="recipient-id" class="col-form-label">
                      Current Sitting Status
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id=""
                      name="current_sitting_status"
                      onChange={handleChange}
                      value={formData.current_sitting_status}
                    />
                  </div>

                  <div class="mb-3">
                    <label for="recipient-id" class="col-form-label">
                      Upcoming Sitting Status
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id=""
                      name="upcoming_sitting_status"
                      onChange={handleChange}
                      value={formData.upcoming_sitting_status}
                    />
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
              {showBook && (
                <>
                  <button
                    className="btn btn-warning shadow"
                    onClick={openBookAppoint}
                  >
                    Book Next Sitting
                  </button>
                </>
              )}
            </Modal.Body>
          </Modal>
        </>
      </Wrapper>
    </>
  );
};

export default SittingProcessModal;
const Wrapper = styled.div``;
