import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { RiLoader2Fill } from "react-icons/ri";
import { useDispatch, useSelector } from 'react-redux';
import { toggleTableRefresh } from '../../../redux/user/userSlice'; 
import { GiFastBackwardButton } from "react-icons/gi";
import cogoToast from "cogo-toast";
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
import cariesT1 from "../Assest/caries/teeth1.png";
import cariesT2 from "../Assest/caries/teeth3.png";
import cariesT3 from "../Assest/caries/teeth6.png";
import cariesT4 from "../Assest/caries/teeth7.png";
import cariesT5 from "../Assest/caries/teeth8.png";
import cariesT6 from "../Assest/caries/teeth9.png";
import cariesT7 from "../Assest/caries/teeth10.png";
import cariesT8 from "../Assest/caries/teeth11.png";
import cariesT9 from "../Assest/caries/teeth14.png";
import cariesT10 from "../Assest/caries/teeth16.png";
import cariesT11 from "../Assest/caries/teeth18.png";
import cariesT12 from "../Assest/caries/teeth19.png";
import cariesT13 from "../Assest/caries/teeth22.png";
import cariesT14 from "../Assest/caries/teeth23.png";
import cariesT15 from "../Assest/caries/teeth24.png";
import cariesT16 from "../Assest/caries/teeth25.png";
import cariesT17 from "../Assest/caries/teeth26.png";
import cariesT18 from "../Assest/caries/teeth27.png";
import cariesT19 from "../Assest/caries/teeth30.png";
import cariesT20 from "../Assest/caries/teeth31.png";
import fractureT1 from "../Assest/fracture/teeth1.png";
import fractureT2 from "../Assest/fracture/teeth3.png";
import fractureT3 from "../Assest/fracture/teeth6.png";
import fractureT4 from "../Assest/fracture/teeth7.png";
import fractureT5 from "../Assest/fracture/teeth8.png";
import fractureT6 from "../Assest/fracture/teeth9.png";
import fractureT7 from "../Assest/fracture/teeth10.png";
import fractureT8 from "../Assest/fracture/teeth11.png";
import fractureT9 from "../Assest/fracture/teeth14.png";
import fractureT10 from "../Assest/fracture/teeth16.png";
import fractureT11 from "../Assest/fracture/teeth18.png";
import fractureT12 from "../Assest/fracture/teeth19.png";
import fractureT13 from "../Assest/fracture/teeth22.png";
import fractureT14 from "../Assest/fracture/teeth23.png";
import fractureT15 from "../Assest/fracture/teeth24.png";
import fractureT16 from "../Assest/fracture/teeth25.png";
import fractureT17 from "../Assest/fracture/teeth26.png";
import fractureT18 from "../Assest/fracture/teeth27.png";
import fractureT19 from "../Assest/fracture/teeth30.png";
import fractureT20 from "../Assest/fracture/teeth31.png";
import impactedT1 from "../Assest/Impacted/teeth1.png";
import impactedT2 from "../Assest/Impacted/teeth3.png";
import impactedT3 from "../Assest/Impacted/teeth6.png";
import impactedT4 from "../Assest/Impacted/teeth7.png";
import impactedT5 from "../Assest/Impacted/teeth8.png";
import impactedT6 from "../Assest/Impacted/teeth9.png";
import impactedT7 from "../Assest/Impacted/teeth10.png";
import impactedT8 from "../Assest/Impacted/teeth11.png";
import impactedT9 from "../Assest/Impacted/teeth14.png";
import impactedT10 from "../Assest/Impacted/teeth16.png";
import impactedT11 from "../Assest/Impacted/teeth18.png";
import impactedT12 from "../Assest/Impacted/teeth19.png";
import impactedT13 from "../Assest/Impacted/teeth22.png";
import impactedT14 from "../Assest/Impacted/teeth23.png";
import impactedT15 from "../Assest/Impacted/teeth24.png";
import impactedT16 from "../Assest/Impacted/teeth25.png";
import impactedT17 from "../Assest/Impacted/teeth26.png";
import impactedT18 from "../Assest/Impacted/teeth27.png";
import impactedT19 from "../Assest/Impacted/teeth30.png";
import impactedT20 from "../Assest/Impacted/teeth31.png";
import missingT1 from "../Assest/Missing Tooth/teeth1.png";
import missingT2 from "../Assest/Missing Tooth/teeth3.png";
import missingT3 from "../Assest/Missing Tooth/teeth6.png";
import missingT4 from "../Assest/Missing Tooth/teeth7.png";
import missingT5 from "../Assest/Missing Tooth/teeth8.png";
import missingT6 from "../Assest/Missing Tooth/teeth9.png";
import missingT7 from "../Assest/Missing Tooth/teeth10.png";
import missingT8 from "../Assest/Missing Tooth/teeth11.png";
import missingT9 from "../Assest/Missing Tooth/teeth14.png";
import missingT10 from "../Assest/Missing Tooth/teeth16.png";
import missingT11 from "../Assest/Missing Tooth/teeth18.png";
import missingT12 from "../Assest/Missing Tooth/teeth19.png";
import missingT13 from "../Assest/Missing Tooth/teeth22.png";
import missingT14 from "../Assest/Missing Tooth/teeth23.png";
import missingT15 from "../Assest/Missing Tooth/teeth24.png";
import missingT16 from "../Assest/Missing Tooth/teeth25.png";
import missingT17 from "../Assest/Missing Tooth/teeth26.png";
import missingT18 from "../Assest/Missing Tooth/teeth27.png";
import missingT19 from "../Assest/Missing Tooth/teeth30.png";
import missingT20 from "../Assest/Missing Tooth/teeth31.png";
import mobilityT1 from "../Assest/mobility/teeth1.png";
import mobilityT2 from "../Assest/mobility/teeth3.png";
import mobilityT3 from "../Assest/mobility/teeth6.png";
import mobilityT4 from "../Assest/mobility/teeth7.png";
import mobilityT5 from "../Assest/mobility/teeth8.png";
import mobilityT6 from "../Assest/mobility/teeth9.png";
import mobilityT7 from "../Assest/mobility/teeth10.png";
import mobilityT8 from "../Assest/mobility/teeth11.png";
import mobilityT9 from "../Assest/mobility/teeth14.png";
import mobilityT10 from "../Assest/mobility/teeth16.png";
import mobilityT11 from "../Assest/mobility/teeth18.png";
import mobilityT12 from "../Assest/mobility/teeth19.png";
import mobilityT13 from "../Assest/mobility/teeth22.png";
import mobilityT14 from "../Assest/mobility/teeth23.png";
import mobilityT15 from "../Assest/mobility/teeth24.png";
import mobilityT16 from "../Assest/mobility/teeth25.png";
import mobilityT17 from "../Assest/mobility/teeth26.png";
import mobilityT18 from "../Assest/mobility/teeth27.png";
import mobilityT19 from "../Assest/mobility/teeth30.png";
import mobilityT20 from "../Assest/mobility/teeth31.png";
import periapicalT1 from "../Assest/Periapical Abscess/teeth1.png";
import periapicalT2 from "../Assest/Periapical Abscess/teeth3.png";
import periapicalT3 from "../Assest/Periapical Abscess/teeth6.png";
import periapicalT4 from "../Assest/Periapical Abscess/teeth7.png";
import periapicalT5 from "../Assest/Periapical Abscess/teeth8.png";
import periapicalT6 from "../Assest/Periapical Abscess/teeth9.png";
import periapicalT7 from "../Assest/Periapical Abscess/teeth10.png";
import periapicalT8 from "../Assest/Periapical Abscess/teeth11.png";
import periapicalT9 from "../Assest/Periapical Abscess/teeth14.png";
import periapicalT10 from "../Assest/Periapical Abscess/teeth16.png";
import periapicalT11 from "../Assest/Periapical Abscess/teeth18.png";
import periapicalT12 from "../Assest/Periapical Abscess/teeth19.png";
import periapicalT13 from "../Assest/Periapical Abscess/teeth22.png";
import periapicalT14 from "../Assest/Periapical Abscess/teeth23.png";
import periapicalT15 from "../Assest/Periapical Abscess/teeth24.png";
import periapicalT16 from "../Assest/Periapical Abscess/teeth25.png";
import periapicalT17 from "../Assest/Periapical Abscess/teeth26.png";
import periapicalT18 from "../Assest/Periapical Abscess/teeth27.png";
import periapicalT19 from "../Assest/Periapical Abscess/teeth30.png";
import periapicalT20 from "../Assest/Periapical Abscess/teeth31.png";
import rootT1 from "../Assest/Root Stump/teeth1.png";
import rootT2 from "../Assest/Root Stump/teeth3.png";
import rootT3 from "../Assest/Root Stump/teeth6.png";
import rootT4 from "../Assest/Root Stump/teeth7.png";
import rootT5 from "../Assest/Root Stump/teeth8.png";
import rootT6 from "../Assest/Root Stump/teeth9.png";
import rootT7 from "../Assest/Root Stump/teeth10.png";
import rootT8 from "../Assest/Root Stump/teeth11.png";
import rootT9 from "../Assest/Root Stump/teeth14.png";
import rootT10 from "../Assest/Root Stump/teeth16.png";
import rootT11 from "../Assest/Root Stump/teeth18.png";
import rootT12 from "../Assest/Root Stump/teeth19.png";
import rootT13 from "../Assest/Root Stump/teeth22.png";
import rootT14 from "../Assest/Root Stump/teeth23.png";
import rootT15 from "../Assest/Root Stump/teeth24.png";
import rootT16 from "../Assest/Root Stump/teeth25.png";
import rootT17 from "../Assest/Root Stump/teeth26.png";
import rootT18 from "../Assest/Root Stump/teeth27.png";
import rootT19 from "../Assest/Root Stump/teeth30.png";
import rootT20 from "../Assest/Root Stump/teeth31.png";
import suparaT1 from "../Assest/Supara Erupted/teeth1.png";
import suparaT2 from "../Assest/Supara Erupted/teeth3.png";
import suparaT3 from "../Assest/Supara Erupted/teeth6.png";
import suparaT4 from "../Assest/Supara Erupted/teeth7.png";
import suparaT5 from "../Assest/Supara Erupted/teeth8.png";
import suparaT6 from "../Assest/Supara Erupted/teeth9.png";
import suparaT7 from "../Assest/Supara Erupted/teeth10.png";
import suparaT8 from "../Assest/Supara Erupted/teeth11.png";
import suparaT9 from "../Assest/Supara Erupted/teeth14.png";
import suparaT10 from "../Assest/Supara Erupted/teeth16.png";
import suparaT11 from "../Assest/Supara Erupted/teeth18.png";
import suparaT12 from "../Assest/Supara Erupted/teeth19.png";
import suparaT13 from "../Assest/Supara Erupted/teeth22.png";
import suparaT14 from "../Assest/Supara Erupted/teeth23.png";
import suparaT15 from "../Assest/Supara Erupted/teeth24.png";
import suparaT16 from "../Assest/Supara Erupted/teeth25.png";
import suparaT17 from "../Assest/Supara Erupted/teeth26.png";
import suparaT18 from "../Assest/Supara Erupted/teeth27.png";
import suparaT19 from "../Assest/Supara Erupted/teeth30.png";
import suparaT20 from "../Assest/Supara Erupted/teeth31.png";
import cariesbtn from "../Assest/Examination Buttons/caries.png";
import fracturebtn from "../Assest/Examination Buttons/fracture.png";
import impactedbtn from "../Assest/Examination Buttons/impacted.png";
import missingbtn from "../Assest/Examination Buttons/missing tooth.png";
import mobilitybtn from "../Assest/Examination Buttons/mobility.png";
import periapicalbtn from "../Assest/Examination Buttons/periapical.png";
import rootbtn from "../Assest/Examination Buttons/rootstump1.png";
import suparabtn from "../Assest/Examination Buttons/Supra erupted1.png";
import SaveData from "./SaveExaminationData/SaveData";

