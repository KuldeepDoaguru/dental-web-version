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
            branch: user.branch_name,
            employee_name: user.employee_name,
            employee_mobile: user.employee_mobile,
            employee_designation: user.employee_designation,
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

const getVoucherDataByBranchID = (req, res) => {
  try {
    const branch = req.params.branch;
    const id = req.params.id;
    const selectQuery =
      "SELECT * FROM expense_voucher WHERE branch_name = ? AND voucher_id = ?";
    db.query(selectQuery, [branch, id], (err, result) => {
      if (err) {
        return res.status(400).json({ success: false, message: err.message });
      }
      res.status(200).json(result);
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
      "SELECT * FROM appointments JOIN patient_details ON appointments.patient_uhid = patient_details.uhid JOIN patient_bills ON appointments.appoint_id = patient_bills.appoint_id WHERE appointments.appoint_id = ?";
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

const getAppointmentDetailsViaIDForOPD = (req, res) => {
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

const updateSecurityAmount = (req, res) => {
  try {
    const sid = req.params.sid;
    const selectQuery = "SELECT * FROM security_amount WHERE sa_id = ?";
    db.query(selectQuery, sid, (err, result) => {
      if (err) {
        res.status(400).json({ success: false, message: err.message });
      }
      if (result && result.length > 0) {
        const updateQuery = `UPDATE security_amount SET payment_status = ? WHERE sa_id = ?`;

        db.query(updateQuery, ["Success", sid], (err, result) => {
          if (err) {
            return res.status(500).json({
              success: false,
              message: "Failed to update details",
            });
          } else {
            return res.status(200).json({
              success: true,
              message: "Security Amount Details updated successfully",
            });
          }
        });
      } else {
        return res.status(404).json({
          success: false,
          message: "Data not found",
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const getSecurityAmountDataBySID = (req, res) => {
  try {
    const sid = req.params.sid;
    const selectQuery =
      "SELECT * FROM security_amount JOIN patient_bills ON security_amount.appointment_id = patient_bills.appoint_id WHERE security_amount.sa_id = ?";
    db.query(selectQuery, sid, (err, result) => {
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

const updateRefundAmount = (req, res) => {
  try {
    const sid = req.params.sid;
    const { refund_amount, refund_date, refund_by, payment_status } = req.body;

    // Checking if all required fields are present in the request body
    if (!refund_amount || !refund_date || !refund_by || !payment_status) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const selectQuery = "SELECT * FROM security_amount WHERE sa_id = ?";
    db.query(selectQuery, sid, (err, result) => {
      if (err) {
        return res.status(400).json({ success: false, message: err.message });
      }
      if (result && result.length > 0) {
        const updateQuery = `UPDATE security_amount SET refund_amount = ?, refund_date = ?, refund_by = ?, payment_status = ? WHERE sa_id = ?`;

        db.query(
          updateQuery,
          [refund_amount, refund_date, refund_by, payment_status, sid],
          (err, result) => {
            if (err) {
              return res.status(500).json({
                success: false,
                message: "Failed to update details",
              });
            } else {
              return res.status(200).json({
                success: true,
                message: "Amount Refund Successfully",
              });
            }
          }
        );
      } else {
        return res.status(404).json({
          success: false,
          message: "Data not found",
        });
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const updatePatientSecurityAmt = (req, res) => {
  try {
    const sid = req.params.sid;
    const { payment_status, payment_Mode, transaction_Id, notes, received_by } =
      req.body;

    const payment_date = new Date();

    const updatePatientQuery = `
          UPDATE security_amount
          SET payment_status = ? , payment_Mode = ? , transaction_Id = ?, received_by = ? , payment_date = ?, notes = ?
          WHERE sa_id = ?
      `;

    const updatePatientParams = [
      payment_status,
      payment_Mode,
      transaction_Id,
      received_by,
      payment_date,
      notes,
      sid,
    ];

    db.query(
      updatePatientQuery,
      updatePatientParams,
      (Err, appointmentResult) => {
        if (Err) {
          console.error("Error updating Patient:", Err);
          return res
            .status(500)
            .json({ success: false, message: "Internal server error" });
        } else {
          console.log("Payment added successfully");
          return res.status(200).json({
            success: true,
            message: "Payment added successfully",
          });
        }
      }
    );
  } catch (error) {
    console.error("Error in adding Payment", error);
    return res.status(500).json({
      success: false,
      message: "Error in adding Payment",
      error: error.message,
    });
  }
};

const getBranchDetailsByBranch = (req, res) => {
  try {
    const branch = req.params.branch;
    const getQuery = "SELECT * FROM branches WHERE branch_name = ?";
    db.query(getQuery, branch, (err, result) => {
      if (err) {
        res.status(400).json({ success: false, message: err.message });
      }
      res.status(200).json(result);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getTreatmentAmountByBranch = (req, res) => {
  try {
    const branch = req.params.branch;
    const selectQuery =
      "SELECT * FROM appointments JOIN patient_details ON appointments.patient_uhid = patient_details.uhid JOIN patient_bills ON appointments.appoint_id = patient_bills.appoint_id WHERE appointments.branch_name = ?";
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

const getPatientBillsAndSecurityAmountByBranch = (req, res) => {
  try {
    const branch = req.params.branch;
    const bid = req.params.bid;
    const selectQuery =
      "SELECT * FROM patient_bills WHERE branch_name = ? AND bill_id = ?";
    db.query(selectQuery, [branch, bid], (err, result) => {
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

const makeBillPayment = (req, res) => {
  try {
    const bid = req.params.bid;
    const branch = req.params.branch;
    const { paid_amount, payment_status, payment_date_time } = req.body;
    const selectQuery =
      "SELECT * FROM patient_bills WHERE branch_name = ? AND bill_id = ?";

    db.query(selectQuery, [branch, bid], (err, result) => {
      if (err) {
        return res.status(400).json({ success: false, message: err.message });
      }
      if (result && result.length > 0) {
        const updateFields = [];
        const updateValues = [];

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
        )} WHERE branch_name = ? AND bill_id = ?`;

        db.query(updateQuery, [...updateValues, branch, bid], (err, result) => {
          if (err) {
            return res.status(500).json({
              success: false,
              message: "Failed to update details",
            });
          } else {
            return res.status(200).json({
              success: true,
              message: "Payment updated successfully",
            });
          }
        });
      } else {
        return res.status(404).json({
          success: false,
          message: "Branch/bill not found",
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const paidBillLIst = (req, res) => {
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

const paidBillDetails = (req, res) => {
  try {
    const branch = req.params.branch;
    const bid = req.params.bid;
    const selectQuery =
      "SELECT * FROM patient_bills WHERE branch_name = ? AND bill_id = ?";
    db.query(selectQuery, [branch, bid], (err, result) => {
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

const addEmployeeSalary = (req, res) => {
  const branch = req.params.branch;
  const {
    employee_ID,
    branch_name,
    payable_salary,
    paid_salary,
    due_salary,
    advance_payment,
    pay_date,
    pay_status,
    pay_month,
  } = req.body;

  const insertQuery =
    "INSERT INTO staff_salary (employee_ID, branch_name, payable_salary, paid_salary, due_salary, advance_payment, pay_date, pay_status,    pay_month) VALUES (?,?,?,?,?,?,?,?,?)";

  const insertParams = [
    employee_ID,
    branch_name,
    payable_salary,
    paid_salary,
    due_salary,
    advance_payment,
    pay_date,
    pay_status,
    pay_month,
  ];
  db.query(insertQuery, insertParams, (err, result) => {
    if (err) {
      res.status(400).json({ success: false, message: err.message });
    }
    const resultField = {
      salary_ID: result.insertId,
      employee_ID: employee_ID,
      branch_name: branch_name,
      payable_salary: payable_salary,
      paid_salary: paid_salary,
      due_salary: due_salary,
      advance_payment: advance_payment,
      pay_date: pay_date,
      pay_status: pay_status,
      pay_month: pay_month,
    };
    res.status(200).json({
      success: true,
      resultField: resultField,
    });
  });
};

const getEmployeeListByBranch = (req, res) => {
  try {
    const branch = req.params.branch;
    const selectQuery =
      "SELECT * FROM staff_salary JOIN employee_register ON staff_salary.employee_ID = employee_register.employee_ID WHERE staff_salary.branch_name = ?";
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

// -- Start Working

const MarkAttendanceLogin = (req, res) => {
  try {
    const {
      branch_name,
      employee_ID,
      employee_name,
      employee_designation,
      date,
      loginTime,
    } = req.body;

    // Check if the employee ID for today's date and login time already exists
    const checkQuery = `
      SELECT * FROM employee_attendance 
      WHERE employee_ID = ? AND date = ?`;

    const checkParams = [employee_ID, date];

    db.query(checkQuery, checkParams, (err, result) => {
      if (err) {
        console.error("Error in checking attendance:", err);
        return res.status(500).json({
          success: false,
          message: "Internal server error",
        });
      }

      if (result.length > 0) {
        return res.status(400).json({
          success: false,
          message:
            "Attendance for this employee on today's date and login time already exists.",
        });
      }

      // If validation passes, proceed to insert the attendance record
      const addQuery = `
        INSERT INTO employee_attendance(
          employee_ID,
          emp_name,
          branch,
          employee_designation,
          date,
          allday_shift_login_time
        ) VALUES (?, ?, ?, ?, ?, ?)
      `;

      const addParams = [
        employee_ID,
        employee_name,
        branch_name,
        employee_designation,
        date,
        loginTime,
      ];

      db.query(addQuery, addParams, (err, result) => {
        if (err) {
          console.error("Error in marking login", err);
          return res.status(500).json({
            success: false,
            message: "Internal server error",
          });
        } else {
          console.log("login marked successfully");
          return res.status(200).json({
            success: true,
            message: "login marked successfully",
          });
        }
      });
    });
  } catch (error) {
    console.error("Error in marking login:", error);
    return res.status(500).json({
      success: false,
      message: "Error in marking login:",
      error: error.message,
    });
  }
};
const MarkAttendanceLogout = (req, res) => {
  try {
    const {
      branch_name,
      employee_ID,
      employee_name,
      employee_designation,
      date,
      logoutTime,
    } = req.body;

    // Check if the employee ID for today's date and logout time already exists

    const checkQuery = `
      SELECT * FROM employee_attendance 
      WHERE employee_ID = ? AND date = ? AND branch = ? AND allday_shift_logout_time IS NOT NULL `;

    const checkParams = [employee_ID, date, branch_name];

    db.query(checkQuery, checkParams, (err, result) => {
      if (err) {
        console.error("Error in checking attendance:", err);
        return res.status(500).json({
          success: false,
          message: "Internal server error",
        });
      }

      if (result.length > 0) {
        return res.status(400).json({
          success: false,
          message:
            "Attendance for this employee on today's date and logout time already exists.",
        });
      }

      // If validation passes, proceed to update the attendance record
      const updateQuery = `
        UPDATE employee_attendance 
        SET allday_shift_logout_time = ?
        WHERE employee_ID = ? AND date = ?`;

      const updateParams = [logoutTime, employee_ID, date];

      db.query(updateQuery, updateParams, (err, result) => {
        if (err) {
          console.error("Error in marking logout", err);
          return res.status(500).json({
            success: false,
            message: "Internal server error",
          });
        } else {
          console.log("Logout marked successfully");
          return res.status(200).json({
            success: true,
            message: "Logout marked successfully",
          });
        }
      });
    });
  } catch (error) {
    console.error("Error in marking logout:", error);
    return res.status(500).json({
      success: false,
      message: "Error in marking logout:",
      error: error.message,
    });
  }
};

const getTodayAttendance = (req, res) => {
  try {
    const branch = req.params.branch;
    const employee_ID = req.params.employee_ID;
    const date = req.params.date;

    const sql =
      "SELECT * FROM employee_attendance WHERE branch = ? AND employee_ID = ? AND date = ?";

    db.query(sql, [branch, employee_ID, date], (err, results) => {
      if (err) {
        console.error("Error fetching attendance from MySql:", err);
        res.status(500).json({ error: "Error fetching Branch  attendance" });
      } else {
        res.status(200).json({
          data: results,
          message: " attendance fetched successfully",
        });
      }
    });
  } catch (error) {
    console.error("Error fetching  attendance from MySql:", error);
    res.status(500).json({
      success: false,
      message: "Error in fetched  attendance",
      error: error.message,
    });
  }
};
const getAttendancebyempId = (req, res) => {
  try {
    const branch = req.params.branch;
    const employee_ID = req.params.employee_ID;

    const sql =
      "SELECT * FROM employee_attendance WHERE branch = ? AND employee_ID = ? ORDER BY attendance_id DESC";

    db.query(sql, [branch, employee_ID], (err, results) => {
      if (err) {
        console.error("Error fetching attendance from MySql:", err);
        res.status(500).json({ error: "Error fetching Branch  attendance" });
      } else {
        res.status(200).json({
          data: results,
          message: " attendance fetched successfully",
        });
      }
    });
  } catch (error) {
    console.error("Error fetching  attendance from MySql:", error);
    res.status(500).json({
      success: false,
      message: "Error in fetched  attendance",
      error: error.message,
    });
  }
};

const getLeaves = (req, res) => {
  const branch = req.params.branch;
  const employee_Id = req.params.employee_Id;
  try {
    const sql =
      "SELECT * FROM employee_leave WHERE branch_name = ? AND employee_ID = ? ORDER BY id DESC";

    db.query(sql, [branch, employee_Id], (err, results) => {
      if (err) {
        console.error("Error fetching leaves from MySql:", err);
        res.status(500).json({ error: "Error fetching leaves" });
      } else {
        res
          .status(200)
          .json({ data: results, message: "leaves fetched successfully" });
      }
    });
  } catch (error) {
    console.error("Error fetching leaves from MySql:", error);
    res.status(500).json({
      success: false,
      message: "Error in fetched leaves",
      error: error.message,
    });
  }
};

const applyLeave = (req, res) => {
  try {
    const {
      employee_ID,
      employee_name,
      branch_name,
      leave_dates,
      leave_reason,
      leave_status,
    } = req.body;

    const addLeaveQuery = `
    INSERT INTO employee_leave(
      employee_ID, 
      employee_name, 
      branch_name ,
      leave_dates ,
      leave_reason ,
      leave_status 
    ) VALUES (?, ?, ?, ?, ?, ?)
`;

    const addLeaveParams = [
      employee_ID,
      employee_name,
      branch_name,
      leave_dates,
      leave_reason,
      leave_status,
    ];

    db.query(addLeaveQuery, addLeaveParams, (err, Result) => {
      if (err) {
        console.error("Error in apply leave:", err);
        return res
          .status(500)
          .json({ success: false, message: "Internal server error" });
      } else {
        console.log("Leave apply successfully");
        return res.status(200).json({
          success: true,
          message: "Leave apply successfully",
        });
      }
    });
  } catch (error) {
    console.error("Error in apply leave:", error);
    return res.status(500).json({
      success: false,
      message: "Error in apply leave:",
      error: error.message,
    });
  }
};

const getAppointmentById = (req, res) => {
  try {
    const appointmentId = req.params.appointmentId;
    const branch = req.params.branch;
    const sql = `
      SELECT 
        a.branch_name,
        a.appoint_id,
        a.assigned_doctor_name,
        a.assigned_doctor_id,
        a.appointment_status,
        a.appointment_dateTime,
        a.treatment_provided,
        a.opd_amount,
        a.payment_Mode,
        a.transaction_Id,
        a.payment_Status,
        a.appointment_created_by,
        a.appointment_created_by_emp_id,
        a.notes,
        a.created_at,
        p.uhid,
        p.patient_name,
        p.mobileno,
        p.dob,
        p.age,
        p.weight,
        p.bloodgroup,
        p.disease,
        p.allergy,
        p.patient_type,
        p.address,
        p.gender
      FROM 
        appointments AS a
      JOIN 
        patient_details AS p ON a.patient_uhid = p.uhid 
      WHERE
      a.appoint_id = ? AND
      a.branch_name = ?
    `;

    db.query(sql, [appointmentId, branch], (err, results) => {
      if (err) {
        console.error("Error fetching appointment from MySql:", err);
        res.status(500).json({ error: "Error fetching appointment" });
      } else {
        if (results.length === 0) {
          res.status(404).json({ message: "Appointment not found" });
        } else {
          res.status(200).json({
            data: results[0],
            message: "Appointment fetched successfully",
          });
        }
      }
    });
  } catch (error) {
    console.error("Error fetching appointment from MySql:", error);
    res.status(500).json({
      success: false,
      message: "Error in fetching appointment",
      error: error.message,
    });
  }
};

// const getTreatmentTotal = (req, res) => {
//   try {
//     const branch = req.params.branch;
//     const sql = `
//       SELECT
//         a.branch_name,
//         a.appoint_id,
//         a.assigned_doctor_name,
//         a.assigned_doctor_id,
//         a.appointment_dateTime,
//         p.uhid,
//         p.patient_name,
//         p.mobileno,
//         dt.dental_treatment,
//         dt.net_amount
//       FROM
//         appointments AS a
//       JOIN
//         patient_details AS p ON a.patient_uhid = p.uhid
//       LEFT JOIN
//       dental_treatment AS dt ON a.patient_uhid = dt.patient_uhid
//       WHERE
//         a.branch_name = ?

//     `;

//     db.query(sql, [branch], (err, results) => {
//       if (err) {
//         console.error("Error fetching appointment from MySql:", err);
//         res.status(500).json({ error: "Error fetching appointment" });
//       } else {
//         if (results.length === 0) {
//           res.status(404).json({ message: "Appointment not found" });
//         } else {
//           res.status(200).json({
//             data: results[0],
//             message: "Appointment fetched successfully",
//           });
//         }
//       }
//     });
//   } catch (error) {
//     console.error("Error fetching appointment from MySql:", error);
//     res.status(500).json({
//       success: false,
//       message: "Error in fetching appointment",
//       error: error.message,
//     });
//   }
// };

const getTreatmentTotal = (req, res) => {
  try {
    const branch = req.params.branch;
    const sql = `
      SELECT 
        a.branch_name,
        a.appoint_id,
        a.assigned_doctor_name,
        a.assigned_doctor_id,
        a.appointment_dateTime,
        p.uhid,
        p.patient_name,
        p.mobileno,
        dt.dental_treatment,
        dt.net_amount,
        dt.sitting_payment_status
      FROM 
        dental_treatment AS dt
      JOIN 
        appointments AS a ON dt.appointment_id = a.appoint_id
      JOIN 
        patient_details AS p ON a.patient_uhid = p.uhid
      WHERE
        dt.branch_name = ? AND
        dt.sitting_payment_status = 'Received'
    `;

    db.query(sql, [branch], (err, results) => {
      if (err) {
        console.error("Error fetching treatment data from MySql:", err);
        res.status(500).json({ error: "Error fetching treatment data" });
      } else {
        if (results.length === 0) {
          res.status(404).json({ message: "No data found" });
        } else {
          res.status(200).json({
            results,
            message: "Treatment data fetched successfully",
          });
        }
      }
    });
  } catch (error) {
    console.error("Error fetching treatment data from MySql:", error);
    res.status(500).json({
      success: false,
      message: "Error in fetching treatment data",
      error: error.message,
    });
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
  updateSecurityAmount,
  getSecurityAmountDataBySID,
  updateRefundAmount,
  updatePatientSecurityAmt,
  getBranchDetailsByBranch,
  getAppointmentDetailsViaIDForOPD,
  getTreatmentAmountByBranch,
  getPatientBillsAndSecurityAmountByBranch,
  makeBillPayment,
  paidBillLIst,
  paidBillDetails,
  getEmployeeListByBranch,
  addEmployeeSalary,
  MarkAttendanceLogin,
  MarkAttendanceLogout,
  getTodayAttendance,
  getAttendancebyempId,
  getLeaves,
  applyLeave,
  getAppointmentById,
  getVoucherDataByBranchID,
  getTreatmentTotal,
};
