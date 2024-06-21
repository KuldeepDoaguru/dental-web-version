import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

const Lab = () => {
  const { pid } = useParams();
  const user = useSelector((state) => state.user);

  const  branch = user.currentUser.branch_name;
  const token = user.currentUser?.token;
  

  const [testData, setTestData] = useState([]);

  const getLabTest = async () => {
    try {
      const { data } = await axios.get(
        `https://dentalgurureceptionist.doaguru.com/api/v1/receptionist/getPatientLabTestByPatientId/${pid}`
        ,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
        }
      );
      setTestData(data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(testData);
  useEffect(() => {
    getLabTest();
  }, []);
  return (
    <Wrapper>
      <div className="table">
        <div
          className="widget-area-2 proclinic-box-shadow mx-3 mt-5"
          id="tableres"
        >
          <div className="table-responsive">
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>Test ID</th>
                  <th>Treatment Package ID</th>
                  <th>Doctor</th>
                  <th>Lab Name</th>
                  <th>Test Name</th>
                  <th>Test Date</th>
                  <th>Test Status</th>
                </tr>
              </thead>
              <tbody>
                {testData?.map((item) => (
                  <>
                    <tr>
                      <td>{item.testid}</td>
                      <td>{item.tpid}</td>
                      <td className="text-capitalize">{"Dr. "}{item.assigned_doctor_name}</td>
                      <td className="text-capitalize">{item.lab_name}</td>
                      <td>{item.test}</td>
                      <td>{item.created_date?.split("T")[0]}</td>
                      <td className="text-capitalize">{item.test_status}</td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Lab;
const Wrapper = styled.div`
  .table {
    @media screen and (max-width: 768px) {
      width: auto;
      
    }
  }
`;