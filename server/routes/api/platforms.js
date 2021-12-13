const express = require('express');
const router = express.Router();
const { getPlatform, addPlatform, deletePlatform, updatePlatform, getPlatformList, updateBanner } = require('../../controllers/platformController');
const { softAuth, strictAuth } = require('../../middleware/auth');
const upload = require('../../middleware/upload');

router
  .route('/platformList')
  .get(softAuth, getPlatformList);

router
  .route('/platform/:platformId')
  .get(softAuth, getPlatform);

router.route('/platform/:platformId').delete(strictAuth, deletePlatform);
// .patch(updatePlatform);

router.route('/platform/edit/:platformId').patch(softAuth, updatePlatform);
router
  .route('/add')
  .post(strictAuth, addPlatform);

/**
 * @desc  Update image
 * @route POST api/platforms/platform/upload/:platformId
 * @access  Private
 * @middlewares  {strictAuth}: only owner can edit the profile
 *              {upload}: image upload middleware
 */
router
  .route('/platform/upload/:platformId')
  .post(strictAuth, upload, updateBanner);

module.exports = router;