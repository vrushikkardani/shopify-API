const multer = require("multer");
const path = require("path");
const fs = require("fs");

/** code to configure user upload profile image starts */
const userUploadDirPath = path.join(
  __dirname,"..","/public/Documents"
);

let userImageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, userUploadDirPath);
  },
  filename: function (req, file, cb) {
    // let exploded_name = file.originalname.split(".");
  //  let ext = exploded_name[exploded_name.length - 1];
  //  cb(null, Date.now() + "." + ext);
   cb(null,file.originalname)
  },
});

let userImageUpload = multer({
  storage: userImageStorage, 
  limits: {
    fileSize: 15000000,// 5MB
  },
  fileFilter: function (req, file, cb) {
    return cb(null, true);
  },
  
}).array("files",10)

// var multipleUpload = userImageUpload.fields([{ name: "Media",maxCount:5},{name:'Image',maxCount:5}]);
//  const uploadFiles = userImageUpload.array("Media", 10);
/** END */
 
module.exports = {
  userImageUpload
  // multipleUpload
  // uploadFiles
};
