const express = require("express");
const db = require("../connect.js");

const dentalPediatric = (req, res) =>{
    const data = req.body;

    const sql = 'INSERT INTO dental_examination (selected_teeth, disease, chief_complain, advice, on_examination) VALUES (?, ?, ?, ?, ?)';
    const values = [data.selectedTeeth, data.disease, data.chiefComplain, data.advice, data.onExamination];

    db.query(sql, values, (err, result) => {
        if (err) {
          console.error('Error inserting data: ' + err.stack);
          res.status(500).send('Error inserting data');
          return;
        }
        console.log('Inserted data with ID ' + result.insertId);
        res.status(200).send('Data inserted successfully');
      });
};

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





module.exports = { dentalPediatric, dentalPediatricUpdate }; 