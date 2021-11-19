const UserProfile = require('../models/UserProfile');
const { dropEntries, nonNullJson, errorHandler } = require('../utils/jsonTool');

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

        // console.log("profile doc: ", selectedProfile);
        if (!selectedProfile) { return errorHandler(res, 404, 'The user profile does not exist.'); }

        // filter owner
        var output = dropEntries(selectedProfile, 'owner');

        return res.status(200).json({
            viewType: req.viewType,
            profile: output
        });
    } catch (err) {
        //console.log(err);
        if(err.name === 'ValidationError') {
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
 * @format  req.body: { mode: "EDIT", profile: description || iconURI || bannerURI } 
 *                    Or
 *                    {
 *                      mode: "ADD" || "DELETE", 
 *                      profile: platformsCreated || quizzesCreated || subscribedUsers || subscribedPlatforms || fans
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
        const { description, iconURI, bannerURI, platformsCreated, quizzesCreated, subscribedUsers, subscribedPlatforms, fans } = req.body.profile;
        const MODE = req.body.mode;

        var provided = keys = updated = null;

        // set options
        const options = { runValidators: true, new: true };

        switch (MODE) {
            case "EDIT":
                provided = nonNullJson({ description, iconURI, bannerURI });
                keys = Object.keys(provided);
                updated = await UserProfile.findByIdAndUpdate(req.user.profile, provided, options).select(keys);
                // console.log("updated", updated);
                break;
            case "ADD":
                provided = nonNullJson({ platformsCreated, quizzesCreated, subscribedUsers, subscribedPlatforms, fans });
                keys = Object.keys(provided);
                // console.log('$pushAll provided: ', provided)
                updated = await UserProfile.findByIdAndUpdate(req.user.profile, { $push: provided }, options).select(keys);
                break;
            case "DELETE":
                provided = nonNullJson({ platformsCreated, quizzesCreated, subscribedUsers, subscribedPlatforms, fans });
                keys = Object.keys(provided);
                updated = await UserProfile.findByIdAndUpdate(req.user.profile, { $pullAll: provided }, options).select(keys);
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
        if(err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);
            return errorHandler(res, 400, messages);
        }
        return errorHandler(res, 500, 'Server Error');
    }
};
