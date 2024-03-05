const express = require("express");
const db = require("../connect.js");

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
            // console.log('Query executed successfully');
            return res.status(200).json({ message: 'Get data from appointments and patient_details', result });
        }
    });
};

const getAppointmentsWithPatientDetailsById = (req, res) => {
    const appointmentId = req.params.id; // Assuming the appointment ID is passed as a parameter in the URL

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
        WHERE
            a.appoint_id = ?
    `;

    db.query(sql, [appointmentId], (err, result) => {
        if (err) {
            console.error('Error executing query:', err.stack);
            return res.status(500).json({ error: 'Internal server error' });
        } else if (result.length === 0) {
            return res.status(404).json({ error: 'Appointment not found' });
        } else {
            return res.status(200).json({ message: 'Get appointment by ID', result });
        }
    });
};

const upDateAppointmentStatus = (req, res) =>{
    const { action, appointId, reason } = req.body;
    const selectQuery = "SELECT * FROM apointments WHERE appoint_id = ?";
    db.query(selectQuery, appointId, (err,result)=>{
        if(err){
           return res.status(400).json({success:false, message:err.message})

        }
        if(result && result.length > 0){
            const updateQuery = "UPDATE apointments SET appointment_status = ?, cancel_reason = ? WHERE appoint_id = ?";
            db.query(updateQuery, [action, reason, appointId],(upErr,upRes)=>{
                if(upErr){
                    return res.status(400).json({success:false, message:upErr.message})
                }else{
                    return res.status(200).send(upRes)
                }
            })
        }else{
            res.status(400).json({success:false, message:"appoint ID not valid"})
        }
    })
}


//............ Currently START not use API's........

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

//.......... Currently END not use API's............



module.exports = { getAppointTable, getAppointmentById, getAppointmentsWithPatientDetails, getAppointmentsWithPatientDetailsById, upDateAppointmentStatus }; 

