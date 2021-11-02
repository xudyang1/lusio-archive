const UserProfile = require('../models/UserProfile');

// TODO: modify this sample later 
// @desc    Get all platforms
// @route   GET /api/platforms
// @access  Public
exports.getProfiles = async (req, res, next) => {
  try {
    const profiles = await UserProfile.find();

    return res.status(200).json({
      success: true,
      count: profiles.length,
      data: profiles
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: 'Server Error'
    });
  }
}
exports.deleteAccount= async (req, res, next) => {
    try {
      const profile = await UserProfile.findById(req.params.id);
  
      if(!profile) {
        return res.status(404).json({
          success: false,
          msg: 'No platform found'
        });
      }
  
      await profile.remove();
  
      return res.status(200).json({
        success: true,
        data: {}
      });
  
    } catch (err) {
      return res.status(500).json({
        success: false,
        msg: 'Server Error'
      });
    }
  }