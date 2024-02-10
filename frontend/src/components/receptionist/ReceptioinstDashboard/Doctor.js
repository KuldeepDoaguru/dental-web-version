import React from "react";
import styled from "styled-components";

function Doctor() {
  return (
    <Wrapper>
      <div className="widget-area-2 proclinic-box-shadow bg-white">
        <h3 className="widget-title text-center">Doctor Available for 16-10-2023</h3>
        <input class="form-control mr-sm-2 mt-3 mb-2 w-50 m-auto" type="search" placeholder="Search" aria-label="Search"/>
        <div className="table-responsive" id="tab">
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>S:NO</th>
                <th>Doctor</th>
                <th>No. of App.</th>
                <th>Available Slot</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Dr.Umer Qureshi</td>
                <td>05</td>
               <td> <select className="form-select">
      <option value="">09:00 AM</option>
      <option value="">09:00 AM</option>
      <option value="">09:00 AM</option>
      <option value="">09:00 AM</option>
      
     
    </select></td>

              </tr>
              <tr>
                <td>2</td>
                <td>Dr.Mohit Shahu</td>

                <td>08</td>
                <td> <select className="form-select">
      <option value="">09:00 AM</option>
      <option value="">09:00 AM</option>
      <option value="">09:00 AM</option>
      <option value="">09:00 AM</option>
      
     
    </select></td>
                
              </tr>
              <tr>
                <td>3</td>

                <td>Dr.Kuldeep Kumar</td>
                <td>05</td>
                <td> <select className="form-select">
      <option value="">09:00 AM</option>
      <option value="">09:00 AM</option>
      <option value="">09:00 AM</option>
      <option value="">09:00 AM</option>
      
     
    </select></td>
              </tr>
              <tr>
                <td>4</td>

                <td>Dr.Manu Jain</td>
                <td>05</td>
                <td> <select className="form-select">
      <option value="">09:00 AM</option>
      <option value="">09:00 AM</option>
      <option value="">09:00 AM</option>
      <option value="">09:00 AM</option>
      
     
    </select></td>
              </tr>
              <tr>
                <td>5</td>

                <td>Dr.Vijay Datt</td>
                <td>09</td>
                <td> <select className="form-select">
      <option value="">09:00 AM</option>
      <option value="">09:00 AM</option>
      <option value="">09:00 AM</option>
      <option value="">09:00 AM</option>
      
     
    </select></td>
              </tr>
              <tr>
                <td>6</td>
                <td>Dr.Abhinav Pandey</td>
                <td>08</td>
                <td> <select className="form-select">
      <option value="">09:00 AM</option>
      <option value="">09:00 AM</option>
      <option value="">09:00 AM</option>
      <option value="">09:00 AM</option>
      
     
    </select></td>
              </tr>
              <tr>
                <td>7</td>
                <td>Dr.Urmila Kumar</td>
                <td>06</td>
                <td> <select className="form-select">
      <option value="">09:00 AM</option>
      <option value="">09:00 AM</option>
      <option value="">09:00 AM</option>
      <option value="">09:00 AM</option>
      
     
    </select></td>
              </tr>
              <tr>
                <td>7</td>
                <td>Dr.Urmila Kumar</td>
                <td>06</td>
                <td> <select className="form-select">
      <option value="">09:00 AM</option>
      <option value="">09:00 AM</option>
      <option value="">09:00 AM</option>
      <option value="">09:00 AM</option>
      
     
    </select></td>
              </tr>
             
            </tbody>
          </table>
        </div>
      </div>
     <div className="d-flex justify-content-center mt-1">
  <ul className="pagination">
    <li className="page-item">
      <a className="page-link">Previous</a>
    </li>
    <li className="page-item"><a className="page-link" href="#">1</a></li>
    <li className="page-item active" aria-current="page">
      <a className="page-link" href="#">2</a>
    </li>
    <li className="page-item"><a className="page-link" href="#">3</a></li>
    <li className="page-item">
      <a className="page-link" href="#">Next</a>
    </li>
  </ul>
  </div> 

    </Wrapper>
  );
}

export default Doctor;
const Wrapper = styled.div`
#tab{
  @media screen and (max-width: 768px)  {
   width: 20rem;
  }
  @media screen and (min-width: 768px) and (max-width: 1020px)  {
      width: 41rem;
    }
  @media screen and (min-width: 1020px) and (max-width: 1700px) {
   height: 26rem;
  }
}
.widget-title{
  font-size: 20px;
  
  @media screen and (max-width: 768px)  {
   margin-top: 15px;
   font-size: 20px;
  }
}
`
