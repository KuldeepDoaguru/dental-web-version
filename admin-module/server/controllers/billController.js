const express = require("express");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const { db } = require("../dbConnect/connect");
const JWT = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

dotenv.config();

const PORT = process.env.PORT;

const getPurchaseInvByPurId = (req, res) => {
  try {
    const purchaseId = req.params.id;
    const branch = req.params.branch;
    const selectQuery =
      "SELECT * FROM purchase_inventory WHERE pur_id = ? AND branch_name = ?";
    db.query(selectQuery, [purchaseId, branch], (err, result) => {
      if (err) {
        res.status(400).json({ success: false, error: err.message });
      }
      res.status(200).send(result);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const purchaseInventory = (req, res) => {
  try {
    const {
      item_name,
      item_category,
      item_mrp,
      item_code,
      HSN_code,
      pur_quantity,
      discount,
      total_amount,
      branch_name,
      available_stock,
      low_stock_threshhold,
      distributor_name,
      distributor_number,
      purchase_date,
    } = req.body;

    const reciept_doc = req.file;
    console.log(reciept_doc, "pro");
    if (!reciept_doc) {
      return res.status(400).json({ error: "No file uploaded." });
    }

    const imageUrl = `http://localhost:${PORT}/reciept_doc/${reciept_doc.filename}`;

    console.log("Received request:769", req.body);
    console.log("profilePicture: 770", imageUrl);

    // Validations
    const requiredFields = [
      item_name,
      item_category,
      item_mrp,
      item_code,
      HSN_code,
      pur_quantity,
      total_amount,
      branch_name,
      distributor_name,
      distributor_number,
      purchase_date,
    ];
    if (requiredFields.some((field) => !field)) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const selectQuery =
      "SELECT * FROM purchase_inventory WHERE item_code = ? AND HSN_code = ?";

    db.query(selectQuery, [item_code, HSN_code], (err, result) => {
      if (err) {
        return res.status(400).json({ success: false, message: err.message });
      }
      if (result.length === 0) {
        const insertQuery =
          "INSERT INTO purchase_inventory (item_name, item_category, item_mrp, item_code, HSN_code, pur_quantity, discount, total_amount,  branch_name, available_stock, low_stock_threshhold, distributor_name, distributor_number, bill_receipt_doc,purchase_date	) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

        const insertParams = [
          item_name,
          item_category,
          item_mrp,
          item_code,
          HSN_code,
          pur_quantity,
          discount,
          total_amount,
          branch_name,
          available_stock,
          low_stock_threshhold,
          distributor_name,
          distributor_number,
          imageUrl,
          purchase_date,
        ];

        db.query(insertQuery, insertParams, (err, result) => {
          if (err) {
            return res
              .status(400)
              .send({ success: false, message: err.message });
          }
          return res.status(200).send({ success: true, result: result });
        });
      } else {
        return res
          .status(400)
          .send("item code and HSN Code already exist try adding stock");
      }
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: "Internal server error" });
  }
};

const updatePurInvoice = (req, res) => {
  try {
    const branch = req.params.branch;
    const purchaseId = req.params.id;
    const {
      item_name,
      item_category,
      item_mrp,
      item_code,
      HSN_code,
      pur_quantity,
      discount,
      total_amount,
      available_stock,
      low_stock_threshhold,
      distributor_name,
      distributor_number,
      purchase_date,
    } = req.body;

    const reciept_doc = req.file;
    console.log(reciept_doc, "pro");

    const imageUrl = `http://localhost:${PORT}/reciept_doc/${reciept_doc?.filename}`;

    console.log("profilePicture: 770", imageUrl);

    const selectQuery = `SELECT * FROM purchase_inventory WHERE branch_name = ? AND pur_id = ?`;
    db.query(selectQuery, [branch, purchaseId], (err, result) => {
      if (err) {
        res.status(400).json({ success: false, message: err.message });
      } else {
        if (result && result.length > 0) {
          const updateFields = [];
          const updateValues = [];

          if (item_name) {
            updateFields.push("item_name = ?");
            updateValues.push(item_name);
          }

          if (item_category) {
            updateFields.push("item_category = ?");
            updateValues.push(item_category);
          }

          if (item_mrp) {
            updateFields.push("item_mrp = ?");
            updateValues.push(item_mrp);
          }

          if (item_code) {
            updateFields.push("item_code = ?");
            updateValues.push(item_code);
          }
          if (HSN_code) {
            updateFields.push("HSN_code = ?");
            updateValues.push(HSN_code);
          }

          if (pur_quantity) {
            updateFields.push("pur_quantity = ?");
            updateValues.push(pur_quantity);
          }

          if (discount) {
            updateFields.push("discount = ?");
            updateValues.push(discount);
          }

          if (total_amount) {
            updateFields.push("total_amount = ?");
            updateValues.push(total_amount);
          }

          if (available_stock) {
            updateFields.push("available_stock = ?");
            updateValues.push(available_stock);
          }

          if (low_stock_threshhold) {
            updateFields.push("low_stock_threshhold = ?");
            updateValues.push(low_stock_threshhold);
          }

          if (distributor_name) {
            updateFields.push("distributor_name = ?");
            updateValues.push(distributor_name);
          }

          if (distributor_number) {
            updateFields.push("distributor_number = ?");
            updateValues.push(distributor_number);
          }

          if (purchase_date) {
            updateFields.push("purchase_date = ?");
            updateValues.push(purchase_date);
          }

          if (reciept_doc) {
            updateFields.push("bill_receipt_doc = ?");
            updateValues.push(imageUrl);
          }

          const updateQuery = `UPDATE purchase_inventory SET ${updateFields.join(
            ", "
          )} WHERE branch_name = ? AND pur_id = ?`;

          db.query(
            updateQuery,
            [...updateValues, branch, purchaseId],
            (err, result) => {
              if (err) {
                return res.status(500).json({
                  success: false,
                  message: "failed to update details",
                });
              } else {
                return res.status(200).json({
                  success: true,
                  message: "Details updated successfully",
                });
              }
            }
          );
        } else {
          return res
            .status(404)
            .json({ success: false, message: "Purchase ID not found" });
        }
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const getPatientDataByBranchAndId = (req, res) => {
  try {
    const pid = req.params.pid;
    const selectQuery = `SELECT * FROM patient_details WHERE uhid = ?`;
    db.query(selectQuery, pid, (err, result) => {
      if (err) {
        res.status(400).json({ success: false, message: err.message });
      }
      res.status(200).send(result);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const getPatientBillByBranchAndId = (req, res) => {
  try {
    const pid = req.params.pid;
    const selectQuery = "SELECT * FROM patient_bills WHERE uhid = ?";
    db.query(selectQuery, pid, (err, result) => {
      if (err) {
        res.status(400).json({ success: false, message: err.message });
      }
      res.status(200).send(result);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const getPrescriptionDetailsById = (req, res) => {
  try {
    const pid = req.params.pid;
    const selectQuery = "SELECT * FROM prescription_details WHERE uhid = ?";
    db.query(selectQuery, pid, (err, result) => {
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

const getAppointmentByBranchAndId = (req, res) => {
  try {
    const pid = req.params.pid;
    const selectQuery = "SELECT * FROM appointments WHERE uhid = ?";
    db.query(selectQuery, [pid], (err, result) => {
      if (err) {
        res.status(400).json({ success: false, message: err.message });
      }
      res.status(200).send(result);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const examinDetailsByPatId = (req, res) => {
  try {
    const pid = req.params.pid;
    const selectQuery = "SELECT * FROM examin_details WHERE uhid = ?";
    db.query(selectQuery, pid, (err, result) => {
      if (err) {
        res.status(400).json({ sucess: false, message: err.message });
      }
      res.status(200).send(result);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const getPaymentDetailsByPatId = (req, res) => {
  try {
    const pid = req.params.pid;
    const selectQuery = "SELECT * FROM payment_details WHERE uhid = ?";
    db.query(selectQuery, pid, (err, result) => {
      if (err) {
        res.status(500).json({ success: false, message: err.message });
      }
      res.status(200).send(result);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const getPatientTimeline = (req, res) => {
  try {
    const pid = req.params.pid;
    const selectQuery = "SELECT * FROM patient_timeline WHERE uhid = ?";
    db.query(selectQuery, pid, (err, result) => {
      if (err) {
        res.status(400).json({ success: false, message: err.message });
      }
      res.status(200).send(result);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: err.message });
  }
};

const getEmployeeDataByBranch = (req, res) => {
  try {
    const branch = req.params.branch;
    const getQuery = `SELECT * FROM employee_register WHERE branch_name = ?`;
    db.query(getQuery, [branch], (err, result) => {
      if (err) {
        res.status(400).send({ message: "error in fetching employee" });
      }
      res.json(result);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getEmployeeDataByBranchAndId = (req, res) => {
  try {
    const branch = req.params.branch;
    const empId = req.params.empId;
    const getQuery = `SELECT * FROM employee_register WHERE branch_name = ? AND employee_ID = ?`;
    db.query(getQuery, [branch, empId], (err, result) => {
      if (err) {
        res.status(400).send({ message: "error in fetching employee" });
      }
      res.json(result);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const downloadEarnReportByTime = (req, res) => {
  try {
    const branch = req.params.branch;
    const { fromDate, toDate } = req.body;
    const selectQuery =
      "SELECT * FROM patient_bills WHERE branch_name = ? AND payment_date_time >= ? AND payment_date_time <= ?";
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

const downloadExpenseReportByTime = (req, res) => {
  try {
    const branch = req.params.branch;
    const { fromDate, toDate } = req.body;
    const selectQuery =
      "SELECT * FROM purchase_inventory WHERE branch_name = ? AND purchase_date >= ? AND purchase_date <= ?";
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

const downloadAppointReportByTime = (req, res) => {
  try {
    const branch = req.params.branch;
    const { fromDate, toDate } = req.body;
    const selectQuery =
      "SELECT * FROM appointments WHERE branch_name = ? AND appointment_dateTime >= ? AND appointment_dateTime <= ?";
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

const downloadBillingReportByTime = (req, res) => {
  try {
    const branch = req.params.branch;
    const { fromDate, toDate } = req.body;
    const selectQuery =
      "SELECT * FROM patient_bills WHERE branch_name = ? AND bill_date >= ? AND bill_date <= ?";
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

const downloadStaffReport = (req, res) => {
  try {
    const branch = req.params.branch;
    const selectQuery = "SELECT * FROM employee_register WHERE branch_name = ?";
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

const addBlockDays = (req, res) => {
  try {
    const {
      branch_name,
      holiday_name,
      holiday_date,
      holiday_start_time,
      holiday_end_time,
      notes,
    } = req.body;
    const selectQuery = "SELECT * FROM holidays WHERE holiday_date = ?";
    db.query(selectQuery, holiday_date, (err, result) => {
      if (err) {
        return res.status(400).json({ success: false, message: err.message });
      }
      if (result && result.length > 0) {
        return res.status(400).send("Holiday already exists");
      } else {
        const insertQuery =
          "INSERT INTO holidays (branch_name, holiday_name, holiday_date, holiday_start_time, holiday_end_time, notes) VALUES (?,?,?,?,?,?)";
        db.query(
          insertQuery,
          [
            branch_name,
            holiday_name,
            holiday_date,
            holiday_start_time,
            holiday_end_time,
            notes,
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

const updateHolidays = (req, res) => {
  try {
    const hid = req.params.hid;
    const {
      holiday_name,
      holiday_date,
      holiday_start_time,
      holiday_end_time,
      notes,
    } = req.body;
    const selectQuery = "SELECT * FROM holidays WHERE holiday_id = ?";
    db.query(selectQuery, hid, (err, result) => {
      if (err) {
        res.status(500).json({ success: false, message: err.message });
      }
      if (result && result.length > 0) {
        const updateFields = [];
        const updateValues = [];

        if (holiday_name) {
          updateFields.push("holiday_name = ?");
          updateValues.push(holiday_name);
        }

        if (holiday_date) {
          updateFields.push("holiday_date = ?");
          updateValues.push(holiday_date);
        }

        if (holiday_start_time) {
          updateFields.push("holiday_start_time = ?");
          updateValues.push(holiday_start_time);
        }

        if (holiday_end_time) {
          updateFields.push("holiday_end_time = ?");
          updateValues.push(holiday_end_time);
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

const updateDrugDetails = (req, res) => {
  try {
    const did = req.params.did;
    const { HSN_code, item_code, drug_name, drug_strength, instruction } =
      req.body;
    const selectQuery = "SELECT * FROM drugs WHERE drug_id = ?";
    db.query(selectQuery, did, (err, result) => {
      if (err) {
        res.status(500).json({ success: false, message: err.message });
      }
      if (result && result.length > 0) {
        const updateFields = [];
        const updateValues = [];

        if (HSN_code) {
          updateFields.push("HSN_code = ?");
          updateValues.push(HSN_code);
        }

        if (item_code) {
          updateFields.push("item_code = ?");
          updateValues.push(item_code);
        }

        if (drug_name) {
          updateFields.push("drug_name = ?");
          updateValues.push(drug_name);
        }

        if (drug_strength) {
          updateFields.push("drug_strength = ?");
          updateValues.push(drug_strength);
        }

        if (instruction) {
          updateFields.push("instruction = ?");
          updateValues.push(instruction);
        }

        const updateQuery = `UPDATE drugs SET ${updateFields.join(
          ", "
        )} WHERE drug_id = ?`;

        db.query(updateQuery, [...updateValues, did], (err, result) => {
          if (err) {
            return res.status(500).json({
              success: false,
              message: "Failed to update details",
            });
          } else {
            return res.status(200).json({
              success: true,
              message: "Drug Details updated successfully",
            });
          }
        });
      } else {
        return res.status(404).json({
          success: false,
          message: "Drug ID not found",
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteDrug = (req, res) => {
  try {
    const did = req.params.did;
    const deleteQuery = "DELETE FROM drugs WHERE drug_id = ?";
    db.query(deleteQuery, did, (err, result) => {
      if (err) {
        return res.status(400).json({ success: false, message: err.message });
      }
      return res
        .status(200)
        .json({ success: true, message: "drug deleted successfully" });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getPurchaseInvByPurId,
  purchaseInventory,
  updatePurInvoice,
  getPatientDataByBranchAndId,
  getPatientBillByBranchAndId,
  getPrescriptionDetailsById,
  getAppointmentByBranchAndId,
  examinDetailsByPatId,
  getPaymentDetailsByPatId,
  getPatientTimeline,
  getEmployeeDataByBranch,
  getEmployeeDataByBranchAndId,
  downloadEarnReportByTime,
  downloadExpenseReportByTime,
  downloadAppointReportByTime,
  downloadBillingReportByTime,
  getAttendanceDetails,
  downloadAttendanceReportByTime,
  downloadStaffReport,
  getBranchDetailsByBranch,
  updateBranchCalenderSetting,
  getHolidays,
  addBlockDays,
  updateHolidays,
  deleteHolidays,
  getDrugs,
  addDrugs,
  updateDrugDetails,
  deleteDrug,
};
