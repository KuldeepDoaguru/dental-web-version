import React, { useEffect, useState } from "react";
import styled from "styled-components";

function Form() {
  
  
  const [data,setData] = useState({
    date:"",
  }) 
  // const [age, setAge] = useState(null);

  // useEffect(()=>{
  //   const calculateAge = (date) => {
  //     const dob = new Date(date);
  //     const now = new Date();
  //     let years = now.getFullYear() - dob.getFullYear();
      
  //     // Adjust for leap years
  //     const dobThisYear = new Date(now.getFullYear(), dob.getMonth(), dob.getDate());
  //     if (now < dobThisYear) {
  //       years--;
  //     }
      
  //     setAge(years);
  //   };
  //   calculateAge(data.date);
  // },[data.date])
  

  
 
 
  
  return (
    <Wrapper>
      <div className="">
        <div className="row  mx-1 p-1 border rounded bg-white" id="section3">
          <ul className="nav nav-tabs" id="myTab" role="tablist">
            <li className="nav-item" role="presentation">
              <button
                className="nav-link active"
                id="home-tab1"
                data-bs-toggle="tab"
                data-bs-target="#home-tab-pane"
                type="button"
                role="tab"
                aria-controls="home-tab-pane"
                aria-selected="true"
              >
                Add Patient
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="profile-tab1"
                data-bs-toggle="tab"
                data-bs-target="#profile-tab-pane"
                type="button"
                role="tab"
                aria-controls="profile-tab-pane"
                aria-selected="false"
              >
                Book Appointment
              </button>
            </li>

            <div className="tab-content" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="home-tab-pane"
                role="tabpanel"
                aria-labelledby="home-tab"
                tabindex="0"
              >
                <ul className="list-group">
                  <li className="list-group-item">
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="form-outline" id="form1">
                          <label className="form-label" for="form6Example1">
                            Patient name
                          </label>
                          <input
                            type="text"
                            id="form6Example1"
                            className="form-control"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6 ">
                        <div className="form-outline">
                          <label className="form-label" for="form6Example2">
                            Gender
                          </label>

                          <input
                            type="text"
                            id="form6Example2"
                            className="form-control"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-outline">
                          <label className="form-label" for="form6Example1">
                            Moblie
                          </label>
                          <input
                            required
                            type="text"
                            className="form-control"
                            placeholder=""
                            maxLength={10}
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-outline" id="form1">
                          <label className="form-label" for="form6Example2">
                            City
                          </label>
                          <input
                            type="text"
                            id="form6Example2"
                            className="form-control"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-outline">
                          <label className="form-label" for="form6Example1">
                            Address
                          </label>
                          <input
                            type="text"
                            id="form6Example1"
                            className="form-control"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-outline">
                          <label className="form-label" for="form6Example2">
                            Contact Person
                          </label>
                          <input
                            type="text"
                            id="form6Example2"
                            className="form-control"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-outline">
                          <label className="form-label" for="form6Example1">
                            Blood Group
                          </label>
                          <input
                            type="text"
                            id="form6Example1"
                            className="form-control"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-outline">
                          <label className="form-label" for="form6Example2">
                            Contact Person Name
                          </label>
                          <input
                            type="text"
                            id="form6Example2"
                            className="form-control"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-outline">
                          <label
                            className="form-label"
                            for="form6Example1"
                            
                          >
                            Date of Birth
                          </label>
                          <input
                            type="date"
                            id="form6Example1"
                            className="form-control"
                            value={data.date}
                            onChange={(e) => {
                              setData(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-outline">
                          <label className="form-label" for="form6Example2">
                            Age
                          </label>

                          <input
                            type="text"
                            id="form6Example2"
                            className="form-control"
                          />
                        </div>
                      </div>
                      <div className="formbtn">
                        <button className="btn btn-success " id="btn2">
                          {" "}
                          Sumbit
                        </button>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <div
                className="tab-pane fade"
                id="profile-tab-pane"
                role="tabpanel"
                aria-labelledby="profile-tab"
                tabindex="0"
              >
                <ul className="list-group">
                 
                  <li className="list-group-item">
                  <input
                    class="form-control mr-sm-2 mt-3 mb-2 w-50 m-auto"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                  />
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="form-outline" id="form1">
                        <label className="form-label" for="form6Example1">
                            Patient name
                          </label>
                          <input
                            type="text"
                            id="form6Example1"
                            className="form-control"
                          />

                         
                        </div>
                      </div>
                      <div className="col-sm-6 ">
                        <div className="form-outline">
                        <label className="form-label" for="form6Example2">
                            Date&Time
                          </label>
                          <input
                            type="text"
                            id="form6Example2"
                            className="form-control"
                          />
                         
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-outline">
                        <label className="form-label" for="form6Example1">
                            Doctor
                          </label>
                          <input
                            type="text"
                            id="form6Example1"
                            className="form-control"
                          />
                          
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-outline" id="form1">
                        <label className="form-label" for="form6Example2">
                            Add Treatment
                          </label>
                          <input
                            type="text"
                            id="form6Example2"
                            className="form-control"
                          />
                          
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-outline">
                        <label className="form-label" for="form6Example1">
                            Notes
                          </label>
                          <input
                            type="text"
                            id="form6Example1"
                            className="form-control"
                          />
                         
                        </div>
                      </div>
                      <div className="col-sm-6">
                        
                      </div>

                      <div className="col-sm-3">
                        <div className="form-outline">
                          <label className="form-label" for="form6Example1">
                            Doctor :
                          </label>
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <div className="form-outline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            value=""
                            id="flexCheckDefault"
                          />
                          <label
                            class="form-check-label mx-2"
                            for="flexCheckDefault"
                          >
                            Sms
                          </label>
                        </div>
                      </div>
                      <div className="col-sm-5">
                        <div className="form-outline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            value=""
                            id="flexCheckDefault"
                          />
                          <label
                            class="form-check-label mx-2"
                            for="flexCheckDefault"
                          >
                            Send Email
                          </label>
                        </div>
                      </div>

                      <div className="col-sm-3">
                        <div className="form-outline">
                          <label className="form-label" for="form6Example1">
                            Patient :
                          </label>
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <div className="form-outline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            value=""
                            id="flexCheckDefault"
                          />
                          <label
                            class="form-check-label mx-2"
                            for="flexCheckDefault"
                          >
                            Sms
                          </label>
                        </div>
                      </div>
                      <div className="col-sm-5">
                        <div className="form-outline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            value=""
                            id="flexCheckDefault"
                          />
                          <label
                            class="form-check-label mx-2"
                            for="flexCheckDefault"
                          >
                            Send Email
                          </label>
                        </div>
                      </div>

                      <div className="formbtn">
                        <button className="btn btn-success " id="btn2">
                          {" "}
                          Sumbit
                        </button>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </ul>
        </div>
      </div>
    </Wrapper>
  );
}

export default Form;

const Wrapper = styled.div`
  #section3 {
    @media screen and (max-width: 768px) {
      margin-top: 1rem;
      width: 20rem;
    
    }
    @media screen and (min-width: 768px) and (max-width: 1020px)  {
      width: 41rem;
    }
  }
    .formbtn {
      margin-top: 1rem;
      margin-left: 2rem;
    }

    #tab1 {
      height: 12rem;
      @media screen and (max-width: 768px) {
        margin-left: -1.1rem;
      }
    }

    #btn2 {
      margin-left: 9rem;

      @media screen and (max-width: 768px) {
        margin-left: 5.5rem;
      }
      @media screen and (min-width: 768px) and (max-width: 1020px) {
        margin-left: 1rem;
      }
      @media screen and (min-width: 1600px) and (max-width: 3700px) {
        margin-left: 10rem;
        margin-bottom: 1rem;
      }
    }
    #myTabContent{
      height: 28.5rem;
      
    }
  
`;
