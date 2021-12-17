const express = require('express');
const router = express.Router();
const { getImage } = require('../../controllers/imageController');

router
    .route('/img/:filename')
    .get(getImage);


module.exports = router;