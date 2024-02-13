import React, { useState } from "react";
import styled from "styled-components";
import teeth18 from "../Assest/teeth1.png";

const ExaminationPatient = () => {
  const [selectedTeeth, setSelectedTeeth] = useState([]);
  const [selectAllTeeth, setSelectAllTeeth] = useState(0);

  const handlCheckBoxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedTeeth((prevSelectedTeeth) => [...prevSelectedTeeth, value]);
    } else {
      setSelectedTeeth((prevSelectedTeeth) =>
        prevSelectedTeeth.filter((val) => val !== value)
      );
    }
  };

//   const handleClick = () => {
//     const allTeethValues = [
//       "18", "17", "16", "15", "14", "13", "12", "11",
//       "21", "22", "23", "24", "25", "26", "27", "28",
//       "48", "47", "46", "45", "44", "43", "42", "41",
//       "31", "32", "33", "34", "35", "36", "37", "38"
//     ];
//     document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
//         checkbox.checked = true;
//       });
//     setSelectedTeeth((prevSelectTeeth) =>
//       prevSelectTeeth.length === allTeethValues.length ? [] : allTeethValues
//     );
//     setSelectAllTeeth((prevCount) => prevCount + 1);
//   };

//   const handleDoubleClick = () => {
//     document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
//         checkbox.checked = false;
//       });
//     setSelectAllTeeth(0);
//     setSelectedTeeth([]);
//   };

