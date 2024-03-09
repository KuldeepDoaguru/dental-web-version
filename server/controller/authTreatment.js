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
    const appointmentId = req.params.appointmentId; // Corrected to match route parameter name
    const { dental_treatment, no_teeth, qty, cost_amt, disc_amt, total_amt, note } = req.body;

    try {
        // Insert treatment details into the database
        db.query(
            'INSERT INTO dental_treatment (appointment_id, dental_treatment, no_teeth, qty, cost_amt, disc_amt, total_amt, note) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [appointmentId, dental_treatment, no_teeth, qty, cost_amt, disc_amt, total_amt, note],
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
}



module.exports = { getTreatmentList, insertTreatmentData }; 