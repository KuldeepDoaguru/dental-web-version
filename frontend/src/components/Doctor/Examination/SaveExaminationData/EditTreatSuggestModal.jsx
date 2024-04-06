import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";

import cogoToast from "cogo-toast";
import { toggleTableRefresh } from "../../../../redux/user/userSlice";

const EditTreatSuggestModal = ({ onClose, selectedData, openBookAppoint }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const branch = user.currentUser.branch_name;
  console.log(branch);
  console.log(selectedData);
  const [changeSitting, setChangeSitting] = useState(
    selectedData.total_sitting
  );

  console.log("total", selectedData.total_sitting);
  console.log("current", selectedData.current_sitting);
  const updateSitting = async (e) => {
    e.preventDefault();
    try {
      if (selectedData.current_sitting < changeSitting) {
        const { data } = await axios.put(
          `http://localhost:8888/api/doctor/updateTreatSuggestion/${selectedData.ts_id}/${branch}`,
          { total_sitting: changeSitting }
        );
        cogoToast.success("sitting updated");
        onClose();
        dispatch(toggleTableRefresh());
      } else {
        cogoToast.error("You don't have enough sitting to reduce!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(changeSitting);
  return (
    <>
      <Wrapper className="container">
        <>
          <Modal show={true} onHide={onClose}>
            <Modal.Header closeButton>
              <Modal.Title>Book Next Sitting</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={updateSitting}>
                <div class="mb-3 d-flex flex-column">
                  <label for="recipient-id" class="col-form-label">
                    Treatment
                  </label>
                  <input
                    type="text"
                    readOnly
                    className="p-2 rounded"
                    value={selectedData.treatment_name}
                  />
                </div>
                <div class="mb-3">
                  <label for="recipient-id" class="col-form-label">
                    Current Sitting
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    readOnly
                    value={selectedData.current_sitting}
                  />
                </div>

                <div class="mb-3">
                  <label for="recipient-id" class="col-form-label">
                    Total Sitting
                  </label>
                  <input
                    type="number"
                    class="form-control"
                    required
                    onChange={(e) => setChangeSitting(e.target.value)}
                    value={changeSitting}
                  />
                </div>

                <div class="mb-3 d-flex justify-content-between">
                  <button type="submit" class="btn btn-primary">
                    Submit
                  </button>
                </div>
              </form>
            </Modal.Body>
          </Modal>
        </>
      </Wrapper>
    </>
  );
};

export default EditTreatSuggestModal;
const Wrapper = styled.div``;
