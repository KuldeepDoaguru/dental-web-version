const express = "express";
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const JWT = require("jsonwebtoken");
const { db } = require("../dbConnect/connect");
const fs = require("fs");
const path = require("path");

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
      assigned_doctor,
      treatment,
      treatment_status,
      drugs_quantity,
      total_amount,
      net_amount,
      tax_percent,
      tax_amount,
      discount,
      paid_amount,
      pending_amount,
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
      "INSERT INTO patient_bills (bill_date, uhid, branch_name, patient_name, patient_mobile, patient_email,assigned_doctor, treatment,        treatment_status, drugs_quantity, total_amount, net_amount, tax_percent, tax_amount, discount, paid_amount, pending_amount,        payment_status, payment_date_time) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?, ?)";

    const insertParams = [
      bill_date,
      uhid,
      branch_name,
      patient_name,
      patient_mobile,
      patient_email,
      assigned_doctor,
      treatment,
      treatment_status,
      drugs_quantity,
      total_amount,
      net_amount,
      tax_percent,
      tax_amount,
      discount,
      paid_amount,
      pending_amount,
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

const getAppointmentByBranchAndId = (req, res) => {
  try {
    const pid = req.params.pid;
    const selectQuery = "SELECT * FROM appointments WHERE uhid = ? ";
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

const insertTimelineEvent = (req, res) => {
  try {
    const { type, description, branch, patientId } = req.body;
    const insertQuery =
      "INSERT INTO patient_timeline (event_type,	event_description,	branch_name,	uhid	) VALUES (?,?,?,?)";
    db.query(
      insertQuery,
      [type, description, branch, patientId],
      (err, result) => {
        if (err) {
          res.status(400).json({ success: false, message: err.message });
        }
        res.status(200).json({ success: true, result: result });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: err.message });
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

const addLab = (req, res) => {
  try {
    const { name, type, contact, email, address, status } = req.body;
    const selectQuery = "SELECT * FROM lab_details WHERE lab_email = ?";
    db.query(selectQuery, email, (err, result) => {
      if (err) {
        return res.status(400).json({ success: false, message: err.message });
      }
      if (result && result.length <= 0) {
        const insertQuery =
          "INSERT INTO lab_details (lab_name,	lab_type,	lab_contact,	lab_email,	address,	status) VALUES (?,?,?,?,?,?)";
        db.query(
          insertQuery,
          [name, type, contact, email, address, status],
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

const updateBranchDetails = (req, res) => {
  try {
    const bid = req.params.bid;
    const {
      name,
      address,
      contact,
      open_time,
      close_time,
      appoint_slot_duration,
    } = req.body;

    const head_img = req.files["head_img"]
      ? `https://dentalgurusuperadmin.doaguru.com/branchHeadFootImg/${req.files["head_img"][0].filename}`
      : null;
    const foot_img = req.files["foot_img"]
      ? `https://dentalgurusuperadmin.doaguru.com/branchHeadFootImg/${req.files["foot_img"][0].filename}`
      : null;
    const selectQuery = "SELECT * FROM branches WHERE branch_id = ?";
    db.query(selectQuery, bid, (err, result) => {
      if (err) {
        return res.status(400).json({ success: false, message: err.message });
      }
      if (result && result.length > 0) {
        const updateFields = [];
        const updateValues = [];

        if (name) {
          updateFields.push("branch_name = ?");
          updateValues.push(name);
        }

        if (address) {
          updateFields.push("branch_address = ?");
          updateValues.push(address);
        }

        if (contact) {
          updateFields.push("branch_contact = ?");
          updateValues.push(contact);
        }

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

        if (head_img) {
          updateFields.push("head_img = ?");
          updateValues.push(head_img);
        }

        if (foot_img) {
          updateFields.push("foot_img = ?");
          updateValues.push(foot_img);
        }

        const updateQuery = `UPDATE branches SET ${updateFields.join(
          ", "
        )} WHERE branch_id = ?`;

        db.query(updateQuery, [...updateValues, bid], (err, result) => {
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

const updateBillDetailsByBillId = (req, res) => {
  try {
    const bid = req.params.bid;
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
    const selectQuery = "SELECT * FROM patient_bills WHERE bill_id = ?";
    db.query(selectQuery, bid, (err, result) => {
      if (err) {
        return res.status(400).json({ success: false, message: err.message });
      }
      if (result && result.length > 0) {
        const updateFields = [];
        const updateValues = [];

        if (bill_date) {
          updateFields.push("bill_date = ?");
          updateValues.push(bill_date);
        }

        if (uhid) {
          updateFields.push("uhid = ?");
          updateValues.push(uhid);
        }

        if (branch_name) {
          updateFields.push("branch_name = ?");
          updateValues.push(branch_name);
        }

        if (patient_name) {
          updateFields.push("patient_name = ?");
          updateValues.push(patient_name);
        }

        if (patient_mobile) {
          updateFields.push("patient_mobile = ?");
          updateValues.push(patient_mobile);
        }

        if (patient_email) {
          updateFields.push("patient_email = ?");
          updateValues.push(patient_email);
        }

        if (treatment) {
          updateFields.push("treatment = ?");
          updateValues.push(treatment);
        }

        if (treatment_status) {
          updateFields.push("treatment_status = ?");
          updateValues.push(treatment_status);
        }

        if (drugs_quantity) {
          updateFields.push("drugs_quantity = ?");
          updateValues.push(drugs_quantity);
        }

        if (total_amount) {
          updateFields.push("total_amount = ?");
          updateValues.push(total_amount);
        }

        if (paid_amount) {
          updateFields.push("paid_amount = ?");
          updateValues.push(paid_amount);
        }

        if (payment_status) {
          updateFields.push("payment_status = ?");
          updateValues.push(payment_status);
        }

        if (payment_date_time) {
          updateFields.push("payment_date_time = ?");
          updateValues.push(payment_date_time);
        }

        const updateQuery = `UPDATE patient_bills SET ${updateFields.join(
          ", "
        )} WHERE bill_id = ?`;

        db.query(updateQuery, [...updateValues, bid], (err, result) => {
          if (err) {
            return res.status(500).json({
              success: false,
              message: "Failed to update details",
            });
          } else {
            return res.status(200).json({
              success: true,
              message: "Bill Details updated successfully",
            });
          }
        });
      } else {
        return res.status(404).json({
          success: false,
          message: "Bill not found",
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

const getBillBYBillId = (req, res) => {
  try {
    const bid = req.params.bid;
    const selectQuery = "SELECT * FROM patient_bills WHERE bill_id = ?";
    db.query(selectQuery, bid, (err, result) => {
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

const downloadBillRecById = (req, res) => {
  try {
    const file = req.params.file;

    const filePath = path.join(__dirname, "../reciept_doc", file);
    console.log("File Path:", filePath); // Add this line for debugging

    if (fs.existsSync(filePath)) {
      res.setHeader("Content-disposition", "attachment; filename=" + file);
      res.setHeader("Content-type", "application/octet-stream");

      const fileStream = fs.createReadStream(filePath);
      fileStream.on("error", (error) => {
        console.error("Error reading file:", error);
        res.status(500).send("Internal server error");
      });
      fileStream.pipe(res);
    } else {
      console.log("File not found:", file); // Add this line for debugging
      res.status(404).send("File not found");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
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
  getPrescriptionDetailsById,
  insertTimelineEvent,
  getPatientTimeline,
  addLab,
  updateBranchDetails,
  updateBillDetailsByBillId,
  getBillBYBillId,
  downloadBillRecById,
  downloadEarnReportByTime,
  downloadExpenseReportByTime,
  downloadAppointReportByTime,
  downloadBillingReportByTime,
  downloadStaffReport,
};
