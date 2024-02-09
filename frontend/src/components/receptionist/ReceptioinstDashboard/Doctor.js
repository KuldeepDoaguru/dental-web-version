import React from "react";
import styled from "styled-components";

function Doctor() {
  return (
    <Wrapper>
      <div className="widget-area-2 proclinic-box-shadow">
        <h3 className="widget-title">Doctor Available for 16-10-2023</h3>
        <input class="form-control mr-sm-2 mt-3 mb-2 w-50 m-auto" type="search" placeholder="Search" aria-label="Search"/>
        <div className="table-responsive" id="tab">
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>S:NO</th>
                <th>Doctor</th>
                <th>No. of Appointment</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Dr.Umer Qureshi</td>
                <td>05</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Dr.Mohit Shahu</td>

                <td>08</td>
              </tr>
              <tr>
                <td>3</td>

                <td>Dr.Kuldeep Kumar</td>
                <td>05</td>
              </tr>
              <tr>
                <td>4</td>

                <td>Dr.Manu Jain</td>
                <td>05</td>
              </tr>
              <tr>
                <td>5</td>

                <td>Dr.Vijay Datt</td>
                <td>09</td>
              </tr>
              <tr>
                <td>6</td>
                <td>Dr.Abhinav Pandey</td>
                <td>08</td>
              </tr>
              <tr>
                <td>7</td>
                <td>Dr.Urmila Kumar</td>
                <td>06</td>
              </tr>
              <tr>
                <td>7</td>
                <td>Dr.Urmila Kumar</td>
                <td>06</td>
              </tr>
             
            </tbody>
          </table>
        </div>
      </div>
      <nav aria-label="...">
  <ul class="pagination">
    <li class="page-item disabled">
      <a class="page-link">Previous</a>
    </li>
    <li class="page-item"><a class="page-link" href="#">1</a></li>
    <li class="page-item active" aria-current="page">
      <a class="page-link" href="#">2</a>
    </li>
    <li class="page-item"><a class="page-link" href="#">3</a></li>
    <li class="page-item">
      <a class="page-link" href="#">Next</a>
    </li>
  </ul>
</nav>
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
  @media screen and (min-width: 1020px) and (max-width: 1600px) {
   height: 26rem;
  }
}
.widget-title{
  @media screen and (max-width: 768px)  {
   margin-top: 15px;
   font-size: 20px;
  }
}
`
