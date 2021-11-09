const express = require('express');
const router = express.Router();
const {getProfiles, addProfile, updateProfile, deleteAccount, getProfile} = require('../../controllers/profileController');

router
  .route('/')
  .get(getProfiles);

router
  .route('/profile')
  .post(addProfile);

router
  .route('/profile/:id')
  .get(getProfile)
  .put(updateProfile)
  .delete(deleteAccount);

module.exports = router;