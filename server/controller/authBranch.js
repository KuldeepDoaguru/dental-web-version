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

const billPatientData = (req, res) => {
    // Fetch data from the specified tables
    db.query(`
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
    `, (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            return res.status(500).json({ error: 'An error occurred while fetching data' });
        }

        // Insert fetched data into new_table
        results.forEach(result => {
            db.query('INSERT INTO new_table SET ?', result, (err, insertResult) => {
                if (err) {
                    console.error('Error inserting data into new_table:', err);
                    return res.status(500).json({ error: 'An error occurred while inserting data into new_table' });
                }
                console.log('Data inserted into new_table:', insertResult);
            });
        });

        res.status(200).json({ message: 'Data inserted into new_table successfully' });
    });
};

const billPatientDataByAppId = (req, res) => {
    const appointId = req.params.appoint_id; // Get the appoint_id from the request parameters

    // Fetch data from the specified tables for the specified appoint_id
    db.query(`
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
    `, [appointId], (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            return res.status(500).json({ error: 'An error occurred while fetching data' });
        }

        // Insert fetched data into new_table
        results.forEach(result => {
            db.query('INSERT INTO new_table (uhid, branch_name, patient_name, mobileno, emailid, appoint_id, assigned_doctor_name, dental_treatment, cost_amt, medicine_name, dosage, total_amt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
                [result.uhid, result.branch_name, result.patient_name, result.mobileno, result.emailid, result.appoint_id, result.assigned_doctor_name, result.dental_treatments, result.cost_amt, result.medicine_names, result.dosages, result.total_amt], 
                (err, insertResult) => {
                    if (err) {
                        console.error('Error inserting data into new_table:', err);
                        return res.status(500).json({ error: 'An error occurred while inserting data into new_table' });
                    }
                    console.log('Data inserted into new_table:', insertResult);
                });
        });

        res.status(200).json({ success: true, data: results });
    });
}; 


module.exports = { getBranch, LoginDoctor, billPatientData, billPatientDataByAppId }; 