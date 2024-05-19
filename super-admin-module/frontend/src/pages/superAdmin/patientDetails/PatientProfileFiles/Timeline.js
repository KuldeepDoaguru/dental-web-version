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
  const [patTimeline, setPatTimeline] = useState([]);

  const getTimelineDetails = async () => {
    try {
      const { data } = await axios.get(
        `https://dentalgurusuperadmin.doaguru.com/api/v1/super-admin/getPatientTimeline/${pid}`, 
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log(data);
      setPatTimeline(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTimelineDetails();
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
                {patTimeline?.map((item) => (
                  <>
                    <tr>
                      <td>{item.event_date?.split("T")[0]}</td>
                      <td>{item.event_time.split(".")[0]}</td>
                      <td>{item.event_type}</td>
                      <td>{item.event_description}</td>
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
    @media screen and (max-width: 900px) {
      width: 100%;
    }
  }
`;
