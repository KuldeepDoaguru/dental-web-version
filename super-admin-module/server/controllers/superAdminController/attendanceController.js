const express = "express";
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const JWT = require("jsonwebtoken");
const { db } = require("../../dbConnect/connect");
const fs = require("fs");
const path = require("path");
const { log } = require("console");

dotenv.config();

const PORT = process.env.PORT;

const getAttendanceDetails = (req, res) => {
  try {
    const branch = req.params.branch;
    const selectQuery = "SELECT * FROM employee_attendance WHERE branch = ?";
    db.query(selectQuery, branch, (err, results) => {
      if (err) {
        res.status(400).json({ success: false, message: err.message });
      }
      res.status(200).send(results);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const downloadAttendanceReportByTime = (req, res) => {
  try {
    const branch = req.params.branch;
    const { fromDate, toDate } = req.body;
    const selectQuery =
      "SELECT * FROM employee_attendance WHERE branch = ? AND date >= ? AND date <= ?";
    db.query(selectQuery, [branch, fromDate, toDate], (err, result) => {
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

const getBranchDetailsByBranch = (req, res) => {
  try {
    const branch = req.params.branch;
    const selectQuery = "SELECT * FROM branches WHERE branch_name = ?";
    db.query(selectQuery, branch, (err, result) => {
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

const updateBranchCalenderSetting = (req, res) => {
  try {
    const branch = req.params.branch;
    const { open_time, close_time, appoint_slot_duration } = req.body;
    const selectQuery = "SELECT * FROM branches WHERE branch_name = ?";
    db.query(selectQuery, branch, (err, result) => {
      if (err) {
        return res.status(400).json({ success: false, message: err.message });
      }
      if (result && result.length > 0) {
        const updateFields = [];
        const updateValues = [];

        if (open_time) {
          updateFields.push("open_time = ?");
          updateValues.push(open_time);
        }

        if (close_time) {
          updateFields.push("close_time = ?");
          updateValues.push(close_time);
        }

        if (appoint_slot_duration) {
          updateFields.push("appoint_slot_duration = ?");
          updateValues.push(appoint_slot_duration);
        }

        const updateQuery = `UPDATE branches SET ${updateFields.join(
          ", "
        )} WHERE branch_name = ?`;

        db.query(updateQuery, [...updateValues, branch], (err, result) => {
          if (err) {
            return res.status(500).json({
              success: false,
              message: "Failed to update details",
            });
          } else {
            return res.status(200).json({
              success: true,
              message: "Branch Details updated successfully",
            });
          }
        });
      } else {
        return res.status(404).json({
          success: false,
          message: "Branch not found",
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

const addBlockDays = (req, res) => {
  try {
    const { branch_name, holiday_date, holiday_time, notes } = req.body;
    const selectQuery = "SELECT * FROM holidays WHERE holiday_date = ?";
    db.query(selectQuery, holiday_date, (err, result) => {
      if (err) {
        return res.status(400).json({ success: false, message: err.message });
      }
      if (result && result.length > 0) {
        return res.status(400).send("Holiday already exists");
      } else {
        const insertQuery =
          "INSERT INTO holidays (branch_name, holiday_date, holiday_time, notes) VALUES (?,?,?,?)";
        db.query(
          insertQuery,
          [branch_name, holiday_date, holiday_time, notes],
          (err, result) => {
            if (err) {
              return res
                .status(400)
                .json({ success: false, message: err.message });
            }
            return res.status(200).send(result);
          }
        );
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const getHolidays = (req, res) => {
  try {
    const branch = req.params.branch;
    const selectQuery = "SELECT * FROM holidays WHERE branch_name = ?";
    db.query(selectQuery, branch, (err, result) => {
      if (err) {
        res.status(400).json({ success: false, message: err.message });
      }
      res.status(200).send(result);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateHolidays = (req, res) => {
  try {
    const hid = req.params.hid;
    const { holiday_date, holiday_time, notes } = req.body;
    const selectQuery = "SELECT * FROM holidays WHERE holiday_id = ?";
    db.query(selectQuery, hid, (err, result) => {
      if (err) {
        res.status(500).json({ success: false, message: err.message });
      }
      if (result && result.length > 0) {
        const updateFields = [];
        const updateValues = [];

        if (holiday_date) {
          updateFields.push("holiday_date = ?");
          updateValues.push(holiday_date);
        }

        if (holiday_time) {
          updateFields.push("holiday_time = ?");
          updateValues.push(holiday_time);
        }

        if (notes) {
          updateFields.push("notes = ?");
          updateValues.push(notes);
        }

        const updateQuery = `UPDATE holidays SET ${updateFields.join(
          ", "
        )} WHERE holiday_id = ?`;

        db.query(updateQuery, [...updateValues, hid], (err, result) => {
          if (err) {
            return res.status(500).json({
              success: false,
              message: "Failed to update details",
            });
          } else {
            return res.status(200).json({
              success: true,
              message: "Holiday Details updated successfully",
            });
          }
        });
      } else {
        return res.status(404).json({
          success: false,
          message: "holiday ID not found",
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteHolidays = (req, res) => {
  try {
    const hid = req.params.hid;
    const deleteQuery = "DELETE FROM holidays WHERE holiday_id = ?";
    db.query(deleteQuery, hid, (err, result) => {
      if (err) {
        return res.status(400).json({ success: false, message: err.message });
      }
      return res
        .status(200)
        .json({ success: true, message: "Holiday deleted successfully" });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const addDrugs = (req, res) => {
  try {
    const {
      HSN_code,
      item_code,
      drug_name,
      drug_strength,
      instruction,
      branch_name,
    } = req.body;
    const selectQuery = "SELECT * FROM drugs WHERE item_code = ?";
    db.query(selectQuery, item_code, (err, result) => {
      if (err) {
        return res.status(400).json({ success: false, message: err.message });
      }
      if (result && result.length > 0) {
        return res.status(400).send("drugs already exists");
      } else {
        const insertQuery =
          "INSERT INTO drugs (HSN_code, item_code, drug_name, drug_strength, instruction, branch_name) VALUES (?,?,?,?,?,?)";
        db.query(
          insertQuery,
          [
            HSN_code,
            item_code,
            drug_name,
            drug_strength,
            instruction,
            branch_name,
          ],
          (err, result) => {
            if (err) {
              return res
                .status(400)
                .json({ success: false, message: err.message });
            }
            return res.status(200).send(result);
          }
        );
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const getDrugs = (req, res) => {
  try {
    const branch = req.params.branch;
    const selectQuery = "SELECT * FROM drugs WHERE branch_name = ?";
    db.query(selectQuery, branch, (err, result) => {
      if (err) {
        res.status(400).json({ success: false, message: err.message });
      }
      res.status(200).send(result);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAttendanceDetails,
  downloadAttendanceReportByTime,
  getBranchDetailsByBranch,
  updateBranchCalenderSetting,
  addBlockDays,
  getHolidays,
  updateHolidays,
  deleteHolidays,
  addDrugs,
  getDrugs,
};
