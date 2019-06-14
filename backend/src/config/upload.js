const multer = require('multer');
const path = require('path');

const UploadConfig = {
  storage: new multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', 'uploads'),
    filename: function(req, file, callback) {
      callback(null, file.originalname);
    }
  })
};

module.exports = UploadConfig;