import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import { AiFillDelete } from "react-icons/ai";
import { RiLoader2Fill } from "react-icons/ri";

const TPrescription = () => {
  const { id } = useParams();
  console.log(id);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    medicineName: '',
    dosage: '',
    frequency: '',
    duration: '',
    note: ''
  });

  const [tableData, setTableData] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    console.log(formData);

    // Generate suggestions based on previous input
    const filteredSuggestions = tableData
      .filter(data => data.medicineName.toLowerCase().includes(value.toLowerCase()))
      .map(data => data.medicineName);
    setSuggestions(filteredSuggestions);
  };

  const handleButtonAdd = () => {
    setLoading(true);
    const newData = {
      medicineName: formData.medicineName,
      dosage: formData.dosage,
      frequency: formData.frequency,
      duration: formData.duration,
      note: formData.note
    };
    setTableData([...tableData, newData]);
    setFormData({
      medicineName: '',
      dosage: '',
      frequency: '',
      duration: '',
      note: ''
    });
  };

  const handleDelete = (index) => {
    const newData = [...tableData];
    newData.splice(index, 1);
    setTableData(newData);
  }

  const handleSuggestionClick = (suggestion) => {
    setFormData({
      ...formData,
      medicineName: suggestion
    });
    setSuggestions([]); // Clear suggestions after selecting one
  };

  useEffect(() => {
    // Simulate API call or data processing delay
    const timeout = setTimeout(() => {
      setLoading(false); // Set loading state to false after 2 seconds (adjust as needed)
    }, 1000);

    // Clean up the timeout
    return () => clearTimeout(timeout);
  }, [tableData]); // Run the effect whenever tableData changes 

  return (
    <>
      <Wrapper>
        <div className="container">
          <div className="row">
            <div className="">
              <div className="text-center fs-1 shadow-none p-1 mt-4 mb-4 bg-light rounded">
                <p>Medical Prescription</p>
              </div>
              <div className="shadow-sm p-3 mb-4 bg-body rounded">
                <form>
                  <div class="row">
                    <div class="col">
                      <div data-mdb-input-init class="form-outline">
                        <label class="form-label" htmlFor="medicineName">Medicine Name</label>
                        <input type="text" id="medicineName" class="form-control" name="medicineName" value={formData.medicineName} onChange={handleInputChange} />
                        {suggestions.length > 0 && (
                          <ul className="list-group">
                            {suggestions.map((suggestion, index) => (
                              <li key={index} className="list-group-item" onClick={() => handleSuggestionClick(suggestion)}>
                                {suggestion}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                    <div class="col">
                      <div data-mdb-input-init class="form-outline">
                        <label class="form-label" htmlFor="dosage">Dosage</label>
                        <input type="text" id="dosage" class="form-control" name="dosage" value={formData.dosage} onChange={handleInputChange} />
                      </div>
                    </div>
                    <div class="col">
                      <div data-mdb-input-init class="form-outline">
                        <label class="form-label" htmlFor="frequency">Frequency</label>
                        <select id="frequency" class="form-control" name="frequency" value={formData.frequency} onChange={handleInputChange}>
                          <option value="">Choose frequency</option>
                          <option value="1-1-1(TDS)">1-1-1(TDS)</option>
                          <option value="1-1-0(BD)">1-1-0(BD)</option>
                          <option value="0-1-1(BD)">0-1-1(BD)</option>
                          <option value="1-0-1(BD)">1-0-1(BD)</option>
                          <option value="0-0-1(HS)">0-0-1(HS)</option>
                          <option value="0-1-0(OD)">0-1-0(OD)</option>
                          <option value="1-0-0(BM)">1-0-0(BM)</option>
                          <option value="SOS">SOS</option>
                        </select>
                      </div>
                    </div>
                    <div class="col">
                      <div data-mdb-input-init class="form-outline">
                        <label class="form-label" htmlFor="duration">Duration</label>
                        <select id="duration" class="form-control" name="duration" value={formData.duration} onChange={handleInputChange}>
                          <option value="">Choose duration</option>
                          <option value="1 day">1 day</option>
                          <option value="2 days">2 days</option>
                          <option value="3 days">3 days</option>
                          <option value="4 days">4 days</option>
                          <option value="5 days">5 days</option>
                          <option value="6 days">6 days</option>
                          <option value="1 week">1 week</option>
                          <option value="2 weeks">2 weeks</option>
                          <option value="3 weeks">3 weeks</option>
                          <option value="1 Month">1 Month</option>
                          <option value="3 Months">3 Months</option>
                        </select>
                      </div>
                    </div>
                    <div class="col">
                      <div data-mdb-input-init class="form-outline">
                        <label class="form-label" htmlFor="note">Note</label>
                        <input type="text" id="note" class="form-control" name="note" value={formData.note} onChange={handleInputChange} />
                      </div>
                    </div>
                  </div>
                </form>
                <button className='btn btn-secondary fs-5 mt-4' onClick={handleButtonAdd}>Add<IoMdAdd size={20} /></button>
              </div>
            </div>
          </div>
        </div>

        {loading ? (
          <>
            <div className='text-center'><RiLoader2Fill size={35} className="spin" /></div>
          </>
        ) : (
          <div className="container">
            <div className="row">
              <table class="table">
                <thead className='table-success rounded'>
                  <tr>
                    <th scope="col">Medicine Name</th>
                    <th scope="col">Dosage</th>
                    <th scope="col">Frequency</th>
                    <th scope="col">Duration</th>
                    <th scope="col">Note</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((data, index) => (
                    <tr key={index}>
                      <td>{data.medicineName}</td>
                      <td>{data.dosage}</td>
                      <td>{data.frequency}</td>
                      <td>{data.duration}</td>
                      <td>{data.note}</td>
                      <td>
                        <button className='btn btn-danger' onClick={() => handleDelete(index)}><AiFillDelete size={20} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </Wrapper>
    </>
  )
}

export default TPrescription;

const Wrapper = styled.div`
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.spin {
  animation: spin 1s linear infinite;
}
`;


