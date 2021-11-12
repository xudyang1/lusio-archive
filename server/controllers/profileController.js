const UserAccount = require('../models/UserAccount');
const UserProfile = require('../models/UserProfile');

/**
 * TODO: 
 * @desc  Get a user's profile for view
 * @route GET api/profiles/profile/:profileId
 * @access  Public
 * @detail  View other user profile: send only guest info;
 *          View own profile: send additional owner info
 */
exports.getProfile = async (req, res, next) => {
    try {
        // don't send owner id 
        const selectedProfile = await UserProfile.findById(req.params.profileId).select('-owner');

        console.log("profile doc: ", selectedProfile);
        if (!selectedProfile) {
            return res.status(404).json({
                success: false,
                msg: 'The profile does not exist.'
            });
        }

        return res.status(200).json({
            type: req.viewType,
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
 * @payload req.body = 
 *      { mode: "EDIT", profile: description | iconURI | bannerURI } 
 *  Or
 *      {
 *        mode: "ADD" | "DELETE", 
 *        profile: platformsCreated |quizzesCreated |subscribedUsers | subscribedPlatforms | fans
 *      }
 */
exports.updateProfile = async (req, res, next) => {
    try {
        // Note, to verify user id, use req.user.id rather than req.params.profileId
        
        if(!req.body.profile){
            return res.status(400).json({
                success: false,
                msg: 'Invalid payload, nothing is updated'
            });
        }
        
        // destructure
        const { description, iconURI, bannerURI, platformsCreated, quizzesCreated, subscribedUsers, subscribedPlatforms, fans } = req.body.profile;
        const MODE = req.body.mode;

        var provided = keys = updated = null;

        // get profile id
        const userProfile = await UserAccount.findById(req.user.id).select('profile');
        const profileId = userProfile.profile.toString();
        // set options
        const options = { runValidators: true, new: true };

        switch (MODE) {
            case "EDIT":
                provided = { description, iconURI, bannerURI };
                keys = Object.keys(provided);
                updated = await UserProfile.findByIdAndUpdate(profileId, provided, options).select(keys);
                console.log("updated", updated);
                break;
            case "ADD":
                provided = { platformsCreated, quizzesCreated, subscribedUsers, subscribedPlatforms, fans };
                keys = Object.keys(provided);
                console.log('$pushAll provided: ', provided)
                updated = await UserProfile.findByIdAndUpdate(profileId, { $push: provided }, options).select(keys);
                break;
            case "DELETE":
                provided = { platformsCreated, quizzesCreated, subscribedUsers, subscribedPlatforms, fans };
                keys = Object.keys(provided);
                updated = await UserProfile.findByIdAndUpdate(profileId, { $pullAll: provided }, options).select(keys);
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
        console.log(err)
        return res.status(500).json({
            success: false,
            msg: 'Server Error'
        });
    }
};
