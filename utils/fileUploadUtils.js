import multer from 'multer';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // destination folder for the file uploads
    const dirPath = './uploads/applicants';
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath);
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

export default upload;