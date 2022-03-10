const multer = require('multer');
const multerGoogleStorage = require('multer-google-storage');
// 1. Add the diskStorage for multer adapter

// 2. save file into src/public/uploads/.....

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, 'src/public/uploads');
    },
    filename: (req, file, callback) => {
      callback(null, `${Date.now()}_${file.originalname}`);
    }
  })
});

const uploadCloud = multer({
  storage: multerGoogleStorage.storageEngine({
    autoRetry: true,
    bucket: 'iteso-courses-resources-uploader-multer-paep',
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    projectId: 'iteso-courses-resources',
    filename: (req, file, cb) => {
      cb(null, `profileImages/${Date.now()}_${file.originalname}`);
    },
    acl: 'publicRead'
  })
})

// 3. Export multer
module.exports = {upload, uploadCloud};