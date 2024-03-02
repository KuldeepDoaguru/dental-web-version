const {db} = require('../db');
const dotenv = require('dotenv');
dotenv.config();

const addPatient = (req,res) =>{
         try{
           const {branch_name, patient_Name,mobile,email,gender, aadhaar_no, contact_Person  , contact_Person_Name, blood_Group , dob , age ,weight,allergy,disease, patientType, status,doctorId,doctor_name,appDateTime,treatment,notes,  address,patient_added_by,patient_added_by_emp_id} =  req.body;

           const created_at = new Date();
          console.log(patient_Name);
           const checkPatientQuery = "SELECT * FROM patient_details WHERE mobileno = ? AND patient_name = ?";

           db.query(checkPatientQuery, [mobile,patient_Name], (err, result) => {
            if (err) {
              console.error("Error checking if user exists in MySQL:", err);
              res.status(500).json({ error: "Internal server error" });
            } else {
              // Check if there are any rows in the result
              if (result.length > 0) {
                return res.status(400).json({
                  error: "Patient already exists.",
                });
              } else {
                // patient not found, proceed with add patient
                const insertPatientQuery = `
    INSERT INTO patient_details (
        branch_name, patient_name, dob, age, weight, gender, bloodgroup, mobileno, emailid, contact_person, contact_person_name, allergy, disease, address, patient_type, aadhaar_no, patient_added_by, patient_added_by_emp_id, created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`;
      
                const insertPatientParams = [

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
      
                db.query(
                  insertPatientQuery,
                  insertPatientParams,
                  (insertErr, insertResult) => {
                    if (insertErr) {
                      console.error("Error inserting user:", insertErr);
                      res.status(500).json({ error: "Internal server error" });
                    } else {
                      const insertData = { id : insertResult.insertId}
                      
                        const  bookAppointmentQuery = `INSERT INTO apointments (
                            patient_uhid, branch_name,patient_name,patient_contact,assigned_doctor_name , assigned_doctor_id ,appointment_dateTime, treatment_provided, appointment_status, notes, appointment_created_by, appointment_created_by_emp_id,created_at
                       ) VALUES ( ?, ?,?,?,?,?,?, ?,?,?,?,?,?)
                     `;
                     const bookApointmentParams = [
                      insertResult.insertId,
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
                      db.query(bookAppointmentQuery,bookApointmentParams,(insertErr, insertResult)=>{
                        if (insertErr) {
                          console.error("Error inserting user:", insertErr);
                          res.status(500).json({ error: "Internal server error" });
                        }
                        else{
                          console.log("Apointment book successfully");
                        }
                      })
                      
                      
                      console.log("Patient Added successfully");
                    
                      return res.status(200).json({
                        success: true,
                        message: "Patient Added successfully",
                        user: insertData
                      });
                    }
                  }
                );
              }
            }
          });

         }
         catch(error){
            console.error("Error in registration:", error);
            res.status(500).json({
              success: false,
              message: "Error in registration",
              error: error.message,
            });
         }
}

module.exports = {addPatient};
