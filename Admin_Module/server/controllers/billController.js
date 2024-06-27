const express = require("express");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const { db } = require("../connect");
const JWT = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const logger = require("./logger");

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
          logger.registrationLogger.log("error", "invalid purchase ID");
        res.status(400).json({ success: false, error: err.message });
      }
      logger.registrationLogger.log("error", "purchase invoice fetched successfully");
      res.status(200).send(result);
    });
  } catch (error) {
      logger.registrationLogger.log("error", "internal server error");
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
        logger.registrationLogger.log("error", "no file uploaded");
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
        logger.registrationLogger.log("error", "All fields are required");
      return res.status(400).json({ error: "All fields are required" });
    }

    const selectQuery =
      "SELECT * FROM purchase_inventory WHERE item_code = ? AND HSN_code = ?";

    db.query(selectQuery, [item_code, HSN_code], (err, result) => {
      if (err) {
          logger.registrationLogger.log("error", "invalid item code or hsn code");
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
              logger.registrationLogger.log("error", "failed to insert purchase inventory");
            return res
              .status(400)
              .send({ success: false, message: err.message });
          }
          logger.registrationLogger.log("info", "purchase inventory inserted successfully");
          return res.status(200).send({ success: true, result: result });
        });
      } else {
          logger.registrationLogger.log("error", "Item code and hsn code already exist try adding stock");
        return res
          .status(400)
          .send("item code and HSN Code already exist try adding stock");
      }
    });
  } catch (error) {
      logger.registrationLogger.log("error", "Internal server error");
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
          logger.registrationLogger.log("error", "invalid branch and purchase ID");
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
                  logger.registrationLogger.log("error", "failed to update details");
                return res.status(500).json({
                  success: false,
                  message: "failed to update details",
                });
              } else {
                  logger.registrationLogger.log("info", "Details updated successfully");
                return res.status(200).json({
                  success: true,
                  message: "Details updated successfully",
                });
              }
            }
          );
        } else {
            logger.registrationLogger.log("error", "purchase id not found");
          return res
            .status(404)
            .json({ success: false, message: "Purchase ID not found" });
        }
      }
    });
  } catch (error) {
      logger.registrationLogger.log("error", "internal server error");
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
          logger.registrationLogger.log("error", "invalid purchase ID");
        res.status(400).json({ success: false, message: err.message });
      }
      logger.registrationLogger.log("info", "patient data fetched successfully");
      res.status(200).send(result);
    });
  } catch (error) {
      logger.registrationLogger.log("error", "internal server error");
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const getPatientBillByBranchAndId = (req, res) => {
  const branch = req.params.branch;
  const uhid = req.params.uhid;
  try {
    const sql =
      "SELECT * FROM treat_suggest WHERE branch_name = ? AND p_uhid = ? ORDER BY tp_id DESC";

    db.query(sql, [branch, uhid], (err, results) => {
      if (err) {
          logger.registrationLogger.log("error", "error fetching treatment");
        console.error("Error fetching Treatment from MySql:", err);
        res.status(500).json({ error: "Error fetching Treatment" });
      } else {
          logger.registrationLogger.log("info", "treatment fetched successfully");
        res.status(200).send(results);
      }
    });
  } catch (error) {
      logger.registrationLogger.log("error", "intrenal server error");
    console.error("Error fetching Treatment from MySql:", error);
    res.status(500).json({
      success: false,
      message: "Error in fetched Treatment",
      error: error.message,
    });
  }
};

const getPrescriptionDetailsById = (req, res) => {
  try {
    const pid = req.params.pid;
    const selectQuery = "SELECT * FROM prescription_details WHERE uhid = ?";
    db.query(selectQuery, pid, (err, result) => {
      if (err) {
          logger.registrationLogger.log("error", "invalid purchase ID");
        res.status(400).json({ success: false, message: err.message });
      }
      logger.registrationLogger.log("info", "prescription data fetched successfully");
      res.status(200).send(result);
    });
  } catch (error) {
      logger.registrationLogger.log("error", "internal server error");
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const getAppointmentByBranchAndId = (req, res) => {
  try {
    const branch = req.params.branch;
    const pid = req.params.pid;
    const selectQuery =
      "SELECT * FROM appointments WHERE branch_name = ? AND patient_uhid = ?";
    db.query(selectQuery, [branch, pid], (err, result) => {
      if (err) {
          logger.registrationLogger.log("error", "invalid purchase ID");
        res.status(400).json({ success: false, message: err.message });
      }
      logger.registrationLogger.log("info", "Appointment data fetched successfully");
      res.status(200).send(result);
    });
  } catch (error) {
      logger.registrationLogger.log("error", "internal server error");
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
          logger.registrationLogger.log("error", "invalid purchase ID");
        res.status(400).json({ sucess: false, message: err.message });
      }
      logger.registrationLogger.log("info", "examination data fetched successfully");
      res.status(200).send(result);
    });
  } catch (error) {
      logger.registrationLogger.log("error", "Internal server error");
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const getPaymentDetailsByPatId = (req, res) => {
  try {
    const pid = req.params.pid;
    const selectQuery = "SELECT * FROM patient_timeline WHERE uhid = ? ORDER BY event_id DESC";
    db.query(selectQuery, pid, (err, result) => {
      if (err) {
          logger.registrationLogger.log("error", "invalid uhid");
        res.status(500).json({ success: false, message: err.message });
      }
      logger.registrationLogger.log("info", "payment details fetched successfully");
      res.status(200).send(result);
    });
  } catch (error) {
      logger.registrationLogger.log("error", "internal server error");
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
          logger.registrationLogger.log("error", "invalid uhid");
        res.status(400).json({ success: false, message: err.message });
      }
      logger.registrationLogger.log("info", "patient timeline fetched successfully");
      res.status(200).send(result);
    });
  } catch (error) {
      logger.registrationLogger.log("error", "internal server error");
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
          logger.registrationLogger.log("error", "invalid branch");
        res.status(400).send({ message: "error in fetching employee" });
      }
      logger.registrationLogger.log("info", "employee data fetched successfully");
      res.json(result);
    });
  } catch (error) {
      logger.registrationLogger.log("error", "internal server error");
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
          logger.registrationLogger.log("error", "invalid branch or employee ID");
        res.status(400).send({ message: "error in fetching employee" });
      }
      logger.registrationLogger.log("info", "employee data fetched successfully");
      res.json(result);
    });
  } catch (error) {
      logger.registrationLogger.log("error", "Internal server error");
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

    // Parse dates to ensure they are in the correct format
    const start = new Date(fromDate);
    const end = new Date(toDate);

    // Set the time of the end date to the end of the day to include the entire toDate
    end.setHours(23, 59, 59, 999);

    const selectQuery =
      "SELECT * FROM patient_bills WHERE branch_name = ? AND payment_date_time >= ? AND payment_date_time <= ?";
    db.query(
      selectQuery,
      [branch, start.toISOString(), end.toISOString()],
      (err, result) => {
        if (err) {
            logger.registrationLogger.log("error", "failed to fetch patient bills");
          res.status(400).json({ success: false, message: err.message });
        }
        logger.registrationLogger.log("info", "patient bills fetched successfully");
        res.status(200).send(result);
      }
    );
  } catch (error) {
      logger.registrationLogger.log("error", "internal server error");
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


const downloadExpenseReportByTime = (req, res) => {
  try {
    const branch = req.params.branch;
    const { fromDate, toDate } = req.body;

    // Parse dates to ensure they are in the correct format
    const start = new Date(fromDate);
    const end = new Date(toDate);

    // Set the time of the end date to the end of the day to include the entire toDate
    end.setHours(23, 59, 59, 999);

    const selectQuery =
      "SELECT * FROM purchase_inventory WHERE branch_name = ? AND purchase_date >= ? AND purchase_date <= ?";
    db.query(
      selectQuery,
      [branch, start.toISOString(), end.toISOString()],
      (err, result) => {
        if (err) {
            logger.registrationLogger.log("error", "invalid branch");
          res.status(400).json({ success: false, message: err.message });
        }
        logger.registrationLogger.log("info", "purchase inventory fetched successfully");
        res.status(200).send(result);
      }
    );
  } catch (error) {
      logger.registrationLogger.log("error", "internal server error");
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};




const downloadAppointReportByTime = (req, res) => {
  try {
    const branch = req.params.branch;
    const { fromDate, toDate } = req.body;

    // Parse dates to ensure they are in the correct format
    const start = new Date(fromDate);
    const end = new Date(toDate);

    // Set the time of the end date to the end of the day to include the entire toDate
    end.setHours(23, 59, 59, 999);

    const selectQuery =
      "SELECT * FROM appointments WHERE branch_name = ? AND appointment_dateTime >= ? AND appointment_dateTime <= ?";
    db.query(
      selectQuery,
      [branch, start.toISOString(), end.toISOString()],
      (err, result) => {
        if (err) {
            
            logger.registrationLogger.log("error", "invalid branch");
          return res.status(400).json({ success: false, message: err.message });
        }
        logger.registrationLogger.log("info", "appointment details fetched successfully");
        res.status(200).send(result);
      }
    );
  } catch (error) {
      logger.registrationLogger.log("error", "internal server error");
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const downloadBillingReportByTime = (req, res) => {
  try {
    const branch = req.params.branch;
    const { fromDate, toDate } = req.body;

    // Parse dates to ensure they are in the correct format
    const start = new Date(fromDate);
    const end = new Date(toDate);

    // Set the time of the end date to the end of the day to include the entire toDate
    end.setHours(23, 59, 59, 999);

    const selectQuery =
      "SELECT * FROM patient_bills WHERE branch_name = ? AND bill_date >= ? AND bill_date <= ?";
    db.query(
      selectQuery,
      [branch, start.toISOString(), end.toISOString()],
      (err, result) => {
        if (err) {
            logger.registrationLogger.log("error", "failed to fetch patient bills");
          res.status(400).json({ success: false, message: err.message });
        }
        logger.registrationLogger.log("info", "patient bills fetched successfully");
        res.status(200).send(result);
      }
    );
  } catch (error) {
      logger.registrationLogger.log("error", "internal server error");
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
          logger.registrationLogger.log("error", "failed to fetch employee attendance");
        res.status(400).json({ success: false, message: err.message });
      }
      logger.registrationLogger.log("info", "employee attendance fetched successfully");
      res.status(200).send(results);
    });
  } catch (error) {
      logger.registrationLogger.log("error", "internal server error");
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
          logger.registrationLogger.log("error", "invalid branch or fromDate or to date");
        res.status(400).json({ success: false, message: err.message });
      }
      logger.registrationLogger.log("info", "downloaded attendance report");
      res.status(200).send(result);
    });
  } catch (error) {
      logger.registrationLogger.log("error", "internal server error");
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
          logger.registrationLogger.log("error", "failed to download staff report");
        res.status(400).json({ success: false, message: err.message });
      }
      logger.registrationLogger.log("info", "staff report downloaded successfully");
      res.status(200).send(result);
    });
  } catch (error) {
      logger.registrationLogger.log("error", "internal server error");
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
          logger.registrationLogger.log("error", "invalid branch");
        res.status(400).json({ success: false, message: err.message });
      }
      logger.registrationLogger.log("info", "branch details fetched successfully");
      res.status(200).send(result);
    });
  } catch (error) {
      logger.registrationLogger.log("error", "internal server error");
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const updateBranchCalenderSetting = (req, res) => {
  try {
    const branch = req.params.branch;
    const { open_time, close_time, appoint_slot_duration, week_off } = req.body;
    const selectQuery = "SELECT * FROM branches WHERE branch_name = ?";
    db.query(selectQuery, branch, (err, result) => {
        
      if (err) {
          logger.registrationLogger.log("error", "invalid branch");
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
        
        if (week_off) {
          updateFields.push("week_off = ?");
          updateValues.push(week_off);
        }

        const updateQuery = `UPDATE branches SET ${updateFields.join(
          ", "
        )} WHERE branch_name = ?`;

        db.query(updateQuery, [...updateValues, branch], (err, result) => {
          if (err) {
              logger.registrationLogger.log("error", "failed to update details");
            return res.status(500).json({
              success: false,
              message: "Failed to update details",
            });
          } else {
              logger.registrationLogger.log("info", "Branch details updated successfully");
            return res.status(200).json({
              success: true,
              message: "Branch Details updated successfully",
            });
          }
        });
      } else {
          logger.registrationLogger.log("error", "branch not found");
        return res.status(404).json({
          success: false,
          message: "Branch not found",
        });
      }
    });
  } catch (error) {
      logger.registrationLogger.log("error", "internal server error");
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
          logger.registrationLogger.log("error", "invalid branch");
        res.status(400).json({ success: false, message: err.message });
      }
      logger.registrationLogger.log("info", "holidays fetched successfully");
      res.status(200).send(result);
    });
  } catch (error) {
      logger.registrationLogger.log("error", "internal server error");
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
          logger.registrationLogger.log("error", "failed to add holidays");
        return res.status(400).json({ success: false, message: err.message });
      }
      if (result && result.length > 0) {
          logger.registrationLogger.log("error", "holiday already exists");
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
                logger.registrationLogger.log("error", "failed to add holidays");
              return res
                .status(400)
                .json({ success: false, message: err.message });
            }
            logger.registrationLogger.log("info", "holidays added successfully");
            return res.status(200).send(result);
          }
        );
      }
    });
  } catch (error) {
      logger.registrationLogger.log("error", "internal server error");
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
          logger.registrationLogger.log("error", "invalid holiday ID");
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
              logger.registrationLogger.log("error", "failed to update details");
            return res.status(500).json({
              success: false,
              message: "Failed to update details",
            });
          } else {
              logger.registrationLogger.log("info", "holiday details updated successfully");
            return res.status(200).json({
              success: true,
              message: "Holiday Details updated successfully",
            });
          }
        });
      } else {
          logger.registrationLogger.log("error", "holiday ID not found");
        return res.status(404).json({
          success: false,
          message: "holiday ID not found",
        });
      }
    });
  } catch (error) {
      logger.registrationLogger.log("error", "internal server error");
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
          logger.registrationLogger.log("error", "invalid holiday ID");
        return res.status(400).json({ success: false, message: err.message });
      }
      logger.registrationLogger.log("info", "holiday deleted successfully");
      return res
        .status(200)
        .json({ success: true, message: "Holiday deleted successfully" });
    });
  } catch (error) {
      logger.registrationLogger.log("error", "internal server error");
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
          logger.registrationLogger.log("error", "failed to fetch drugs");
        res.status(400).json({ success: false, message: err.message });
      }
      logger.registrationLogger.log("info", "drugs fetched successfully");
      res.status(200).send(result);
    });
  } catch (error) {
      logger.registrationLogger.log("error", "internal server error");
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
          logger.registrationLogger.log("error", "failed to add drugs");
        return res.status(400).json({ success: false, message: err.message });
      }
      if (result && result.length > 0) {
          logger.registrationLogger.log("error", "drugs already exists");
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
                logger.registrationLogger.log("error", "failed to insert drugs");
              return res
                .status(400)
                .json({ success: false, message: err.message });
            }
            logger.registrationLogger.log("info", "drugs added successfully");
            return res.status(200).send(result);
          }
        );
      }
    });
  } catch (error) {
      logger.registrationLogger.log("error", "Internal server error");
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
          logger.registrationLogger.log("error", "invalid drugs ID");
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
              logger.registrationLogger.log("error", "Failed to update drugs details");
            return res.status(500).json({
              success: false,
              message: "Failed to update details",
            });
          } else {
              logger.registrationLogger.log("info", "drug details updated successfully");
            return res.status(200).json({
              success: true,
              message: "Drug Details updated successfully",
            });
          }
        });
      } else {
          logger.registrationLogger.log("error", "drug ID not found");
        return res.status(404).json({
          success: false,
          message: "Drug ID not found",
        });
      }
    });
  } catch (error) {
      logger.registrationLogger.log("error", "internal server error");
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
          logger.registrationLogger.log("error", "invalid drug ID");
        return res.status(400).json({ success: false, message: err.message });
      }
      logger.registrationLogger.log("info", "drug deleted successfully");
      return res
        .status(200)
        .json({ success: true, message: "drug deleted successfully" });
    });
  } catch (error) {
      logger.registrationLogger.log("error", "internal server error");
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};


