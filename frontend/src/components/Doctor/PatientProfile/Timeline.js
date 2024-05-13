import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const Timeline = () => {
  const dispatch = useDispatch();
  const { uhid } = useParams();
  const { currentUser } = useSelector((state) => state.user);

  const branch = currentUser.branch_name;

  const [patTimeline, setPatTimeline] = useState([]);

  const getTimelineDetails = async () => {
    try {
      const response = await axios.get(
        `https://dentalgurudoctor.doaguru.com/api/doctor/getPatientTimeline/${branch}/${uhid}`
      );
      console.log(response.data.data);
      setPatTimeline(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(patTimeline);

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
                      <td>{item.event_date}</td>
                      <td>{item.event_time?.slice(0, 5)}</td>
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
