import React, { useState } from "react";
import styled from "styled-components";
import teeth18 from "../Assest/teeth1.png";
import teeth16 from "../Assest/teeth3.png";
import teeth13 from "../Assest/teeth6.png";
import teeth12 from "../Assest/teeth7.png";
import teeth11 from "../Assest/teeth8.png";
import teeth21 from "../Assest/teeth9.png";
import teeth22 from "../Assest/teeth10.png";
import teeth23 from "../Assest/teeth11.png";
import teeth26 from "../Assest/teeth14.png";
import teeth28 from "../Assest/teeth16.png";
import teeth47 from "../Assest/teeth18.png";
import teeth46 from "../Assest/teeth19.png";
import teeth43 from "../Assest/teeth22.png";
import teeth42 from "../Assest/teeth23.png";
import teeth41 from "../Assest/teeth24.png";
import teeth31 from "../Assest/teeth25.png";
import teeth32 from "../Assest/teeth26.png";
import teeth33 from "../Assest/teeth27.png";
import teeth36 from "../Assest/teeth30.png";
import teeth37 from "../Assest/teeth31.png";    

const PediatricDental = () => {
    const [selectedTeeth, setSelectedTeeth] = useState([]);
    const handlCheckBoxChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
          setSelectedTeeth((prevSelectedTeeth) => [
            ...prevSelectedTeeth,
            Number(value),
          ]);
        } else {
          setSelectedTeeth((prevSelectedTeeth) =>
            prevSelectedTeeth.filter((val) => val !== value)
          );
        }
      };

    const allTeethValues = [
        18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28, 48, 47, 46,
        45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38, 55, 54, 53, 52, 51, 61,
        62, 63, 64, 65, 85, 84, 83, 82, 81, 71, 72, 73, 74, 75,
      ];
  return (
    <>
    <Wrapper>
        <div className="container">
            {/* dental chart 20 teeth start */}
          <div className="row">
            <div className="col-lg-12 col-12">
              <div className="d-flex justify-content-center">
                <div>
                  <img src={teeth18} alt="" className="img-fluid" />
                  <div className="text-center">
                    <input
                      type="checkbox"
                      name=""
                      id="55"
                      value="55"
                      onChange={handlCheckBoxChange}
                    />
                  </div>
                </div>
                <div>
                  <img src={teeth16} alt="" className="img-fluid" />
                  <div className="text-center">
                    <input
                      type="checkbox"
                      name=""
                      id="54"
                      value="54"
                      onChange={handlCheckBoxChange}
                    />
                  </div>
                </div>
                <div>
                  <img src={teeth13} alt="" className="img-fluid" />
                  <div className="text-center">
                    <input
                      type="checkbox"
                      name=""
                      id="53"
                      value="53"
                      onChange={handlCheckBoxChange}
                    />
                  </div>
                </div>
                <div>
                  <img src={teeth12} alt="" className="img-fluid" />
                  <div className="text-center">
                    <input
                      type="checkbox"
                      name=""
                      id="52"
                      value="52"
                      onChange={handlCheckBoxChange}
                    />
                  </div>
                </div>
                <div>
                  <img src={teeth11} alt="" className="img-fluid" />
                  <div className="text-center">
                    <input
                      type="checkbox"
                      name=""
                      id="51"
                      value="51"
                      onChange={handlCheckBoxChange}
                    />
                  </div>
                </div>
                <div>
                  <img src={teeth21} alt="" className="img-fluid" />
                  <div className="text-center">
                    <input
                      type="checkbox"
                      name=""
                      id="61"
                      value="61"
                      onChange={handlCheckBoxChange}
                    />
                  </div>
                </div>
                <div>
                  <img src={teeth22} alt="" className="img-fluid" />
                  <div className="text-center">
                    <input
                      type="checkbox"
                      name=""
                      id="62"
                      value="62"
                      onChange={handlCheckBoxChange}
                    />
                  </div>
                </div>
                <div>
                  <img src={teeth23} alt="" className="img-fluid" />
                  <div className="text-center">
                    <input
                      type="checkbox"
                      name=""
                      id="63"
                      value="63"
                      onChange={handlCheckBoxChange}
                    />
                  </div>
                </div>
                <div>
                  <img src={teeth26} alt="" className="img-fluid" />
                  <div className="text-center">
                    <input
                      type="checkbox"
                      name=""
                      id="64"
                      value="26"
                      onChange={handlCheckBoxChange}
                    />
                  </div>
                </div>
                <div>
                  <img src={teeth28} alt="" className="img-fluid" />
                  <div className="text-center">
                    <input
                      type="checkbox"
                      name=""
                      id="65"
                      value="65"
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
                  <img src={teeth47} alt="" className="img-fluid" />
                  <div className="text-center">
                    <input
                      type="checkbox"
                      name=""
                      id="85"
                      value="85"
                      onChange={handlCheckBoxChange}
                    />
                  </div>
                </div>
                <div>
                  <img src={teeth46} alt="" className="img-fluid" />
                  <div className="text-center">
                    <input
                      type="checkbox"
                      name=""
                      id="84"
                      value="84"
                      onChange={handlCheckBoxChange}
                    />
                  </div>
                </div>
                <div>
                  <img src={teeth43} alt="" className="img-fluid" />
                  <div className="text-center">
                    <input
                      type="checkbox"
                      name=""
                      id="83"
                      value="83"
                      onChange={handlCheckBoxChange}
                    />
                  </div>
                </div>
                <div>
                  <img src={teeth42} alt="" className="img-fluid" />
                  <div className="text-center">
                    <input
                      type="checkbox"
                      name=""
                      id="82"
                      value="82"
                      onChange={handlCheckBoxChange}
                    />
                  </div>
                </div>
                <div>
                  <img src={teeth41} alt="" className="img-fluid" />
                  <div className="text-center">
                    <input
                      type="checkbox"
                      name=""
                      id="81"
                      value="81"
                      onChange={handlCheckBoxChange}
                    />
                  </div>
                </div>
                <div>
                  <img src={teeth31} alt="" className="img-fluid" />
                  <div className="text-center">
                    <input
                      type="checkbox"
                      name=""
                      id="71"
                      value="71"
                      onChange={handlCheckBoxChange}
                    />
                  </div>
                </div>
                <div>
                  <img src={teeth32} alt="" className="img-fluid" />
                  <div className="text-center">
                    <input
                      type="checkbox"
                      name=""
                      id="72"
                      value="72"
                      onChange={handlCheckBoxChange}
                    />
                  </div>
                </div>
                <div>
                  <img src={teeth33} alt="" className="img-fluid" />
                  <div className="text-center">
                    <input
                      type="checkbox"
                      name=""
                      id="73"
                      value="73"
                      onChange={handlCheckBoxChange}
                    />
                  </div>
                </div>
                <div>
                  <img src={teeth36} alt="" className="img-fluid" />
                  <div className="text-center">
                    <input
                      type="checkbox"
                      name=""
                      id="74"
                      value="74"
                      onChange={handlCheckBoxChange}
                    />
                  </div>
                </div>
                <div>
                  <img src={teeth37} alt="" className="img-fluid" />
                  <div className="text-center">
                    <input
                      type="checkbox"
                      name=""
                      id="75"
                      value="75"
                      onChange={handlCheckBoxChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* dental chart 20 teeth end */}
        </div>
    </Wrapper>
    </>
  )
}

export default PediatricDental;
const Wrapper = styled.div``;