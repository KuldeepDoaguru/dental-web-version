import React from 'react'
import styled from 'styled-components'
import Sider from '../../components/receptionist/Sider'
import Header from '../../components/receptionist/Header'
import Makepayment from '../../components/receptionist/Bill/Makepayment'
import Detail from '../../components/receptionist/Bill/Detail'
import Editbill from '../../components/receptionist/Bill/Editbill'
import Addbill from '../../components/receptionist/Bill/Addbill'

function BillSection() {
  return (
    <Wrapper>
      <Header/>
      <div className="row flex-nowrap">
    <div className="col-lg-1 col-1 " id='sider'>
   <Sider/>
   </div>
   <div className="col-lg-11">
    <div className="row">
      <div className="col-lg-7">
      <div className="card" id="card1">
            <div className="card-body">
              <h6 className="card-title" style={{ color: "black" }}>
                 Bill Status
              </h6>
              <p className="card-text">
                <ul className="sec d-flex gap-3" id="section1">
                    
                  <div className="data">
                    <li className="dotrem text-black">Unpaid</li>

                    <li className="dotrem1  text-bg-danger rounded-5">54</li>
                  </div>
              
                  <div className="data">
                    <li className="dotrem text-black ">Partialy Paid</li>
                    <li className="dotrem1   text-bg-warning rounded-5  text-white">
                      54
                    </li>
                  </div>
                  <div className="data">
                    <li className="dotrem text-black">Paid</li>
                    <li className="dotrem1  text-bg-primary rounded-5 ">
                      54
                    </li>
                  </div>
                 
                </ul>
              </p>
            </div>
          </div> 
               </div>
<div className="col-lg-3">
          <div className="card" id="card2">
            <div className="card-body">
              <h6 className="card-title" style={{ color: " black" }}>
                 Total Bill
              </h6>
              <p className="card-text">
                <ul className="sec " id="section1">
                    
                  <div className="data d-flex gap-3">
                    <li className="dotrem text-black">Total Bill Amount -</li>

                    <li className="dotrem2  ">25600</li>
                  </div>
              
                  <div className="data d-flex gap-3"> 
                    <li className="dotrem text-black ">Total Unpaid Amount -</li>
                    <li className="dotrem2 ">
                    36600
                    </li>
                  </div>
                  <div className="data d-flex gap-3">
                    <li className="dotrem text-black">Total Partialy Paid Amount -</li>
                    <li className="dotrem2  ">
                      40600
                    </li>
                  </div>
                 
                </ul>
              </p>
            </div>
          </div>
          </div>
          <div className="col-lg-1 mt-5 mx-2">
         <Addbill/>
          </div>

      <div className="col-lg-11">
           <div
   className="widget-area-2 proclinic-box-shadow mx-3 mt-5"
   id="tableres"
 >
   <div className="table-responsive"id='table'>
     <table className="table table-bordered table-striped" >
       <thead>
         <tr>
         <th>Patient Name</th>
         <th>Bill Id</th>
           <th>Treatment</th>
           <th>Consultant</th>
           <th>Cost(INR)</th>
           <th>Discount(INR)</th>
          <th>Tax%</th>
           <th>Total(INR)</th>
           <th>Bill Amount</th>
           <th>Pending</th>
           <th>Paid</th>
           <th>Billing Status</th>
           <th>Action</th>
         </tr>
       </thead>
       <tbody>
         <tr>
          <td>Rahul Kumar</td>
           <td>B56778</td>
           <td>Root Canal</td>
           <td>Dr.Umer Qureshi</td>
           <td>4000</td>
           <td>400</td>
           <td>0%</td>
           <td>1800</td>
           <td>1800</td>
           <td>0</td>
           <td>1800</td>
           <td>Paid</td>
           <td>
           <div className="dropdown">
  <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    Action
  </button>
  <ul className="dropdown-menu">
  <li><a className="dropdown-item mx-0" href="#"><Detail/></a></li>
    <li><a className="dropdown-item mx-0 " href="#"><Editbill/></a></li>
  
    <li><a className="dropdown-item mx-0" href="#"><Makepayment/></a></li>
  
  </ul>
</div>
           </td>

         </tr>
         <tr>
         <td>Rahul Kumar</td>
           <td>B56778</td>
           <td>Root Canal</td>
           <td>Dr.Umer Qureshi</td>
           <td>4000</td>
           <td>400</td>
           <td>0%</td>
           <td>1800</td>
           <td>1800</td>
           <td>0</td>
           <td>1800</td>
           <td>Paid</td>
           <td>      <div className="dropdown">
  <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    Action
  </button>
  <ul className="dropdown-menu">
  <li><a className="dropdown-item mx-0 detail" href="#"><Detail/></a></li>
    <li><a className="dropdown-item mx-4 " href="#"><Editbill/></a></li>
  
    <li><a className="dropdown-item mx-0" href="#"><Makepayment/></a></li>
 
  </ul>
</div></td>

         </tr>
        
            <tr>
            <td>Rahul Kumar</td>
           <td>B56778</td>
           <td>Root Canal</td>
           <td>Dr.Umer Qureshi</td>
           <td>4000</td>
           <td>400</td>
           <td>0%</td>
           <td>1800</td>
           <td>1800</td>
           <td>0</td>
           <td>1800</td>
           <td>Paid</td>
           <td>      <div className="dropdown">
  <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    Action
  </button>
  <ul className="dropdown-menu">
  <li><a className="dropdown-item mx-0" href="#"><Detail/></a></li>
    <li><a className="dropdown-item mx-2 " href="#"><Editbill/></a></li>
  
    <li><a className="dropdown-item mx-0" href="#"><Makepayment/></a></li>
    
  </ul>
</div></td>

         </tr>
        
        

      
       </tbody>
     </table>
   </div>
 </div>
      </div>
  
   
            
          
          </div>
   </div>
   </div>
 
 
    </Wrapper>
   
  )
}

export default BillSection
const Wrapper = styled.div`
#card1 {
    background-image: linear-gradient(#9dc5f8, #cbfdd9);
    width: 20rem;
    height: 8rem;
    margin-top: 1rem;
    
    @media screen and (max-width: 768px) {
      width: 80%;
      margin-left: 1.3rem;
    margin-bottom: 12px;

    }
    @media screen and (min-width: 768px) and (max-width: 1020px) {
      width: 41rem;
    }
    @media screen and (min-width: 1020px) and (max-width: 1600px) {
    width: 13rem;
  }
  }
  #card2 {
    background-image: linear-gradient(#9dc5f8, #cbfdd9);
    width: 22rem;
    height: 8rem;
    margin-top: 1rem;
    display: flex;
    
    @media screen and (max-width: 768px) {
      width: 80%;
      height: 10rem;
      margin-left: 1.3rem;
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
  .dotrem2 {
    list-style-type: none;
    
    padding-left:4px;
  }
  .data{

  color: black;

 
}
  #tableres{
     
    @media screen and (max-width: 768px) {
      width: 84%;
      
   
    }
  }
td{
  padding: 2rem;
}
#sider{
  height: 90rem;
  @media screen and (max-width: 768px) {
      
    height: 49rem;
   
    }
}

`
