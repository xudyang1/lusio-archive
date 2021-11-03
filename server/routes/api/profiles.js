const express = require('express');
const router = express.Router();
const {getProfiles, addProfile, deleteAccount} = require('../../controllers/profileController');

router
  .route('/')
  .get(getProfiles)
  .post(addProfile);

router
  .route('/:id')
  .delete( deleteAccount);

module.exports = router;