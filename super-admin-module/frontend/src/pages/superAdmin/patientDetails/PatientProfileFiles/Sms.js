import React from 'react'
import styled from 'styled-components'

function Sms() {
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
                <th>Sent By</th>
                <th>Sent Text</th>
                <th>Status</th>
                <th>Added by</th>
               <th>Action</th>
               
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>25-09-23</td>
                <td>Dental Guru</td>
                <td><p>Hi Rahul Kumar,</p><p>Your Suceesfully </p><p>added to Dental guru clinic</p></td>
                <td>Success</td>
                <td>Dental Guru </td>

                <td>Edit/Delete/View</td>

                

              </tr>
          
              
             

           
            </tbody>
          </table>
        </div>
      </div></div>
    </Wrapper>
  )
}

export default Sms
const Wrapper = styled.div`
.table{
    @media screen and (max-width: 768px) {
      width: 20rem;
      margin-left: -0.2rem;
  
    }
  }

`