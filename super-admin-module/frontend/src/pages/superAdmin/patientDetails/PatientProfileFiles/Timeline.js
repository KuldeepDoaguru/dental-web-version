import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const Timeline = () => {
  const dispatch = useDispatch();
  const { pid } = useParams();
  const user = useSelector((state) => state.user);
  console.log(`User Name: ${user.name}, User ID: ${user.id}`);
  console.log("User State:", user);
  const branch = useSelector((state) => state.branch);
  console.log(`User Name: ${branch.name}`);
  const [patAppointDetails, setPatAppointDetails] = useState([]);

  const getAppointDetailsPat = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:7777/api/v1/super-admin/getAppointmentByBranchAndId/${pid}`
      );
      console.log(data);
      setPatAppointDetails(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAppointDetailsPat();
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
                  <th>Event Time</th>
                  <th>Event Type</th>
                  <th>Event Detail</th>
                </tr>
              </thead>
              <tbody>
                {patAppointDetails?.map((item) => (
                  <>
                    <tr>
                      <td>25-09-23</td>
                      <td>7:30pm</td>
                      <td>Payment</td>
                      <td>Rahul Kumar Successfully make payment of 2000/- </td>
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

export default Timeline;
const Wrapper = styled.div`
  .table {
    @media screen and (max-width: 768px) {
      width: 20rem;
      margin-left: -0.2rem;
    }
  }

  .cont-box {
    width: 68rem;
  }
`;
