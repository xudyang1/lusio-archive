const Platform = require('../models/Platform');
const UserProfile = require('../models/UserProfile');

/**
 * TODO: 
 * @desc  Get a platform for view
 * @route GET api/platforms/platform/:platformId
 * @access  Public
 * @detail  Guest view vs. Owner view vs. Admin view
 */
exports.getPlatform = async (req, res, next) => {
  try {
    var VIEW_TYPE = 'GUEST_VIEW';
    // token verified, a logged user
    if (req.user) {
      // get Profile id for current viewer
      const selected = await UserAccount.findById(req.user.id).select('profile');
      const profileId = selected.profile.toString();
      // matched profileId: viewer is getting own profile
      if (profileId === req.params.id) {
        VIEW_TYPE = 'OWNER_VIEW';
      }
    }
    // don't send user id 
    const selectedProfile = await UserProfile.findById(req.params.id).select('-user');

    console.log("profile doc: ", selectedProfile);
    if (!selectedProfile) {
      return res.status(404).json({
        success: false,
        msg: 'The profile does not exist.'
      });
    }

    return res.status(200).json({
      type: VIEW_TYPE,
      profile: selectedProfile
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: 'Server Error'
    });
  }
};

/**
 * TODO: 
 * @desc  Create a platform by a logged user
 * @route POST api/platforms
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
    if (err.name === 'ValidationError') {
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
};

/**
 * TODO: 
 * @desc  Update platform content by platform 
 * @route PATCH api/platforms/platform/:platformId
 * @access  Private
 */
exports.updatePlatform = async (req, res, next) => {

};

/**
 * TODO: 
 * @desc  Delete platform by platform owner
 * @route DELETE api/platforms/platform/:platformId
 * @access  Private
 */
exports.deletePlatform = async (req, res, next) => {
  try {
    const platform = await Platform.findById(req.params.id);

    if (!platform) {
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
};;

// This should be in quizController.js
// /**
//  * TODO:
//  * @desc  Get platform quizlist card info for view at home page
//  * @route GET api/platform/platformQuizLists
//  * @access  Public
//  * @detail  For guest user: load most popular platforms;
//  *          For logged user: load subscribed platforms first, then most popular
//  */
//  exports.getPlatformQuizLists = async (req, res, next) => {
//   try {
//     // logged user
//     if(req.user.id){
//       const subscribed = await UserProfile.find()
//     }
//     const platform = await Platform.find();

//     return res.status(200).json({
//       success: true,
//       count: platforms.length,
//       data: platforms
//     });
//   } catch (err) {
//     return res.status(500).json({
//       success: false,
//       msg: 'Server Error'
//     });
//   }
// }