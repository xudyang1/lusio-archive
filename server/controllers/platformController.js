const mongoose = require('mongoose');
const Platform = require('../models/Platform');
const UserProfile = require('../models/UserProfile');
const { nonNullJson, errorHandler } = require('../utils/jsonTool');

/**
 * TODO: 
 * @desc  Get platform list for main page
 * @route GET api/platforms/platformList
 * @access  Public
 * @detail  To minize the data size, only send certain attribtues;
 *          Content might be different based on the user type 
 *          and the preference (subscribed platforms selected first)
 * @format  req.header('x-auth-token'): JWT token || null
 *          res.data: {
 *                      platforms: [{ _id, name, owner, numSubscribers, quizzes, quizSections }]
 *                    }
 */
exports.getPlatformList = async (req, res, next) => {
  try {
    const selectedPlatform = await Platform.find({}, null, { $limit: 10 });
    
    return res.status(200).json({
      platforms: selectedPlatform
    });
  } catch (err) {
    //console.log(err);
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return errorHandler(res, 400, messages);
    }
    return errorHandler(res, 500, 'Server Error');
  }
};

/**
 * TODO: 
 * @desc  Get a platform for view
 * @route GET api/platforms/platform/:platformId
 * @access  Public
 * @detail  Guest view vs. Owner view vs. Admin view
 * @format  req.header('x-auth-token'): JWT token || null
 *          res.data: {
 *                      viewType: "GUEST_VIEW" || "OWNER_VIEW" || "ADMIN_VIEW"
 *                      platform: { ...platform data }
 *                    }
 */
exports.getPlatform = async (req, res, next) => {
  try {
    const selectedPlatform = await Platform.findById(req.params.platformId);

    //console.log("platform doc: ", selectedPlatform);
    if (!selectedPlatform) { return errorHandler(res, 404, 'The platform does not exist.'); }

    return res.status(200).json({
      viewType: req.viewType,
      platform: selectedPlatform
    });
  } catch (err) {
    //console.log(err);
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return errorHandler(res, 400, messages);
    }
    return errorHandler(res, 500, 'Server Error');
  }
};

/**
 * TODO: 
 * @desc  Create a platform by a logged user
 * @route POST api/platforms/add
 * @access  Private
 * @format  req.header('x-auth-token'): JWT token
 *          req.body: { platform: { name, description, bannerURI, backgroundURI } } (name must be provided)
 *          res.data: {
 *                      success: true,
 *                      platform: { ...platform data }
 *                    }
 */
exports.addPlatform = async (req, res, next) => {
  try {
    if (!req.body.platform) { return errorHandler(res, 400, 'Invalid payload'); }

    //set up
    const { name, description, bannerURI, backgroundURI } = req.body.platform;
    var format = { name, description, bannerURI, backgroundURI };
    // add owner profile id
    const profileId = req.user.profile;
    format = { ...format, owner: profileId };

    format = nonNullJson(format);
    if (!format.name) { return errorHandler(res, 400, 'You must provide a name.'); }

    const platform = new Platform({ ...format });
    const savedPlatform = await platform.save();

    if (!savedPlatform) { return errorHandler(res, 500, 'Unable to create the platform'); }

    //console.log("savedPlatform", savedPlatform);

    // append to profile
    const updatedProfile = await UserProfile.findByIdAndUpdate(profileId,
      { $push: { platformsCreated: savedPlatform._id } },
      { new: true });
    //console.log("updated: ", updatedProfile);
    //console.log(savedPlatform)
    return res.status(201).json({
      success: true,
      platform: savedPlatform
    });
  } catch (err) {
    //console.log(err);
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return errorHandler(res, 400, messages);
    }
    return errorHandler(res, 500, 'Server Error');
  }
};

/**
 * TODO: 
 * @desc  Update platform content by platform 
 * @route PATCH api/platforms/platform/edit/:platformId
 * @access  Private
 * @detail  Client side can only send limited updated content:
 *              edit existing: {owner, name, description, bannerURI, backgroundURI}
 *              add or delete: {admins, 
 *                              quizzes, 
 *                              quizSections}
 * 
 *  
 * 
 * @format  req.header('x-auth-token): JWT token 
 *          req.body: 
 *            { mode: "EDIT", platform: owner || name || description || iconURI || bannerURI: newValue } 
 *            Or
 *            { mode: "ADD" || "DELETE", platform: admins || quizzes || quizSections: {_id} }
 *          res.data:
 *            {
 *              success: true,
 *              mode: "EDIT" || "ADD" || "DELETE"
 *              content: { description || ... || quizSections: updated data }
 *            }
 */
