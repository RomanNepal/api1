const multer = require("multer");

const myStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    let path = "uploads/";
    cb(null, path);
  },
  filename: (req, file, cb) => {
    let filename = Date.now() + file.originalname;
    cb(null, filename);
  },
});
const uploader = multer({
  storage: myStorage,
  limits: 5 * 1024 * 1024,
  fileFilter: (req, file, cb) => {
    var ext_parts = file.originalname.split(".");
    let ext = ext_parts.pop();
    if (ext == "jpg" || ext=='png') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
});
module.exports = uploader;
