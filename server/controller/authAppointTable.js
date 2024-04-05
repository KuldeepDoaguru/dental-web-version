const express = require("express");
const db = require("../connect.js");

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
  const appointmentId = req.params.id; // Assuming the appointment ID is passed as a parameter in the URL

  const sql = `
        SELECT 
            a.appoint_id,
            a.appointment_dateTime,
            a.treatment_provided,
            a.notes,
            a.appointment_status,
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
        WHERE
            a.appoint_id = ?
    `;

  db.query(sql, [appointmentId], (err, result) => {
    if (err) {
      console.error("Error executing query:", err.stack);
      return res.status(500).json({ error: "Internal server error" });
    } else if (result.length === 0) {
      return res.status(404).json({ error: "Appointment not found" });
    } else {
      return res.status(200).json({ message: "Get appointment by ID", result });
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
      branch_name,
      date,
      appointment_id,
      uhid,
      patient_name,
      patient_number,
      treatment,
      assigned_doctor,
      amount,
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
      branch_name,
      date,
      appointment_id,
      uhid,
      patient_name,
      patient_number,
      treatment,
      assigned_doctor,
      amount,
      payment_status,
      payment_Mode,
      transaction_Id,
      payment_date,
      refund_amount,
      refund_date,
      received_by,
      refund_by,
    ];

    const selectQuery =
      "INSERT INTO security_amount (branch_name, date, appointment_id, uhid, patient_name, patient_number, treatment, assigned_doctor, amount, payment_status, payment_Mode, transaction_Id, payment_date, refund_amount, refund_date, received_by, refund_by) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

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
  const appointment_id = req.params.appointment_id;

  const selectQuery = "SELECT * FROM security_amount WHERE appointment_id = ?";

  db.query(selectQuery, [appointment_id], (err, result) => {
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

const getAppointmentsWithPatientDetailsTreatSugg = (req, res) => {
  const sql = `
        SELECT 
            a.appoint_id,
            a.appointment_dateTime,
            a.treatment_provided,
            a.notes,
            a.appointment_status,
            a.assigned_doctor_name,
            a.assigned_doctor_id,
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
            IF(a.treatment_provided = n.treatment_name, n.total_sitting, NULL) AS total_sitting
        FROM 
            appointments AS a
        JOIN 
            patient_details AS p ON a.patient_uhid = p.uhid
        LEFT JOIN 
        treat_suggest AS n ON a.patient_uhid = n.p_uhid AND a.treatment_provided = n.treatment_name
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
          res.status(200).json({
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
};
