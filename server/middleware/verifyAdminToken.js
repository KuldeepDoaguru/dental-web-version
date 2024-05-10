const jwt = require('jsonwebtoken');
const { db } = require("../db");
const dotenv = require("dotenv");
dotenv.config();

const verifyAdminToken = async (token) => {
    // try {
    //     const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
    //     // Check if the user exists in the database
    //     const query = 'SELECT * FROM admin WHERE id = ?';
    //     const params = [decoded.id];

    //     db.query(query, params, (error, results) => {
    //         if (error) {
    //             console.error('Error executing query:', error);
    //             throw error;
    //         }

    //         if (!results || results.length === 0) {
    //             console.error('User not found in the database');
    //             return null;
    //         }

    //         const user = results[0]; // Assuming user data is in the first row

    //         // The user object contains the user information
            
    //         return user;
    //     });
    // } catch (error) {
    //     console.error('Error verifying token:', error);
    //     return null;
    // }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Check if the user exists in the database
        const query = 'SELECT * FROM employee_register WHERE employee_ID = ?';
        const params = [decoded.id];

        return new Promise((resolve, reject) => {
            db.query(query, params, (error, results) => {
                if (error) {
                    console.error('Error executing query:', error);
                    reject(error);
                    return;
                }

                if (!results || results.length === 0) {
                    console.error('User not found in the database');
                    resolve(null);
                    return;
                }

                const user = results[0]; // Assuming user data is in the first row
                // The user object contains the user information
                resolve(user);
            });
        });
    } catch (error) {
        console.error('Error verifying token:', error);
        return null;
    }
};

module.exports = verifyAdminToken;