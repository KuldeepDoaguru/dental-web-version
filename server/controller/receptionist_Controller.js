const { db } = require("../db");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
dotenv.config();
const nodemailer = require("nodemailer");
const {logger} = require("./logger");
const moment = require('moment-timezone');

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

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAILSENDER,
    pass: process.env.EMAILPASSWORD,
  },
});

const addPatient = (req, res) => {
  try {
    const {
      branch_name,
      clinicName,
        clinicContact,
        clinicAddress,
        clinicEmail,
        doctor_email,
      patient_Name,
      mobile,
      email,
      gender,
      aadhaar_no,
      contact_Person,
      contact_Person_Name,
      blood_Group,
      dob,
      age,
      weight,
      allergy,
      disease,
      patientType,
      status,
      doctorId,
      doctor_name,
      appDateTime,
      treatment,
      opd_amount,
      payment_Mode,
      transaction_Id,
      payment_Status,
      notes,
      address,
      patient_added_by,
      patient_added_by_emp_id,
    } = req.body;

    // const created_at = new Date();
    const created_at =  moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");

    // Generate Patient ID
    const generatePatientId = (count) => {
      const prefix = "DH";
      // const paddedCount = count.toString().padStart(6, '0');
      const paddedCount = count.toString();
      return `${prefix}${paddedCount}`;
    };

    const checkPatientQuery =
      "SELECT * FROM patient_details WHERE mobileno = ? AND patient_name = ?";

    db.query(checkPatientQuery, [mobile, patient_Name], (err, result) => {
      if (err) {
        logger.error("Error checking if user exists in MySQL:");
        console.error("Error checking if user exists in MySQL:", err);
        return res
          .status(500)
          .json({
            error: "Internal server error",
            message: "Internal server error",
          });
      }

      // Check if patient already exists
      if (result.length > 0) {
        logger.info("Patient already exists."); // Log success message
        return res
          .status(400)
          .json({ success: false, message: "Patient already exists." });
      } else {
        // Find the highest empID in the database for the given pattern
        const highestPatientIDQuery =
          "SELECT MAX(CAST(SUBSTRING_INDEX(uhid,'_', -1) AS UNSIGNED)) AS maxID FROM patient_details WHERE uhid LIKE ?";
        const pattern = "DH_%";

        db.query(highestPatientIDQuery, [pattern], (err, result) => {
          if (err) {
            logger.error("Error getting highest empID:");
            console.error("Error getting highest empID:", err);
            res
              .status(500)
              .json({
                error: "Internal server error",
                message: "Internal server error",
              });
          } else {
            let nextID = 1;
            if (result[0].maxID !== null) {
              nextID = parseInt(result[0].maxID) + 1;
            }
            const newPatientID = `DH_${nextID}`;

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

            db.query(
              insertPatientQuery,
              insertPatientParams,
              (insertErr, insertResult) => {
                if (insertErr) {
                  logger.error("Error inserting patient:");
                  console.error("Error inserting patient:", insertErr);
                  return res
                    .status(500)
                    .json({
                      error: "Internal server error",
                      message: "Internal server error",
                    });
                } else {
                  // Proceed with booking appointment
                  const bookAppointmentQuery = `
                              INSERT INTO appointments (
                                  patient_uhid, branch_name, assigned_doctor_name, assigned_doctor_id, appointment_dateTime, treatment_provided, appointment_status,opd_amount, payment_Mode, transaction_Id, payment_Status, notes, appointment_created_by, appointment_created_by_emp_id, created_at
                              ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?, ?, ?, ?)
                          `;

                  const bookAppointmentParams = [
                    newPatientID,
                    branch_name,
                    doctor_name,
                    doctorId,
                    appDateTime,
                    treatment,
                    status,
                    opd_amount,
                    payment_Mode,
                    transaction_Id,
                    payment_Status,
                    notes,
                    patient_added_by,
                    patient_added_by_emp_id,
                    created_at,
                  ];

                  db.query(
                    bookAppointmentQuery,
                    bookAppointmentParams,
                    (appointmentErr, appointmentResult) => {
                      if (appointmentErr) {
                        logger.error("Error booking appointment:");
                        console.error(
                          "Error booking appointment:",
                          appointmentErr
                        );
                        return res
                          .status(500)
                          .json({
                            error: "Internal server error",
                            message: "Internal server error",
                          });
                      } else {
                        console.log("Appointment booked successfully");
                       
                        // Send email if patient's email is available
                    if (email) {

                      // Formulate email subject
  const emailSubject = `Appointment Confirmation - ${clinicName}`;
  
  const appointmentDateTime = new Date(appDateTime);
const appointmentTime = appointmentDateTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

  // Formulate email text
  const emailText = `Dear ${patient_Name.toUpperCase()},\n\n` +
                    `Your appointment at ${clinicName} has been booked successfully.\n\n` +
                    `Appointment Details:\n` +
                    `Doctor Name: ${doctor_name.toUpperCase()}\n` +
                    `Appointment Date and Time: ${appointmentDateTime.toDateString()} ${appointmentTime} \n` +
                    `Treatment Provided: ${treatment}\n` +
                    `OPD Amount: ${opd_amount}\n` +
                    `Payment Mode: ${payment_Mode}\n\n` +

                    `Clinic Details:\n` +
                    `Name: ${clinicName}\n` +
                    `Contact: ${clinicContact}\n` +
                    `Address: ${clinicAddress}\n` +
                    `Email: ${clinicEmail}\n\n` +

                    `Thank you for choosing ${clinicName}.\n\n` +
                    `Best regards,\n` +
                    `${clinicName} Team`;


                      const mailOptions = {
                        from: process.env.EMAILSENDER,
                        to: email,
                        cc: doctor_email, 
                        subject: emailSubject,
                        text: emailText
                      };

                      transporter.sendMail(mailOptions, (emailErr, info) => {
                        if (emailErr) {
                          logger.error('Error sending email:');
                          console.error('Error sending email:', emailErr);
                          // Handle email sending error
                        } else {
                          logger.info('Email sent:'); // Log success message
                          console.log('Email sent:', info.response);
                          // Handle email sent successfully
                        }
                      });
                    }
                    logger.info("Patient and appointment added successfully"); // Log success message
                        return res.status(200).json({
                          success: true,
                          message: "Patient and appointment added successfully",
                          data: appointmentResult,
                          treatment: treatment,
                          user: {
                            id: insertResult.insertId,
                            patientId: newPatientID,
                          },
                        });
                      }
                    }
                  );
                }
              }
            );
          }
        });
      }
    });
  } catch (error) {
    logger.error("Error in registration");
    console.error("Error in registration:", error);
    return res.status(500).json({
      success: false,
      message: "Error in registration",
      error: error.message,
    });
  }
};

const updatePatientDetails = (req, res) => {
  try {
    const {
      patientId,
      patient_Name,
      mobile,
      email,
      gender,
      aadhaar_no,
      contact_Person,
      contact_Person_Name,
      blood_Group,
      dob,
      age,
      weight,
      allergy,
      disease,
      patientType,
      address,
      patient_updated_by,
      patient_updated_by_emp_id,
    } = req.body;

    const updated_at = new Date();

    const updatePatientQuery = `
          UPDATE patient_details
          SET 
             
             
                
           patient_name = ?,dob = ?, age = ?, weight = ?, gender = ? , bloodgroup = ?, mobileno = ?, emailid = ? , contact_person = ?, contact_person_name = ?, allergy = ?, disease = ? , address = ? , patient_type = ? , aadhaar_no = ? , patient_updated_by = ? , patient_updated_by_emp_id = ?, updated_at = ?
          WHERE 
              uhid = ?
      `;

    const updatePatientParams = [
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
      patient_updated_by,
      patient_updated_by_emp_id,
      updated_at,
      patientId,
    ];

    db.query(
      updatePatientQuery,
      updatePatientParams,
      (Err, appointmentResult) => {
        if (Err) {
          logger.error("Error updating Patient:");
          console.error("Error updating Patient:", Err);
          return res
            .status(500)
            .json({ success: false, message: "Internal server error" });
        } else {
          logger.info("Patient updated successfully"); // Log success message
          console.log("Patient updated successfully");
          return res.status(200).json({
            success: true,
            message: "Patient updated successfully",
          });
        }
      }
    );
  } catch (error) {
    logger.error("Error in updating Patient:");
    console.error("Error in updating Patient:", error);
    return res.status(500).json({
      success: false,
      message: "Error in updating Patient",
      error: error.message,
    });
  }
};

const getPatients = (req, res) => {
  const branch = req.params.branch;
  try {
    const sql = "SELECT * FROM patient_details WHERE branch_name = ? ORDER BY created_at DESC";

    db.query(sql, [branch], (err, results) => {
      if (err) {
        logger.error("Error fetching Patients from MySql:");
        console.error("Error fetching Patients from MySql:", err);
        res.status(500).json({ error: "Error fetching Patients" });
      } else {
        logger.info("Patients fetched successfully");
        res
          .status(200)
          .json({ data: results, message: "Patients fetched successfully" });
      }
    });
  } catch (error) {
    logger.error("Error in fetching Patients:");
    console.error("Error fetching Patients from MySql:", error);
    res.status(500).json({
      success: false,
      message: "Error in fetched Patients",
      error: error.message,
    });
  }
};

const getPatientById = (req, res) => {
  const patientId = req.params.patientId;
  const branch = req.params.branch;
  try {
    const sql =
      "SELECT * FROM patient_details WHERE uhid = ? AND branch_name = ?";

    db.query(sql, [patientId, branch], (err, results) => {
      if (err) {
        logger.error("Error fetching Patients from MySql:");
        console.error("Error fetching patient from MySql:", err);
        res.status(500).json({ error: "Error fetching patient" });
      } else {
        if (results.length === 0) {
          logger.info("Patient not found");
          res.status(404).json({ message: "Patient not found" });
        } else {
          logger.info("Patient fetched successfully");
          res
            .status(200)
            .json({
              success: true,
              data: results[0],
              message: "Patient fetched successfully",
            });
        }
      }
    });
  } catch (error) {
    logger.error("Error in fetching Patients:");
    console.error("Error fetching patient from MySql:", error);
    res.status(500).json({
      success: false,
      message: "Error in fetching patient",
      error: error.message,
    });
  }
};

