import multer from "multer";
// import path from "path";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 1024 * 1024 * 10, // 10 MBs
  },
});

// const upload = multer({
//   storage: multer.diskStorage({
//     destination: path.join(__dirname, "..", "..", "uploads"),
//     filename: function (req, file, cb) {
//       const fileName = `${Date.now()}-${file.originalname}`;
//       cb(null, fileName);
//     },
//   }),
// });

export default upload;
