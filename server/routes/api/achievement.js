const express = require('express');
const { getBadges } = require('../../controllers/achievementController');

const router = express.Router();

/**
 * @desc  Get badge cards information based on id
 * @route GET api/achievement/badges?id=1&id=2...
 * @access  Public
 */
router
    .route('/badges')
    .get(getBadges);


module.exports = router;