const getDisease = (req, res) => {
  try {
    const sql = "SELECT * FROM patient_disease";

    db.query(sql, (err, results) => {
      if (err) {
        logger.error("Error fetching disease from MySql:");
        console.error("Error fetching disease from MySql:", err);
        res.status(500).json({ error: "Error fetching disease" });
      } else {
        logger.info("Disease fetched successfully"); // Log success message
        res
          .status(200)
          .json({ data: results, message: "Disease fetched successfully" });
      }
    });
  } catch (error) {
    console.error("Error fetching disease from MySql:", error);
    logger.error("Error fetching disease from MySql:", error);
    res.status(500).json({
      success: false,
      message: "Error in fetched disease",
      error: error.message,
    });
  }
};
const getTreatment = (req, res) => {
  try {
    const sql = "SELECT * FROM treatment_list_copy";

    db.query(sql, (err, results) => {
      if (err) {
        logger.error("Error fetching treatment from MySql:");
        console.error("Error fetching treatments from MySql:", err);
        res.status(500).json({ error: "Error fetching treatments" });
      } else {
        logger.info("treatments fetched successfully");
        res
          .status(200)
          .json({ data: results, message: "treatments fetched successfully" });
      }
    });
  } catch (error) {
    logger.error("Error fetching treatments from MySql:");
    console.error("Error fetching treatments from MySql:", error);
    res.status(500).json({
      success: false,
      message: "Error in fetched treatments",
      error: error.message,
    });
  }
};

const bookAppointment = (req, res) => {
  try {
    const {
      branch_name,
      clinicName,
        clinicContact,
        clinicAddress,
        clinicEmail,
        patient_Email,
      patient_uhid,
      patient_Name,
      tp_id,
      status,
      doctorId,
      doctor_name,
      doctor_email,
      appDateTime,
      treatment,
      opd_amount,
      payment_Mode,
      transaction_Id,
      payment_Status,
      notes,
      appointment_created_by,
      appointment_created_by_emp_id,
    } = req.body;

    // const created_at = new Date();
    const created_at =  moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
   
    const bookAppointmentQuery = `
      INSERT INTO appointments (
          patient_uhid,	tp_id, branch_name, assigned_doctor_name, assigned_doctor_id, appointment_dateTime, treatment_provided, appointment_status,opd_amount, payment_Mode, transaction_Id, payment_Status,  notes, appointment_created_by, appointment_created_by_emp_id, created_at
      ) VALUES (?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?, ?, ?, ?)
  `;

    const bookAppointmentParams = [
      patient_uhid,
      tp_id,
      branch_name,
      doctor_name,
      doctorId,
      appDateTime,
      treatment,
      status,
      opd_amount,
      payment_Mode,
      transaction_Id,
      payment_Status,
      notes,
      appointment_created_by,
      appointment_created_by_emp_id,
      created_at,
    ];

    db.query(
      bookAppointmentQuery,
      bookAppointmentParams,
      (appointmentErr, appointmentResult) => {
        if (appointmentErr) {
          logger.error("Error booking appointment:");
          console.error("Error booking appointment:", appointmentErr);
          return res
            .status(500)
            .json({ success: false, message: "Internal server error" });
        } else {
          logger.info("Appointment booked successfully");
          console.log("Appointment booked successfully");

          if (patient_Email) {

            // Formulate email subject
const emailSubject = `Appointment Confirmation - ${clinicName}`;

const appointmentDateTime = new Date(appDateTime);
const appointmentTime = appointmentDateTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

// Formulate email text
const emailText = `Dear ${patient_Name.toUpperCase()},\n\n` +
          `Your appointment at ${clinicName} has been booked successfully.\n\n` +
          `Appointment Details:\n` +
          `Doctor Name: ${doctor_name.toUpperCase()}\n` +
          `Appointment Date and Time: ${appointmentDateTime.toDateString()} ${appointmentTime} \n` +
          `Treatment Provided: ${treatment}\n` +
          `OPD Amount: ${opd_amount}\n` +
          `Payment Mode: ${payment_Mode}\n\n` +

          `Clinic Details:\n` +
          `Name: ${clinicName}\n` +
          `Contact: ${clinicContact}\n` +
          `Address: ${clinicAddress}\n` +
          `Email: ${clinicEmail}\n\n` +

          `Thank you for choosing ${clinicName}.\n\n` +
          `Best regards,\n` +
          `${clinicName} Team`;


            const mailOptions = {
              from: process.env.EMAILSENDER,
              to: patient_Email,
              cc: doctor_email, 
              subject: emailSubject,
              text: emailText
            };

            transporter.sendMail(mailOptions, (emailErr, info) => {
              if (emailErr) {
                logger.error('Error sending email:');
                console.error('Error sending email:', emailErr);
                // Handle email sending error
              } else {
                logger.info('Email sent successfully');
                console.log('Email sent:', info.response);
                // Handle email sent successfully
              }
            });
          }


          return res.status(200).json({
            data: appointmentResult,
            treatment: treatment,
            success: true,
            message: "Appointment Booked successfully",
          });
        }
      }
    );
  } catch (error) {
    logger.error("Error in book appointment:");
    console.error("Error in book appointment:", error);
    return res.status(500).json({
      success: false,
      message: "Error in book appointment",
      error: error.message,
    });
  }
};

const updateAppointment = (req, res) => {
  try {
    const {
      clinicName ,
        clinicContact ,
        clinicAddress,
        clinicEmail ,
        patient_name,
        patient_Email,
      appoint_id,
      doctorId,
      doctor_name,
      doctor_email,
      appDateTime,
      treatment,
      notes,
      appointment_updated_by,
      appointment_updated_by_emp_id,
    } = req.body;

    const updated_at = new Date();
   console.log(doctor_email)
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
      appoint_id,
    ];

    db.query(
      updateAppointmentQuery,
      updateAppointmentParams,
      (appointmentErr, appointmentResult) => {
        if (appointmentErr) {
          logger.error("Error updating appointment:");
          console.error("Error updating appointment:", appointmentErr);
          return res
            .status(500)
            .json({ success: false, message: "Internal server error" });
        } else {
          logger.info("Appointment updated successfully");
          console.log("Appointment updated successfully");

          if (patient_Email) {

            // Formulate email subject
const emailSubject = `Appointment Confirmation - ${clinicName}`;

const appointmentDateTime = new Date(appDateTime);
const appointmentTime = appointmentDateTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

// Formulate email text
const emailText = `Dear ${patient_name.toUpperCase()},\n\n` +
          `Your appointment at ${clinicName} has been edited successfully.\n\n` +
          `Appointment Details:\n` +
          `Doctor Name: ${doctor_name.toUpperCase()}\n` +
          `Appointment Date and Time: ${appointmentDateTime.toDateString()} ${appointmentTime} \n` +
          `Treatment Provided: ${treatment}\n\n` +
        

          `Clinic Details:\n` +
          `Name: ${clinicName}\n` +
          `Contact: ${clinicContact}\n` +
          `Address: ${clinicAddress}\n` +
          `Email: ${clinicEmail}\n\n` +

          `Thank you for choosing ${clinicName}.\n\n` +
          `Best regards,\n` +
          `${clinicName} Team`;


            const mailOptions = {
              from: process.env.EMAILSENDER,
              to: patient_Email,
              cc: doctor_email, 
              subject: emailSubject,
              text: emailText
            };

            transporter.sendMail(mailOptions, (emailErr, info) => {
              if (emailErr) {
                logger.error("Error sending email:");
                console.error('Error sending email:', emailErr);
                // Handle email sending error
              } else {
                logger.info("Email sent successfully");
                console.log('Email sent:', info.response);
                // Handle email sent successfully
              }
            });
          }

          return res.status(200).json({
            success: true,
            message: "Appointment updated successfully",
          });
        }
      }
    );
  } catch (error) {
    logger.error("Error in updating appointment:");
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
    const {
      appointmentId,
      status,
      appointment_updated_by,
      appointment_updated_by_emp_id,
    } = req.body;

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
      appointmentId,
    ];

    db.query(
      updateAppointmentQuery,
      updateAppointmentParams,
      (appointmentErr, appointmentResult) => {
        if (appointmentErr) {
          logger.error("Error in updating appointment status:");
          console.error("Error updating appointment:", appointmentErr);
          return res
            .status(500)
            .json({ success: false, message: "Internal server error" });
        } else {
          logger.info("Appointment updated successfully");
          console.log("Appointment updated successfully");
          return res.status(200).json({
            success: true,
            message: "Appointment updated successfully",
          });
        }
      }
    );
  } catch (error) {
    logger.error("Error in updating appointment status:");
    console.error("Error updating appointment:", error);
    return res.status(500).json({
      success: false,
      message: "Error updating appointment",
      error: error.message,
    });
  }
};

