const express = require("express");
const db = require("../connect.js");

const getTreatmentList = (req, res)  => {
    const sql = `SELECT * FROM treatment_list`;
    db.query(sql, (err, results) => {
        if (!err){
            return res.status(200).send({
                code: 'success',
                data: results
            });
        }else{
            console.error(`Error while performing query ${sql}`, err);
            return res.status(500).send('Server error');
        }
    })
};

module.exports = {getTreatmentList}; 