const PediatricDentalTest = () => {
  const { id } = useParams();
  console.log(id);
  const [selectedTeeth, setSelectedTeeth] = useState([]);
  // const [inputItemList, setInputItemList] = useState([]); 
  const [inputItem, setInputItem] = useState({
    appointment_id: id,
    patient_uhid: null,
    selectTeeth: [],
    desease: "",
    chiefComplain: "",
    advice: "",
    onExamination: "",
  });
  const [selectAllTeeth, setSelectAllTeeth] = useState(false); 
  const [isFormFilled, setIsFormFilled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [getPatientData, setGetPatientData] = useState([]);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const branch = user.currentUser.branch_name;
    console.log(branch);
  const navigate = useNavigate();

  useEffect(() => {

    const timeout = setTimeout(() => {
      setIsLoading(false)
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  const handlCheckBoxChange = (e) => {
    const { value, checked } = e.target;
    const toothNumber = Number(value);

    setSelectedTeeth((prevSelectedTeeth) =>
      checked
        ? [...prevSelectedTeeth, toothNumber]
        : prevSelectedTeeth.filter((val) => val !== toothNumber)
    );

    setInputItem((prevInputItem) => ({
      ...prevInputItem,
      selectTeeth: checked
        ? [...prevInputItem.selectTeeth, toothNumber]
        : prevInputItem.selectTeeth.filter((val) => val !== toothNumber),
    }));
  };

  const allTeethValues = [
    55, 54, 53, 52, 51, 61, 62, 63, 64, 65, 85, 84, 83, 82, 81, 71, 72, 73, 74,
    75,
  ];

  console.log(inputItem);

  //   console.log(selectedTeeth);

  const handleClick = () => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const newState = !selectAllTeeth;

    checkboxes.forEach((checkbox) => {
      checkbox.checked = newState;
    });

    setSelectedTeeth(newState ? allTeethValues : []);
    setSelectAllTeeth(newState);
  };

  // caries start here

  const toothImageMapping = {
    55: cariesT1,
    54: cariesT2,
    53: cariesT3,
    52: cariesT4,
    51: cariesT5,
    61: cariesT6,
    62: cariesT7,
    63: cariesT8,
    64: cariesT9,
    65: cariesT10,
    85: cariesT11,
    84: cariesT12,
    83: cariesT13,
    82: cariesT14,
    81: cariesT15,
    71: cariesT16,
    72: cariesT17,
    73: cariesT18,
    74: cariesT19,
    75: cariesT20,
  };

  const caries = () => {
    let updatedDisease;
    if (inputItem.desease && inputItem.desease.includes("Caries")) {
      updatedDisease = inputItem.desease
        .replace(", Caries", "")
        .replace("Caries", "");
    } else {
      updatedDisease = inputItem.desease
        ? inputItem.desease + ", Caries"
        : "Caries";
    }

    const newInputItem = {
      ...inputItem,
      desease: updatedDisease,
    };
    setInputItem(newInputItem);

    // Additional logic here if needed
    inputItem.selectTeeth.forEach((toothId) => {
      const toothElement = document.getElementById(`tooth_${toothId}`);
      if (toothElement && toothImageMapping[toothId]) {
        toothElement.src = toothImageMapping[toothId];
      }
    });
  };

  // caries end here

  // fracture start here

  const toothfractureImageMapping = {
    55: fractureT1,
    54: fractureT2,
    53: fractureT3,
    52: fractureT4,
    51: fractureT5,
    61: fractureT6,
    62: fractureT7,
    63: fractureT8,
    64: fractureT9,
    65: fractureT10,
    85: fractureT11,
    84: fractureT12,
    83: fractureT13,
    82: fractureT14,
    81: fractureT15,
    71: fractureT16,
    72: fractureT17,
    73: fractureT18,
    74: fractureT19,
    75: fractureT20,
  };

  const fracture = () => {
    let updatedDisease;
    if (inputItem.desease && inputItem.desease.includes("Fracture")) {
      updatedDisease = inputItem.desease
        .replace(", Fracture", "")
        .replace("Fracture", "");
    } else {
      updatedDisease = inputItem.desease
        ? inputItem.desease + ", Fracture"
        : "Fracture";
    }
    const newInputItem = {
      ...inputItem,
      desease: updatedDisease,
    };
    setInputItem(newInputItem);

    // Additional logic here if needed
    inputItem.selectTeeth.forEach((toothId) => {
      const toothElement = document.getElementById(`tooth_${toothId}`);
      if (toothElement && toothfractureImageMapping[toothId]) {
        toothElement.src = toothfractureImageMapping[toothId];
      }
    });
  };

  // fracture end here

  // impacted start here
  const toothimpactedImageMapping = {
    55: impactedT1,
    54: impactedT2,
    53: impactedT3,
    52: impactedT4,
    51: impactedT5,
    61: impactedT6,
    62: impactedT7,
    63: impactedT8,
    64: impactedT9,
    65: impactedT10,
    85: impactedT11,
    84: impactedT12,
    83: impactedT13,
    82: impactedT14,
    81: impactedT15,
    71: impactedT16,
    72: impactedT17,
    73: impactedT18,
    74: impactedT19,
    75: impactedT20,
  };

  const impacted = () => {
    let updatedDisease;
    if (inputItem.desease && inputItem.desease.includes("Impacted")) {
      updatedDisease = inputItem.desease
        .replace(", Impacted", "")
        .replace("Impacted", "");
    } else {
      updatedDisease = inputItem.desease
        ? inputItem.desease + ", Impacted"
        : "Impacted";
    }
    const newInputItem = {
      ...inputItem,
      desease: updatedDisease,
    };
    setInputItem(newInputItem);

    // Additional logic here if needed
    inputItem.selectTeeth.forEach((toothId) => {
      const toothElement = document.getElementById(`tooth_${toothId}`);
      if (toothElement && toothimpactedImageMapping[toothId]) {
        toothElement.src = toothimpactedImageMapping[toothId];
      }
    });
  };

  // impacted end here

  // missing start here

  const toothmissingImageMapping = {
    55: missingT1,
    54: missingT2,
    53: missingT3,
    52: missingT4,
    51: missingT5,
    61: missingT6,
    62: missingT7,
    63: missingT8,
    64: missingT9,
    65: missingT10,
    85: missingT11,
    84: missingT12,
    83: missingT13,
    82: missingT14,
    81: missingT15,
    71: missingT16,
    72: missingT17,
    73: missingT18,
    74: missingT19,
    75: missingT20,
  };

  const missing = () => {
    let updatedDisease;
    if (inputItem.desease && inputItem.desease.includes("Missing Tooth")) {
      updatedDisease = inputItem.desease
        .replace(", Missing Tooth", "")
        .replace("Missing Tooth", "");
    } else {
      updatedDisease = inputItem.desease
        ? inputItem.desease + ", Missing Tooth"
        : "Missing Tooth";
    }
    const newInputItem = {
      ...inputItem,
      desease: updatedDisease,
    };
    setInputItem(newInputItem);

    // Additional logic here if needed
    inputItem.selectTeeth.forEach((toothId) => {
      const toothElement = document.getElementById(`tooth_${toothId}`);
      if (toothElement && toothmissingImageMapping[toothId]) {
        toothElement.src = toothmissingImageMapping[toothId];
      }
    });
  };

  // missing end here

  // mobility start here

  const toothmobilityImageMapping = {
    55: mobilityT1,
    54: mobilityT2,
    53: mobilityT3,
    52: mobilityT4,
    51: mobilityT5,
    61: mobilityT6,
    62: mobilityT7,
    63: mobilityT8,
    64: mobilityT9,
    65: mobilityT10,
    85: mobilityT11,
    84: mobilityT12,
    83: mobilityT13,
    82: mobilityT14,
    81: mobilityT15,
    71: mobilityT16,
    72: mobilityT17,
    73: mobilityT18,
    74: mobilityT19,
    75: mobilityT20,
  };

  const mobility = () => {
    let updatedDisease;
    if (inputItem.desease && inputItem.desease.includes("Mobility")) {
      updatedDisease = inputItem.desease
        .replace(", Mobility", "")
        .replace("Mobility", "");
    } else {
      updatedDisease = inputItem.desease
        ? inputItem.desease + ", Mobility"
        : "Mobility";
    }
    const newInputItem = {
      ...inputItem,
      desease: updatedDisease,
    };
    setInputItem(newInputItem);

    // Additional logic here if needed
    inputItem.selectTeeth.forEach((toothId) => {
      const toothElement = document.getElementById(`tooth_${toothId}`);
      if (toothElement && toothmobilityImageMapping[toothId]) {
        toothElement.src = toothmobilityImageMapping[toothId];
      }
    });
  };

  // mobility end here

  // periapical start here

  const toothperiapicalImageMapping = {
    55: periapicalT1,
    54: periapicalT2,
    53: periapicalT3,
    52: periapicalT4,
    51: periapicalT5,
    61: periapicalT6,
    62: periapicalT7,
    63: periapicalT8,
    64: periapicalT9,
    65: periapicalT10,
    85: periapicalT11,
    84: periapicalT12,
    83: periapicalT13,
    82: periapicalT14,
    81: periapicalT15,
    71: periapicalT16,
    72: periapicalT17,
    73: periapicalT18,
    74: periapicalT19,
    75: periapicalT20,
  };

  const periapical = () => {
    let updatedDisease;
    if (inputItem.desease && inputItem.desease.includes("Periapical Abscess")) {
      updatedDisease = inputItem.desease
        .replace(", Periapical Abscess", "")
        .replace("Periapical Abscess", "");
    } else {
      updatedDisease = inputItem.desease
        ? inputItem.desease + ", Periapical Abscess"
        : "Periapical Abscess";
    }
    const newInputItem = {
      ...inputItem,
      desease: updatedDisease,
    };
    setInputItem(newInputItem);

    // Additional logic here if needed
    inputItem.selectTeeth.forEach((toothId) => {
      const toothElement = document.getElementById(`tooth_${toothId}`);
      if (toothElement && toothperiapicalImageMapping[toothId]) {
        toothElement.src = toothperiapicalImageMapping[toothId];
      }
    });
  };

  // periapical end here

  // root start here

  const toothrootImageMapping = {
    55: rootT1,
    54: rootT2,
    53: rootT3,
    52: rootT4,
    51: rootT5,
    61: rootT6,
    62: rootT7,
    63: rootT8,
    64: rootT9,
    65: rootT10,
    85: rootT11,
    84: rootT12,
    83: rootT13,
    82: rootT14,
    81: rootT15,
    71: rootT16,
    72: rootT17,
    73: rootT18,
    74: rootT19,
    75: rootT20,
    // Add more mappings as needed
  };

  const root = () => {
    let updatedDisease;
    if (inputItem.desease && inputItem.desease.includes("Root Stump")) {
      updatedDisease = inputItem.desease
        .replace(", Root Stump", "")
        .replace("Root Stump", "");
    } else {
      updatedDisease = inputItem.desease
        ? inputItem.desease + ", Root Stump"
        : "Root Stump";
    }
    const newInputItem = {
      ...inputItem,
      desease: updatedDisease,
    };
    setInputItem(newInputItem);

    // Additional logic here if needed
    inputItem.selectTeeth.forEach((toothId) => {
      const toothElement = document.getElementById(`tooth_${toothId}`);
      if (toothElement && toothrootImageMapping[toothId]) {
        toothElement.src = toothrootImageMapping[toothId];
      }
    });
  };

  // root end here

  // supara start here

  const toothsuparaImageMapping = {
    55: suparaT1,
    54: suparaT2,
    53: suparaT3,
    52: suparaT4,
    51: suparaT5,
    61: suparaT6,
    62: suparaT7,
    63: suparaT8,
    64: suparaT9,
    65: suparaT10,
    85: suparaT11,
    84: suparaT12,
    83: suparaT13,
    82: suparaT14,
    81: suparaT15,
    71: suparaT16,
    72: suparaT17,
    73: suparaT18,
    74: suparaT19,
    75: suparaT20,
  };

  const supara = () => {
    let updatedDisease;
    if (inputItem.desease && inputItem.desease.includes("Supra Erupted")) {
      updatedDisease = inputItem.desease
        .replace(", Supra Erupted", "")
        .replace("Supra Erupted", "");
    } else {
      updatedDisease = inputItem.desease
        ? inputItem.desease + ", Supra Erupted"
        : "Supra Erupted";
    }
    const newInputItem = {
      ...inputItem,
      desease: updatedDisease,
    };
    setInputItem(newInputItem);

    // Additional logic here if needed
    inputItem.selectTeeth.forEach((toothId) => {
      const toothElement = document.getElementById(`tooth_${toothId}`);
      if (toothElement && toothsuparaImageMapping[toothId]) {
        toothElement.src = toothsuparaImageMapping[toothId];
      }
    });
  };

  // supara end here

  const handleSelecteditem = (event) => {
    const { name, value } = event.target;
    setInputItem((prevInputItem) => ({
      ...prevInputItem,
      [name]: value,
    }));
    setIsFormFilled(
      !!inputItem.selectTeeth.length ||
      inputItem.desease ||
      inputItem.chiefComplain ||
      inputItem.advice ||
      inputItem.onExamination
    );
  };

  const timelineForExamination = async () => {

    try {
        const response = await axios.post(
            "http://localhost:8888/api/doctor/insertTimelineEvent",
            {
                type: "Examiantion",
                description: "Add Teeth Pediatric DentalX",
                branch: branch,
                patientId: getPatientData.length > 0 ? getPatientData[0].uhid : "",
            }
        );
        console.log(response);
    } catch (error) {
        console.log(error);
    }
};

  const handleSave = async (e) => {
    e.preventDefault();

    // Prepare data to send to the backend
    const formData = {
      appointment_id: id,
      patient_uhid: inputItem.patient_uhid,
      selectedTeeth: inputItem.selectTeeth.join(", "),
      disease: inputItem.desease,
      chiefComplain: inputItem.chiefComplain,
      advice: inputItem.advice,
      onExamination: inputItem.onExamination
    };

    try {
      const response = await axios.post('http://localhost:8888/api/doctor/dentalPediatric', formData);
      console.log(response.data);
      dispatch(toggleTableRefresh());
      timelineForExamination();
      // window.location.reload();
    } catch (error) {
      console.error('Error:', error);
    }

    // Push the current inputItem to inputItemList
    // setInputItemList((prevInputItemList) => [...prevInputItemList, inputItem]);

    // console.log("Before resetting inputItem:", inputItem);

    setInputItem({
      appointment_id: id,
      selectTeeth: [],
      desease: "",
      chiefComplain: "",
      advice: "",
      onExamination: "",
    });

    console.log("After resetting inputItem:", inputItem);

    // Clear the checked property of all checkboxes
    setTimeout(() => {
      const checkboxes = document.querySelectorAll('input[type="checkbox"]');
      checkboxes.forEach((checkbox) => {
        checkbox.checked = false;
      });
    });

    setSelectedTeeth([]);
  };

  useEffect(() => {
    setInputItem((prevState) => ({
      ...prevState,
      selectTeeth: selectedTeeth,
    }));
  }, [selectedTeeth]);
  //   console.log(inputItemList);

  const handleRedirect = (e) => {
    if (isFormFilled) {
      e.preventDefault(); // Prevent the default redirection behavior
      cogoToast.info("You cannot navigate away while the form is filled.");
    } else {
      navigate(`/ExaminationDashBoardPatient/${id}`);
    }
  };

  // const editItem = (index) => {
  //   const selectedItem = inputItemList[index]; // Get the item to edit
  //   setInputItem({
  //     selectTeeth: selectedItem.selectTeeth,
  //     desease: selectedItem.desease,
  //     chiefComplain: selectedItem.chiefComplain,
  //     advice: selectedItem.advice,
  //     onExamination: selectedItem.onExamination,
  //   });
  // };

  // const deleteItem = (index) => {
  //   // Your logic to delete the item at the given index
  //   const newList = [...inputItemList];
  //   newList.splice(index, 1);
  //   setInputItemList(newList);
  // };

  const getPatientDetail = async () => {
    try {
      const res = await axios.get(`http://localhost:8888/api/doctor/getAppointmentsWithPatientDetailsById/${id}`);

      const uhid = res.data.result.length > 0 ? res.data.result[0].uhid : null;
      setInputItem(prevInputItem => ({
          ...prevInputItem,
          patient_uhid: uhid
      }));

      setGetPatientData(res.data.result);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getPatientDetail();
  }, []);


  const handleSaveContinue = () =>{
    // navigate(`/TreatmentDashBoard/${id}`); 
    navigate(`/treatmentSuggestion/${id}`); 
  }


  return (
    <>
      <Wrapper>
        <div className="container">
          <div className="row headButton">
            <div className="col-md-12 text-start p-3">
            <button className="btn btn-secondary mx-3" onClick={()=>window.history.back()}><GiFastBackwardButton size={21}/></button>
              <button
                className="btn btn-info text-light"
                onClick={handleRedirect}
              >
                Dental-X Chart
              </button>
            </div>
          </div>

          <div className="row shadow-sm p-3 mb-3 bg-body rounded patient">
            <div className="">
            {getPatientData.map((item, index) => (
              <>
                <div key={index} className="col-lg-12 d-flex justify-content-between align-items-center">
                  <div className="col-lg-4">
                    <p><strong>Appoint ID</strong> : {item.appoint_id}</p>
                  </div>
                  <div className="col-lg-4">
                    <p><strong>Patient Name</strong> : {item.patient_name}</p>
                  </div>
                  <div className="col-lg-4">
                    <p><strong>Patient Mobile No.</strong> : {item.mobileno}</p>
                  </div>
                </div>
                <div key={index + 'secondRow'} className="col-lg-12 d-flex justify-content-between align-items-center">
                  <div className="col-lg-4">
                    <p className="mb-0"><strong>Blood Group</strong> : {item.bloodgroup}</p>
                  </div>
                  <div className="col-lg-4">
                    <p className="mb-0"><strong>Disease</strong> : {item.disease}</p>
                  </div>
                  <div className="col-lg-4">
                    <p className="mb-0"><strong>Allergy</strong> : {item.allergy}</p>
                  </div>
                </div>
              </>
            ))}
            </div>
          </div>

          {/* dental chart 20 teeth start */}
          {isLoading ? (
            <div>
              <div className='text-center'><RiLoader2Fill size={45} className="spin" /></div>
            </div>
          ) : (
            <>
              <div className="row setTeeth1">
                <div className="col-lg-12 col-12">
                  <div className="d-flex justify-content-center">
                    <div>
                      <img
                        src={teeth18}
                        alt=""
                        id="tooth_55"
                        className="img-fluid"
                      />
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
                      <img
                        src={teeth16}
                        alt=""
                        id="tooth_54"
                        className="img-fluid"
                      />
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
                      <img
                        src={teeth13}
                        alt=""
                        id="tooth_53"
                        className="img-fluid"
                      />
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
                      <img
                        src={teeth12}
                        alt=""
                        id="tooth_52"
                        className="img-fluid"
                      />
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
                      <img
                        src={teeth11}
                        alt=""
                        id="tooth_51"
                        className="img-fluid"
                      />
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
                      <img
                        src={teeth21}
                        alt=""
                        id="tooth_61"
                        className="img-fluid"
                      />
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
                      <img
                        src={teeth22}
                        alt=""
                        id="tooth_62"
                        className="img-fluid"
                      />
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
                      <img
                        src={teeth23}
                        alt=""
                        id="tooth_63"
                        className="img-fluid"
                      />
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
                      <img
                        src={teeth26}
                        alt=""
                        id="tooth_64"
                        className="img-fluid"
                      />
                      <div className="text-center">
                        <input
                          type="checkbox"
                          name=""
                          id="64"
                          value="64"
                          onChange={handlCheckBoxChange}
                        />
                      </div>
                    </div>
                    <div>
                      <img
                        src={teeth28}
                        alt=""
                        id="tooth_65"
                        className="img-fluid"
                      />
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
              <div className="row setTeeth1">
                <div className="col-lg-12 col-12">
                  <div className="d-flex justify-content-center">
                    <div>
                      <img
                        src={teeth47}
                        alt=""
                        id="tooth_85"
                        className="img-fluid"
                      />
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
                      <img
                        src={teeth46}
                        alt=""
                        id="tooth_84"
                        className="img-fluid"
                      />
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
                      <img
                        src={teeth43}
                        alt=""
                        id="tooth_83"
                        className="img-fluid"
                      />
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
                      <img
                        src={teeth42}
                        alt=""
                        id="tooth_82"
                        className="img-fluid"
                      />
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
                      <img
                        src={teeth41}
                        alt=""
                        id="tooth_81"
                        className="img-fluid"
                      />
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
                      <img
                        src={teeth31}
                        alt=""
                        id="tooth_71"
                        className="img-fluid"
                      />
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
                      <img
                        src={teeth32}
                        alt=""
                        id="tooth_72"
                        className="img-fluid"
                      />
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
                      <img
                        src={teeth33}
                        alt=""
                        id="tooth_73"
                        className="img-fluid"
                      />
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
                      <img
                        src={teeth36}
                        alt=""
                        id="tooth_74"
                        className="img-fluid"
                      />
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
                      <img
                        src={teeth37}
                        alt=""
                        id="tooth_75"
                        className="img-fluid"
                      />
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
            </>)}
          {/* dental chart 20 teeth end */}

          <div className="row mt-2 ">
            <div className="col-lg-10 col-10 bodyteeth">
              <div className="text-center">
                <button
                  onClick={handleClick}
                  className=" btn btn-info text-light mx-2"
                >
                  {selectAllTeeth ? "Unselect All" : "Select All"}
                </button>
                <button
                  onClick={() => window.location.reload()}
                  className="btn btn-info text-light mx-2"
                >
                  Reload
                </button>
              </div>
              <div>
                <form onSubmit={handleSave}>
                <input type="hidden" name="appointment_id" value={inputItem.appointment_id} id="form3Example1" class="form-control" />
                  <div class="row mt-3">
                    <div class="col">
                      <div data-mdb-input-init class="form-outline">
                      <label className="lable">Select Teeth</label>
                        <input
                          type="text"
                          id="form8Example1"
                          className="form-control"
                          placeholder="Selected Teeth Number"
                          readOnly
                          //   value={selectedTeeth.join(", ")}
                          value={inputItem.selectTeeth.join(", ")}
                        // onChange={handleSelecteditem}
                        />
                      </div>
                    </div>
                    <div class="col">
                      <div data-mdb-input-init class="form-outline">
                      <label className="lable">Dental Condition</label>
                        <input
                          type="text"
                          value={inputItem.desease}
                          onChange={(e) =>
                            setInputItem({
                              ...inputItem, // Merge existing inputItem state
                              desease: e.target.value,
                            })
                          }
                          id="form8Example2"
                          placeholder="Dental Condition"
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>

                  <hr />

                  <div class="row">
                    <div class="col">
                      <div data-mdb-input-init class="form-outline">
                      <label className="lable">Cheif Complaint</label>
                        <input
                          type="text"
                          name="chiefComplain"
                          onChange={handleSelecteditem}
                          value={inputItem.chiefComplain}
                          id="form8Example3"
                          class="form-control"
                          placeholder="Cheif Complaints"
                        />
                      </div>
                    </div>
                    <div class="col">
                      <div data-mdb-input-init class="form-outline">
                      <label className="lable">Any Advice</label>
                        <input
                          type="text"
                          id="form8Example4"
                          name="advice"
                          onChange={handleSelecteditem}
                          value={inputItem.advice}
                          class="form-control"
                          placeholder="Advice"
                        />
                      </div>
                    </div>
                    <div class="col">
                      <div data-mdb-input-init class="form-outline">
                      <label className="lable">ON Examination</label>
                        <input
                          type="text"
                          id="form8Example5"
                          name="onExamination"
                          onChange={handleSelecteditem}
                          value={inputItem.onExamination}
                          class="form-control"
                          placeholder="ON Examination"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="text-center m-3">
                    <button
                      type="submit"
                      className="btn btn-info text-light mx-3"
                    // onClick={handleAddNew}
                    >
                      Add New
                    </button>
                    <button
                      type="button"
                      className="btn btn-info text-light mx-3"
                      onClick={handleSaveContinue}
                    >
                      Save & Continue
                    </button>
                  </div>
                </form>
              </div>
              <div>
                <SaveData id={id}/> 
                {/* <h2>Saved Data</h2>
                <div>
                  {inputItemList.length ? (
                    <ul className="list">
                      {inputItemList.map((item, index) => (
                        <li key={index} className="list-item">
                          {/* Render each item's properties */}
                          {/* Select Teeth: {item.selectTeeth.join(", ")},&nbsp;&nbsp; Disease:{" "}
                          {item.desease},&nbsp;&nbsp; Chief Complaint: {item.chiefComplain},&nbsp;&nbsp;
                          Advice: {item.advice},&nbsp;&nbsp; On Examination:{" "}
                          {item.onExamination} */}
                          {/* <div className="buttons">
                            <button
                              type="button" className="btn btn-primary"
                              onClick={() => editItem(index)}
                            >
                              <MdEdit size={20} />
                            </button>
                            <button
                              className="btn btn-danger mx-1"
                              onClick={() => deleteItem(index)}
                            >
                              <MdDelete size={20} />
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p class="placeholder-glow">
                      Currently, there is no available data.
                    </p>
                  )}
                </div>  */}
              </div>
            </div>

            <div className="col-lg-2 col-2 bodybutton">
              <div className="d-flex flex-column text-center">
                <div onClick={caries} className="p-2">
                  <img
                    src={cariesbtn}
                    alt="caries"
                    className="buttons shadow-sm bg-body rounded"
                  />
                </div>
                <div onClick={fracture} className="p-2">
                  <img
                    src={fracturebtn}
                    alt="fracture"
                    className="buttons shadow-sm bg-body rounded"
                  />
                </div>
                <div onClick={impacted} className="p-2">
                  <img
                    src={impactedbtn}
                    alt="impacted"
                    className="buttons shadow-sm bg-body rounded"
                  />
                </div>
                <div onClick={missing} className="p-2">
                  <img
                    src={missingbtn}
                    alt="missing"
                    className="buttons shadow-sm bg-body rounded"
                  />
                </div>
                <div onClick={mobility} className="p-2">
                  <img
                    src={mobilitybtn}
                    alt="mobility"
                    className="buttons shadow-sm bg-body rounded"
                  />
                </div>
                <div onClick={periapical} className="p-2">
                  <img
                    src={periapicalbtn}
                    alt="periapical"
                    className="buttons shadow-sm bg-body rounded"
                  />
                </div>
                <div onClick={root} className="p-2">
                  <img
                    src={rootbtn}
                    alt="root"
                    className="buttons shadow-sm bg-body rounded"
                  />
                </div>
                <div onClick={supara} className="p-2">
                  <img
                    src={suparabtn}
                    alt="supara"
                    className="buttons shadow-sm bg-body rounded"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default PediatricDentalTest;
const Wrapper = styled.div`
  .buttons {
    width: 150px;
    cursor: pointer;
    &:hover {
      width: 152px;
    }
  }
  .list {
    list-style-type: none;
    padding: 0;
  }
  .list-item {
    margin-bottom: 10px;
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
  }
  .buttons {
  }
  button a {
    text-decoration: none;
    color: white;
  }
  @keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.spin {
  animation: spin 1s linear infinite;
}

.patient{
    @media screen and (min-width: 768px) and (max-width: 1023px) {
      width: 53rem;
      margin-left: 2rem;
    }
    @media screen and (min-width: 480px) and (max-width: 768px) {
      width: 37rem;
      margin-left: 3.2rem;
    }
  }
  .setTeeth1{
    @media screen and (min-width: 480px) and (max-width: 768px) {
      width: 37rem;
      margin-left: 3.2rem;
    }
  }
  .headButton{
    @media screen and (min-width: 480px) and (max-width: 768px) {
      width: 37rem;
      margin-left: 3.2rem;
    }
  }
  .bodyteeth{
    @media screen and (min-width: 480px) and (max-width: 768px) {
      width: 37rem;
      margin-left: 3.2rem;
    }
  }
  .bodybutton{
    @media screen and (min-width: 480px) and (max-width: 768px) {
      width: 37rem;
      margin-left: 3.2rem;
    }
  }
  .lable{
  font-size: 1.3rem;
  font-weight: 500;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  padding-left: 0.9rem;
}
`;
