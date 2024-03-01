import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { Modal, Button } from 'react-bootstrap';


function AddPatient() {

    
  const  [formdata,setFormData ] = useState({})
 
  const [searchQuery, setSearchQuery] = useState("");
  const [searchDoctor, setSearchDoctor] = useState("");
  const [showDoctorList,setShowDoctorList] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null); // State to store the selected patient
  const [selectedDoctor, setSelectedDoctor] = useState(null); // State to store the selected Doctor
  const [selectedTreatment, setSelectedTreatment] = useState([]);

  const [selectedDisease, setSelectedDisease] = useState([]);
  const [inputDisease, setInputDisease] = useState('');

  const disease = [
    { value: 'NoDisease', label: 'No disease' },
    { value: 'Diabetes', label: 'Diabetes' },
    { value: 'Heart', label: 'Heart' },
    { value: 'Cardiovascular', label: 'Cardiovascular' },
    { value: 'Asthma', label: 'Asthma' },
    { value: 'Arthritis', label: 'Arthritis' },
    { value: 'Osteoporosis', label: 'Osteoporosis' },
    { value: 'Thyroid', label: 'Thyroid' },
    { value: 'Kidney', label: 'Kidney' },
    { value: 'Liver', label: 'Liver' },
    { value: 'Gastrointestinal', label: 'Gastrointestinal' },
    { value: 'Cancer', label: 'Cancer' },
    { value: 'Depression', label: 'Depression' },
    { value: 'Anxiety', label: 'Anxiety' },
    { value: "Alzheimer's", label: "Alzheimer's" },
    { value: 'HIV', label: 'HIV' },
    { value: 'Hepatitis', label: 'Hepatitis' },
    
  ];



  const treatments = [
    { value: 'OPD', label: 'OPD' },
    { value: 'Dental Cleanings', label: 'Dental Cleanings' },
    { value: 'Dental Examinations', label: 'Dental Examinations' },
    { value: 'Dental Sealants', label: 'Dental Sealants' },
    { value: 'Fluoride Treatments', label: 'Fluoride Treatments' },
    { value: 'Crowns (Caps)', label: 'Crowns (Caps)' },
    { value: 'Bridges', label: 'Bridges' },
    { value: 'Dentures (Partial or Full)', label: 'Dentures (Partial or Full)' },
    { value: 'Dental Implants', label: 'Dental Implants' },
    { value: 'Root Canal Treatment (RCT)', label: 'Root Canal Treatment (RCT)' },
    { value: 'Root Canal Retreatment (Re-Root Canal)', label: 'Root Canal Retreatment (Re-Root Canal)' },
    { value: 'Apicoectomy (Endodontic Surgery)', label: 'Apicoectomy (Endodontic Surgery)' },
    { value: 'Scaling and Root Planing (Deep Cleaning)', label: 'Scaling and Root Planing (Deep Cleaning)' },
    { value: 'Periodontal Maintenance', label: 'Periodontal Maintenance' },
    { value: 'Gum Graft Surgery', label: 'Gum Graft Surgery' },
    { value: 'Periodontal Flap Surgery', label: 'Periodontal Flap Surgery' },
    { value: 'Teeth Whitening (Bleaching)', label: 'Teeth Whitening (Bleaching)' },
    { value: 'Dental Bonding', label: 'Dental Bonding' },
    { value: 'Porcelain Veneers', label: 'Porcelain Veneers' },
    { value: 'Inlays and Onlays', label: 'Inlays and Onlays' },
    { value: 'Orthodontic Treatments (Braces, Clear Aligners)', label: 'Orthodontic Treatments (Braces, Clear Aligners)' },
    { value: 'Tooth Extractions (Simple and Surgical)', label: 'Tooth Extractions (Simple and Surgical)' },
    { value: 'Wisdom Tooth Extraction', label: 'Wisdom Tooth Extraction' },
    { value: 'Dental Implant Surgery', label: 'Dental Implant Surgery' },
    { value: 'Jaw Surgery (Orthognathic Surgery)', label: 'Jaw Surgery (Orthognathic Surgery)' },
    { value: 'Complete Dentures', label: 'Complete Dentures' },
    { value: 'Partial Dentures', label: 'Partial Dentures' },
    { value: 'Dental Bridges', label: 'Dental Bridges' },
    { value: 'Dental Implant Restorations', label: 'Dental Implant Restorations' },
    { value: 'Dental Sealants', label: 'Dental Sealants' },
    { value: 'Fluoride Treatments', label: 'Fluoride Treatments' },
    { value: 'Pediatric Dental Cleanings', label: 'Pediatric Dental Cleanings' },
    { value: 'Dental Fillings for Children', label: 'Dental Fillings for Children' },
    { value: 'Traditional Braces', label: 'Traditional Braces' },
    { value: 'Clear Aligners (Invisalign, ClearCorrect)', label: 'Clear Aligners (Invisalign, ClearCorrect)' },
    { value: 'Retainers', label: 'Retainers' },
    { value: 'Orthodontic Appliances', label: 'Orthodontic Appliances' },
    { value: 'Treatment for Dental Trauma', label: 'Treatment for Dental Trauma' },
    { value: 'Emergency Tooth Extractions', label: 'Emergency Tooth Extractions' },
    { value: 'Pain Management', label: 'Pain Management' },
    { value: 'Temporary Dental Repairs', label: 'Temporary Dental Repairs' }
];


