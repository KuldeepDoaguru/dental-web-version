const express = require("express");
const db = require("../connect.js");

const dentalPediatric = (req, res) => {
    const data = req.body;

    const sql = 'INSERT INTO dental_examination (appointment_id, selected_teeth, disease, chief_complain, advice, on_examination) VALUES (?, ?, ?, ?, ?, ?)';
    const values = [data.appointment_id, data.selectedTeeth, data.disease, data.chiefComplain, data.advice, data.onExamination];

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



// .........These START API's not used currently..........

const dentalPediatricUpdate = (req, res) => {
    const data = req.body;
    const id = req.params.id; // Extract ID from URL parameters

    const sql = `
        UPDATE dental_examination 
        SET disease = ?, chief_complain = ?, advice = ?, on_examination = ?
        WHERE id = ?
    `;
    const values = [data.disease, data.chiefComplain, data.advice, data.onExamination, id];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error updating data: ' + err.stack);
            res.status(500).send('Error updating data');
            return;
        }
        console.log('Updated data for ID ' + id);
        res.status(200).send('Data updated successfully');
    });
};

// ......These START API's not used currently.......


module.exports = { dentalPediatric, updateDentalPediatric, getDentalDataByID, deleteDentalPediatric}; 