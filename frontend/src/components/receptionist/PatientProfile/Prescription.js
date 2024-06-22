// import React from 'react'
// import styled from 'styled-components'

// function Prescription() {
//   return (
//     <Wrapper>
//       <div className="table">
//        <div
//         className="widget-area-2 proclinic-box-shadow mx-3 mt-5"
//         id="tableres"
//       >
//         <div className="table-responsive">
//           <table className="table table-bordered table-striped">
//             <thead>
//               <tr>
//                 <th>Date</th>
//                 <th>Drug</th>
//                 <th>Time</th>
//                 <th>Day</th>
//                 <th>Added By</th>
//                 <th>Action</th>

//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <td>25-09-23</td>
//                 <td><p>Tablet Peracethmol 400mg</p><p>Tablet Peracethmol 400mg</p><p>Tablet Peracethmol 400mg</p></td>
//                 <td>Morning,Afternoon,</td>
//                 <td>Four day</td>
//                 <td>Dr.Anurag Varma</td>

//                 <td>Edit/Delete/View</td>

//               </tr>

//             </tbody>
//           </table>
//         </div>
//       </div></div>
//     </Wrapper>
//   )
// }

// export default Prescription
// const Wrapper = styled.div`

// .table{
//     @media screen and (max-width: 768px) {
//       width: 22rem;
//       margin-left: -0.4rem;

//     }
//   }
// `

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

  const branch = user.currentUser.branch_name;
  const token = user.currentUser?.token;

  const [prescriptions, setPrescriptions] = useState([]);

  const getPrescriptionDetails = async () => {
    try {
      const { data } = await axios.get(
        `https://dentalgurureceptionist.doaguru.com/api/v1/receptionist/getPrescriptionViaUhid/${branch}/${pid}`,
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
                        {item?.date
                          ? moment(item?.date, "DD-MM-YYYYTHH:mm:ss").format("DD/MM/YYYY hh:mm A")
                          : ""}
                      </td>
                      <td>{item?.treatment}</td>
                      <td>{item?.medicine_name}</td>
                      <td>{item?.dosage}</td>
                      <td>{item?.frequency}</td>
                      <td>{item?.duration}</td>
                      <td>{item?.note}</td>
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
