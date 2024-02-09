import React from 'react'
import styled from 'styled-components'
import Sider from '../../components/receptionist/Sider'

function ReportSection() {
  return (
    <Wrapper>
  <div className="row flex-nowrap">
    <div className="col-lg-1 col-1 " id='sider'>
   <Sider/>
   </div>
   <div className="col-lg-11">
    <div className="row">
      <div className="col-lg-11">
     <h1 className='hdd text-center mt-4'>Financial Report</h1>
      </div>
      <div className="row mt-4">
      <div className="col-lg-4">
          <div className="card" id="card2">
            <div className="card-body d-flex justify-content-between">
            <i class=" h1 bi bi-currency-rupee"></i>
              <div className="">
                <p className="card-title" style={{ color: " #5a626d" }}>
                INR 25000
                </p>

                <h6 className=" h6 text-center text-dark">Earning</h6>

             
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          
        <div className="card" id="card2">
            <div className="card-body d-flex justify-content-between">
            <i class=" h1 bi bi-currency-exchange"></i>
              <div className="">
                <p className="card-title" style={{ color: " #5a626d" }}>
                INR 15000
                </p>

                <h6 className=" h6 text-center text-dark">Expenses</h6>

             
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
        <div className="card" id="card2">
            <div className="card-body d-flex justify-content-between">
            <i class=" h1 bi bi-currency-dollar"></i>
              <div className="">
                <p className="card-title" style={{ color: " #5a626d" }}>
                + INR 10000 
                </p>

                <h6 className=" h6 text-center text-dark">Net Profile/Loss</h6>

             
              </div>
            </div>
          </div>
        </div>
</div>
            <div className="row mt-5">
                <div className="col-lg-6">
                <div className="widget-area-2 proclinic-box-shadow" id='tableres'>
                    <h5 className="widget-title text-center" id='title'>Earnings</h5>
                    <div className="table-responsive">
                      <table className="table table-bordered table-striped">
                        <thead>
                          <tr>
                            <th>S.No.</th>
                            <th>Receipt Id</th>
                            <th>Amount</th>
                            <th>Entry By</th>
                            <th>Date</th>
                          
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>1</td>
                            <td>R2661</td>
                            <td>3000</td>
                            <td>Receptioinist</td>

                            <td>23,feb 2023</td>
                            
                          </tr>
                          <tr>
                            <td>1</td>
                            <td>R2661</td>
                            <td>3000</td>
                            <td>Receptioinist</td>

                            <td>23,feb 2023</td>
                            
                          </tr>
                          <tr>
                            <td>1</td>
                            <td>R2661</td>
                            <td>3000</td>
                            <td>Receptioinist</td>

                            <td>23,feb 2023</td>
                            
                          </tr>
                          <tr>
                            <td>1</td>
                            <td>R2661</td>
                            <td>3000</td>
                            <td>Receptioinist</td>

                            <td>23,feb 2023</td>
                            
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                <div className="widget-area-2 proclinic-box-shadow" id='tableres'>
                    <h5 className="widget-title text-center" id='title'>Expenses</h5>
                    <div className="table-responsive">
                      <table className="table table-bordered table-striped">
                        <thead>
                          <tr>
                            <th>S.No.</th>
                            <th>Title</th>
                            <th>Amount</th>
                            <th>Entry By</th>
                            <th>Date</th>
                          
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>1</td>
                            <td>Equpments</td>
                            <td>3000</td>
                            <td>Receptioinist</td>

                            <td>23,feb 2023</td>
                            
                          </tr>
                          <tr>
                            <td>1</td>
                            <td>Equpments</td>
                            <td>3000</td>
                            <td>Receptioinist</td>

                            <td>23,feb 2023</td>
                            
                          </tr>
                          <tr>
                            <td>1</td>
                            <td>Equpments</td>
                            <td>3000</td>
                            <td>Receptioinist</td>

                            <td>23,feb 2023</td>
                            
                          </tr>
                          <tr>
                            <td>1</td>
                            <td>Equpments</td>
                            <td>3000</td>
                            <td>Receptioinist</td>

                            <td>23,feb 2023</td>
                            
                          </tr>
                          
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
            </div>
          
          </div>
   </div>
   </div>
    </Wrapper>
  )
}

export default ReportSection

const Wrapper = styled.div`

#card2 {
    width: 18rem;
    height: 6rem;
    margin-top: 5px;

    background-image: linear-gradient(#c8f9db, #9ac0fb);
    @media screen and (max-width: 768px) {
      margin-top: 1rem;
      width: 89%;
      margin-left: 1.2rem;
      
    }
    @media screen and (min-width: 768px) and (max-width: 1020px) {
      width: 41rem;
    }
    @media screen and (min-width: 1020px) and (max-width: 1600px) {
    width: 13rem;
  }
  }
  #card3 {
    width: 18rem;
    height: 6rem;

    background-image: linear-gradient(#c8f9db, #9ac0fb);
    margin-top: 5px;
    @media screen and (max-width: 768px) {
      width: 89%;
      
    }
    @media screen and (min-width: 768px) and (max-width: 1020px) {
      width: 41rem;
    }
    @media screen and (min-width: 1020px) and (max-width: 1600px) {
    width: 13rem;
  }
  }
  #card4 {
    width: 18rem;
    height: 6rem;

    background-image: linear-gradient(#9dc5f8, #cbfdd9);
    margin-top: 5px;
    @media screen and (max-width: 768px) {
      width: 89%;
    }
    @media screen and (min-width: 768px) and (max-width: 1020px) {
      width: 41rem;
    }
    @media screen and (min-width: 1020px) and (max-width: 1600px) {
    width: 13rem;
  }
  }
  
 #tableres{


@media screen and (max-width: 768px) {
  width: 20.2rem;
  margin-left: 1.2rem;
}
@media screen and (min-width: 768px) and (max-width: 1020px)  {
    width: 41rem;
  }
}
#title{
    background-image: linear-gradient(#fff0b4, #ffb4ee);
    padding: 1rem;
}
.hdd{
    background-image: linear-gradient(#fff0b4, #ffb4ee);
}
#sider{
    height: 45rem;
}

`