import React, { useEffect, useState } from "react";
import styled from "styled-components";


function Form() {
    
  const  [formdata,setFormData ] = useState({})
 
  const [searchQuery, setSearchQuery] = useState("");
  const [searchDoctor, setSearchDoctor] = useState("");
  const [showDoctorList,setShowDoctorList] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null); // State to store the selected patient
  const [selectedDoctor, setSelectedDoctor] = useState(null); // State to store the selected Doctor
  const [data,setData] = useState(
    { uid :"1", patient_Name:"Mohit sahu",mobile: "9806324245",email: "patinet@gmail.com",gender: "Male", city: "jabalpur", contact_Person : "father" , contact_Person_Name: "rahul", blood_Group : "o+" , dob : "", age : "25",weight:"",allergy:"",disease:"", status:"",doctorId:"",doctor_name:"",appDateTime:"",treatment:"",notes:"",  address: "Ranital gate no. 4 , jabalpur"}
    
  ) 


  const [bookData,setBookData] = useState(
    { uid :"1", patient_Name:"Mohit sahu",mobile: "9806324245",email: "patinet@gmail.com",gender: "Male", city: "jabalpur", contact_Person : "father" , dateTime:"", contact_Person_Name: "rahul", blood_Group : "o+" , dob : "", age : "25", address: "Ranital gate no. 4 , jabalpur"}
    
  ) 

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

  const appointment_data = [
    { uid :"1", patient:"Mohit Shau",doctorId:"1", doctor:"Dr Umer Qureshi",mobile: "9806324245", treatment:"root canal",timing:"2024-02-17T10:45",status:"Missed",action:"edit"},
    { uid :"1", patient:"Mohit Shau", doctorId:"1",doctor:"Dr Umer Qureshi",mobile: "9806324245", treatment:"root canal",timing:"2024-02-17T10:00",status:"Missed",action:"edit"},
    { uid :"1", patient:"Mohit Shau", doctorId:"1" ,doctor:"Dr Umer Qureshi",mobile: "9806324245", treatment:"root canal",timing:"2024-02-17T11:30",status:"Missed",action:"edit"},
    { uid :"1", patient:"Mohit Shau",doctorId:"2", doctor:"Dr Ajay",mobile: "9806324245", treatment:"root canal",timing:"2024-02-17T12:30",status:"Missed",action:"edit"},
    { uid :"1", patient:"Mohit Shau",doctorId:"1", doctor:"Dr Umer Qureshi",mobile: "9806324245", treatment:"root canal",timing:"2024-02-17T12:45",status:"Missed",action:"edit"},
    { uid :"1", patient:"Mohit Shau",doctorId:"2", doctor:"Dr Ajay",mobile: "9806324245", treatment:"root canal",timing:"2024-02-18T10:45",status:"Missed",action:"edit"},
    { uid :"1", patient:"Mohit Shau",doctorId:"1", doctor:"Dr Umer Qureshi",mobile: "9806324245", treatment:"root canal",timing:"2024-02-18T12:00",status:"Missed",action:"edit"},
    { uid :"1", patient:"Mohit Shau",doctorId:"1", doctor:"Dr Umer Qureshi",mobile: "9806324245", treatment:"root canal",timing:"2024-02-18T13:00",status:"Missed",action:"edit"},
    { uid :"1", patient:"Mohit Shau",doctorId:"2", doctor:"Dr Ajay",mobile: "9806324245", treatment:"root canal",timing:"2024-02-18T13:00",status:"Missed",action:"edit"},

    
  ];

  const [patients, setPatients] = useState([
    {
      uid: "1",
      patient_Name: "Mohit sahu",
      mobile: "9806324245",
      email: "patinet@gmail.com",
      gender: "Male",
      city: "jabalpur",
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
      city: "jabalpur",
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
      city: "jabalpur",
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
      city: "jabalpur",
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
      city: "jabalpur",
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
      city: "jabalpur",
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

  const handleSearch = (e) => {
    
    setSearchQuery(e.target.value);
  };
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

  console.log(patients)

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
        city: data.city,
        contact_Person: data.contact_Person,
        contact_Person_Name: data.contact_Person_Name,
        blood_Group: data.blood_Group,
        dob: data.dob,
        age: data.age,
        address: data.address,
        weight: data.weight,
        allergy: data.allergy,
        disease: data.disease,
        doctorId: selectedDoctor.uid,
        doctor_name: selectedDoctor.doctor_name,
        appDateTime: data.appDateTime,
        treatment: data.treatment,
        notes: data.notes,
      };
  
      setPatients([...patients, newPatient]);
  
      // Reset form data
      setData({
        patient_Name: "",
        mobile: "",
        email: "",
        gender: "",
        city: "",
        contact_Person: "",
        contact_Person_Name: "",
        blood_Group: "",
        dob: "",
        age: "",
        address: "",
      });
  
      // Reset selected doctor
      // setSelectedDoctor(null);
  
      console.log("Appointment booked successfully!");
      alert("Appointment booked successfully!");
    } else {
      // Slot is not available
      alert("The selected doctor's slot is not available at the specified time");
      console.log("The selected doctor's slot is not available at the specified time");
    }
  };

  const handleBookChange = (e)=>{
    const {name,value} = e.target;
    setBookData({
      ...data,
      [name]: value
    });
}

