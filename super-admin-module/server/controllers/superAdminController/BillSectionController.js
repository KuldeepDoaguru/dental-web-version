const express = "express";
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const JWT = require("jsonwebtoken");
const { db } = require("../../dbConnect/connect");

dotenv.config();

const PORT = process.env.PORT;

const makeBills = (req, res) => {
  try {
    const {
      bill_date,
      uhid,
      branch_name,
      patient_name,
      patient_mobile,
      patient_email,
      treatment,
      treatment_status,
      drugs_quantity,
      total_amount,
      paid_amount,
      payment_status,
      payment_date_time,
    } = req.body;

    // Validations
    const requiredFields = [
      bill_date,
      uhid,
      branch_name,
      patient_name,
      patient_mobile,
      patient_email,
      treatment,
      treatment_status,
      drugs_quantity,
      total_amount,
    ];
    if (requiredFields.some((field) => !field)) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const insertQuery =
      "INSERT INTO patient_bills (bill_date, uhid, branch_name, patient_name, patient_mobile, patient_email, treatment, treatment_status, drugs_quantity, total_amount, paid_amount, payment_status, payment_date_time) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)";

    const insertParams = [
      bill_date,
      uhid,
      branch_name,
      patient_name,
      patient_mobile,
      patient_email,
      treatment,
      treatment_status,
      drugs_quantity,
      total_amount,
      paid_amount,
      payment_status,
      payment_date_time,
    ];

    db.query(insertQuery, insertParams, (err, result) => {
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

const getBillsByBranch = (req, res) => {
  try {
    const branch = req.params.branch;
    const selectQuery = "SELECT * FROM patient_bills WHERE branch_name = ?";
    db.query(selectQuery, branch, (err, result) => {
      if (err) {
        res.status(400).send({ success: false, error: err.message });
      }
      res.status(200).send(result);
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: "Internal Server Error" });
  }
};

const deleteBills = (req, res) => {
  try {
    const billId = req.params.id;
    const deleteQuery = "DELETE FROM patient_bills WHERE bill_id = ?";
    db.query(deleteQuery, billId, (err, result) => {
      if (err) {
        res.status(400).json({ success: false, message: err.message });
      }
      res.status(200).json({ success: true, message: "Successfully deleted" });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

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

const deletePurInvoice = (req, res) => {
  try {
    const branch = req.params.branch;
    const purchaseId = req.params.id;
    const deleteQuery =
      "DELETE FROM purchase_inventory WHERE branch_name = ? AND pur_id = ?";
    db.query(deleteQuery, [branch, purchaseId], (err, result) => {
      if (err) {
        res.status(400).json({ success: false, message: err.message });
      }
      res.status(200).send("Purchase Deleted Successfully");
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const editEmployeeDetails = (req, res) => {
  try {
    const branch = req.params.branch;
    const empId = req.params.empID;
    const {
      empName,
      empMobile,
      empGender,
      empEmail,
      empDesignation,
      empSalary,
      empAddress,
      status,
      morningShiftStartTime,
      morningShiftEndTime,
      eveningShiftStartTime,
      eveningShiftEndTime,
      allDayShiftStartTime,
      allDayShiftEndTime,
      working_days,
      password,
      empRole,
      availability,
    } = req.body;

    const empProfilePicture = req.file;
    console.log(empProfilePicture, "pro");

    const imageUrl = `http://localhost:${PORT}/empProfilePicture/${empProfilePicture?.filename}`;

    console.log("profilePicture: 770", imageUrl);

    console.log(req.body);
    console.log(password, "23");

    const getQuery = `SELECT * FROM employee_register WHERE branch_name = ? AND employee_ID = ?`;
    db.query(getQuery, [branch, empId], (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Internal server error",
        });
      }

      if (result && result.length > 0) {
        const updateFields = [];
        const updateValues = [];

        if (empName) {
          updateFields.push("employee_name = ?");
          updateValues.push(empName);
        }

        if (empMobile) {
          updateFields.push("employee_mobile = ?");
          updateValues.push(empMobile);
        }

        if (empEmail) {
          updateFields.push("employee_email = ?");
          updateValues.push(empEmail);
        }

        if (empDesignation) {
          updateFields.push("employee_designation = ?");
          updateValues.push(empDesignation);
        }

        if (empRole) {
          updateFields.push("employee_role = ?");
          updateValues.push(empRole);
        }

        if (empGender) {
          updateFields.push("gender = ?");
          updateValues.push(empGender);
        }
        if (empSalary) {
          updateFields.push("salary = ?");
          updateValues.push(empSalary);
        }
        if (empAddress) {
          updateFields.push("address = ?");
          updateValues.push(empAddress);
        }

        if (status) {
          updateFields.push("employee_status = ?");
          updateValues.push(status);
        }

        if (morningShiftStartTime) {
          updateFields.push("morning_shift_start_time = ?");
          updateValues.push(morningShiftStartTime);
        }

        if (morningShiftEndTime) {
          updateFields.push("morning_shift_end_time = ?");
          updateValues.push(morningShiftEndTime);
        }

        if (eveningShiftStartTime) {
          updateFields.push("evening_shift_start_time = ?");
          updateValues.push(eveningShiftStartTime);
        }

        if (eveningShiftEndTime) {
          updateFields.push("evening_shift_end_time = ?");
          updateValues.push(eveningShiftEndTime);
        }

        if (allDayShiftStartTime) {
          updateFields.push("allday_shift_start_time = ?");
          updateValues.push(allDayShiftStartTime);
        }

        if (allDayShiftEndTime) {
          updateFields.push("allday_shift_end_time = ?");
          updateValues.push(allDayShiftEndTime);
        }

        if (working_days) {
          updateFields.push("working_days = ?");
          updateValues.push(working_days);
        }

        if (password) {
          updateFields.push("employee_password = ?");
          updateValues.push(password);
        }

        if (availability) {
          updateFields.push("availability = ?");
          updateValues.push(availability);
        }

        if (empProfilePicture) {
          updateFields.push("employee_picture = ?");
          updateValues.push(imageUrl);
        }

        const updateQuery = `UPDATE employee_register SET ${updateFields.join(
          ", "
        )} WHERE branch_name = ? AND employee_ID = ?`;

        db.query(
          updateQuery,
          [...updateValues, branch, empId],
          (err, result) => {
            if (err) {
              return res.status(500).json({
                success: false,
                message: "Failed to update details",
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
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: "Internal Server Error" });
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

const getAppointmentByBranchAndId = (req, res) => {
  try {
    const pid = req.params.pid;
    const selectQuery = "SELECT * FROM apointments WHERE uhid = ?";
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

module.exports = {
  makeBills,
  getBillsByBranch,
  deleteBills,
  getPurchaseInvByPurId,
  updatePurInvoice,
  deletePurInvoice,
  editEmployeeDetails,
  getPatientDataByBranchAndId,
  getPatientBillByBranchAndId,
  getAppointmentByBranchAndId,
  examinDetailsByPatId,
  getPaymentDetailsByPatId,
};
