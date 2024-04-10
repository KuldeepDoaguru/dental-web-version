const express = require("express");
const db = require("../connect.js");

const getTreatmentList = (req, res) => {
  const sql = `SELECT * FROM treatment_list`;
  db.query(sql, (err, results) => {
    if (!err) {
      const sanitizedResults = results.filter(
        (result) => result.treatment_id !== 5
      );

      return res.status(200).send({
        code: "success",
        data: sanitizedResults,
      });
    } else {
      console.error(`Error while performing query ${sql}`, err);
      return res.status(500).send("Server error");
    }
  });
};

const insertTreatmentData = (req, res) => {
  const examId = req.params.exam_id;
  const tpid = req.params.tpid;
  const appointmentId = req.params.appointment_id;
  const {
    branch,
    sitting_number,
    patient_uhid,
    dental_treatment,
    no_teeth,
    qty,
    cost_amt,
    disc_amt,
    total_amt,
    net_amount,
    note,
  } = req.body;

  try {
    // Insert treatment details into the database
    db.query(
      "INSERT INTO dental_treatment (exam_id, tp_id, branch_name, appointment_id, sitting_number, patient_uhid, dental_treatment, no_teeth, qty, cost_amt, disc_amt, total_amt, net_amount, note) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        examId,
        tpid,
        branch,
        appointmentId,
        sitting_number,
        patient_uhid,
        dental_treatment,
        no_teeth,
        qty,
        cost_amt,
        disc_amt,
        total_amt,
        net_amount,
        note,
      ],
      (error, result) => {
        if (error) {
          console.error("Error inserting treatment details:", error);
          return res.status(500).json({ error: "Internal server error" });
        }

        // Check if the insertion was successful
        if (result.affectedRows === 1) {
          // Return success response
          res
            .status(201)
            .json({ message: "Treatment details inserted successfully" });
        } else {
          // Return error response if insertion failed
          res.status(500).json({ error: "Failed to insert treatment details" });
        }
      }
    );
  } catch (error) {
    console.error("Error inserting treatment details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getExamDataIdbyAppointId = (req, res) => {
  const id = req.params.id;
  const appointmentId = req.params.appointment_id;

  const sql = `SELECT * FROM dental_examination WHERE id = ? AND appointment_id = ?`;

  db.query(sql, [id, appointmentId], (err, result) => {
    if (err) {
      console.log(err);
      return res
        .status(400)
        .json({ success: false, message: `Error retrieving examin data` });
    } else {
      return res.status(200).json({ success: true, data: result[0] });
    }
  });
};

const getTreatmentData = (req, res) => {
  const appointmentId = req.params.appointment_id;
  const tpid = req.params.tpid;
  const branch = req.params.branch;

  const sql = `SELECT * FROM dental_treatment WHERE appointment_id = ? AND tp_id = ? AND branch_name = ?`;

  db.query(sql, [appointmentId, tpid, branch], (err, results) => {
    if (err) {
      console.log(err);
      return res
        .status(400)
        .json({ success: false, message: "Error retrieving treatment data" });
    } else {
      return res.status(200).json({ success: true, data: results });
    }
  });
};

const treatPatientUHID = (req, res) => {
  const patientUHID = req.params.patientUHID;

  const sql =
    "SELECT * FROM dental_treatment WHERE patient_uhid = ? ORDER BY date DESC LIMIT 1";
  db.query(sql, [patientUHID], (err, result) => {
    if (err) {
      console.error("Error retrieving data: ", err);
      res.status(500).send("Error retrieving data: " + err.message);
      return;
    }

    if (result.length === 0) {
      res.status(404).send("No data found for Patient UHID: " + patientUHID);
      return;
    }

    res.status(200).json(result); // Return the first (and only) element
  });
};

const getTreatPatientProfile = (req, res) => {
  const patientUHID = req.params.patientUHID;

  const sql = `SELECT dental_treatment.*, appointments.assigned_doctor_name FROM dental_treatment LEFT JOIN appointments ON dental_treatment.appointment_id = appointments.appoint_id WHERE dental_treatment.patient_uhid = ?`;

  db.query(sql, [patientUHID], (err, result) => {
    if (err) {
      console.error("Error retrieving data: ", err);
      res.status(500).send("Error retrieving data: " + err.message);
      return;
    }

    if (result.length === 0) {
      res.status(404).send("No data found for Appointment ID: " + patientUHID);
      return;
    }

    res.status(200).json(result);
  });
};

const updateTreatmentData = (req, res) => {
  const treatmentId = req.params.id; // Assuming you're passing the treatment ID in the route

  // Extract treatment data from request body
  const {
    dental_treatment,
    no_teeth,
    qty,
    cost_amt,
    original_cost_amt,
    disc_amt,
    total_amt,
    note,
  } = req.body;

  // Construct SQL query to update treatment data
  const sql = `UPDATE dental_treatment 
                 SET dental_treatment = ?, no_teeth = ?, qty = ?, cost_amt = ?, original_cost_amt = ?, disc_amt = ?, total_amt = ?, note = ?
                 WHERE id = ?`;

  // Execute the SQL query
  db.query(
    sql,
    [
      dental_treatment,
      no_teeth,
      qty,
      cost_amt,
      original_cost_amt,
      disc_amt,
      total_amt,
      note,
      treatmentId,
    ],
    (err, results) => {
      if (err) {
        console.log(err);
        return res
          .status(400)
          .json({ success: false, message: "Error updating treatment data" });
      } else {
        console.log(results);
        return res.status(200).json({
          success: true,
          message: "Treatment data updated successfully",
          results,
        });
      }
    }
  );
};

const deleteTreatmentData = (req, res) => {
  const treatmentId = req.params.id; // Assuming you're passing the treatment ID in the route

  // Construct SQL query to delete treatment data
  const sql = `DELETE FROM dental_treatment WHERE id = ?`;

  // Execute the SQL query
  db.query(sql, [treatmentId], (err, results) => {
    if (err) {
      console.log(err);
      return res
        .status(400)
        .json({ success: false, message: "Error deleting treatment data" });
    } else {
      console.log(results);
      return res.status(200).json({
        success: true,
        message: "Treatment data deleted successfully",
        results,
      });
    }
  });
};

const insertTreatPrescription = (req, res) => {
  const { appoint_id, tpid } = req.params;
  const {
    branch_name,
    patient_uhid,
    desease,
    treatment,
    medicine_name,
    dosage,
    frequency,
    duration,
    note,
  } = req.body;

  const sql =
    "INSERT INTO dental_prescription (appoint_id, tp_id, branch_name, patient_uhid, desease, treatment,medicine_name, dosage, frequency, duration, note) VALUES (?, ?, ?, ?, ?, ?, ?, ?,?,?,?)";

  db.query(
    sql,
    [
      appoint_id,
      tpid,
      branch_name,
      patient_uhid,
      desease,
      treatment,
      medicine_name,
      dosage,
      frequency,
      duration,
      note,
    ],
    (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(200).json({
          message: "Prescription inserted successfully",
          id: result.insertId,
        });
      }
    }
  );
};

