const express = require("express");
const db = require("../connect.js");
const { getBranch } = require("./authBranch.js");

const dentalPediatric = (req, res) => {
  const data = req.body;
  const sql =
    "INSERT INTO dental_examination (appointment_id, tp_id, patient_uhid, selected_teeth, disease, chief_complain, advice, on_examination, diagnosis_category) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
  const values = [
    data.appointment_id,
    data.tpid,
    data.patient_uhid,
    data.selectedTeeth,
    data.disease,
    data.chiefComplain,
    data.advice,
    data.onExamination,
    data.diagnosis_category,
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error inserting data: ", err);
      res.status(500).send("Error inserting data: " + err.message);
      return;
    }
    console.log("Inserted data with ID " + result.insertId);
    res
      .status(200)
      .json({ success: true, examination_ID: result.insertId.toString() });
  });
};

const updateDentalPediatric = (req, res) => {
  const id = req.params.id; // Get the ID from the URL
  const data = req.body;

  const sql =
    "UPDATE dental_examination SET selected_teeth = ?, disease = ?, chief_complain = ?, advice = ?, on_examination = ? WHERE exm_id = ?";
  const values = [
    data.selectedTeeth,
    data.disease,
    data.chiefComplain,
    data.advice,
    data.onExamination,
    id,
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error updating data: ", err);
      res.status(500).send("Error updating data: " + err.message);
      return;
    }
    console.log("Updated data for ID " + id);
    res.status(200).send("Data updated successfully");
  });
};

// Examination Module
const getDentalDataByID = (req, res) => {
  const appointmentId = req.params.appointmentId;

  const sql = "SELECT * FROM dental_examination WHERE appointment_id = ?";
  db.query(sql, [appointmentId], (err, result) => {
    if (err) {
      console.error("Error retrieving data: ", err);
      res.status(500).send("Error retrieving data: " + err.message);
      return;
    }

    if (result.length === 0) {
      res
        .status(404)
        .send("No data found for appointment ID: " + appointmentId);
      return;
    }

    res.status(200).json(result);
  });
};

const getDentalPatientDataByID = (req, res) => {
  const patientUHID = req.params.patientUHID;

  const sql = `
    SELECT dental_examination.*, appointments.assigned_doctor_name, appointments.branch_name FROM dental_examination LEFT JOIN appointments ON dental_examination.appointment_id = appointments.appoint_id WHERE dental_examination.patient_uhid = ?`;

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

    res.status(200).json(result);
  });
};

const getDentalPatientByID = (req, res) => {
  const patientUHID = req.params.patientUHID;

  // const sql = 'SELECT * FROM dental_examination WHERE patient_uhid = ? ORDER BY date DESC LIMIT 1';
  const sql = `SELECT dental.*, appointments.assigned_doctor_name 
    FROM dental_examination dental
    INNER JOIN appointments ON dental.patient_uhid = appointments.patient_uhid
    WHERE dental.patient_uhid = ? 
    ORDER BY dental.date DESC 
    LIMIT 1;`;
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

    res.status(200).json(result);
  });
};

const deleteDentalPediatric = (req, res) => {
  const id = req.params.id;

  const sql = `DELETE FROM dental_examination WHERE exm_id=?`;
  const values = [id];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error deleting data: ", err);
      return res.status(400).json({ success: false, message: err });
    } else {
      return res
        .status(200)
        .json({ success: true, message: "Data deleted successfully", result });
    }
  });
};

const insertTreatSuggest = (req, res) => {
  const {
    appoint_id,
    branch,
    p_uhid,
    tp_id,
    desease,
    treatment_name,
    totalCost,
    total_sitting,
  } = req.body;

  const selectQuery =
    "SELECT * FROM treat_suggest WHERE tp_id = ? AND treatment_name = ?";
  db.query(selectQuery, [tp_id, treatment_name], (err, result) => {
    if (err) {
      return res.status(400).json({ success: false, message: err.message });
    } else {
      if (result && result.length > 0) {
        return res
          .status(400)
          .json({ success: false, message: "treatment already listed" });
      } else {
        const sql = `INSERT INTO treat_suggest (appoint_id, branch_name, p_uhid, tp_id, desease, treatment_name, totalCost,total_sitting) VALUES(?,?,?,?,?,?,?,?)`;

        db.query(
          sql,
          [
            appoint_id,
            branch,
            p_uhid,
            tp_id,
            desease,
            treatment_name,
            totalCost,
            total_sitting,
          ],
          (err, result) => {
            if (err) {
              return res.status(400).json({ success: false, message: err });
            } else {
              return res.status(201).json({
                success: true,
                message: "Insertion Successful!",
                result,
              });
            }
          }
        );
      }
    }
  });
};

