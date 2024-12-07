const multer = require('multer');
const path = require('path');

// Set storage engine
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

// File filter (only allow images)
function fileFilter(req, file, cb) {
  const allowedTypes = /jpeg|jpg|png/;
  const mime = allowedTypes.test(file.mimetype);
  const ext = allowedTypes.test(path.extname(file.originalname).toLowerCase());

  if (mime && ext) {
    return cb(null, true);
  }
  cb(new Error('Only images are allowed (jpeg, jpg, png)'));
}

const upload = multer({
  storage,
  fileFilter,
});

module.exports = upload;
