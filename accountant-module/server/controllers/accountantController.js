const express = require("express");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const { db } = require("../connect");
const JWT = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

dotenv.config();

const PORT = process.env.PORT;

const accountantLoginUser = async (req, res) => {
  try {
    const { email, password, branch_name } = req.body;
    if (!branch_name) {
      return res.status(404).json({
        success: false,
        message: "Please select branch",
      });
    }
    if (!email || !password) {
      return res.status(404).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    db.query(
      `SELECT * FROM employee_register WHERE employee_email = ?`,
      [email],
      (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: false,
            message: "Internal server error",
          });
        }
        if (result.length === 0) {
          return res.status(500).json({
            success: false,
            message:
              "Email is not registered Please contact team for furthur assistance",
          });
        }

        const user = result[0];

        const match = bcrypt.compareSync(password, user.employee_password);
        if (!match) {
          return res.status(401).json({
            success: "false",
            message: "Invalid password",
          });
        }

        if (!user.employee_role.includes("accountant")) {
          return res.status(401).json({
            success: "false",
            message: "Please login with accountant email",
          });
        }
        if (user.branch_name !== branch_name) {
          return res.status(401).json({
            success: "false",
            message: "Please login with your branch",
          });
        }

        if (user.employee_status !== "Approved") {
          return res.status(401).json({
            success: "false",
            message:
              "Your Email is not approved, Please contact team for furthur assistance",
          });
        }

        const token = JWT.sign({ id: user.id }, process.env.JWT_SECRET, {
          expiresIn: "7d",
        });

        res.status(200).json({
          success: "true",
          message: "Login successful",

          user: {
            employee_ID: user.employee_ID,
            email: user.employee_email,
            token: token,
          },
        });
      }
    );
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: "false", message: "Login failed", error: error });
  }
};

