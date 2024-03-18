import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { GiFastBackwardButton } from "react-icons/gi";
import axios from "axios";

const TreatSuggest = () => {
    const [treatments, setTreatments] = useState([]);
    const [currentForm, setCurrentForm] = useState(1);

    const getTreatmentList = async () => {
        try {
            const res = await axios.get(`http://localhost:8888/api/doctor/treatmentLists`);
            console.log(res.data.data);
            setTreatments(res.data.data);
        } catch (error) {
            console.log('Error fetching treatments:', error);
        }
    };

    useEffect(() => {
        getTreatmentList();
    }, []);

    const handleSubmitForm = (event) => {
        event.preventDefault();
        if (currentForm < 3) {
            setCurrentForm(currentForm + 1);
        }
    };
    return (
        <>
            <Wrapper>
                <div className="container main">
                    <div className="row justify-content-center ">
                        <div className="text-start">
                            <button className="btn btn-secondary mb-2" onClick={() => window.history.back()}>
                                <GiFastBackwardButton size={22} />
                            </button>
                            <p className="fs-1 shadow-none p-2 bg-light rounded text-center">Treatment Suggestion</p>
                        </div>
                    </div>
                </div>

                <div className="container mainbody">
                    <div className="row shadow-sm p-3 mb-5 bg-body rounded">
                        <form onSubmit={handleSubmitForm}>
                            <div className="">
                            <div className="text-center">
                                <label className="label">Select Treatment ?</label>
                                </div>
                                <div className="d-flex justify-content-center align-item-center text-center">
                                    <select className="form-select text-center w-25" aria-label="Default select example">
                                        <option selected>Choose Treatment</option>
                                        {treatments.map((item, index) => (
                                            <option key={index}>{item.treatment_name}</option>
                                        ))}
                                    </select>
                                    <div className="m-2">
                                        <button type="submit" className="btn btn-primary">Save</button>
                                    </div>
                                </div>

                            </div>

                        </form>
                        {currentForm >= 2 && (
                            <form onSubmit={handleSubmitForm}>
                                <div className="text-center">
                                <label className="label"> How Many Sitting Are Required ?</label>
                                </div>
                                <div className="d-flex justify-content-center align-item-center">

                                    <input type="number" className="form-control w-25" placeholder="Answer...." />
                                    <div className="m-2">
                                        <button type="submit" className="btn btn-primary">Save</button>
                                    </div>
                                </div>
                            </form>
                        )}
                        {currentForm >= 3 && (
                            <form onSubmit={handleSubmitForm}>
                                <div className="d-flex flex-column align-items-center mt-3 mb-3">
                                    <label className="label">Consider this is first Sitting ?</label>
                                    <div className="d-flex justify-content-evenly">
                                        <input type="radio" name="treatment" value="YES" />
                                        <label for="yes">YES</label>
                                        &nbsp;
                                        <input type="radio" name="treatment" value="NO" />
                                        <label for="no">NO</label>
                                    </div>
                                    <div className="m-2">
                                        <button type="submit" className="btn btn-primary">Save</button>
                                    </div>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </Wrapper>
        </>
    )
}

export default TreatSuggest;
const Wrapper = styled.div`
.main{
    margin-top: 1rem;
    @media (min-width: 767px) and (max-width: 913px) {
      width: 37rem;
    }
    @media (min-width: 992px) and (max-width: 1024px) {
      width: 47rem;
    }
}
.mainbody{
    @media (min-width: 767px) and (max-width: 913px) {
      width: 37rem;
    }
    @media (min-width: 992px) and (max-width: 1024px) {
      width: 47rem;
    }
}
.form{
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 20px 0 20px 0;
}
.label{
    margin-inline: 1rem;
    font-weight: 500;
    font-size: 1.2rem;
    padding: 1rem;
}
`;
