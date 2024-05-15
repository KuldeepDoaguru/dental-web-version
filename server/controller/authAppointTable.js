const express = require("express");
const db = require("../connect.js");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAILSENDER,
    pass: process.env.EMAILPASSWORD,
  },
});

const getAppointmentsWithPatientDetails = (req, res) => {
  const sql = `
        SELECT 
            a.appoint_id,
            a.appointment_dateTime,
            a.treatment_provided,
            a.notes,
            a.appointment_status,
            a.assigned_doctor_name,
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
            patient_details AS p ON a.patient_uhid = p.uhid
    `;

  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error executing query:", err.stack);
      return res.status(500).json({ error: "Internal server error" });
    } else {
      // console.log('Query executed successfully');
      return res.status(200).json({
        message: "Get data from appointments and patient_details",
        result,
      });
    }
  });
};

const getAppointmentsWithPatientDetailsById = (req, res) => {
  const tpid = req.params.tpid;

  const sql = `SELECT * FROM treatment_package JOIN patient_details ON patient_details.uhid = treatment_package.uhid WHERE tp_id = ?`;

  db.query(sql, [tpid], (err, result) => {
    if (err) {
      console.error("Error executing query:", err.message);
      return res.status(500).json({ error: "Internal server error" });
    } else if (result.length === 0) {
      return res.status(404).json({ error: "TPID not found" });
    } else {
      return res.status(200).json({ message: "Get data by TPID", result });
    }
  });
};

const upDateAppointmentStatus = (req, res) => {
  const { action, appointId, reason } = req.body;
  const selectQuery = "SELECT * FROM appointments WHERE appoint_id = ?";
  db.query(selectQuery, appointId, (err, result) => {
    if (err) {
      return res.status(400).json({ success: false, message: err.message });
    }
    if (result && result.length > 0) {
      const updateQuery =
        "UPDATE appointments SET appointment_status = ?, cancel_reason = ? WHERE appoint_id = ?";
      db.query(updateQuery, [action, reason, appointId], (upErr, upRes) => {
        if (upErr) {
          return res
            .status(400)
            .json({ success: false, message: upErr.message });
        } else {
          return res.status(200).send(upRes);
        }
      });
    } else {
      res.status(400).json({ success: false, message: "appoint ID not valid" });
    }
  });
};

