// import React from 'react'
// import styled from 'styled-components'

// function Timeline() {
//   return (
//     <Wrapper>
//       <div className="table">
//       <div
//         className="widget-area-2 proclinic-box-shadow mx-3 mt-5"
//         id="tableres"
//       >
//         <div className="table-responsive">
//           <table className="table table-bordered table-striped">
//             <thead>
//               <tr>
//                 <th>Date</th>
//                 <th>Event Time</th>
//                 <th>Event Type</th>
//                 <th>Event Detail</th>
               
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <td>25-09-23</td>
//                 <td>7:30pm</td>
//                 <td>Payment</td>
//                 <td>Rahul Kumar Successfully make payment of 2000/- </td>
//               </tr>
//               <tr>
//                 <td>25-09-23</td>
//                 <td>6:30pm</td>
//                 <td>Appointment</td>
//                 <td>New Patient Added By Receptionist</td>
//               </tr>
              
             

           
//             </tbody>
//           </table>
//         </div>
//       </div></div>
//     </Wrapper>
//   )
// }

// export default Timeline
// const Wrapper = styled.div`
// .table{
//     @media screen and (max-width: 768px) {
//       width: 20rem;
//       margin-left: -0.2rem;
  
//     }
//   }
// `

import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const Timeline = () => {
  const dispatch = useDispatch();
  const { pid } = useParams();
  const {currentUser} = useSelector((state) => state.user);

  const  branch = currentUser.branch_name;
  const token = currentUser?.token;
  
  const [patTimeline, setPatTimeline] = useState([]);

  const getTimelineDetails = async () => {
    try {
      const { data } = await axios.get(
        `https://dentalgurureceptionist.doaguru.com/api/v1/receptionist/getPatientTimeline/${branch}/${pid}` ,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
        }
      );
      console.log(data);
      setPatTimeline(data?.data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(patTimeline)

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
                      <td>{item?.event_date}</td>
                      <td>{item?.event_time?.split(".")[0]}</td>
                      <td>{item?.event_type}</td>
                      <td>{item?.event_description}</td>
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
      width: auto;
      
    }
  }

  .cont-box {
    width: 68rem;
    @media screen and (max-width: 900px) {
      width: 100%;
    }
  }
  th{
    white-space: nowrap;
  }
`;