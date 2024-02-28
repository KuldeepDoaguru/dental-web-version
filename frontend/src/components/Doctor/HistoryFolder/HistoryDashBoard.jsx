import React from "react";
import styled from "styled-components";
import HeadBar from "../HeadBar";
import Sider from "../SideBar";
import HistoryPatient from "./HistoryPatient";

const HistoryDashBoard = () => {

    return (
        <>
            <Wrapper>
                <HeadBar />

                <div className="main">
                    <div className="container-fluid">
                        <div className="row flex-nowrap">
                            <div className="col-lg-1 col-1 p-0">
                                <Sider />
                            </div>
                            <div className="col-lg-11 col-11 ps-0 m-2">
                                <HistoryPatient />
                            </div>
                        </div>
                    </div>
                </div>
            </Wrapper>
        </>
    );
};

export default HistoryDashBoard;
const Wrapper = styled.div``;
