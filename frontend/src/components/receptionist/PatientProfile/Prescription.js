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

const Prescription = () => {
  const dispatch = useDispatch();
  const { pid } = useParams();
  const user = useSelector((state) => state.user);
  console.log(`User Name: ${user.name}, User ID: ${user.id}`);
  console.log("User State:", user);
  const branch = useSelector((state) => state.branch);
 
  const [presData, setPresData] = useState([]);

  const getPresDetails = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:7777/api/v1/super-admin/getPrescriptionDetailsById/${pid}`
      );
      setPresData(data);
    } catch (error) {
      console.log(error);
    }
  };

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
                  <th>Doctor Name</th>
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
                      <td>{item.prescription_date?.split("T")[0]}</td>
                      <td>{item.doctor_name}</td>
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