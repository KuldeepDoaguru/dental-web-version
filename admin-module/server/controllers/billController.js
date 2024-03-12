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

module.exports = {
  getPurchaseInvByPurId,
  purchaseInventory,
  updatePurInvoice,
  getPatientDataByBranchAndId,
  getPatientBillByBranchAndId,
  getPrescriptionDetailsById,
  getAppointmentByBranchAndId,
  examinDetailsByPatId,
};
