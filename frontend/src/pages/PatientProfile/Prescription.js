import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import moment from "moment";

const Prescription = () => {
  const dispatch = useDispatch();
  const { pid } = useParams();
  const user = useSelector((state) => state.user);

  const branch = user.branch;
  const token = user.token;

  const [prescriptions, setPrescriptions] = useState([]);

  const getPrescriptionDetails = async () => {
    try {
      const { data } = await axios.get(
        `https://dentalguruaccountant.doaguru.com/api/v1/accountant/getPrescriptionViaUhid/${branch}/${pid}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPrescriptions(data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPrescriptionDetails();
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
                {prescriptions?.map((item) => (
                  <>
                    <tr>
                      <td>
                        {/* {moment(item.date?.split(" ")[0]).format("DD/MM/YYYY")} */}

                        {item.date
                          ? moment(item.date, "DD-MM-YYYYTHH:mm:ss").format(
                              "DD/MM/YYYY"
                            )
                          : ""}
                      </td>
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
      width: auto;
    }
  }

  .cont-box {
    width: 68rem;
    @media screen and (max-width: 900px) {
      width: 100% !important;
    }
  }
`;
