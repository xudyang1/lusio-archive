const express = require('express');
const router = express.Router();
const {getPlatform, addPlatform, deletePlatform} = require('../../controllers/platformController');
const { softAuth, strictAuth } = require('../../middleware/auth');

router
  .route('/:id')
  .get(softAuth, getPlatform)
  // .patch(updatePlatform);

// router
//   .route('/:id')  
//   .delete(deletePlatform);

module.exports = router;