const sendOtp = (req, res) => {
  const { email } = req.body;

  // random otp
  function generateOTP(length) {
    const chars = "0123456789";
    let otp = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      otp += chars[randomIndex];
    }

    return otp;
  }

  const OTP = generateOTP(6);

  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAILSENDER,
        pass: process.env.EMAILPASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAILSENDER,
      to: email,
      subject: "Password Reset OTP",
      text: `Your OTP for password reset is: ${OTP}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        return res
          .status(500)
          .json("An error occurred while sending the email.");
      } else {
        console.log("OTP sent:", info.response);

        const selectQuery = "SELECT * FROM otpcollections WHERE email = ?";
        db.query(selectQuery, email, (err, result) => {
          if (err) {
            res.status(400).json({ success: false, message: err.message });
          }
          if (result && result.length > 0) {
            const updateQuery =
              "UPDATE otpcollections SET code = ? WHERE email = ?";
            db.query(updateQuery, [OTP, email], (upErr, upResult) => {
              if (upErr) {
                res
                  .status(400)
                  .json({ success: false, message: upErr.message });
              }
              res.status(200).send(upResult);
            });
          } else {
            // Assuming you have a 'db' object for database operations
            db.query(
              "INSERT INTO otpcollections (email, code) VALUES (?, ?) ON DUPLICATE KEY UPDATE code = VALUES(code)",
              [email, OTP],
              (err, result) => {
                if (err) {
                  console.error(err);
                  return res
                    .status(500)
                    .send({ message: "Failed to store OTP" });
                }

                res.status(200).json({ message: "OTP sent successfully" });
              }
            );
          }
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json("An error occurred.");
  }
};

const verifyOtp = (req, res) => {
  try {
    const { email, otp } = req.body;
    db.query(
      "SELECT * FROM otpcollections WHERE email = ? AND code = ?",
      [email, otp],
      (err, result) => {
        if (err) {
          return res
            .status(500)
            .json({ success: false, message: "Internal server error" });
        }
        if (result.length > 0) {
          return res
            .status(200)
            .json({ success: true, message: "Otp verification  success" });
        } else {
          return res
            .status(404)
            .json({ success: false, message: "Invalid email or OTP" });
        }
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const resetPassword = (req, res) => {
  try {
    const { email, password } = req.body;

    const selectQuery =
      "SELECT * FROM employee_register WHERE employee_email = ?";
    db.query(selectQuery, email, (err, result) => {
      if (err) {
        res.status(400).json({ success: false, message: err.message });
      }
      if (result && result.length) {
        const saltRounds = 10;
        const hashedPassword = bcrypt.hashSync(password, saltRounds);
        console.log(hashedPassword);
        const updateQuery = `UPDATE employee_register SET employee_password = ? WHERE employee_email = ?`;
        db.query(updateQuery, [hashedPassword, email], (err, result) => {
          if (err) {
            return res
              .status(400)
              .json({ success: false, message: err.message });
          } else {
            return res.status(200).json({
              success: true,
              message: "Details updated successfully",
            });
          }
        });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "email not found" });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Internal server error" });
  }
};

const getOPDDetailsByBranch = (req, res) => {
  try {
    const branch = req.params.branch;
    const selectQuery = `SELECT * FROM appointments WHERE branch_name = ?`;
    db.query(selectQuery, branch, (err, result) => {
      if (err) {
        res.status(400).json({ success: false, message: err.message });
      }
      res.status(200).send(result);
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Internal server error" });
  }
};

const getTreatmentDetailsByBranch = (req, res) => {
  try {
    const branch = req.params.branch;
    const selectQuery = `SELECT * FROM patient_bills WHERE branch_name = ?`;
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

const voucherCreate = (req, res) => {
  try {
    const {
      branch_name,
      for_name,
      for_use,
      voucher_amount,
      voucher_date,
      created_by,
    } = req.body;
    if (
      (!branch_name,
      !for_name,
      !for_use,
      !voucher_amount,
      !voucher_date,
      !created_by)
    ) {
      return res.status(404).json({
        success: false,
        message: "All fields are required",
      });
    }
    const insertQuery =
      "INSERT INTO expense_voucher (branch_name, for_name, for_use, voucher_amount, voucher_date, created_by) VALUES (?,?,?,?,?,?)";
    db.query(
      insertQuery,
      [
        branch_name,
        for_name,
        for_use,
        voucher_amount,
        voucher_date,
        created_by,
      ],
      (err, result) => {
        if (err) {
          res.status(400).json({ success: false, message: err.message });
        } else {
          console.log("Voucher Created successfully");
          return res.status(200).json({
            success: true,
            message: "Voucher Created successfully",
          });
        }
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getVoucherListByBranch = (req, res) => {
  try {
    const branch = req.params.branch;
    const selectQuery = "SELECT * FROM expense_voucher WHERE branch_name = ?";
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

const getPatientBillsByBranch = (req, res) => {
  try {
    const branch = req.params.branch;
    const selectQuery = "SELECT * FROM patient_bills WHERE branch_name = ?";
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

const getPurInventoryByBranch = (req, res) => {
  try {
    const branch = req.params.branch;
    const getQuery = "SELECT * FROM purchase_inventory WHERE branch_name = ?";
    db.query(getQuery, branch, (err, result) => {
      if (err) {
        res.status(400).send({ success: false, message: err.message });
      }
      res.status(200).send(result);
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Internal server error" });
  }
};

const appointmentData = (req, res) => {
  const branchName = req.params.branch;
  try {
    const getQuery =
      "SELECT * FROM appointments JOIN patient_details ON appointments.patient_uhid = patient_details.uhid WHERE appointments.branch_name = ?";
    db.query(getQuery, branchName, (err, result) => {
      if (err) {
        console.error("Error retrieving appointment:", err); // Log the error for debugging
        return res
          .status(500)
          .json({ success: false, message: "Error getting appointment" });
      }
      res.status(200).send(result);
    });
  } catch (error) {
    console.error("Error in try-catch block:", error); // Log any synchronous errors
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const addSecurityAmount = (req, res) => {
  try {
    const {
      branch_name,
      date,
      appointment_id,
      uhid,
      patient_name,
      patient_number,
      assigned_doctor,
      amount,
      payment_status,
      refund_amount,
      refund_date,
      received_by,
      refund_by,
    } = req.body;
    const insertParams = [
      branch_name,
      date,
      appointment_id,
      uhid,
      patient_name,
      patient_number,
      assigned_doctor,
      amount,
      payment_status,
      refund_amount,
      refund_date,
      received_by,
      refund_by,
    ];

    const selectQuery =
      "INSERT INTO security_amount (branch_name, date, appointment_id, uhid, patient_name, patient_number, assigned_doctor, amount, payment_status, refund_amount, refund_date, received_by, refund_by) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)";

    db.query(selectQuery, insertParams, (err, result) => {
      if (err) {
        res.status(400).json({ success: false, message: err.message });
      }
      res.status(200).json({
        success: true,
        message: "Security Amount Submitted Successfully",
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const getAppointmentDetailsViaID = (req, res) => {
  try {
    const id = req.params.id;
    const selectQuery =
      "SELECT * FROM appointments JOIN patient_details ON appointments.patient_uhid = patient_details.uhid WHERE appointments.appoint_id = ?";
    db.query(selectQuery, id, (err, result) => {
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

const getSecurityAmountDataByBranch = (req, res) => {
  try {
    const branch = req.params.branch;
    const selectQuery = "SELECT * FROM security_amount WHERE branch_name = ?";
    db.query(selectQuery, branch, (err, result) => {
      if (err) {
        res.status(400).json({ success: false, message: err.message });
      }
      res.status(200).send(result);
    });
  } catch (error) {
    console.log(error);
    response.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  accountantLoginUser,
  sendOtp,
  verifyOtp,
  resetPassword,
  getOPDDetailsByBranch,
  getTreatmentDetailsByBranch,
  voucherCreate,
  getVoucherListByBranch,
  getPatientBillsByBranch,
  getBillsByBranch,
  getPurInventoryByBranch,
  appointmentData,
  addSecurityAmount,
  getAppointmentDetailsViaID,
  getSecurityAmountDataByBranch,
};
