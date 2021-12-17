const { errorHandler, nonNullJson } = require("../utils/jsonTool");
const mongoose = require('mongoose');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const dotenv = require('dotenv');

// Create mongo connection
const conn = mongoose.createConnection(process.env.MONGO_URI);

// Init gfs
let gfs;

conn.once('open', () => {
  // Init stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('photos');
});

exports.getImage = async (req, res) => {
    console.log("GETTING IMAGE")
    try {
        const file = await conn.db.collection('photos.files').findOne({ filename: req.params.filename })
        const fileData = await conn.db.collection('photos.chunks').find({files_id: file._id }).sort({n: 1}).toArray()

        let finalData = []
        fileData.forEach(element => {
            finalData.push(element.data.toString('base64'))
        });
        let finalurl = 'data:' + file.contentType + ';base64,' 
          + finalData.join('');

        return res.status(200).json({
            viewType: req.viewType,
            imgurl: finalurl
        });

    } catch (err) {
        console.log(err)
        return errorHandler(res, 500, 'Server Error');
    }
}