const express = require("express");
const db = require("../connect.js");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const  logger  = require('./logger.js');

const getBranch = (req, res) => {
  try {
    const sql = "SELECT * FROM branches";


    db.query(sql, (err, results) => {
      if (err) {
        console.error("Error fetching Branches from MySql:", err);
        res.status(500).json({ error: "Error fetching Branches" });
      } else {
        logger.registrationLogger.log("info", "Branches fetched successfully");
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
const getBranchDetailsByBranch = (req, res) => {
  try {
    const branch = req.params.branch;
    const getQuery = "SELECT * FROM branches WHERE branch_name = ?";
    db.query(getQuery, branch, (err, result) => {
      if (err) {
        logger.error("Error getting branch details");
        res.status(400).json({ success: false, message: err.message });
      }
      res.status(200).json(result);
    });
  } catch (error) {
    logger.error("Error getting branch details");
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
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
    logger.registrationLogger.log("error", "empty email or password");
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
            message: "Please login with Lab email",
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

        const token = JWT.sign({ id: user.employee_ID}, process.env.JWT_SECRET, {
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

// const getPatientDetail = async (req, res) => {
//   try {
//     const sql = "SELECT * FROM  patient_lab_details ";

//     const patientdetail = await new Promise((resolve, reject) => {
//       db.query(sql, (err, results) => {
//         if (err) {
//           reject(err);
//         } else {
//           resolve(results);
//         }
//       });
//     });

//     res.status(200).json(patientdetail);
//   } catch (error) {
//     console.error("Error processing request:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

const getPatientLabWithPatientDetails = (req, res) => {
  const sql = `
        SELECT 
            pt.testid,
            pt.tpid,
            pt.branch_name,
            pt.assigned_doctor_name,
            pt.lab_name,
            pt.test,
            pt.created_date,
            pt.patient_uhid, 
            pt.patient_name,
            pt.test_status,
            p.mobileno,
            p.age,
            p.dob,
            p.gender,
            p.emailid,
            p.weight
           
        FROM 
        patient_lab_details AS pt
        JOIN 
            patient_details AS p ON pt.patient_uhid = p.uhid
             ORDER BY 
        pt.testid DESC
    `;

  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error executing query:", err.stack);
      return res.status(500).json({ error: "Internal server error" });
    } else {
      // console.log('Query executed successfully');
      return res.status(200).json({
        message: "Get data from patient lab and patient_details",
        result,
      });
    }
  });
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



const getPatientLabWithLabTest = (req, res) => {
  const { test_name } = req.body;

  const sql = `SELECT test_cost FROM lab_tests WHERE test_name = ?`;

  db.query(sql, [test_name], (err, result) => {
    if (err) {
      console.error("Error executing query:", err.stack);
      return res.status(500).json({ error: "Internal server error" });
    } else {
      if (result.length === 0) {
        return res.status(404).json({ error: "Test not found" });
      } else {
        const testCost = result[0].test_cost;
        return res.status(200).json({ test_cost: testCost });
      }
    }
  });
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

const patientpayment= async (req, res) => {
  const { testId } = req.params;
  const {
    patient_uhid,
    patient_name,
   
    payment,
    payment_status,
    
  } = req.body;

  const sql = `INSERT INTO patient_lab_test_details (testid, patient_uhid, patient_name, payment,payment_status) VAlUES (?,?,?,?,?)`;
  db.query(
    sql,
    [
      testId,
      patient_uhid,
      patient_name,
      
      payment,
      payment_status,
      
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
          logger.registrationLogger.log("error", "Table is not Found");
          res.status(500).json({ message: "Table is not Found " });
        } else {
        logger.registrationLogger.log("info", "Successfully Updated Patient test detail");
          res
            .status(200)
            .json({ message: "Successfully Upadated Patient test detail" });
        }
      }
    );
  } catch (error) {
    console.log("Internal Server Error");
          logger.registrationLogger.log("error", "Internal Server Error");

    res.status(500).json({ message: "Internal Server Error " });
  }
};


const updatepatienttest = async (req, res) => {
  try {
    const { testId } = req.params;
    const { result, unit } = req.body;

    // Check if testId is provided
    if (!testId) {
      logger.registrationLogger.log("error", "testId is required");
      return res.status(400).json({ message: "testId is required" });
    }

    const sql = `UPDATE patient_lab_test_details SET result = ?, unit = ? WHERE testid = ?`;

    db.query(sql, [result, unit, testId], (error, result) => {
      if (error) {
        console.log("Table not found", error);
        logger.registrationLogger.log("error", "Table not found");
        res.status(500).json({ message: "Table not found" });
      } else {
        logger.registrationLogger.log("info", "Successfully updated patient test");
        res.status(200).json({ message: "Successfully updated patient test" });
      }
    });
  } catch (error) {
    console.log("Internal server error", error);
    logger.registrationLogger.log("error", "Internal server error");
    res.status(500).json({ message: "Internal server error" });
  }
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

// const updatepatienttestdetail = async (req, res) => {
//   try {
//     const { testId } = req.params;
//     const {
//       test,
//       result,
//       unit,
//       cost,
//       collection_date,
//       authenticate_date,
//       lab_type,
//     } = req.body;
//     const sql = `UPDATE  patient_lab_test_details SET test = ? , result = ? , unit = ? , cost = ?, collection_date = ? , authenticate_date = ?,lab_type = ? WHERE testid = ?`;

//     db.query(
//       sql,
//       [
//         test,
//         result,
//         unit,
//         cost,
//         collection_date,
//         authenticate_date,
//         lab_type,
//         testId,
//       ],
//       (error, result) => {
//         if (error) {
//           console.log("Table is not Found ", error);
//           res.status(500).json({ message: "Table is not Found " });
//         } else {
//           res
//             .status(200)
//             .json({ message: "Successfully Upadated Patient test detail" });
//         }
//       }
//     );
//   } catch (error) {
//     console.log("Internal Server Error");
//     res.status(500).json({ message: "Internal Server Error " });
//   }
// };

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
// const sendOtp = (req, res) => {
//   const { email } = req.body;

//   const selectQuery =
//   "SELECT * FROM employee_register WHERE employee_email = ?";

//   db.query(selectQuery, email, (err, result) => {
//     if (err) {
//       res.status(400).json({ success: false, message: err.message });
//     }
//    else {
//       return res
//         .status(404)
//         .json({ success: false, message: "email not found" });
//     }
//   })


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

//     const mailOptions = {
//       from: process.env.EMAILSENDER,
//       to: email,
//       subject: "Password Reset OTP",
//       text: `Your OTP for password reset is: ${OTP}`,
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
//


//smtp code in server
// const sendOtp = (req, res) => {
//   const { email } = req.body;

//   const selectQuery = "SELECT * FROM employee_register WHERE employee_email = ?";

//   db.query(selectQuery, email, (err, result) => {
//     if (err) {
//       return res.status(400).json({ success: false, message: err.message });
//     } else {
//       if (!result || result.length === 0) {
//         return res.status(404).json({ success: false, message: "Email not found" });
//       } else {
      
//       const user = result[0];
        
//         if (user.employee_role !== "lab-attendant") {
//           return res.status(401).json({
//             success: "false",
//             message: "Please login with Lab email",
//           });
//         }
        
//         else{
//         // Random OTP generation
//         function generateOTP(length) {
//           const chars = "0123456789";
//           let otp = "";

//           for (let i = 0; i < length; i++) {
//             const randomIndex = Math.floor(Math.random() * chars.length);
//             otp += chars[randomIndex];
//           }

//           return otp;
//         }

//         const OTP = generateOTP(6);

//         try {
//           const transporter = nodemailer.createTransport({
//             host: "doaguru.com",
//             port: 465,
//             secure: true,
//             auth: {
//               user: "info@doaguru.com",
//               pass: "dgwebmail@132",
//             },
//           });

//           const mailOptions = {
//             from: "info@doaguru.com",
//             to: email,
//             subject: "OTP for password reset",
//             text: `Your OTP to reset password is: ${OTP}`,
//           };

//           transporter.sendMail(mailOptions, (error, info) => {
//             if (error) {
//               console.error(error);
//               return res.status(500).json({ success: false, message: "An error occurred while sending the email." });
//             } else {
//               console.log("OTP sent:", info.response);

//               const updateQuery = "INSERT INTO otpcollections (email, code) VALUES (?, ?) ON DUPLICATE KEY UPDATE code = VALUES(code)";
//               db.query(updateQuery, [email, OTP], (upErr, upResult) => {
//                 if (upErr) {
//                   return res.status(400).json({ success: false, message: upErr.message });
//                 }
//                 return res.status(200).json({ message: "OTP sent successfully" });
//               });
//             }
//           });
//         } catch (error) {
//           console.log(error);
//           return res.status(500).json({ success: false, message: "An error occurred." });
//         }
//         }
//       }
//     }
//   });
// };


const sendOtp = (req, res) => {
  const { email } = req.body;

  const selectQuery = "SELECT * FROM employee_register WHERE employee_email = ?";

  db.query(selectQuery, email, (err, result) => {
    if (err) {
      return res.status(400).json({ success: false, message: err.message });
    } else {
      if (!result || result.length === 0) {
        return res.status(404).json({ success: false, message: "Email not found" });
        
      } 
      else {
        const user = result[0];
        
        if (user.employee_role !== "lab-attendant") {
          return res.status(401).json({
            success: "false",
            message: "Please login with Lab email",
          });
        }
        else{
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
              return res.status(500).json("An error occurred while sending the email.");
            } else {
              console.log("OTP sent:", info.response);

              const updateQuery = "INSERT INTO otpcollections (email, code) VALUES (?, ?) ON DUPLICATE KEY UPDATE code = VALUES(code)";
              db.query(updateQuery, [email, OTP], (upErr, upResult) => {
                if (upErr) {
                  return res.status(400).json({ success: false, message: upErr.message });
                }
                return res.status(200).json({ message: "OTP sent successfully" });
              });
            }
          });
        } catch (error) {
          console.log(error);
          return res.status(500).json("An error occurred.");
        }
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

const applyLeave = (req, res) => {
  try {
    const {
      employee_ID, 
    employee_name, 
    branch_name ,
    leave_dates ,
    leave_reason ,
    leave_status 
      
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
      branch_name ,
      leave_dates ,
      leave_reason ,
      leave_status 
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
const getLeaves = (req, res) => {
  const branch = req.params.branch;
  const employee_Id = req.params.employee_Id;
  try {
    const sql = "SELECT * FROM employee_leave WHERE branch_name = ? AND employee_ID = ? ORDER BY id DESC";

    db.query(sql, [branch,employee_Id], (err, results) => {
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


const MarkAttendanceLogin = (req, res) => {
  try {
    const {
      branch_name,
      employee_ID,
      employee_name,
      employee_designation,
      date,
      loginTime,
      availability
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

    const checkParams = [employee_ID,date ];

    db.query(checkQuery, checkParams, (err, result) => {
      if (err) {
        console.error("Error in checking attendance:", err);
        return res.status(500).json({
          success: false,
          message: "Internal server error"
        });
      }

      if (result.length > 0) {
        return res.status(400).json({
          success: false,
          message: "Attendance for this employee on today's date and login time already exists."
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
        availability
      ];

      db.query(addQuery, addParams, (err, result) => {
        if (err) {
          console.error("Error in marking login", err);
          return res.status(500).json({
            success: false,
            message: "Internal server error"
          });
        } else {
          console.log("login marked successfully");
          return res.status(200).json({
            success: true,
            message: "login marked successfully"
          });
        }
      });
    });
  } catch (error) {
    console.error("Error in marking login:", error);
    return res.status(500).json({
      success: false,
      message: "Error in marking login:",
      error: error.message
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
      availability
    } = req.body;

    // Check if the employee ID for today's date and logout time already exists
      

    const checkQuery = `
      SELECT * FROM employee_attendance 
      WHERE employee_ID = ? AND date = ? AND branch = ? AND allday_shift_logout_time IS NOT NULL `;

    const checkParams = [employee_ID, date,branch_name];
     
    db.query(checkQuery, checkParams, (err, result) => {
      if (err) {
        console.error("Error in checking attendance:", err);
        return res.status(500).json({
          success: false,
          message: "Internal server error"
        });
      }

      if (result.length > 0) {
        return res.status(400).json({
          success: false,
          message: "Attendance for this employee on today's date and logout time already exists."
        });
      }

      // If validation passes, proceed to update the attendance record
      const updateQuery = `
        UPDATE employee_attendance 
        SET allday_shift_logout_time = ? , availability = ?
        WHERE employee_ID = ? AND date = ?`;

      const updateParams = [logoutTime,availability, employee_ID, date];

      db.query(updateQuery, updateParams, (err, result) => {
        if (err) {
          console.error("Error in marking logout", err);
          return res.status(500).json({
            success: false,
            message: "Internal server error"
          });
        } else {
          console.log("Logout marked successfully");
          return res.status(200).json({
            success: true,
            message: "Logout marked successfully"
          });
        }
      });
    });
  } catch (error) {
    console.error("Error in marking logout:", error);
    return res.status(500).json({
      success: false,
      message: "Error in marking logout:",
      error: error.message
    });
  }
};

const getTodayAttendance = (req, res) => {
  try {
    const branch = req.params.branch;
    const employee_ID = req.params.employee_ID;
    const date = req.params.date;

    const sql = "SELECT * FROM employee_attendance WHERE branch = ? AND employee_ID = ? AND date = ?";

    db.query(sql, [branch,employee_ID,date], (err, results) => {
      if (err) {
        console.error("Error fetching attendance from MySql:", err);
        res.status(500).json({ error: "Error fetching Branch  attendance" });
      } else {
        res
          .status(200)
          .json({
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
    
    const sql = "SELECT * FROM employee_attendance WHERE branch = ? AND employee_ID = ? ORDER BY attendance_id DESC";

    db.query(sql, [branch,employee_ID], (err, results) => {
      if (err) {
        console.error("Error fetching attendance from MySql:", err);
        res.status(500).json({ error: "Error fetching Branch  attendance" });
      } else {
        res
          .status(200)
          .json({
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


const getBranchDetail = (req, res) => {
  try {
    const branch = req.params.branch;
    const sql = "SELECT * FROM branches WHERE branch_name = ?";

    db.query(sql, [branch], (err, results) => {
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
        res
          .status(200)
          .json({
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



module.exports = {
  getBranch,
  getBranchDetailsByBranch,
  LoginDoctor,
  // getPatientDetail,
  getPatientLabWithPatientDetails,
  patrientDetailbyid,
  patienttestdata,
  patienttestdatabyid,
  updateteststatus,
  updatepatienttestdetail,
  updatepatienttest,
  deletepatienttestdetail,
  patienttestnotes,
  getpatienttestnotesbyid,
  deletepatientest,
  editpatientest,
  getPatientTestDetail,

  resetPassword,
  verifyOtp,
  sendOtp,
  getPatientLabWithLabTest,
  patientpayment,
  applyLeave,
  getLeaves,
  MarkAttendanceLogin,
  MarkAttendanceLogout,
  getTodayAttendance,
  getAttendancebyempId,
  getBranchHoliday,
  getBranchDetail,
  getEmployeeData
};
