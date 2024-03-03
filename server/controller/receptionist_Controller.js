const {db} = require('../db');
const dotenv = require('dotenv');
dotenv.config();

// const addPatient = (req,res) =>{
//          try{
//            const {branch_name, patient_Name,mobile,email,gender, aadhaar_no, contact_Person  , contact_Person_Name, blood_Group , dob , age ,weight,allergy,disease, patientType, status,doctorId,doctor_name,appDateTime,treatment,notes,  address,patient_added_by,patient_added_by_emp_id} =  req.body;

//            const created_at = new Date();

//            // Generate Patient ID
//         const generatePatientId = (count) => {
//           const prefix = 'DG';
//           const paddedCount = count.toString().padStart(4, '0'); // Pad count with zeros
//           return `${prefix}${paddedCount}`;
//       };

//           console.log(patient_Name);
          
//            const checkPatientQuery = "SELECT * FROM patient_details WHERE mobileno = ? AND patient_name = ?";

//            db.query(checkPatientQuery, [mobile,patient_Name], (err, result) => {
//             if (err) {
//               console.error("Error checking if user exists in MySQL:", err);
//               res.status(500).json({ error: "Internal server error" });
//             } else {
//               // Check if there are any rows in the result
//               if (result.length > 0) {
//                 return res.status(400).json({
//                   error: "Patient already exists.",
//                 });
//               } else {

                
//                 // patient not found, proceed with add patient
//                 const insertPatientQuery = `
//     INSERT INTO patient_details (
//         branch_name, patient_name, dob, age, weight, gender, bloodgroup, mobileno, emailid, contact_person, contact_person_name, allergy, disease, address, patient_type, aadhaar_no, patient_added_by, patient_added_by_emp_id, created_at
//     ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
// `;
      
//                 const insertPatientParams = [

//                   branch_name,
//                   patient_Name,
//                   dob,
//                   age,
//                   weight,
//                   gender,
//                   blood_Group,
//                   mobile,
//                   email,
//                   contact_Person,
//                   contact_Person_Name,
//                   allergy,
//                   disease,
//                   address,
//                   patientType,
//                   aadhaar_no,
//                   patient_added_by,
//                   patient_added_by_emp_id,
//                   created_at,
//                 ];
      
//                 db.query(
//                   insertPatientQuery,
//                   insertPatientParams,
//                   (insertErr, insertResult) => {
//                     if (insertErr) {
//                       console.error("Error inserting user:", insertErr);
//                       res.status(500).json({ error: "Internal server error" });
//                     } else {
//                       const insertData = { id : insertResult.insertId}
                      
//                         const  bookAppointmentQuery = `INSERT INTO apointments (
//                             patient_uhid, branch_name,patient_name,patient_contact,assigned_doctor_name , assigned_doctor_id ,appointment_dateTime, treatment_provided, appointment_status, notes, appointment_created_by, appointment_created_by_emp_id,created_at
//                        ) VALUES ( ?, ?,?,?,?,?,?, ?,?,?,?,?,?)
//                      `;
//                      const bookApointmentParams = [
//                       insertResult.insertId,
//                       branch_name,
//                       patient_Name,
//                       mobile,
//                       doctor_name,
//                       doctorId,
//                       appDateTime,
//                       treatment,
//                       status,
//                       notes,
//                       patient_added_by,
//                       patient_added_by_emp_id,
//                       created_at
// ];
//                       db.query(bookAppointmentQuery,bookApointmentParams,(insertErr, insertResult)=>{
//                         if (insertErr) {
//                           console.error("Error inserting user:", insertErr);
//                           res.status(500).json({ error: "Internal server error" });
//                         }
//                         else{
//                           console.log("Apointment book successfully");
//                         }
//                       })
                      
                      
//                       console.log("Patient Added successfully");
                    
//                       return res.status(200).json({
//                         success: true,
//                         message: "Patient Added successfully",
//                         user: insertData
//                       });
//                     }
//                   }
//                 );
//               }
//             }
//           });

//          }
//          catch(error){
//             console.error("Error in registration:", error);
//             res.status(500).json({
//               success: false,
//               message: "Error in registration",
//               error: error.message,
//             });
//          }
// }

