const express = require('express');
const { getBadges, addBadge, updateBadge, /*updateExp*/ } = require('../../controllers/achievementController');
const { strictAuth } = require('../../middleware/auth')
const router = express.Router();

/**
 * @desc  Get badge cards information based on id
 * @route GET api/achievement/badges?id=1&id=2...
 * @access  Public
 */
router
    .route('/badges')
    .get(getBadges);

/**
 * TODO: Middleware
 * @desc  Create a new badge
 * @route POST api/achievement/badges
 * @access  Private
 */
router
    .route('/badges')
    .post(addBadge);

/**
 * TODO: Middleware
 * @desc  Update an existing badge
 * @route PATCH api/achievement/badges/:badgeId
 * @access  Private
 */
router
    .route('/badges/:badgeId')
    .patch(updateBadge);


// router
//     .route('/exp')
//     .patch(strictAuth, updateExp);

module.exports = router;