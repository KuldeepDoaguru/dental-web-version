import React from 'react'
import styled from 'styled-components'

function Timeline() {
  return (
    <Wrapper>
      <div className="table">
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
              <tr>
                <td>25-09-23</td>
                <td>7:30pm</td>
                <td>Payment</td>
                <td>Rahul Kumar Successfully make payment of 2000/- </td>
              </tr>
              <tr>
                <td>25-09-23</td>
                <td>6:30pm</td>
                <td>Appointment</td>
                <td>New Patient Added By Receptionist</td>
              </tr>
              
             

           
            </tbody>
          </table>
        </div>
      </div></div>
    </Wrapper>
  )
}

export default Timeline
const Wrapper = styled.div`
.table{
    @media screen and (max-width: 768px) {
      width: 20rem;
      margin-left: -0.2rem;
  
    }
  }
`