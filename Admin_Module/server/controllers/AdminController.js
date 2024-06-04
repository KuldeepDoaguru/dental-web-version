const express = require("express");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const JWT = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const { db } = require("../connect");
const logger = require("./logger");

dotenv.config();

const PORT = process.env.PORT;

const getBranch = (req, res) => {
  try {
    const getQuery = "SELECT * FROM branches";
    db.query(getQuery, (err, result) => {
      if (err) {
          logger.registrationLogger.log("error", "failed to fetched branch data");
        res.status(500).send(err);
      }
      logger.registrationLogger.log("info", "branch data fetched successfully");
      res.status(200).send(result);
    });
  } catch (error) {
      logger.registrationLogger.log("error", "Internal server error");
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const EnrollEmployee = (req, res) => {
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
      employee_education,
      speciality,
      language,
      experience,
      type_of,
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
        logger.registrationLogger.log("error", "All fields are required");
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
          logger.registrationLogger.log("error", "Error getting last emp ID");
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
              logger.registrationLogger.log("error", "Error checking if user exists");
            console.error("Error checking if user exists in MySQL:", err);
            res.status(500).json({ error: "Internal server error" });
          } else {
            // Check if there are any rows in the result
            if (result.length > 0) {
                logger.registrationLogger.log("error", "User already exists");
              return res.status(400).json({
                error: "User already exists.",
              });
            } else {
              // User not found, proceed with registration
              const insertUserQuery = `
                    INSERT INTO employee_register (
                      employee_ID, branch_name, employee_name,	employee_mobile, employee_email, gender, employee_designation,	employee_password, working_days,	employee_role, salary, address,	employee_status, morning_shift_start_time, morning_shift_end_time, evening_shift_start_time, evening_shift_end_time, allday_shift_start_time, allday_shift_end_time, availability, employee_picture, employee_education, speciality, language, experience, type_of) VALUES (?, ?, ?, ?, ?, ?, ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
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
                employee_education,
      speciality,
      language,
      experience,
      type_of
              ];

              db.query(
                insertUserQuery,
                insertUserParams,
                (insertErr, insertResult) => {
                  if (insertErr) {
                      logger.registrationLogger.log("error", "Error inserting user");
                    console.error("Error inserting user:", insertErr);
                    res.status(500).json({ error: "Internal server error" });
                  } else {
                      logger.registrationLogger.log("info", "Employee registered successfully");
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
      logger.registrationLogger.log("error", "Internal server error");
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
          logger.registrationLogger.log("error", "error in fetching employee details");
        res.status(400).send({ message: "error in fetching employee" });
      }
      logger.registrationLogger.log("info", "employee data fetched successfully");
      res.json(result);
    });
  } catch (error) {
      logger.registrationLogger.log("error", "Internal server error");
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
          logger.registrationLogger.log("error", "invalid branch or employee ID");
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
                logger.registrationLogger.log("error", "Failed to update employee details");
              return res.status(500).json({
                success: false,
                message: "Failed to update details",
              });
            } else {
                logger.registrationLogger.log("info", "employee details updated successfully");
              return res.status(200).json({
                success: true,
                message: "Details updated successfully",
              });
            }
          }
        );
      } else {
          logger.registrationLogger.log("error", "user not found");
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
    });
  } catch (error) {
      logger.registrationLogger.log("error", "internal server error");
    console.log(error);
    res.status(400).json({ success: false, message: "Internal Server Error" });
  }
};

const adminLoginUser = async (req, res) => {
  try {
    const { email, password, branch_name } = req.body;
    if (!branch_name) {
        logger.registrationLogger.log("error", "Please select branch");
      return res.status(404).json({
        success: false,
        message: "Please select branch",
      });
    }
    if (!email || !password) {
        logger.registrationLogger.log("error", "Invalid email or password");
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
            logger.registrationLogger.log("error", "invalid employee email");
          console.log(err);
          return res.status(500).json({
            success: false,
            message: "Internal server error",
          });
        }
        if (result.length === 0) {
            logger.registrationLogger.log("error", "Email is not registered please contact team for furthur assistance");
          return res.status(500).json({
            success: false,
            message:
              "Email is not registered Please contact team for furthur assistance",
          });
        }

        const user = result[0];

        const match = bcrypt.compareSync(password, user.employee_password);
        if (!match) {
            logger.registrationLogger.log("error", "invalid password");
          return res.status(401).json({
            success: "false",
            message: "Invalid password",
          });
        }

        if (!user.employee_role.includes("admin")) {
            logger.registrationLogger.log("error", "please login with admin email");
          return res.status(401).json({
            success: "false",
            message: "Please login with admin email",
          });
        }
        if (user.branch_name !== branch_name) {
            logger.registrationLogger.log("error", "please login with your branch");
          return res.status(401).json({
            success: "false",
            message: "Please login with your branch",
          });
        }

        if (user.employee_status !== "Approved") {
            logger.registrationLogger.log("error", "your email is not approved please contact team for furthur assistance");
          return res.status(401).json({
            success: "false",
            message:
              "Your Email is not approved, Please contact team for furthur assistance",
          });
        }

        const token = JWT.sign({ id: user.employee_ID }, process.env.JWT_SECRET, {
          expiresIn: "7d",
        });
        logger.registrationLogger.log("info", "Login successful");
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
      logger.registrationLogger.log("error", "Internal server error");
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
          logger.registrationLogger.log("error", "An error occured while sending the email");
        console.error(error);
        return res
          .status(500)
          .json("An error occurred while sending the email.");
      } else {
        console.log("OTP sent:", info.response);

        const selectQuery = "SELECT * FROM otpcollections WHERE email = ?";
        db.query(selectQuery, email, (err, result) => {
          if (err) {
              logger.registrationLogger.log("error", "invalid email");
            res.status(400).json({ success: false, message: err.message });
          }
          if (result && result.length > 0) {
            const updateQuery =
              "UPDATE otpcollections SET code = ? WHERE email = ?";
            db.query(updateQuery, [OTP, email], (upErr, upResult) => {
              if (upErr) {
                  logger.registrationLogger.log("error", "invalid email or otp");
                res
                  .status(400)
                  .json({ success: false, message: upErr.message });
              }
              logger.registrationLogger.log("info", "otp updated successfully");
              res.status(200).send(upResult);
            });
          } else {
            // Assuming you have a 'db' object for database operations
            db.query(
              "INSERT INTO otpcollections (email, code) VALUES (?, ?) ON DUPLICATE KEY UPDATE code = VALUES(code)",
              [email, OTP],
              (err, result) => {
                if (err) {
                    logger.registrationLogger.log("error", "Failed to store OTP");
                  console.error(err);
                  return res
                    .status(500)
                    .send({ message: "Failed to store OTP" });
                }
                logger.registrationLogger.log("info", "OTP sent successfully");
                res.status(200).json({ message: "OTP sent successfully" });
              }
            );
          }
        });
      }
    });
  } catch (error) {
      logger.registrationLogger.log("error", "Internal server error");
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
//      const transporter = nodemailer.createTransport({
//     host: "doaguru.com", 
//     port: 465,  
//     secure: true, 
//     auth: {
//       user: "info@doaguru.com",
//       pass: "dgwebmail@132",
//     },
//   });

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
//     host: "doaguru.com", 
//     port: 465,  
//     secure: true, 
//     auth: {
//       user: "info@doaguru.com",
//       pass: "dgwebmail@132",
//     },
//   });

//   const mailOptions = {
//       from: "info@doaguru.com",
//       to: email,
//       subject: "OTP for Password Reset",
//       text: `Your OTP for Password Reset is: ${OTP}`,
//     };

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
        logger.registrationLogger.log("error", "invalid email");
      return res.status(400).json({ success: false, message: err.message });
    } else {
      if (!result || result.length === 0) {
          logger.registrationLogger.log("error", "email not found");
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
                logger.registrationLogger.log("error", "An error occured while sending the email");
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
                    logger.registrationLogger.log("error", "invalid otp or email");
                  return res
                    .status(400)
                    .json({ success: false, message: upErr.message });
                }
                logger.registrationLogger.log("info", "OTP sent successfully");
                return res
                  .status(200)
                  .json({ message: "OTP sent successfully" });
              });
            }
          });
        } catch (error) {
            logger.registrationLogger.log("error", "Internal server error");
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
            logger.registrationLogger.log("error", "invalid email or otp");
          return res
            .status(500)
            .json({ success: false, message: "Internal server error" });
        }
        if (result.length > 0) {
            logger.registrationLogger.log("info", "OTP verification successful");
          return res
            .status(200)
            .json({ success: true, message: "Otp verification  success" });
        } else {
            logger.registrationLogger.log("error", "invalid email or OTP");
          return res
            .status(404)
            .json({ success: false, message: "Invalid email or OTP" });
        }
      }
    );
  } catch (error) {
      logger.registrationLogger.log("error", "Internal server error");
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
          logger.registrationLogger.log("error", "invalid email");
        res.status(400).json({ success: false, message: err.message });
      }
      if (result && result.length) {
        const saltRounds = 10;
        const hashedPassword = bcrypt.hashSync(password, saltRounds);
        console.log(hashedPassword);
        const updateQuery = `UPDATE employee_register SET employee_password = ? WHERE employee_email = ?`;
        db.query(updateQuery, [hashedPassword, email], (err, result) => {
          if (err) {
              logger.registrationLogger.log("error", "invalid email or password");
            return res
              .status(400)
              .json({ success: false, message: err.message });
          } else {
              logger.registrationLogger.log("info", "Details updated successfully");
            return res.status(200).json({
              success: true,
              message: "Details updated successfully",
            });
          }
        });
      } else {
          logger.registrationLogger.log("error", "email not found");
        return res
          .status(404)
          .json({ success: false, message: "email not found" });
      }
    });
  } catch (error) {
      logger.registrationLogger.log("error", "Internal server error");
    console.log(error);
    res.status(500).send({ success: false, message: "Internal server error" });
  }
};

const appointmentData = (req, res) => {
  const branchName = req.params.branch;
  try {
    // const getQuery =
    //   "SELECT * FROM appointments JOIN patient_details ON appointments.patient_uhid = patient_details.uhid WHERE appointments.branch_name = ?";
        const getQuery =
  "SELECT * FROM appointments JOIN patient_details ON appointments.patient_uhid = patient_details.uhid WHERE appointments.branch_name = ? ORDER BY appointments.appointment_dateTime DESC";
    db.query(getQuery, branchName, (err, result) => {
      if (err) {
          logger.registrationLogger.log("error", "invalid branch");
        console.error("Error retrieving appointment:", err); // Log the error for debugging
        return res
          .status(500)
          .json({ success: false, message: "Error getting appointment" });
      }
      logger.registrationLogger.log("info", "appointment data fetched successfully");
      res.status(200).send(result);
    });
  } catch (error) {
      logger.registrationLogger.log("error", "Internal server error");
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
          logger.registrationLogger.log("error", "invalid branch");
        res.status(400).json({ success: false, message: err.message });
      }
      logger.registrationLogger.log("info", "available employee's data fetched successfully");
      res.status(200).send(result);
    });
  } catch (error) {
      logger.registrationLogger.log("error", "Internal server error");
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getPatientDetailsByBranch = (req, res) => {
  try {
    const branch = req.params.branch;
    const getQuery = `SELECT * FROM patient_details WHERE branch_name = ? ORDER BY created_at DESC`;
    db.query(getQuery, branch, (err, result) => {
      if (err) {
          logger.registrationLogger.log("error", "invalid branch");
        res.status(400).send(err);
      }
      logger.registrationLogger.log("info", "patient details fetched successfully");
      res.status(200).send(result);
    });
  } catch (error) {
      logger.registrationLogger.log("error", "internal server error");
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getBillsByBranch = (req, res) => {
  try {
    const branch = req.params.branch;
    const selectQuery = "SELECT * FROM patient_bills WHERE branch_name = ? ORDER BY bill_date DESC";
    db.query(selectQuery, branch, (err, result) => {
      if (err) {
          logger.registrationLogger.log("error", "invalid branch");
        res.status(400).send({ success: false, error: err.message });
      }
      logger.registrationLogger.log("info", "bill data fetched successfully");
      res.status(200).send(result);
    });
  } catch (error) {
      logger.registrationLogger.log("error", "Internal server error");
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
          logger.registrationLogger.log("error", "invalid branch");
        res.status(400).send({ success: false, message: err.message });
      }
      logger.registrationLogger.log("info", "purchase inventory fetched successfully");
      res.status(200).send(result);
    });
  } catch (error) {
      logger.registrationLogger.log("error", "Internal server error");
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
          logger.registrationLogger.log("error", "invalid branch");
        res.status(400).send({ success: false, error: err.message });
      }
      logger.registrationLogger.log("info", "employee complaint fetched successfully");
      res.status(200).send(result);
    });
  } catch (error) {
      logger.registrationLogger.log("error", "internal server error");
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
          logger.registrationLogger.log("error", "invalid appoint ID");
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
              logger.registrationLogger.log("error", "Failed to update details");
            return res.status(500).json({
              success: false,
              message: "Failed to update details",
            });
          } else {
              logger.registrationLogger.log("info", "Appointment details updated successfully");
            return res.status(200).json({
              success: true,
              message: "Appointment Details updated successfully",
            });
          }
        });
      } else {
          logger.registrationLogger.log("error", "Appointment not found");
        return res.status(404).json({
          success: false,
          message: "Appointment not found",
        });
      }
    });
  } catch (error) {
      logger.registrationLogger.log("error", "Internal server error");
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
          logger.registrationLogger.log("error", "invalid appointment ID");
        res.status(500).json({ success: false, message: err.message });
      }
      logger.registrationLogger.log("info", "Appointment data deleted successfully");
      res
        .status(200)
        .send({ success: true, message: "Data deleted successfully" });
    });
  } catch (error) {
      logger.registrationLogger.log("error", "Internal server error");
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
            logger.registrationLogger.log("error", "Failed to insert data in patient timeline");
          res.status(400).json({ success: false, message: err.message });
        }
        logger.registrationLogger.log("info", "data inserted in the patient timeline");
        res.status(200).json({ success: true, result: result });
      }
    );
  } catch (error) {
      logger.registrationLogger.log("error", "Internal server error");
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
          logger.registrationLogger.log("error", "invalid bill ID");
        res.status(400).json({ success: false, message: err.message });
      }
      logger.registrationLogger.log("info", "bill deleted successfully");
      res.status(200).json({ success: true, message: "Successfully deleted" });
    });
  } catch (error) {
      logger.registrationLogger.log("error", "Internal server error");
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
          logger.registrationLogger.log("error", "invalid bill ID");
        res.status(400).json({ success: false, message: err.message });
      }
      logger.registrationLogger.log("info", "bill details fetched successfully");
      res.status(200).send(result);
    });
  } catch (error) {
      logger.registrationLogger.log("error", "internal server error");
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
          logger.registrationLogger.log("error", "invalid bill ID");
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
              logger.registrationLogger.log("error", "Failed to update details");
            return res.status(500).json({
              success: false,
              message: "Failed to update details",
            });
          } else {
              logger.registrationLogger.log("info", "Bill details updated successfully");
            return res.status(200).json({
              success: true,
              message: "Bill Details updated successfully",
            });
          }
        });
      } else {
          logger.registrationLogger.log("error", "bill not found");
        return res.status(404).json({
          success: false,
          message: "Bill not found",
        });
      }
    });
  } catch (error) {
      logger.registrationLogger.log("error", "internal server error");
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
          logger.registrationLogger.log("error", "invalid branch or purchase ID");
        res.status(400).json({ success: false, message: err.message });
      }
      logger.registrationLogger.log("info", "Purchase deleted successfully");
      res.status(200).send("Purchase Deleted Successfully");
    });
  } catch (error) {
      logger.registrationLogger.log("error", "internal server error");
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const downloadBillRecById = (req, res) => {
  try {
    const file = req.params.file;

    const filePath = path.join(__dirname, "../reciept_doc", file);
    console.log("File Path:", filePath);

    if (fs.existsSync(filePath)) {
      res.setHeader("Content-disposition", "attachment; filename=" + file);
      res.setHeader("Content-type", "application/octet-stream");

      const fileStream = fs.createReadStream(filePath);
      fileStream.on("error", (error) => {
          logger.registrationLogger.log("error", "Error reading file");
        console.error("Error reading file:", error);
        res.status(500).send("Internal server error");
      });
      fileStream.pipe(res);
    } else {
        logger.registrationLogger.log("error", "File not found");
      console.log("File not found:", file); // Add this line for debugging
      res.status(404).send("File not found");
    }
  } catch (error) {
      logger.registrationLogger.log("error", "internal server error");
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
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
          logger.registrationLogger.log("error", "Error in apply leave");
        console.error("Error in apply leave:", err);
        return res
          .status(500)
          .json({ success: false, message: "Internal server error" });
      } else {
          logger.registrationLogger.log("info", "Leave application successful");
        console.log("Leave apply successfully");
        return res.status(200).json({
          success: true,
          message: "Leave apply successfully",
        });
      }
    });
  } catch (error) {
      logger.registrationLogger.log("error", "internal server error");
    console.error("Error in apply leave:", error);
    return res.status(500).json({
      success: false,
      message: "Error in apply leave:",
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
          logger.registrationLogger.log("error", "invalid branch or empployee ID");
        console.error("Error fetching leaves from MySql:", err);
        res.status(500).json({ error: "Error fetching leaves" });
      } else {
          logger.registrationLogger.log("info", "Leaves fetched successfully");
        res
          .status(200)
          .json({ data: results, message: "leaves fetched successfully" });
      }
    });
  } catch (error) {
      logger.registrationLogger.log("error", "internal server error");
    console.error("Error fetching leaves from MySql:", error);
    res.status(500).json({
      success: false,
      message: "Error in fetched leaves",
      error: error.message,
    });
  }
};

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

    const todayDate = new Date().toISOString().slice(0, 10); // Get today's date in YYYY-MM-DD format

    // if (date.slice(0, 10) !== todayDate) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Attendance can only be marked for today's date."
    //   });
    // }

    // Check if the employee ID for today's date and login time already exists
    const checkQuery = `
      SELECT * FROM employee_attendance 
      WHERE employee_ID = ? AND date = ?`;

    const checkParams = [employee_ID, date];

    db.query(checkQuery, checkParams, (err, result) => {
      if (err) {
          logger.registrationLogger.log("error", "Error in checking attendance");
        console.error("Error in checking attendance:", err);
        return res.status(500).json({
          success: false,
          message: "Internal server error",
        });
      }

      if (result.length > 0) {
          logger.registrationLogger.log("error", "Attendance for this employee on today's date and login time already exists");
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
            logger.registrationLogger.log("error", "Error in marking login");
          console.error("Error in marking login", err);
          return res.status(500).json({
            success: false,
            message: "Internal server error",
          });
        } else {
            logger.registrationLogger.log("info", "Login marked successfully");
          console.log("login marked successfully");
          return res.status(200).json({
            success: true,
            message: "login marked successfully",
          });
        }
      });
    });
  } catch (error) {
      logger.registrationLogger.log("error", "internal server error");
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

    // Check if the employee ID for today's date and logout time already exists

    const checkQuery = `
      SELECT * FROM employee_attendance 
      WHERE employee_ID = ? AND date = ? AND branch = ? AND allday_shift_logout_time IS NOT NULL `;

    const checkParams = [employee_ID, date, branch_name];

    db.query(checkQuery, checkParams, (err, result) => {
      if (err) {
          logger.registrationLogger.log("error", "Error in checking attendance");
        console.error("Error in checking attendance:", err);
        return res.status(500).json({
          success: false,
          message: "Internal server error",
        });
      }

      if (result.length > 0) {
          logger.registrationLogger.log("error", "Attendance for this employee on today's date and logout time already exists");
        return res.status(400).json({
          success: false,
          message:
            "Attendance for this employee on today's date and logout time already exists.",
        });
      }

      // If validation passes, proceed to update the attendance record
      const updateQuery = `
        UPDATE employee_attendance 
        SET allday_shift_logout_time = ? , availability = ?
        WHERE employee_ID = ? AND date = ?`;

      const updateParams = [logoutTime, availability, employee_ID, date];

      db.query(updateQuery, updateParams, (err, result) => {
        if (err) {
            logger.registrationLogger.log("error", "Error in marking logout");
          console.error("Error in marking logout", err);
          return res.status(500).json({
            success: false,
            message: "Internal server error",
          });
        } else {
            logger.registrationLogger.log("info", "Logout marked successfully");
          console.log("Logout marked successfully");
          return res.status(200).json({
            success: true,
            message: "Logout marked successfully",
          });
        }
      });
    });
  } catch (error) {
      logger.registrationLogger.log("error", "internal server error");
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
          logger.registrationLogger.log("error", "invalid input details");
        console.error("Error fetching attendance from MySql:", err);
        res.status(500).json({ error: "Error fetching Branch  attendance" });
      } else {
          logger.registrationLogger.log("info", "attendance fetched successfully");
        res.status(200).json({
          data: results,
          message: " attendance fetched successfully",
        });
      }
    });
  } catch (error) {
      logger.registrationLogger.log("error", "Internal server error");
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
          logger.registrationLogger.log("error", "error fetching attendance");
        console.error("Error fetching attendance from MySql:", err);
        res.status(500).json({ error: "Error fetching Branch  attendance" });
      } else {
          logger.registrationLogger.log("info", "attendance fetched successfully");
        res.status(200).json({
          data: results,
          message: " attendance fetched successfully",
        });
      }
    });
  } catch (error) {
      logger.registrationLogger.log("error", "Internal server error");
    console.error("Error fetching  attendance from MySql:", error);
    res.status(500).json({
      success: false,
      message: "Error in fetched  attendance",
      error: error.message,
    });
  }
};

const getLeaveList = (req, res) => {
  try {
    const selectQuery = "SELECT * FROM employee_leave ORDER BY created_at DESC";
    db.query(selectQuery, (err, result) => {
      if (err) {
          logger.registrationLogger.log("error", "failed to fetch leave list");
        return res.status(400).json({ success: false, message: err.message });
      } else {
          logger.registrationLogger.log("info", "leave list fetched successfully");
        return res.status(200).send(result);
      }
    });
  } catch (error) {
      logger.registrationLogger.log("error", "internal server error");
    console.log(error);

    res.status(500).json({ success: false, message: "internal server error" });
  }
};

const approveLeave = (req, res) => {
  try {
    const lid = req.params.lid;
    const status = req.body.status;
    const updateQuery =
      "UPDATE employee_leave SET leave_status = ? WHERE id = ?";
    db.query(updateQuery, [status, lid], (err, result) => {
      if (err) {
          logger.registrationLogger.log("error", "invalid leave ID");
        return res.status(400).json({ success: false, message: err.message });
      } else {
          logger.registrationLogger.log("info", "Leave approved successfully");
        return res
          .status(200)
          .json({ success: true, message: "leave approved successfully" });
      }
    });
  } catch (error) {
      logger.registrationLogger.log("error", "internal server error");
    console.log(error);
    es.status(500).json({ success: false, message: "internal server error" });
  }
};

const getLabData = (req, res) => {
  try {
    const branch = req.params.branch;
    const selectQuery =
      "SELECT * FROM patient_lab_test_details JOIN patient_lab_details ON patient_lab_details.testid = patient_lab_test_details.testid WHERE branch_name = ? AND patient_lab_test_details.payment_status = 'done'";
    db.query(selectQuery, branch, (err, result) => {
      if (err) {
        res.status(400).json({ success: false, message: err.message });
      }
      res.status(200).send(result);
    });
  } catch (error) {
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
    applyLeave,
  getLeaves,
  MarkAttendanceLogin,
  MarkAttendanceLogout,
  getTodayAttendance,
  getAttendancebyempId,
    approveLeave,
  getLeaveList,
  getLabData,
   
};
