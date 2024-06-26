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

const EnrollEmployee = async (req, res) => {
  try {
    const {
      branch,
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

    const imageUrl = `${PORT}/empProfilePicture/${empProfilePicture?.filename}`;

    console.log("profilePicture: 770", imageUrl);

    console.log(req.body);
    console.log(password, "23");

    // Validations
    const requiredFields = [
      branch,
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
                      employee_ID, branch_name, employee_name,	employee_mobile, employee_email, gender, employee_designation,	employee_password, working_days,	employee_role, salary, address,	employee_status, morning_shift_start_time, morning_shift_end_time, evening_shift_start_time, evening_shift_end_time, allday_shift_start_time, allday_shift_end_time, availability, employee_picture
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?,?,?,?,?,?,?,?,?,?,?,?,?,?)
                  `;

              const insertUserParams = [
                newEmpID,
                branch,
                empName,
                empMobile,
                empEmail,
                empGender,
                empDesignation,
                hashedPassword,
                working_days,
                empRole,
                empSalary,
                empAddress,
                status,
                morningShiftStartTime,
                morningShiftEndTime,
                eveningShiftStartTime,
                eveningShiftEndTime,
                allDayShiftStartTime,
                allDayShiftEndTime,
                availability,
                imageUrl,
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
      employee_education,
      speciality,
      language,
      experience,
      type_of,
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
        if (employee_education) {
          updateFields.push("employee_education = ?");
          updateValues.push(employee_education);
        }

        if (speciality) {
          updateFields.push("speciality = ?");
          updateValues.push(speciality);
        }

        if (language) {
          updateFields.push("language = ?");
          updateValues.push(language);
        }

        if (experience) {
          updateFields.push("experience = ?");
          updateValues.push(experience);
        }

        if (type_of) {
          updateFields.push("type_of = ?");
          updateValues.push(type_of);
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

const adminLoginUser = async (req, res) => {
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

        if (!user.employee_role.includes("admin")) {
          return res.status(401).json({
            success: "false",
            message: "Please login with admin email",
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

// const sendOtpEmail = (req, res) => {
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
//     const transporter = nodemailer.createTransport({
//       service: "Gmail",
//       auth: {
//         user: process.env.EMAILSENDER,
//         pass: process.env.EMAILPASSWORD,
//       },
//     });

//     // Check if email exists in the employee_register table
//     const selectQuery =
//       "SELECT * FROM employee_register WHERE employee_email = ?";
//     db.query(selectQuery, email, (err, result) => {
//       if (err) {
//         res.status(400).json({ success: false, message: err.message });
//       }

//       if (result && result.length > 0) {
//         // Email exists in employee_register table
//         // Insert or update OTP in otpcollections table
//         const insertQuery =
//           "INSERT INTO otpcollections (email, code) VALUES (?, ?) ON DUPLICATE KEY UPDATE code = VALUES(code)";
//         db.query(insertQuery, [email, OTP], (insertErr, insertResult) => {
//           if (insertErr) {
//             return res
//               .status(500)
//               .json({ success: false, message: "Failed to store OTP" });
//           }
//           // Send OTP via email
//           sendOtpByEmail(email, OTP, res);
//         });
//       } else {
//         // Email does not exist in employee_register table
//         res
//           .status(404)
//           .json({ message: "Email not found in the employee register" });
//       }
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json("An error occurred.");
//   }
// };

// // Function to send OTP via email
// const sendOtpByEmail = (email, OTP, res) => {
//   const transporter = nodemailer.createTransport({
//     service: "Gmail",
//     auth: {
//       user: process.env.EMAILSENDER,
//       pass: process.env.EMAILPASSWORD,
//     },
//   });

//   const mailOptions = {
//     from: process.env.EMAILSENDER,
//     to: email,
//     subject: "Password Reset OTP",
//     text: `Your OTP for password reset is: ${OTP}`,
//   };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.error(error);
//       return res.status(500).json("An error occurred while sending the email.");
//     } else {
//       console.log("OTP sent:", info.response);
//       res.status(200).json({ message: "OTP sent successfully" });
//     }
//   });
// };

const sendOtpEmail = (req, res) => {
  const { email } = req.body;

  const selectQuery =
    'SELECT * FROM employee_register WHERE employee_email = ? AND employee_role LIKE "%admin%"';

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

const getAvailableEmp = (req, res) => {
  try {
    const branch = req.params.branch;
    const getQuery = "SELECT * FROM employee_attendance WHERE branch = ?";
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

const updateAppointData = (req, res) => {
  try {
    const appointId = req.params.id;
    const {
      patient_uhid,
      branch_name,
      assigned_doctor_name,
      assigned_doctor_id,
      appointment_dateTime,
      notes,
      treatment_provided,
      appointment_created_by,
      appointment_created_by_emp_id,
      appointment_updated_by,
      appointment_updated_by_emp_id,
      appointment_status,
      cancel_reason,
    } = req.body;

    const selectQuery = "SELECT * FROM appointments WHERE appoint_id";
    db.query(selectQuery, appointId, (err, result) => {
      if (err) {
        res.status(400).json({ success: false, message: err.message });
      }
      if (result && result.length > 0) {
        const updateFields = [];
        const updateValues = [];

        if (patient_uhid) {
          updateFields.push("patient_uhid = ?");
          updateValues.push(patient_uhid);
        }

        if (branch_name) {
          updateFields.push("branch_name = ?");
          updateValues.push(branch_name);
        }

        if (assigned_doctor_name) {
          updateFields.push("assigned_doctor_name = ?");
          updateValues.push(assigned_doctor_name);
        }

        if (assigned_doctor_id) {
          updateFields.push("assigned_doctor_id = ?");
          updateValues.push(assigned_doctor_id);
        }

        if (appointment_dateTime) {
          updateFields.push("appointment_dateTime = ?");
          updateValues.push(appointment_dateTime);
        }

        if (notes) {
          updateFields.push("notes = ?");
          updateValues.push(notes);
        }
        if (treatment_provided) {
          updateFields.push("treatment_provided = ?");
          updateValues.push(treatment_provided);
        }
        if (appointment_created_by) {
          updateFields.push("appointment_created_by = ?");
          updateValues.push(appointment_created_by);
        }

        if (appointment_created_by_emp_id) {
          updateFields.push("appointment_created_by_emp_id = ?");
          updateValues.push(appointment_created_by_emp_id);
        }

        if (appointment_updated_by) {
          updateFields.push("appointment_updated_by = ?");
          updateValues.push(appointment_updated_by);
        }

        if (appointment_updated_by_emp_id) {
          updateFields.push("appointment_updated_by_emp_id = ?");
          updateValues.push(appointment_updated_by_emp_id);
        }

        if (appointment_status) {
          updateFields.push("appointment_status = ?");
          updateValues.push(appointment_status);
        }

        if (cancel_reason) {
          updateFields.push("cancel_reason = ?");
          updateValues.push(cancel_reason);
        }

        const updateQuery = `UPDATE appointments SET ${updateFields.join(
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
              message: "Appointment Details updated successfully",
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
    const deleteQuery = "DELETE FROM appointments WHERE appoint_id = ?";
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

module.exports = {
  getBranch,
  EnrollEmployee,
  editEmployeeDetails,
  getEmployeeData,
  adminLoginUser,
  sendOtp,
  verifyOtp,
  resetPassword,
  appointmentData,
  getAvailableEmp,
  getPatientDetailsByBranch,
  getBillsByBranch,
  getPurInventoryByBranch,
  getEmployeeComplainByBranch,
  updateAppointData,
  deleteAppointData,
  insertTimelineEvent,
  deleteBills,
  getBillBYBillId,
  updateBillDetailsByBillId,
  deletePurInvoice,
  downloadBillRecById,
  sendOtpEmail,
};
