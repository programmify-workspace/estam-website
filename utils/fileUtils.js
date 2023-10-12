const multer = require('multer');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // destination folder for the file uploads
    const dirPath = path.join(__dirname, '..', 'public' ,'uploads', 'applicants');
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true }); // Create directory and its parent directories if they don't exist
    }
    cb(null, dirPath);
  },
  filename: function (req, file, cb) {
    // Set the filename for uploaded files
    const uniqueName = uuidv4() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage: storage });

module.exports = upload;