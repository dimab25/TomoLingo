import multer from "multer";
import path from "path";
const storage = multer.diskStorage({});

const limits= {fileSize:5*1024*1024 }


const fileFilter = (req, file, cb) => {
  console.log("file :>> ", file);
  //  check the file extension
  let extension = path.extname(file.originalname);
  if (extension !== ".png" && extension !== ".jpg" && extension !== ".jpeg") {
    // To reject this file pass `false`, like so:
    cb(null, false);
    console.log("file extension not supported"); // You can always pass an error if something goes wrong:
    // cb(new Error("I don't have a clue!"));
  } else {
    // To accept the file pass `true`, like so:
    cb(null, true);console.log("file extension supported");
  }
  
};

const multerUpload = multer({ storage: storage, fileFilter: fileFilter, limits:limits });

export default multerUpload;
