import React from 'react'
import styled from 'styled-components'

function Clinic_Examin() {
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
                <th>Treatment</th>
                <th>Chief Complaint</th>
                <th>Issue</th>
               <th>Diagnosis</th>
                <th>Investigation</th>
                <th>Added By</th>
                <th>Action</th>
               
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>25-09-23</td>
                <td>Root Canal</td>
                <td>Tooth Pain</td>
                <td>Tooth Decay</td>
                <td>Tooth Infection</td>
                <td>Decayed Tooth 25 27 28</td>
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

export default Clinic_Examin
const Wrapper = styled.div`

.table{
    @media screen and (max-width: 768px) {
      width: 22rem;
      margin-left: -0.1rem;
  
    }
  }
`