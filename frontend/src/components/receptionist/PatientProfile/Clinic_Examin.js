// import React from 'react'
// import styled from 'styled-components'

// function Clinic_Examin() {
//   return (
//     <Wrapper>
//       <div className="table">
//          <div
//         className="widget-area-2 proclinic-box-shadow mx-3 mt-5"
//         id="tableres"
//       >
//         <div className="table-responsive">
//           <table className="table table-bordered table-striped">
//             <thead>
//               <tr>
//                 <th>Date</th>
//                 <th>Treatment</th>
//                 <th>Chief Complaint</th>
//                 <th>Issue</th>
//                <th>Diagnosis</th>
//                 <th>Investigation</th>
//                 <th>Added By</th>
//                 <th>Action</th>
               
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <td>25-09-23</td>
//                 <td>Root Canal</td>
//                 <td>Tooth Pain</td>
//                 <td>Tooth Decay</td>
//                 <td>Tooth Infection</td>
//                 <td>Decayed Tooth 25 27 28</td>
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

// export default Clinic_Examin
// const Wrapper = styled.div`

// .table{
//     @media screen and (max-width: 768px) {
//       width: 22rem;
//       margin-left: -0.1rem;
  
//     }
//   }
// `

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const ClinicExamin = () => {
  const dispatch = useDispatch();
  const { pid } = useParams();
  const user = useSelector((state) => state.user);
  console.log(`User Name: ${user.name}, User ID: ${user.id}`);
  console.log("User State:", user);
  const branch = useSelector((state) => state.branch);
  
  const [exmData, setExmData] = useState([]);

  const getExamineDetails = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:7777/api/v1/super-admin/examinDetailsByPatId/${pid}`
      );
      setExmData(data);
    } catch (error) {
      console.log(error);
    }
  };

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
                  <th>Branch</th>
                  <th>Issue</th>
                  <th>Diagnosis</th>
                  <th>Investigation</th>
                  <th>Tooth</th>
                  <th>Doctor</th>
                </tr>
              </thead>
              <tbody>
                {exmData?.map((item) => (
                  <>
                    <tr>
                      <td>{item.examin_date?.split("T")[0]}</td>
                      <td>{item.branch_name}</td>
                      <td>{item.examin_issue}</td>
                      <td>{item.diagnosis}</td>
                      <td>{item.examin_investigation}</td>
                      <td>{item.tooth}</td>
                      <td>{item.doctor_name}</td>
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