const express = require("express");
const db = require("../connect.js");
const path = require('path');

const uploadImage = (req, res) => {
    try {
        // Check if all files are uploaded
        if (!req.files['header'] || !req.files['footer'] || !req.files['seal']) {
            return res.status(400).send('Missing image files');
        }

        const headerImagePath = req.files['header'][0].filename;
        const footerImagePath = req.files['footer'][0].filename;
        const sealImagePath = req.files['seal'][0].filename;

        // Construct URL paths for serving images
        const headerImageUrl = `http://localhost:8888/uploads/${headerImagePath}`;
        const footerImageUrl = `http://localhost:8888/uploads/${footerImagePath}`;
        const sealImageUrl = `http://localhost:8888/uploads/${sealImagePath}`;

        // Insert image URLs into the database
        const query = 'INSERT INTO dental_prescriptionimg (header, footer, seal) VALUES (?, ?, ?)';
        db.query(query, [headerImageUrl, footerImageUrl, sealImageUrl], (err, results) => {
            if (err) {
                console.error('Error inserting image URLs into database: ', err);
                return res.status(500).send('Internal Server Error');
            }
            res.send('Images uploaded successfully and URLs saved in the database.');
        });
    } catch (error) {
        console.error('Error uploading images:', error);
        res.status(500).send('Internal Server Error');
    }
}

const getUploadedImages = (req, res) => {
    // Query the database to retrieve image URLs
    const query = 'SELECT header, footer, seal FROM dental_prescriptionimg';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error retrieving image URLs from database: ', err);
            return res.status(500).send('Internal Server Error');
        }
        // Extract image URLs from the query results
        const imageUrls = results.map(row => ({
            header: row.header,
            footer: row.footer,
            seal: row.seal
        }));
        // Send the image URLs as a JSON response
        res.json(imageUrls);
    });
}

module.exports = {uploadImage, getUploadedImages}; 