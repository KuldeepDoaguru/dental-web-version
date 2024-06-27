import React from "react";
import styled from "styled-components";
import Header from "../../components/MainComponents/Header";
import Sider from "../../components/MainComponents/Sider";
import Card from "./Card";
import TableData from "./TableData";
import PieCharts from "../../components/InternalComponent/PieCharts";
import BarChartz from "../../components/InternalComponent/BarChartz";
import Calender from "../../components/InternalComponent/Calender";
import { useSelector } from "react-redux";
import PrintHeader from "../../components/MainComponents/PrintHeader";

// import axios from "axios";

const Deshboard = () => {
  // useEffect(() => {
  //   axios.get("/localhost:3000");
  //   .then((response)=>{

  //   })
  // })
  const currentUser = useSelector(state => state.auth.user);

  const branch = currentUser.branch_name
 const address = currentUser.address
  return (
    <>
      <Container>
        <Header />
        <div clasNameName="main" >
          <div className="container-fluid">
            <div className="row flex-nowrap ">
              <div className="col-xxl-1 col-xl-1 col-lg-1 col-md-1 col-sm-1 p-0">
                <Sider />
              </div>
              <div className="col-xxl-11 col-xl-11 col-lg-11 col-md-11 col-sm-11" style={{marginTop:"5rem"}}>
                <div className="row d-flex justify-content-between">
                  <div className=" mt-4 mx-4">
                  <div className="mt-2">
                      <h3> Welcome to DentalGuru</h3>
                    </div>
                    <div>
                            <h5>Lab Attendant Dashboard</h5>
                          </div>
                  <div>
                            <h5>Branch : {branch}</h5>
                          </div>
         
                         
                          <form className="d-flex fw-semibold">
                            <p>Address </p>
                            
                            <p className="ms-1"> : </p>
                            <p className="ms-2">
                             {address}
                            </p>
                          </form>
                  </div>

                  {/* <div className="col-12 col-md-4 me-2 mt-5">
                    <form className="d-flex ms-auto my-sm" role="search">
                      <input
                        className="form-control me-2"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                      />
                      <button
                        className="btn btn-primary"
                        style={{ backgroundColor: "#213555" }}
                        type="submit"
                      >
                        Search
                      </button>
                    </form>
                  </div> */}
                </div>

                <Card />
               
               
                <div className="">
                  <div className="row mt-4">
                    <div className="col-lg-6">
                      <div className="ms-3 ">
                        <h3 className="ms-5" style={{color:"#213555"}}>Pending And Completed Overview</h3>
                        <div className="mt-3">
                          <BarChartz />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="ms-4">
                        <h3 className="title text-center mt-lg-0 mt-md-5 " style={{color:"#213555"}}>
                          Patients Pending Test Data
                        </h3>
                        <div className="mt-3">
                          <PieCharts />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-12">
                    <div className="mt-5">
                      <TableData />
                    </div>
                  </div>
                  <div className="col-lg-3">
                    {/* <Calender /> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Deshboard;
const Container = styled.div`
   width: 100%;
`;

// const Table = styled.div`
//   cursor: pointer;
//   height: 80%;
//   overflow-y: auto;

//   .margin{
//     margin-top:5rem;


//   }
 
// `;
