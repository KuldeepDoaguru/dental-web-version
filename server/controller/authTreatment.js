const express = require("express");
const db = require("../connect.js");

const getTreatmentList = (req, res) => {
    const sql = `SELECT * FROM treatment_list`;
    db.query(sql, (err, results) => {
        if (!err) {
            return res.status(200).send({
                code: 'success',
                data: results
            });
        } else {
            console.error(`Error while performing query ${sql}`, err);
            return res.status(500).send('Server error');
        }
    })
};

const insertTreatmentData = (req, res) => {
    const examId = req.params.exam_id;
    const appointmentId = req.params.appointment_id;
    const { dental_treatment, no_teeth, qty, cost_amt, disc_amt, total_amt, note, original_cost_amt } = req.body;

    try {
        // Insert treatment details into the database
        db.query(
            'INSERT INTO dental_treatment (exam_id, appointment_id, dental_treatment, no_teeth, qty, cost_amt, disc_amt, total_amt, note, original_cost_amt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [examId, appointmentId, dental_treatment, no_teeth, qty, cost_amt, disc_amt, total_amt, note, original_cost_amt],
            (error, result) => {
                if (error) {
                    console.error('Error inserting treatment details:', error);
                    return res.status(500).json({ error: 'Internal server error' });
                }

                // Check if the insertion was successful
                if (result.affectedRows === 1) {
                    // Return success response
                    res.status(201).json({ message: 'Treatment details inserted successfully' });
                } else {
                    // Return error response if insertion failed
                    res.status(500).json({ error: 'Failed to insert treatment details' });
                }
            }
        );
    } catch (error) {
        console.error('Error inserting treatment details:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getExamDataIdbyAppointId = (req, res) => {
    const id = req.params.id;
    const appointmentId = req.params.appointment_id;

    const sql = `SELECT * FROM dental_examination WHERE id = ? AND appointment_id = ?`;

    db.query(sql, [id, appointmentId], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(400).json({ success: false, message: `Error retrieving examin data` });
        } else {
            return res.status(200).json({ success: true, data: result[0] });
        }
    })
};

const getTreatmentData = (req, res) => {
    const appointmentId = req.params.appointment_id;

    const sql = `SELECT * FROM dental_treatment WHERE appointment_id = ?`;

    db.query(sql, [appointmentId], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(400).json({ success: false, message: "Error retrieving treatment data" })
        } else {
            console.log(results);
            return res.status(200).json({ success: true, data: results });
        }
    })
};

const updateTreatmentData = (req, res) => {
    const treatmentId = req.params.id; // Assuming you're passing the treatment ID in the route

    // Extract treatment data from request body
    const { dental_treatment, no_teeth, qty, cost_amt, original_cost_amt, disc_amt, total_amt, note } = req.body;

    // Construct SQL query to update treatment data
    const sql = `UPDATE dental_treatment 
                 SET dental_treatment = ?, no_teeth = ?, qty = ?, cost_amt = ?, original_cost_amt = ?, disc_amt = ?, total_amt = ?, note = ?
                 WHERE id = ?`;

    // Execute the SQL query
    db.query(sql, [dental_treatment, no_teeth, qty, cost_amt, original_cost_amt, disc_amt, total_amt, note, treatmentId], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(400).json({ success: false, message: "Error updating treatment data" });
        } else {
            console.log(results);
            return res.status(200).json({ success: true, message: "Treatment data updated successfully", results });
        }
    });
};

const deleteTreatmentData = (req, res) => {
    const treatmentId = req.params.id; // Assuming you're passing the treatment ID in the route

    // Construct SQL query to delete treatment data
    const sql = `DELETE FROM dental_treatment WHERE id = ?`;

    // Execute the SQL query
    db.query(sql, [treatmentId], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(400).json({ success: false, message: "Error deleting treatment data" });
        } else {
            console.log(results);
            return res.status(200).json({ success: true, message: "Treatment data deleted successfully", results });
        }
    });
};

const insertTreatPrescription = (req, res) => {
    const { medicine_name, dosage, frequency, duration, note } = req.body;

    const sql = 'INSERT INTO dental_prescription (medicine_name, dosage, frequency, duration, note) VALUES (?, ?, ?, ?, ?)';

    db.query(sql, [medicine_name, dosage, frequency, duration, note], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(200).json({ message: 'User inserted successfully', id: result.insertId });
        }
    })
}




module.exports = { getTreatmentList, insertTreatmentData, getExamDataIdbyAppointId, getTreatmentData, updateTreatmentData, deleteTreatmentData, insertTreatPrescription }; 