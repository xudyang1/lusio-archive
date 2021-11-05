

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

exports.addProfile = async (req, res, next) => {
    const newProfile = new UserProfile({
            description: req.body.description,
            bannerURI: req.body.bannerURI,
            profileIconURI: req.body.profileIconURI
    });
    try {
        const savedProfile = await newProfile.save();
        if (!savedProfile) throw Error('Something went wrong saving the user profile');
        
        res.status(200).json({
        userProfile: {
            id: savedProfile.id,
            description: savedProfile.description,
            bannerURI: savedProfile.bannerURI,
            profileIconURI: savedProfile.profileIconURI
        }
        });
    } catch (err) {
      if(err.name === 'ValidationError') {
        const messages = Object.values(err.errors).map(val => val.message);
  
        return res.status(400).json({
          success: false,
          msg: messages
        });
      } else {
        return res.status(500).json({
          success: false,
          msg: 'Server Error'
        });
      }
    }
  }
  

exports.deleteAccount= async (req, res, next) => {
    try {
      const profile = await UserProfile.findById(req.params.id);
  
      if(!profile) {
        return res.status(404).json({
          success: false,
          msg: 'No user profile found'
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