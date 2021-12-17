const multer = require('multer');
const path = require("path");
const { GridFsStorage } = require('multer-gridfs-storage');

// WIP
const storage = new GridFsStorage({
    url: process.env.MONGO_URI,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
        const match = ["image/png", "image/jpeg"];

        if (match.indexOf(file.mimetype) === -1) {
            const filename = `${file.originalname}`;
            return filename;
        }

        return {
            bucketName: "photos",
            filename: `${file.originalname}`,
        };
    },
});

// set storage => file name and destination
// Set The Storage Engine
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, "./uploads/");
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + path.extname(file.originalname));
//     }
// });

function checkFileType(file, cb) {
    // Allowed image
    const types = "image/*";

    if (file.mimetype.match(types)) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}

// Init Upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 2000000 },
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
}).single('image');

module.exports = upload;