const handleClick = () => {
    const allTeethValues = [
      "18", "17", "16", "15", "14", "13", "12", "11",
      "21", "22", "23", "24", "25", "26", "27", "28",
      "48", "47", "46", "45", "44", "43", "42", "41",
      "31", "32", "33", "34", "35", "36", "37", "38"
    ];
  
    document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
      checkbox.checked = true;
    });
  
    setSelectedTeeth(allTeethValues);
    setSelectAllTeeth((prevCount) => prevCount + 1);
  };
  
  const handleDoubleClick = () => {
    document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
      checkbox.checked = false;
    });
  
    setSelectAllTeeth(0);
    setSelectedTeeth([]);
  };
  

  return (
    <>
      <Wrapper>
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-12">
              <div className="d-flex justify-content-center">
                <div>
                  <img src={teeth18} alt="" className="img-fluid" />
                  <div className="text-center">
                    <input
                      type="checkbox"
                      name=""
                      id="18"
                      value="18"
                      onChange={handlCheckBoxChange}
                    />
                  </div>
                </div>
                <div>
                  <img src={teeth18} alt="" className="img-fluid" />
                  <div className="text-center">
                  <input
                    type="checkbox"
                    name=""
                    id="17"
                    value="17"
                    onChange={handlCheckBoxChange}
                  />
                  </div>
                </div>
                <div>
                  <img src={teeth18} alt="" className="img-fluid" />
                  <div className="text-center">
                    <input
                      type="checkbox"
                      name=""
                      id="16"
                      value="16"
                      onChange={handlCheckBoxChange}
                    />
                  </div>
                </div>
                <div>
                  <img src={teeth18} alt="" className="img-fluid" />
                  <div className="text-center">
                  <input
                    type="checkbox"
                    name=""
                    id="15"
                    value="15"
                    onChange={handlCheckBoxChange}
                  />
                  </div>
                </div>
                <div>
                  <img src={teeth18} alt="" className="img-fluid" />
                  <div className="text-center">
                    <input
                      type="checkbox"
                      name=""
                      id="14"
                      value="14"
                      onChange={handlCheckBoxChange}
                    />
                  </div>
                </div>
                <div>
                  <img src={teeth18} alt="" className="img-fluid" />
                  <div className="text-center">
                  <input
                    type="checkbox"
                    name=""
                    id="13"
                    value="13"
                    onChange={handlCheckBoxChange}
                  />
                  </div>
                </div>
                <div>
                  <img src={teeth18} alt="" className="img-fluid" />
                  <div className="text-center">
                    <input
                      type="checkbox"
                      name=""
                      id="12"
                      value="12"
                      onChange={handlCheckBoxChange}
                    />
                  </div>
                </div>
                <div>
                  <img src={teeth18} alt="" className="img-fluid" />
                  <div className="text-center">
                  <input
                    type="checkbox"
                    name=""
                    id="11"
                    value="11"
                    onChange={handlCheckBoxChange}
                  />
                  </div>
                </div>
                <div>
                  <img src={teeth18} alt="" className="img-fluid" />
                  <div className="text-center">
                    <input
                      type="checkbox"
                      name=""
                      id="21"
                      value="21"
                      onChange={handlCheckBoxChange}
                    />
                  </div>
                </div>
                <div>
                  <img src={teeth18} alt="" className="img-fluid" />
                  <div className="text-center">
                  <input
                    type="checkbox"
                    name=""
                    id="22"
                    value="22"
                    onChange={handlCheckBoxChange}
                  />
                  </div>
                </div>
                <div>
                  <img src={teeth18} alt="" className="img-fluid" />
                  <div className="text-center">
                    <input
                      type="checkbox"
                      name=""
                      id="23"
                      value="23"
                      onChange={handlCheckBoxChange}
                    />
                  </div>
                </div>
                <div>
                  <img src={teeth18} alt="" className="img-fluid" />
                  <div className="text-center">
                  <input
                    type="checkbox"
                    name=""
                    id="24"
                    value="24"
                    onChange={handlCheckBoxChange}
                  />
                  </div>
                </div>
                <div>
                  <img src={teeth18} alt="" className="img-fluid" />
                  <div className="text-center">
                    <input
                      type="checkbox"
                      name=""
                      id="25"
                      value="25"
                      onChange={handlCheckBoxChange}
                    />
                  </div>
                </div>
                <div>
                  <img src={teeth18} alt="" className="img-fluid" />
                  <div className="text-center">
                  <input
                    type="checkbox"
                    name=""
                    id="26"
                    value="26"
                    onChange={handlCheckBoxChange}
                  />
                  </div>
                </div>
                <div>
                  <img src={teeth18} alt="" className="img-fluid" />
                  <div className="text-center">
                    <input
                      type="checkbox"
                      name=""
                      id="27"
                      value="27"
                      onChange={handlCheckBoxChange}
                    />
                  </div>
                </div>
                <div>
                  <img src={teeth18} alt="" className="img-fluid" />
                  <div className="text-center">
                  <input
                    type="checkbox"
                    name=""
                    id="28"
                    value="28"
                    onChange={handlCheckBoxChange}
                  />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 col-12">
            <div className="d-flex justify-content-center">
                <div>
                  <img src={teeth18} alt="" className="img-fluid" />
                  <div className="text-center">
                    <input
                      type="checkbox"
                      name=""
                      id="48"
                      value="48"
                      onChange={handlCheckBoxChange}
                    />
                  </div>
                </div>
                <div>
                  <img src={teeth18} alt="" className="img-fluid" />
                  <div className="text-center">
                  <input
                    type="checkbox"
                    name=""
                    id="47"
                    value="47"
                    onChange={handlCheckBoxChange}
                  />
                  </div>
                </div>
                <div>
                  <img src={teeth18} alt="" className="img-fluid" />
                  <div className="text-center">
                    <input
                      type="checkbox"
                      name=""
                      id="46"
                      value="46"
                      onChange={handlCheckBoxChange}
                    />
                  </div>
                </div>
                <div>
                  <img src={teeth18} alt="" className="img-fluid" />
                  <div className="text-center">
                  <input
                    type="checkbox"
                    name=""
                    id="45"
                    value="45"
                    onChange={handlCheckBoxChange}
                  />
                  </div>
                </div>
                <div>
                  <img src={teeth18} alt="" className="img-fluid" />
                  <div className="text-center">
                    <input
                      type="checkbox"
                      name=""
                      id="44"
                      value="44"
                      onChange={handlCheckBoxChange}
                    />
                  </div>
                </div>
                <div>
                  <img src={teeth18} alt="" className="img-fluid" />
                  <div className="text-center">
                  <input
                    type="checkbox"
                    name=""
                    id="43"
                    value="43"
                    onChange={handlCheckBoxChange}
                  />
                  </div>
                </div>
                <div>
                  <img src={teeth18} alt="" className="img-fluid" />
                  <div className="text-center">
                    <input
                      type="checkbox"
                      name=""
                      id="42"
                      value="42"
                      onChange={handlCheckBoxChange}
                    />
                  </div>
                </div>
                <div>
                  <img src={teeth18} alt="" className="img-fluid" />
                  <div className="text-center">
                  <input
                    type="checkbox"
                    name=""
                    id="41"
                    value="41"
                    onChange={handlCheckBoxChange}
                  />
                  </div>
                </div>
                <div>
                  <img src={teeth18} alt="" className="img-fluid" />
                  <div className="text-center">
                    <input
                      type="checkbox"
                      name=""
                      id="31"
                      value="31"
                      onChange={handlCheckBoxChange}
                    />
                  </div>
                </div>
                <div>
                  <img src={teeth18} alt="" className="img-fluid" />
                  <div className="text-center">
                  <input
                    type="checkbox"
                    name=""
                    id="32"
                    value="32"
                    onChange={handlCheckBoxChange}
                  />
                  </div>
                </div>
                <div>
                  <img src={teeth18} alt="" className="img-fluid" />
                  <div className="text-center">
                    <input
                      type="checkbox"
                      name=""
                      id="33"
                      value="33"
                      onChange={handlCheckBoxChange}
                    />
                  </div>
                </div>
                <div>
                  <img src={teeth18} alt="" className="img-fluid" />
                  <div className="text-center">
                  <input
                    type="checkbox"
                    name=""
                    id="34"
                    value="34"
                    onChange={handlCheckBoxChange}
                  />
                  </div>
                </div>
                <div>
                  <img src={teeth18} alt="" className="img-fluid" />
                  <div className="text-center">
                    <input
                      type="checkbox"
                      name=""
                      id="35"
                      value="35"
                      onChange={handlCheckBoxChange}
                    />
                  </div>
                </div>
                <div>
                  <img src={teeth18} alt="" className="img-fluid" />
                  <div className="text-center">
                  <input
                    type="checkbox"
                    name=""
                    id="36"
                    value="36"
                    onChange={handlCheckBoxChange}
                  />
                  </div>
                </div>
                <div>
                  <img src={teeth18} alt="" className="img-fluid" />
                  <div className="text-center">
                    <input
                      type="checkbox"
                      name=""
                      id="37"
                      value="37"
                      onChange={handlCheckBoxChange}
                    />
                  </div>
                </div>
                <div>
                  <img src={teeth18} alt="" className="img-fluid" />
                  <div className="text-center">
                  <input
                    type="checkbox"
                    name=""
                    id="38"
                    value="38"
                    onChange={handlCheckBoxChange}
                  />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 col-12">
            <div>
                <input type="text" readOnly value={selectedTeeth.join(", ")} className="w-75" />
                <button onClick={handleClick} onDoubleClick={handleDoubleClick}>{selectAllTeeth % 2 === 0 ? "Select All" : "Unselect All"}</button>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default ExaminationPatient;
const Wrapper = styled.div``;