const updateAppointmentStatusCancel = (req, res) => {
  try {
    const {
      appointmentId,
      status,
      cancelReason,
      appointment_updated_by,
      appointment_updated_by_emp_id,
    } = req.body;

    const updated_at = new Date();

    const updateAppointmentQuery = `
          UPDATE appointments
          SET appointment_status = ?, updated_at = ?,appointment_updated_by = ?,cancel_reason = ?, appointment_updated_by_emp_id = ?
          WHERE appoint_id = ?
      `;

    const updateAppointmentParams = [
      status,
      updated_at,
      appointment_updated_by,
      cancelReason,
      appointment_updated_by_emp_id,
      appointmentId,
    ];

    db.query(
      updateAppointmentQuery,
      updateAppointmentParams,
      (appointmentErr, appointmentResult) => {
        if (appointmentErr) {
          logger.error("Error updating appointment:");
          console.error("Error updating appointment:", appointmentErr);
          return res
            .status(500)
            .json({ success: false, message: "Internal server error" });
        } else {
          logger.info("Appointment updated successfully");
          console.log("Appointment updated successfully");
          return res.status(200).json({
            success: true,
            message: "Appointment updated successfully",
          });
        }
      }
    );
  } catch (error) {
    logger.error("Error updating appointment:");
    console.error("Error updating appointment:", error);
    return res.status(500).json({
      success: false,
      message: "Error updating appointment",
      error: error.message,
    });
  }
};
const updateAppointmentStatusCancelOpd = (req, res) => {
  try {
    const {
      clinicName ,
    clinicContact ,
    clinicAddress ,
    clinicEmail ,
    patient_name ,
    patient_Email ,
    doctor_email,
    appDateTime,
    doctor_name,
    treatment,
      appoint_id,
      status,
      payment_Status,

      cancelReason,
      notes,
      appointment_updated_by,
      appointment_updated_by_emp_id,
    } = req.body;

    const updated_at = new Date();
    const refund_date_time =  moment().tz("Asia/Kolkata").format("DD-MM-YYYY HH:mm:ss");
    console.log(doctor_email)
    const updateAppointmentQuery = `
          UPDATE appointments
          SET payment_Status = ?, notes = ?, appointment_status = ?, updated_at = ?,appointment_updated_by = ?,cancel_reason = ?, refund_date_time = ? , appointment_updated_by_emp_id = ?
          WHERE appoint_id = ?
      `;

    const updateAppointmentParams = [
      payment_Status,
      notes,
      status,
      updated_at,
      appointment_updated_by,
      cancelReason,
      refund_date_time,
      appointment_updated_by_emp_id,
      appoint_id,
    ];

    db.query(
      updateAppointmentQuery,
      updateAppointmentParams,
      (appointmentErr, appointmentResult) => {
        if (appointmentErr) {
          logger.error("Error cancel appointment:");
          console.error("Error cancel appointment:", appointmentErr);
          return res
            .status(500)
            .json({ success: false, message: "Internal server error" });
        } else {
          logger.info("Appointment cancel successfully");
          console.log("Appointment cancel successfully");

          if (patient_Email) {

            // Formulate email subject
const emailSubject = `Appointment Cancel Confirmation - ${clinicName}`;

const appointmentDateTime = new Date(appDateTime);
const appointmentTime = appointmentDateTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

// Formulate email text
const emailText = `Dear ${patient_name.toUpperCase()},\n\n` +
          `Your appointment at ${clinicName} has been cancel successfully.\n\n` +
          `Appointment Details:\n` +
          `Doctor Name: ${doctor_name.toUpperCase()}\n` +
          `Appointment Date and Time: ${appointmentDateTime.toDateString()} ${appointmentTime} \n` +
          `Treatment Provided: ${treatment}\n\n` +
        

          `Clinic Details:\n` +
          `Name: ${clinicName}\n` +
          `Contact: ${clinicContact}\n` +
          `Address: ${clinicAddress}\n` +
          `Email: ${clinicEmail}\n\n` +

         
          `Best regards,\n` +
          `${clinicName} Team`;


            const mailOptions = {
              from: process.env.EMAILSENDER,
              to: patient_Email,
              cc: doctor_email, 
              subject: emailSubject,
              text: emailText
            };

            transporter.sendMail(mailOptions, (emailErr, info) => {
              if (emailErr) {
                logger.error("Error sending email:");

                console.error('Error sending email:', emailErr);
                // Handle email sending error
              } else {
                logger.info("Email sent successfully");
                console.log('Email sent:', info.response);
                // Handle email sent successfully
              }
            });
          }
          return res.status(200).json({
            success: true,
            message: "Appointment cancel successfully",
          });
        }
      }
    );
  } catch (error) {
    logger.error("Error cancel appointment:");
    console.error("Error updating appointment:", error);
    return res.status(500).json({
      success: false,
      message: "Error updating appointment",
      error: error.message,
    });
  }
};

const getAppointments = (req, res) => {
  try {
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
            a.opd_amount,
            a.payment_Mode,
            a.transaction_Id,
            a.payment_Status,
            a.appointment_created_by,
            a.appointment_created_by_emp_id,
            a.created_at,
            a.refund_date_time,
            a.notes,
            p.uhid,
            p.patient_name,
            p.mobileno,
            p.emailid,
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

    db.query(sql, [branch], (err, results) => {
      if (err) {
        logger.error("Error fetching appointments");
        console.error("Error fetching Patients from MySql:", err);
        res.status(500).json({ error: "Error fetching appointments" });
      } else {
       
        res
          .status(200)
          .json({
            data: results,
            message: "Appoinmtments fetched successfully",
          });
      }
    });
  } catch (error) {
    logger.error("Error fetching appointments");
    console.error("Error fetching appointments from MySql:", error);
    res.status(500).json({
      success: false,
      message: "Error in fetched appointments",
      error: error.message,
    });
  }
};

const getAppointmentById = (req, res) => {
  try {
    const appointmentId = req.params.appointmentId;
    const branch = req.params.branch;
    const sql = `
      SELECT 
        a.branch_name,
        a.appoint_id,
        a.assigned_doctor_name,
        a.assigned_doctor_id,
        a.appointment_status,
        a.appointment_dateTime,
        a.treatment_provided,
        a.opd_amount,
        a.payment_Mode,
        a.transaction_Id,
        a.payment_Status,
        a.appointment_created_by,
        a.appointment_created_by_emp_id,
        a.notes,
        a.created_at,
        p.uhid,
        p.patient_name,
        p.mobileno,
        p.dob,
        p.age,
        p.weight,
        p.bloodgroup,
        p.disease,
        p.allergy,
        p.patient_type,
        p.address,
        p.gender
      FROM 
        appointments AS a
      JOIN 
        patient_details AS p ON a.patient_uhid = p.uhid 
      WHERE
      a.appoint_id = ? AND
      a.branch_name = ?
    `;

    db.query(sql, [appointmentId, branch], (err, results) => {
      if (err) {
        logger.error("Error fetching appointment from MySql:");
        console.error("Error fetching appointment from MySql:", err);
        res.status(500).json({ error: "Error fetching appointment" });
      } else {
        if (results.length === 0) {
          logger.info("Appointment not found");
          res.status(404).json({ message: "Appointment not found" });
        } else {
          logger.info("Appointment fetched successfully");
          res
            .status(200)
            .json({
              data: results[0],
              message: "Appointment fetched successfully",
            });
        }
      }
    });
  } catch (error) {
    logger.error("Error fetching appointment from MySql:");
    console.error("Error fetching appointment from MySql:", error);
    res.status(500).json({
      success: false,
      message: "Error in fetching appointment",
      error: error.message,
    });
  }
};
const getPatientDeatilsByUhid = (req, res) => {
  try {
    const uhid = req.params.uhid;
    const branch = req.params.branch;
    const sql = `
      SELECT 
       p.tp_id,
       p.uhid,
       p.branch_name,
       p.doctor_name,
       p.doctor_id,
       t.ts_id,
       t.treatment_name,
       t.treatment_status,
       t.ts_id
      FROM 
      (SELECT * FROM treatment_package WHERE uhid = ? ORDER BY tp_id DESC LIMIT 1) AS p
      JOIN 
      treat_suggest AS t ON p.tp_id = t.tp_id 
      WHERE
      p.uhid = ? AND
      p.branch_name = ?
    `;

    db.query(sql, [uhid,uhid, branch], (err, results) => {
      if (err) {
        logger.error("Error fetching Patient details");
        console.error("Error fetching appointment from MySql:", err);
        res.status(500).json({ error: "Error fetching Patient details" });
      } else {
        if (results.length === 0) {
          logger.info("Patient details not found");
          res.status(404).json({ message: "Patient details not found" });
        } else {
          logger.info("Patient details fetched successfully");
          res
            .status(200)
            .json({
              data: results,
              message: "Patient details fetched successfully",
            });
        }
      }
    });
  } catch (error) {
    logger.error("Error fetching Patient details from MySql:");
    console.error("Error fetching Patient details from MySql:", error);
    res.status(500).json({
      success: false,
      message: "Error in fetching Patient details",
      error: error.message,
    });
  }
};

const getAllAppointmentByPatientId = (req, res) => {
  try {
    const patientId = req.params.patientId;
    const branch = req.params.branch;
    const sql = `
      SELECT 
        a.branch_name,
        a.appoint_id,
        a.assigned_doctor_name,
        a.assigned_doctor_id,
        a.appointment_status,
        a.appointment_dateTime,
        a.treatment_provided,
        a.opd_amount,
        a.payment_Mode,
        a.transaction_Id,
        a.payment_Status,
        a.appointment_created_by,
        a.appointment_created_by_emp_id,
        a.notes,
        a.created_at,
        p.uhid,
        p.patient_name,
        p.mobileno,
        p.dob,
        p.age,
        p.weight,
        p.bloodgroup,
        p.disease,
        p.allergy,
        p.patient_type,
        p.address,
        p.gender
      FROM 
        appointments AS a
      JOIN 
        patient_details AS p ON a.patient_uhid = p.uhid 
      WHERE
      a.patient_uhid = ? AND
      a.branch_name = ?
    `;

    db.query(sql, [patientId, branch], (err, results) => {
      if (err) {
        logger.error("Error fetching appointment from MySql:");
        console.error("Error fetching appointment from MySql:", err);
        res.status(500).json({ error: "Error fetching appointment" });
      } else {
        if (results.length === 0) {
          logger.info("Appointment not found");
          res.status(404).json({ message: "Appointment not found" });
        } else {
         
          res
            .status(200)
            .json({
              data: results,
              message: "Appointment fetched successfully",
            });
        }
      }
    });
  } catch (error) {
    logger.error("Error fetching appointment from MySql:");
    console.error("Error fetching appointment from MySql:", error);
    res.status(500).json({
      success: false,
      message: "Error in fetching appointment",
      error: error.message,
    });
  }
};

