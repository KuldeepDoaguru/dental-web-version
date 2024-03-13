import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";

const ViewTreatPrescription = () => {
    const { id } = useParams();
    console.log(id);
    const navigate = useNavigate();
    return (
        <>
            <div className="container-fluid m-0 p-0">
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <table class="table table-bordered border">
                            <tbody>
                                <tr>
                                    <th scope="row">Appoint ID</th>
                                    <td>Mark</td>
                                    <th scope="row">Blood Group</th>
                                    <td scope="col">@mdo</td>
                                </tr>
                                <tr>
                                    <th scope="row">Patient Name </th>
                                    <td>Jacob</td>
                                    <th scope="row">Disease</th>
                                    <td>@fat</td>
                                </tr>
                                <tr>
                                    <th scope="row">Patient Mobile No.</th>
                                    <td>Larry</td>
                                    <th scope="row">Allergy</th>
                                    <td>@twitter</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ViewTreatPrescription;
const Wrapper = styled.div``;