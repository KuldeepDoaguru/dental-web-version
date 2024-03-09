const {db} = require('../db');
const dotenv = require('dotenv');
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
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
              return res.status(400).json({success:false, message: "Patient already exists." });
          } else {


           // Find the highest empID in the database for the given pattern
    const highestPatientIDQuery =
    "SELECT MAX(CAST(SUBSTRING_INDEX(uhid,'_', -1) AS UNSIGNED)) AS maxID FROM patient_details WHERE uhid LIKE ?";
  const pattern = "DH_%";
  
  

  db.query(highestPatientIDQuery, [pattern], (err, result) => {
    if (err) {
      console.error("Error getting highest empID:", err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      let nextID = 1;
      if (result[0].maxID !== null) {
        nextID = parseInt(result[0].maxID) + 1;
      }
     const  newPatientID = `DH_${nextID}`;




              // Get count of existing patients to generate new ID
              // const countPatientsQuery = "SELECT COUNT(*) as count FROM patient_details";
              // db.query(countPatientsQuery, (countErr, countResult) => {
              //     if (countErr) {
              //         console.error("Error counting patients:", countErr);
              //         return res.status(500).json({ error: "Internal server error" });
              //     }

              //     const patientId = generatePatientId(countResult[0].count + 1); 
                  // Increment count and generate ID

                  // Proceed with adding the patient
                  const insertPatientQuery = `
                      INSERT INTO patient_details (
                          uhid, branch_name, patient_name, dob, age, weight, gender, bloodgroup, mobileno, emailid, contact_person, contact_person_name, allergy, disease, address, patient_type, aadhaar_no, patient_added_by, patient_added_by_emp_id, created_at
                      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                  `;

                  const insertPatientParams = [
                    newPatientID, // Add patient ID
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
                              INSERT INTO appointments (
                                  patient_uhid, branch_name, assigned_doctor_name, assigned_doctor_id, appointment_dateTime, treatment_provided, appointment_status, notes, appointment_created_by, appointment_created_by_emp_id, created_at
                              ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                          `;
                         
                          const bookAppointmentParams = [
                            newPatientID,
                              branch_name,
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
                                      user: { id: insertResult.insertId, patientId: newPatientID }
                                  });
                              }
                          });
                      }
                  });
              }});
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
      const { branch_name,patient_uhid, status, doctorId, doctor_name, appDateTime, treatment, notes,appointment_created_by, appointment_created_by_emp_id} = req.body;

      const created_at = new Date();

      const bookAppointmentQuery = `
      INSERT INTO appointments (
          patient_uhid, branch_name, assigned_doctor_name, assigned_doctor_id, appointment_dateTime, treatment_provided, appointment_status, notes, appointment_created_by, appointment_created_by_emp_id, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const bookAppointmentParams = [
    patient_uhid,
    branch_name,
    doctor_name,
    doctorId,
    appDateTime,
    treatment,
    status,
    notes,
    appointment_created_by,
    appointment_created_by_emp_id,
    created_at
];

db.query(bookAppointmentQuery, bookAppointmentParams, (appointmentErr, appointmentResult) => {
  if (appointmentErr) {
      console.error("Error booking appointment:", appointmentErr);
      return res.status(500).json({ success: false , message: "Internal server error" });
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



const updateAppointment = (req, res) => {
  try {
      const { appoint_id, doctorId, doctor_name, appDateTime, treatment, notes, appointment_updated_by, appointment_updated_by_emp_id } = req.body;

      const updated_at = new Date();

      const updateAppointmentQuery = `
          UPDATE appointments
          SET 
             
             
                
              assigned_doctor_name = ?, 
              assigned_doctor_id = ?, 
              appointment_dateTime = ?, 
              treatment_provided = ?,  
              notes = ?, 
              appointment_updated_by = ?, 
              appointment_updated_by_emp_id = ?, 
              updated_at = ?
          WHERE 
              appoint_id = ?
      `;

      const updateAppointmentParams = [
        
          
          doctor_name,
          doctorId,
          appDateTime,
          treatment,
          notes,
          appointment_updated_by,
          appointment_updated_by_emp_id,
          updated_at,
          appoint_id
      ];

      db.query(updateAppointmentQuery, updateAppointmentParams, (appointmentErr, appointmentResult) => {
          if (appointmentErr) {
              console.error("Error updating appointment:", appointmentErr);
              return res.status(500).json({ success: false, message: "Internal server error" });
          } else {
              console.log("Appointment updated successfully");
              return res.status(200).json({
                  success: true,
                  message: "Appointment updated successfully",
              });
          }
      });
  } catch (error) {
      console.error("Error in updating appointment:", error);
      return res.status(500).json({
          success: false,
          message: "Error in updating appointment",
          error: error.message,
      });
  }
};









const updateAppointmentStatus = (req, res) => {
  try {
      const { appointmentId, status ,appointment_updated_by,appointment_updated_by_emp_id} = req.body;

      const updated_at = new Date();

      const updateAppointmentQuery = `
          UPDATE appointments
          SET appointment_status = ?, updated_at = ?,appointment_updated_by = ?,appointment_updated_by_emp_id = ?
          WHERE appoint_id = ?
      `;

      const updateAppointmentParams = [
          status,
          updated_at,
          appointment_updated_by,
          appointment_updated_by_emp_id,
          appointmentId
      ];

      db.query(updateAppointmentQuery, updateAppointmentParams, (appointmentErr, appointmentResult) => {
          if (appointmentErr) {
              console.error("Error updating appointment:", appointmentErr);
              return res.status(500).json({ success: false, message: "Internal server error" });
          } else {
              console.log("Appointment updated successfully");
              return res.status(200).json({
                  success: true,
                  message: "Appointment updated successfully",
              });
          }
      });
  } catch (error) {
      console.error("Error updating appointment:", error);
      return res.status(500).json({
          success: false,
          message: "Error updating appointment",
          error: error.message,
      });
  }
}

const getAppointments = (req,res) =>{

  try{
    const branch = req.params.branch;
    // const sql = 'SELECT * FROM apointments WHERE branch_name = ?';
    const sql = `
        SELECT 
            a.appoint_id,
            a.assigned_doctor_name,
            a.assigned_doctor_id,
            a.appointment_status,
            a.appointment_dateTime,
            a.treatment_provided,
            a.notes,
            p.patient_name,
            p.mobileno,
            p.dob,
            p.age,
            p.weight,
            p.bloodgroup,
            p.disease,
            p.allergy,
            p.patient_type
        FROM 
            appointments AS a
        JOIN 
            patient_details AS p ON a.patient_uhid = p.uhid WHERE
            a.branch_name = ?
    `;

    db.query(sql,[branch],(err,results) =>{
      if(err){
        console.error('Error fetching Patients from MySql:' , err);
        res.status(500).json({error : "Error fetching appointments"});
      }
      else {
        res.status(200).json({data: results,message : "Appoinmtments fetched successfully"})
      }

    })
}
catch(error){
  console.error('Error fetching appointments from MySql:' , error);
  res.status(500).json({
    success: false,
    message: "Error in fetched appointments",
    error: error.message,
  })

}
}

const getDoctorDataByBranch = (req, res) => {
  try {
    const branch = req.params.branch;
    const getQuery = 'SELECT * FROM employee_register WHERE branch_name = ? AND employee_designation = "doctor" AND employee_status = "Approved"';
    db.query(getQuery, [branch], (err, result) => {
      if (err) {
        res.status(400).send({status : false, message: "error in fetching doctor" });
      }
      else{
        // Iterate over the result array and delete the password property from each object
        result.forEach(employee => {
          delete employee.employee_password;
        });
        res.json({ data: result, status: true, message: "successful fetching doctor" });
      }
      
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getBranch = (req,res) =>{
  try{
    const sql = 'SELECT * FROM branches';

    db.query(sql,(err,results) =>{
      if(err){
        console.error('Error fetching Branches from MySql:' , err);
        res.status(500).json({error : "Error fetching Branches"});
      }
      else {
        res.status(200).json({data: results,message : "Branches fetched successfully"})
      }

    })
}
catch(error){
  console.error('Error fetching Branches from MySql:' , error);
  res.status(500).json({
    success: false,
    message: "Error in fetched Branches",
    error: error.message,
  })

}
}

const getBranchDetail = (req,res) =>{
  try{
    const branch = req.params.branch;
    const sql = 'SELECT * FROM branches WHERE branch_name = ?';

    db.query(sql,[branch],(err,results) =>{
      if(err){
        console.error('Error fetching Branches from MySql:' , err);
        res.status(500).json({error : "Error fetching Branches"});
      }
      else {
        res.status(200).json({data: results,message : "Branches fetched successfully"})
      }

    })
}
catch(error){
  console.error('Error fetching Branches from MySql:' , error);
  res.status(500).json({
    success: false,
    message: "Error in fetched Branches",
    error: error.message,
  })

}
}

const getDoctorDataByBranchWithLeave = (req, res) => {
  try {
    const branch = req.params.branch;
    const getQuery = 'SELECT * FROM employee_register WHERE branch_name = ? AND employee_designation = "doctor"';
    const sql = `
        SELECT 
         l.*,
            d.employee_name
        FROM 
        employee_leave  AS l
        LEFT JOIN 
        employee_register  AS d ON d.employee_ID = l.employee_ID WHERE
            d.branch_name = ? AND d.employee_designation = "doctor" AND l.leave_status = "Approved"
    `;
    db.query(sql, [branch], (err, result) => {
      if (err) {
        res.status(400).send({status : false, message: "error in fetching doctor" });
      }
      else{
        // Iterate over the result array and delete the password property from each object
        result.forEach(employee => {
          delete employee.employee_password;
        });
        res.json({ data: result, status: true, message: "successful fetching doctor" });
      }
      
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const LoginReceptionist =  (req, res) => {
  try {
    const { email, password,	branch_name } = req.body;
    if(!branch_name){
      return res.status(404).json({
        success : false,
        message:"Please select branch"
      })
    }
    if (!email || !password) {
      return res.status(404).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    db.query(
      `SELECT * FROM employee_register WHERE employee_email = ?`,
      [email],
       (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: false,
            message: "Internal server error",
          });
        }
        if (result.length === 0) {
          return res.status(500).json({
            success: false,
            message:
              "Email is not registered Please contact team for furthur assistance",
          });
        }

        const user = result[0];

        const match = bcrypt.compareSync(password, user.employee_password);
        if (!match) {
          return res.status(401).json({
            success: "false",
            message: "Invalid password",
          });
        }

        if(!user.employee_role.includes("receptionist")){
          return res.status(401).json({
            success: "false",
            message: "Please login with receptionist email",
          });
        }
        if(user.branch_name !== branch_name){
          return res.status(401).json({
            success: "false",
            message: "Please login with your branch",
          });
        }

        if(user.employee_status !== "Approved"){
          return res.status(401).json({
            success: "false",
            message: "Your Email is not approved, Please contact team for furthur assistance",
          });
        }

      

        const token =  JWT.sign({ id: user.id }, process.env.JWT_SECRET, {
          expiresIn: "7d",
        });

        res.status(200).json({
          success: "true",
          message: "Login successful",
          
          user: {
            employee_ID: user.employee_ID,
            email: user.email,
            branch_name: user.branch_name,
            employee_name : user.employee_name,
            employee_mobile : user.employee_mobile,
            employee_designation : user.employee_designation,
            employee_picture : user.employee_picture,
            token: token

          },
          
        });
      }
    );
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: "false", message: "Login failed", error: error });
  }
};


const sendOtp = (req, res) => {
  const { email } = req.body;

  // random otp
  function generateOTP(length) {
    const chars = "0123456789";
    let otp = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      otp += chars[randomIndex];
    }

    return otp;
  }

  const OTP = generateOTP(6);

  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAILSENDER,
        pass: process.env.EMAILPASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAILSENDER,
      to: email,
      subject: "Password Reset OTP",
      text: `Your OTP for password reset is: ${OTP}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        return res
          .status(500)
          .json("An error occurred while sending the email.");
      } else {
        console.log("OTP sent:", info.response);

        const selectQuery = "SELECT * FROM otpcollections WHERE email = ?";
        db.query(selectQuery, email, (err, result) => {
          if (err) {
            res.status(400).json({ success: false, message: err.message });
          }
          if (result && result.length > 0) {
            const updateQuery =
              "UPDATE otpcollections SET code = ? WHERE email = ?";
            db.query(updateQuery, [OTP, email], (upErr, upResult) => {
              if (upErr) {
                res
                  .status(400)
                  .json({ success: false, message: upErr.message });
              }
              res.status(200).send(upResult);
            });
          } else {
            // Assuming you have a 'db' object for database operations
            db.query(
              "INSERT INTO otpcollections (email, code) VALUES (?, ?) ON DUPLICATE KEY UPDATE code = VALUES(code)",
              [email, OTP],
              (err, result) => {
                if (err) {
                  console.error(err);
                  return res
                    .status(500)
                    .send({ message: "Failed to store OTP" });
                }

                res.status(200).json({ message: "OTP sent successfully" });
              }
            );
          }
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json("An error occurred.");
  }
};

const verifyOtp = (req, res) => {
  try {
    const { email, otp } = req.body;
    db.query(
      "SELECT * FROM otpcollections WHERE email = ? AND code = ?",
      [email, otp],
      (err, result) => {
        if (err) {
          return res
            .status(500)
            .json({ success: false, message: "Internal server error" });
        }
        if (result.length > 0) {
          return res
            .status(200)
            .json({ success: true, message: "Otp verification  success" });
        } else {
          return res
            .status(404)
            .json({ success: false, message: "Invalid email or OTP" });
        }
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


module.exports = {addPatient,getDisease,getTreatment,getPatients,bookAppointment,getDoctorDataByBranch,getAppointments,updateAppointmentStatus,updateAppointment,LoginReceptionist,getBranch,getDoctorDataByBranchWithLeave,getBranchDetail};
