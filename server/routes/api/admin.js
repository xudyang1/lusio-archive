const express = require('express');
const { updateBadge, addBadge } = require('../../controllers/achievementController');
const { suspendUser, unSuspendUser } = require('../../controllers/adminController');
const upload = require('../../middleware/upload');
const router = express.Router();


/**
 * TODO: Middleware
 * @desc  Create a new badge
 * @route POST api/admin/addBadge
 * @access  Private
 */
router
    .route('/addBadge')
    .post(upload, addBadge);

/**
* TODO: Middleware
* @desc  Update an existing badge
* @route POST api/achievement/badges/:badgeId
* @access  Private
*/
router
    .route('/editBadge/:badgeId')
    .post(upload, updateBadge);

/**
* TODO: Middleware
* @desc suspend an user
* @route POST api/admin/suspendUser/:profileId
* @access  Private
*/
router
    .route('/suspendUser/:profileId')
    .post(suspendUser);

/**
* TODO: Middleware
* @desc unsuspend an user
* @route POST api/admin/unSuspendUser/:profileId
* @access  Private
*/
router
    .route('/unSuspendUser/:profileId')
    .post(unSuspendUser);

module.exports = router;