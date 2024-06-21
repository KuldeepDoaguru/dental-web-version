import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const ClinicExamin = () => {
  const dispatch = useDispatch();
  const { pid } = useParams();
  const user = useSelector((state) => state.user);

  const branch = user.branch;
  const token = user.token;

  const [examinations, setExaminations] = useState([]);

  const getExaminationDetails = async () => {
    try {
      const { data } = await axios.get(
        `https://dentalguruaccountant.doaguru.com/api/v1/accountant/getExaminationViaUhid/${branch}/${pid}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setExaminations(data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getExaminationDetails();
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
                {examinations?.map((item) => (
                  <>
                    <tr>
                      <td>
                        {/* {moment(item?.date?.split("T")[0]).format("DD/MM/YYYY")} */}
                        {item.date
                          ? moment(item.date, "DD-MM-YYYYTHH:mm:ss").format(
                              "DD/MM/YYYY"
                            )
                          : ""}
                      </td>
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
      /* width: 22rem;
      margin-left: -0.1rem; */
      width: auto;
    }
  }

  .cont-box {
    width: 68rem;
    @media screen and (max-width: 900px) {
      width: 100%;
    }
  }
`;