exports.updatePlatform = async (req, res, next) => {
  try {
    // Note, to verify user id, use req.user.id rather than req.params.profileId
    //console.log(req.body)
    if (!req.body.platform) { return errorHandler(res, 400, 'Invalid payload, nothing is updated'); }

    // destructure

    const { owner, name, description, bannerURI, backgroundURI, admins, quizzes, quizSections } = req.body.platform;
    const MODE = req.body.mode;

    var provided = keys = updated = null;
    //console.log("req.viewtyoe", req.viewType);
    if (req.viewType !== 'OWNER_VIEW' && req.viewType !== 'ADMIN_VIEW') { return errorHandler(res, 403, 'No authorization'); }
    // set options
    const options = { runValidators: true, new: true };

    switch (MODE) {
      case "EDIT":
        provided = nonNullJson({ owner, name, description, bannerURI, backgroundURI });
        // transfer ownership require the owner the platform
        if (provided.owner && req.viewType !== 'OWNER_VIEW') { return errorHandler(res, 403, 'No authortization'); }

        keys = Object.keys(provided);
        updated = await Platform.findByIdAndUpdate(req.params.platformId, provided, options).select(keys);
        //console.log("updated", updated);
        break;
      case "ADD":
        provided = nonNullJson({ admins, quizzes, quizSections });
        keys = Object.keys(provided);
        //console.log('$pushAll provided: ', provided);
        updated = await Platform.findByIdAndUpdate(req.params.platformId, { $push: provided }, options).select(keys);
        break;
      case "DELETE":
        provided = nonNullJson({ admins, quizzes, quizSections });
        keys = Object.keys(provided);
        
        console.log(provided)
        updated = await Platform.findOneAndUpdate({_id: req.params.platformId}, { $pull: provided }, options).select(keys);
        //console.log(updated)
        break;
      default:
        // non matched mode
        return errorHandler(res, 400, 'You must provide a valid mode');
    }

    // no valid content provided
    if (!provided || Object.keys(provided).length === 0) { return errorHandler(res, 400, 'Invalid content provided, nothing is updated'); }
    // no query returned
    else if (!updated) { return errorHandler(res, 500, 'Unable to update the content'); }

    // success
    return res.status(200).json({
      success: true,
      mode: MODE,
      content: updated
    });
  } catch (err) {
    //console.log(err);
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return errorHandler(res, 400, messages);
    }
    return errorHandler(res, 500, 'Server Error');
  }
};

/**
 * TODO: 
 * @desc  Delete platform by platform owner
 * @route DELETE api/platforms/platform/:platformId
 * @access  Private
 * @format  req.header('x-auth-token'): JWT token
 *          res.data: { success: true, platform: { ...deletedPlatform } }
 */
exports.deletePlatform = async (req, res, next) => {
  try {
    // get viewer's created platforms list
    //console.log("req.user.profile", req.user.profile);
    const profile = await UserProfile.findById(req.user.profile).select('platformsCreated');
    //console.log("list", profile);
    var list = profile.platformsCreated.map(id => id.toString());

    // not the owner
    if (!list.includes(req.params.platformId)) { return errorHandler(res, 403, 'No authorization'); }

    const deletedPlatform = await Platform.findByIdAndRemove(req.params.platformId);
    console.log(deletedPlatform)
    if (!deletedPlatform) { return errorHandler(res, 404, 'Platform does not exist'); }

    // pull from the profile
    const updatedProfile = await UserProfile.findByIdAndUpdate(req.user.profile,
      { $pull: { platformsCreated: deletedPlatform._id } },
      { new: true });
    if (!updatedProfile) { return errorHandler(res, 404, 'Profile does not exist'); }

    return res.status(200).json({
      success: true,
      platform: deletedPlatform
    });
  } catch (err) {
    //console.log(err);
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return errorHandler(res, 400, messages);
    }
    return errorHandler(res, 500, 'Server Error');
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