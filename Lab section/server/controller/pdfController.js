// const multer = require('multer');
// const path = require('path');

// // Multer Configuration
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/'); // Directory to save uploaded files
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); // Ensure the file extension is kept
//   },
// });

// const fileFilter = (req, file, cb) => {
//   // Allow only certain file types
//   const allowedExtensions = ['.pdf'];
//   const fileExtension = path.extname(file.originalname).toLowerCase();

//   if (allowedExtensions.includes(fileExtension)) {
//     // Accept the file
//     cb(null, true);
//   } else {
//     // Reject the file with an error message
//     cb(new Error('Invalid file type. Only PDF files are allowed.'));
//   }
// };

// const upload = multer({ storage, fileFilter });

// module.exports = upload;

const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory to save uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); // Ensure the file extension is kept
  },
});

const fileFilter = (req, file, cb) => {
  const allowedExtensions = ['.pdf', '.jpg', '.jpeg', '.webp', '.png'];
  const fileExtension = path.extname(file.originalname).toLowerCase();

  if (allowedExtensions.includes(fileExtension)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only PDF, JPG, JPEG, WEBP, and PNG files are allowed.'));
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;