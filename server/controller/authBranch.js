const express = require("express");
const db = require("../connect.js");
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');

const getBranch = (req, res) => {
    try {
        const sql = 'SELECT * FROM branches';

        db.query(sql, (err, results) => {
            if (err) {
                console.error('Error fetching Branches from MySql:', err);
                res.status(500).json({ error: "Error fetching Branches" });
            }
            else {
                res.status(200).json({ data: results, message: "Branches fetched successfully" })
            }

        })
    }
    catch (error) {
        console.error('Error fetching Branches from MySql:', error);
        res.status(500).json({
            success: false,
            message: "Error in fetched Branches",
            error: error.message,
        })

    }
}

const LoginDoctor = (req, res) => {
    try {
        const { email, password, branch_name } = req.body;
        if (!branch_name) {
            return res.status(404).json({
                success: false,
                message: "Please select branch"
            })
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
                        message: "Your Email is not approved, Please contact team for furthur assistance",
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
                        token: token
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

module.exports = { getBranch, LoginDoctor }; 