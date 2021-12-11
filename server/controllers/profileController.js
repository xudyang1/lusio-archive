const UserProfile = require('../models/UserProfile');
const { dropEntries, nonNullJson, errorHandler } = require('../utils/jsonTool');

/**
 * TODO: 
 * @desc  Retrive a list of user profile card information
 * @route GET api/profiles/profileCards?id=1&id=2&...
 * @access  Public
 * @detail  Only profile _id, name, description, iconURI, level, currentExp, maxExp are needed
 * @format  req.query: { id: [1,2...] }
 *          res.data: { 
 *                      length: Number, 
 *                      profileCards: [{ _id, name, description, iconURI, level, currentExp, maxExp }]       
 *                    }
 */
exports.getProfileCards = async (req, res, next) => {
    try {
        const profileIds = req.query.id;
        // console.log(profileIds)
        const profileCards = await UserProfile.find({ _id: { $in: profileIds } })
            .select('_id name description iconURI level currentExp maxExp');

        const length = profileCards ? profileCards.length : 0;
        return res.status(200).json({
            length,
            profileCards
        });
    } catch (err) {
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);
            return errorHandler(res, 400, messages);
        }
        return errorHandler(res, 500, 'Server Error');
    }
};

/**
 * TODO: 
 * @desc  Get a user's profile for view
 * @route GET api/profiles/profile/:profileId
 * @access  Public
 * @detail  View other user profile: send only guest info;
 *          View own profile: send additional owner info
 * @format  req.header('x-auth-token'): JWT token || null
 *          res.data: { 
 *                      viewType: "GUEST_VIEW" || "OWNER_VIEW", 
 *                      profile: { profile document except 'owner' attribute }         
 *                    }
 */
exports.getProfile = async (req, res, next) => {
    try {
        const selectedProfile = await UserProfile.findById(req.params.profileId);

        if (!selectedProfile) { return errorHandler(res, 404, 'The user profile does not exist.'); }

        return res.status(200).json({
            viewType: req.viewType,
            profile: selectedProfile
        });
    } catch (err) {
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);
            return errorHandler(res, 400, messages);
        }
        return errorHandler(res, 500, 'Server Error');
    }
};

/**
 * TODO: might have some change
 * @desc  Update the profile for the owner
 * @route PATCH api/profiles/profile/edit/:profileId
 * @access  Private
 * @detail  Client side can only send limited updated content:
 *              edit existing: {description, iconURI, bannerURI}
 *              add or delete: {platformsCreated, 
 *                              quizzesCreated, 
 *                              subscribedUsers,
 *                              subscribedPlatforms, 
 *                              fans}
 * 
 *              Other fields should not be updated here.
 * 
 * @format  req.body: { mode: "EDIT", profile: description || iconURI || bannerURI: newVal } 
 *                    Or
 *                    {
 *                      mode: "ADD" || "DELETE", 
 *                      profile: { platformsCreated || quizzesCreated || subscribedUsers || subscribedPlatforms || fans: {_id: ObjectId} }
 *                    }
 *          res.data: {
 *                      success: true,
 *                      mode: "EDIT" || "ADD" || "DELETE",
 *                      content: { description || iconURI || ... || fans: updated content }
 *                    }
 */
exports.updateProfile = async (req, res, next) => {
    try {
        // Note, to verify user id, use req.user.id rather than req.params.profileId

        if (!req.body.profile) { return errorHandler(res, 400, 'Invalid payload, nothing is updated'); }

        // destructure
        const { description, iconURI, bannerURI, platformsCreated, quizzesTaken, quizzesCreated, quizzesScore, likedQuizzes, subscribedUsers, subscribedPlatforms, fans } = req.body.profile;
        const MODE = req.body.mode;

        var provided = keys = updated = null;

        // set options
        const options = { runValidators: true, new: true };

        switch (MODE) {
            case "EDIT":
                provided = nonNullJson({ description, iconURI, bannerURI });
                keys = Object.keys(provided);
                updated = await UserProfile.findByIdAndUpdate(req.user.profile, provided, options).select(keys);
                break;
            case "ADD":
                provided = nonNullJson({ platformsCreated, quizzesCreated, quizzesTaken, quizzesScore, likedQuizzes, subscribedUsers, subscribedPlatforms, fans });
                keys = Object.keys(provided);
                updated = await UserProfile.findByIdAndUpdate(req.user.profile, { $push: provided }, options).select(keys);
                break;
            case "DELETE":
                provided = nonNullJson({ platformsCreated, quizzesCreated, quizzesTaken, quizzesScore, likedQuizzes, subscribedUsers, subscribedPlatforms, fans });
                keys = Object.keys(provided);
                updated = await UserProfile.findOneAndUpdate({ _id: req.user.profile }, { $pull: provided }, options).select(keys);
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
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);
            return errorHandler(res, 400, messages);
        }
        return errorHandler(res, 500, 'Server Error');
    }
};
