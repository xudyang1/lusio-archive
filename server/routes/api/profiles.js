const express = require('express');
const router = express.Router();
const {getProfiles, addProfile, updateProfile, deleteAccount} = require('../../controllers/profileController');

router
  .route('/')
  .get(getProfiles);

router
    .route('/add')
    .post(addProfile);

router
  .route('/add/:id')
  .put(updateProfile);

router
  .route('/:id')
  .delete( deleteAccount);

module.exports = router;