const prescripPatientUHID = (req, res) => {
  const patientUHID = req.params.patientUHID;

  const sql = `SELECT dp.*, a.assigned_doctor_name FROM dental_prescription dp JOIN appointments a ON dp.appoint_id = a.appoint_id WHERE dp.patient_uhid = ? ORDER BY dp.date DESC LIMIT 1;`;
  db.query(sql, [patientUHID], (err, result) => {
    if (err) {
      console.error("Error retrieving data: ", err);
      res.status(500).send("Error retrieving data: " + err.message);
      return;
    }

    if (result.length === 0) {
      res.status(404).send("No data found for Patient UHID: " + patientUHID);
      return;
    }

    res.status(200).json(result); // Return the first (and only) element
  });
};

const getPrescriptionPatientProfile = (req, res) => {
  const patientUHID = req.params.patientUHID;

  const sql = `SELECT dental_prescription.*, appointments.assigned_doctor_name FROM dental_prescription LEFT JOIN appointments ON dental_prescription.appoint_id = appointments.appoint_id WHERE dental_prescription.patient_uhid = ?`;

  db.query(sql, [patientUHID], (err, result) => {
    if (err) {
      console.error("Error retrieving data: ", err);
      res.status(500).send("Error retrieving data: " + err.message);
      return;
    }

    if (result.length === 0) {
      res.status(404).send("No data found for Appointment ID: " + patientUHID);
      return;
    }

    res.status(200).json(result);
  });
};

