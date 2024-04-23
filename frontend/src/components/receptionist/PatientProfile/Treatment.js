// import React from 'react'
// import styled from 'styled-components'
// import Calendar from 'react-calendar';
// import "react-calendar/dist/Calendar.css";
// function Treatment() {
//   return (
//     <Wrapper>
//         <div className="row">
//             <div className="col-lg-9" id='tabb' >
//                  <div
//         className="widget-area-2 proclinic-box-shadow mx-3 mt-5"
        
//       >
//         <div className="table-responsive">
//           <table className="table table-bordered table-striped">
//             <thead>
//               <tr>
//                 <th>Date</th>
//                 <th>Treatment</th>
//                 <th>Consultant</th>
//                 <th>Cost</th>
//                 <th>Treatment Status</th>
//                 <th>Billing Status</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <td>25-10-23</td>
//                 <td>Root Canal</td>
//                 <td>Dr.Umer Qureshi</td>
//                 <td>4000</td>
//                 <td>Upcoming</td>
//                 <td>Unbilled</td>
//                 <td>Edit/Delete/View</td>

//               </tr>
//               <tr>
//                 <td>25-10-23</td>
//                 <td>Root Canal</td>
//                 <td>Dr.Umer Qureshi</td>
//                 <td>4000</td>
//                 <td>Upcoming</td>
//                 <td>Unbilled</td>
//                 <td>Edit/Delete/View</td>

//               </tr>
//               <tr>
//                 <td>25-10-23</td>
//                 <td>Root Canal</td>
//                 <td>Dr.Umer Qureshi</td>
//                 <td>4000</td>
//                 <td>Upcoming</td>
//                 <td>Unbilled</td>
//                 <td>Edit/Delete/View</td>

//               </tr>

           
//             </tbody>
//           </table>
//         </div>
//       </div>
//       </div>
//             <div className="col-lg-3">  
//               <div className="card" id="card1">
//             <div className="card-body">
//               <h6 className="card-title" style={{ color: " #5a626d" }}>
//                  Treatment
//               </h6>
//               <p className="card-text">
//                 <ul className="sec" id="section1">
                    
//                   <div className="data">
//                     <li className="dotrem text-black">Missed</li>

//                     <li className="dotrem1  text-bg-danger rounded-5">54</li>
//                   </div>
              
//                   <div className="data">
//                     <li className="dotrem text-black ">Upcoming</li>
//                     <li className="dotrem1   text-bg-warning rounded-5  text-white">
//                       54
//                     </li>
//                   </div>
//                   <div className="data">
//                     <li className="dotrem text-black">Complete</li>
//                     <li className="dotrem1  text-bg-primary rounded-5 ">
//                       54
//                     </li>
//                   </div>
//                   <div className="data">
//                     <li className="dotrem text-black ">Cancel</li>
//                     <li className="dotrem1 text-bg-secondary rounded-5 ">54</li>
//                   </div>
//                   <div className="data">
//                     <li className="dotrem text-black">Billed</li>
//                     <li className="dotrem1    text-bg-success rounded-5 ">
//                       54
//                     </li>
//                   </div>
//                   <div className="data">
//                     <li className="dotrem text-black">Unbilled</li>
//                     <li className="dotrem1    text-bg-success rounded-5 ">
//                       54
//                     </li>
//                   </div>
//                 </ul>
//               </p>
//             </div>
//           </div>
//           <div className="cal mt-2">
            
// <Calendar/>
//           </div>
//           </div>
     
//       </div>
//     </Wrapper>
//   )
// }

// export default Treatment
// const Wrapper = styled.div`
//  #card1 {
//     background-image: linear-gradient(#9dc5f8, #cbfdd9);
//     width: 15rem;
//     height: 22rem;
//     @media screen and (max-width: 768px) {
//       width:91%;
//       margin-left: -0.5rem;
//     }
//     @media screen and (min-width: 768px) and (max-width: 1020px) {
//       width: 41rem;
//     }
//     @media screen and (min-width: 1020px) and (max-width: 1600px) {
//     width: 13rem;
//   }
//   }

//   .dotrem1 {
//     list-style-type: none;
//     width: 25px;
//     padding-left:4px;
//   }
//   .dotrem {
//     list-style-type: none;
//   }
//   .cal{
//     @media screen and (max-width: 768px) {
//       width: 19.5rem;

//     }
//   }

//   #tabb{
//     @media screen and (max-width: 768px) {
//       width: 25rem;
//     margin-left: -1.5rem;

//     } 
//   }
// `


import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";
const Treatment = () => {
  const dispatch = useDispatch();
  const { pid } = useParams();
  const user = useSelector((state) => state.user);

  const  branch = user.currentUser.branch_name;

  const [treatments, setTreatments] = useState([]);

  const getTreatmentsDetails = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:4000/api/v1/receptionist/getTreatmentViaUhid/${branch}/${pid}`
      );
      setTreatments(data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTreatmentsDetails()
  }, []);



  return (
    <Wrapper>
      <div className="container cont-box">
        <div className="" id="tabb">
          <div className="widget-area-2 proclinic-box-shadow mx-3 mt-5">
            <div className="table-responsive">
              <table className="table table-bordered table-striped">
                <thead>
                  <tr>
                  <th>TPID</th>
                      <th>Disease</th>
                      <th>Treatment</th>
                      <th>Total Sitting</th>
                      <th>Current Sitting</th>
                      <th>Current Sitting Status</th>
                      <th>Treatment Status</th>
                  </tr>
                </thead>
                <tbody>
                  {treatments?.map((item) => (
                    <>
                      <tr>
                      <td>{item.tp_id}</td>
                        <td>{item.desease}</td>
                        <td>{item.treatment_name}</td>
                        <td>{item.total_sitting}</td>
                        <td>{item.current_sitting}</td>
                        <td>{item.current_sitting_status}</td>
                        <td>{item.treatment_status}</td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Treatment;
const Wrapper = styled.div`
  #card1 {
    background-image: linear-gradient(#9dc5f8, #cbfdd9);
    width: 15rem;
    height: 22rem;
    @media screen and (max-width: 768px) {
      width: 91%;
      margin-left: -0.5rem;
    }
    @media screen and (min-width: 768px) and (max-width: 1020px) {
      width: 41rem;
    }
    @media screen and (min-width: 1020px) and (max-width: 1600px) {
      width: 13rem;
    }
  }

  .dotrem1 {
    list-style-type: none;
    width: 25px;
    padding-left: 4px;
  }
  .dotrem {
    list-style-type: none;
  }
  .cal {
    @media screen and (max-width: 768px) {
      width: 19.5rem;
    }
  }

  #tabb {
    @media screen and (max-width: 768px) {
      width: 25rem;
      margin-left: -1.5rem;
    }
  }

  .cont-box {
    width: 68rem;
    @media screen and (max-width: 768px) {
      width: 100%;
    }
  }
`;