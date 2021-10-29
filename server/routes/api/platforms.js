const express = require('express');
const router = express.Router();
const {getPlatforms, addPlatform, deletePlatform} = require('../../controllers/platformController');

router
  .route('/')
  .get(getPlatforms)
  .post(addPlatform);

router
  .route('/:id')
  .delete(deletePlatform);

module.exports = router;