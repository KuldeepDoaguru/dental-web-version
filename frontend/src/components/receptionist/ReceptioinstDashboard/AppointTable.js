

import React, { useState } from 'react';
import styled from 'styled-components';

const AppointTable = () => {
  const [searchInput, setSearchInput] = useState("");

  const Table_data = [
    { uid :"1", patient:"Mohit Shau",doctor:"Dr Umer Qureshi",treatment:"root canal",timing:"9:00 Am",status:"Missed",action:"edit"},
    { uid :"2", patient:"Umer Qureshi",doctor:"Dr Umer Qureshi",treatment:"root canal",timing:"9:00 Am",status:"Missed",action:"edit"},
    { uid :"3", patient:"Dhani Burma",doctor:"Dr Umer Qureshi",treatment:"root canal",timing:"9:00 Am",status:"Missed",action:"edit"},
    { uid :"4", patient:"Ragni Burma",doctor:"Dr Umer Qureshi",treatment:"root canal",timing:"9:00 Am",status:"Missed",action:"edit"},
    { uid :"5", patient:"Rohit Shau",doctor:"Dr Umer Qureshi",treatment:"root canal",timing:"9:00 Am",status:"Missed",action:"edit"},
    { uid :"6", patient:"Ritin Tiwari",doctor:"Dr Umer Qureshi",treatment:"root canal",timing:"9:00 Am",status:"Missed",action:"edit"},
    { uid :"7", patient:"Dev Ansh Dubey",doctor:"Dr Umer Qureshi",treatment:"root canal",timing:"9:00 Am",status:"Missed",action:"edit"},
    { uid :"8", patient:"Juber",doctor:"Dr Umer Qureshi",treatment:"root canal",timing:"9:00 Am",status:"Missed",action:"edit"},
    { uid :"9", patient:"Mohit Shau",doctor:"Dr Umer Qureshi",treatment:"root canal",timing:"9:00 Am",status:"Missed",action:"edit"},
    { uid :"10", patient:"Mohit Shau",doctor:"Dr Umer Qureshi",treatment:"root canal",timing:"9:00 Am",status:"Missed",action:"edit"},
    
  ];

  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };


  const filteredTable_data = Table_data.filter((data) => {
    return data.patient.toLowerCase().includes(searchInput.toLowerCase());
  });

  return (
    <Wrapper>
    <div className=''>
     

  
      <div className="widget-area-2 proclinic-box-shadow" id="tableres">
       <div className="d-flex justify-content-lg-between"> <h5 className="widget-title" id="title">
        Appointment for 16-10-2023
        </h5>
        <input
        type="search"
        placeholder="Search here"
        onChange={handleChange}
        value={searchInput}
        className='mb-2 rounded-5'
      /></div>
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
          <thead>
          <tr>
            <th>Uid</th>
            <th>Patient Name</th>
            <th>Doctor Name</th>
            <th>Treatment</th>
            <th>Timing</th>
            <th>Status</th>
            <th>Action</th>

          </tr>
        </thead>
        <tbody>
          {filteredTable_data.map((country, index) => (
            <tr key={index}>
              <td>{country.uid}</td>
              <td>{country.patient}</td>
              <td>{country.doctor}</td>
              <td>{country.treatment}</td>
              <td>{country.timing}</td>
              <td>{country.status}</td>
              <td>{country.action}</td>
            </tr>
          ))}
        </tbody>
          </table>
        </div>
      </div>
    </div>
    </Wrapper>
  );
};

export default AppointTable;
const Wrapper = styled.div`
  #tableres {
    margin-top: 0rem;
    @media screen and (max-width: 768px) {
      width: 20rem;
    }
    @media screen and (min-width: 768px) and (max-width: 1020px) {
      width: 41rem;
    }
  }
  #title {
    @media screen and (max-width: 768px) {
      margin-top: 20px;
    }
  }

  #btn1 {
    width: 100%;

    @media screen and (min-width: 1600px) and (max-width: 3700px) {
      width: 75%;
    }
  }
`;