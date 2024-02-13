import React from "react";
import styled from "styled-components";
import Calendar from 'react-calendar';
import "react-calendar/dist/Calendar.css";

function Appointment() {
  return (
    <Wrapper>
        <div className="row">
            <div className="col-lg-9" id="tabb">
                 <div
        className="widget-area-2 proclinic-box-shadow mx-3 mt-5"
        id="tableres"
      >
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>Date</th>
                <th>Appointment Time</th>
                <th>Consultant</th>
                <th>Treatment</th>
                <th>Cost</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>25-10-23</td>
                <td>10:00</td>
                <td>Dr.Umer Qureshi</td>
                <td>Root Canal</td>
                <td>4000</td>
                <td>Upcoming</td>
                <td>Edit/Delete/View</td>
              </tr>
              <tr>
                <td>25-10-23</td>
                <td>10:00</td>
                <td>Dr.Umer Qureshi</td>
                <td>Root Canal</td>
                <td>4000</td>
                <td>Upcoming</td>
                <td>Edit/Delete/View</td>
              </tr>
              <tr>
                <td>25-10-23</td>
                <td>10:00</td>
                <td>Dr.Umer Qureshi</td>
                <td>Root Canal</td>
                <td>4000</td>
                <td>Upcoming</td>
                <td>Edit/Delete/View</td>
              </tr>

           
            </tbody>
          </table>
        </div>
      </div>
      </div>
            <div className="col-lg-3">  
              <div className="card" id="card1">
            <div className="card-body">
              <h6 className="card-title" style={{ color: " #5a626d" }}>
                 Appointment
              </h6>
              <p className="card-text">
                <ul className="sec" id="section1">
                    
                  <div className="data">
                    <li className="dotrem text-black">Missed</li>

                    <li className="dotrem1  text-bg-danger rounded-5">54</li>
                  </div>
                  <div className="data">
                    <li className="dotrem text-black">Checked in</li>
                    <li className="dotrem1    text-bg-success rounded-5 ">
                      54
                    </li>
                  </div>
                  <div className="data">
                    <li className="dotrem text-black ">Upcoming</li>
                    <li className="dotrem1   text-bg-warning rounded-5  text-white">
                      54
                    </li>
                  </div>
                  <div className="data">
                    <li className="dotrem text-black">Complete</li>
                    <li className="dotrem1  text-bg-primary rounded-5 ">
                      54
                    </li>
                  </div>
                  <div className="data">
                    <li className="dotrem text-black ">Cancel</li>
                    <li className="dotrem1 text-bg-secondary rounded-5 ">54</li>
                  </div>
                </ul>
              </p>
            </div>
          </div>
          <div className="cal mt-2">
            
<Calendar/>
          </div>
          </div>
     
      </div>
    </Wrapper>
  );
}

export default Appointment;
const Wrapper = styled.div`
 #card1 {
    background-image: linear-gradient(#9dc5f8, #cbfdd9);
    width: 15rem;
    height: 19rem;
    @media screen and (max-width: 768px) {
        width: 31%;

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
    padding-left:4px;
  }
    .dotrem {
    list-style-type: none;
  }
  #tabb{
    @media screen and (max-width: 768px) {
      width: 23rem;
    margin-left: -1rem;

    }
  }
  .cal{
    @media screen and (max-width: 768px) {
      width: 19.5rem;

    }
  }
`;
