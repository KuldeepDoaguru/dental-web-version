const express = require("express");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const { db } = require("../connect");
const JWT = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const moment = require("moment-timezone");

dotenv.config();

const PORT = process.env.PORT;

const getValue = (req, res) => {
  res.send("<h1>hello world</h1>");
};

const accountantLoginUser = (req, res) => {
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
        message: "Please Enter Email or Password",
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

        const token = JWT.sign(
          { id: user.employee_ID },
          process.env.JWT_SECRET,
          {
            expiresIn: "7d",
          }
        );

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

  const selectQuery =
    'SELECT * FROM employee_register WHERE employee_email = ? AND employee_role LIKE "%accountant%"';

  db.query(selectQuery, email, (err, result) => {
    if (err) {
      return res.status(400).json({ success: false, message: err.message });
    } else {
      if (!result || result.length === 0) {
        return res
          .status(404)
          .json({ success: false, message: "Email not found" });
      } else {
        const user = result[0];

        // Random OTP generation
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
            host: "doaguru.com",
            port: 465,
            secure: true,
            auth: {
              user: "info@doaguru.com",
              pass: "dgwebmail@132",
            },
          });

          const mailOptions = {
            from: "info@doaguru.com",
            to: email,
            subject: "OTP for Password Reset",
            text: `Your OTP for Password Reset is: ${OTP}`,
          };

          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.error(error);
              return res.status(500).json({
                success: false,
                message: "An error occurred while sending the email.",
              });
            } else {
              console.log("OTP sent:", info.response);

              const updateQuery =
                "INSERT INTO otpcollections (email, code) VALUES (?, ?) ON DUPLICATE KEY UPDATE code = VALUES(code)";
              db.query(updateQuery, [email, OTP], (upErr, upResult) => {
                if (upErr) {
                  return res
                    .status(400)
                    .json({ success: false, message: upErr.message });
                }
                return res
                  .status(200)
                  .json({ message: "OTP sent successfully" });
              });
            }
          });
        } catch (error) {
          console.log(error);
          return res
            .status(500)
            .json({ success: false, message: "An error occurred." });
        }
      }
    }
  });
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

