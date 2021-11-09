const Platform = require('../models/Platform');
const UserProfile = require('../models/UserProfile');

/**
 * TODO: 
 * @desc  Get a platform for view
 * @route GET api/platform
 * @access  Public
 */
exports.getPlatform = async (req, res, next) => {
  try {
    const platform = await Platform.find();

    return res.status(200).json({
      success: true,
      count: platforms.length,
      data: platforms
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: 'Server Error'
    });
  }
}

/**
 * TODO: 
 * @desc  Create a platform by a logged user
 * @route POST api/platform
 * @access  Private
 */
exports.createPlatform = async (req, res, next) => {
  try {
    const { name } = req.body;

    const platform = await Platform.create(req.body);
  
    return res.status(201).json({
      success: true,
      data: platform
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

/**
 * TODO: 
 * @desc  Delete platform by platform owner
 * @route DELETE api/aplatform/:id
 * @access  Private
 */
exports.deletePlatform = async (req, res, next) => {
  try {
    const platform = await Platform.findById(req.params.id);

    if(!platform) {
      return res.status(404).json({
        success: false,
        msg: 'No platform found'
      });
    }

    await platform.remove();

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

/**
 * TODO: 
 * @desc  Get platform quizlist card info for view at home page
 * @route GET api/platform/platformQuizLists
 * @access  Public
 * @detail  For guest user: load most popular platforms;
 *          For logged user: load subscribed platforms first, then most popular
 */
 exports.getPlatformQuizLists = async (req, res, next) => {
  try {
    // logged user
    if(req.user.id){
      const subscribed = await UserProfile.find()
    }
    const platform = await Platform.find();

    return res.status(200).json({
      success: true,
      count: platforms.length,
      data: platforms
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: 'Server Error'
    });
  }
}