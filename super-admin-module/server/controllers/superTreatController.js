const express = require("express");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { db } = require("../dbConnect/connect");

dotenv.config();

const PORT = process.env.PORT;

const getTreatSuggest = (req, res) => {
  try {
    const branch = req.params.branch;
    const selectQuery = "SELECT * FROM patient_bills WHERE branch_name = ?";
    db.query(selectQuery, branch, (err, result) => {
      if (err) {
        res.status(400).json({ success: false, message: err.message });
      }
      res.status(500).send(result);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const getTreatmentViaUhid = (req, res) => {
  const branch = req.params.branch;
  const uhid = req.params.uhid;
  try {
    const sql =
      "SELECT * FROM treat_suggest WHERE branch_name = ? AND p_uhid = ? ORDER BY tp_id DESC";

    db.query(sql, [branch, uhid], (err, results) => {
      if (err) {
        console.error("Error fetching Treatment from MySql:", err);
        res.status(500).json({ error: "Error fetching Treatment" });
      } else {
        res.status(200).send(results);
      }
    });
  } catch (error) {
    console.error("Error fetching Treatment from MySql:", error);
    res.status(500).json({
      success: false,
      message: "Error in fetched Treatment",
      error: error.message,
    });
  }
};

const getExaminationViaUhid = (req, res) => {
  const branch = req.params.branch;
  const uhid = req.params.uhid;
  try {
    const sql =
      "SELECT * FROM dental_examination WHERE branch_name = ? AND patient_uhid = ? ORDER BY exm_id DESC";

    db.query(sql, [branch, uhid], (err, results) => {
      if (err) {
        console.error("Error fetching Examination from MySql:", err);
        res.status(500).json({ error: "Error fetching Examination" });
      } else {
        res.status(200).send(results);
      }
    });
  } catch (error) {
    console.error("Error fetching Examination from MySql:", error);
    res.status(500).json({
      success: false,
      message: "Error in fetched Examination",
      error: error.message,
    });
  }
};

const getPrescriptionViaUhid = (req, res) => {
  const branch = req.params.branch;
  const uhid = req.params.uhid;
  try {
    const sql =
      "SELECT * FROM dental_prescription WHERE branch_name = ? AND patient_uhid = ? ORDER BY id DESC";

    db.query(sql, [branch, uhid], (err, results) => {
      if (err) {
        console.error("Error fetching Prescription from MySql:", err);
        res.status(500).json({ error: "Error fetching Prescription" });
      } else {
        res.status(200).send(results);
      }
    });
  } catch (error) {
    console.error("Error fetching Prescription from MySql:", error);
    res.status(500).json({
      success: false,
      message: "Error in fetched Prescription",
      error: error.message,
    });
  }
};

const getPatientBillUHID = (req, res) => {
  const patientUHID = req.params.patientUHID;

  const sql = `SELECT * FROM patient_bills WHERE uhid = ? ORDER BY bill_id DESC`;

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

    res.status(200).json(result); // Return the result
  });
};

module.exports = {
  getTreatSuggest,
  getTreatmentViaUhid,
  getExaminationViaUhid,
  getPrescriptionViaUhid,
  getPatientBillUHID,
};
