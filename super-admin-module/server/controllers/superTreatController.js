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

const getLeaveList = (req, res) => {
  try {
    const selectQuery = "SELECT * FROM employee_leave";
    db.query(selectQuery, (err, result) => {
      if (err) {
        return res.status(400).json({ success: false, message: err.message });
      } else {
        return res.status(200).send(result);
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "internal server error" });
  }
};

const approveLeave = (req, res) => {
  try {
    const lid = req.params.lid;
    const status = req.body.status;
    const updateQuery =
      "UPDATE employee_leave SET leave_status = ? WHERE id = ?";
    db.query(updateQuery, [status, lid], (err, result) => {
      if (err) {
        return res.status(400).json({ success: false, message: err.message });
      } else {
        return res
          .status(200)
          .json({ success: true, message: "leave approved successfully" });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "internal server error" });
  }
};

const getLabList = (req, res) => {
  try {
    const SelectQuery = "SELECT * FROM lab_details";
    db.query(SelectQuery, (err, results) => {
      if (err) {
        res.status(400).json({ success: false, message: err.message });
      }
      res.status(200).send(results);
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "internal server error" });
  }
};

const updateLabDetails = (req, res) => {
  try {
    const lid = req.params.bid;
    const { name, type, contact, email, address, status } = req.body;
    const selectQuery = "SELECT * FROM lab_details WHERE lab_id = ?";
    db.query(selectQuery, lid, (err, result) => {
      if (err) {
        return res.status(400).json({ success: false, message: err.message });
      }
      if (result && result.length > 0) {
        const updateFields = [];
        const updateValues = [];

        if (name) {
          updateFields.push("name = ?");
          updateValues.push(name);
        }

        if (type) {
          updateFields.push("type = ?");
          updateValues.push(type);
        }

        if (contact) {
          updateFields.push("contact = ?");
          updateValues.push(contact);
        }

        if (email) {
          updateFields.push("email = ?");
          updateValues.push(email);
        }

        if (address) {
          updateFields.push("address = ?");
          updateValues.push(address);
        }

        if (status) {
          updateFields.push("status = ?");
          updateValues.push(status);
        }

        const updateQuery = `UPDATE lab_details SET ${updateFields.join(
          ", "
        )} WHERE lab_id = ?`;
        console.log("221");
        db.query(updateQuery, [...updateValues, lid], (err, result) => {
          if (err) {
            return res.status(500).json({
              success: false,
              message: "Failed to update details",
            });
          } else {
            return res.status(200).json({
              success: true,
              message: "Lab Details updated successfully",
            });
          }
        });
      } else {
        return res.status(404).json({
          success: false,
          message: "Lab ID not found",
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

const labDelete = (req, res) => {
  try {
    const lid = req.params.lid;
    const deleteQuery = "DELETE FROM lab_details WHERE lab_id = ?";
    db.query(deleteQuery, lid, (err, result) => {
      if (err) {
        res.status(400).json({ success: false, message: err.message });
      }
      res
        .status(200)
        .json({ success: true, message: "lab deleted successfully" });
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const addLabTest = (req, res) => {
  try {
    const {
      test_name,
      test_code,
      waiting_days,
      default_lab,
      test_date,
      test_cost,
    } = req.body;
    const selectQuery = "SELECT * FROM lab_tests WHERE 	test_code = ?";
    db.query(selectQuery, test_code, (err, result) => {
      if (err) {
        return res.status(400).json({ success: false, message: err.message });
      }
      if (result && result.length <= 0) {
        const insertQuery =
          "INSERT INTO lab_tests (test_name, test_code,	waiting_days,	default_lab,	test_date,	test_cost) VALUES (?,?,?,?,?,?)";
        db.query(
          insertQuery,
          [
            test_name,
            test_code,
            waiting_days,
            default_lab,
            test_date,
            test_cost,
          ],
          (upErr, upResult) => {
            if (upErr) {
              res.status(400).json({ success: false, message: upErr.message });
            }
            res.status(200).json({ success: true, upResult: upResult });
          }
        );
      } else {
        res.status(400).json({ success: false, message: "lab already exist" });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

const getLabTest = (req, res) => {
  try {
    const selectQuery = "SELECT * FROM lab_tests";
    db.query(selectQuery, (err, results) => {
      if (err) {
        res.status(500).json({ success: false, message: err.message });
      }
      res.status(200).send(results);
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "internal server error" });
  }
};

const updateLabTestDetails = (req, res) => {
  try {
    const ltid = req.params.ltid;
    const {
      test_name,
      test_code,
      waiting_days,
      default_lab,
      test_date,
      test_cost,
    } = req.body;
    const selectQuery = "SELECT * FROM lab_tests WHERE lab_tid = ?";
    db.query(selectQuery, ltid, (err, result) => {
      if (err) {
        return res.status(400).json({ success: false, message: err.message });
      }
      if (result && result.length > 0) {
        const updateFields = [];
        const updateValues = [];

        if (test_name) {
          updateFields.push("test_name = ?");
          updateValues.push(test_name);
        }

        if (test_code) {
          updateFields.push("test_code = ?");
          updateValues.push(test_code);
        }

        if (waiting_days) {
          updateFields.push("waiting_days = ?");
          updateValues.push(waiting_days);
        }

        if (default_lab) {
          updateFields.push("default_lab = ?");
          updateValues.push(default_lab);
        }

        if (test_date) {
          updateFields.push("test_date = ?");
          updateValues.push(test_date);
        }

        if (test_cost) {
          updateFields.push("test_cost = ?");
          updateValues.push(test_cost);
        }

        const updateQuery = `UPDATE lab_tests SET ${updateFields.join(
          ", "
        )} WHERE lab_tid = ?`;
        console.log("221");
        db.query(updateQuery, [...updateValues, ltid], (err, result) => {
          if (err) {
            return res.status(500).json({
              success: false,
              message: "Failed to update details",
            });
          } else {
            return res.status(200).json({
              success: true,
              message: "Lab test details updated successfully",
            });
          }
        });
      } else {
        return res.status(404).json({
          success: false,
          message: "Lab  test ID not found",
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

const labTestDelete = (req, res) => {
  try {
    const ltid = req.params.ltid;
    const deleteQuery = "DELETE FROM lab_tests WHERE lab_tid = ?";
    db.query(deleteQuery, ltid, (err, result) => {
      if (err) {
        res.status(400).json({ success: false, message: err.message });
      }
      res
        .status(200)
        .json({ success: true, message: "lab deleted successfully" });
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getTreatSuggest,
  getTreatmentViaUhid,
  getExaminationViaUhid,
  getPrescriptionViaUhid,
  getPatientBillUHID,
  getLeaveList,
  approveLeave,
  getLabList,
  updateLabDetails,
  labDelete,
  addLabTest,
  getLabTest,
  updateLabTestDetails,
  labTestDelete,
};
