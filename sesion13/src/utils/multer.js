const multer = require('multer');
const multerGoogleStorage = require("multer-google-storage");

const uploadGCS = multer({
  storage: multerGoogleStorage.storageEngine({
    autoRetry: true,
    bucket: 'iteso-courses-resources-multer-upload',
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    projectId: 'iteso-courses-resources',
    filename: (req, file, cb) => {
      cb(null, `profileImages/${Date.now()}_${file.originalname}`);
    },
    acl: 'publicRead'
  })
});


const uploadLocal = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'src/public/uploads');
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}_${file.originalname}`);
    }
  })
});

module.exports = {uploadGCS, uploadLocal};
