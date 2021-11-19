const express = require('express');
const router = express.Router();
const {getPlatform, addPlatform, deletePlatform, updatePlatform, getPlatformList} = require('../../controllers/platformController');
const { softAuth, strictAuth } = require('../../middleware/auth');

router
  .route('/platformList')
  .get(softAuth, getPlatformList)

router
  .route('/platform/:platformId')
  .get(softAuth, getPlatform)
  
router.route('/platform/:platformId').delete(strictAuth, deletePlatform)
  // .patch(updatePlatform);

router.route('/platform/edit/:platformId').patch(softAuth, updatePlatform)
router
  .route('/add')  
  .post(strictAuth, addPlatform);

module.exports = router;