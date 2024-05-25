import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

const Prescription = () => {
  const dispatch = useDispatch();
  const { pid } = useParams();
  const { uhid } = useParams();
  console.log(uhid);
  const user = useSelector((state) => state.user);
  const branch = useSelector((state) => state.branch);
  const token = user.currentUser.token;
  const [presData, setPresData] = useState([]);

  const getPresDetails = async () => {
    try {
      // const { data } = await axios.get(
      //   `http://localhost:7777/api/v1/super-admin/getPrescriptionDetailsById/${pid}`
      // );
      const response = await axios.get(
        `https://dentalgurudoctor.doaguru.com/api/doctor/getPrescriptionPatientProfile/${uhid}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      setPresData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(presData);

  useEffect(() => {
    getPresDetails();
  }, []);

  return (
    <Wrapper>
      <div className="table cont-box">
        <div
          className="widget-area-2 proclinic-box-shadow mx-3 mt-5"
          id="tableres"
        >
          <div className="table-responsive">
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Treatment</th>
                  <th>Medicine Name</th>
                  <th>Dosage</th>
                  <th>Frequency</th>
                  <th>Duration</th>
                  <th>Note</th>
                </tr>
              </thead>
              <tbody>
                {presData?.map((item) => (
                  <>
                    <tr>
                      <td>{item.date?.split("T")[0]}</td>
                      <td>{item.treatment}</td>
                      <td>{item.medicine_name}</td>
                      <td>{item.dosage}</td>
                      <td>{item.frequency}</td>
                      <td>{item.duration}</td>
                      <td>{item.note}</td>
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

export default Prescription;
const Wrapper = styled.div`
  .table {
    @media screen and (max-width: 768px) {
      width: 22rem;
      margin-left: -0.4rem;
    }
  }

  .cont-box {
    width: 68rem;
    @media screen and (max-width: 900px) {
      width: 100% !important;
    }
  }
`;
