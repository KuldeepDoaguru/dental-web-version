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
    { uid :"1", patient_Name:"Mohit sahu",mobile: "9806324245",email: "patinet@gmail.com",gender: "Male", city: "jabalpur", contact_Person : "father" , contact_Person_Name: "rahul", blood_Group : "o+" , dob : "", age : "25", address: "Ranital gate no. 4 , jabalpur"}
    
  ) 


  const [bookData,setBookData] = useState(
    { uid :"1", patient_Name:"Mohit sahu",mobile: "9806324245",email: "patinet@gmail.com",gender: "Male", city: "jabalpur", contact_Person : "father" , dateTime:"", contact_Person_Name: "rahul", blood_Group : "o+" , dob : "", age : "25", address: "Ranital gate no. 4 , jabalpur"}
    
  ) 

  const doctors = [
    { uid :"1", doctor_name:"Mohit Sahu",department:"ortho", mobile: "9806324245", email:"doctor@gmail.com",gender:"Male",address:"Ranital Gate no.4 Jabalpur"},
    { uid :"2", doctor_name:"Rahul sen",department:"ortho", mobile: "9806324245", email:"doctor@gmail.com",gender:"Male",address:"Ranital Gate no.4 Jabalpur"},
    { uid :"3", doctor_name:"Umer khan",department:"ortho", mobile: "9806324245", email:"doctor@gmail.com",gender:"Male",address:"Ranital Gate no.4 Jabalpur"}
    

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
      dateTime: "",
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
      dateTime: "",
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
      dateTime: "",
      contact_Person_Name: "rahul",
      blood_Group: "o+",
      dob: "",
      age: "25",
      address: "Ranital gate no. 4 , jabalpur",
    },
    
  ]);


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
                          />
                        </div>
                      </div>
                      <div className="col-sm-6 ">
                        <div className="form-outline">
                        <label className="form-label" htmlFor="">Gender</label>
    <select className="form-select" id="commercial_property_type" name="commercial_property_type"  required >
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
                            placeholder=""
                            maxLength={10}
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
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-outline">
                        <label className="form-label" htmlFor="">Contact Person</label>
    <select className="form-select" id="commercial_property_type" name="commercial_property_type"  required >
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
    <select className="form-select" id="commercial_property_type" name="commercial_property_type"  required >
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
                            Contact Person Name
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
                          />
                        </div>
                      </div>
                      <div className="formbtn">
                        <button className="btn btn-success " id="btn2">
                          {" "}
                          Sumbit
                        </button>
                      </div>
                    </div>
                  </li>
                </ul>
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
                  <PatientList>
                  <input
                    class="form-control mr-sm-2 mt-3 mb-2 w-50 m-auto"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    value={searchQuery}
                    onChange={handleSearch}
                  />
                   <ul className="list-group">
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
                          <DoctorList>
                          <input
                            type="search"
                            id="form6Example1"
                            className="form-control"
                            value={searchDoctor}
                    onChange={handleSearchDoctor}
                    
                  

                          />
                          <div style={{zIndex:1}}>
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

                      <div className="col-sm-3">
                        <div className="form-outline">
                          <label className="form-label" for="form6Example1">
                            Doctor :
                          </label>
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <div className="form-outline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            value=""
                            id="flexCheckDefault"
                          />
                          <label
                            class="form-check-label mx-2"
                            for="flexCheckDefault"
                          >
                            Sms
                          </label>
                        </div>
                      </div>
                      <div className="col-sm-5">
                        <div className="form-outline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            value=""
                            id="flexCheckDefault"
                          />
                          <label
                            class="form-check-label mx-2"
                            for="flexCheckDefault"
                          >
                            Send Email
                          </label>
                        </div>
                      </div>

                      <div className="col-sm-3">
                        <div className="form-outline">
                          <label className="form-label" for="form6Example1">
                            Patient :
                          </label>
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <div className="form-outline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            value=""
                            id="flexCheckDefault"
                          />
                          <label
                            class="form-check-label mx-2"
                            for="flexCheckDefault"
                          >
                            Sms
                          </label>
                        </div>
                      </div>
                      <div className="col-sm-5">
                        <div className="form-outline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            value=""
                            id="flexCheckDefault"
                          />
                          <label
                            class="form-check-label mx-2"
                            for="flexCheckDefault"
                          >
                            Send Email
                          </label>
                        </div>
                      </div>

                      <div className="formbtn">
                        <button className="btn btn-success " id="btn2">
                          {" "}
                          Sumbit
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
      margin-left: 2rem;
    }

    #tab1 {
      height: 12rem;
      @media screen and (max-width: 768px) {
        margin-left: -1.1rem;
      }
    }

    #btn2 {
      margin-left: 9rem;

      @media screen and (max-width: 768px) {
        margin-left: 5.5rem;
      }
      @media screen and (min-width: 768px) and (max-width: 1020px) {
        margin-left: 1rem;
      }
      @media screen and (min-width: 1600px) and (max-width: 3700px) {
        margin-left: 10rem;
        margin-bottom: 1rem;
      }
    }
    #myTabContent{
      height: 28.5rem;
      
    }
  
`;

// const FormContainer = styled.div`
//   /* Your styling for the form container */
//   margin-top: 50px;
// `;

const PatientList = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  /* Your styling for the patient list */
`;
const DoctorList = styled.div`
  position: absolute;
  top: 50; /* Position the list below the input field */
  left: 5;
  z-index: 1000; /* Set a high z-index to ensure the list is displayed above other elements */
 
  /* Your additional styling for the doctor list */
`;

