import React from 'react'
import styled from 'styled-components'

function Prescription() {
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
                <th>Drug</th>
                <th>Time</th>
                <th>Day</th>
                <th>Added By</th>
                <th>Action</th>
               
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>25-09-23</td>
                <td><p>Tablet Peracethmol 400mg</p><p>Tablet Peracethmol 400mg</p><p>Tablet Peracethmol 400mg</p></td>
                <td>Morning,Afternoon,</td>
                <td>Four day</td>
                <td>Dr.Anurag Varma</td>
              
                <td>Edit/Delete/View</td>

                

              </tr>
          
              
             

           
            </tbody>
          </table>
        </div>
      </div></div>
    </Wrapper>
  )
}

export default Prescription
const Wrapper = styled.div`

.table{
    @media screen and (max-width: 768px) {
      width: 22rem;
      margin-left: -0.4rem;
  
    }
  }
`