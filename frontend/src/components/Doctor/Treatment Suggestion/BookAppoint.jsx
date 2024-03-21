import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useParams } from "react-router-dom";

const BookAppoint = () => {
    return (
        <>
            <Wrapper>
                <div className="container">
                    <div className="row d-flex justify-content-center">
                        <div className="shadow-sm p-3 m-5 bg-body rounded formBody">
                            <h2 className="text-center mb-4" id="title">Book Appointment</h2>
                            <form>
                                <div data-mdb-input-init class="form-outline mb-4">
                                    <label className="form-label" for="form5Example1">Treatment ID</label>
                                    <input type="text" className="form-control" />
                                </div>

                                <div data-mdb-input-init class="form-outline mb-4">
                                    <label class="form-label" for="form5Example2">Patient UHID</label>
                                    <input type="text" className="form-control" />
                                </div>

                                <div data-mdb-input-init class="form-outline mb-4">
                                    <label class="form-label" for="form5Example2">Patient Name</label>
                                    <input type="text" className="form-control" />
                                </div>

                                <div data-mdb-input-init class="form-outline mb-4">
                                    <label class="form-label" for="form5Example2">Doctor Name</label>
                                    <input type="text" className="form-control" />
                                </div>

                                <div data-mdb-input-init class="form-outline mb-4">
                                    <label class="form-label" for="form5Example2">Appointment Date</label>
                                    <input type="text" className="form-control" />
                                </div>

                                <div data-mdb-input-init class="form-outline mb-4">
                                    <label class="form-label" for="form5Example2">Treatment</label>
                                    <input type="text" className="form-control" />
                                </div>

                                <div data-mdb-input-init class="form-outline mb-4">
                                    <label class="form-label" for="form5Example2">Note</label>
                                    <input type="text" className="form-control" />
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </Wrapper>
        </>
    )
}

export default BookAppoint;
const Wrapper = styled.div`
.formBody{
    width: 22rem;
}`;