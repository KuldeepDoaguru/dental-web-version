// const express = require("express");
// const dotenv = require("dotenv");
// const bcrypt = require("bcrypt");
// const nodemailer = require("nodemailer");
// const { db } = require("../connect");
// const JWT = require("jsonwebtoken");
// const fs = require("fs");
// const path = require("path");

// dotenv.config();

// const PORT = process.env.PORT;

// const getEmployeeListByBranchByID = (req, res) => {
//   try {
//     const slid = req.params.slid;
//     const branch = req.params.branch;
//     const selectQuery =
//       "SELECT * FROM staff_salary JOIN employee_register ON staff_salary.employee_ID = employee_register.employee_ID WHERE staff_salary.branch_name = ? AND sl_id = ?";
//     db.query(selectQuery, [branch, slid], (err, result) => {
//       if (err) {
//         res.status(400).json({ success: false, message: err.message });
//       }
//       res.status(200).send(result);
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ success: false, message: "Internal server error" });
//   }
// };

// module.exports = { getEmployeeListByBranchByID };
