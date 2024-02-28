import React, { useState } from "react";
import styled from "styled-components";
import { IoMdArrowDropright } from "react-icons/io";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { GrFormNextLink } from "react-icons/gr";
import { useNavigate } from "react-router-dom";

const Treat = () => {
  const [inputs, setInputs] = useState({
    input1: "",
    input2: "",
    input3: 0,
    input4: "",
    input5: "",
    input6: "",
    input7: "",
  });
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    const filtered = options.filter((option) =>
      option.toLowerCase().startsWith(value.toLowerCase())
    );
    setFilteredOptions(filtered);
    setShowDropdown(!!value); // Show dropdown only if there's a search query
    console.log(inputs);

    let quantity = 0;

    if (name === "input2") {
      const trimmedValues = value.split(",").map((v) => v.trim()); // Split values by comma and trim
      const distinctValues = trimmedValues.filter((v) => v !== ""); // Filter out empty values
      quantity = distinctValues.length; // Count distinct values
    }

    // if (name === "input4") {
    //   const multiplier = parseFloat(value) || 0; // Parse input4 value
    //   const input3Value = parseFloat(inputs.input3) || 0; // Parse input3 value
    //   const result = input3Value * multiplier; // Calculate the result
    //   setInputs((prevInputs) => ({
    //     ...prevInputs,
    //     input4: result.toFixed(2), // Update input4 with the result of multiplication
    //   }));
    // }

    setInputs({ ...inputs, [name]: value, input3: quantity });

    setShowDropdown(!!value); // Show dropdown only if there's a search query

  };

  const handleSelect = (option) => {
    setInputs({ ...inputs, input1: option });
    setFilteredOptions([]);
    setShowDropdown(false); // Hide dropdown after selecting an option
  };

  const options = [
    "Dental Cleanings",
    "Dental Examinations",
    "Dental Sealants",
    "Fluoride Treatments",
    "Crowns (Caps)",
    "Bridges",
    "Dentures (Partial or Full)",
    "Dental Implants",
    "Root Canal Treatment (RCT)",
    "Root Canal Retreatment (Re-Root Canal)",
    "Apicoectomy (Endodontic Surgery)",
    "Scaling and Root Planing (Deep Cleaning)",
    "Periodontal Maintenance",
    "Gum Graft Surgery",
    "Periodontal Flap Surgery",
    "Teeth Whitening (Bleaching)",
    "Dental Bonding",
    "Porcelain Veneers",
    "Inlays and Onlays",
    "Orthodontic Treatments (Braces, Clear Aligners)",
    "Tooth Extractions (Simple and Surgical)",
    "Wisdom Tooth Extraction",
    "Dental Implant Surgery",
    "Jaw Surgery (Orthognathic Surgery)",
    "Complete Dentures",
    "Partial Dentures",
    "Dental Bridges",
    "Dental Implant Restorations",
    "Dental Sealants",
    "Fluoride Treatments",
    "Pediatric Dental Cleanings",
    "Dental Fillings for Children",
    "Traditional Braces",
    "Clear Aligners (Invisalign, ClearCorrect)",
    "Retainers",
    "Orthodontic Appliances",
    "Treatment for Dental Trauma",
    "Emergency Tooth Extractions",
    "Pain Management",
    "Temporary Dental Repairs",
  ];

  return (
    <>
      <Wrapper>
        <div className="container">
          <div className="row">
            <div className="d-flex justify-content-center align-items-center">
              <p className="fs-1 shadow-none p-2 mb-4 bg-light rounded">Treatment Procedure</p>
            </div>
          </div>
          <div className="row shadow-sm p-3 mb-4 bg-body rounded ProfileDetails">
            <div className="col-lg-12 d-flex justify-content-between align-items-center ProfileDetailsMain">
              <div className="col-lg-4 col-md-4 col-sm-4">
                <p>
                  <strong className="bold">UHID</strong> : Patient UHID
                </p>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-4">
                <p>
                  <strong className="bold">Patient Name</strong> : Patient
                  Complete Name
                </p>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-4">
                <p>
                  <strong className="bold">Patient Mobile No.</strong> :
                  1234567890
                </p>
              </div>
            </div>
            <div className="col-lg-12 d-flex justify-content-between align-items-center">
              <div className="col-lg-4 col-md-4 col-sm-4">
                <p className="mb-0">
                  <strong>RGID</strong> : Patient RGID
                </p>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-4">
                <p className="mb-0">
                  <strong>Age</strong> : 25
                </p>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-4">
                <p className="mb-0">
                  <strong>Address</strong> : ABC 195 Address
                </p>
              </div>
            </div>
          </div>
          <div className="row shadow-sm p-4 mb-3 bg-white rounded">
            <form>
              <div className="d-flex justify-content-between align-items-center p-2">
                <div className="row">
                  <div
                    className="col-md-4 w-100"
                    style={{ position: "relative" }}
                  >
                    <input
                      type="search"
                      name="input1"
                      className="shadow-none p-1 bg-light rounded border-0"
                      value={inputs.input1}
                      onChange={handleChange}
                      placeholder="Dental Treatments"
                    />
                    {showDropdown && (
                      <ul className="list-group">
                        {filteredOptions.map((option, index) => (
                          <li
                            key={index}
                            className="list-group-item"
                            onClick={() => handleSelect(option)}
                          >
                            {option}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <input
                      type="text"
                      name="input2"
                      className="shadow-none p-1 bg-light rounded border-0"
                      value={inputs.input2}
                      onChange={handleChange}
                      placeholder="Number of Tooth"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <input
                      type="text"
                      name="input3"
                      className="shadow-none p-1 bg-light rounded border-0"
                      value={inputs.input3}
                      onChange={handleChange}
                      readOnly
                      placeholder="Quantity"
                    />
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center p-2">
                <div className="row">
                  <div className="col-md-4">
                    <input
                      type="text"
                      name="input4"
                      className="shadow-none p-1 bg-light rounded border-0"
                      value={inputs.input4}
                      onChange={handleChange}
                      placeholder="Cost Amount"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <input
                      type="text"
                      name="input5"
                      className="shadow-none p-1 bg-light rounded border-0"
                      value={inputs.input5}
                      onChange={handleChange}
                      placeholder="Discount Amount"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <input
                      type="text"
                      name="input6"
                      className="shadow-none p-1 bg-light rounded border-0"
                      value={inputs.input6}
                      onChange={handleChange}
                      placeholder="Total Amount"
                    />
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-evenly align-items-center p-2">
                <div className="row">
                  <div className="col-md-8">
                    <textarea
                      type="text"
                      name="input7"
                      className="shadow-none p-1 bg-light rounded border-0"
                      value={inputs.input7}
                      onChange={handleChange}
                      placeholder="Add some more details"
                    />
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-center align-items-center">
                <button className="btn btn-info text-light">
                  Continue <IoMdArrowDropright size={25} />
                </button>
              </div>
            </form>
          </div>
          <div className="row">
            <div className="shadow-sm p-4 bg-white rounded">
              <table class="table">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Note</th>
                    <th scope="col">Qty</th>
                    <th scope="col">Cost</th>
                    <th scope="col">Discount</th>
                    <th scope="col">Total</th>
                    <th scope="col">Action</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody class="table-group-divider table-divider-color">
                  <tr>
                    <th>RCT</th>
                    <td>Note</td>
                    <td>10</td>
                    <td>2000</td>
                    <td>100</td>
                    <td>1900</td>
                    <td colspan="2">
                      <button className="btn btn-primary"><CiEdit size={25}/></button>
                      &nbsp;
                      <button className="btn btn-danger mx-1"><MdDeleteOutline size={25}/></button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="d-flex justify-content-center align-items-center">
                <button className="btn btn-info text-light" onClick={()=>navigate("/TPrescriptionDash")}>
                  Next <GrFormNextLink size={25}/>
                </button>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default Treat;
const Wrapper = styled.div`
  .list-group {
    position: absolute;
    z-index: 10;
    height: 200px;
    width: 180px;
    overflow-y: auto;
  }
  input {
    width: 22rem;
    @media (min-width: 280px) and (max-width: 460px) {
      width: 5rem;
    }
    @media (min-width: 461px) and (max-width: 820px) {
      width: 13rem;
    }
    @media (min-width: 821px) and (max-width: 1024px) {
      width: 17rem;
    }
  }
  textarea {
    width: 52rem;
    @media (min-width: 280px) and (max-width: 460px) {
      width: 13rem;
    }
    @media (min-width: 461px) and (max-width: 1024px) {
      width: 25rem;
    }
  }
  .ProfileDetailsMain,
  p {
    @media (min-width: 280px) and (max-width: 460px) {
      font-size: 8px;
    }
  }
`;