const getDoctorDataByBranch = (req, res) => {
  try {
    const branch = req.params.branch;
    const getQuery =
      'SELECT * FROM employee_register WHERE branch_name = ? AND employee_role LIKE "%doctor%" AND employee_status = "Approved"';
    db.query(getQuery, [branch], (err, result) => {
      if (err) {
        logger.error("Error fetching doctor data from MySql:");
        res
          .status(400)
          .send({ status: false, message: "error in fetching doctor" });
      } else {
        // Iterate over the result array and delete the password property from each object
        result.forEach((employee) => {
          delete employee.employee_password;
        });
        res.json({
          data: result,
          status: true,
          message: "successful fetching doctor",
        });
      }
    });
  } catch (error) {
    logger.error("Error fetching doctor data from MySql:");
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getBranch = (req, res) => {
  try {
    const sql = "SELECT * FROM branches";

    db.query(sql, (err, results) => {
      if (err) {
        logger.error("Error fetching branch from MySql:");
        console.error("Error fetching Branches from MySql:", err);
        res.status(500).json({ error: "Error fetching Branches" });
      } else {
       
        res
          .status(200)
          .json({ data: results, message: "Branches fetched successfully" });
      }
    });
  } catch (error) {
    logger.error("Error fetching branch from MySql:");
    console.error("Error fetching Branches from MySql:", error);
    res.status(500).json({
      success: false,
      message: "Error in fetched Branches",
      error: error.message,
    });
  }
};

const getBranchDetail = (req, res) => {
  try {
    const branch = req.params.branch;
    const sql = "SELECT * FROM branches WHERE branch_name = ?";

    db.query(sql, [branch], (err, results) => {
      if (err) {
        logger.error("Error fetching branch details from MySql:");
        console.error("Error fetching Branches from MySql:", err);
        res.status(500).json({ error: "Error fetching Branches" });
      } else {
       
        res
          .status(200)
          .json({ data: results, message: "Branches fetched successfully" });
      }
    });
  } catch (error) {
    logger.error("Error fetching branch details from MySql:");
    console.error("Error fetching Branches from MySql:", error);
    res.status(500).json({
      success: false,
      message: "Error in fetched Branches",
      error: error.message,
    });
  }
};

const getBranchHoliday = (req, res) => {
  try {
    const branch = req.params.branch;
    const sql = "SELECT * FROM holidays WHERE branch_name = ?";

    db.query(sql, [branch], (err, results) => {
      if (err) {
        logger.error("Error fetching Branch Holidays from MySql:");
        console.error("Error fetching Branch Holidays from MySql:", err);
        res.status(500).json({ error: "Error fetching Branch Holidays" });
      } else {
        logger.info("Branch Holidays fetched successfully");
        res
          .status(200)
          .json({
            data: results,
            message: "Branch Holidays fetched successfully",
          });
      }
    });
  } catch (error) {
    logger.error("Error fetching Branch Holidays from MySql:");
    console.error("Error fetching Branch Holidays from MySql:", error);
    res.status(500).json({
      success: false,
      message: "Error in fetched Branch Holidays",
      error: error.message,
    });
  }
};

const applyLeave = (req, res) => {
  try {
    const {
      employee_ID, 
    employee_name, 
    branch_name ,
    leave_dates ,
    leave_reason ,
    leave_status 
      
    } = req.body;

    

    const addLeaveQuery = `
    INSERT INTO employee_leave(
      employee_ID, 
      employee_name, 
      branch_name ,
      leave_dates ,
      leave_reason ,
      leave_status 
    ) VALUES (?, ?, ?, ?, ?, ?)
`;

    const addLeaveParams = [
      employee_ID, 
      employee_name, 
      branch_name ,
      leave_dates ,
      leave_reason ,
      leave_status 
    ];

    db.query(addLeaveQuery, addLeaveParams, (err, Result) => {
      if (err) {
        logger.error("Error adding Leave from MySql:");
        console.error("Error in apply leave:", err);
        return res
          .status(500)
          .json({ success: false, message: "Internal server error" });
      } else {
        logger.info("Leave apply successfully");
        console.log("Leave apply successfully");
        return res.status(200).json({
          success: true,
          message: "Leave apply successfully",
        });
      }
    });
  } catch (error) {
    logger.error("Error adding Leave from MySql:");
    console.error("Error in apply leave:", error);
    return res.status(500).json({
      success: false,
      message: "Error in apply leave:",
      error: error.message,
    });
  }
};

const MarkAttendanceLogin = (req, res) => {
  try {
    const {
      branch_name,
      employee_ID,
      employee_name,
      employee_designation,
      date,
      loginTime,
      availability
    } = req.body;

    const todayDate = new Date().toISOString().slice(0, 10); // Get today's date in YYYY-MM-DD format

    // if (date.slice(0, 10) !== todayDate) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Attendance can only be marked for today's date."
    //   });
    // }

    // Check if the employee ID for today's date and login time already exists
    const checkQuery = `
      SELECT * FROM employee_attendance 
      WHERE employee_ID = ? AND date = ?`;

    const checkParams = [employee_ID,date ];

    db.query(checkQuery, checkParams, (err, result) => {
      if (err) {
        logger.error("Error in checking attendance:");
        console.error("Error in checking attendance:", err);
        return res.status(500).json({
          success: false,
          message: "Internal server error"
        });
      }

      if (result.length > 0) {
        logger.info("Attendance for this employee on today's date and login time already exists.");
        return res.status(400).json({
          success: false,
          message: "Attendance for this employee on today's date and login time already exists."
        });
      }

      // If validation passes, proceed to insert the attendance record
      const addQuery = `
        INSERT INTO employee_attendance(
          employee_ID,
          emp_name,
          branch,
          employee_designation,
          date,
          allday_shift_login_time,
          availability
        ) VALUES (?, ?, ?, ?, ?, ?,?)
      `;

      const addParams = [
        employee_ID,
        employee_name,
        branch_name,
        employee_designation,
        date,
        loginTime,
        availability
      ];

      db.query(addQuery, addParams, (err, result) => {
        if (err) {
          logger.error("Error in adding attendance:");
          console.error("Error in marking login", err);
          return res.status(500).json({
            success: false,
            message: "Internal server error"
          });
        } else {
          logger.info("Attendance marked successfully");
          console.log("login marked successfully");
          return res.status(200).json({
            success: true,
            message: "login marked successfully"
          });
        }
      });
    });
  } catch (error) {
    logger.error("Error in marking login:");
    console.error("Error in marking login:", error);
    return res.status(500).json({
      success: false,
      message: "Error in marking login:",
      error: error.message
    });
  }
};
const MarkAttendanceLogout = (req, res) => {
  try {
    const {
      branch_name,
      employee_ID,
      employee_name,
      employee_designation,
      date,
      logoutTime,
      availability
    } = req.body;

    // Check if the employee ID for today's date and logout time already exists
      

    const checkQuery = `
      SELECT * FROM employee_attendance 
      WHERE employee_ID = ? AND date = ? AND branch = ? AND allday_shift_logout_time IS NOT NULL `;

    const checkParams = [employee_ID, date,branch_name];
     
    db.query(checkQuery, checkParams, (err, result) => {
      if (err) {
        logger.error("Error in checking attendance:");
        console.error("Error in checking attendance:", err);
        return res.status(500).json({
          success: false,
          message: "Internal server error"
        });
      }

      if (result.length > 0) {
        logger.info("Attendance for this employee on today's date and login time already exists.");
        return res.status(400).json({
          success: false,
          message: "Attendance for this employee on today's date and logout time already exists."
        });
      }

      // If validation passes, proceed to update the attendance record
      const updateQuery = `
        UPDATE employee_attendance 
        SET allday_shift_logout_time = ? , availability = ?
        WHERE employee_ID = ? AND date = ?`;

      const updateParams = [logoutTime,availability, employee_ID, date];

      db.query(updateQuery, updateParams, (err, result) => {
        if (err) {
          logger.error("Error in marking attendance logout");
          console.error("Error in marking logout", err);
          return res.status(500).json({
            success: false,
            message: "Internal server error"
          });
        } else {
          logger.info("Attendance Logout marked successfully");
          console.log("Logout marked successfully");
          return res.status(200).json({
            success: true,
            message: "Logout marked successfully"
          });
        }
      });
    });
  } catch (error) {
    logger.error("Error in marking attendance logout");
    console.error("Error in marking logout:", error);
    return res.status(500).json({
      success: false,
      message: "Error in marking logout:",
      error: error.message
    });
  }
};

const getTodayAttendance = (req, res) => {
  try {
    const branch = req.params.branch;
    const employee_ID = req.params.employee_ID;
    const date = req.params.date;

    const sql = "SELECT * FROM employee_attendance WHERE branch = ? AND employee_ID = ? AND date = ?";

    db.query(sql, [branch,employee_ID,date], (err, results) => {
      if (err) {
        logger.error("Error fetching attendance from MySql:");
        console.error("Error fetching attendance from MySql:", err);
        res.status(500).json({ error: "Error fetching Branch  attendance" });
      } else {
        logger.info( "attendance fetched successfully");
        res
          .status(200)
          .json({
            data: results,
            message: " attendance fetched successfully",
          });
      }
    });
  } catch (error) {
    logger.error("Error fetching attendance from MySql:");
    console.error("Error fetching  attendance from MySql:", error);
    res.status(500).json({
      success: false,
      message: "Error in fetched  attendance",
      error: error.message,
    });
  }
};
const getAttendancebyempId = (req, res) => {
  try {
    const branch = req.params.branch;
    const employee_ID = req.params.employee_ID;
    
    const sql = "SELECT * FROM employee_attendance WHERE branch = ? AND employee_ID = ? ORDER BY attendance_id DESC";

    db.query(sql, [branch,employee_ID], (err, results) => {
      if (err) {
        logger.error("Error fetching attendance from MySql:");
        console.error("Error fetching attendance from MySql:", err);
        res.status(500).json({ error: "Error fetching Branch  attendance" });
      } else {
        logger.info( "attendance fetched successfully");
        res
          .status(200)
          .json({
            data: results,
            message: " attendance fetched successfully",
          });
      }
    });
  } catch (error) {
    logger.error("Error fetching attendance from MySql:");
    console.error("Error fetching  attendance from MySql:", error);
    res.status(500).json({
      success: false,
      message: "Error in fetched  attendance",
      error: error.message,
    });
  }
};







const addInquiry = (req, res) => {
  try {
    const {
      branch,
      patientName,
      mobile,
      email,
      gender,
      age,
      address,
      notes,
      doctorId,
      doctorName,
    } = req.body;

    const created_at =  moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");

    const addInquiryQuery = `
    INSERT INTO inquiries (
      branch,
      patient_name,
      mobile,
      email,
      gender,
      age,
      address,
      notes,
      doctorId,
      doctorName,
      created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`;

    const addInquiryParams = [
      branch,
      patientName,
      mobile,
      email,
      gender,
      age,
      address,
      notes,
      doctorId,
      doctorName,
      created_at,
    ];

    db.query(addInquiryQuery, addInquiryParams, (err, Result) => {
      if (err) {
        logger.error("Error booking Inquiry add:");
        console.error("Error booking Inquiry add:", err);
        return res
          .status(500)
          .json({ success: false, message: "Internal server error" });
      } else {
        logger.info("Inquiry add successfully");
        console.log("Inquiry add successfully");
        return res.status(200).json({
          success: true,
          message: "Inquiry add successfully",
        });
      }
    });
  } catch (error) {
    logger.error("Error booking Inquiry add:");
    console.error("Error in Inquiry add:", error);
    return res.status(500).json({
      success: false,
      message: "Error in Inquiry add",
      error: error.message,
    });
  }
};

const updateInquiry = (req, res) => {
  try {
    const {
      id, // ID of the inquiry to update
      patientName,
      mobile,
      email,
      gender,
      age,
      address,
      notes,
      doctorId,
      doctorName,
    } = req.body;

    const updated_at = new Date();

    const updateInquiryQuery = `
      UPDATE inquiries 
      SET 
        
        patient_name = ?, 
        mobile = ?, 
        email = ?, 
        gender = ?, 
        age = ?, 
        address = ?, 
        notes = ?, 
        doctorId = ?, 
        doctorName = ?, 
        updated_at = ?
      WHERE 
        id = ?
    `;

    const updateInquiryParams = [
      patientName,
      mobile,
      email,
      gender,
      age,
      address,
      notes,
      doctorId,
      doctorName,
      updated_at,
      id,
    ];

    db.query(updateInquiryQuery, updateInquiryParams, (err, result) => {
      if (err) {
        logger.error("Error updating inquiry:");
        console.error("Error updating inquiry:", err);
        return res
          .status(500)
          .json({ success: false, message: "Internal server error" });
      } else {
        logger.info("Inquiry updated successfully");
        console.log("Inquiry updated successfully");
        return res.status(200).json({
          success: true,
          message: "Inquiry updated successfully",
        });
      }
    });
  } catch (error) {
    logger.error("Error updating inquiry:");
    console.error("Error in updating inquiry:", error);
    return res.status(500).json({
      success: false,
      message: "Error in updating inquiry",
      error: error.message,
    });
  }
};

const deleteInquiry = (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const deleteInquiryQuery = `
      DELETE FROM inquiries 
      WHERE id = ?
    `;

    db.query(deleteInquiryQuery, [id], (err, result) => {
      if (err) {
        logger.error("Error deleting inquiry:");
        console.error("Error deleting inquiry:", err);
        return res
          .status(500)
          .json({ success: false, message: "Internal server error" });
      } else {
        logger.info("Inquiry deleted successfully");
        console.log("Inquiry deleted successfully");
        return res.status(200).json({
          success: true,
          message: "Inquiry deleted successfully",
        });
      }
    });
  } catch (error) {
    logger.error("Error deleting inquiry:");
    console.error("Error in deleting inquiry:", error);
    return res.status(500).json({
      success: false,
      message: "Error in deleting inquiry",
      error: error.message,
    });
  }
};

const getInquiries = (req, res) => {
  const branch = req.params.branch;
  try {
    const sql = "SELECT * FROM inquiries WHERE branch = ? ORDER BY id DESC";

    db.query(sql, [branch], (err, results) => {
      if (err) {
        logger.error("Error getting inquiries:");
        console.error("Error fetching inquiries from MySql:", err);
        res.status(500).json({ error: "Error fetching inquiries" });
      } else {
        
        res
          .status(200)
          .json({ data: results, message: "inquiries fetched successfully" });
      }
    });
  } catch (error) {
    logger.error("Error getting inquiries:");
    console.error("Error fetching inquiries from MySql:", error);
    res.status(500).json({
      success: false,
      message: "Error in fetched inquiries",
      error: error.message,
    });
  }
};
const getLeaves = (req, res) => {
  const branch = req.params.branch;
  const employee_Id = req.params.employee_Id;
  try {
    const sql = "SELECT * FROM employee_leave WHERE branch_name = ? AND employee_ID = ? ORDER BY id DESC";

    db.query(sql, [branch,employee_Id], (err, results) => {
      if (err) {
        logger.error("Error getting leaves:");
        console.error("Error fetching leaves from MySql:", err);
        res.status(500).json({ error: "Error fetching leaves" });
      } else {
        logger.info("Leaves fetched successfully");
        res
          .status(200)
          .json({ data: results, message: "leaves fetched successfully" });
      }
    });
  } catch (error) {
    logger.error("Error getting leaves:");
    console.error("Error fetching leaves from MySql:", error);
    res.status(500).json({
      success: false,
      message: "Error in fetched leaves",
      error: error.message,
    });
  }
};

const getDoctorDataByBranchWithLeave = (req, res) => {
  try {
    const branch = req.params.branch;
    const getQuery =
      'SELECT * FROM employee_register WHERE branch_name = ? AND employee_role LIKE "%doctor%"';
    const sql = `
        SELECT 
         l.*,
            d.employee_name
        FROM 
        employee_leave  AS l
        LEFT JOIN 
        employee_register  AS d ON d.employee_ID = l.employee_ID WHERE
            d.branch_name = ? AND d.employee_role LIKE "%doctor%" AND l.leave_status = "Approved"
    `;
    db.query(sql, [branch], (err, result) => {
      if (err) {
        logger.error("Error getting doctor data by branch with leave:");
        res
          .status(400)
          .send({ status: false, message: "error in fetching doctor" });
      } else {
        // Iterate over the result array and delete the password property from each object
        result.forEach((employee) => {
          delete employee.employee_password;
        });
        res.json({
          data: result,
          status: true,
          message: "successful fetching doctor",
        });
      }
    });
  } catch (error) {
    logger.error("Error getting doctor data by branch with leave:");
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// const getPatientSecurityAmt = (req, res) => {
  
//   const branch = req.params.branch;
//   const sql = `SELECT * from security_amount WHERE branch_name = ?  `;

//   db.query(sql,[branch], (err, result) => {
//       if (err) {
//           console.error('Error executing query:', err.stack);
//           return res.status(500).json({success:false, error: 'Internal server error' });
//       } else if (result.length === 0) {
//           return res.status(404).json({success:false, error: "Not Found Data" });
//       } else {
//           return res.status(200).json({success: true, message: 'Access data Successfully',data : result });
//       }
//   });
// };

const getSecurityAmountDataByBranch = (req, res) => {
  try {
    const branch = req.params.branch;
    const selectQuery = "SELECT * FROM security_amount WHERE branch_name = ? ORDER BY sa_id DESC";
    db.query(selectQuery, branch, (err, result) => {
      if (err) {
        logger.error("Error getting security amount data by branch");
        res.status(400).json({ success: false, message: err.message });
      }
     
      res.status(200).send(result);
    });
  } catch (error) {
    logger.error("Error getting security amount data by branch");
    console.log(error);
    response.status(500).json({ success: false, message: error.message });
  }
};


const updateRefundAmount = (req, res) => {
  const date =  moment().tz("Asia/Kolkata").format("DD-MM-YYYY HH:mm:ss");
  try {
    const sid = req.params.sid;
    const {
      refund_amount,
      refund_by,
      payment_status,
      remaining_amount,
    } = req.body;
    console.log(req.body);
    // Checking if all required fields are present in the request body
    if (!refund_amount || !refund_by || !payment_status) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
   

    const selectQuery = "SELECT * FROM security_amount WHERE sa_id = ?";
    db.query(selectQuery, sid, (err, result) => {
      if (err) {
        logger.error("Error update refund amount ");
        return res.status(400).json({ success: false, message: err.message });
      }
      if (result && result.length > 0) {
        const updateQuery = `UPDATE security_amount SET refund_amount = ?, refund_date = ?, refund_by = ?, payment_status = ?, remaining_amount = ? WHERE sa_id = ?`;

        db.query(
          updateQuery,
          [
            refund_amount,
            date,
            refund_by,
            payment_status,
            remaining_amount,
            sid,
          ],
          (err, result) => {
            if (err) {
              logger.error("Error update refund amount ");
              return res.status(500).json({
                success: false,
                message: "Failed to update details",
              });
            } else {
              logger.info("Amount Refund Successfully");
              return res.status(200).json({
                success: true,
                message: "Amount Refund Successfully",
              });
            }
          }
        );
      } else {
        logger.error("Error update refund amount ");
        return res.status(404).json({
          success: false,
          message: "Data not found",
        });
      }
    });
  } catch (error) {
    logger.error("Error update refund amount ");
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getSinglePatientSecurityAmt = (req, res) => {
  
  const branch = req.params.branch;
  const sid = req.params.sid;
  const sql = `SELECT * from security_amount WHERE branch_name = ? AND sa_id = ? `;

  db.query(sql,[branch,sid], (err, result) => {
      if (err) {
        logger.error("Error get single patient security amount");
          console.error('Error executing query:', err.stack);
          return res.status(500).json({success:false, error: 'Internal server error' });
      } else if (result.length === 0) {
          return res.status(404).json({success:false, error: "Not Found Data" });
      } else {
        logger.info("Successfully get single patient security amount");
          return res.status(200).json({success: true, message: 'Access data Successfully',data : result });
      }
  });
};

const getSecurityAmountDataBySID = (req, res) => {
  try {
    const sid = req.params.sid;
    const selectQuery =
      "SELECT * FROM security_amount JOIN patient_details ON security_amount.uhid = patient_details.uhid WHERE security_amount.sa_id = ?";
    db.query(selectQuery, sid, (err, result) => {
      if (err) {
        logger.error("Error get security amount data by sid");
        res.status(400).json({ success: false, message: err.message });
      }
      logger.info("getting security amount data successfully by sid");
      res.status(200).send(result);
    });
  } catch (error) {
    logger.error("Error get security amount data by sid");
    console.log(error);
    response.status(500).json({ success: false, message: error.message });
  }
};

const getPatientBillsByBranch = (req, res) => {
  try {
    const branch = req.params.branch;
    const selectQuery = "SELECT * FROM patient_bills WHERE branch_name = ? ORDER BY bill_id DESC";
    db.query(selectQuery, branch, (err, result) => {
      if (err) {
        logger.error("Error get patient bills by branch");
        res.status(400).json({ success: false, message: err.message });
      }
     
      res.status(200).send(result);
    });
  } catch (error) {
    logger.error("Error get patient bills by branch");
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const updatePatientSecurityAmt = (req, res) => {
  try {
    const sid = req.params.sid;
    const { payment_status, payment_Mode, transaction_Id, notes, received_by, remaining_amount } =
      req.body;

    const payment_date = moment().tz("Asia/Kolkata").format("DD-MM-YYYY HH:mm:ss");
   

    console.log(req.body)

    const updatePatientQuery = `
          UPDATE security_amount
          SET payment_status = ? , payment_Mode = ? , transaction_Id = ?, received_by = ? , payment_date = ?, notes = ?, remaining_amount = ?
          WHERE sa_id = ?
      `;

    const updatePatientParams = [
      payment_status,
      payment_Mode,
      transaction_Id,
      received_by,
      payment_date,
      notes,
      remaining_amount,
      sid,
    ];

    db.query(
      updatePatientQuery,
      updatePatientParams,
      (Err, appointmentResult) => {
        if (Err) {
          logger.error("Error update patient security amount");
          console.error("Error updating Patient:", Err);
          return res
            .status(500)
            .json({ success: false, message: "Internal server error" });
        } else {
          logger.info("Successfully update patient security amount");
          console.log("Payment added successfully");
          return res.status(200).json({
            success: true,
            message: "Payment added successfully",
          });
        }
      }
    );
  } catch (error) {
    logger.error("Error update patient security amount");
    console.error("Error in adding Payment", error);
    return res.status(500).json({
      success: false,
      message: "Error in adding Payment",
      error: error.message,
    });
  }
};



// const updatePatientSecurityAmt = (req, res) => {
//   try {
//     const {
//       sa_id  ,
//       amount ,
//       payment_status ,
//       payment_Mode,
//       transaction_Id	,
//       notes ,
  
//       received_by,
//     } = req.body;

//     const payment_date = new Date();

//     const updatePatientQuery = `
//           UPDATE security_amount
//           SET payment_status = ? , payment_Mode = ? , transaction_Id = ?, received_by = ? , payment_date = ?, notes = ?
//           WHERE sa_id = ?
//       `;

//     const updatePatientParams = [
//       payment_status,
//       payment_Mode,
//       transaction_Id,
//       received_by,
//       payment_date,
//       notes,
//       sa_id,
//     ];

//     db.query(
//       updatePatientQuery,
//       updatePatientParams,
//       (Err, appointmentResult) => {
//         if (Err) {
//           console.error("Error updating Patient:", Err);
//           return res
//             .status(500)
//             .json({ success: false, message: "Internal server error" });
//         } else {
//           console.log("Payment added successfully");
//           return res.status(200).json({
//             success: true,
//             message: "Payment added successfully",
//           });
//         }
//       }
//     );
//   } catch (error) {
//     console.error("Error in adding Payment", error);
//     return res.status(500).json({
//       success: false,
//       message: "Error in adding Payment",
//       error: error.message,
//     });
//   }
// };

// const updateRefundAmount = (req, res) => {
//   try {
//     const sid = req.params.sid;
//     const { refund_amount, refund_date, refund_by, payment_status } = req.body;

//     // Checking if all required fields are present in the request body
//     if (!refund_amount || !refund_date || !refund_by || !payment_status) {
//       return res.status(400).json({
//         success: false,
//         message: "All fields are required",
//       });
//     }

//     const selectQuery = "SELECT * FROM security_amount WHERE sa_id = ?";
//     db.query(selectQuery, sid, (err, result) => {
//       if (err) {
//         return res.status(400).json({ success: false, message: err.message });
//       }
//       if (result && result.length > 0) {
//         const updateQuery = "UPDATE security_amount SET refund_amount = ?, refund_date = ?, refund_by = ?, payment_status = ? WHERE sa_id = ?";

//         db.query(
//           updateQuery,
//           [refund_amount, refund_date, refund_by, payment_status, sid],
//           (err, result) => {
//             if (err) {
//               return res.status(500).json({
//                 success: false,
//                 message: "Failed to update details",
//               });
//             } else {
//               return res.status(200).json({
//                 success: true,
//                 message: "Amount Refund Successfully",
//               });
//             }
//           }
//         );
//       } else {
//         return res.status(404).json({
//           success: false,
//           message: "Data not found",
//         });
//       }
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ success: false, message: error.message });
//   }
// };



const insertTimelineEvent = (req, res) => {
  const date = moment().tz("Asia/Kolkata").format("DD-MM-YYYY"); // Get today's date in DD-MM-YYYY format
  const time = moment().tz("Asia/Kolkata").format("HH:mm:ss"); 
  try {
    const { type, description, branch, patientId } = req.body;
    const insertQuery =
      "INSERT INTO patient_timeline (event_type,	event_description,	branch_name,	uhid , event_time , event_date	) VALUES (?,?,?,?,?,?)";

    db.query(
      insertQuery,
      [type, description, branch, patientId , time , date],
      (err, result) => {
        if (err) {
          logger.error("Error adding timeline event");
          res.status(400).json({ success: false, message: err.message });
        }
       
        res.status(200).json({ success: true, result: result });
      }
    );
  } catch (error) {
    logger.error("Error adding timeline event");
    console.log(error);
    res.status(500).json({ success: false, message: err.message });
  }
};

const getPatientTimeline = (req, res) => {
  const patientId = req.params.patientId;
  const branch = req.params.branch;
  try {
    const sql =
      "SELECT * FROM patient_timeline WHERE uhid = ? AND branch_name = ? ORDER BY event_id DESC";

    db.query(sql, [patientId, branch], (err, results) => {
      if (err) {
        logger.error("Error getting patient timeline");
        console.error("Error fetching patient_timeline from MySql:", err);
        res.status(500).json({ error: "Error fetching patient_timeline" });
      } else {
       
        res
          .status(200)
          .json({
            data: results,
            message: "patient_timeline fetched successfully",
          });
      }
    });
  } catch (error) {
    logger.error("Error getting patient timeline");
    console.error("Error fetching patient_timeline from MySql:", error);
    res.status(500).json({
      success: false,
      message: "Error in fetched patient_timeline",
      error: error.message,
    });
  }
};

const LoginReceptionist = (req, res) => {
  try {
    const { email, password, branch_name } = req.body;
    if (!branch_name) {

      return res.status(404).json({
        success: false,
        message: "Please select branch",
      });
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
          logger.error("Internal server error in login");
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
          console.log(user.id)
        const match = bcrypt.compareSync(password, user.employee_password);
        if (!match) {
          return res.status(401).json({
            success: "false",
            message: "Invalid password",
          });
        }

        if (!user.employee_role.includes("receptionist")) {
          return res.status(401).json({
            success: "false",
            message: "Please login with receptionist email",
          });
        }
        if (user.branch_name !== branch_name) {
          return res.status(401).json({
            success: "false",
            message: "Please login with your branch",
          });
        }

        if (user.employee_status !== "Approved") {
          logger.info("Your Email is not approved, Please contact team for furthur assistance");
          return res.status(401).json({
            success: "false",
            message:
              "Your Email is not approved, Please contact team for furthur assistance",
          });
        }
          
        const token = JWT.sign({ id: user.employee_ID }, process.env.JWT_SECRET, {
          expiresIn: "7d",
        });
        logger.info("Login successful");
        res.status(200).json({
          success: "true",
          message: "Login successful",

          user: {
            employee_ID: user.employee_ID,
            email: user.email,
            branch_name: user.branch_name,
            employee_name: user.employee_name,
            employee_mobile: user.employee_mobile,
            employee_email : user.employee_email,
            gender: user.gender,
            employee_role: user.employee_role,
            address: user.address,
            morning_shift_start_time: user.morning_shift_start_time	,
            morning_shift_end_time	: user.morning_shift_end_time	,
            evening_shift_start_time : user.evening_shift_start_time,
            evening_shift_end_time : user.evening_shift_end_time,
            allday_shift_start_time: user.allday_shift_start_time,
            allday_shift_end_time : user.allday_shift_end_time,
            working_days : user.working_days,
            employee_designation: user.employee_designation,
            employee_picture: user.employee_picture,

            token: token,
          },
        });
      }
    );
  } catch (error) {
    logger.error("Login failed");
    console.log(error);
    res
      .status(500)
      .json({ success: "false", message: "Login failed", error: error });
  }
};

const getBranchDetailsByBranch = (req, res) => {
  try {
    const branch = req.params.branch;
    const getQuery = "SELECT * FROM branches WHERE branch_name = ?";
    db.query(getQuery, branch, (err, result) => {
      if (err) {
        logger.error("Error getting branch details");
        res.status(400).json({ success: false, message: err.message });
      }
      res.status(200).json(result);
    });
  } catch (error) {
    logger.error("Error getting branch details");
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getSecurityAmountDataByTPUHID = (req, res) => {
  try {
    const tpid = req.params.tpid;
    const uhid = req.params.uhid;
    const selectQuery =
      "SELECT * FROM security_amount WHERE tp_id = ? AND uhid = ?";
    db.query(selectQuery, [tpid, uhid], (err, result) => {
      if (err) {
        logger.error("Error getting security amount data");
        res.status(400).json({ success: false, message: err.message });
      }
     
      res.status(200).send(result);
    });
  } catch (error) {
    logger.error("Error getting security amount data");
    console.log(error);
    response.status(500).json({ success: false, message: error.message });
  }
};

const getPatientBillsAndSecurityAmountByBranch = (req, res) => {
  try {
    const branch = req.params.branch;
    const bid = req.params.bid;
    const selectQuery =
      "SELECT * FROM patient_bills WHERE branch_name = ? AND bill_id = ?";
    db.query(selectQuery, [branch, bid], (err, result) => {
      if (err) {
        logger.error("Error getting patient bills and security amount");
        res.status(400).json({ success: false, message: err.message });
      }
      
      res.status(200).send(result);
    });
  } catch (error) {
    logger.error("Error getting patient bills and security amount");
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const updateRemainingSecurityAmount = (req, res) => {
  try {
    const tpid = req.params.tp_id;
    const uhid = req.params.uhid;

    const { remaining_amount } = req.body;
    console.log(remaining_amount);

    // Checking if all required fields are present in the request body

    const selectQuery =
      "SELECT * FROM security_amount WHERE tp_id = ? AND  uhid = ?";
    db.query(selectQuery, [tpid, uhid], (err, result) => {
      if (err) {
        logger.error("Error update Remaining Security Amount");
        return res.status(400).json({ success: false, message: err.message });
      }
      if (result && result.length > 0) {
        const updateQuery = `UPDATE security_amount SET remaining_amount = ? WHERE tp_id = ? AND uhid = ?`;

        db.query(updateQuery, [remaining_amount, tpid, uhid], (err, result) => {
          if (err) {
            logger.error("Error update Remaining Security Amount");
            return res.status(500).json({
              success: false,
              message: "Failed to update details",
            });
          } else {
            logger.info("Successfully update Remaining Security Amount");
            return res.status(200).json({
              success: true,
              message: "remaining amount update Successfully",
            });
          }
        });
      } else {
        logger.error("Error update Remaining Security Amount");
        return res.status(404).json({
          success: false,
          message: "Data not found",
        });
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const makeBillPayment = (req, res) => {
  const payment_date_time = moment().tz("Asia/Kolkata").format("DD-MM-YYYY HH:mm:ss");
  try {
    const bid = req.params.bid;
    const branch = req.params.branch;
    const {
      paid_amount,
      payment_status,
      payment_mode,
      transaction_Id,
      note,
      receiver_name,
      receiver_emp_id,
      pay_by_sec_amt,
    } = req.body;
    const selectQuery =
      "SELECT * FROM patient_bills WHERE branch_name = ? AND bill_id = ?";

    db.query(selectQuery, [branch, bid], (err, result) => {
      if (err) {
        logger.error("Error get patient bill details");
        return res.status(400).json({ success: false, message: err.message });
      }
      if (result && result.length > 0) {
        const updateFields = [];
        const updateValues = [];

        if (paid_amount) {
          updateFields.push("paid_amount = ?");
          updateValues.push(paid_amount);
        }

        if (payment_status) {
          updateFields.push("payment_status = ?");
          updateValues.push(payment_status);
        }

        if (payment_date_time) {
          updateFields.push("payment_date_time = ?");
          updateValues.push(payment_date_time);
        }
        if (payment_mode) {
          updateFields.push("payment_mode = ?");
          updateValues.push(payment_mode);
        }
        if (transaction_Id) {
          updateFields.push("transaction_Id = ?");
          updateValues.push(transaction_Id);
        }
        if (note) {
          updateFields.push("note = ?");
          updateValues.push(note);
        }
        if (receiver_name) {
          updateFields.push("receiver_name = ?");
          updateValues.push(receiver_name);
        }
        if (receiver_emp_id) {
          updateFields.push("receiver_emp_id = ?");
          updateValues.push(receiver_emp_id);
        }
        if (pay_by_sec_amt) {
          updateFields.push("pay_by_sec_amt = ?");
          updateValues.push(pay_by_sec_amt);
        }

        const updateQuery = `UPDATE patient_bills SET ${updateFields.join(
          ", "
        )} WHERE branch_name = ? AND bill_id = ?`;

        db.query(updateQuery, [...updateValues, branch, bid], (err, result) => {
          if (err) {
            logger.error("Failed to update patient bill details ");
            return res.status(500).json({
              success: false,
              message: "Failed to update details",
            });
          } else {
            logger.info("Patient bill details updated successfully");
            return res.status(200).json({
              success: true,
              message: "Payment updated successfully",
            });
          }
        });
      } else {
        logger.error("Failed to update patient bill details ");
        return res.status(404).json({
          success: false,
          message: "Branch/bill not found",
        });
      }
    });
  } catch (error) {
    logger.error("Failed to update patient bill details ");
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const paidBillLIst = (req, res) => {
  try {
    const branch = req.params.branch;
    const selectQuery = "SELECT * FROM patient_bills WHERE branch_name = ? ORDER BY bill_id DESC";
    db.query(selectQuery, branch, (err, result) => {
      if (err) {
        logger.error("Failed to get paid bill list");
        res.status(400).json({ success: false, message: err.message });
      }
    
      res.status(200).send(result);
    });
  } catch (error) {
    logger.error("Failed to get paid bill list");
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Final Bill API's

const billDetailsViaTpid = (req, res) => {
  try {
    const tpid = req.params.tpid;
    const selectQuery = "SELECT * FROM patient_bills WHERE tp_id = ?";
    db.query(selectQuery, tpid, (err, result) => {
      if (err) {
        logger.error("Failed to get patient bill details via tpid");
        res.status(400).json({ success: false, message: err.message });
      }
    
      res.status(200).send(result);
    });
  } catch (error) {
    logger.error("Failed to get patient bill details via tpid");
    res.status(500).json({ success: false, message: "internal server error" });
  }
};

const getTreatSuggestViaTpid = (req, res) => {
  try {
    const tpid = req.params.tpid;
    const branch = req.params.branch;
    const sql = `SELECT * FROM treat_suggest WHERE tp_id = ? AND branch_name = ?`;
    db.query(sql, [tpid, branch], (err, result) => {
      if (err) {
        logger.error("Failed to get treatment suggestion via tpid");
        return res.status(400).json({
          success: false,
          message: "Failed to query database",
          error: err,
        });
      } else {
        if (result.length === 0) {
          return res
            .status(404)
            .json({ success: false, message: "No data found" });
        }
        return res.status(200).json({
          success: true,
          message: "Data retrieved successfully",
          data: result,
        });
      }
    });
  } catch (error) {
    logger.error("Failed to get treatment suggestion via tpid");
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const getTreatPrescriptionByTpid = (req, res) => {
  const { tpid, branch } = req.params;

  const sql =
    "SELECT * FROM dental_prescription WHERE tp_id = ? AND branch_name = ?";

  db.query(sql, [tpid, branch], (err, results) => {
    if (err) {
      logger.error("Failed to get dental_prescription via tpid");
      res.status(500).json({ error: err.message });
    } else {
      logger.info("successfully get dental_prescription via tpid");
      res.status(200).json({ results });
    }
  });
};

const getTreatmentDetailsViaTpid = (req, res) => {
  try {
    const { tpid, branch } = req.params;
    const selectQuery =
      "SELECT * FROM dental_treatment WHERE tp_id = ? AND branch_name = ?";
    db.query(selectQuery, [tpid, branch], (err, result) => {
      if (err) {
        logger.error("Failed to get dental_treatment Via Tpid");
        res.status(400).json({ success: false, message: err.message });
      }
      res.status(200).json({ result });
    });
  } catch (error) {
    logger.error("Failed to get dental_treatment Via Tpid");
    console.log(error);
    res.status(500).json({ success: false, message: "internal server error" });
  }
};

const getDentalDataByTpid = (req, res) => {
  const tpid = req.params.tpid;
  const branch = req.params.branch;

  const sql =
    "SELECT * FROM dental_examination WHERE tp_id = ? AND branch_name = ?";
  db.query(sql, [tpid, branch], (err, result) => {
    if (err) {
      logger.error("Failed to get dental_examination via tpid");
      console.error("Error retrieving data: ", err);
      res.status(500).send("Error retrieving data: " + err.message);
      return;
    }

    if (result.length === 0) {
      res.status(404).send("No data found for appointment ID: " + tpid);
      return;
    }
    
    res.status(200).json({ result });
  });
};

const getAppointmentsWithPatientDetailsById = (req, res) => {
  const tpid = req.params.tpid;

  const sql = `SELECT * FROM treatment_package JOIN patient_details ON patient_details.uhid = treatment_package.uhid WHERE tp_id = ?`;

  db.query(sql, [tpid], (err, result) => {
    if (err) {
      logger.error("Failed to get get Appointments With Patient Details By Id");
      console.error("Error executing query:", err.message);
      return res.status(500).json({ error: "Internal server error" });
    } else if (result.length === 0) {
      logger.error("Failed to get get Appointments With Patient Details By Id");
      return res.status(404).json({ error: "TPID not found" });
    } else {
      
      return res.status(200).json({ message: "Get data by TPID", result });
    }
  });
};

// patient profile api

const getTreatmentViaUhid = (req, res) => {
  const branch = req.params.branch;
  const uhid = req.params.uhid;
  try {
    const sql = "SELECT * FROM treat_suggest WHERE branch_name = ? AND p_uhid = ? ORDER BY ts_id DESC";

    db.query(sql, [branch,uhid], (err, results) => {
      if (err) {
        logger.error("Failed to get treatment via uhid");
        console.error("Error fetching Treatment from MySql:", err);
        res.status(500).json({ error: "Error fetching Treatment" });
      } else {
       
        res
          .status(200)
          .json({ data: results, message: "Treatment fetched successfully" });
      }
    });
  } catch (error) {
    logger.error("Failed to get treatment via uhid");
    console.error("Error fetching Treatment from MySql:", error);
    res.status(500).json({
      success: false,
      message: "Error in fetched Treatment",
      error: error.message,
    });
  }
};
const getBillViaUhid = (req, res) => {
  const branch = req.params.branch;
  const uhid = req.params.uhid;
  try {
    const sql = "SELECT * FROM patient_bills WHERE branch_name = ? AND uhid = ? ORDER BY bill_id DESC";

    db.query(sql, [branch,uhid], (err, results) => {
      if (err) {
        logger.error("Failed to get bill via uhid");
        console.error("Error fetching Bill from MySql:", err);
        res.status(500).json({ error: "Error fetching Bill" });
      } else {
       
        res
          .status(200)
          .json({ data: results, message: "Bill fetched successfully" });
      }
    });
  } catch (error) {
    logger.error("Failed to get bill via uhid");
    console.error("Error fetching Bill from MySql:", error);
    res.status(500).json({
      success: false,
      message: "Error in fetched Bill",
      error: error.message,
    });
  }
};
const getExaminationViaUhid = (req, res) => {
  const branch = req.params.branch;
  const uhid = req.params.uhid;
  try {
    const sql = "SELECT * FROM dental_examination WHERE branch_name = ? AND patient_uhid = ? ORDER BY exm_id DESC";

    db.query(sql, [branch,uhid], (err, results) => {
      if (err) {
        logger.error("Failed to get examination via uhid");
        console.error("Error fetching Examination from MySql:", err);
        res.status(500).json({ error: "Error fetching Examination" });
      } else {

        res
          .status(200)
          .json({ data: results, message: "Examination fetched successfully" });
      }
    });
  } catch (error) {
    logger.error("Failed to get examination via uhid");
    console.error("Error fetching Examination from MySql:", error);
    res.status(500).json({
      success: false,
      message: "Error in fetched Examination",
      error: error.message,
    });
  }
};
const getPrescriptionViaUhid = (req, res) => {
  const branch = req.params.branch;
  const uhid = req.params.uhid;
  try {
    const sql = "SELECT * FROM dental_prescription WHERE branch_name = ? AND patient_uhid = ? ORDER BY id DESC";

    db.query(sql, [branch,uhid], (err, results) => {
      if (err) {
        logger.error("Failed to get prescription via uhid");
        console.error("Error fetching Prescription from MySql:", err);
        res.status(500).json({ error: "Error fetching Prescription" });
      } else {
        
        res
          .status(200)
          .json({ data: results, message: "Prescription fetched successfully" });
      }
    });
  } catch (error) {
    logger.error("Failed to get prescription via uhid");
    console.error("Error fetching Prescription from MySql:", error);
    res.status(500).json({
      success: false,
      message: "Error in fetched Prescription",
      error: error.message,
    });
  }
};


// reset password

// const sendOtp = (req, res) => {
//   const { email } = req.body;

//   // random otp
//   function generateOTP(length) {
//     const chars = "0123456789";
//     let otp = "";

//     for (let i = 0; i < length; i++) {
//       const randomIndex = Math.floor(Math.random() * chars.length);
//       otp += chars[randomIndex];
//     }

//     return otp;
//   }

//   const OTP = generateOTP(6);

//   try {
//     const transporter = nodemailer.createTransport({
//       service: "Gmail",
//       auth: {
//         user: process.env.EMAILSENDER,
//         pass: process.env.EMAILPASSWORD,
//       },
//     });

//     const mailOptions = {
//       from: process.env.EMAILSENDER,
//       to: email,
//       subject: "Password Reset OTP",
//       text: `Your OTP for password reset is: ${OTP}`,
//     };

//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         console.error(error);
//         return res
//           .status(500)
//           .json("An error occurred while sending the email.");
//       } else {
//         console.log("OTP sent:", info.response);

//         const selectQuery = "SELECT * FROM otpcollections WHERE email = ?";
//         db.query(selectQuery, email, (err, result) => {
//           if (err) {
//             res.status(400).json({ success: false, message: err.message });
//           }
//           if (result && result.length > 0) {
//             const updateQuery =
//               "UPDATE otpcollections SET code = ? WHERE email = ?";
//             db.query(updateQuery, [OTP, email], (upErr, upResult) => {
//               if (upErr) {
//                 res
//                   .status(400)
//                   .json({ success: false, message: upErr.message });
//               }
//               res.status(200).send(upResult);
//             });
//           } else {
//             // Assuming you have a 'db' object for database operations
//             db.query(
//               "INSERT INTO otpcollections (email, code) VALUES (?, ?) ON DUPLICATE KEY UPDATE code = VALUES(code)",
//               [email, OTP],
//               (err, result) => {
//                 if (err) {
//                   console.error(err);
//                   return res
//                     .status(500)
//                     .send({ message: "Failed to store OTP" });
//                 }

//                 res.status(200).json({ message: "OTP sent successfully" });
//               }
//             );
//           }
//         });
//       }
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json("An error occurred.");
//   }
// };


const sendOtp = (req, res) => {
  const { email } = req.body;

  const selectQuery = 'SELECT * FROM employee_register WHERE employee_email = ? AND employee_role LIKE "%receptionist%"';


  db.query(selectQuery, email, (err, result) => {
    if (err) {
      logger.error("Failed to send otp");
      return res.status(400).json({ success: false, message: err.message });
    } else {
      if (!result || result.length === 0) {
        logger.error("Failed to send otp : Email not found");
        return res.status(404).json({ success: false, message: "Email not found" });
      } else {
      
      const user = result[0];
        
       
        
       
        // Random OTP generation
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
         

          const mailOptions = {
            from: "info@doaguru.com",
            to: email,
            subject: "OTP for password reset",
            text: `Your OTP to reset password is: ${OTP}`,
          };

          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              logger.error("Failed to send otp email");
              console.error(error);
              return res.status(500).json({ success: false, message: "An error occurred while sending the email." });
            } else {
              console.log("OTP sent:", info.response);

              const updateQuery = "INSERT INTO otpcollections (email, code) VALUES (?, ?) ON DUPLICATE KEY UPDATE code = VALUES(code)";
              db.query(updateQuery, [email, OTP], (upErr, upResult) => {
                if (upErr) {
                  return res.status(400).json({ success: false, message: upErr.message });
                }
                return res.status(200).json({ message: "OTP sent successfully" });
              });
            }
          });
        } catch (error) {
          logger.error("Failed to send otp ");
          console.log(error);
          return res.status(500).json({ success: false, message: "An error occurred." });
        }
        
      }
    }
  });
};



const verifyOtp = (req, res) => {
  try {
    const { email, otp } = req.body;
    db.query(
      "SELECT * FROM otpcollections WHERE email = ? AND code = ?",
      [email, otp],
      (err, result) => {
        if (err) {
          logger.error("Failed to verify otp");
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
    logger.error("Failed to verify otp");
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const resetPassword = (req, res) => {
  try {
    const { email, password } = req.body;

    const selectQuery =
      "SELECT * FROM employee_register WHERE employee_email = ?";
    db.query(selectQuery, email, (err, result) => {
      if (err) {
        logger.error("Failed to reset password");
        res.status(400).json({ success: false, message: err.message });
      }
      if (result && result.length) {
        const saltRounds = 10;
        const hashedPassword = bcrypt.hashSync(password, saltRounds);
        console.log(hashedPassword);
        const updateQuery = `UPDATE employee_register SET employee_password = ? WHERE employee_email = ?`;
        db.query(updateQuery, [hashedPassword, email], (err, result) => {
          if (err) {
            return res
              .status(400)
              .json({ success: false, message: err.message });
          } else {
            return res.status(200).json({
              success: true,
              message: "Details updated successfully",
            });
          }
        });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "email not found" });
      }
    });
  } catch (error) {
    logger.error("Failed to reset password");
    console.log(error);
    res.status(500).send({ success: false, message: "Internal server error" });
  }
};

const updateTreatmentStatus = (req, res) => {
  try {
    const tpid = req.params.tpid;
    const branch = req.params.branch;
    const finalStats = "completed";
    const selectQuery =
      "SELECT * FROM treatment_package WHERE branch_name = ? AND tp_id = ?";
    db.query(selectQuery, [branch, tpid], (err, result) => {
      if (err) {
        logger.error("Failed to update Treatment Status");
        return res.status(400).json({ success: false, message: err.message });
      }
      if (result && result.length > 0) {
        const updateQuery =
          "UPDATE treatment_package SET package_status = ? WHERE branch_name = ? AND tp_id = ?";
        db.query(updateQuery, [finalStats, branch, tpid], (err, result) => {
          if (err) {
            return res
              .status(400)
              .json({ success: false, message: err.message });
          }
          if (result) {
            return res
              .status(200)
              .json({ success: true, message: "Treatment Completed" });
          }
        });
      } else {
        return res
          .status(400)
          .json({ success: false, message: "TPID not found" });
      }
    });
  } catch (error) {
    logger.error("Failed to update Treatment Status");
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const getPatientLabTestByPatientId = (req, res) => {
  const pid = req.params.pid;
  try {
    const selectQuery =
      "SELECT * FROM patient_lab_details LEFT JOIN patient_details ON patient_details.uhid = patient_lab_details.patient_uhid WHERE patient_lab_details.patient_uhid = ?";
    db.query(selectQuery, pid, (err, result) => {
      if (err) {
        logger.error("Failed to get Patient Lab Test Details");
        res.status(400).json({ success: false, message: err.message });
        return;
      }
     
      res.status(200).send(result);
    });
  } catch (error) {
    logger.error("Failed to get Patient Lab Test Details");
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = {
  addPatient,
  getDisease,
  getTreatment,
  getPatients,
  bookAppointment,
  getDoctorDataByBranch,
  getAppointments,
  updateAppointmentStatus,
  updateAppointmentStatusCancel,
  updateAppointment,
  LoginReceptionist,
  getBranch,
  getDoctorDataByBranchWithLeave,
  getBranchDetail,
  updatePatientDetails,
  getBranchHoliday,
  getPatientById,
  addInquiry,
  getInquiries,
  updateInquiry,
  deleteInquiry,
  getAppointmentById,
  insertTimelineEvent,
  getPatientTimeline,
  getAllAppointmentByPatientId,
  updateAppointmentStatusCancelOpd,
  updatePatientSecurityAmt,
  getSecurityAmountDataByBranch,
  getSecurityAmountDataBySID,
  updateRefundAmount,
  getSinglePatientSecurityAmt,
  getPatientDeatilsByUhid,
  applyLeave,
  getLeaves,
  MarkAttendanceLogin,
  MarkAttendanceLogout,
  getTodayAttendance,
  getAttendancebyempId,
  getPatientBillsByBranch,
  getBranchDetailsByBranch,
  getSecurityAmountDataByTPUHID,
  getPatientBillsAndSecurityAmountByBranch,
  updateRemainingSecurityAmount,
  makeBillPayment,
  paidBillLIst,
  billDetailsViaTpid,
  getTreatSuggestViaTpid,
  getTreatPrescriptionByTpid,
  getTreatmentDetailsViaTpid,
  getDentalDataByTpid,
  getDentalDataByTpid,
  getAppointmentsWithPatientDetailsById,
  getTreatmentViaUhid,
  getBillViaUhid,
  getExaminationViaUhid,
  getPrescriptionViaUhid,
  sendOtp,
  verifyOtp,
  resetPassword,
  updateTreatmentStatus,
  getPatientLabTestByPatientId


  
};