const getMedicineData = (req, res) => {
  const sql = "SELECT item_name FROM purchase_inventory";

  db.query(sql, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      // Extract the column data from the result array
      const columnData = result.map((row) => row.item_name);
      res.status(200).json(columnData);
    }
  });
};

const getTreatPrescriptionByAppointId = (req, res) => {
  const { appoint_id, tpid } = req.params;

  const sql =
    "SELECT * FROM dental_prescription WHERE appoint_id = ? AND tp_id = ?";

  db.query(sql, [appoint_id, tpid], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json(results);
    }
  });
};

const deleteTreatPrescriptionById = (req, res) => {
  const { id } = req.params;

  const sql = `DELETE FROM dental_prescription WHERE id = ?`;

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.log(err);
      return res
        .status(400)
        .json({ success: false, error: "Failed to Delete" });
    } else {
      return res.status(200).json({
        success: true,
        message: "Prescription deleted successfully",
        affectedRows: result.affectedRows,
      });
    }
  });
};

// For testing purpose

const getTreatmentDataSUM = (req, res) => {
  const appointmentId = req.params.appointment_id;

  const sql = `SELECT SUM(total_amt) AS total_amount FROM dental_treatment WHERE appointment_id = ?`;

  db.query(sql, [appointmentId], (err, results) => {
    if (err) {
      console.log(err);
      return res
        .status(400)
        .json({ success: false, message: "Error retrieving treatment data" });
    } else {
      // Assuming there's always a single row returned with the sum
      const totalAmount = results[0].total_amount;
      return res.status(200).json({ success: true, total_amount: totalAmount });
    }
  });
};

const onGoingTreat = (req, res) => {
  const patientUHID = req.params.patientUHID;

  // SQL query to fetch treatment data for the given appointment ID
  const sql = `SELECT treatment_name, sitting_result FROM treat_suggest WHERE p_uhid = ?`;

  db.query(sql, [patientUHID], (error, results) => {
    if (error) {
      console.error("Error fetching treatment data:", error.message);
      return res.status(500).json({ error: "Server error" });
    }

    let ongoingTreatment = "";
    if (results.length > 0) {
      // Calculate total sitting result
      let totalSittingResult = 0;
      results.forEach((row) => {
        totalSittingResult += row.sitting_result;
      });

      // Determine ongoing treatment
      if (totalSittingResult > 0) {
        // If there are ongoing treatments, find the treatment name
        ongoingTreatment = results.find(
          (row) => row.sitting_result > 0
        ).treatment_name;
      } else {
        ongoingTreatment = `No Ongoing Treatment`;
      }
    } else {
      ongoingTreatment = "No treatments found";
    }

    // Return the result
    res.json({ ongoingTreatment });
  });
};

module.exports = {
  getTreatmentList,
  insertTreatmentData,
  getExamDataIdbyAppointId,
  getTreatmentData,
  updateTreatmentData,
  deleteTreatmentData,
  insertTreatPrescription,
  getMedicineData,
  getTreatPrescriptionByAppointId,
  deleteTreatPrescriptionById,
  getTreatmentDataSUM,
  getTreatPatientProfile,
  treatPatientUHID,
  getPrescriptionPatientProfile,
  prescripPatientUHID,
  onGoingTreat,
};
