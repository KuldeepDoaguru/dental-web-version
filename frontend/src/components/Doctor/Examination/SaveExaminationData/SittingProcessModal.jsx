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

const SittingProcessModal = ({ onClose, selectedData, openBookAppoint }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const branch = user.currentUser.branch_name;
  console.log(branch);
  console.log(selectedData);
  const [show, setShow] = useState(true);
  const [sitConsider, setSitConsider] = useState("");
  const [treat, setTreat] = useState([]);
  const [showBook, setShowBook] = useState(false);

  const updateSitting = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `http://localhost:8888/api/doctor/updateTreatSitting/${branch}/${selectedData.ts_id}`,
        {
          consider_sitting: sitConsider,
        }
      );
      cogoToast.success("sitting considered");
      console.log(data.result.consider_sitting);
      setTreat(data.result.consider_sitting);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (treat === "yes" && selectedData.total_sitting === "1") {
      setShow(true);
      setShowBook(false);
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
                      name=""
                      id=""
                      required
                      className="rounded p-1"
                      onChange={(e) => setSitConsider(e.target.value)}
                    >
                      <option value="">-select-</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>
                  {/* <div class="mb-3">
                  <label for="recipient-id" class="col-form-label">
                    Note
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="recipient-id"
                    onChange={(e) => setNote(e.target.value)}
                  />
                </div> */}
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