const addSecurityAmount = (req, res) => {
  try {
    const {
      tp_id,
      branch_name,
      date,
      appointment_id,
      uhid,
      patient_name,
      patient_number,
      treatment,
      assigned_doctor,
      amount,
      remaining_amount,
      payment_status,
      payment_Mode,
      transaction_Id,
      payment_date,
      refund_amount,
      refund_date,
      received_by,
      refund_by,
    } = req.body;
    const insertParams = [
      tp_id,
      branch_name,
      date,
      appointment_id,
      uhid,
      patient_name,
      patient_number,
      treatment,
      assigned_doctor,
      amount,
      remaining_amount,
      payment_status,
      payment_Mode,
      transaction_Id,
      payment_date,
      refund_amount,
      refund_date,
      received_by,
      refund_by,
    ];

    const querySecurity = `SELECT * FROM security_amount WHERE sa_id = ? AND branch_name = ?`;

    const selectQuery =
      "INSERT INTO security_amount (tp_id, branch_name, date, appointment_id, uhid, patient_name, patient_number, treatment, assigned_doctor, amount, remaining_amount, payment_status, payment_Mode, transaction_Id, payment_date, refund_amount, refund_date, received_by, refund_by) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?, ?)";

    db.query(selectQuery, insertParams, (err, result) => {
      if (err) {
        res.status(400).json({ success: false, message: err.message });
      }
      res.status(200).json({
        success: true,
        message: "Security Amount Submitted Successfully",
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const getSecurityAmountByAppointmentId = (req, res) => {
  const tpid = req.params.tpid;

  const selectQuery = "SELECT * FROM security_amount WHERE tp_id = ?";

  db.query(selectQuery, [tpid], (err, result) => {
    if (err) {
      return res.status(400).json({ success: false, message: err.message });
    }
    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No data found with the provided appointment_id",
      });
    }
    return res.status(200).json({ success: true, data: result });
  });
};

const getPatientSecurityAmt = (req, res) => {
  const appoint_id = req.params.appoint_id;
  const branch_name = req.params.branch_name;

  // const sql = `
  //     SELECT
  //         a.appoint_id,
  //         a.branch_name
  //         p.uhid,
  //         p.patient_name,
  //         p.mobileno,
  //         ts.totalCost
  //         ts.treatment_name
  //     FROM
  //         appointments AS a
  //     JOIN
  //         patient_details AS p ON a.patient_uhid = p.uhid
  //     LEFT JOIN
  //     treat_suggest AS ts ON p.uhid = ts.p_uhid
  //     WHERE
  //         a.appoint_id = ? AND
  //         a.branch_name = ?;
  // `;

  const sql = `
    SELECT 
        a.appoint_id,
        a.branch_name,
        p.uhid, 
        p.patient_name,
        p.mobileno,
        ts.totalCost,
        ts.treatment_name
    FROM 
        appointments AS a
    JOIN 
        patient_details AS p ON a.patient_uhid = p.uhid
    LEFT JOIN 
        treat_suggest AS ts ON p.uhid = ts.p_uhid
    WHERE
        a.appoint_id = ? AND
        a.branch_name = ?;
`;

  db.query(sql, [appoint_id, branch_name], (err, result) => {
    if (err) {
      console.error("Error executing query:", err.stack);
      return res.status(500).json({ error: "Internal server error" });
    } else if (result.length === 0) {
      return res.status(404).json({ error: "Not Found Data" });
    } else {
      return res
        .status(200)
        .json({ message: "Access data Successfully", result });
    }
  });
};

const updatePatientSecurityAmt = (req, res) => {
  const sa_id = req.params.sa_id;
  const { refund_amount, refund_date, refund_by } = req.body;

  // Prepare the SQL query
  const sql = `
        UPDATE security_amount
        SET payment_status = 'refund', refund_amount = ?, refund_date = ?, refund_by = ?
        WHERE sa_id = ?
    `;

  // Execute the update query
  db.query(
    sql,
    [refund_amount, refund_date, refund_by, sa_id],
    (err, result) => {
      if (err) {
        console.error("Error executing query:", err.stack);
        return res.status(500).json({ error: "Internal server error" });
      } else {
        if (result.affectedRows === 0) {
          return res.status(404).json({ error: "No records updated" });
        } else {
          return res
            .status(200)
            .json({ message: "Security amount updated successfully" });
        }
      }
    }
  );
};

const getAllSecurityAmounts = (req, res) => {
  const sa_id = req.params.sa_id;
  const branch_name = req.params.branch_name;

  const sql = `SELECT * FROM security_amount WHERE sa_id = ? AND branch_name = ?`;

  db.query(sql, [sa_id, branch_name], (err, result) => {
    if (err) {
      return res
        .status(400)
        .json({ success: false, message: "Bad request", errors: err });
    } else {
      return res
        .status(200)
        .json({ success: true, message: "Successfully Get Data", result });
    }
  });
};

// const getAppointmentsWithPatientDetailsTreatSugg = (req, res) => {
//   const doctor_id = req.params.doctor_id;
//   const sql = `
//   SELECT a.*, pd.*, tp.*, ts.ts_id, ts.tp_id, ts.branch_name, ts.desease, ts.treatment_name, ts.totalCost, ts.treatment_status, ts.consider_sitting, ts.total_sitting, ts.current_sitting
//   FROM appointments AS a
//   LEFT JOIN patient_details AS pd ON a.patient_uhid = pd.uhid
//   LEFT JOIN treatment_package AS tp ON a.tp_id = tp.tp_id
//   LEFT JOIN treat_suggest AS ts ON tp.tp_id = ts.tp_id
//   WHERE a.assigned_doctor_id = ?
// `;

//   db.query(sql, doctor_id, (err, result) => {
//     if (err) {
//       console.error("Error executing query:", err.stack);
//       return res.status(500).json({ error: "Internal server error" });
//     } else {
//       // console.log('Query executed successfully');
//       return res.status(200).send(result);
//     }
//   });
// };

const getAppointmentsWithPatientDetailsTreatSugg = (req, res) => {
  const doctor_id = req.params.doctor_id;
  const sql = `
  SELECT a.appoint_id, 
         pd.*, 
         tp.*, 
         GROUP_CONCAT(ts.treatment_name SEPARATOR ', ') AS treatment_names,
         ts.branch_name, 
         ts.desease, 
         ts.totalCost, 
         ts.treatment_status, 
         ts.consider_sitting, 
         ts.total_sitting, 
         ts.current_sitting
  FROM appointments AS a
  LEFT JOIN patient_details AS pd ON a.patient_uhid = pd.uhid 
  LEFT JOIN treatment_package AS tp ON a.tp_id = tp.tp_id
  LEFT JOIN treat_suggest AS ts ON tp.tp_id = ts.tp_id 
  WHERE a.assigned_doctor_id = ?
  GROUP BY a.appoint_id;
`;

  db.query(sql, doctor_id, (err, result) => {
    if (err) {
      console.error("Error executing query:", err.stack);
      return res.status(500).json({ error: "Internal server error" });
    } else {
      // console.log('Query executed successfully');
      return res.status(200).send(result);
    }
  });
};

const updateAppointStatus = (req, res) => {
  const appointId = req.params.appointId;

  // SQL query to update appointment status
  const sql = `UPDATE appointments SET appointment_status = 'Complete' WHERE appoint_id = ?`;

  db.query(sql, [appointId], (error, results) => {
    if (error) {
      console.error("Error updating appointment status:", error.message);
      return res.status(500).json({ error: "Server error" });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    return res.json({ message: "Appointment status updated to Complete" });
  });
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
          res.status(200).send(results);
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

const getAppointmentsViaDocId = (req, res) => {
  const did = req.params.did;
  const branch = req.params.branch;
  const selectQuery = `SELECT * FROM appointments WHERE assigned_doctor_id = ? AND branch_name = ?`;
  db.query(selectQuery, [did, branch], (err, result) => {
    if (err) {
      res.status(500).json({ success: false, message: err.message });
    } else {
      return res.status(200).json({
        message: "Get data from appointments and patient_details",
        result,
      });
    }
  });
};

const bookSittingAppointment = (req, res) => {
  try {
    const {
      clinicName,
      clinicContact,
      clinicAddress,
      clinicEmail,
      patient_Email,
      patient_uhid,
      patient_Name,
      branch,
      tp_id,
      assigned_doctor_name,
      assigned_doctor_id,
      appointment_dateTime,
      treatment_provided,
      appointment_created_by,
      appointment_created_by_ID,
      notes,
      appointment_status,
      doctor_email,
    } = req.body;

    const created_at = new Date();

    const bookAppointmentQuery = `
      INSERT INTO appointments (
          patient_uhid, branch_name, tp_id, assigned_doctor_name, assigned_doctor_id, appointment_dateTime, treatment_provided,  appointment_created_by, appointment_created_by_emp_id, notes, appointment_status, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

    const bookAppointmentParams = [
      patient_uhid,
      branch,
      tp_id,
      assigned_doctor_name,
      assigned_doctor_id,
      appointment_dateTime,
      treatment_provided,
      appointment_created_by,
      appointment_created_by_ID,
      notes,
      appointment_status,
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

          if (patient_Email) {
            // Formulate email subject
            const emailSubject = `Appointment Confirmation - ${clinicName}`;

            const appointmentDateTime = new Date(appointment_dateTime);
            const appointmentTime = appointmentDateTime.toLocaleTimeString(
              "en-US",
              { hour: "numeric", minute: "2-digit", hour12: true }
            );

            // Formulate email text
            const emailText = `Dear ${patient_Name},\n\n 
            Your appointment at ${clinicName} has been booked successfully.\n\n 
            Appointment Details:\n 
            Doctor Name: ${assigned_doctor_name.toUpperCase()}\n 
            Appointment Date and Time: ${appointmentDateTime.toDateString()} ${appointmentTime} \n 
            Treatment Provided: ${treatment_provided}\n 
  
            Clinic Details:\n 
            Name: ${clinicName}\n 
            Contact: ${clinicContact}\n 
            Address: ${clinicAddress}\n 
            Email: ${clinicEmail}\n\n 
  
            Thank you for choosing ${clinicName}.\n\n 
            Best regards,\n 
            ${clinicName}`;

            const mailOptions = {
              from: process.env.EMAILSENDER,
              to: patient_Email,
              cc: doctor_email,
              subject: emailSubject,
              text: emailText,
            };

            transporter.sendMail(mailOptions, (emailErr, info) => {
              if (emailErr) {
                console.error("Error sending email:", emailErr);
                // Handle email sending error
              } else {
                console.log("Email sent:", info.response);
                // Handle email sent successfully
              }
            });
          }

          return res.status(200).json({
            data: appointmentResult,
            treatment: treatment_provided,
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

const updateSecurityAmount = (req, res) => {
  try {
    const said = req.params.said;
    const { amount, payment_status, payment_Mode, transaction_Id } = req.body;
    const selectQuery = "SELECT * FROM security_amount WHERE sa_id = ?";

    db.query(selectQuery, said, (err, result) => {
      if (err) {
        return res.status(400).json({ success: false, message: err.message });
      }

      if (result && result.length === 1) {
        // Changed condition to check if exactly one row is found
        const updateFields = [];
        const updateValues = [];

        if (amount) {
          updateFields.push("amount = ?");
          updateValues.push(amount);
        }

        if (payment_status) {
          updateFields.push("payment_status = ?");
          updateValues.push(payment_status);
        }

        if (payment_Mode) {
          updateFields.push("payment_Mode = ?");
          updateValues.push(payment_Mode);
        }

        if (transaction_Id) {
          updateFields.push("transaction_Id = ?");
          updateValues.push(transaction_Id);
        }

        updateValues.push(said); // Pushing sa_id for the WHERE clause

        const updateQuery = `UPDATE security_amount SET ${updateFields.join(
          ", "
        )} WHERE sa_id = ?`;

        db.query(updateQuery, updateValues, (err, result) => {
          if (err) {
            return res
              .status(400)
              .json({ success: false, message: err.message });
          }

          return res.status(200).json({
            success: true,
            message: "Security amount updated successfully",
          });
        });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "Security amount not found" });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const getExaminedataById = (req, res) => {
  try {
    const tpid = req.params.tpid;
    // const exmid = req.params.exmid;

    const selectQuery =
      "SELECT * FROM dental_examination JOIN treat_suggest ON dental_examination.tp_id = treat_suggest.tp_id && dental_examination.disease = treat_suggest.desease WHERE dental_examination.tp_id = ?";
    db.query(selectQuery, tpid, (err, result) => {
      if (err) {
        return res
          .status(400)
          .json({ success: false, message: "Error in retrieving data" }); // Add 'return' to prevent further execution
      }
      res.status(200).json(result); // Fix to return result as JSON
    });
  } catch (error) {
    console.error(error); // Change console.log to console.error for better error handling
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getExaminedataByIdandexamine = (req, res) => {
  try {
    const tpid = req.params.tpid;
    const tsid = req.params.tsid;

    const selectQuery = `
    SELECT * FROM treat_suggest
    JOIN dental_examination ON treat_suggest.tp_id = dental_examination.tp_id 
    JOIN dental_treatment ON treat_suggest.ts_id = dental_treatment.exam_id 
    WHERE treat_suggest.ts_id = ? AND treat_suggest.tp_id = ?`;
    db.query(selectQuery, [tsid, tpid], (err, result) => {
      if (err) {
        return res
          .status(400)
          .json({ success: false, message: "Error in retrieving data" }); // Add 'return' to prevent further execution
      }
      res.status(200).json(result); // Fix to return result as JSON
    });
  } catch (error) {
    console.error(error); // Change console.log to console.error for better error handling
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getExaminedataByIdandexamineAfterSitOne = (req, res) => {
  // res.send("test")
  try {
    const tpid = req.params.tpid;
    const tsid = req.params.tsid;

    // const selectQuery =
    //   "SELECT * FROM dental_examination JOIN treat_suggest ON dental_examination.tp_id = treat_suggest.tp_id && dental_examination.disease = treat_suggest.desease WHERE treat_suggest.ts_id = ? AND treat_suggest.tp_id = ?";
    const selectQuery = `
SELECT * FROM treat_suggest
JOIN dental_examination ON treat_suggest.tp_id = dental_examination.tp_id 
JOIN dental_treatment ON treat_suggest.ts_id = dental_treatment.exam_id 
WHERE treat_suggest.ts_id = ? AND treat_suggest.tp_id = ?`;
    db.query(selectQuery, [tsid, tpid], (err, result) => {
      if (err) {
        return res
          .status(400)
          .json({ success: false, message: "Error in retrieving data" }); // Add 'return' to prevent further execution
      }
      res.status(200).json(result); // Fix to return result as JSON
    });
  } catch (error) {
    console.error(error); // Change console.log to console.error for better error handling
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const updateSecurityAmountForRemainingAmount = (req, res) => {
  try {
    const said = req.params.said;
    const {
      amount,
      remaining_amount,
      payment_status,
      payment_Mode,
      transaction_Id,
    } = req.body;

    // Check if remaining_amount is provided
    if (remaining_amount === null || remaining_amount === undefined) {
      remaining_amount = 0;
    }

    const selectQuery = "SELECT * FROM security_amount WHERE sa_id = ?";

    db.query(selectQuery, said, (err, result) => {
      if (err) {
        return res.status(400).json({ success: false, message: err.message });
      }

      if (result && result.length === 1) {
        const updateFields = [];
        const updateValues = [];

        if (amount) {
          updateFields.push("amount = ?");
          updateValues.push(amount);
        }

        updateFields.push("remaining_amount = ?"); // Always include remaining_amount
        updateValues.push(remaining_amount);

        if (payment_status) {
          updateFields.push("payment_status = ?");
          updateValues.push(payment_status);
        }

        if (payment_Mode) {
          updateFields.push("payment_Mode = ?");
          updateValues.push(payment_Mode);
        }

        if (transaction_Id) {
          updateFields.push("transaction_Id = ?");
          updateValues.push(transaction_Id);
        }

        updateValues.push(said);

        const updateQuery = `UPDATE security_amount SET ${updateFields.join(
          ", "
        )} WHERE sa_id = ?`;

        db.query(updateQuery, updateValues, (err, result) => {
          if (err) {
            return res
              .status(400)
              .json({ success: false, message: err.message });
          }

          return res.status(200).json({
            success: true,
            message: "Security amount updated successfully",
          });
        });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "Security amount not found" });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const updateAppointmentStatusAfterTreat = (req, res) => {
  try {
    const appoint_id = req.params.appoint_id;
    const { status } = req.body;

    if (!status) {
      return res
        .status(400)
        .json({ success: false, message: "status is requirement" });
    }
    const selectQuery = "SELECT * FROM appointments WHERE appoint_id = ?";
    db.query(selectQuery, appoint_id, (err, result) => {
      if (err) {
        return res.status(400).json({ success: false, message: err.message });
      }
      if (result && result.length > 0) {
        const updateQuery =
          "UPDATE appointments SET appointment_status = ? WHERE appoint_id = ?";
        db.query(updateQuery, [status, appoint_id], (err, result) => {
          if (err) {
            return res
              .status(400)
              .json({ success: false, message: err.message });
          } else {
            return res.status(200).json({
              success: true,
              message: "appointment status updated successfully",
            });
          }
        });
      } else {
        return res
          .status(400)
          .json({ success: false, message: "Invalid appointment ID" });
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getLab = (req, res) => {
  try {
    const selectQuery = "SELECT * FROM lab_details";
    db.query(selectQuery, (err, result) => {
      if (err) {
        res.status(400).json({ success: false, message: err.message });
      }
      res.status(200).send(result);
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "internal server error" });
  }
};

const getLabTest = (req, res) => {
  try {
    const selectQuery = "SELECT * FROM lab_tests";
    db.query(selectQuery, (err, result) => {
      if (err) {
        res.status(400).json({ success: false, message: err.message });
      }
      res.status(200).send(result);
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "internal server error" });
  }
};

const getOnlyExaminv = (req, res) => {
  try {
    const tpid = req.params.tpid;
    const examId = req.params.examId;
    const selectQuery = `SELECT * FROM dental_treatment WHERE tp_id = ? AND exam_id = ?`;
    db.query(selectQuery, [tpid, examId], (err, result) => {
      if (err) {
        res.status(400).json({ success: false, message: err.message });
      }
      res.status(200).send(result);
    });
  } catch (error) {
    res.status(500).json({ success: failed, message: "internal server error" });
  }
};

module.exports = {
  getAppointmentsWithPatientDetails,
  getAppointmentsWithPatientDetailsById,
  upDateAppointmentStatus,
  addSecurityAmount,
  getSecurityAmountByAppointmentId,
  getPatientSecurityAmt,
  updatePatientSecurityAmt,
  getAllSecurityAmounts,
  getAppointmentsWithPatientDetailsTreatSugg,
  updateAppointStatus,
  getAllAppointmentByPatientId,
  getAppointmentsViaDocId,
  bookSittingAppointment,
  updateSecurityAmount,
  getExaminedataById,
  getExaminedataByIdandexamine,
  updateSecurityAmountForRemainingAmount,
  updateAppointmentStatusAfterTreat,
  getLab,
  getLabTest,
  getExaminedataByIdandexamineAfterSitOne,
  getOnlyExaminv,
};
