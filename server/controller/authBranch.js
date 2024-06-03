const express = require("express");
const db = require("../connect.js");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

const PORT = process.env.PORT;

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

const LoginDoctor = (req, res) => {
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

        if (!user.employee_role.includes("doctor")) {
          return res.status(401).json({
            success: "false",
            message: "Please login with doctor email",
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
            branch_name: user.branch_name,
            employee_name: user.employee_name,
            employee_mobile: user.employee_mobile,
            gender: user.gender,
            address: user.address,
            doctor_expertise: user.doctor_expertise,
            doctor_education_details: user.doctor_education_details,
            working_days: user.working_days,
            morning_shift_start_time: user.morning_shift_start_time,
            morning_shift_end_time: user.morning_shift_end_time,
            evening_shift_start_time: user.evening_shift_start_time,
            evening_shift_end_time: user.evening_shift_end_time,
            employee_designation: user.employee_designation,
            employee_picture: user.employee_picture,
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

const billPatientData = (req, res) => {
  // Fetch data from the specified tables
  db.query(
    `
        SELECT 
            pd.uhid,
            pd.branch_name AS branch_name,
            pd.patient_name,
            pd.mobileno,
            pd.emailid,
            a.appoint_id,
            a.assigned_doctor_name,
            dt.dental_treatment,
            dt.no_teeth,
            dt.cost_amt,
            dt.total_amt,
            dp.medicine_name,
            dp.dosage
        FROM 
            patient_details pd
        JOIN 
            appointments a ON pd.uhid = a.patient_uhid
        LEFT JOIN 
            dental_treatment dt ON a.appoint_id = dt.appointment_id
        LEFT JOIN 
            dental_prescription dp ON a.appoint_id = dp.appoint_id
    `,
    (err, results) => {
      if (err) {
        console.error("Error fetching data:", err);
        return res
          .status(500)
          .json({ error: "An error occurred while fetching data" });
      }

      // Insert fetched data into new_table
      results.forEach((result) => {
        db.query("INSERT INTO new_table SET ?", result, (err, insertResult) => {
          if (err) {
            console.error("Error inserting data into new_table:", err);
            return res.status(500).json({
              error: "An error occurred while inserting data into new_table",
            });
          }
          console.log("Data inserted into new_table:", insertResult);
        });
      });

      res
        .status(200)
        .json({ message: "Data inserted into new_table successfully" });
    }
  );
};

const billPatientDataByAppId = (req, res) => {
  const appointId = req.params.appoint_id; // Get the appoint_id from the request parameters

  // Fetch data from the specified tables for the specified appoint_id
  db.query(
    `
        SELECT 
            pd.uhid,
            pd.branch_name AS branch_name,
            pd.patient_name,
            pd.mobileno,
            pd.emailid,
            a.appoint_id,
            a.assigned_doctor_name,
            GROUP_CONCAT(dt.dental_treatment) AS dental_treatments, -- Concatenate all treatments into an array
            GROUP_CONCAT(dt.cost_amt) AS cost_amt, -- Concatenate all cost amounts into an array
            GROUP_CONCAT(dp.medicine_name) AS medicine_names, -- Concatenate all medicine names into an array
            GROUP_CONCAT(dp.dosage) AS dosages, -- Concatenate all dosages into an array
            SUM(dt.total_amt) AS total_amt
        FROM 
            patient_details pd
        JOIN 
            appointments a ON pd.uhid = a.patient_uhid
        LEFT JOIN 
            dental_treatment dt ON a.appoint_id = dt.appointment_id
        LEFT JOIN 
            dental_prescription dp ON a.appoint_id = dp.appoint_id
        WHERE
            a.appoint_id = ?
        GROUP BY
            pd.uhid,
            pd.branch_name,
            pd.patient_name,
            pd.mobileno,
            pd.emailid,
            a.appoint_id,
            a.assigned_doctor_name
    `,
    [appointId],
    (err, results) => {
      if (err) {
        console.error("Error fetching data:", err);
        return res
          .status(500)
          .json({ error: "An error occurred while fetching data" });
      }

      // Insert fetched data into new_table
      results.forEach((result) => {
        db.query(
          "INSERT INTO patient_bills (uhid, branch_name, patient_name, patient_mobile, patient_email, appoint_id, assigned_doctor_name, dental_treatment, cost_amt, medicine_name, dosage, total_amount) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
          [
            result.uhid,
            result.branch_name,
            result.patient_name,
            result.mobileno,
            result.emailid,
            result.appoint_id,
            result.assigned_doctor_name,
            result.dental_treatments,
            result.cost_amt,
            result.medicine_names,
            result.dosages,
            result.total_amt,
          ],
          (err, insertResult) => {
            if (err) {
              console.error("Error inserting data into new_table:", err);
              return res.status(500).json({
                error: "An error occurred while inserting data into new_table",
              });
            }
            // console.log('Data inserted into new_table:', insertResult);
          }
        );
      });

      res.status(200).json({ success: true, data: results });
    }
  );
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

const insertTimelineEvent = (req, res) => {
  try {
    const { type, description, branch, patientId } = req.body;
    const insertQuery =
      "INSERT INTO patient_timeline (event_type, event_description, branch_name, uhid	) VALUES (?,?,?,?)";
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
  const patientId = req.params.patientId;
  const branch = req.params.branch;
  try {
    const sql =
      "SELECT * FROM patient_timeline WHERE uhid = ? AND branch_name = ?";

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

const getSecurityAmountDataByTPUHID = (req, res) => {
  try {
    const tpid = req.params.tpid;
    const selectQuery = "SELECT * FROM security_amount WHERE tp_id = ?";
    db.query(selectQuery, tpid, (err, result) => {
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

const getPatientBillsAndSecurityAmountByBranch = (req, res) => {
  try {
    const branch = req.params.branch;
    const tpid = req.params.tpid;
    const selectQuery =
      "SELECT * FROM patient_bills WHERE branch_name = ? AND tp_id = ?";
    db.query(selectQuery, [branch, tpid], (err, result) => {
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

const updateRemainingSecurityAmount = (req, res) => {
  try {
    const tpid = req.params.tpid;
    const { remaining_amount } = req.body;
    console.log(remaining_amount);

    // Checking if all required fields are present in the request body

    const selectQuery = "SELECT * FROM security_amount WHERE tp_id = ?";
    db.query(selectQuery, tpid, (err, result) => {
      if (err) {
        return res.status(400).json({ success: false, message: err.message });
      }
      if (result && result.length > 0) {
        const updateQuery = `UPDATE security_amount SET remaining_amount = ? WHERE tp_id = ?`;

        db.query(updateQuery, [remaining_amount, tpid], (err, result) => {
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

const makeBillPayment = (req, res) => {
  try {
    const tpid = req.params.tpid;
    const branch = req.params.branch;
    const {
      paid_amount,
      payment_status,
      payment_date_time,
      payment_mode,
      transaction_Id,
      note,
      receiver_name,
      receiver_emp_id,
      pay_by_sec_amt,
    } = req.body;
    const selectQuery =
      "SELECT * FROM patient_bills WHERE branch_name = ? AND tp_id = ?";

    db.query(selectQuery, [branch, tpid], (err, result) => {
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
        )} WHERE branch_name = ? AND tp_id = ?`;

        db.query(
          updateQuery,
          [...updateValues, branch, tpid],
          (err, result) => {
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
          }
        );
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

const getBranchDetails = (req, res) => {
  try {
    const branchName = req.params.branch_name;

    const querysql = "SELECT * FROM branches WHERE branch_name = ?";

    db.query(querysql, [branchName], (err, results) => {
      if (err) {
        console.error("Error fetching Branches from MySql:", err);
        res.status(500).json({ error: "Error fetching Branches" });
      } else {
        if (results.length === 0) {
          res
            .status(404)
            .json({ message: "No branches found with the given name" });
          console.log("No branches found with the given name");
        } else {
          res.status(200).json(results);
        }
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

const updateAppointmentPath = (req, res) => {
  try {
    const appoint_id = req.params.appoint_id;
    const branch = req.params.branch;
    const { currentPath, tpid } = req.body;
    const selectQuery =
      "SELECT * FROM appointments WHERE branch_name = ? AND appoint_id = ?";

    db.query(selectQuery, [branch, appoint_id], (err, result) => {
      if (err) {
        // logger.registrationLogger.log(
        //   "error",
        //   "An error occurred while fetching data"
        // );
        return res.status(400).json({ success: false, message: err.message });
      }
      if (result && result.length > 0) {
        const updateFields = [];
        const updateValues = [];

        if (tpid) {
          updateFields.push("tp_id = ?");
          updateValues.push(tpid);
        }

        if (currentPath) {
          updateFields.push("current_path = ?");
          updateValues.push(currentPath);
        }

        const updateQuery = `UPDATE appointments SET ${updateFields.join(
          ", "
        )} WHERE branch_name = ? AND appoint_id = ?`;

        db.query(
          updateQuery,
          [...updateValues, branch, appoint_id],
          (err, result) => {
            if (err) {
              // logger.registrationLogger.log(
              //   "error",
              //   "Failed to update details"
              // );
              console.log("866", err);
              return res.status(500).json({
                success: false,
                message: "Failed to update details",
              });
            } else {
              // logger.registrationLogger.log(
              //   "info",
              //   "Appointment updated successfully"
              // );
              return res.status(200).json({
                success: true,
                message: "Appointment updated successfully",
              });
            }
          }
        );
      } else {
        // logger.registrationLogger.log("error", "branch or tpid not found");
        return res.status(404).json({
          success: false,
          message: "Branch/tpid not found",
        });
      }
    });
  } catch (error) {
    // logger.registrationLogger.log("error", "Internal server error");
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = {
  getBranch,
  LoginDoctor,
  billPatientData,
  billPatientDataByAppId,
  getPatientBillUHID,
  insertTimelineEvent,
  getPatientTimeline,
  getSecurityAmountDataByTPUHID,
  getPatientBillsAndSecurityAmountByBranch,
  updateRemainingSecurityAmount,
  makeBillPayment,
  sendOtp,
  verifyOtp,
  resetPassword,
  getTreatmentViaUhid,
  getExaminationViaUhid,
  getPrescriptionViaUhid,
  updateTreatmentStatus,
  getBranchDetails,
  updateAppointmentPath,
};