const downloadOPDReportByTime = (req, res) => {
  try {
    const branch = req.params.branch;
    const { fromDate, toDate } = req.body;

    const toDateAdjusted = new Date(toDate);
    toDateAdjusted.setDate(toDateAdjusted.getDate() + 1);
    const selectQuery =
      "SELECT * FROM appointments WHERE branch_name = ? AND treatment_provided = 'OPD' AND appointment_dateTime >= ? AND appointment_dateTime <= ?";
    db.query(selectQuery, [branch, fromDate, toDateAdjusted], (err, result) => {
      if (err) {
        logger.registrationLogger.log("error", "internal server error");
        res.status(400).json({ success: false, message: err.message });
      }
      logger.registrationLogger.log("info", "Billing report downloaded");
      res.status(200).send(result);
    });
  } catch (error) {
    console.log(error);
    logger.registrationLogger.log("error", "internal server error");
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const downloadLabReportByTime = (req, res) => {
  try {
    const branch = req.params.branch;
    const { fromDate, toDate } = req.body;

    const toDateAdjusted = new Date(toDate);
    toDateAdjusted.setDate(toDateAdjusted.getDate() + 1);
    const selectQuery =
      "SELECT * FROM patient_lab_test_details JOIN patient_lab_details ON patient_lab_details.testid = patient_lab_test_details.testid WHERE branch_name = ? AND patient_lab_test_details.payment_status = 'done' AND patient_lab_test_details.collection_date >= ? AND patient_lab_test_details.collection_date <= ?";
    db.query(selectQuery, [branch, fromDate, toDateAdjusted], (err, result) => {
      if (err) {
        logger.registrationLogger.log("error", "internal server error");
        res.status(400).json({ success: false, message: err.message });
      }
       logger.registrationLogger.log("info", "Lab report downloaded");
      res.status(200).send(result);
    });
  } catch (error) {
    console.log(error);
    logger.registrationLogger.log("error", "internal server error");
    res.status(500).json({ success: false, message: "Internal server error" });
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
  downloadOPDReportByTime,
  downloadLabReportByTime,
};