const getTreatSuggestById = (req, res) => {
  const appoint_id = req.params.appoint_id;
  const sql = `SELECT * FROM treat_suggest WHERE appoint_id = ?`;

  db.query(sql, [appoint_id], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ success: false, message: err.message });
    } else {
      if (result.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No data found with the provided ID",
        });
      }
      return res.status(200).json({ success: true, data: result[0] });
    }
  });
};

const getPatientDetails = (req, res) => {
  const patientId = req.params.patientId;
  const branch = req.params.branch;
  try {
    const sql =
      // "SELECT * FROM patient_details WHERE uhid = ? AND branch_name = ?";
      "SELECT * FROM patient_details WHERE uhid = ?";

    db.query(sql, [patientId, branch], (err, results) => {
      if (err) {
        console.error("Error fetching patient from MySql:", err);
        res.status(500).json({ error: "Error fetching patient" });
      } else {
        if (results.length === 0) {
          res.status(404).json({ message: "Patient not found" });
        } else {
          res.status(200).json({
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

const updateSittingCount = (req, res) => {
  const appointId = req.params.appoint_id; // Get the appointment ID from request parameters

  // Retrieve current sitting count for the given appointment ID
  db.query(
    "SELECT sitting_result FROM treat_suggest WHERE appoint_id = ?",
    [appointId],
    (err, results) => {
      if (err) {
        return res
          .status(500)
          .json({ success: false, message: "Error fetching sitting count" });
      }

      if (results.length === 0) {
        return res
          .status(404)
          .json({ success: false, message: "Appointment ID not found" });
      }

      const currentSitting = results[0].sitting_result; // Corrected: retrieve sitting_result

      // Check if sitting count is greater than 0
      if (currentSitting > 0) {
        // Calculate new sitting count after deduction
        const newSitting = currentSitting - 1;

        // Update sitting count in the database
        db.query(
          "UPDATE treat_suggest SET sitting_result = ? WHERE appoint_id = ?",
          [newSitting, appointId],
          (err, result) => {
            if (err) {
              return res.status(500).json({
                success: false,
                message: "Error updating sitting count",
              });
            }

            return res.status(200).json({
              success: true,
              message: "Sitting count updated successfully",
              newSitting,
            });
          }
        );
      } else {
        // Sitting count is already 0, no need to update
        return res.status(200).json({
          success: true,
          message: "Sitting count is already 0, no deduction needed",
        });
      }
    }
  );
};

const addTreatPackageDetails = (req, res) => {
  try {
    const {
      uhid,
      branch_name,
      appointment_id,
      examination_id,
      doctor_id,
      doctor_name,
      diagnosis_category,
    } = req.body;
    const insertQuery =
      "INSERT INTO treatment_package (uhid, branch_name, appointment_id, examination_id, doctor_id, doctor_name, diagnosis_category) VALUES (?,?,?,?,?,?,?)";
    const insertParams = [
      uhid,
      branch_name,
      appointment_id,
      examination_id,
      doctor_id,
      doctor_name,
      diagnosis_category,
    ];
    db.query(insertQuery, insertParams, (err, result) => {
      if (err) {
        res.status(400).json({ success: false, message: err.message });
      } else {
        const insertedData = {
          uhid,
          branch_name,
          appointment_id,
          examination_id,
          doctor_id,
          doctor_name,
          diagnosis_category,
          insertId: result.insertId,
        };
        res.status(200).json({ success: true, result: insertedData });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const getTreatList = (req, res) => {
  try {
    const branch = req.params.branch;
    const tpid = req.params.tpid;
    const selectQuery =
      "SELECT * FROM treat_suggest WHERE branch_name = ? AND tp_id = ?";
    db.query(selectQuery, [branch, tpid], (err, result) => {
      if (err) {
        res.status(400).json({ success: false, message: err.message });
      }
      res.status(200).send(result);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const updateTreatSitting = (req, res) => {
  try {
    const tsid = req.params.tsid;
    const branch = req.params.branch;
    const {
      consider_sitting,
      current_sitting,
      upcoming_sitting,
      current_sitting_status,
      upcoming_sitting_status,
    } = req.body;

    const sql = `UPDATE treat_suggest 
    SET consider_sitting = ?, 
        current_sitting = ?, 
        upcoming_sitting = ?, 
        current_sitting_status = ?, 
        upcoming_sitting_status = ? 
    WHERE ts_id = ? 
      AND branch_name = ?`;

    db.query(
      sql,
      [
        consider_sitting,
        current_sitting,
        upcoming_sitting,
        current_sitting_status,
        upcoming_sitting_status,
        tsid,
        branch,
      ],
      (err, result) => {
        if (err) {
          res.status(400).json({ success: false, message: err.message });
        } else {
          const insertedData = {
            consider_sitting,
            current_sitting,
            upcoming_sitting,
            current_sitting_status,
            upcoming_sitting_status,
            tsid,
            branch,
          };
          res.status(200).json({ success: true, result: insertedData });
        }
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const updateTreatSuggestion = (req, res) => {
  const branch = req.params.branch;
  const tsid = req.params.tsid;
  try {
    const { total_sitting } = req.body;
    const selectQuery =
      "SELECT * FROM treat_suggest WHERE ts_id = ? AND branch_name = ?";
    db.query(selectQuery, [tsid, branch], (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Internal server error",
        });
      }

      if (result && result.length > 0) {
        const updateQuery = `UPDATE treat_suggest SET total_sitting = ? WHERE ts_id = ? AND branch_name = ?`;

        db.query(updateQuery, [total_sitting, tsid, branch], (err, result) => {
          if (err) {
            return res.status(500).json({
              success: false,
              message: "Failed to update details",
            });
          } else {
            return res.status(200).json({
              success: true,
              message: "Details updated successfully",
            });
          }
        });
      } else {
        return res.status(404).json({
          success: false,
          message: "treatment not found",
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error!" });
  }
};

const deleteTreatSuggestion = (req, res) => {
  const branch = req.params.branch;
  const tsid = req.params.tsid;
  try {
    const deleteQuery =
      "DELETE FROM treat_suggest WHERE ts_id = ? AND branch_name = ?";
    db.query(deleteQuery, [tsid, branch], (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Internal server error",
        });
      }

      if (result.affectedRows > 0) {
        return res.status(200).json({
          success: true,
          message: "Treatment suggestion deleted successfully",
        });
      } else {
        return res.status(404).json({
          success: false,
          message: "Treatment suggestion not found",
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error!" });
  }
};

const getFilteredTreat = (req, res) => {
  try {
    const tpid = req.params.tpid;
    const branch = req.params.branch;
    const getQuery =
      "SELECT * FROM treat_suggest JOIN dental_examination on treat_suggest.tp_id = dental_examination.tp_id WHERE treat_suggest.tp_id = ? AND branch_name = ?";

    db.query(getQuery, [tpid, branch], (err, results) => {
      if (err) {
        res.status(400).json({ success: false, message: err.message });
      }
      res.status(200).send(results);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = {
  dentalPediatric,
  updateDentalPediatric,
  getDentalDataByID,
  deleteDentalPediatric,
  insertTreatSuggest,
  getTreatSuggestById,
  getPatientDetails,
  getDentalPatientDataByID,
  getDentalPatientByID,
  updateSittingCount,
  addTreatPackageDetails,
  getTreatList,
  updateTreatSitting,
  updateTreatSuggestion,
  deleteTreatSuggestion,
  getFilteredTreat,
};
