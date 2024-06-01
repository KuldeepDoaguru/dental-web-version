import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const ClinicExamin = () => {
  const dispatch = useDispatch();
  // const { pid } = useParams();
  const { pid } = useParams();
  const user = useSelector((state) => state.user.currentUser);
  console.log(`User Name: ${user.name}, User ID: ${user.id}`);
  console.log("User State:", user);
  const branch = user.branch_name;

  const [exmData, setExmData] = useState([]);

  const getExamineDetails = async () => {
    try {
      // const { data } = await axios.get(
      //   `http://localhost:7777/api/v1/super-admin/examinDetailsByPatId/${pid}`
      // );
      const respsData = await axios.get(
        `https://dentalguruadmin.doaguru.com/api/v1/admin/getExaminationViaUhid/${branch}/${pid}`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setExmData(respsData.data);
      console.log(respsData.data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(exmData);
  useEffect(() => {
    getExamineDetails();
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
                  <th>Diagnosis Category</th>
                  <th>Disease</th>
                  <th>Chief Complaint</th>
                  <th>Tooth</th>
                  <th>On Examination</th>
                  <th>Advice</th>
                </tr>
              </thead>
              <tbody>
                {exmData?.map((item) => (
                  <>
                    <tr>
                      {/* <td>{item.examin_date?.split("T")[0]}</td> */}
                      <td>{item.date?.split("T")[0]}</td>
                      <td>{item.diagnosis_category}</td>
                      <td>{item.disease}</td>

                      <td>{item.chief_complain}</td>
                      <td>{item.selected_teeth}</td>

                      <td>{item.on_examination}</td>
                      <td>{item.advice}</td>
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

export default ClinicExamin;
const Wrapper = styled.div`
  .table {
    @media screen and (max-width: 768px) {
      width: 22rem;
      margin-left: -0.1rem;
    }
  }

  .cont-box {
    width: 68rem;
    @media screen and (max-width: 900px) {
      width: 100%;
    }
  }
`;
