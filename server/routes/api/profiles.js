const express = require('express');
const router = express.Router();
const {getProfiles, deleteAccount} = require('../../controllers/profileController');

router
  .route('/')
  .get(getProfiles);

router
  .route('/:id')
  .delete(deleteAccount);

module.exports = router;