const express = require('express');
const router = express.Router();
const { getProfile, updateProfile, getProfileCards, updateImage } = require('../../controllers/profileController');
const { strictAuth, softAuth } = require('../../middleware/auth');
const upload = require('../../middleware/upload');

/**
 * @desc  Retrive a list of user profile card information
 * @route GET api/profiles/profileCards?id=1&id=2&...
 * @access  Public
 */
router
  .route('/profileCards')
  .get(getProfileCards);

/**
 * @desc  Get a user's profile for view
 * @route GET api/profiles/profile/:profileId
 * @access  Public
 * @middleware  {softAuth}: send different data based on different authentication
 */
router
  .route('/profile/:profileId')
  .get(softAuth, getProfile);

/**
 * @desc  Update the profile for the owner
 * @route PATCH api/profiles/profile/edit/:profileId
 * @access  Private
 * @middleware  {strictAuth}: only owner can edit the profile
 */
router
  .route('/profile/edit/:profileId')
  .patch(strictAuth, updateProfile);


/**
 * @desc  Update image
 * @route POST api/profiles/profile/upload/:profileId
 * @access  Private
 * @middlewares  {strictAuth}: only owner can edit the profile
 *              {upload}: image upload middleware
 */
router
  .route('/profile/upload/:profileId')
  .post(strictAuth, upload, updateImage);

module.exports = router;