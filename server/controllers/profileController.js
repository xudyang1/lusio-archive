const UserProfile = require('../models/UserProfile');

// TODO: modify this sample later 
// @desc    Get all platforms
// @route   GET /api/platforms
// @access  Public
exports.getProfile = async (req, res, next) => {
  try {
    const profile = await UserProfile.find();

    return res.status(200).json({
      success: true,
      count: profile.length,
      data: profile
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: 'Server Error'
    });
  }
}