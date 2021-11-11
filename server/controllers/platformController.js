const mongoose = require('mongoose');
const Platform = require('../models/Platform');
const UserProfile = require('../models/UserProfile');
const { nonNullJson } = require('../util/jsonTool');

/**
 * TODO: 
 * @desc  Get a platform for view
 * @route GET api/platforms/platform/:platformId
 * @access  Public
 * @detail  Guest view vs. Owner view vs. Admin view
 */
exports.getPlatform = async (req, res, next) => {
  try {
    const selectedPlatform = await Platform.findById(req.params.platformId);

    console.log("platform doc: ", selectedPlatform);
    if (!selectedPlatform) {
      return res.status(404).json({
        success: false,
        msg: 'The platform does not exist.'
      });
    }

    return res.status(200).json({
      type: req.viewType,
      platform: selectedPlatform
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
 * @route POST api/platforms/add
 * @access  Private
 */
exports.addPlatform = async (req, res, next) => {
  try {
    if (!req.body.platform) {
      return res.status(400).json({
        success: false,
        msg: 'Invalid payload'
      });
    }
    //set up
    const { name, description, bannerURI, backgroundURI } = req.body.platform;
    var format = { name, description, bannerURI, backgroundURI };
    // add owner profile id
    const profile = await UserProfile.findOne({ owner: req.user.id }).select("_id");
    console.log("profile...", profile);
    const profileId = profile._id;
    format = { ...format, owner: profileId };

    format = nonNullJson(format);

    const platform = new Platform({
      ...format
    });
    const savedPlatform = await platform.save();
    if (!savedPlatform) {
      return res.status(400).json({
        success: false,
        msg: 'Unable to create the platform'
      });
    }
    console.log("savedPlatform", savedPlatform);
    // append to profile
    const updatedProfile = await UserProfile.findByIdAndUpdate(profileId,
      { $push: { platformsCreated: savedPlatform._id } },
      { new: true });
    console.log("updated: ", updatedProfile);
    return res.status(201).json({
      success: true,
      platform: savedPlatform
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      msg: 'Server Error'
    });
  }
};

/**
 * TODO: 
 * @desc  Update platform content by platform 
 * @route PATCH api/platforms/platform/edit/:platformId
 * @access  Private
 * @detail  Client side can only send limited updated content:
 *              edit existing: {owner, description, bannerURI, backgroundURI}
 *              add or delete: {admins, 
 *                              quizzes, 
 *                              quizSections}
 * 
 *  
 * 
 * @payload req.body = 
 *      { mode: "EDIT", platform: owner | description | iconURI | bannerURI } 
 *  Or
 *      {
 *        mode: "ADD" | "DELETE", 
 *        platform: admins | quizzes | quizSections
 *      }
 */
exports.updatePlatform = async (req, res, next) => {
  try {
    // Note, to verify user id, use req.user.id rather than req.params.profileId

    if (!req.body.platform) {
      return res.status(400).json({
        success: false,
        msg: 'Invalid payload, nothing is updated'
      });
    }

    // destructure

    const { owner, description, bannerURI, backgroundURI, admins, quizzes, quizSections } = req.body.platform;
    const MODE = req.body.mode;

    var provided = keys = updated = null;
    console.log("req.viewtyoe", req.viewType)
    if(req.viewType!=='OWNER_VIEW' && req.viewType!=='ADMIN_VIEW'){
      return res.status(400).json({
        success: false,
        msg: 'No authorization'
      });
    }
    // set options
    const options = { runValidators: true, new: true };

    switch (MODE) {
      case "EDIT":
        provided = { owner, description, bannerURI, backgroundURI };
        keys = Object.keys(provided);
        updated = await Platform.findByIdAndUpdate(req.params.platformId, provided, options).select(keys);
        console.log("updated", updated);
        break;
      case "ADD":
        provided = { admins, quizzes, quizSections  };
        keys = Object.keys(provided);
        console.log('$pushAll provided: ', provided);
        updated = await Platform.findByIdAndUpdate(req.params.platformId, { $push: provided }, options).select(keys);
        break;
      case "DELETE":
        provided = { admins, quizzes, quizSections  };
        keys = Object.keys(provided);
        updated = await Platform.findByIdAndUpdate(req.params.platformId, { $pullAll: provided }, options).select(keys);
        break;
      default:
        // non matched mode
        return res.status(400).json({
          success: false,
          msg: 'You must provide a valid mode'
        });
    }
    // no valid content provided
    if (!provided || Object.keys(provided).length === 0) {
      return res.status(400).json({
        success: false,
        msg: 'Invalid content provided, nothing is updated'
      });
    }
    // no query returned
    else if (!updated) {
      return res.status(400).json({
        success: false,
        msg: 'Unable to update the content'
      });
    }
    // success
    return res.status(200).json({
      success: true,
      mode: MODE,
      content: updated
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      msg: 'Server Error'
    });
  }
};

/**
 * TODO: 
 * @desc  Delete platform by platform owner
 * @route DELETE api/platforms/platform/:platformId
 * @access  Private
 */
exports.deletePlatform = async (req, res, next) => {
  try {
    // get viewer's created platforms list
    console.log("req.user.profile", req.user.profile);
    const profile = await UserProfile.findById(req.user.profile).select('platformsCreated');
    console.log("list", profile);
    var list = profile.platformsCreated;
    list = list.map(id => id.toString());
    if (!list.includes(req.params.platformId)) {
      return res.status(400).json({
        success: false,
        msg: 'No authorization to perform such operation'
      });
    }
    const deletedPlatform = await Platform.findByIdAndRemove(req.params.platformId);
    if (!deletedPlatform) {
      return res.status(404).json({
        success: false,
        msg: 'Platform does not exist'
      });
    }
    // pull from the profile
    const updatedProfile = await UserProfile.findOneAndUpdate({ owner: req.user.id },
      { $pull: { platformsCreated: deletedPlatform._id } },
      { new: true });
    if (!updatedProfile) {
      return res.status(404).json({
        success: false,
        msg: 'Profile does not exist'
      });
    }
    return res.status(200).json({
      success: true,
      platform: deletedPlatform
    });

  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      msg: 'Server Error'
    });
  }
};

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