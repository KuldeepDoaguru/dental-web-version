import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Sider from "../components/Sider";
import { Link } from "react-router-dom";
import BranchSelector from "../components/BranchSelector";
import axios from "axios";
import cogoToast from "cogo-toast";

const Branches = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedItem, setSelectedItem] = useState({ notice: "" });
  const [branchHeadImg, setBranchHeadImg] = useState(null);
  const [branchFootImg, setBranchFootImg] = useState(null);
  const [popupVisible, setPopupVisible] = useState(false);
  const [branchList, setBranchList] = useState([]);
  const [upData, setUpData] = useState({
    name: "",
    address: "",
    contact: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUpData({
      ...upData,
      [name]: value,
    });
  };

  const openUpdatePopup = (id) => {
    setSelectedItem(id);
    setShowPopup(true);
  };

  console.log(selectedItem);

  const updateBranchDetails = async (e, id) => {
    console.log(id);
    e.preventDefault();

    try {
      const formData = new FormData();
      for (const key in upData) {
        formData.append(key, upData[key]);
      }

      formData.append("head_img", branchHeadImg.file);
      formData.append("foot_img", branchFootImg.file);
      console.log(upData, branchHeadImg, branchFootImg);

      const response = await axios.put(
        `https://dentalgurusuperadmin.doaguru.com/api/v1/super-admin/updateBranchDetails/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      getBranchList();
      setShowPopup(false);
      cogoToast.success("branch details updated successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const closeUpdatePopup = () => {
    setShowPopup(false);
  };

  const getBranchList = async () => {
    try {
      const response = await axios.get(
        "https://dentalgurusuperadmin.doaguru.com/api/v1/super-admin/getBranch"
      );
      console.log(response.data);
      setBranchList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBranchList();
  }, []);

  console.log(branchList);

  const handleBranchHeadPicture = (e) => {
    const selectedFile = e.target.files[0];
    console.log(selectedFile);
    if (selectedFile) {
      // Read the selected file as data URL
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onloadend = () => {
        setBranchHeadImg({
          file: selectedFile,
          imageUrl: reader.result,
        });
      };
    }
  };

  console.log(branchHeadImg);

  const handleBranchFootPicture = (e) => {
    const selectedFile = e.target.files[0];
    console.log(selectedFile);
    if (selectedFile) {
      // Read the selected file as data URL
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onloadend = () => {
        setBranchFootImg({
          file: selectedFile,
          imageUrl: reader.result,
        });
      };
    }
  };

  console.log(branchFootImg);

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
                <div className="row d-flex justify-content-between mx-3">
                  <div className="col-12 col-md-12 mt-4">
                    <div className="d-flex justify-content-between">
                      <BranchSelector />
                    </div>

                    {/* pop-up for creating notice */}
                    <div
                      className={`popup-container${showPopup ? " active" : ""}`}
                    >
                      <div className="popup">
                        <h2>Update Branch Details</h2>
                        <form
                          className="d-flex flex-column"
                          onSubmit={(e) => updateBranchDetails(e, selectedItem)}
                        >
                          <div className="mb-3">
                            <label for="exampleInputEmail1" class="form-label">
                              Branch Name
                            </label>
                            <input
                              type="text"
                              name="name"
                              class="form-control"
                              placeholder="branch name"
                              value={upData.name}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="mb-3">
                            <label for="exampleInputEmail1" class="form-label">
                              Branch Address
                            </label>
                            <input
                              placeholder="update branch address"
                              class="form-control"
                              name="address"
                              value={upData.address}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="mb-3">
                            <label for="exampleInputEmail1" class="form-label">
                              Branch Contact
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="update branch contact number"
                              name="contact"
                              value={upData.contact}
                              maxLength={10}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="d-flex">
                            <div>
                              <label
                                for="exampleFormControlInput1"
                                class="form-label"
                              >
                                Upload Header Picture
                              </label>
                              <input
                                type="file"
                                class="p-1 w-100 rounded"
                                placeholder="available stock"
                                accept=".pdf, .jpg, .jpeg, .png"
                                required
                                name="branchHeadImg"
                                onChange={handleBranchHeadPicture}
                              />
                            </div>
                            <div className="mx-2">
                              {branchHeadImg && (
                                <img
                                  src={branchHeadImg.imageUrl}
                                  alt="profile"
                                  className="imgData"
                                />
                              )}
                            </div>
                          </div>
                          <hr />
                          <div className="d-flex">
                            <div>
                              <label
                                for="exampleFormControlInput1"
                                class="form-label"
                              >
                                Upload Footer Picture
                              </label>
                              <input
                                type="file"
                                class="p-1 w-100 rounded"
                                placeholder="available stock"
                                accept=".pdf, .jpg, .jpeg, .png"
                                required
                                name="branchFootImg"
                                onChange={handleBranchFootPicture}
                              />
                            </div>
                            <div className="mx-2">
                              {branchFootImg && (
                                <img
                                  src={branchFootImg.imageUrl}
                                  alt="profile"
                                  className="imgData"
                                />
                              )}
                            </div>
                          </div>
                          <div className="d-flex justify-content-evenly">
                            <button
                              type="submit"
                              className="btn btn-success mt-2"
                            >
                              update
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

                    <h2 className="text-center"> Branch List </h2>
                    <div className="container-fluid mt-3">
                      <div class="table-responsive rounded">
                        <table class="table table-bordered rounded shadow">
                          <thead className="table-head">
                            <tr>
                              <th
                                className="table-sno"
                                style={{ width: "10%" }}
                              >
                                Branch ID
                              </th>
                              <th
                                className="table-small"
                                style={{ width: "20%" }}
                              >
                                Branch Name
                              </th>
                              <th
                                className="table-small"
                                style={{ width: "20%" }}
                              >
                                Branch Address
                              </th>
                              <th
                                className="table-small"
                                style={{ width: "10%" }}
                              >
                                Contact Number
                              </th>
                              <th
                                className="table-small"
                                style={{ width: "10%" }}
                              >
                                Header Image
                              </th>
                              <th
                                className="table-small"
                                style={{ width: "10%" }}
                              >
                                Footer Image
                              </th>
                              <th
                                className="table-small"
                                style={{ width: "10%" }}
                              >
                                Edit
                              </th>
                              {/* <th
                                className="table-small"
                                style={{ width: "10%" }}
                              >
                                Delete
                              </th> */}
                            </tr>
                          </thead>
                          <tbody>
                            {branchList?.map((item) => (
                              <tr className="table-row" key={item.branch_id}>
                                <td
                                  className="table-sno"
                                  style={{ width: "10%" }}
                                >
                                  {item.branch_id}
                                </td>
                                <td
                                  className="table-small"
                                  style={{ width: "20%" }}
                                >
                                  {item.branch_name}
                                </td>
                                <td
                                  className="table-small"
                                  style={{ width: "20%" }}
                                >
                                  {item.branch_address}
                                </td>
                                <td
                                  className="table-small"
                                  style={{ width: "10%" }}
                                >
                                  {item.branch_contact}
                                </td>
                                <td
                                  className="table-small"
                                  style={{ width: "10%" }}
                                >
                                  <div className="smallImg">
                                    <img src={item.head_img} alt="header" />
                                  </div>
                                </td>
                                <td
                                  className="table-small"
                                  style={{ width: "10%" }}
                                >
                                  <div className="smallImg">
                                    <img src={item.foot_img} alt="header" />
                                  </div>
                                </td>
                                <td
                                  className="table-small"
                                  style={{ width: "10%" }}
                                >
                                  <button
                                    className="btn btn-warning"
                                    onClick={() =>
                                      openUpdatePopup(item.branch_id)
                                    }
                                  >
                                    Edit Details
                                  </button>
                                </td>
                                {/* <td
         className="table-small"
         style={{ width: "10%" }}
       >
         <button className="btn btn-danger">
           Delete
         </button>
       </td> */}
                              </tr>
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
        </div>
      </Container>
    </>
  );
};

export default Branches;
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

  .select-style {
    border: none;
    background-color: #22a6b3;
    font-weight: bold;
    color: white;
  }

  th {
    background-color: #004aad;
    color: white;
  }

  .imgData {
    height: 10rem;
    width: auto;
  }

  .smallImg {
    img {
      height: 6rem;
      width: auto;
    }
  }
`;
