import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { RiLoader2Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { toggleTableRefresh } from "../../../redux/user/userSlice";
import { GiFastBackwardButton } from "react-icons/gi";
import cogoToast from "cogo-toast";
import teeth18 from "../Assest/teeth1.png";
import teeth17 from "../Assest/teeth2.png";
import teeth16 from "../Assest/teeth3.png";
import teeth15 from "../Assest/teeth4.png";
import teeth14 from "../Assest/teeth5.png";
import teeth13 from "../Assest/teeth6.png";
import teeth12 from "../Assest/teeth7.png";
import teeth11 from "../Assest/teeth8.png";
import teeth21 from "../Assest/teeth9.png";
import teeth22 from "../Assest/teeth10.png";
import teeth23 from "../Assest/teeth11.png";
import teeth24 from "../Assest/teeth12.png";
import teeth25 from "../Assest/teeth13.png";
import teeth26 from "../Assest/teeth14.png";
import teeth27 from "../Assest/teeth15.png";
import teeth28 from "../Assest/teeth16.png";
import teeth48 from "../Assest/teeth17.png";
import teeth47 from "../Assest/teeth18.png";
import teeth46 from "../Assest/teeth19.png";
import teeth45 from "../Assest/teeth20.png";
import teeth44 from "../Assest/teeth21.png";
import teeth43 from "../Assest/teeth22.png";
import teeth42 from "../Assest/teeth23.png";
import teeth41 from "../Assest/teeth24.png";
import teeth31 from "../Assest/teeth25.png";
import teeth32 from "../Assest/teeth26.png";
import teeth33 from "../Assest/teeth27.png";
import teeth34 from "../Assest/teeth28.png";
import teeth35 from "../Assest/teeth29.png";
import teeth36 from "../Assest/teeth30.png";
import teeth37 from "../Assest/teeth31.png";
import teeth38 from "../Assest/teeth32.png";
import cariesT1 from "../Assest/caries/teeth1.png";
import cariesT2 from "../Assest/caries/teeth2.png";
import cariesT3 from "../Assest/caries/teeth3.png";
import cariesT4 from "../Assest/caries/teeth4.png";
import cariesT5 from "../Assest/caries/teeth5.png";
import cariesT6 from "../Assest/caries/teeth6.png";
import cariesT7 from "../Assest/caries/teeth7.png";
import cariesT8 from "../Assest/caries/teeth8.png";
import cariesT9 from "../Assest/caries/teeth9.png";
import cariesT10 from "../Assest/caries/teeth10.png";
import cariesT11 from "../Assest/caries/teeth11.png";
import cariesT12 from "../Assest/caries/teeth12.png";
import cariesT13 from "../Assest/caries/teeth13.png";
import cariesT14 from "../Assest/caries/teeth14.png";
import cariesT15 from "../Assest/caries/teeth15.png";
import cariesT16 from "../Assest/caries/teeth16.png";
import cariesT17 from "../Assest/caries/teeth17.png";
import cariesT18 from "../Assest/caries/teeth18.png";
import cariesT19 from "../Assest/caries/teeth19.png";
import cariesT20 from "../Assest/caries/teeth20.png";
import cariesT21 from "../Assest/caries/teeth21.png";
import cariesT22 from "../Assest/caries/teeth22.png";
import cariesT23 from "../Assest/caries/teeth23.png";
import cariesT24 from "../Assest/caries/teeth24.png";
import cariesT25 from "../Assest/caries/teeth25.png";
import cariesT26 from "../Assest/caries/teeth26.png";
import cariesT27 from "../Assest/caries/teeth27.png";
import cariesT28 from "../Assest/caries/teeth28.png";
import cariesT29 from "../Assest/caries/teeth29.png";
import cariesT30 from "../Assest/caries/teeth30.png";
import cariesT31 from "../Assest/caries/teeth31.png";
import cariesT32 from "../Assest/caries/teeth32.png";
import fractureT1 from "../Assest/fracture/teeth1.png";
import fractureT2 from "../Assest/fracture/teeth2.png";
import fractureT3 from "../Assest/fracture/teeth3.png";
import fractureT4 from "../Assest/fracture/teeth4.png";
import fractureT5 from "../Assest/fracture/teeth5.png";
import fractureT6 from "../Assest/fracture/teeth6.png";
import fractureT7 from "../Assest/fracture/teeth7.png";
import fractureT8 from "../Assest/fracture/teeth8.png";
import fractureT9 from "../Assest/fracture/teeth9.png";
import fractureT10 from "../Assest/fracture/teeth10.png";
import fractureT11 from "../Assest/fracture/teeth11.png";
import fractureT12 from "../Assest/fracture/teeth12.png";
import fractureT13 from "../Assest/fracture/teeth13.png";
import fractureT14 from "../Assest/fracture/teeth14.png";
import fractureT15 from "../Assest/fracture/teeth15.png";
import fractureT16 from "../Assest/fracture/teeth16.png";
import fractureT17 from "../Assest/fracture/teeth17.png";
import fractureT18 from "../Assest/fracture/teeth18.png";
import fractureT19 from "../Assest/fracture/teeth19.png";
import fractureT20 from "../Assest/fracture/teeth20.png";
import fractureT21 from "../Assest/fracture/teeth21.png";
import fractureT22 from "../Assest/fracture/teeth22.png";
import fractureT23 from "../Assest/fracture/teeth23.png";
import fractureT24 from "../Assest/fracture/teeth24.png";
import fractureT25 from "../Assest/fracture/teeth25.png";
import fractureT26 from "../Assest/fracture/teeth26.png";
import fractureT27 from "../Assest/fracture/teeth27.png";
import fractureT28 from "../Assest/fracture/teeth28.png";
import fractureT29 from "../Assest/fracture/teeth29.png";
import fractureT30 from "../Assest/fracture/teeth30.png";
import fractureT31 from "../Assest/fracture/teeth31.png";
import fractureT32 from "../Assest/fracture/teeth32.png";
import impactedT1 from "../Assest/Impacted/teeth1.png";
import impactedT2 from "../Assest/Impacted/teeth2.png";
import impactedT3 from "../Assest/Impacted/teeth3.png";
import impactedT4 from "../Assest/Impacted/teeth4.png";
import impactedT5 from "../Assest/Impacted/teeth5.png";
import impactedT6 from "../Assest/Impacted/teeth6.png";
import impactedT7 from "../Assest/Impacted/teeth7.png";
import impactedT8 from "../Assest/Impacted/teeth8.png";
import impactedT9 from "../Assest/Impacted/teeth9.png";
import impactedT10 from "../Assest/Impacted/teeth10.png";
import impactedT11 from "../Assest/Impacted/teeth11.png";
import impactedT12 from "../Assest/Impacted/teeth12.png";
import impactedT13 from "../Assest/Impacted/teeth13.png";
import impactedT14 from "../Assest/Impacted/teeth14.png";
import impactedT15 from "../Assest/Impacted/teeth15.png";
import impactedT16 from "../Assest/Impacted/teeth16.png";
import impactedT17 from "../Assest/Impacted/teeth17.png";
import impactedT18 from "../Assest/Impacted/teeth18.png";
import impactedT19 from "../Assest/Impacted/teeth19.png";
import impactedT20 from "../Assest/Impacted/teeth20.png";
import impactedT21 from "../Assest/Impacted/teeth21.png";
import impactedT22 from "../Assest/Impacted/teeth22.png";
import impactedT23 from "../Assest/Impacted/teeth23.png";
import impactedT24 from "../Assest/Impacted/teeth24.png";
import impactedT25 from "../Assest/Impacted/teeth25.png";
import impactedT26 from "../Assest/Impacted/teeth26.png";
import impactedT27 from "../Assest/Impacted/teeth27.png";
import impactedT28 from "../Assest/Impacted/teeth28.png";
import impactedT29 from "../Assest/Impacted/teeth29.png";
import impactedT30 from "../Assest/Impacted/teeth30.png";
import impactedT31 from "../Assest/Impacted/teeth31.png";
import impactedT32 from "../Assest/Impacted/teeth32.png";
import missingT1 from "../Assest/Missing Tooth/teeth1.png";
import missingT2 from "../Assest/Missing Tooth/teeth2.png";
import missingT3 from "../Assest/Missing Tooth/teeth3.png";
import missingT4 from "../Assest/Missing Tooth/teeth4.png";
import missingT5 from "../Assest/Missing Tooth/teeth5.png";
import missingT6 from "../Assest/Missing Tooth/teeth6.png";
import missingT7 from "../Assest/Missing Tooth/teeth7.png";
import missingT8 from "../Assest/Missing Tooth/teeth8.png";
import missingT9 from "../Assest/Missing Tooth/teeth9.png";
import missingT10 from "../Assest/Missing Tooth/teeth10.png";
import missingT11 from "../Assest/Missing Tooth/teeth11.png";
import missingT12 from "../Assest/Missing Tooth/teeth12.png";
import missingT13 from "../Assest/Missing Tooth/teeth13.png";
import missingT14 from "../Assest/Missing Tooth/teeth14.png";
import missingT15 from "../Assest/Missing Tooth/teeth15.png";
import missingT16 from "../Assest/Missing Tooth/teeth16.png";
import missingT17 from "../Assest/Missing Tooth/teeth17.png";
import missingT18 from "../Assest/Missing Tooth/teeth18.png";
import missingT19 from "../Assest/Missing Tooth/teeth19.png";
import missingT20 from "../Assest/Missing Tooth/teeth20.png";
import missingT21 from "../Assest/Missing Tooth/teeth21.png";
import missingT22 from "../Assest/Missing Tooth/teeth22.png";
import missingT23 from "../Assest/Missing Tooth/teeth23.png";
import missingT24 from "../Assest/Missing Tooth/teeth24.png";
import missingT25 from "../Assest/Missing Tooth/teeth25.png";
import missingT26 from "../Assest/Missing Tooth/teeth26.png";
import missingT27 from "../Assest/Missing Tooth/teeth27.png";
import missingT28 from "../Assest/Missing Tooth/teeth28.png";
import missingT29 from "../Assest/Missing Tooth/teeth29.png";
import missingT30 from "../Assest/Missing Tooth/teeth30.png";
import missingT31 from "../Assest/Missing Tooth/teeth31.png";
import missingT32 from "../Assest/Missing Tooth/teeth32.png";
import mobilityT1 from "../Assest/mobility/teeth1.png";
import mobilityT2 from "../Assest/mobility/teeth2.png";
import mobilityT3 from "../Assest/mobility/teeth3.png";
import mobilityT4 from "../Assest/mobility/teeth4.png";
import mobilityT5 from "../Assest/mobility/teeth5.png";
import mobilityT6 from "../Assest/mobility/teeth6.png";
import mobilityT7 from "../Assest/mobility/teeth7.png";
import mobilityT8 from "../Assest/mobility/teeth8.png";
import mobilityT9 from "../Assest/mobility/teeth9.png";
import mobilityT10 from "../Assest/mobility/teeth10.png";
import mobilityT11 from "../Assest/mobility/teeth11.png";
import mobilityT12 from "../Assest/mobility/teeth12.png";
import mobilityT13 from "../Assest/mobility/teeth13.png";
import mobilityT14 from "../Assest/mobility/teeth14.png";
import mobilityT15 from "../Assest/mobility/teeth15.png";
import mobilityT16 from "../Assest/mobility/teeth16.png";
import mobilityT17 from "../Assest/mobility/teeth17.png";
import mobilityT18 from "../Assest/mobility/teeth18.png";
import mobilityT19 from "../Assest/mobility/teeth19.png";
import mobilityT20 from "../Assest/mobility/teeth20.png";
import mobilityT21 from "../Assest/mobility/teeth21.png";
import mobilityT22 from "../Assest/mobility/teeth22.png";
import mobilityT23 from "../Assest/mobility/teeth23.png";
import mobilityT24 from "../Assest/mobility/teeth24.png";
import mobilityT25 from "../Assest/mobility/teeth25.png";
import mobilityT26 from "../Assest/mobility/teeth26.png";
import mobilityT27 from "../Assest/mobility/teeth27.png";
import mobilityT28 from "../Assest/mobility/teeth28.png";
import mobilityT29 from "../Assest/mobility/teeth29.png";
import mobilityT30 from "../Assest/mobility/teeth30.png";
import mobilityT31 from "../Assest/mobility/teeth31.png";
import mobilityT32 from "../Assest/mobility/teeth32.png";
import periapicalT1 from "../Assest/Periapical Abscess/teeth1.png";
import periapicalT2 from "../Assest/Periapical Abscess/teeth2.png";
import periapicalT3 from "../Assest/Periapical Abscess/teeth3.png";
import periapicalT4 from "../Assest/Periapical Abscess/teeth4.png";
import periapicalT5 from "../Assest/Periapical Abscess/teeth5.png";
import periapicalT6 from "../Assest/Periapical Abscess/teeth6.png";
import periapicalT7 from "../Assest/Periapical Abscess/teeth7.png";
import periapicalT8 from "../Assest/Periapical Abscess/teeth8.png";
import periapicalT9 from "../Assest/Periapical Abscess/teeth9.png";
import periapicalT10 from "../Assest/Periapical Abscess/teeth10.png";
import periapicalT11 from "../Assest/Periapical Abscess/teeth11.png";
import periapicalT12 from "../Assest/Periapical Abscess/teeth12.png";
import periapicalT13 from "../Assest/Periapical Abscess/teeth13.png";
import periapicalT14 from "../Assest/Periapical Abscess/teeth14.png";
import periapicalT15 from "../Assest/Periapical Abscess/teeth15.png";
import periapicalT16 from "../Assest/Periapical Abscess/teeth16.png";
import periapicalT17 from "../Assest/Periapical Abscess/teeth17.png";
import periapicalT18 from "../Assest/Periapical Abscess/teeth18.png";
import periapicalT19 from "../Assest/Periapical Abscess/teeth19.png";
import periapicalT20 from "../Assest/Periapical Abscess/teeth20.png";
import periapicalT21 from "../Assest/Periapical Abscess/teeth21.png";
import periapicalT22 from "../Assest/Periapical Abscess/teeth22.png";
import periapicalT23 from "../Assest/Periapical Abscess/teeth23.png";
import periapicalT24 from "../Assest/Periapical Abscess/teeth24.png";
import periapicalT25 from "../Assest/Periapical Abscess/teeth25.png";
import periapicalT26 from "../Assest/Periapical Abscess/teeth26.png";
import periapicalT27 from "../Assest/Periapical Abscess/teeth27.png";
import periapicalT28 from "../Assest/Periapical Abscess/teeth28.png";
import periapicalT29 from "../Assest/Periapical Abscess/teeth29.png";
import periapicalT30 from "../Assest/Periapical Abscess/teeth30.png";
import periapicalT31 from "../Assest/Periapical Abscess/teeth31.png";
import periapicalT32 from "../Assest/Periapical Abscess/teeth32.png";
import rootT1 from "../Assest/Root Stump/teeth1.png";
import rootT2 from "../Assest/Root Stump/teeth2.png";
import rootT3 from "../Assest/Root Stump/teeth3.png";
import rootT4 from "../Assest/Root Stump/teeth4.png";
import rootT5 from "../Assest/Root Stump/teeth5.png";
import rootT6 from "../Assest/Root Stump/teeth6.png";
import rootT7 from "../Assest/Root Stump/teeth7.png";
import rootT8 from "../Assest/Root Stump/teeth8.png";
import rootT9 from "../Assest/Root Stump/teeth9.png";
import rootT10 from "../Assest/Root Stump/teeth10.png";
import rootT11 from "../Assest/Root Stump/teeth11.png";
import rootT12 from "../Assest/Root Stump/teeth12.png";
import rootT13 from "../Assest/Root Stump/teeth13.png";
import rootT14 from "../Assest/Root Stump/teeth14.png";
import rootT15 from "../Assest/Root Stump/teeth15.png";
import rootT16 from "../Assest/Root Stump/teeth16.png";
import rootT17 from "../Assest/Root Stump/teeth17.png";
import rootT18 from "../Assest/Root Stump/teeth18.png";
import rootT19 from "../Assest/Root Stump/teeth19.png";
import rootT20 from "../Assest/Root Stump/teeth20.png";
import rootT21 from "../Assest/Root Stump/teeth21.png";
import rootT22 from "../Assest/Root Stump/teeth22.png";
import rootT23 from "../Assest/Root Stump/teeth23.png";
import rootT24 from "../Assest/Root Stump/teeth24.png";
import rootT25 from "../Assest/Root Stump/teeth25.png";
import rootT26 from "../Assest/Root Stump/teeth26.png";
import rootT27 from "../Assest/Root Stump/teeth27.png";
import rootT28 from "../Assest/Root Stump/teeth28.png";
import rootT29 from "../Assest/Root Stump/teeth29.png";
import rootT30 from "../Assest/Root Stump/teeth30.png";
import rootT31 from "../Assest/Root Stump/teeth31.png";
import rootT32 from "../Assest/Root Stump/teeth32.png";
import suparaT1 from "../Assest/Supara Erupted/teeth1.png";
import suparaT2 from "../Assest/Supara Erupted/teeth2.png";
import suparaT3 from "../Assest/Supara Erupted/teeth3.png";
import suparaT4 from "../Assest/Supara Erupted/teeth4.png";
import suparaT5 from "../Assest/Supara Erupted/teeth5.png";
import suparaT6 from "../Assest/Supara Erupted/teeth6.png";
import suparaT7 from "../Assest/Supara Erupted/teeth7.png";
import suparaT8 from "../Assest/Supara Erupted/teeth8.png";
import suparaT9 from "../Assest/Supara Erupted/teeth9.png";
import suparaT10 from "../Assest/Supara Erupted/teeth10.png";
import suparaT11 from "../Assest/Supara Erupted/teeth11.png";
import suparaT12 from "../Assest/Supara Erupted/teeth12.png";
import suparaT13 from "../Assest/Supara Erupted/teeth13.png";
import suparaT14 from "../Assest/Supara Erupted/teeth14.png";
import suparaT15 from "../Assest/Supara Erupted/teeth15.png";
import suparaT16 from "../Assest/Supara Erupted/teeth16.png";
import suparaT17 from "../Assest/Supara Erupted/teeth17.png";
import suparaT18 from "../Assest/Supara Erupted/teeth18.png";
import suparaT19 from "../Assest/Supara Erupted/teeth19.png";
import suparaT20 from "../Assest/Supara Erupted/teeth20.png";
import suparaT21 from "../Assest/Supara Erupted/teeth21.png";
import suparaT22 from "../Assest/Supara Erupted/teeth22.png";
import suparaT23 from "../Assest/Supara Erupted/teeth23.png";
import suparaT24 from "../Assest/Supara Erupted/teeth24.png";
import suparaT25 from "../Assest/Supara Erupted/teeth25.png";
import suparaT26 from "../Assest/Supara Erupted/teeth26.png";
import suparaT27 from "../Assest/Supara Erupted/teeth27.png";
import suparaT28 from "../Assest/Supara Erupted/teeth28.png";
import suparaT29 from "../Assest/Supara Erupted/teeth29.png";
import suparaT30 from "../Assest/Supara Erupted/teeth30.png";
import suparaT31 from "../Assest/Supara Erupted/teeth31.png";
import suparaT32 from "../Assest/Supara Erupted/teeth32.png";
import cariesbtn from "../Assest/Examination Buttons/caries.png";
import fracturebtn from "../Assest/Examination Buttons/fracture.png";
import impactedbtn from "../Assest/Examination Buttons/impacted.png";
import missingbtn from "../Assest/Examination Buttons/missing tooth.png";
import mobilitybtn from "../Assest/Examination Buttons/mobility.png";
import periapicalbtn from "../Assest/Examination Buttons/periapical.png";
import rootbtn from "../Assest/Examination Buttons/rootstump1.png";
import suparabtn from "../Assest/Examination Buttons/Supra erupted1.png";
import SaveData from "./SaveExaminationData/SaveData";

const ExaminationPatientTest = ({ tpid }) => {
  const { id, dcat } = useParams();
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
    diagnosis_category: dcat,
  });
  const [selectAllTeeth, setSelectAllTeeth] = useState(false);
  const [isFormFilled, setIsFormFilled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [getPatientData, setGetPatientData] = useState([]);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const branch = user.currentUser.branch_name;
  const token = user.currentUser.token;
  console.log(branch);

  // console.log(getPatientData[0].uhid);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  const navigate = useNavigate();

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
    18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28, 48, 47, 46,
    45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38,
  ];

  const handleClick = () => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const newState = !selectAllTeeth;

    checkboxes.forEach((checkbox) => {
      checkbox.checked = newState;
    });

    setSelectedTeeth(newState ? allTeethValues : []);
    setSelectAllTeeth(newState);
  };

  console.log(selectedTeeth);

  const toothDefaultMapping = {
    18: teeth18,
    17: teeth17,
    16: teeth16,
    15: teeth15,
    14: teeth14,
    13: teeth13,
    12: teeth12,
    11: teeth11,
    21: teeth21,
    22: teeth22,
    23: teeth23,
    24: teeth24,
    25: teeth25,
    26: teeth26,
    27: teeth27,
    28: teeth28,
    48: teeth48,
    47: teeth47,
    46: teeth46,
    45: teeth45,
    44: teeth44,
    43: teeth43,
    42: teeth42,
    41: teeth41,
    31: teeth31,
    32: teeth32,
    33: teeth33,
    34: teeth34,
    35: teeth35,
    36: teeth36,
    37: teeth37,
    38: teeth38,
  };

  const toothImageMapping = {
    18: cariesT1,
    17: cariesT2,
    16: cariesT3,
    15: cariesT4,
    14: cariesT5,
    13: cariesT6,
    12: cariesT7,
    11: cariesT8,
    21: cariesT9,
    22: cariesT10,
    23: cariesT11,
    24: cariesT12,
    25: cariesT13,
    26: cariesT14,
    27: cariesT15,
    28: cariesT16,
    48: cariesT17,
    47: cariesT18,
    46: cariesT19,
    45: cariesT20,
    44: cariesT21,
    43: cariesT22,
    42: cariesT23,
    41: cariesT24,
    31: cariesT25,
    32: cariesT26,
    33: cariesT27,
    34: cariesT28,
    35: cariesT29,
    36: cariesT30,
    37: cariesT31,
    38: cariesT32,
    // Add more mappings as needed
  };

  const crNull = () => {
    cogoToast.error("Please Select Teeth");
  };

  const caries = () => {
    // Check if "Caries" is already present in the disease array
    setInputItem((prevInputItem) => ({
      ...prevInputItem,
      desease: prevInputItem.desease === "Caries" ? "" : "Caries",
    }));

    // Update the tooth images
    inputItem.selectTeeth.forEach((toothId) => {
      const toothElement = document.getElementById(`tooth_${toothId}`);
      if (toothElement) {
        if (inputItem.desease && inputItem.desease === "Caries") {
          toothElement.src = toothDefaultMapping[toothId];
        } else {
          toothElement.src = toothImageMapping[toothId];
        }
      }
    });
  };

  // caries end here

  // fracture start here

  const toothfractureImageMapping = {
    18: fractureT1,
    17: fractureT2,
    16: fractureT3,
    15: fractureT4,
    14: fractureT5,
    13: fractureT6,
    12: fractureT7,
    11: fractureT8,
    21: fractureT9,
    22: fractureT10,
    23: fractureT11,
    24: fractureT12,
    25: fractureT13,
    26: fractureT14,
    27: fractureT15,
    28: fractureT16,
    48: fractureT17,
    47: fractureT18,
    46: fractureT19,
    45: fractureT20,
    44: fractureT21,
    43: fractureT22,
    42: fractureT23,
    41: fractureT24,
    31: fractureT25,
    32: fractureT26,
    33: fractureT27,
    34: fractureT28,
    35: fractureT29,
    36: fractureT30,
    37: fractureT31,
    38: fractureT32,
    // Add more mappings as needed
  };

  const fracture = () => {
    setInputItem((prevInputItem) => ({
      ...prevInputItem,
      desease: prevInputItem.desease === "Fracture" ? "" : "Fracture",
    }));

    // Additional logic here if needed
    inputItem.selectTeeth.forEach((toothId) => {
      const toothElement = document.getElementById(`tooth_${toothId}`);
      if (toothElement) {
        if (inputItem.desease && inputItem.desease === "Fracture") {
          toothElement.src = toothDefaultMapping[toothId];
        } else {
          toothElement.src = toothfractureImageMapping[toothId];
        }
      }
    });
  };

  // fracture end here

  // impacted start here
  const toothimpactedImageMapping = {
    18: impactedT1,
    17: impactedT2,
    16: impactedT3,
    15: impactedT4,
    14: impactedT5,
    13: impactedT6,
    12: impactedT7,
    11: impactedT8,
    21: impactedT9,
    22: impactedT10,
    23: impactedT11,
    24: impactedT12,
    25: impactedT13,
    26: impactedT14,
    27: impactedT15,
    28: impactedT16,
    48: impactedT17,
    47: impactedT18,
    46: impactedT19,
    45: impactedT20,
    44: impactedT21,
    43: impactedT22,
    42: impactedT23,
    41: impactedT24,
    31: impactedT25,
    32: impactedT26,
    33: impactedT27,
    34: impactedT28,
    35: impactedT29,
    36: impactedT30,
    37: impactedT31,
    38: impactedT32,
    // Add more mappings as needed
  };

  const impacted = () => {
    setInputItem((prevInputItem) => ({
      ...prevInputItem,
      desease: prevInputItem.desease === "Impacted" ? "" : "Impacted",
    }));

    // Additional logic here if needed
    inputItem.selectTeeth.forEach((toothId) => {
      const toothElement = document.getElementById(`tooth_${toothId}`);
      if (toothElement) {
        if (inputItem.desease && inputItem.desease.includes("Impacted")) {
          toothElement.src = toothDefaultMapping[toothId];
        } else {
          toothElement.src = toothimpactedImageMapping[toothId];
        }
      }
    });
  };

  // impacted end here

  // missing start here

  const toothmissingImageMapping = {
    18: missingT1,
    17: missingT2,
    16: missingT3,
    15: missingT4,
    14: missingT5,
    13: missingT6,
    12: missingT7,
    11: missingT8,
    21: missingT9,
    22: missingT10,
    23: missingT11,
    24: missingT12,
    25: missingT13,
    26: missingT14,
    27: missingT15,
    28: missingT16,
    48: missingT17,
    47: missingT18,
    46: missingT19,
    45: missingT20,
    44: missingT21,
    43: missingT22,
    42: missingT23,
    41: missingT24,
    31: missingT25,
    32: missingT26,
    33: missingT27,
    34: missingT28,
    35: missingT29,
    36: missingT30,
    37: missingT31,
    38: missingT32,
    // Add more mappings as needed
  };

  const missing = () => {
    setInputItem((prevInputItem) => ({
      ...prevInputItem,
      desease: prevInputItem.desease === "Missing Tooth" ? "" : "Missing Tooth",
    }));
    // Additional logic here if needed
    inputItem.selectTeeth.forEach((toothId) => {
      const toothElement = document.getElementById(`tooth_${toothId}`);
      if (toothElement) {
        if (inputItem.desease && inputItem.desease.includes("Missing Tooth")) {
          toothElement.src = toothDefaultMapping[toothId];
        } else {
          toothElement.src = toothmissingImageMapping[toothId];
        }
      }
    });
  };

  // missing end here

  // mobility start here

  const toothmobilityImageMapping = {
    18: mobilityT1,
    17: mobilityT2,
    16: mobilityT3,
    15: mobilityT4,
    14: mobilityT5,
    13: mobilityT6,
    12: mobilityT7,
    11: mobilityT8,
    21: mobilityT9,
    22: mobilityT10,
    23: mobilityT11,
    24: mobilityT12,
    25: mobilityT13,
    26: mobilityT14,
    27: mobilityT15,
    28: mobilityT16,
    48: mobilityT17,
    47: mobilityT18,
    46: mobilityT19,
    45: mobilityT20,
    44: mobilityT21,
    43: mobilityT22,
    42: mobilityT23,
    41: mobilityT24,
    31: mobilityT25,
    32: mobilityT26,
    33: mobilityT27,
    34: mobilityT28,
    35: mobilityT29,
    36: mobilityT30,
    37: mobilityT31,
    38: mobilityT32,
    // Add more mappings as needed
  };

  const mobility = () => {
    setInputItem((prevInputItem) => ({
      ...prevInputItem,
      desease: prevInputItem.desease === "Mobility" ? "" : "Mobility",
    }));
    // Additional logic here if needed
    inputItem.selectTeeth.forEach((toothId) => {
      const toothElement = document.getElementById(`tooth_${toothId}`);
      if (toothElement) {
        if (inputItem.desease && inputItem.desease.includes("Mobility")) {
          toothElement.src = toothDefaultMapping[toothId];
        } else {
          toothElement.src = toothmobilityImageMapping[toothId];
        }
      }
    });
  };

  // mobility end here

  // periapical start here

  const toothperiapicalImageMapping = {
    18: periapicalT1,
    17: periapicalT2,
    16: periapicalT3,
    15: periapicalT4,
    14: periapicalT5,
    13: periapicalT6,
    12: periapicalT7,
    11: periapicalT8,
    21: periapicalT9,
    22: periapicalT10,
    23: periapicalT11,
    24: periapicalT12,
    25: periapicalT13,
    26: periapicalT14,
    27: periapicalT15,
    28: periapicalT16,
    48: periapicalT17,
    47: periapicalT18,
    46: periapicalT19,
    45: periapicalT20,
    44: periapicalT21,
    43: periapicalT22,
    42: periapicalT23,
    41: periapicalT24,
    31: periapicalT25,
    32: periapicalT26,
    33: periapicalT27,
    34: periapicalT28,
    35: periapicalT29,
    36: periapicalT30,
    37: periapicalT31,
    38: periapicalT32,
    // Add more mappings as needed
  };

  const periapical = () => {
    setInputItem((prevInputItem) => ({
      ...prevInputItem,
      desease:
        prevInputItem.desease === "Periapical Abscess"
          ? ""
          : "Periapical Abscess",
    }));
    // Additional logic here if needed
    inputItem.selectTeeth.forEach((toothId) => {
      const toothElement = document.getElementById(`tooth_${toothId}`);
      if (toothElement) {
        if (
          inputItem.desease &&
          inputItem.desease.includes("Periapical Abscess")
        ) {
          toothElement.src = toothDefaultMapping[toothId];
        } else {
          toothElement.src = toothperiapicalImageMapping[toothId];
        }
      }
    });
  };

  // periapical end here

  // root start here

  const toothrootImageMapping = {
    18: rootT1,
    17: rootT2,
    16: rootT3,
    15: rootT4,
    14: rootT5,
    13: rootT6,
    12: rootT7,
    11: rootT8,
    21: rootT9,
    22: rootT10,
    23: rootT11,
    24: rootT12,
    25: rootT13,
    26: rootT14,
    27: rootT15,
    28: rootT16,
    48: rootT17,
    47: rootT18,
    46: rootT19,
    45: rootT20,
    44: rootT21,
    43: rootT22,
    42: rootT23,
    41: rootT24,
    31: rootT25,
    32: rootT26,
    33: rootT27,
    34: rootT28,
    35: rootT29,
    36: rootT30,
    37: rootT31,
    38: rootT32,
    // Add more mappings as needed
  };

  const root = () => {
    setInputItem((prevInputItem) => ({
      ...prevInputItem,
      desease: prevInputItem.desease === "Root Stump" ? "" : "Root Stump",
    }));

    // Additional logic here if needed
    inputItem.selectTeeth.forEach((toothId) => {
      const toothElement = document.getElementById(`tooth_${toothId}`);
      if (toothElement) {
        if (inputItem.desease && inputItem.desease.includes("Root Stump")) {
          toothElement.src = toothDefaultMapping[toothId];
        } else {
          toothElement.src = toothrootImageMapping[toothId];
        }
      }
    });
  };

  // root end here

  // supara start here

  const toothsuparaImageMapping = {
    18: suparaT1,
    17: suparaT2,
    16: suparaT3,
    15: suparaT4,
    14: suparaT5,
    13: suparaT6,
    12: suparaT7,
    11: suparaT8,
    21: suparaT9,
    22: suparaT10,
    23: suparaT11,
    24: suparaT12,
    25: suparaT13,
    26: suparaT14,
    27: suparaT15,
    28: suparaT16,
    48: suparaT17,
    47: suparaT18,
    46: suparaT19,
    45: suparaT20,
    44: suparaT21,
    43: suparaT22,
    42: suparaT23,
    41: suparaT24,
    31: suparaT25,
    32: suparaT26,
    33: suparaT27,
    34: suparaT28,
    35: suparaT29,
    36: suparaT30,
    37: suparaT31,
    38: suparaT32,
  };

  const supara = () => {
    let updatedDisease;
    setInputItem((prevInputItem) => ({
      ...prevInputItem,
      desease: prevInputItem.desease === "Supra Erupted" ? "" : "Supra Erupted",
    }));
    // Additional logic here if needed
    inputItem.selectTeeth.forEach((toothId) => {
      const toothElement = document.getElementById(`tooth_${toothId}`);
      if (toothElement) {
        if (inputItem.desease && inputItem.desease.includes("Supra Erupted")) {
          toothElement.src = toothDefaultMapping[toothId];
        } else {
          toothElement.src = toothsuparaImageMapping[toothId];
        }
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
        "https://dentalgurudoctor.doaguru.com/api/doctor/insertTimelineEvent",
        {
          type: "Examiantion",
          description: "Add Teeth DentalX",
          branch: branch,
          patientId: getPatientData.length > 0 ? getPatientData[0].uhid : "",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const getPatientDetail = async () => {
    try {
      const res = await axios.get(
        `https://dentalgurudoctor.doaguru.com/api/doctor/getAppointmentsWithPatientDetailsById/${tpid}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const uhid = res.data.result.length > 0 ? res.data.result[0].uhid : null;
      setInputItem((prevInputItem) => ({
        ...prevInputItem,
        patient_uhid: uhid,
      }));

      setGetPatientData(res.data.result);
      console.log(res.data.result[0].uhid);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPatientDetail();
  }, []);

  const formData = {
    appointment_id: id,
    tpid: tpid,
    branch: branch,
    patient_uhid: getPatientData[0]?.uhid,
    selectedTeeth: inputItem.selectTeeth.join(", "),
    disease: inputItem.desease,
    chiefComplain: inputItem.chiefComplain,
    advice: inputItem.advice,
    onExamination: inputItem.onExamination,
    diagnosis_category: dcat,
  };

  console.log(formData);
  const handleSave = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://dentalgurudoctor.doaguru.com/api/doctor/dentalPediatric",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      cogoToast.success("data saved");
      dispatch(toggleTableRefresh());
      timelineForExamination();
      setInputItem({
        appointment_id: id,
        selectTeeth: [],
        desease: "",
        chiefComplain: "",
        advice: "",
        onExamination: "",
      });
      setTimeout(() => {
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach((checkbox) => {
          checkbox.checked = false;
        });
      });

      setSelectedTeeth([]);
      // window.location.reload();
    } catch (error) {
      console.error("Error:", error);
      cogoToast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    setInputItem((prevState) => ({
      ...prevState,
      selectTeeth: selectedTeeth,
    }));
  }, [selectedTeeth]);

  const handleRedirect = (e) => {
    if (isFormFilled) {
      e.preventDefault(); // Prevent the default redirection behavior
      cogoToast.info("You cannot navigate away while the form is filled.");
    } else {
      navigate(`/ExaminationDashBoardPediatric/${id}`);
    }
  };

  const handleSaveContinue = () => {
    // navigate(`/TreatmentDashBoard/${id}`);
    navigate(`/treatmentSuggestion/${id}`);
  };

  return (
    <>
      <Wrapper>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 text-start p-3">
              <button
                className="btn btn-secondary"
                onClick={() => window.history.back()}
              >
                <GiFastBackwardButton size={21} />
              </button>
              {/* <button
                className="btn btn-info text-light"
                onClick={handleRedirect}
              >
                Pediatric Dental-X Chart
              </button> */}
            </div>
          </div>
          <div className="row shadow-sm p-3 mb-3 bg-body rounded patient">
            {getPatientData.map((item, index) => (
              <>
                <div key={index} className="col-lg-12">
                  <div className="row">
                    <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6 col-6">
                      <p>
                        <strong>Treatment PID</strong> : {tpid}
                      </p>
                    </div>
                    <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6 col-6">
                      <p>
                        <strong>Patient Name</strong> : {item.patient_name}
                      </p>
                    </div>
                    <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6 col-6">
                      <p>
                        <strong>Patient Mobile No.</strong> : {item.mobileno}
                      </p>
                    </div>
                  </div>
                </div>
                <div key={index + "secondRow"} className="col-lg-12">
                  <div className="row">
                    <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6 col-6">
                      <p className="mb-0">
                        <strong>Blood Group</strong> : {item.bloodgroup}
                      </p>
                    </div>
                    <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6 col-6">
                      <p className="mb-0">
                        <strong>Disease</strong> : {item.disease}
                      </p>
                    </div>
                    <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6 col-6">
                      <p className="mb-0">
                        <strong>Allergy</strong> : {item.allergy}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            ))}
          </div>
          {/* dental chart 32 teeth start */}
          {isLoading ? (
            <div>
              <div className="text-center">
                <RiLoader2Fill size={45} className="spin" />
              </div>
            </div>
          ) : (
            <>
              <div className="row">
                <div className="col-lg-12 col-12">
                  <div className="d-flex justify-content-center">
                    <div>
                      <img
                        src={teeth18}
                        id="tooth_18"
                        alt=""
                        className="img-fluid"
                      />
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
                      <img
                        src={teeth17}
                        alt=""
                        id="tooth_17"
                        className="img-fluid"
                      />
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
                      <img
                        src={teeth16}
                        alt=""
                        id="tooth_16"
                        className="img-fluid"
                      />
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
                      <img
                        src={teeth15}
                        alt=""
                        id="tooth_15"
                        className="img-fluid"
                      />
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
                      <img
                        src={teeth14}
                        alt=""
                        id="tooth_14"
                        className="img-fluid"
                      />
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
                      <img
                        src={teeth13}
                        alt=""
                        id="tooth_13"
                        className="img-fluid"
                      />
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
                      <img
                        src={teeth12}
                        alt=""
                        id="tooth_12"
                        className="img-fluid"
                      />
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
                      <img
                        src={teeth11}
                        alt=""
                        id="tooth_11"
                        className="img-fluid"
                      />
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
                      <img
                        src={teeth21}
                        alt=""
                        id="tooth_21"
                        className="img-fluid"
                      />
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
                      <img
                        src={teeth22}
                        alt=""
                        id="tooth_22"
                        className="img-fluid"
                      />
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
                      <img
                        src={teeth23}
                        alt=""
                        id="tooth_23"
                        className="img-fluid"
                      />
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
                      <img
                        src={teeth24}
                        alt=""
                        id="tooth_24"
                        className="img-fluid"
                      />
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
                      <img
                        src={teeth25}
                        alt=""
                        id="tooth_25"
                        className="img-fluid"
                      />
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
                      <img
                        src={teeth26}
                        alt=""
                        id="tooth_26"
                        className="img-fluid"
                      />
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
                      <img
                        src={teeth27}
                        alt=""
                        id="tooth_27"
                        className="img-fluid"
                      />
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
                      <img
                        src={teeth28}
                        alt=""
                        id="tooth_28"
                        className="img-fluid"
                      />
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
                      <img
                        src={teeth48}
                        alt=""
                        id="tooth_48"
                        className="img-fluid"
                      />
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
                      <img
                        src={teeth47}
                        alt=""
                        id="tooth_47"
                        className="img-fluid"
                      />
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
                      <img
                        src={teeth46}
                        alt=""
                        id="tooth_46"
                        className="img-fluid"
                      />
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
                      <img
                        src={teeth45}
                        alt=""
                        id="tooth_45"
                        className="img-fluid"
                      />
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
                      <img
                        src={teeth44}
                        alt=""
                        id="tooth_44"
                        className="img-fluid"
                      />
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
                      <img
                        src={teeth43}
                        alt=""
                        id="tooth_43"
                        className="img-fluid"
                      />
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
                      <img
                        src={teeth42}
                        alt=""
                        id="tooth_42"
                        className="img-fluid"
                      />
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
                      <img
                        src={teeth41}
                        alt=""
                        id="tooth_41"
                        className="img-fluid"
                      />
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
                      <img
                        src={teeth31}
                        alt=""
                        id="tooth_31"
                        className="img-fluid"
                      />
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
                      <img
                        src={teeth32}
                        alt=""
                        id="tooth_32"
                        className="img-fluid"
                      />
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
                      <img
                        src={teeth33}
                        alt=""
                        id="tooth_33"
                        className="img-fluid"
                      />
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
                      <img
                        src={teeth34}
                        alt=""
                        id="tooth_34"
                        className="img-fluid"
                      />
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
                      <img
                        src={teeth35}
                        alt=""
                        id="tooth_35"
                        className="img-fluid"
                      />
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
                      <img
                        src={teeth36}
                        alt=""
                        id="tooth_36"
                        className="img-fluid"
                      />
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
                      <img
                        src={teeth37}
                        alt=""
                        id="tooth_37"
                        className="img-fluid"
                      />
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
                      <img
                        src={teeth38}
                        alt=""
                        id="tooth_38"
                        className="img-fluid"
                      />
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
            </>
          )}
          {/* dental chart 32 teeth end */}

          <div className="row mt-5">
            <div className="col-xxl-10 col-xl-10 col-lg-10 col-md-9 col-sm-9 col-9 bodyteeth">
              <div className="text-center">
                <button
                  onClick={handleClick}
                  className=" btn btn-info text-light mx-2"
                >
                  {selectAllTeeth ? "Unselect All" : "Select All"}
                </button>
                {/* <button
                  onClick={() => window.location.reload()}
                  className="btn btn-info text-light mx-2"
                >
                  Reload
                </button> */}
              </div>
              <div>
                <form onSubmit={handleSave}>
                  <input
                    type="hidden"
                    name="appointment_id"
                    value={inputItem.appointment_id}
                    id="form3Example1"
                    class="form-control"
                  />
                  <div class="row mt-3">
                    <div class="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
                      <div data-mdb-input-init class="form-outline">
                        <label className="lable">Select Teeth</label>
                        <input
                          type="text"
                          id="form8Example1"
                          className="form-control input1"
                          placeholder="Selected Teeth Number"
                          readOnly
                          required
                          //   value={selectedTeeth.join(", ")}
                          value={inputItem.selectTeeth.join(", ")}
                          // onChange={handleSelecteditem}
                        />
                      </div>
                    </div>
                    <div class="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
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
                          required
                          className="form-control input1"
                        />
                      </div>
                    </div>
                  </div>

                  <hr />

                  <div class="row">
                    <div class="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6 col-6">
                      <div data-mdb-input-init class="form-outline">
                        <label className="lable">Cheif Complaint</label>
                        <input
                          type="text"
                          name="chiefComplain"
                          onChange={handleSelecteditem}
                          value={inputItem.chiefComplain}
                          required
                          id="form8Example3"
                          class="form-control"
                          placeholder="Cheif Complaints"
                        />
                      </div>
                    </div>
                    <div class="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6 col-6">
                      <div data-mdb-input-init class="form-outline">
                        <label className="lable">Advice</label>
                        <input
                          type="text"
                          id="form8Example4"
                          name="advice"
                          required
                          onChange={handleSelecteditem}
                          value={inputItem.advice}
                          class="form-control"
                          placeholder="Advice"
                        />
                      </div>
                    </div>
                    <div class="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6 col-6">
                      <div data-mdb-input-init class="form-outline">
                        <label className="lable">Examination</label>
                        <input
                          type="text"
                          id="form8Example5"
                          name="onExamination"
                          onChange={handleSelecteditem}
                          required
                          value={inputItem.onExamination}
                          class="form-control"
                          placeholder="Examination"
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
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-3 col-sm-3 col-3 bodybutton">
              <div className="d-flex flex-column text-center">
                <div
                  onClick={inputItem.selectTeeth.length > 0 ? caries : crNull}
                  className="p-2  diseaseMain"
                >
                  <img
                    src={cariesbtn}
                    alt="caries"
                    className="buttons shadow-sm bg-body rounded"
                  />
                </div>
                <div
                  onClick={inputItem.selectTeeth.length > 0 ? fracture : crNull}
                  className="p-2 diseaseMain "
                >
                  <img
                    src={fracturebtn}
                    alt="fracture"
                    className="buttons shadow-sm bg-body rounded"
                  />
                </div>
                <div
                  onClick={inputItem.selectTeeth.length > 0 ? impacted : crNull}
                  className="p-2 diseaseMain"
                >
                  <img
                    src={impactedbtn}
                    alt="impacted"
                    className="buttons shadow-sm bg-body rounded"
                  />
                </div>
                <div
                  onClick={inputItem.selectTeeth.length > 0 ? missing : crNull}
                  className="p-2 diseaseMain"
                >
                  <img
                    src={missingbtn}
                    alt="missing"
                    className="buttons shadow-sm bg-body rounded"
                  />
                </div>
                <div
                  onClick={inputItem.selectTeeth.length > 0 ? mobility : crNull}
                  className="p-2 diseaseMain"
                >
                  <img
                    src={mobilitybtn}
                    alt="mobility"
                    className="buttons shadow-sm bg-body rounded"
                  />
                </div>
                <div
                  onClick={
                    inputItem.selectTeeth.length > 0 ? periapical : crNull
                  }
                  className="p-2 diseaseMain"
                >
                  <img
                    src={periapicalbtn}
                    alt="periapical"
                    className="buttons shadow-sm bg-body rounded"
                  />
                </div>
                <div
                  onClick={inputItem.selectTeeth.length > 0 ? root : crNull}
                  className="p-2 diseaseMain"
                >
                  <img
                    src={rootbtn}
                    alt="root"
                    className="buttons shadow-sm bg-body rounded"
                  />
                </div>
                <div
                  onClick={inputItem.selectTeeth.length > 0 ? supara : crNull}
                  className="p-2 diseaseMain"
                >
                  <img
                    src={suparabtn}
                    alt="supara"
                    className="buttons shadow-sm bg-body rounded"
                  />
                </div>
              </div>
            </div>
            <div>
              <SaveData id={id} tpid={tpid} />
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default ExaminationPatientTest;
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

  .patient {
    @media screen and (min-width: 768px) and (max-width: 1023px) {
      width: 100%;
      margin-left: 0rem;
    }
    @media screen and (min-width: 480px) and (max-width: 768px) {
      width: 100%;
      margin-left: 0rem;
    }
  }
  .setTeeth1 {
    @media screen and (min-width: 480px) and (max-width: 768px) {
      width: 37rem;
      margin-left: 3.2rem;
    }
  }
  .headButton {
    @media screen and (min-width: 480px) and (max-width: 768px) {
      width: 37rem;
      margin-left: 3.2rem;
    }
  }
  .bodyteeth {
    @media screen and (min-width: 480px) and (max-width: 768px) {
      /* width: 37rem; */
      margin-left: 0rem;
    }
  }
  .bodybutton {
    @media screen and (min-width: 480px) and (max-width: 768px) {
      /* width: 100%; */
      margin-left: 0rem;
    }
  }
  .lable {
    font-size: 1.3rem;
    font-weight: 500;
    font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS",
      sans-serif;
    padding-left: 0.9rem;
  }
  .diseaseMain .teethDisease {
    @media screen and (min-width: 992px) and (max-width: 1080px) {
      width: 125px;
    }
    @media screen and (min-width: 769px) and (max-width: 914px) {
      width: 105px;
    }
  }
`;
