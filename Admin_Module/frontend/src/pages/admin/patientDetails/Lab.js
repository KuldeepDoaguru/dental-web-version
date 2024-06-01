import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const Lab = () => {
  const user = useSelector((state) => state.user.currentUser);
  console.log(user);
  const { pid } = useParams();
  console.log(pid);
  const [testData, setTestData] = useState([]);

  const getLabTest = async () => {
    try {
      const { data } = await axios.get(
        `https://dentalgurusuperadmin.doaguru.com/api/v1/super-admin/getPatientLabTestByPatientId/${pid}`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user.token}`,
          },
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
                      <td>{item.assigned_doctor_name}</td>
                      <td>{item.lab_name}</td>
                      <td>{item.test}</td>
                      <td>{item.created_date?.split("T")[0]}</td>
                      <td>{item.test_status}</td>
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
      width: 20rem;
      margin-left: -0.2rem;
    }
  }
`;