const getBranch = (req, res) => {
  try {
    const sql = "SELECT * FROM branches";

    db.query(sql, (err, results) => {
      if (err) {
        console.error("Error fetching Branches from MySql:", err);
        res.status(500).json({ error: "Error fetching Branches" });
      } else {
        res
          .status(200)
          .json({ data: results, message: "Branches fetched successfully" });
      }
    });
  } catch (error) {
    console.error("Error fetching Branches from MySql:", error);
    res.status(500).json({
      success: false,
      message: "Error in fetched Branches",
      error: error.message,
    });
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
    const { branch_name, for_name, for_use, voucher_amount, created_by } =
      req.body;
    if ((!branch_name, !for_name, !for_use, !voucher_amount, !created_by)) {
      return res.status(404).json({
        success: false,
        message: "All fields are required",
      });
    }
    const insertQuery =
      "INSERT INTO expense_voucher (branch_name, for_name, for_use, voucher_amount, created_by) VALUES (?,?,?,?,?)";
    db.query(
      insertQuery,
      [branch_name, for_name, for_use, voucher_amount, created_by],
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
    const selectQuery =
      "SELECT * FROM expense_voucher WHERE branch_name = ? ORDER BY voucher_id DESC";
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

const appointmentDataopd = (req, res) => {
  const branchName = req.params.branch;

  try {
    const getQuerys = `
      SELECT 
        appointments.appoint_id,
        appointments.appointment_dateTime,
        appointments.patient_uhid,
        appointments.treatment_provided,
        appointments.assigned_doctor_name,
        appointments.assigned_doctor_id,
        appointments.opd_amount,
        appointments.payment_Mode,
        appointments.transaction_Id,
        appointments.payment_Status,
        appointments.refund_date_time,
        appointments.created_at,
        patient_details.patient_name,
        patient_details.mobileno
      FROM appointments 
      JOIN patient_details ON appointments.patient_uhid = patient_details.uhid 
      WHERE appointments.branch_name = ?`;

    db.query(getQuerys, branchName, (err, result) => {
      if (err) {
        console.error("Error retrieving appointment:", err);
        return res
          .status(500)
          .json({ success: false, message: "Error getting appointment" });
      }

      res.status(200).json({ success: true, data: result });
    });
  } catch (error) {
    console.error("Error in try-catch block:", error);
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
    const selectQuery =
      "SELECT * FROM security_amount WHERE branch_name = ? ORDER BY sa_id DESC";
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

const getSecurityAmountDataByTPUHID = (req, res) => {
  try {
    const tpid = req.params.tpid;
    const uhid = req.params.uhid;
    const selectQuery =
      "SELECT * FROM security_amount WHERE tp_id = ? AND uhid = ?";
    db.query(selectQuery, [tpid, uhid], (err, result) => {
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
      "SELECT * FROM security_amount JOIN patient_details ON security_amount.uhid = patient_details.uhid WHERE security_amount.sa_id = ?";
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
  const date = moment().tz("Asia/Kolkata").format("DD-MM-YYYY HH:mm:ss");
  try {
    const sid = req.params.sid;
    const { refund_amount, refund_by, payment_status, remaining_amount } =
      req.body;

    if (!refund_amount || !refund_by || !payment_status) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    console.log(req.body);

    const selectQuery = "SELECT * FROM security_amount WHERE sa_id = ?";
    db.query(selectQuery, sid, (err, result) => {
      if (err) {
        return res.status(400).json({ success: false, message: err.message });
      }
      if (result && result.length > 0) {
        const updateQuery = `UPDATE security_amount SET refund_amount = ?, refund_date = ?, refund_by = ?, payment_status = ?, remaining_amount = ? WHERE sa_id = ?`;

        db.query(
          updateQuery,
          [
            refund_amount,
            date,
            refund_by,
            payment_status,
            remaining_amount,
            sid,
          ],
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

const updateRemainingSecurityAmount = (req, res) => {
  try {
    const tpid = req.params.tp_id;
    const uhid = req.params.uhid;

    const { remaining_amount } = req.body;
    console.log(remaining_amount);

    const selectQuery =
      "SELECT * FROM security_amount WHERE tp_id = ? AND  uhid = ?";
    db.query(selectQuery, [tpid, uhid], (err, result) => {
      if (err) {
        return res.status(400).json({ success: false, message: err.message });
      }
      if (result && result.length > 0) {
        const updateQuery = `UPDATE security_amount SET remaining_amount = ? WHERE tp_id = ? AND uhid = ?`;

        db.query(updateQuery, [remaining_amount, tpid, uhid], (err, result) => {
          if (err) {
            return res.status(500).json({
              success: false,
              message: "Failed to update details",
            });
          } else {
            return res.status(200).json({
              success: true,
              message: "remaining amount update Successfully",
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
    return res.status(500).json({ success: false, message: error.message });
  }
};

const updatePatientSecurityAmt = (req, res) => {
  try {
    const sid = req.params.sid;
    const {
      payment_status,
      payment_Mode,
      transaction_Id,
      notes,
      received_by,
      remaining_amount,
    } = req.body;

    const payment_date = moment()
      .tz("Asia/Kolkata")
      .format("DD-MM-YYYY HH:mm:ss");

    const updatePatientQuery = `
          UPDATE security_amount
          SET payment_status = ? , payment_Mode = ? , transaction_Id = ?, received_by = ? , payment_date = ?, notes = ?, remaining_amount = ?
          WHERE sa_id = ?
      `;

    const updatePatientParams = [
      payment_status,
      payment_Mode,
      transaction_Id,
      received_by,
      payment_date,
      notes,
      remaining_amount,
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
  const payment_date_time = moment()
    .tz("Asia/Kolkata")
    .format("DD-MM-YYYY HH:mm:ss");
  try {
    const bid = req.params.bid;
    const branch = req.params.branch;
    const {
      paid_amount,
      payment_status,
      payment_mode,
      transaction_Id,
      note,
      receiver_name,
      receiver_emp_id,
      pay_by_sec_amt,
    } = req.body;
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
        if (payment_mode) {
          updateFields.push("payment_mode = ?");
          updateValues.push(payment_mode);
        }
        if (transaction_Id) {
          updateFields.push("transaction_Id = ?");
          updateValues.push(transaction_Id);
        }
        if (note) {
          updateFields.push("note = ?");
          updateValues.push(note);
        }
        if (receiver_name) {
          updateFields.push("receiver_name = ?");
          updateValues.push(receiver_name);
        }
        if (receiver_emp_id) {
          updateFields.push("receiver_emp_id = ?");
          updateValues.push(receiver_emp_id);
        }
        if (pay_by_sec_amt) {
          updateFields.push("pay_by_sec_amt = ?");
          updateValues.push(pay_by_sec_amt);
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
    const selectQuery =
      "SELECT * FROM patient_bills WHERE branch_name = ? ORDER BY bill_id DESC";
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

const getEmployeeDetails = (req, res) => {
  try {
    const branch = req.params.branch;
    const id = req.params.id;
    const selectQuery =
      "SELECT * FROM employee_register WHERE branch_name = ? AND employee_ID = ?";
    db.query(selectQuery, [branch, id], (err, result) => {
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

const getEmployeeListByBranchByID = (req, res) => {
  try {
    const slid = req.params.slid;
    const branch = req.params.branch;
    const selectQuery =
      "SELECT * FROM staff_salary JOIN employee_register ON staff_salary.employee_ID = employee_register.employee_ID WHERE staff_salary.branch_name = ? AND sl_id = ?";
    db.query(selectQuery, [branch, slid], (err, result) => {
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
      availability,
    } = req.body;

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

      const addQuery = `
        INSERT INTO employee_attendance(
          employee_ID,
          emp_name,
          branch,
          employee_designation,
          date,
          allday_shift_login_time,
          availability
        ) VALUES (?, ?, ?, ?, ?, ?,?)
      `;

      const addParams = [
        employee_ID,
        employee_name,
        branch_name,
        employee_designation,
        date,
        loginTime,
        availability,
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
      availability,
    } = req.body;

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
        SET allday_shift_logout_time = ?, availability = ?
        WHERE employee_ID = ? AND date = ?`;

      const updateParams = [logoutTime, availability, employee_ID, date];

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
        dt.sitting_payment_status,
        dt.qty,
        dt.total_amt,
        dt.disc_amt,
        dt.cost_amt,
        dt.date
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

const getTreatmentTotalById = (req, res) => {
  try {
    const appointID = req.params.appointID;
    const uhid = req.params.uhid;
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
        dt.sitting_payment_status,
        dt.qty,
        dt.total_amt,
        dt.disc_amt,
        dt.cost_amt,
        dt.date
      FROM 
        dental_treatment AS dt
      JOIN 
        appointments AS a ON dt.appointment_id = a.appoint_id
      JOIN 
        patient_details AS p ON a.patient_uhid = p.uhid
      WHERE
        a.appoint_id = ? AND 
        p.uhid = ?
    `;

    db.query(sql, [appointID, uhid], (err, results) => {
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

const updateRemainingAmount = (req, res) => {
  try {
    const { tp_id, uhid } = req.params;
    const { remaining_amount } = req.body;

    const updateQuery =
      "UPDATE security_amount SET remaining_amount = ? WHERE tp_id = ? AND uhid = ?";

    db.query(updateQuery, [remaining_amount, tp_id, uhid], (err, result) => {
      if (err) {
        res.status(400).json({ success: false, message: err.message });
        return;
      }
      if (result.affectedRows === 0) {
        res.status(404).json({ success: false, message: "Record not found" });
        return;
      }
      res.status(200).json({
        success: true,
        message: "Remaining amount updated successfully",
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Final Bill API's

const billDetailsViaTpid = (req, res) => {
  try {
    const tpid = req.params.tpid;
    const selectQuery = "SELECT * FROM patient_bills WHERE tp_id = ?";
    db.query(selectQuery, tpid, (err, result) => {
      if (err) {
        res.status(400).json({ success: false, message: err.message });
      }
      res.status(200).send(result);
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "internal server error" });
  }
};

const getTreatSuggestViaTpid = (req, res) => {
  try {
    const tpid = req.params.tpid;
    const branch = req.params.branch;
    const sql = `SELECT * FROM treat_suggest WHERE tp_id = ? AND branch_name = ?`;
    db.query(sql, [tpid, branch], (err, result) => {
      if (err) {
        return res.status(400).json({
          success: false,
          message: "Failed to query database",
          error: err,
        });
      } else {
        if (result.length === 0) {
          return res
            .status(404)
            .json({ success: false, message: "No data found" });
        }
        return res.status(200).json({
          success: true,
          message: "Data retrieved successfully",
          data: result,
        });
      }
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const getTreatPrescriptionByTpid = (req, res) => {
  const { tpid, branch } = req.params;

  const sql =
    "SELECT * FROM dental_prescription WHERE tp_id = ? AND branch_name = ?";

  db.query(sql, [tpid, branch], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json({ results });
    }
  });
};

const getTreatmentDetailsViaTpid = (req, res) => {
  try {
    const { tpid, branch } = req.params;
    const selectQuery =
      "SELECT * FROM dental_treatment WHERE tp_id = ? AND branch_name = ?";
    db.query(selectQuery, [tpid, branch], (err, result) => {
      if (err) {
        res.status(400).json({ success: false, message: err.message });
      }
      res.status(200).json({ result });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "internal server error" });
  }
};

const getDentalDataByTpid = (req, res) => {
  const tpid = req.params.tpid;
  const branch = req.params.branch;

  const sql =
    "SELECT * FROM dental_examination WHERE tp_id = ? AND branch_name = ?";
  db.query(sql, [tpid, branch], (err, result) => {
    if (err) {
      console.error("Error retrieving data: ", err);
      res.status(500).send("Error retrieving data: " + err.message);
      return;
    }

    if (result.length === 0) {
      res.status(404).send("No data found for appointment ID: " + tpid);
      return;
    }

    res.status(200).json({ result });
  });
};

const getAppointmentsWithPatientDetailsById = (req, res) => {
  const tpid = req.params.tpid;

  const sql = `SELECT * FROM treatment_package JOIN patient_details ON patient_details.uhid = treatment_package.uhid WHERE tp_id = ?`;

  db.query(sql, [tpid], (err, result) => {
    if (err) {
      console.error("Error executing query:", err.message);
      return res.status(500).json({ error: "Internal server error" });
    } else if (result.length === 0) {
      return res.status(404).json({ error: "TPID not found" });
    } else {
      return res.status(200).json({ message: "Get data by TPID", result });
    }
  });
};

const updateTreatmentStatus = (req, res) => {
  try {
    const tpid = req.params.tpid;
    const branch = req.params.branch;
    const finalStats = "completed";
    const selectQuery =
      "SELECT * FROM treatment_package WHERE branch_name = ? AND tp_id = ?";
    db.query(selectQuery, [branch, tpid], (err, result) => {
      if (err) {
        return res.status(400).json({ success: false, message: err.message });
      }
      if (result && result.length > 0) {
        const updateQuery =
          "UPDATE treatment_package SET package_status = ? WHERE branch_name = ? AND tp_id = ?";
        db.query(updateQuery, [finalStats, branch, tpid], (err, result) => {
          if (err) {
            return res
              .status(400)
              .json({ success: false, message: err.message });
          }
          if (result) {
            return res
              .status(200)
              .json({ success: true, message: "Treatment Completed" });
          }
        });
      } else {
        return res
          .status(400)
          .json({ success: false, message: "TPID not found" });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const getBranchDetail = (req, res) => {
  try {
    const branch = req.params.branch;
    const sql = "SELECT * FROM branches WHERE branch_name = ?";

    db.query(sql, branch, (err, results) => {
      if (err) {
        console.error("Error fetching Branches from MySql:", err);
        res.status(500).json({ error: "Error fetching Branches" });
      } else {
        res
          .status(200)
          .json({ data: results, message: "Branches fetched successfully" });
      }
    });
  } catch (error) {
    console.error("Error fetching Branches from MySql:", error);
    res.status(500).json({
      success: false,
      message: "Error in fetched Branches",
      error: error.message,
    });
  }
};

const getBranchHoliday = (req, res) => {
  try {
    const branch = req.params.branch;
    const sql = "SELECT * FROM holidays WHERE branch_name = ?";

    db.query(sql, [branch], (err, results) => {
      if (err) {
        console.error("Error fetching Branch Holidays from MySql:", err);
        res.status(500).json({ error: "Error fetching Branch Holidays" });
      } else {
        res.status(200).json({
          data: results,
          message: "Branch Holidays fetched successfully",
        });
      }
    });
  } catch (error) {
    console.error("Error fetching Branch Holidays from MySql:", error);
    res.status(500).json({
      success: false,
      message: "Error in fetched Branch Holidays",
      error: error.message,
    });
  }
};

const getPatientLabTest = (req, res) => {
  try {
    const selectQuery =
      "SELECT * FROM patient_lab_details LEFT JOIN patient_details ON patient_details.uhid = patient_lab_details.patient_uhid";
    db.query(selectQuery, (err, result) => {
      if (err) {
        res.status(400).json({ success: false, message: err.message });
        return;
      }
      res.status(200).send(result);
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getPatientLabTestByPatientId = (req, res) => {
  const pid = req.params.pid;
  try {
    const selectQuery =
      "SELECT * FROM patient_lab_details LEFT JOIN patient_details ON patient_details.uhid = patient_lab_details.patient_uhid WHERE patient_lab_details.patient_uhid = ?";
    db.query(selectQuery, pid, (err, result) => {
      if (err) {
        res.status(400).json({ success: false, message: err.message });
        return;
      }
      res.status(200).send(result);
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getPatientLabTestCompleted = (req, res) => {
  try {
    const selectQuery = `
      SELECT * FROM patient_lab_test_details JOIN patient_lab_details ON patient_lab_details.testid = patient_lab_test_details.testid LEFT JOIN patient_details ON patient_details.uhid = patient_lab_details.patient_uhid
    `;

    db.query(selectQuery, (err, result) => {
      if (err) {
        res.status(400).json({ success: false, message: err.message });
        return;
      }
      res.status(200).send(result);
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Patient Profile API's

const getPatients = (req, res) => {
  const branch = req.params.branch;
  try {
    const sql =
      "SELECT * FROM patient_details WHERE branch_name = ? ORDER BY created_at DESC";

    db.query(sql, [branch], (err, results) => {
      if (err) {
        console.error("Error fetching Patients from MySql:", err);
        res.status(500).json({ error: "Error fetching Patients" });
      } else {
        res
          .status(200)
          .json({ data: results, message: "Patients fetched successfully" });
      }
    });
  } catch (error) {
    console.error("Error fetching Patients from MySql:", error);
    res.status(500).json({
      success: false,
      message: "Error in fetched Patients",
      error: error.message,
    });
  }
};

const getPatientById = (req, res) => {
  const patientId = req.params.patientId;
  const branch = req.params.branch;
  try {
    const sql =
      "SELECT * FROM patient_details WHERE uhid = ? AND branch_name = ?";

    db.query(sql, [patientId, branch], (err, results) => {
      if (err) {
        console.error("Error fetching patient from MySql:", err);
        res.status(500).json({ error: "Error fetching patient" });
      } else {
        if (results.length === 0) {
          res.status(404).json({ message: "Patient not found" });
        } else {
          res.status(200).json({
            success: true,
            data: results[0],
            message: "Patient fetched successfully",
          });
        }
      }
    });
  } catch (error) {
    console.error("Error fetching patient from MySql:", error);
    res.status(500).json({
      success: false,
      message: "Error in fetching patient",
      error: error.message,
    });
  }
};

const getTreatmentViaUhid = (req, res) => {
  const branch = req.params.branch;
  const uhid = req.params.uhid;
  try {
    const sql =
      "SELECT * FROM treat_suggest WHERE branch_name = ? AND p_uhid = ? ORDER BY ts_id DESC";

    db.query(sql, [branch, uhid], (err, results) => {
      if (err) {
        console.error("Error fetching Treatment from MySql:", err);
        res.status(500).json({ error: "Error fetching Treatment" });
      } else {
        res
          .status(200)
          .json({ data: results, message: "Treatment fetched successfully" });
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
        res.status(200).json({
          data: results,
          message: "Prescription fetched successfully",
        });
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

const getBillViaUhid = (req, res) => {
  const branch = req.params.branch;
  const uhid = req.params.uhid;
  try {
    const sql =
      "SELECT * FROM patient_bills WHERE branch_name = ? AND uhid = ? ORDER BY bill_id DESC";

    db.query(sql, [branch, uhid], (err, results) => {
      if (err) {
        console.error("Error fetching Bill from MySql:", err);
        res.status(500).json({ error: "Error fetching Bill" });
      } else {
        res
          .status(200)
          .json({ data: results, message: "Bill fetched successfully" });
      }
    });
  } catch (error) {
    console.error("Error fetching Bill from MySql:", error);
    res.status(500).json({
      success: false,
      message: "Error in fetched Bill",
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
        res
          .status(200)
          .json({ data: results, message: "Examination fetched successfully" });
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

const getAllAppointmentByPatientId = (req, res) => {
  try {
    const patientId = req.params.patientId;
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
      a.patient_uhid = ? AND
      a.branch_name = ?
    `;

    db.query(sql, [patientId, branch], (err, results) => {
      if (err) {
        console.error("Error fetching appointment from MySql:", err);
        res.status(500).json({ error: "Error fetching appointment" });
      } else {
        if (results.length === 0) {
          res.status(404).json({ message: "Appointment not found" });
        } else {
          res.status(200).json({
            data: results,
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

const getPatientTimeline = (req, res) => {
  const patientId = req.params.patientId;
  const branch = req.params.branch;
  try {
    const sql =
      "SELECT * FROM patient_timeline WHERE uhid = ? AND branch_name = ? ORDER BY event_id DESC";

    db.query(sql, [patientId, branch], (err, results) => {
      if (err) {
        console.error("Error fetching patient_timeline from MySql:", err);
        res.status(500).json({ error: "Error fetching patient_timeline" });
      } else {
        res.status(200).json({
          data: results,
          message: "patient_timeline fetched successfully",
        });
      }
    });
  } catch (error) {
    console.error("Error fetching patient_timeline from MySql:", error);
    res.status(500).json({
      success: false,
      message: "Error in fetched patient_timeline",
      error: error.message,
    });
  }
};

const getDoctorDataByBranch = (req, res) => {
  try {
    const branch = req.params.branch;
    const getQuery =
      'SELECT * FROM employee_register WHERE branch_name = ? AND employee_role LIKE "%doctor%" AND employee_status = "Approved"';
    db.query(getQuery, [branch], (err, result) => {
      if (err) {
        logger.error("Error fetching doctor data from MySql:");
        res
          .status(400)
          .send({ status: false, message: "error in fetching doctor" });
      } else {
        // Iterate over the result array and delete the password property from each object
        result.forEach((employee) => {
          delete employee.employee_password;
        });
        res.json({
          data: result,
          status: true,
          message: "successful fetching doctor",
        });
      }
    });
  } catch (error) {
    logger.error("Error fetching doctor data from MySql:");
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  getValue,
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
  //   getAppointmentDetailsViaID,
  getSecurityAmountDataByBranch,
  updateSecurityAmount,
  getSecurityAmountDataBySID,
  updateRefundAmount,
  updatePatientSecurityAmt,
  getBranchDetailsByBranch,
  getAppointmentDetailsViaIDForOPD,
  //   getTreatmentAmountByBranch,
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
  getTreatmentTotalById,
  getSecurityAmountDataByTPUHID,
  updateRemainingAmount,
  updateRemainingSecurityAmount,
  billDetailsViaTpid,
  getEmployeeDetails,
  getTreatSuggestViaTpid,
  getTreatPrescriptionByTpid,
  getTreatmentDetailsViaTpid,
  getDentalDataByTpid,
  getAppointmentsWithPatientDetailsById,
  getEmployeeListByBranchByID,
  updateTreatmentStatus,
  getBranchDetail,
  getBranchHoliday,
  getPatientLabTest,
  getPatientLabTestByPatientId,
  getPatientLabTestCompleted,
  //   getBranch
  getPatients,
  getPatientById,
  getTreatmentViaUhid,
  getPrescriptionViaUhid,
  getBillViaUhid,
  getExaminationViaUhid,
  getAllAppointmentByPatientId,
  getPatientTimeline,
  appointmentDataopd,
  getDoctorDataByBranch,
};

// const sendOtp = (req, res) => {
//   const { email } = req.body;

//   // random otp
//   function generateOTP(length) {
//     const chars = "0123456789";
//     let otp = "";

//     for (let i = 0; i < length; i++) {
//       const randomIndex = Math.floor(Math.random() * chars.length);
//       otp += chars[randomIndex];
//     }

//     return otp;
//   }

//   const OTP = generateOTP(6);

//   try {
//      const transporter = nodemailer.createTransport({
//     host: "doaguru.com",
//     port: 465,
//     secure: true,
//     auth: {
//       user: "info@doaguru.com",
//       pass: "dgwebmail@132",
//     },
//   });

//     const mailOptions = {
//       from: "info@doaguru.com",
//       to: email,
//       subject: "OTP for password reset",
//       text: `Your OTP to reset password is: ${OTP}`,
//     };

//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         console.error(error);
//         return res
//           .status(500)
//           .json("An error occurred while sending the email.");
//       } else {
//         console.log("OTP sent:", info.response);

//         const selectQuery = "SELECT * FROM otpcollections WHERE email = ?";
//         db.query(selectQuery, email, (err, result) => {
//           if (err) {
//             res.status(400).json({ success: false, message: err.message });
//           }
//           if (result && result.length > 0) {
//             const updateQuery =
//               "UPDATE otpcollections SET code = ? WHERE email = ?";
//             db.query(updateQuery, [OTP, email], (upErr, upResult) => {
//               if (upErr) {
//                 res
//                   .status(400)
//                   .json({ success: false, message: upErr.message });
//               }
//               res.status(200).send(upResult);
//             });
//           } else {
//             // Assuming you have a 'db' object for database operations
//             db.query(
//               "INSERT INTO otpcollections (email, code) VALUES (?, ?) ON DUPLICATE KEY UPDATE code = VALUES(code)",
//               [email, OTP],
//               (err, result) => {
//                 if (err) {
//                   console.error(err);
//                   return res
//                     .status(500)
//                     .send({ message: "Failed to store OTP" });
//                 }

//                 res.status(200).json({ message: "OTP sent successfully" });
//               }
//             );
//           }
//         });
//       }
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json("An error occurred.");
//   }
// };

// const getAppointmentDetailsViaID = (req, res) => {
//   try {
//     const id = req.params.id;
//     const selectQuery =
//       "SELECT * FROM appointments JOIN patient_details ON appointments.patient_uhid = patient_details.uhid JOIN patient_bills ON appointments.appoint_id = patient_bills.appoint_id WHERE appointments.appoint_id = ?";
//     db.query(selectQuery, id, (err, result) => {
//       if (err) {
//         res.status(400).json({ success: false, message: err.message });
//       }
//       res.status(200).send(result);
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// const getTreatmentAmountByBranch = (req, res) => {
//   try {
//     const branch = req.params.branch;
//     const selectQuery =
//       "SELECT * FROM appointments JOIN patient_details ON appointments.patient_uhid = patient_details.uhid JOIN patient_bills ON appointments.appoint_id = patient_bills.appoint_id WHERE appointments.branch_name = ?";
//     db.query(selectQuery, branch, (err, result) => {
//       if (err) {
//         res.status(400).json({ success: false, message: err.message });
//       }
//       res.status(200).send(result);
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };
