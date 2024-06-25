import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
// import { useParams } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { toggleTableRefresh } from "../../../../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

const SaveData = ({ id, tpid }) => {
  const navigate = useNavigate();
  console.log(id);
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    selectedTeeth: "",
    disease: "",
    chiefComplain: "",
    advice: "",
    onExamination: "",
  });
  const [modalIndex, setModalIndex] = useState(null); // State to manage which modal is open
  const dispatch = useDispatch();
  const { refreshTable, currentUser } = useSelector((state) => state.user);
  const user = useSelector((state) => state.user);
  const token = user.currentUser.token;

  const getData = async () => {
    try {
      const { data } = await axios.get(
        `https://dentalgurudoctor.doaguru.com/api/doctor/getDentalDataByID/${id}/${tpid}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, [id, refreshTable]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  console.log(data);

  const diseases = new Set(
    data.flatMap((entry) =>
      entry.disease.split(", ").map((disease) => disease.trim())
    )
  );

  console.log([...diseases]);

  const timelineForDelete = async () => {
    try {
      const response = await axios.post(
        "https://dentalgurudoctor.doaguru.com/api/doctor/insertTimelineEvent",
        {
          type: "Examination",
          description: "Add Teeth Pediatric DentalX",
          // branch: branch,
          // patientId: getPatientData.length > 0 ? getPatientData[0].uhid : "",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  // Handle Update Data

  const handleSubmit = async (id, e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `https://dentalgurudoctor.doaguru.com/api/doctor/updatedentalPediatric/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      // window.location.reload();

      dispatch(toggleTableRefresh());
    } catch (error) {
      console.error("Error:", error);
      // Handle error
    }
  };

  const handleModalOpen = (index) => {
    // Set formData with values of the item being edited
    const item = data[index];
    setFormData({
      id: item.exm_id,
      selectedTeeth: item.selected_teeth,
      disease: item.disease,
      chiefComplain: item.chief_complain,
      advice: item.advice,
      onExamination: item.on_examination,
    });
    // Set the modalIndex to manage which modal is open
    setModalIndex(index);
  };

  // Handle Delete Data

  const handleDelete = async (id) => {
    try {
      const confirmed = window.confirm("Are you sure you want to delete?");

      if (confirmed) {
        const res = await axios.delete(
          `https://dentalgurudoctor.doaguru.com/api/doctor/deleteDentalPediatric/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(res.data);
        setData(data.filter((item) => item.exm_id !== id));
      }
    } catch (error) {
      console.log(error);
      // Optionally, provide feedback to the user
      window.alert("An error occurred while deleting the item.");
    }
  };

  const handleSaveContinue = () => {
    // navigate(`/TreatmentDashBoard/${id}`);
    navigate(`/treatmentSuggestion/${id}/${tpid}`);
  };

  return (
    <Wrapper>
      <div className="container-fluid">
        <div className="row">
          <h2>Saved Data</h2>
          {data && data?.length > 0 ? (
            <div className="table-responsive ">
              <table className="table table-bordered table-striped table-secondary border border-secondary">
                <thead>
                  <tr>
                    <th>SELECTED TEETH</th>
                    <th>DISEASE</th>
                    <th>CHIEF COMPLAIN</th>
                    <th>ADVICE</th>
                    <th>ON EXAMINATION</th>
                    <th>Diagnose Category</th>

                    <th>DELETE ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr key={index}>
                      <td>{item.selected_teeth}</td>
                      <td>{item.disease}</td>
                      <td>{item.chief_complain}</td>
                      <td>{item.advice}</td>
                      <td>{item.on_examination}</td>
                      <td>{item.diagnosis_category}</td>
                      {/* <td>
                        {" "}
                        <button
                          type="button"
                          className="btn btn-primary justify-content-end"
                          data-bs-toggle="modal"
                          data-bs-target={`#exampleModal-${index}`}
                          onClick={() => handleModalOpen(index)}
                        >
                          <MdEdit size={20} />
                        </button>
                      </td> */}
                      <td>
                        <button
                          className="btn btn-danger mx-1 justify-content-end shadow"
                          style={{
                            backgroundColor: "#0dcaf0",
                            border: "#0dcaf0",
                          }}
                          onClick={() => handleDelete(item.exm_id)}
                        >
                          <MdDelete size={20} />
                        </button>
                      </td>
                      <div
                        className="modal fade"
                        id={`exampleModal-${index}`}
                        tabIndex="-1"
                        aria-labelledby={`exampleModalLabel-${index}`}
                        aria-hidden="true"
                      >
                        <div className="modal-dialog modal-dialog-centered">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h1
                                className="modal-title fs-5"
                                id={`exampleModalLabel-${index}`}
                              >
                                Update Examination Data
                              </h1>
                              <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              ></button>
                            </div>
                            <div className="modal-body">
                              <form
                                onSubmit={(e) => handleSubmit(item.exm_id, e)}
                              >
                                <div
                                  data-mdb-input-init
                                  class="form-outline mb-4"
                                >
                                  <label className="updatelable">
                                    Appointment ID
                                  </label>
                                  <input
                                    type="text"
                                    id="form2Example1"
                                    name="id"
                                    value={formData.id}
                                    class="form-control"
                                    onChange={handleChange}
                                    placeholder="id"
                                    readOnly
                                  />
                                </div>

                                <div
                                  data-mdb-input-init
                                  class="form-outline mb-4"
                                >
                                  <label className="updatelable">
                                    Selected Teeth
                                  </label>
                                  <input
                                    type="text"
                                    id="form2Example1"
                                    name="selectedTeeth"
                                    value={formData.selectedTeeth}
                                    class="form-control"
                                    onChange={handleChange}
                                    readOnly
                                    placeholder="Selected Teeth"
                                  />
                                </div>

                                <div
                                  data-mdb-input-init
                                  class="form-outline mb-4"
                                >
                                  <label className="updatelable">Disease</label>
                                  <input
                                    type="text"
                                    id="form2Example2"
                                    name="disease"
                                    value={formData.disease}
                                    class="form-control"
                                    onChange={handleChange}
                                    placeholder="Enter Disease"
                                  />
                                </div>

                                <div
                                  data-mdb-input-init
                                  class="form-outline mb-4"
                                >
                                  <label className="updatelable">
                                    Chief Complain
                                  </label>
                                  <input
                                    type="text"
                                    id="form2Example2"
                                    name="chiefComplain"
                                    value={formData.chiefComplain}
                                    class="form-control"
                                    onChange={handleChange}
                                    placeholder="Enter Chief Complain"
                                  />
                                </div>

                                <div
                                  data-mdb-input-init
                                  class="form-outline mb-4"
                                >
                                  <label className="updatelable">Advice</label>
                                  <input
                                    type="text"
                                    id="form2Example2"
                                    name="advice"
                                    value={formData.advice}
                                    class="form-control"
                                    onChange={handleChange}
                                    placeholder="Enter Advice "
                                  />
                                </div>

                                <div
                                  data-mdb-input-init
                                  class="form-outline mb-4"
                                >
                                  <label className="updatelable">
                                    ON Examination
                                  </label>
                                  <input
                                    type="text"
                                    id="form2Example2"
                                    name="onExamination"
                                    value={formData.onExamination}
                                    class="form-control"
                                    onChange={handleChange}
                                    placeholder="Enter ON Examination"
                                  />
                                </div>

                                <div className="text-center">
                                  <button
                                    class="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                  >
                                    Update
                                  </button>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="d-flex justify-content-end">
                <button
                  type="button"
                  className="btn btn-info text-light mx-3"
                  onClick={handleSaveContinue}
                >
                  Next
                </button>
              </div>
            </div>
          ) : (
            <p>There is no saved data.</p>
          )}
        </div>
      </div>
    </Wrapper>
  );
};

export default SaveData;
const Wrapper = styled.div`
  .updatelable {
    font-size: 1rem;
    font-weight: 600;
    font-family: "Roboto", sans-serif;
    padding-left: 0.9rem;
  }
`;
