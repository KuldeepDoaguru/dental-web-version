const { db } = require("../db");
const dotenv = require("dotenv");
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
    const {
      branch_name,
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

    const created_at = new Date();

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
          console.error("Error updating Patient:", Err);
          return res
            .status(500)
            .json({ success: false, message: "Internal server error" });
        } else {
          console.log("Patient updated successfully");
          return res.status(200).json({
            success: true,
            message: "Patient updated successfully",
          });
        }
      }
    );
  } catch (error) {
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
    const sql = "SELECT * FROM patient_details WHERE branch_name = ?";

    db.query(sql, [branch], (err, results) => {
      if (err) {
        console.error("Error fetching Patients from MySql:", err);
        res.status(500).json({ error: "Error fetching Patients" });
      } else {
        res
          .status(200)
          .json({ data: results, message: "Patients fetched successfully" });
      }
    });
  } catch (error) {
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
        console.error("Error fetching patient from MySql:", err);
        res.status(500).json({ error: "Error fetching patient" });
      } else {
        if (results.length === 0) {
          res.status(404).json({ message: "Patient not found" });
        } else {
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
        console.error("Error fetching disease from MySql:", err);
        res.status(500).json({ error: "Error fetching disease" });
      } else {
        res
          .status(200)
          .json({ data: results, message: "Disease fetched successfully" });
      }
    });
  } catch (error) {
    console.error("Error fetching disease from MySql:", error);
    res.status(500).json({
      success: false,
      message: "Error in fetched disease",
      error: error.message,
    });
  }
};
const getTreatment = (req, res) => {
  try {
    const sql = "SELECT * FROM treatment_list";

    db.query(sql, (err, results) => {
      if (err) {
        console.error("Error fetching treatments from MySql:", err);
        res.status(500).json({ error: "Error fetching treatments" });
      } else {
        res
          .status(200)
          .json({ data: results, message: "treatments fetched successfully" });
      }
    });
  } catch (error) {
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
      patient_uhid,
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
      appointment_created_by,
      appointment_created_by_emp_id,
    } = req.body;

    const created_at = new Date();

    const bookAppointmentQuery = `
      INSERT INTO appointments (
          patient_uhid, branch_name, assigned_doctor_name, assigned_doctor_id, appointment_dateTime, treatment_provided, appointment_status,opd_amount, payment_Mode, transaction_Id, payment_Status,  notes, appointment_created_by, appointment_created_by_emp_id, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?, ?, ?, ?)
  `;

    const bookAppointmentParams = [
      patient_uhid,
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
          console.error("Error booking appointment:", appointmentErr);
          return res
            .status(500)
            .json({ success: false, message: "Internal server error" });
        } else {
          console.log("Appointment booked successfully");
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
      appoint_id,
      doctorId,
      doctor_name,
      appDateTime,
      treatment,
      notes,
      appointment_updated_by,
      appointment_updated_by_emp_id,
    } = req.body;

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
      appoint_id,
    ];

    db.query(
      updateAppointmentQuery,
      updateAppointmentParams,
      (appointmentErr, appointmentResult) => {
        if (appointmentErr) {
          console.error("Error updating appointment:", appointmentErr);
          return res
            .status(500)
            .json({ success: false, message: "Internal server error" });
        } else {
          console.log("Appointment updated successfully");
          return res.status(200).json({
            success: true,
            message: "Appointment updated successfully",
          });
        }
      }
    );
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
          console.error("Error updating appointment:", appointmentErr);
          return res
            .status(500)
            .json({ success: false, message: "Internal server error" });
        } else {
          console.log("Appointment updated successfully");
          return res.status(200).json({
            success: true,
            message: "Appointment updated successfully",
          });
        }
      }
    );
  } catch (error) {
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
          console.error("Error updating appointment:", appointmentErr);
          return res
            .status(500)
            .json({ success: false, message: "Internal server error" });
        } else {
          console.log("Appointment updated successfully");
          return res.status(200).json({
            success: true,
            message: "Appointment updated successfully",
          });
        }
      }
    );
  } catch (error) {
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
      appoint_id,
      status,
      payment_Status,

      cancelReason,
      notes,
      appointment_updated_by,
      appointment_updated_by_emp_id,
    } = req.body;

    const updated_at = new Date();
   
    const updateAppointmentQuery = `
          UPDATE appointments
          SET payment_Status = ?, notes = ?, appointment_status = ?, updated_at = ?,appointment_updated_by = ?,cancel_reason = ?, appointment_updated_by_emp_id = ?
          WHERE appoint_id = ?
      `;

    const updateAppointmentParams = [
      payment_Status,
      notes,
      status,
      updated_at,
      appointment_updated_by,
      cancelReason,
      appointment_updated_by_emp_id,
      appoint_id,
    ];

    db.query(
      updateAppointmentQuery,
      updateAppointmentParams,
      (appointmentErr, appointmentResult) => {
        if (appointmentErr) {
          console.error("Error cancel appointment:", appointmentErr);
          return res
            .status(500)
            .json({ success: false, message: "Internal server error" });
        } else {
          console.log("Appointment cancel successfully");
          return res.status(200).json({
            success: true,
            message: "Appointment cancel successfully",
          });
        }
      }
    );
  } catch (error) {
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
            a.notes,
            p.uhid,
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

    db.query(sql, [branch], (err, results) => {
      if (err) {
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
        console.error("Error fetching appointment from MySql:", err);
        res.status(500).json({ error: "Error fetching appointment" });
      } else {
        if (results.length === 0) {
          res.status(404).json({ message: "Appointment not found" });
        } else {
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
    console.error("Error fetching appointment from MySql:", error);
    res.status(500).json({
      success: false,
      message: "Error in fetching appointment",
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
        console.error("Error fetching appointment from MySql:", err);
        res.status(500).json({ error: "Error fetching appointment" });
      } else {
        if (results.length === 0) {
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
        console.error("Error fetching Branches from MySql:", err);
        res.status(500).json({ error: "Error fetching Branches" });
      } else {
        res
          .status(200)
          .json({ data: results, message: "Branches fetched successfully" });
      }
    });
  } catch (error) {
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
        console.error("Error fetching Branches from MySql:", err);
        res.status(500).json({ error: "Error fetching Branches" });
      } else {
        res
          .status(200)
          .json({ data: results, message: "Branches fetched successfully" });
      }
    });
  } catch (error) {
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
        console.error("Error fetching Branch Holidays from MySql:", err);
        res.status(500).json({ error: "Error fetching Branch Holidays" });
      } else {
        res
          .status(200)
          .json({
            data: results,
            message: "Branch Holidays fetched successfully",
          });
      }
    });
  } catch (error) {
    console.error("Error fetching Branch Holidays from MySql:", error);
    res.status(500).json({
      success: false,
      message: "Error in fetched Branch Holidays",
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

    const created_at = new Date();

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
        console.error("Error booking Inquiry add:", err);
        return res
          .status(500)
          .json({ success: false, message: "Internal server error" });
      } else {
        console.log("Inquiry add successfully");
        return res.status(200).json({
          success: true,
          message: "Inquiry add successfully",
        });
      }
    });
  } catch (error) {
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
        console.error("Error updating inquiry:", err);
        return res
          .status(500)
          .json({ success: false, message: "Internal server error" });
      } else {
        console.log("Inquiry updated successfully");
        return res.status(200).json({
          success: true,
          message: "Inquiry updated successfully",
        });
      }
    });
  } catch (error) {
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
        console.error("Error deleting inquiry:", err);
        return res
          .status(500)
          .json({ success: false, message: "Internal server error" });
      } else {
        console.log("Inquiry deleted successfully");
        return res.status(200).json({
          success: true,
          message: "Inquiry deleted successfully",
        });
      }
    });
  } catch (error) {
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
    const sql = "SELECT * FROM inquiries WHERE branch = ?";

    db.query(sql, [branch], (err, results) => {
      if (err) {
        console.error("Error fetching inquiries from MySql:", err);
        res.status(500).json({ error: "Error fetching inquiries" });
      } else {
        res
          .status(200)
          .json({ data: results, message: "inquiries fetched successfully" });
      }
    });
  } catch (error) {
    console.error("Error fetching inquiries from MySql:", error);
    res.status(500).json({
      success: false,
      message: "Error in fetched inquiries",
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
            d.branch_name = ? AND d.employee_designation = "doctor" AND l.leave_status = "Approved"
    `;
    db.query(sql, [branch], (err, result) => {
      if (err) {
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
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const insertTimelineEvent = (req, res) => {
  try {
    const { type, description, branch, patientId } = req.body;
    const insertQuery =
      "INSERT INTO patient_timeline (event_type,	event_description,	branch_name,	uhid	) VALUES (?,?,?,?)";
    db.query(
      insertQuery,
      [type, description, branch, patientId],
      (err, result) => {
        if (err) {
          res.status(400).json({ success: false, message: err.message });
        }
        res.status(200).json({ success: true, result: result });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: err.message });
  }
};

const getPatientTimeline = (req, res) => {
  const patientId = req.params.patientId;
  const branch = req.params.branch;
  try {
    const sql =
      "SELECT * FROM patient_timeline WHERE uhid = ? AND branch_name = ?";

    db.query(sql, [patientId, branch], (err, results) => {
      if (err) {
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
          return res.status(401).json({
            success: "false",
            message:
              "Your Email is not approved, Please contact team for furthur assistance",
          });
        }

        const token = JWT.sign({ id: user.id }, process.env.JWT_SECRET, {
          expiresIn: "7d",
        });

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
  updateAppointmentStatusCancelOpd
};