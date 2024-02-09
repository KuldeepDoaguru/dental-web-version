import React from 'react'
import styled from 'styled-components'
import Calendar from 'react-calendar';
import "react-calendar/dist/Calendar.css";
function Bill() {
  return (
    <Wrapper>
        <div className="row">
        <div className="col-lg-8">  
          <div className="card" id="card1">
            <div className="card-body">
              <h6 className="card-title" style={{ color: " #5a626d" }}>
                 Payment Status
              </h6>
              <p className="card-text">
                <ul className="sec d-flex gap-3" id="section1">
                    
                  <div className="data">
                    <li className="dotrem text-black">Cash</li>

                    <li className="dotrem1  text-bg-danger rounded-5">54</li>
                  </div>
              
                  <div className="data">
                    <li className="dotrem text-black ">Online</li>
                    <li className="dotrem1   text-bg-warning rounded-5  text-white">
                      54
                    </li>
                  </div>
                 
                 
                </ul>
              </p>
            </div>
          </div>
           </div>
          <div className="cal col-lg-4">
            
<Calendar/>
          </div>
         
            <div className="col-lg-12" id='table'>
                 <div
        className="widget-area-2 proclinic-box-shadow mx-3 mt-5"
        id="tableres"
      >
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>Receipt Id</th>
                <th>Amount Paid(INR)</th>
                <th>Bill Id</th>
                <th>Billed Service</th>
                <th>Payment Mode</th>
               <th>Payment Mode</th>
                <th>Payment Details</th>
               
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>R58844</td>
                <td>2000</td>
                <td>B56778</td>
                <td>Root Canal</td>
                <td>Cash</td>
                <td>N/A</td>
                <td>Edit/Delete/View</td>
                

              </tr>
              <tr>
                <td>R58844</td>
                <td>2000</td>
                <td>B56778</td>
                <td>Root Canal</td>
                <td>Cash</td>
                <td>N/A</td>
                <td>Edit/Delete/View</td>
                

              </tr>
              <tr>
                <td>R58844</td>
                <td>2000</td>
                <td>B56778</td>
                <td>Root Canal</td>
                <td>Cash</td>
                <td>N/A</td>
                <td>Edit/Delete/View</td>
                

              </tr>
              <tr>
                <td>R58844</td>
                <td>2000</td>
                <td>B56778</td>
                <td>Root Canal</td>
                <td>Cash</td>
                <td>N/A</td>
                <td>Edit/Delete/View</td>
                

              </tr>
              
             

           
            </tbody>
          </table>
        </div>
      </div>
      </div>
           
     
      </div>
    </Wrapper>
  )
}

export default Bill
const Wrapper = styled.div`
 #card1 {
    background-image: linear-gradient(#9dc5f8, #cbfdd9);
    width: 20rem;
    height: 8rem;
    
    @media screen and (max-width: 768px) {
      width: 87%;
      margin-bottom: 12px;
      
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
  .cal{
    width: 19rem;
      
    @media screen and (max-width: 768px) {
    width :88% ;
    }
  }
  #table{
    @media screen and (max-width: 768px) {
      width: 22rem;
    margin-left: -1rem;
    }
  }
`