const addPatient = (req, res) => {
  try {
      const { branch_name, patient_Name, mobile, email, gender, aadhaar_no, contact_Person, contact_Person_Name, blood_Group, dob, age, weight, allergy, disease, patientType, status, doctorId, doctor_name, appDateTime, treatment, notes, address, patient_added_by, patient_added_by_emp_id } = req.body;

      const created_at = new Date();

      // Generate Patient ID
      const generatePatientId = (count) => {
          const prefix = 'DH';
          // const paddedCount = count.toString().padStart(6, '0');
          const paddedCount = count.toString();
          return `${prefix}${paddedCount}`;
      };

      const checkPatientQuery = "SELECT * FROM patient_details WHERE mobileno = ? AND patient_name = ?";

      db.query(checkPatientQuery, [mobile, patient_Name], (err, result) => {
          if (err) {
              console.error("Error checking if user exists in MySQL:", err);
              return res.status(500).json({ error: "Internal server error" });
          }

          // Check if patient already exists
          if (result.length > 0) {
              return res.status(400).json({ error: "Patient already exists." });
          } else {
              // Get count of existing patients to generate new ID
              const countPatientsQuery = "SELECT COUNT(*) as count FROM patient_details";
              db.query(countPatientsQuery, (countErr, countResult) => {
                  if (countErr) {
                      console.error("Error counting patients:", countErr);
                      return res.status(500).json({ error: "Internal server error" });
                  }

                  const patientId = generatePatientId(countResult[0].count + 1); // Increment count and generate ID

                  // Proceed with adding the patient
                  const insertPatientQuery = `
                      INSERT INTO patient_details (
                          uhid, branch_name, patient_name, dob, age, weight, gender, bloodgroup, mobileno, emailid, contact_person, contact_person_name, allergy, disease, address, patient_type, aadhaar_no, patient_added_by, patient_added_by_emp_id, created_at
                      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                  `;

                  const insertPatientParams = [
                      patientId, // Add patient ID
                      branch_name,
                      patient_Name,
                      dob,
                      age,
                      weight,
                      gender,
                      blood_Group,
                      mobile,
                      email,
                      contact_Person,
                      contact_Person_Name,
                      allergy,
                      disease,
                      address,
                      patientType,
                      aadhaar_no,
                      patient_added_by,
                      patient_added_by_emp_id,
                      created_at,
                  ];

                  db.query(insertPatientQuery, insertPatientParams, (insertErr, insertResult) => {
                      if (insertErr) {
                          console.error("Error inserting patient:", insertErr);
                          return res.status(500).json({ error: "Internal server error" });
                      } else {
                          // Proceed with booking appointment
                          const bookAppointmentQuery = `
                              INSERT INTO apointments (
                                  patient_uhid, branch_name, patient_name, patient_contact, assigned_doctor_name, assigned_doctor_id, appointment_dateTime, treatment_provided, appointment_status, notes, appointment_created_by, appointment_created_by_emp_id, created_at
                              ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                          `;
                         
                          const bookAppointmentParams = [
                              patientId,
                              branch_name,
                              patient_Name,
                              mobile,
                              doctor_name,
                              doctorId,
                              appDateTime,
                              treatment,
                              status,
                              notes,
                              patient_added_by,
                              patient_added_by_emp_id,
                              created_at
                          ];

                          db.query(bookAppointmentQuery, bookAppointmentParams, (appointmentErr, appointmentResult) => {
                              if (appointmentErr) {
                                  console.error("Error booking appointment:", appointmentErr);
                                  return res.status(500).json({ error: "Internal server error" });
                              } else {
                                  console.log("Appointment booked successfully");
                                  return res.status(200).json({
                                      success: true,
                                      message: "Patient and appointment added successfully",
                                      user: { id: insertResult.insertId, patientId: patientId }
                                  });
                              }
                          });
                      }
                  });
              });
          }
      });
  } catch (error) {
      console.error("Error in registration:", error);
      return res.status(500).json({
          success: false,
          message: "Error in registration",
          error: error.message,
      });
  }
};


const getPatients = (req,res) =>{
   
  try{
       const sql = 'SELECT * FROM patient_details';

       db.query(sql,(err,results) =>{
         if(err){
           console.error('Error fetching Patients from MySql:' , err);
           res.status(500).json({error : "Error fetching Patients"});
         }
         else {
           res.status(200).json({data: results,message : "Patients fetched successfully"})
         }

       })
  }
  catch(error){
     console.error('Error fetching Patients from MySql:' , error);
     res.status(500).json({
       success: false,
       message: "Error in fetched Patients",
       error: error.message,
     })
   
  }
}


const getDisease = (req,res) =>{
   
   try{
        const sql = 'SELECT * FROM patient_disease';

        db.query(sql,(err,results) =>{
          if(err){
            console.error('Error fetching disease from MySql:' , err);
            res.status(500).json({error : "Error fetching disease"});
          }
          else {
            res.status(200).json({data: results,message : "Disease fetched successfully"})
          }

        })
   }
   catch(error){
      console.error('Error fetching disease from MySql:' , error);
      res.status(500).json({
        success: false,
        message: "Error in fetched disease",
        error: error.message,
      })
    
   }
}
const getTreatment = (req,res) =>{
   
   try{
        const sql = 'SELECT * FROM treatment_list';

        db.query(sql,(err,results) =>{
          if(err){
            console.error('Error fetching treatments from MySql:' , err);
            res.status(500).json({error : "Error fetching treatments"});
          }
          else {
            res.status(200).json({data: results,message : "treatments fetched successfully"})
          }

        })
   }
   catch(error){
      console.error('Error fetching treatments from MySql:' , error);
      res.status(500).json({
        success: false,
        message: "Error in fetched treatments",
        error: error.message,
      })
    
   }
}

const bookAppointment = (req,res)=>{
    try{
      const { branch_name,patient_uhid, patient_name, mobile, status, doctorId, doctor_name, appDateTime, treatment, notes,patient_added_by, patient_added_by_emp_id } = req.body;

      const created_at = new Date();

      const bookAppointmentQuery = `
      INSERT INTO apointments (
          patient_uhid, branch_name, patient_name, patient_contact, assigned_doctor_name, assigned_doctor_id, appointment_dateTime, treatment_provided, appointment_status, notes, appointment_created_by, appointment_created_by_emp_id, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const bookAppointmentParams = [
    patient_uhid,
    branch_name,
    patient_name,
    mobile,
    doctor_name,
    doctorId,
    appDateTime,
    treatment,
    status,
    notes,
    patient_added_by,
    patient_added_by_emp_id,
    created_at
];

db.query(bookAppointmentQuery, bookAppointmentParams, (appointmentErr, appointmentResult) => {
  if (appointmentErr) {
      console.error("Error booking appointment:", appointmentErr);
      return res.status(500).json({ error: "Internal server error" });
  } else {
      console.log("Appointment booked successfully");
      return res.status(200).json({
          success: true,
          message: "Appointment Booked successfully",
          
      });
  }
});


    }
    catch(error){
      console.error("Error in book appointment:", error);
      return res.status(500).json({
          success: false,
          message: "Error in book appointment",
          error: error.message,
      });
    }
}
module.exports = {addPatient,getDisease,getTreatment,getPatients,bookAppointment};