const handleChangeDisease = (newValue, actionMeta) => {
  
  setSelectedDisease(newValue);
  if (actionMeta.action === 'create-option') {
    // If a new option is created, add it to the list of options
    const newOption = { value: newValue[newValue.length - 1].value, label: newValue[newValue.length - 1].label };
    disease.push(newOption);
  }
};



  // const handleChangeDisease = (selectedOptions) => {
  //   setSelectedDisease(selectedOptions.map(option => option.value));
  // };

  const handleChangeTreatment = (selectedOption) => {
    setSelectedTreatment(selectedOption.value);
  };


  
  const [data,setData] = useState(
    { uid :"1", patient_Name:"",mobile: "",email: "",gender: "", contact_Person : "" , contact_Person_Name: "", blood_Group : "" , dob : "", age : "",weight:"",allergy:"",disease:"", patientType:"", status:"",doctorId:"",doctor_name:"",appDateTime:"",treatment:"",notes:"",  address: ""}
    
  ) 


  const [bookData,setBookData] = useState({
    patient_uid :"", patient_Name:"",status:"",doctorId:"",doctor_name:"",appDateTime:"",treatment:"",notes:"",
  }) 

  const doctors = [
    { uid :"1", doctor_name:"Dr Umer Qureshi",department:"ortho", mobile: "9806324245", email:"doctor@gmail.com",gender:"Male",address:"Ranital Gate no.4 Jabalpur", morningStartTiming:"10:00" ,morningEndTiming:"14:00",eveningStartTiming:"18:00" ,eveningEndTiming:"21:00",  scheduleBlockDays:"20/02/2024",lunchTime: ""},
    { uid :"10", doctor_name:"Dr Rajiv",department:"ortho", mobile: "9806324245", email:"doctor@gmail.com",gender:"Male",address:"Ranital Gate no.4 Jabalpur" ,morningStartTiming:"10:00" ,morningEndTiming:"12:00",eveningStartTiming:"18:00" ,eveningEndTiming:"22:00", scheduleBlockDays:"02/02/2024",lunchTime: ""},
    { uid :"2", doctor_name:"Dr Ajay",department:"ortho", mobile: "9806324245", email:"doctor@gmail.com",gender:"Male",address:"Ranital Gate no.4 Jabalpur" ,morningStartTiming:"10:00" ,morningEndTiming:"18:00",eveningStartTiming:"10:00" ,eveningEndTiming:"18:00", scheduleBlockDays:"02/02/2024",lunchTime: ""},
    { uid :"4", doctor_name:"Dr Ajay",department:"ortho", mobile: "9806324245", email:"doctor@gmail.com",gender:"Male",address:"Ranital Gate no.4 Jabalpur" ,morningStartTiming:"10:00" ,morningEndTiming:"18:00",eveningStartTiming:"10:00" ,eveningEndTiming:"18:00", scheduleBlockDays:"02/04/2024",lunchTime: ""},
    { uid :"5", doctor_name:"Dr Ajay",department:"ortho", mobile: "9806324245", email:"doctor@gmail.com",gender:"Male",address:"Ranital Gate no.4 Jabalpur" ,morningStartTiming:"10:00" ,morningEndTiming:"18:00",eveningStartTiming:"10:00" ,eveningEndTiming:"18:00", scheduleBlockDays:"02/04/2024",lunchTime: ""},
    { uid :"6", doctor_name:"Dr Ajay",department:"ortho", mobile: "9806324245", email:"doctor@gmail.com",gender:"Male",address:"Ranital Gate no.4 Jabalpur" ,morningStartTiming:"10:00" ,morningEndTiming:"18:00",eveningStartTiming:"10:00" ,eveningEndTiming:"18:00", scheduleBlockDays:"02/04/2024",lunchTime: ""},
    { uid :"7", doctor_name:"Dr Ajay",department:"ortho", mobile: "9806324245", email:"doctor@gmail.com",gender:"Male",address:"Ranital Gate no.4 Jabalpur" ,morningStartTiming:"10:00" ,morningEndTiming:"18:00",eveningStartTiming:"10:00" ,eveningEndTiming:"18:00", scheduleBlockDays:"02/04/2024",lunchTime: ""},
    { uid :"8", doctor_name:"Dr Ajay",department:"ortho", mobile: "9806324245", email:"doctor@gmail.com",gender:"Male",address:"Ranital Gate no.4 Jabalpur" ,morningStartTiming:"10:00" ,morningEndTiming:"18:00",eveningStartTiming:"10:00" ,eveningEndTiming:"18:00", scheduleBlockDays:"20/02/2024",lunchTime: ""}
    

  ];

  const [appointment_data,setAppointmentData] = useState([
    { uid :"1", patient:"Mohit Shau",doctorId:"1", doctor:"Dr Umer Qureshi",mobile: "9806324245", treatment:"root canal",timing:"2024-02-17T10:45",status:"Missed",action:"edit"},
    { uid :"1", patient:"Mohit Shau", doctorId:"1",doctor:"Dr Umer Qureshi",mobile: "9806324245", treatment:"root canal",timing:"2024-02-17T10:00",status:"Missed",action:"edit"},
    { uid :"1", patient:"Mohit Shau", doctorId:"1" ,doctor:"Dr Umer Qureshi",mobile: "9806324245", treatment:"root canal",timing:"2024-02-17T11:30",status:"Missed",action:"edit"},
    { uid :"1", patient:"Mohit Shau",doctorId:"2", doctor:"Dr Ajay",mobile: "9806324245", treatment:"root canal",timing:"2024-02-17T12:30",status:"Missed",action:"edit"},
    { uid :"1", patient:"Mohit Shau",doctorId:"1", doctor:"Dr Umer Qureshi",mobile: "9806324245", treatment:"root canal",timing:"2024-02-17T12:45",status:"Missed",action:"edit"},
    { uid :"1", patient:"Mohit Shau",doctorId:"2", doctor:"Dr Ajay",mobile: "9806324245", treatment:"root canal",timing:"2024-02-18T10:45",status:"Missed",action:"edit"},
    { uid :"1", patient:"Mohit Shau",doctorId:"1", doctor:"Dr Umer Qureshi",mobile: "9806324245", treatment:"root canal",timing:"2024-02-18T12:00",status:"Missed",action:"edit"},
    { uid :"1", patient:"Mohit Shau",doctorId:"1", doctor:"Dr Umer Qureshi",mobile: "9806324245", treatment:"root canal",timing:"2024-02-18T13:00",status:"Missed",action:"edit"},
    { uid :"1", patient:"Mohit Shau",doctorId:"2", doctor:"Dr Ajay",mobile: "9806324245", treatment:"root canal",timing:"2024-02-18T13:00",status:"Missed",action:"edit"},
    { uid :"1", patient:"Mohit Shau",doctorId:"1", doctor:"Dr Umer Qureshi",mobile: "9806324245", treatment:"root canal",timing:"2024-02-17T15:00",status:"Missed",action:"edit"},
    

    
  ]);

  const [patients, setPatients] = useState([
    {
      uid: "1",
      patient_Name: "Mohit sahu",
      mobile: "9806324245",
      email: "patinet@gmail.com",
      gender: "Male",
      contact_Person: "father",
      contact_Person_Name: "rahul",
      blood_Group: "o+",
      dob: "",
      age: "25",
      address: "Ranital gate no. 4 , jabalpur",
    },
    {
      uid: "2",
      patient_Name: "Rahul sahu",
      mobile: "9806324245",
      email: "patinet@gmail.com",
      gender: "Male",
      contact_Person: "father",
      contact_Person_Name: "rahul",
      blood_Group: "o+",
      dob: "",
      age: "25",
      address: "Ranital gate no. 4 , jabalpur",
    },
    {
      uid: "3",
      patient_Name: "dev",
      mobile: "9806324245",
      email: "patinet@gmail.com",
      gender: "Male",
      contact_Person: "father",
      contact_Person_Name: "rahul",
      blood_Group: "o+",
      dob: "",
      age: "25",
      address: "Ranital gate no. 4 , jabalpur",
    },
    {
      uid: "3",
      patient_Name: "dev",
      mobile: "9806324245",
      email: "patinet@gmail.com",
      gender: "Male",
      contact_Person: "father",
      contact_Person_Name: "rahul",
      blood_Group: "o+",
      dob: "",
      age: "25",
      address: "Ranital gate no. 4 , jabalpur",
    },
    {
      uid: "3",
      patient_Name: "dev",
      mobile: "9806324245",
      email: "patinet@gmail.com",
      gender: "Male",
      contact_Person: "father",
      contact_Person_Name: "rahul",
      blood_Group: "o+",
      dob: "",
      age: "25",
      address: "Ranital gate no. 4 , jabalpur",
    },
    {
      uid: "3",
      patient_Name: "dev",
      mobile: "9806324245",
      email: "patinet@gmail.com",
      gender: "Male",
      contact_Person: "father",
      contact_Person_Name: "rahul",
      blood_Group: "o+",
      dob: "",
      age: "25",
      address: "Ranital gate no. 4 , jabalpur",
    },
   
    
  ]);

  

