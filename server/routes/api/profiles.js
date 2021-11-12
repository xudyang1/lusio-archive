const express = require('express');
const router = express.Router();
const { getProfile, updateProfile } = require('../../controllers/profileController');
const { strictAuth, softAuth } = require('../../middleware/auth');

/**
 * @desc  Get a user's profile for view
 * @route GET api/profiles/profile/:profileId
 * @access  Public
 * @middleware  softAuth: send different data based on different authentication
 */
router
  .route('/profile/:profileId')
  .get(softAuth, getProfile);

/**
 * @desc  Update the profile for the owner
 * @route PATCH api/profiles/profile/edit/:profileId
 * @access  Private
 * @middleware  strictAuth: only owner can edit the profile
 */
router
  .route('/profile/edit/:profileId')
  .patch(strictAuth, updateProfile);

module.exports = router;