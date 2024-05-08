const express = require("express");
const db = require("../connect.js");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const nodemailer = require("nodemailer");

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

        if (!user.employee_role.includes("lab-attendant")) {
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

        const token = JWT.sign({ id: user.id }, process.env.JWT_SECRET, {
          expiresIn: "7d",
        });

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

const getPatientDetail = async (req, res) => {
  try {
    const sql = "SELECT * FROM  patient_lab_details ";

    const patientdetail = await new Promise((resolve, reject) => {
      db.query(sql, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });

    res.status(200).json(patientdetail);
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const patrientDetailbyid = (req, res) => {
  try {
    const { id } = req.params;

    const sql = "SELECT * FROM  patient_lab_details WHERE testid = ?  ";

    db.query(sql, id, (error, result) => {
      if (error) {
        console.log("Patient Detail not found", error);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        res.status(200).json(result);
      }
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const patienttestdata = async (req, res) => {
  const { testId } = req.params;
  const {
    patient_uhid,
    patient_name,
    test,
    result,
    unit,
    cost,
    collection_date,
    authenticate_date,
    payment,
    payment_status,
    lab_type,
  } = req.body;

  const sql = `INSERT INTO patient_lab_test_details (testid, patient_uhid, patient_name, test, result, unit,cost,collection_date,authenticate_date, payment,
    payment_status,lab_type) VAlUES (?,?,?,?,?,?,?,?,?,?,?,?)`;
  db.query(
    sql,
    [
      testId,
      patient_uhid,
      patient_name,
      test,
      result,
      unit,
      cost,
      collection_date,
      authenticate_date,
      payment,
      payment_status,
      lab_type,
    ],
    (err, results) => {
      if (err) {
        res.status(500).json({ error: "Error of Data" });
      } else {
        res.status(201).json({
          success: true,
          message: "patient test data uploaded successfully",
        });
      }
    }
  );
};

const getPatientTestDetail = async (req, res) => {
  try {
    const sql = "SELECT * FROM  patient_lab_test_details ";

    const patientestdetail = await new Promise((resolve, reject) => {
      db.query(sql, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });

    res.status(200).json(patientestdetail);
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const patienttestdatabyid = (req, res) => {
  try {
    const { id } = req.params;

    const sql = "SELECT * FROM  patient_lab_test_details WHERE testid = ?  ";

    db.query(sql, id, (error, result) => {
      if (error) {
        console.log("Patient Test Detail not found", error);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        res.status(200).json(result);
      }
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateteststatus = async (req, res) => {
  try {
    const { testId } = req.params;
    const sql =
      "UPDATE patient_lab_details SET test_status = 'done' WHERE testid = ? ";

    db.query(sql, [testId], (error, result) => {
      if (error) {
        console.log("Patient test Status not found ", error);
        res.status(500).json({ error: "Patient test Status is not found " });
      } else {
        res.status(200).json({ message: "Successfully test status updated " });
      }
    });
  } catch (error) {
    console.log("Internal Error", error);
    res.status.json({ error: "Internal Server Error" });
  }
};

const updatepatienttestdetail = async (req, res) => {
  try {
    const { testId } = req.params;
    const {
      test,
      result,
      unit,
      cost,
      collection_date,
      authenticate_date,
      lab_type,
    } = req.body;
    const sql = `UPDATE  patient_lab_test_details SET test = ? , result = ? , unit = ? , cost = ?, collection_date = ? , authenticate_date = ?,lab_type = ? WHERE testid = ?`;

    db.query(
      sql,
      [
        test,
        result,
        unit,
        cost,
        collection_date,
        authenticate_date,
        lab_type,
        testId,
      ],
      (error, result) => {
        if (error) {
          console.log("Table is not Found ", error);
          res.status(500).json({ message: "Table is not Found " });
        } else {
          res
            .status(200)
            .json({ message: "Successfully Upadated Patient test detail" });
        }
      }
    );
  } catch (error) {
    console.log("Internal Server Error");
    res.status(500).json({ message: "Internal Server Error " });
  }
};

const deletepatienttestdetail = (req, res) => {
  try {
    const { testId } = req.params;

    const sql2 = `DELETE FROM patient_lab_test_details WHERE testid = ?`;

    db.query(sql2, [testId], (error, result) => {
      if (error) {
        console.log("Error deleting patient test lab detail:", error);
        return res
          .status(500)
          .json({ message: "Failed to delete patient test lab detail" });
      }
    });

    const sql = "DELETE FROM patient_test_notes WHERE testid = ?";

    db.query(sql, [testId], (err, result) => {
      if (err) {
        console.error("Error Deleting note:", err);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    const sql1 = `DELETE FROM patient_lab_details WHERE testid = ?`;

    db.query(sql1, [testId], (error, result) => {
      if (error) {
        console.log("Error deleting patient lab detail:", error);
        return res
          .status(500)
          .json({ message: "Failed to delete patient lab detail" });
      }
      return res
        .status(200)
        .json({ message: "Successfully deleted patient detail data" });
    });
  } catch (error) {
    console.log("Internal Server Error", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const patienttestnotes = (req, res) => {
  const { noteTexts, testId } = req.body;

  const values = noteTexts.map((text) => [text, testId]);
  const sql = `INSERT INTO patient_test_notes (note_text,testid) VALUES ?`;

  db.query(sql, [values], (err, result) => {
    if (err) {
      console.error("Error Inserting notes: ", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.status(200).json({ ids: result.insertId });
    }
  });
};

const getpatienttestnotesbyid = (req, res) => {
  const { testId } = req.params;

  const sql = `SELECT * FROM patient_test_notes WHERE testid = ?`;
  db.query(sql, [testId], (err, result) => {
    if (err) {
      console.error("Error Fetching Nots :", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.status(200).json(result);
    }
  });
};

const deletepatientest = (req, res) => {
  const { noteId } = req.params;
  const sql = "DELETE FROM patient_test_notes WHERE id = ?";

  db.query(sql, [noteId], (err, result) => {
    if (err) {
      console.error("Error Deleting note:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.status(200).json({ message: "Note Delete Successfully" });
    }
  });
};

const editpatientest = async (req, res) => {
  const { notes } = req.body;
  try {
    // Use map to update each note in the database
    await Promise.all(
      notes.map(async (note) => {
        const { id, testid, note_text } = note;
        // Execute the update query for each note
        await db.query(
          "UPDATE patient_test_notes SET note_text = ? WHERE id = ? AND testid = ?",
          [note_text, id, testid]
        );
      })
    );
    // Send a success response
    res
      .status(200)
      .json({ success: true, message: "Notes updated successfully" });
  } catch (error) {
    console.error("Error updating notes:", error);
    // Send an error response
    res.status(500).json({ success: false, error: "Internal Server Error" });
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

module.exports = {
  getBranch,
  LoginDoctor,
  getPatientDetail,
  patrientDetailbyid,
  patienttestdata,
  patienttestdatabyid,
  updateteststatus,
  updatepatienttestdetail,
  deletepatienttestdetail,
  patienttestnotes,
  getpatienttestnotesbyid,
  deletepatientest,
  editpatientest,
  getPatientTestDetail,

  resetPassword,
  verifyOtp,
  sendOtp,
};