console.log(selectedDoctor)

  const [filteredPatients, setFilteredPatients] = useState([]);
  const [filteredDoctor,setFilteredDoctor] = useState([]);

  // useEffect(() => {
  //   // Filter patients based on the search query
  //   const filtered = patients.filter((patient) =>
  //     data.patient_Name.toLowerCase().includes(searchQuery.toLowerCase())
  //   );
  //   setFilteredPatients(filtered);
  // }, [searchQuery, patients]);

  useEffect(() => {
    // Filter patients based on the search query if there's a search query, otherwise set an empty array
    const filtered = searchQuery
      ? patients.filter((patient) =>
          patient.patient_Name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : [];
    setFilteredPatients(filtered);
  }, [searchQuery, patients]);

 
  useEffect(() => {
    // Filter patients based on the search query if there's a search query, otherwise set an empty array
    const filtered = showDoctorList
      ? doctors.filter((doctor) =>
          doctor.doctor_name.toLowerCase().includes(searchDoctor.toLowerCase())
        )
      : [];
    setFilteredDoctor(filtered);
  }, [searchDoctor]);

  const handleSearchDoctor = (e) => {
    setShowDoctorList(true)
    setSearchDoctor(e.target.value);
  };


  console.log(bookData)

  console.log(appointment_data)

  useEffect(()=>{
    const calculateAge = (date) => {
      const dob = new Date(date);
      const now = new Date();
      let years = now.getFullYear() - dob.getFullYear();
      
      // Adjust for leap years
      const dobThisYear = new Date(now.getFullYear(), dob.getMonth(), dob.getDate());
      if (now < dobThisYear) {
        years--;
      }
      
      setData({...data, age: years});
    };
    calculateAge(data.dob);
  },[data.dob])
  
  const handleChange = (e)=>{
      const {name,value} = e.target;
      setData({
        ...data,
        [name]: value
      });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Check if the selected doctor is null
    if (!selectedDoctor) {
      console.log("Please select a doctor");
      return;
    }

     // Convert appointment time to Date object
  const selectedDateTime = new Date(data.appDateTime);

  // Check if the selected doctor is available during the appointment time
  const isDoctorAvailable = (selectedDateTime) => {
    const morningStart = new Date(selectedDateTime);
    morningStart.setHours(selectedDoctor.morningStartTiming.split(":")[0], selectedDoctor.morningStartTiming.split(":")[1]);
    const morningEnd = new Date(selectedDateTime);
    morningEnd.setHours(selectedDoctor.morningEndTiming.split(":")[0], selectedDoctor.morningEndTiming.split(":")[1]);
    const eveningStart = new Date(selectedDateTime);
    eveningStart.setHours(selectedDoctor.eveningStartTiming.split(":")[0], selectedDoctor.eveningStartTiming.split(":")[1]);
    const eveningEnd = new Date(selectedDateTime);
    eveningEnd.setHours(selectedDoctor.eveningEndTiming.split(":")[0], selectedDoctor.eveningEndTiming.split(":")[1]);

    return (
      (selectedDateTime >= morningStart && selectedDateTime <= morningEnd) ||
      (selectedDateTime >= eveningStart && selectedDateTime <= eveningEnd)
    );
  };

  // if (!isDoctorAvailable(selectedDateTime)) {
  //   // Doctor is not available at the specified time
  //   alert("The selected doctor is not available at the specified time");
  //   console.log("The selected doctor is not available at the specified time");
  //   return;
  // }


  

   
    const isSlotAvailable = appointment_data.every((appointment) => {
      // Check if the appointment is for the selected doctor and if it falls within the same datetime range
      const appointmentDate = new Date(appointment.timing);
      const selectedDate = new Date(data.appDateTime);
      
      return !(appointment.doctorId === selectedDoctor.uid && appointmentDate.getTime() === selectedDate.getTime());
    });

    console.log(isSlotAvailable)
  
    if (isSlotAvailable) {
      // Slot is available, proceed with booking
      const newPatient = {
        uid: (patients.length + 1).toString(), // Generate a unique ID (you might need a better way to generate unique IDs)
        patient_Name: data.patient_Name,
        mobile: data.mobile,
        email: data.email,
        gender: data.gender,
        contact_Person: data.contact_Person,
        contact_Person_Name: data.contact_Person_Name,
        blood_Group: data.blood_Group,
        dob: data.dob,
        age: data.age,
        address: data.address,
        weight: data.weight,
        allergy: data.allergy,
        disease: selectedDisease.map((option) => option.value),
        patientType: data.patientType,
        doctorId: selectedDoctor.uid,
        doctor_name: selectedDoctor.doctor_name,
        appDateTime: data.appDateTime,
        treatment: selectedTreatment,
        notes: data.notes,
      };

      if (!isDoctorAvailable(selectedDateTime)) {
        // Doctor is not available at the specified time


        const confirmation = window.confirm("The selected doctor is not available at the specified time. Do you want to proceed with booking?");
        if (!confirmation) {
          return; // If the user cancels, return early
        }

   
        
        
      }
  
      setPatients([...patients, newPatient]);
      setAppointmentData([...appointment_data,newPatient]);
  
      // Reset form data
      setData({
        patient_Name: "",
        mobile: "",
        email: "",
        gender:"",
        contact_Person: "",
        contact_Person_Name: "",
        blood_Group: "",
        dob: "",
        age: "",
        address: "",
        weight: "",
        allergy: "",
        disease: "",
        patientType: "",
        doctorId: "",
        doctor_name: "",
        appDateTime: "",
        treatment: "",
        notes: "",
      });
  
      // Reset selected doctor
      // setSelectedDoctor(null);
  
      console.log("Appointment booked successfully!");
      alert("Appointment booked successfully!");
    } else {
      // Slot is not available
      alert("The selected doctor's slot is already booked at the specified time");
      console.log("The selected doctor's slot is already booked at the specified time");
    }
  };




const handleDoctorSelect = (doctor) => {
  setSelectedDoctor(doctor); // Set the selected patient when it's clicked
  setShowDoctorList(false)
  setSearchDoctor(doctor.doctor_name); // Reset the search query to close the search list
};


  console.log(filteredDoctor)
  console.log(selectedDoctor)


  const handleBookChange = (e)=>{
    const {name,value} = e.target;
    setBookData({
      ...bookData,
      [name]: value
    });
}
 
  return (
    <Wrapper>
      
                <form onSubmit={handleSubmit}>
                <ul className="list-group">
                  <li className="list-group-item">
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="form-outline" id="form1">
                          <label className="form-label" for="form6Example1">
                            Patient name
                          </label>
                          <input
                            type="text"
                            id="form6Example1"
                            className="form-control"
                            name="patient_Name"
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-sm-6 ">
                        <div className="form-outline">
                        <label className="form-label" htmlFor="">Gender</label>
    <select className="form-select" id="gender" name="gender"  required onChange={handleChange}>
      <option value="">Select Gender</option>
      <option value="Male">Male</option>
      <option value="Female">Female</option>
      <option value="Other">Other</option>
     
    </select>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-outline">
                          <label className="form-label" for="form6Example1">
                            Moblie
                          </label>
                          <input
                            required
                            type="text"
                            className="form-control"
                            name="mobile"
                            placeholder=""
                            maxLength={10}
                            minLength={10}
                            onChange={handleChange}

                          />
                        </div>
                      </div>
                   
                    
                  
                      <div className="col-sm-6">
                        <div className="form-outline" id="form1">
                          <label className="form-label" for="form6Example2">
                            Email
                          </label>
                          <input
                            type="email"
                            id="form6Example2"
                            className="form-control"
                            name="city"
                            onChange={handleChange}
                          
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-outline">
                          <label className="form-label" for="form6Example1">
                            Address
                          </label>
                          <input
                            type="text"
                            id="form6Example1"
                            className="form-control"
                            name="address"
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-outline">
                        <label className="form-label" htmlFor="">Contact Person</label>
    <select className="form-select" id="contact_Person" name="contact_Person"  required onChange={handleChange}>
      <option value="">Select</option>
      <option value="Self">Self</option>
      <option value="Father">Father</option>
      <option value="Mother">Mother</option>
      <option value="Husband">Husband</option>
      <option value="Wife">Wife</option>
      <option value="Son">Son</option>
      <option value="Daughter">Daughter</option>
      <option value="Other">Other</option>
     
    </select>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-outline">
                        <label className="form-label" htmlFor="">Blood Group</label>
    <select className="form-select" id="blood_Group" name="blood_Group" onChange={handleChange}>
      <option value="">Select</option>
      <option value="A+">A+</option>
      <option value="B+">B+</option>
      <option value="O+">O+</option>
      <option value="AB+">AB+</option>
      <option value="A-">A-</option>
      <option value="B-">B-</option>
      <option value="O-">O-</option>
      <option value="AB-">AB-</option>
     
    </select>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-outline">
                          <label className="form-label" for="form6Example2">
                            Cont. Per. Name
                          </label>
                          <input
                            type="text"
                            id="contact_Person_Name"
                            name="contact_Person_Name"
                            className="form-control"
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-outline">
                          <label
                            className="form-label"
                            for="form6Example1"
                            
                          >
                            Date of Birth
                          </label>
                          <input
                            type="date"
                            id="form6Example1"
                            className="form-control"
                            name="dob"
                            
                            onChange={(e) => {
                              handleChange(e)
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-outline">
                          <label className="form-label" for="form6Example2">
                            Age
                          </label>

                          <input
                            type="text"
                            id="form6Example2"
                            className="form-control"
                            name="age"
                            onChange={handleChange}
                            value={data.age ? data.age : ""}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-outline">
                          <label className="form-label" for="form6Example2">
                            Weight
                          </label>

                          <input
                            type="text"
                            id="form6Example2"
                            className="form-control"
                            name="weight"
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-outline">
                          <label className="form-label" for="form6Example2">
                         Have any allergy
                          </label>

                          <input
                            type="text"
                            id="form6Example2"
                            className="form-control"
                            name="allergy"
                            onChange={handleChange}
                        
                          />
                        </div>
                      </div>
                     
                      <div className="col-sm-12">
                        <div className="form-outline">
                          <label className="form-label" for="form6Example2">
                         Have any disease
                          </label>
                          <CreatableSelect
        id="disease"
        isMulti
        onChange={handleChangeDisease}
        options={disease}
        value={selectedDisease}
        inputValue={inputDisease}
        onInputChange={setInputDisease}
        placeholder="Select or type to add..."
      />
                          

                        </div>
                      </div>

                      <div className="col-sm-6">
                        <div className="form-outline">
                          <label className="form-label" for="form6Example2">
                         Patient Type
                          </label>

                          <select className="form-select" id="patientType" name="patientType"  required onChange={handleChange}>
      <option value="">Select Patient Type</option>
      <option value="Genral">General</option>
      <option value="CGHS(Serving)">CGHS(Serving)</option>
      <option value="CGHS(Pensioner)">CGHS(Pensioner)</option>
      <option value="CSMA">CSMA</option>
  
     
    </select>
                        </div>
                      </div>

                
                      <p className="mt-4">Fill details for Book Appointment</p>

                      <ul className="list-group">
                 
                 <li className="list-group-item">
                
                
                   
                   <div className="row">
                   <div className="col-sm-6">
                       <div className="form-outline">

                       <label className="form-label" for="form6Example1">
                           Doctor
                         </label>
                         
                         <input
                           type="search"
                           id="form6Example1"
                           name="doctor"
                           className="form-control"
                           value={searchDoctor}
                   onChange={handleSearchDoctor}
                   required

                   
                 

                         />
                         <DoctorList>
                         <div >
                         
                         <ul className="list-group">
                     {filteredDoctor.map((doctor) => (
                       <li key={doctor.uid}
                       className={`list-group-item ${selectedDoctor && selectedDoctor.uid === doctor.uid ? "active" : ""}`} // Add 'active' class if the patient is selected
           onClick={() => handleDoctorSelect(doctor)} // Call handlePatientSelect function when the patient is clicked 
                       >
                         {doctor.doctor_name} {"-"} Department: {doctor.department}
                         {/* Display other patient details as needed */}
                       </li>
                     ))}
                   </ul>

                   </div>
                   </DoctorList>
                         
                       </div>
                     
                     </div>
                     <div className="col-sm-6 ">
                       <div className="form-outline">
                       <label className="form-label" for="form6Example2">
                           Date&Time
                         </label>
                         <input
                           type="datetime-local"
                           id="form6Example2"
                           className="form-control"
                           name="appDateTime"
                           onChange={handleChange}
                           required
                          
                         />
                        
                       </div>
                     </div>
                     
                    
                     <div className="col-sm-6">
                       <div className="form-outline" id="form1">
                       <label className="form-label" for="form6Example2">
                           Add Treatment
                         </label>
                         <Select
        id="treatment"
        name="treatment"
        options={treatments}
        value={selectedTreatment ? { value: selectedTreatment, label: selectedTreatment } : null}
        onChange={handleChangeTreatment}
      />
                         
                       </div>
                     </div>
                     <div className="col-sm-6">
                       <div className="form-outline">
                       <label className="form-label" for="form6Example1">
                           Notes
                         </label>
                         <input
                           type="text"
                           id="form6Example1"
                           className="form-control"
                           name="notes"
                           onChange={handleChange}
                         />
                        
                       </div>
                     </div>
                     
                    <div className="d-flex  mt-4">
                     <div className="col-sm-3 p-0 ">
                       <div className="form-outline">
                         <label className="form-label" for="form6Example1">
                           Doctor :
                         </label>
                       </div>
                     </div>
                     <div className="col-sm-4 p-0">
                       <div className="form-outline">
                         <input
                           class="form-check-input"
                           type="checkbox"
                           value=""
                           id="flexCheckDefault"
                         />
                         <label
                           class="form-check-label mx-1"
                           for="flexCheckDefault"
                         >
                           Sms
                         </label>
                       </div>
                     </div>
                     <div className="col-sm-5 p-0">
                       <div className="form-outline">
                         <input
                           class="form-check-input"
                           type="checkbox"
                           value=""
                           id="flexCheckDefault"
                         />
                         <label
                           class="form-check-label mx-1"
                           for="flexCheckDefault"
                         >
                           Send Email
                         </label>
                       </div>
                     </div>
                     </div>
                     <div className="d-flex ">
                     <div className="col-sm-3 p-0">
                       <div className="form-outline">
                         <label className="form-label" for="form6Example1">
                           Patient :
                         </label>
                       </div>
                     </div>
                     <div className="col-sm-4 p-0">
                       <div className="form-outline">
                         <input
                           class="form-check-input"
                           type="checkbox"
                           value=""
                           id="flexCheckDefault"
                         />
                         <label
                           class="form-check-label mx-1"
                           for="flexCheckDefault"
                         >
                           Sms
                         </label>
                       </div>
                     </div>
                     <div className="col-sm-5 p-0">
                       <div className="form-outline">
                         <input
                           class="form-check-input"
                           type="checkbox"
                           value=""
                           id="flexCheckDefault"
                         />
                         <label
                           class="form-check-label mx-1"
                           for="flexCheckDefault"
                         >
                           Send Email
                         </label>
                       </div>
                     </div>
                     </div>

                   
                   </div>
                   
                 </li>
               </ul>
                      <div className="formbtn d-flex justify-content-center">
                        <button className="btn btn-success " type="submit" id="btn2">
                          {" "}
                          Add Patient & Book Appointment
                        </button>
                      </div>
                    </div>
                  </li>
                </ul>
                </form>
             
    </Wrapper>
  );
}

export default AddPatient;

const Wrapper = styled.div`

  
 position: relative;
  #section3 {
    @media screen and (max-width: 768px) {
      margin-top: 1rem;
      width: 20rem;
    
    }
    @media screen and (min-width: 768px) and (max-width: 1020px)  {
      width: 41rem;
    }
  }
    .formbtn {
      margin-top: 1rem;
      
    }

    #tab1 {
      height: 12rem;
      overflow-y: auto;
      @media screen and (max-width: 768px) {
        margin-left: -1.1rem;
      }
    }

    #btn2 {
      

      @media screen and (max-width: 768px) {
        font-size: small;
        margin-left: 5.5rem;
      }
      @media screen and (min-width: 768px) and (max-width: 1020px) {
        font-size: small;
        margin-left: 1rem;
      }
      @media screen and (min-width: 1020px) and (max-width: 1600px) {
        
        margin-bottom: 1rem;
        font-size: small;
        
      }
      @media screen and (min-width: 1600px) and (max-width: 3700px) {
      
        margin-bottom: 1rem;
        font-size: small;
        
      }
    }
    #myTabContent{
      height: 28.5rem;
      overflow-y: auto;
      
    }
  
`;

// const FormContainer = styled.div`
//   /* Your styling for the form container */
//   margin-top: 50px;
// `;

const PatientList = styled.div`
  position: absolute;
  
  z-index: 1000;
  width: 100%;
  overflow-y: auto;
  max-height: 400px;
  /* Your styling for the patient list */
`;
const DoctorList = styled.div`
  position: absolute;
  z-index: 999; /* Set a high z-index to ensure the list is displayed above other elements */
  width: 100%;
  overflow-y: auto;
  max-height: 400px;
 
  /* Your additional styling for the doctor list */
`;

