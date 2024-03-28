const express = require("express");
const db = require("../connect.js");

const dentalPediatric = (req, res) => {
    const data = req.body;

    const sql = 'INSERT INTO dental_examination (appointment_id, patient_uhid, selected_teeth, disease, chief_complain, advice, on_examination) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const values = [data.appointment_id, data.patient_uhid, data.selectedTeeth, data.disease, data.chiefComplain, data.advice, data.onExamination];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error inserting data: ', err);
            res.status(500).send('Error inserting data: ' + err.message);
            return;
        }
        console.log('Inserted data with ID ' + result.insertId);
        res.status(200).send('Data inserted successfully');
    });
};

const updateDentalPediatric = (req, res) => {
    const id = req.params.id; // Get the ID from the URL
    const data = req.body;

    const sql = 'UPDATE dental_examination SET selected_teeth = ?, disease = ?, chief_complain = ?, advice = ?, on_examination = ? WHERE id = ?';
    const values = [data.selectedTeeth, data.disease, data.chiefComplain, data.advice, data.onExamination, id];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error updating data: ', err);
            res.status(500).send('Error updating data: ' + err.message);
            return;
        }
        console.log('Updated data for ID ' + id);
        res.status(200).send('Data updated successfully');
    });
};

// Examination Module
const getDentalDataByID = (req, res) => {
    const appointmentId = req.params.appointmentId;

    const sql = 'SELECT * FROM dental_examination WHERE appointment_id = ?';
    db.query(sql, [appointmentId], (err, result) => {
        if (err) {
            console.error('Error retrieving data: ', err);
            res.status(500).send('Error retrieving data: ' + err.message);
            return;
        }

        if (result.length === 0) {
            res.status(404).send('No data found for appointment ID: ' + appointmentId);
            return;
        }

        res.status(200).json(result);
    });
};

// Examination Module for Patient Profile
const getDentalPatientDataByID = (req, res) => {
    const patientUHID = req.params.patientUHID;

    const sql = 'SELECT * FROM dental_examination WHERE patient_uhid = ?';
    db.query(sql, [patientUHID], (err, result) => {
        if (err) {
            console.error('Error retrieving data: ', err);
            res.status(500).send('Error retrieving data: ' + err.message);
            return;
        }

        if (result.length === 0) {
            res.status(404).send('No data found for Patient UHID: ' + patientUHID);
            return;
        }

        res.status(200).json(result);
    });
};

const getDentalPatientByID = (req, res) => {
    const patientUHID = req.params.patientUHID;

    const sql = 'SELECT * FROM dental_examination WHERE patient_uhid = ? ORDER BY date DESC LIMIT 1';
    db.query(sql, [patientUHID], (err, result) => {
        if (err) {
            console.error('Error retrieving data: ', err);
            res.status(500).send('Error retrieving data: ' + err.message);
            return;
        }

        if (result.length === 0) {
            res.status(404).send('No data found for Patient UHID: ' + patientUHID);
            return;
        }

        res.status(200).json(result);
    });
};


const deleteDentalPediatric = (req, res) =>{
    const id = req.params.id;
    
    const sql = `DELETE FROM dental_examination WHERE id=?`;
    const values = [id];

    db.query(sql, values, (err, result)=>{
        if(err){
            console.error('Error deleting data: ', err);
            return res.status(400).json({success: false, message: err})
        }else{
            return res.status(200).json({success: true, message: "Data deleted successfully", result})
        }
    })
}

const insertTreatSuggest = (req, res) => {
    const { appoint_id, p_uhid, treatment_name, totalCost, treatment_sitting, consider_sitting, sitting_result, appoint_date, note } = req.body;

    // Convert treatment_name array to a comma-separated string
    const treatmentNamesString = Array.isArray(treatment_name) ? treatment_name.join(', ') : treatment_name;

    const sql = `INSERT INTO treat_suggest (appoint_id, p_uhid, treatment_name, totalCost, treatment_sitting, consider_sitting, sitting_result, appoint_date, note) VALUES(?,?,?,?,?,?,?,?,?)`;

    db.query(sql, [appoint_id, p_uhid, treatmentNamesString, totalCost, treatment_sitting, consider_sitting, sitting_result, appoint_date, note], (err, result) => {
        if (err) {
            return res.status(400).json({ success: false, message: err });
        } else {
            return res.status(201).json({ success: true, message: "Insertion Successful!", result });
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
                return res.status(404).json({ success: false, message: "No data found with the provided ID" });
            }
            return res.status(200).json({ success: true, data: result[0] });
        }
    });
};

const getPatientDetails = (req, res) =>{
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
}


module.exports = { dentalPediatric, updateDentalPediatric, getDentalDataByID, deleteDentalPediatric, insertTreatSuggest, getTreatSuggestById, getPatientDetails, getDentalPatientDataByID, getDentalPatientByID}; 