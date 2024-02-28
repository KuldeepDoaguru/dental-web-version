const express = require("express");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const { db } = require("../../dbConnect/connect");
const JWT = require("jsonwebtoken");
const nodemailer = require("nodemailer");

dotenv.config();

const PORT = process.env.PORT;

const EnrollEmployee = async (req, res) => {
  try {
    const {
      empName,
      empMobile,
      empEmail,
      empGender,
      empDesignation,
      password,
      empRole,
      empSalary,
      empAddress,
      status,
    } = req.body;

    console.log(req.body);
    console.log(password, "23");

    // Validations
    const requiredFields = [
      empName,
      empMobile,
      empEmail,
      empGender,
      empDesignation,
      password,
      empRole,
      empSalary,
      empAddress,
    ];
    if (requiredFields.some((field) => !field)) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Hash the "password" and "cpassword"
    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(password, saltRounds);
    console.log(hashedPassword);

    // Find the highest empID in the database for the given pattern
    const highestEmpIDQuery =
      "SELECT MAX(CAST(SUBSTRING_INDEX(employee_ID, '_', -1) AS UNSIGNED)) AS maxID FROM employee_register WHERE employee_ID LIKE ?";
    const pattern = "dg_%";

    db.query(highestEmpIDQuery, [pattern], (err, result) => {
      if (err) {
        console.error("Error getting highest empID:", err);
        res.status(500).json({ error: "Internal server error" });
      } else {
        let nextID = 1;
        if (result[0].maxID !== null) {
          nextID = result[0].maxID + 1;
        }
        const newEmpID = `dg_${nextID}`;

        // Check if the user already exists
        const checkUserQuery =
          "SELECT * FROM employee_register where employee_email = ?";

        db.query(checkUserQuery, [empEmail], (err, result) => {
          if (err) {
            console.error("Error checking if user exists in MySQL:", err);
            res.status(500).json({ error: "Internal server error" });
          } else {
            // Check if there are any rows in the result
            if (result.length > 0) {
              return res.status(400).json({
                error: "User already exists.",
              });
            } else {
              // User not found, proceed with registration
              const insertUserQuery = `
                    INSERT INTO employee_register (
                      employee_ID, employee_name,	employee_mobile, employee_email, gender, employee_designation,	employee_password,	employee_role, salary, address,	employee_status
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                  `;

              const insertUserParams = [
                newEmpID,
                empName,
                empMobile,
                empEmail,
                gender,
                empDesignation,
                hashedPassword,
                empRole,
                empSalary,
                empAddress,
                status,
              ];

              db.query(
                insertUserQuery,
                insertUserParams,
                (insertErr, insertResult) => {
                  if (insertErr) {
                    console.error("Error inserting user:", insertErr);
                    res.status(500).json({ error: "Internal server error" });
                  } else {
                    console.log("User registered successfully");
                    return res.status(200).json({
                      success: true,
                      message: "Employee registered successfully",
                    });
                  }
                }
              );
            }
          }
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in registration",
      error: error.message,
    });
  }
};

const getEmployeeData = (req, res) => {
  try {
    const getQuery = `SELECT * FROM employee_register`;
    db.query(getQuery, (err, result) => {
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

const EditEmployeeDetails = async (req, res) => {
  try {
    const empId = req.params.emp_id;
    const {
      empName,
      empMobile,
      empEmail,
      empGender,
      empDesignation,
      empRole,
      empSalary,
      empAddress,
    } = req.body;

    const getQuery = `SELECT * FROM employee_register WHERE employee_ID = ?`;
    db.query(getQuery, [empId], (err, result) => {
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
        const updateQuery = `UPDATE employee_register SET ${updateFields.join(
          ", "
        )} WHERE employee_ID = ?`;

        db.query(updateQuery, [...updateValues, empId], (err, result) => {
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
        });
      } else {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
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

        // Assuming you have a 'db' object for database operations
        db.query(
          "INSERT INTO otpcollections (email, code) VALUES (?, ?) ON DUPLICATE KEY UPDATE code = VALUES(code)",
          [email, OTP],
          (err, result) => {
            if (err) {
              console.error(err);
              return res.status(500).send({ message: "Failed to store OTP" });
            }

            res.status(200).json({ message: "OTP sent successfully" });
          }
        );
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json("An error occurred.");
  }
};

const superAdminLoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    db.query(
      `SELECT * FROM super_admin WHERE super_email = ?`,
      [email],
      async (err, result) => {
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
        console.log(user);
        // const match = await bcrypt.compare(password, user.password);
        if (password !== user.super_password) {
          return res.status(200).json({
            success: "false",
            message: "Invalid password",
          });
        }

        const token = await JWT.sign({ id: user.id }, process.env.JWT_SECRET, {
          expiresIn: "7d",
        });

        res.status(200).json({
          success: "true",
          message: "Login successful",
          user: {
            id: user.super_email,
            email: user.email,
          },
          token,
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

const getBranch = (req, res) => {
  try {
    const getQuery = "SELECT * FROM branches";
    db.query(getQuery, (err, result) => {
      if (err) {
        res.status(500).send(err);
      }
      res.status(200).send(result);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const makeAppointents = (req, res) => {
  try {
    const {
      uhid,
      branch_name,
      patient_name,
      dob,
      gender,
      maritalstatus,
      patient_contact,
      assigned_doctor,
      treatment_provided,
      treatment_status,
      payment_status,
      payment_date_time,
      appointed_by,
    } = req.body;

    const insertQuery = `INSERT INTO apointments (uhid, branch_name, patient_name, dob, gender, maritalstatus, patient_contact,
      assigned_doctor, treatment_provided, treatment_status, payment_status, payment_date_time, appointed_by) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`;

    const insertValues = [
      uhid,
      branch_name,
      patient_name,
      dob,
      gender,
      maritalstatus,
      patient_contact,
      assigned_doctor,
      treatment_provided,
      treatment_status,
      payment_status,
      payment_date_time,
      appointed_by,
    ];
    db.query(insertQuery, insertValues, (err, results) => {
      if (err) {
        res.status(400).send(err);
      }
      res.status(200).send(results);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Interval server error" });
  }
};

const appointmentData = (req, res) => {
  const branchName = req.params.branch;
  try {
    const getQuery = "SELECT * FROM apointments WHERE branch_name = ?";
    db.query(getQuery, branchName, (err, result) => {
      if (err) {
        res
          .status(400)
          .json({ success: false, message: "error getting appointment" });
      }
      res.status(200).send(result);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const updateAppointData = (req, res) => {
  try {
    const appointId = req.params.id;
    const {
      branch,
      patientName,
      patientNumber,
      assignedDoc,
      appointedBy,
      appointDateTime,
      appointment_status,
      updatedBy,
    } = req.body;

    const selectQuery = "SELECT * FROM apointments WHERE appoint_id";
    db.query(selectQuery, appointId, (err, result) => {
      if (err) {
        res.status(400).json({ success: false, message: err.message });
      }
      if (result && result.length > 0) {
        const updateFields = [];
        const updateValues = [];

        if (branch) {
          updateFields.push("branch_name = ?");
          updateValues.push(branch);
        }

        if (patientName) {
          updateFields.push("patient_name = ?");
          updateValues.push(patientName);
        }

        if (patientNumber) {
          updateFields.push("patient_contact = ?");
          updateValues.push(patientNumber);
        }

        if (assignedDoc) {
          updateFields.push("assigned_doctor = ?");
          updateValues.push(assignedDoc);
        }

        if (appointedBy) {
          updateFields.push("appointed_by = ?");
          updateValues.push(appointedBy);
        }

        if (appointDateTime) {
          updateFields.push("apointment_date_time = ?");
          updateValues.push(appointDateTime);
        }
        if (appointment_status) {
          updateFields.push("appointment_status = ?");
          updateValues.push(appointment_status);
        }
        if (updatedBy) {
          updateFields.push("updated_by = ?");
          updateValues.push(updatedBy);
        }
        const updateQuery = `UPDATE apointments SET ${updateFields.join(
          ", "
        )} WHERE appoint_id = ?`;

        db.query(updateQuery, [...updateValues, appointId], (err, result) => {
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
        });
      } else {
        return res.status(404).json({
          success: false,
          message: "Appointment not found",
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const deleteAppointData = (req, res) => {
  try {
    const appointID = req.params.id;
    const deleteQuery = "DELETE FROM apointments WHERE appoint_id = ?";
    db.query(deleteQuery, appointID, (err, result) => {
      if (err) {
        res.status(500).json({ success: false, message: err.message });
      }
      res
        .status(200)
        .send({ success: true, message: "Data deleted successfully" });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getAvailableEmp = (req, res) => {
  try {
    const branch = req.params.branch;
    const getQuery = "SELECT * FROM employee_attendance WHERE branch";
    db.query(getQuery, branch, (err, result) => {
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

const addTreatment = (req, res) => {
  try {
    const { treatName, treatCost, treatDiscount } = req.body;
    const requiredFields = [treatName, treatCost, treatDiscount];
    if (requiredFields.some((field) => !field)) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const selectQuery = "SELECT * FROM treatment_list WHERE treatment_name = ?";
    db.query(selectQuery, [treatName], (err, result) => {
      if (err) {
        res.status(500).json({ success: false, error: err.message });
      } else {
        if (result.length > 0) {
          return res
            .status(400)
            .send(result.message, "Treatment already exists");
        } else {
          const InsertQuery = `INSERT INTO treatment_list (treatment_name,	treatment_cost,	treatment_discount) VALUES (?, ?, ?)`;

          const InsertUserParams = [treatName, treatCost, treatDiscount];
          db.query(InsertQuery, InsertUserParams, (errInsert, resultInsert) => {
            if (errInsert) {
              res.status(400).json({
                success: false,
                message: "error while inserting treatment",
              });
            } else {
              res.status(200).send(resultInsert);
            }
          });
        }
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Internal server error" });
  }
};

const getTreatmentList = (req, res) => {
  try {
    const getQuery = "SELECT * FROM treatment_list";
    db.query(getQuery, (err, result) => {
      if (err) {
        res.status(400).send(err.message);
      } else {
        res.status(200).send(result);
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const updateTreatmentDetails = (req, res) => {
  try {
    const treatID = req.params.id;
    const { treatName, treatCost, treatDiscount } = req.body;

    const selectQuery = "SELECT * FROM treatment_list WHERE treatment_id = ?";
    db.query(selectQuery, [treatID], (err, result) => {
      if (err) {
        res.status(400).send(err);
      } else {
        if (result && result.length > 0) {
          const updateFields = [];
          const updateValues = [];

          if (treatName) {
            updateFields.push("treatment_name = ?");
            updateValues.push(treatName);
          }

          if (treatCost) {
            updateFields.push("treatment_cost = ?");
            updateValues.push(treatCost);
          }

          if (treatDiscount) {
            updateFields.push("treatment_discount = ?");
            updateValues.push(treatDiscount);
          }

          const updateQuery = `UPDATE treatment_list SET ${updateFields.join(
            ", "
          )} WHERE treatment_id = ?`;

          db.query(updateQuery, [...updateValues, treatID], (err, result) => {
            if (err) {
              return res
                .status(500)
                .json({ success: false, message: "failed to update details" });
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
            .json({ success: false, message: "treatment not found" });
        }
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getPatientDetailsByBranch = (req, res) => {
  try {
    const branch = req.params.branch;
    const getQuery = `SELECT * FROM patient_details WHERE branch_name = ?`;
    db.query(getQuery, branch, (err, result) => {
      if (err) {
        res.status(400).send(err);
      }
      res.status(200).send(result);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
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

    const imageUrl = `http://localhost:${PORT}/reciept_doc/${reciept_doc.originalname}`;

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

const addEmployeeComplain = (req, res) => {
  try {
    const { emp_id, employee_name, branch_name, complain, rec_on, status } =
      req.body;

    // Validations
    const requiredFields = [
      emp_id,
      employee_name,
      branch_name,
      complain,
      rec_on,
      status,
    ];
    if (requiredFields.some((field) => !field)) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const insertQuery =
      "INSERT INTO employee_complaints (emp_id, employee_name, branch_name, complain, rec_on, status) VALUES (?,?,?,?,?,?)";

    const insertParams = [
      emp_id,
      employee_name,
      branch_name,
      complain,
      rec_on,
      status,
    ];

    db.query(insertQuery, insertParams, (err, result) => {
      if (err) {
        return res.status(400).send({ success: false, message: err.message });
      }
      res.status(200).send({ success: true, result: result });
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Internal server error" });
  }
};

const getEmployeeComplainByBranch = (req, res) => {
  try {
    const branch = req.params.branch;
    const getQuery = "SELECT * FROM employee_complaints WHERE branch_name = ?";
    db.query(getQuery, branch, (err, result) => {
      if (err) {
        res.status(400).send({ success: false, error: err.message });
      }
      res.status(200).send(result);
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Internal server error" });
  }
};

module.exports = {
  EnrollEmployee,
  EditEmployeeDetails,
  getEmployeeData,
  superAdminLoginUser,
  sendOtp,
  verifyOtp,
  getBranch,
  makeAppointents,
  appointmentData,
  getAvailableEmp,
  addTreatment,
  getTreatmentList,
  updateTreatmentDetails,
  getPatientDetailsByBranch,
  purchaseInventory,
  getPurInventoryByBranch,
  addEmployeeComplain,
  getEmployeeComplainByBranch,
  updateAppointData,
  deleteAppointData,
};
