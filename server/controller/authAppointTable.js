const express = require("express");
const db = require("../connect.js");

const getAppointTable = (req, res) => {
    const sql = "SELECT * FROM apointments";

    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error executing query in Appointment Table: ' + err.stack);
            return res.status(500).json({ error: 'Internal server error' });
        } else {
            console.log(`Query executed successfully in appointment table`);
            return res.status(200).json({ message: "Get Data Appointment Table", result });
        }
    })
};

const getAppointmentById = (req, res) => {
    const appointmentId = req.params.id; // Extracting appointment ID from URL parameters
    const sql = `SELECT * FROM apointments WHERE appoint_id = ?`; // Using placeholder for appointment ID

    db.query(sql, [appointmentId], (err, result) => {
        if (err) {
            console.error('Error executing query in Appointment Table: ' + err.stack);
            return res.status(500).json({ error: 'Internal server error' });
        } else {
            if (result.length === 0) {
                return res.status(404).json({ message: "Appointment not found" });
            }
            console.log(`Query executed successfully in appointment table`);
            return res.status(200).json({ message: "Get Data Appointment Table", result });
        }
    });
};

const getAppointmentsWithPatientDetails = (req, res) => {
    const sql = `
        SELECT 
            a.appoint_id,
            a.patient_name,
            a.patient_contact,
            a.appointment_dateTime,
            a.treatment_provided,
            a.notes,
            a.appointment_status,
            p.dob,
            p.age,
            p.weight,
            p.bloodgroup,
            p.disease,
            p.allergy,
            p.patient_type
        FROM 
            apointments AS a
        JOIN 
            patient_details AS p ON a.patient_uhid = p.uhid
    `;

    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error executing query:', err.stack);
            return res.status(500).json({ error: 'Internal server error' });
        } else {
            console.log('Query executed successfully');
            return res.status(200).json({ message: 'Get data from appointments and patient_details', result });
        }
    });
};

const updateAppointmentStatus = (req, res) => {
    const { action, appointId } = req.body;

    try {
        // Update the appointment status in the database based on the action and appointment ID
        let query = '';
        switch (action) {
            case 'start_treatment':
                query = `UPDATE apointments SET appointment_status = 'In Treatment' WHERE appoint_id = ?`;
                break;
            case 'cancel_treatment':
                query = `UPDATE apointments SET appointment_status = 'Cancelled' WHERE appoint_id = ?`;
                break;
            case 'hold':
                query = `UPDATE apointments SET appointment_status = 'On Hold' WHERE appoint_id = ?`;
                break;
            default:
                return res.status(400).json({ message: 'Invalid action' });
        }

        // Execute the SQL query
        db.query(query, [appointId]);

        // Send a success response
        res.status(200).json({ message: 'Appointment status updated successfully' });
    } catch (error) {
        console.error('Error updating appointment status:', error.message);
        // Send an error response
        res.status(500).json({ message: 'Internal server error' });
    }
};



module.exports = { getAppointTable, getAppointmentById, getAppointmentsWithPatientDetails, updateAppointmentStatus }; 