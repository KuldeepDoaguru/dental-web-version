import axios from "axios";
import cogoToast from "cogo-toast";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const AdminLab = () => {
  const user = useSelector((state) => state.user.currentUser);
  console.log(user);
  const [showPopup, setShowPopup] = useState(false);
  const [branchList, setBranchList] = useState([]);
  const { refreshTable } = useSelector((state) => state.user);
  const [selectedItem, setSelectedItem] = useState();
  const [labList, setLabList] = useState([]);
  const [upLabField, setUpLabField] = useState({
    branch: "",
    name: "",
    type: "",
    contact: "",
    email: "",
    address: "",
    status: "",
  });

  const handleAddLabChange = (event) => {
    const { name, value } = event.target;
    setUpLabField((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  console.log(upLabField);

  const openUpdatePopup = (item) => {
    setSelectedItem(item);
    console.log("open pop up");
    setShowPopup(true);
  };

  console.log(selectedItem);

  const closeUpdatePopup = () => {
    setShowPopup(false);
  };

  console.log(showPopup);

  const getListLabDetails = async () => {
    try {
      const { data } = await axios.get(
        `https://dentalguruadmin.doaguru.com/api/v1/admin/getLabList/${user.branch_name}`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setLabList(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getListLabDetails();
  }, [refreshTable]);

  console.log(labList);

  const updateLabData = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `https://dentalguruadmin.doaguru.com/api/v1/admin/updateLabDetails/${selectedItem.lab_id}`,
        upLabField,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      cogoToast.success("Lab details updated successfully");
      getListLabDetails();
      closeUpdatePopup();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteLabData = async (id) => {
    try {
      const isConfirmed = window.confirm("Are you sure you want to delete?");
      if (isConfirmed) {
        const response = await axios.delete(
          `https://dentalguruadmin.doaguru.com/api/v1/admin/labDelete/${id}`,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        cogoToast.success("lab deleted successfully");
        getListLabDetails();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getBranchList = async () => {
    try {
      const { data } = await axios.get(
        "https://dentalguruadmin.doaguru.com/api/v1/admin/getBranch",
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log(data);
      setBranchList(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBranchList();
  }, []);

  console.log(branchList);
  return (
    <>
      <Container>
        <div class="table-responsive mt-4">
          <table class="table table-bordered">
            <thead className="table-head">
              <tr>
                <th>Lab Name</th>
                <th>Lab Type</th>
                <th>Contact</th>
                <th>Email</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {labList?.map((item) => (
                <>
                  <tr className="table-row">
                    <td>{item.branch_name}</td>
                    <td>{item.lab_name}</td>
                    <td>{item.lab_type}</td>
                    <td>{item.lab_contact}</td>
                    <td>{item.lab_email}</td>
                    <td>{item.address}</td>
                    <td>{item.status}</td>
                    <td>
                      <button
                        className="btn btn-warning"
                        onClick={() => openUpdatePopup(item.lab_id)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger mx-1"
                        onClick={() => deleteLabData(item.lab_id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>

          {/* pop-up for creating notice */}
          <div className={`popup-container${showPopup ? " active" : ""}`}>
            <div className="popup">
              <h2>Update Lab Details</h2>
              <form className="d-flex flex-column" onSubmit={updateLabData}>
                <div className="d-flex flex-column">
                  <div className="d-flex flex-column">
                    <label htmlFor="">Select Branch</label>
                    <select
                      className="rounded p-2"
                      name="branch"
                      value={upLabField.branch}
                      onChange={handleAddLabChange}
                    >
                      <option value="">-select-</option>
                      {branchList?.map((item) => (
                        <>
                          <option value={item.branch_name}>
                            {item.branch_name}
                          </option>
                        </>
                      ))}
                    </select>

                    {/* <input
                      type="text"
                      placeholder="Lab Name"
                      className="rounded p-2"
                      name="name"
                      value={upLabField.name}
                      onChange={handleAddLabChange}
                    /> */}
                  </div>
                  <div className="d-flex mt-2">
                    <div className="d-flex flex-column">
                      <label htmlFor="">Lab Name</label>
                      <input
                        type="text"
                        placeholder="Lab Name"
                        className="rounded p-2"
                        name="name"
                        value={upLabField.name}
                        onChange={handleAddLabChange}
                      />
                    </div>
                    <div className="d-flex flex-column mx-2 w-100">
                      <label htmlFor="">Type</label>
                      <select
                        className="typeset w-100"
                        name="type"
                        value={upLabField.type}
                        onChange={handleAddLabChange}
                      >
                        <option value="">-select-</option>
                        <option value="internal">Internal</option>
                        <option value="external">External</option>
                      </select>
                    </div>
                  </div>
                  <br />
                  <div className="d-flex">
                    <div className="d-flex flex-column">
                      <label htmlFor="">Number</label>
                      <input
                        type="text"
                        placeholder="contact number"
                        className="rounded p-2"
                        name="contact"
                        value={upLabField.contact}
                        onChange={handleAddLabChange}
                      />
                    </div>
                    <div className="d-flex flex-column mx-2">
                      <label htmlFor="">Email</label>
                      <input
                        type="email"
                        placeholder="add email"
                        className="rounded p-2"
                        name="email"
                        value={upLabField.email}
                        onChange={handleAddLabChange}
                      />
                    </div>
                  </div>
                  <br />
                  <div className="d-flex flex-column">
                    <label htmlFor="">Address</label>
                    <textarea
                      name="address"
                      id=""
                      cols="30"
                      rows="3"
                      value={upLabField.address}
                      onChange={handleAddLabChange}
                    ></textarea>
                  </div>
                  <br />
                  <div className="d-flex flex-column w-100">
                    <label htmlFor="">Status</label>
                    <select
                      className="typeset w-100"
                      name="status"
                      value={upLabField.status}
                      onChange={handleAddLabChange}
                    >
                      <option value="">-select-</option>
                      <option value="pending">Pending</option>
                      <option value="approved">Approve</option>
                    </select>
                  </div>
                </div>

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

          {/* popup for updating notice */}
        </div>
      </Container>
    </>
  );
};

export default AdminLab;
const Container = styled.div`
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
