import React from "react";
import styled from "styled-components";
import Header from "../Header";
import Sider from "../Sider";
import { GiNuclearWaste } from "react-icons/gi";
import { GiFrontTeeth } from "react-icons/gi";
import { FaTeeth } from "react-icons/fa6";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { TbBasketQuestion } from "react-icons/tb";
import BranchDetails from "../BranchDetails";
import Editbill from "../Bill/Editbill";
import EditNewPurchase from "../EditNewPurchase";
import { Link } from "react-router-dom";
const NewPurchase = () => {
  return (
    <>
      <Container>
        <Header />
        <div className="main">
          <div className="container-fluid">
            <div className="row flex-nowrap ">
              <div className="col-xxl-1 col-xl-1 col-lg-1 col-md-2 col-sm-2 p-0">
                <Sider />
              </div>
              <div className="col-xxl-11 col-xl-11 col-lg-11 col-md-10 col-sm-10">
                <BranchDetails />

                <div className="Heading mt-4 d-flex justify-content-center">
                  <h2>New Purchase</h2>
                </div>

                <div className="row d-flex justify-content-around mt-4">
                  <div className="col-xxl-2 col-xl-2 col-lg-2 col-sm-8 col-xxl-2 col-xl-2 col-lg-2 col-sm-8 col-8 col-md-2 my-3 p-0">
                    <div className="card">
                      <div className="card-body d-flex justify-content-center flex-column mb-3">
                        <div className="text-light fs-1">
                          <GiNuclearWaste />
                        </div>
                        <div className="cardtext">
                          <h5 className="card-title text-light">
                            Machine Stock
                          </h5>
                          <p className="card-text text-light fw-semibold">4</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-xxl-2 col-xl-2 col-lg-2 col-sm-8 col-8 col-md-2 my-3 p-0">
                    <div className="card">
                      <div className="card-body d-flex justify-content-center flex-column mb-3">
                        <div className="text-light fs-1">
                          <GiFrontTeeth />
                        </div>
                        <div className="cardtext">
                          <h5 className="card-title text-light">
                            Braces Stock
                          </h5>
                          <p className="card-text text-light fw-semibold">
                            250
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-xxl-2 col-xl-2 col-lg-2 col-sm-8 col-8 col-md-2 my-3 p-0">
                    <div className="card">
                      <div className="card-body d-flex justify-content-center flex-column mb-3">
                        <div className="text-light fs-1">
                          <FaTeeth />
                        </div>
                        <div className="cardtext">
                          <h5 className="card-title text-light">
                            Artificial Teeth Stock
                          </h5>
                          <p className="card-text text-light fw-semibold">
                            2500
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-xxl-2 col-xl-2 col-lg-2 col-sm-8 col-8 col-md-2 my-3 p-0">
                    <div className="card">
                      <div className="card-body d-flex justify-content-center flex-column mb-3">
                        <div className="text-light fs-1">
                          <MdOutlineAddShoppingCart />
                        </div>
                        <div className="cardtext">
                          <h5 className="card-title text-light">
                            Other Items Stock
                          </h5>
                          <p className="card-text text-light fw-semibold">15</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-xxl-2 col-xl-2 col-lg-2 col-sm-8 col-8 col-md-2 my-3 p-0">
                    <div className="card">
                      <div className="card-body d-flex justify-content-center flex-column">
                        <div>
                          <TbBasketQuestion className="fs-1 text-light" />
                        </div>

                        <div className="cardtext">
                          <h5 className="card-title text-light">
                            Out Of Stock
                          </h5>
                          <p className="card-text text-light fw-semibold">09</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="container-fluid mt-4">
                  <div className="row flex-nowrap ">
                    <div className="col-xxl-12 col-xl-12 col-lg-12 col-12 ps-0">
                      <div className="container-fluid mt-4">
                        <h2 className="text-center">All Purchase Items List</h2>
                        <div className="container-fluid mt-5">
                          <div class="table-responsive rounded">
                            <table class="table table-bordered rounded shadow">
                              <thead className="table-head">
                                <tr>
                                  <th className="table-sno">SN</th>
                                  <th className="table-small">Item Name</th>
                                  <th className="table-small">Vander</th>
                                  <th className="table-small">Quantity</th>
                                  <th className="table-small">
                                    Per Items Price
                                  </th>
                                  <th className="table-small">Total Amount</th>
                                  <th className="table-small">Gst %</th>
                                  <th className="table-small">Discount</th>

                                  <th className="table-small">Net price</th>
                                  <th className="table-small">Paid Amount</th>
                                  <th className="table-small">Due Amount</th>
                                  <th className="table-small">Paid Date</th>
                                  <th className="table-small">Bill Date</th>
                                  <th className="table-small">Action</th>
                                </tr>
                              </thead>

                              <tbody>
                                <tr className="table-row">
                                  <td className="table-sno">1</td>

                                  <td className="table-small">Machine</td>
                                  <td className="table-small">L&T</td>

                                  <td className="table-small">4</td>
                                  <td className="table-small">40000</td>

                                  <td className="table-small">160000</td>
                                  <td className="table-small">18%</td>
                                  <td className="table-small">8.4%</td>
                                  <td className="table-small">193000</td>
                                  <td className="table-small">100000</td>
                                  <td className="table-small">93000</td>
                                  <td className="table-small">01/01</td>
                                  <td className="table-small">01/04</td>

                                  <td>
                                    <div className="d-flex justify-content-center align-items-center">
                                      <EditNewPurchase />
                                      <Link
                                        to="/PaidByUs"
                                        class="nav-link px-0"
                                      >
                                        <button className="btn btn-warning">
                                          View Bill
                                        </button>
                                      </Link>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>

                              <tbody>
                                <tr className="table-row">
                                  <td className="table-sno">1</td>

                                  <td className="table-small">Machine</td>
                                  <td className="table-small">L&T</td>

                                  <td className="table-small">4</td>
                                  <td className="table-small">40000</td>

                                  <td className="table-small">160000</td>
                                  <td className="table-small">18%</td>
                                  <td className="table-small">8.4%</td>
                                  <td className="table-small">193000</td>
                                  <td className="table-small">100000</td>
                                  <td className="table-small">93000</td>
                                  <td className="table-small">01/01</td>
                                  <td className="table-small">01/04</td>

                                  <td className="table-small">
                                    <div className="d-flex justify-content-center align-items-center">
                                      <EditNewPurchase />
                                      <Link
                                        to="/PaidByUs"
                                        class="nav-link px-0"
                                      >
                                        <button className="btn btn-warning">
                                          View Bill
                                        </button>
                                      </Link>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                              <tbody>
                                <tr className="table-row">
                                  <td className="table-sno">1</td>

                                  <td className="table-small">Machine</td>
                                  <td className="table-small">L&T</td>

                                  <td className="table-small">4</td>
                                  <td className="table-small">40000</td>

                                  <td className="table-small">160000</td>
                                  <td className="table-small">18%</td>
                                  <td className="table-small">8.4%</td>
                                  <td className="table-small">193000</td>
                                  <td className="table-small">100000</td>
                                  <td className="table-small">93000</td>
                                  <td className="table-small">01/01</td>
                                  <td className="table-small">01/04</td>

                                  <td className="table-small">
                                    <div className="d-flex justify-content-center align-items-center">
                                      <EditNewPurchase />
                                      <Link
                                        to="/PaidByUs"
                                        class="nav-link px-0"
                                      >
                                        <button className="btn btn-warning">
                                          View Bill
                                        </button>
                                      </Link>
                                    </div>
                                  </td>
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
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default NewPurchase;

const Container = styled.div`
  .card {
    background: #201658;
    height: 9.5rem;
    border: none;
    box-shadow: 1px 2px 8px black;
    &:hover {
      background: #9b59b6;
    }
  }

  .icon {
    font-size: 40px;
    /* align-items: start; */
    color: white;
    /* display: flex; */
  }
  .card-body {
    text-align: center;
    padding: 5px;
  }
  .card-link {
    text-decoration: none;
    font-size: small;
  }

  .cardtext {
    h5 {
      color: white;
    }
    p {
      color: white;
    }
  }
`;
