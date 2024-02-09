import React from 'react'
import styled from 'styled-components'

function Lab() {
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
                <th>Lab Test</th>
                <th>Lab Details</th>
                <th>Status</th>
                <th>Reports</th>
               <th>Bill Status</th>
               <th>Added by</th>
               <th>Action</th>
               
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>25-09-23</td>
                <td><p>DLC(Differntial Lucocytes Count)</p>
                <p>Automated</p>
                <p>HL 001</p>
                <p>Hemoglobin</p>
                <p>HL 002</p>
                </td>
                <td>Sample External Lab</td>
                <td>Advised</td>
                <td>Add Reports</td>
                <td>Add Bill</td>
                <td>Dr.Arun Varma</td>

                <td>Edit/Delete/View/Print/Email</td>

                

              </tr>
          
              
             

           
            </tbody>
          </table>
        </div>
      </div></div>
    </Wrapper>
  )
}

export default Lab
const Wrapper = styled.div`
.table{
    @media screen and (max-width: 768px) {
      width: 20rem;
      margin-left: -0.2rem;
  
    }
  }

`