const handlePatientSelect = (patient) => {
  setSelectedPatient(patient); // Set the selected patient when it's clicked
  setSearchQuery(""); // Reset the search query to close the search list
};
const handleDoctorSelect = (doctor) => {
  setSelectedDoctor(doctor); // Set the selected patient when it's clicked
  setShowDoctorList(false)
  setSearchDoctor(doctor.doctor_name); // Reset the search query to close the search list
};


  console.log(filteredDoctor)
  console.log(selectedDoctor)
 
 
  
  return (
    <Wrapper>
      <div className="">
        <div className="row  mx-1 p-1 border rounded bg-white" id="section3">
          <ul className="nav nav-tabs" id="myTab" role="tablist">
            <li className="nav-item" role="presentation">
              <button
                className="nav-link active"
                id="home-tab1"
                data-bs-toggle="tab"
                data-bs-target="#home-tab-pane"
                type="button"
                role="tab"
                aria-controls="home-tab-pane"
                aria-selected="true"
              >
                Add Patient
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="profile-tab1"
                data-bs-toggle="tab"
                data-bs-target="#profile-tab-pane"
                type="button"
                role="tab"
                aria-controls="profile-tab-pane"
                aria-selected="false"
              >
                Book Appointment
              </button>
            </li>

            <div className="tab-content" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="home-tab-pane"
                role="tabpanel"
                aria-labelledby="home-tab"
                tabindex="0"
              >
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
                            City
                          </label>
                          <input
                            type="text"
                            id="form6Example2"
                            className="form-control"
                            name="city"
                            onChange={handleChange}
                            required
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
                      <div className="col-sm-6">
                        <div className="form-outline">
                          <label className="form-label" for="form6Example2">
                         Have any disease
                          </label>

                          <select className="form-select" id="disease" name="disease"  required onChange={handleChange}>
      <option value="">Select disease</option>
      <option value="">Hypertension</option>
      <option value="Female">Diabetes</option>
      <option value="Female">Heart</option>
      <option value="Other">Cardiovascular</option>
      <option value="Other">Asthma</option>
      <option value="Other">Arthritis</option>
      <option value="Other">Osteoporosis</option>
      <option value="Other">Thyroid</option>
      <option value="Other">Kidney</option>
      <option value="Other">Liver</option>
      <option value="Other">Gastrointestinal</option>
      <option value="Other">Cancer</option>
      <option value="Other">Depression</option>
      <option value="Other">Anxiety</option>
      <option value="Other">Alzheimer's</option>
      <option value="Other">HIV</option>
      <option value="Other">Hepatitis</option>
  
     
    </select>
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
                         <input
                           type="text"
                           id="form6Example2"
                           className="form-control"
                           name="treatment"
                           required
                           onChange={handleChange}
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
              </div>
              <div
                className="tab-pane fade"
                id="profile-tab-pane"
                role="tabpanel"
                aria-labelledby="profile-tab"
                tabindex="0"
              >
                <ul className="list-group">
                 
                  <li className="list-group-item">
                 
                  <input
                    class="form-control mr-sm-2 mt-3 mb-2 m-auto"
                    type="search"
                    placeholder="Search Patient Name or Mobile"
                    aria-label="Search"
                    value={searchQuery}
                    onChange={handleSearch}
                  />
                   <PatientList>
                   <ul className="list-group" >
                      {filteredPatients.map((patient) => (
                        <li key={patient.uid}
                        className={`list-group-item ${selectedPatient && selectedPatient.uid === patient.uid ? "active" : ""}`} // Add 'active' class if the patient is selected
            onClick={() => handlePatientSelect(patient)} // Call handlePatientSelect function when the patient is clicked 
                        >
                          {patient.patient_Name}{"-"} Mobile : {patient.mobile}
                          {/* Display other patient details as needed */}
                        </li>
                      ))}
                    </ul>
                    </PatientList>
                    
                    <div className="row mt-5">
                      <div className="col-sm-6">
                        <div className="form-outline" id="form1">
                        <label className="form-label" for="form6Example1">
                            Patient name
                          </label>
                          <input
                            type="text"
                            id="form6Example1"
                            className="form-control"
                            value={selectedPatient ? selectedPatient.patient_Name : ""}
                          />
                          

                         
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
                            name="dateTime"
                            onChange={(e)=>handleBookChange(e)}
                           
                          />
                         
                        </div>
                      </div>
                      
                      <div className="col-sm-6">
                        <div className="form-outline">

                        <label className="form-label" for="form6Example1">
                            Doctor
                          </label>
                          
                          <input
                            type="search"
                            id="form6Example1"
                            className="form-control"
                            value={searchDoctor}
                    onChange={handleSearchDoctor}
                    
                  

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
                      <div className="col-sm-6">
                        <div className="form-outline" id="form1">
                        <label className="form-label" for="form6Example2">
                            Add Treatment
                          </label>
                          <input
                            type="text"
                            id="form6Example2"
                            className="form-control"
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
                          />
                         
                        </div>
                      </div>
                      <div className="col-sm-6">
                        
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

                     <div className="formbtn d-flex justify-content-center">
                        <button className="btn btn-success " type="submit" id="btn2">
                          {" "}
                          Book Appointment
                        </button>
                        </div>
                    </div>
                    
                  </li>
                </ul>
              </div>
            </div>
          </ul>
        </div>
      </div>
    </Wrapper>
  );
}

export default Form;

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

