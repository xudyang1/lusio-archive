const UserProfile = require('../models/UserProfile');

/**
 * TODO: 
 * @desc  Get a profile for view
 * @route GET api/platform
 * @access  Public/Private
 * @detail  View other user profile: send only guest info;
 *          View own profile: send additional owner info
 */
exports.getProfile = async (req, res, next) => {
    try {
        const profile = await UserProfile.find();

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

// exports.getProfile = async (req, res, next) => {
//     try {
//         const profile = await UserProfile.findById(req.params.id);

//         return res.status(200).json({
//             success: true,
//             data: profile
//         });
//     } catch (err) {
//         return res.status(500).json({
//             success: false,
//             msg: 'Server Error'
//         });
//     }
// }
/**
 * TODO: 
 * @desc  Create a default profile when first registeration
 * @route POST api/profile
 * @access  Private
 */
exports.createDefaultProfile = async (req, res, next) => {
    const newProfile = new UserProfile({
        userId: req.body.userId,
        accountStatus: req.body.accountStatus,
        name: req.body.name,
        email: req.body.email,
        description: req.body.description,
        profileIcon: req.body.profileIcon,
        profileBanner: req.body.profileBanner,
        level: req.body.level,
        currentExp: req.body.currentExp,
        maxExp: req.body.maxExp,
        achievements: req.body.achievements,
        quizzes: req.body.quizzes,
        subscribedUser: req.body.subscribedUser,
        subscribedPlat: req.body.subscribedPlat
    });
    try {
        const savedProfile = await newProfile.save();
        if (!savedProfile) throw Error('Something went wrong saving the user profile');
        res.status(200).json({
            userProfile: {
                id: savedProfile.id,
                userId: savedProfile.userId,
                accountStatus: savedProfile.accountStatus,
                name: savedProfile.name,
                email: savedProfile.email,
                description: savedProfile.description,
                profileIcon: savedProfile.profileIcon,
                profileBanner: savedProfile.profileBanner,
                level: savedProfile.level,
                currentExp: savedProfile.currentExp,
                maxExp: savedProfile.maxExp,
                achievements: savedProfile.achievements,
                quizzes: savedProfile.quizzes,
                subscribedUser: savedProfile.subscribedUser,
                subscribedPlat: savedProfile.subscribedPlat
            }
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
}

/**
 * TODO: 
 * @desc  Update the profile for the owner
 * @route PUT api/profile/:id
 * @access  Private
 */
exports.updateProfile = async (req, res, next) => {
  const profile = await UserProfile.findByIdAndUpdate(req.params.id,{
    id: req.body.id,
    userId: req.body.userId,
    accountStatus: req.body.accountStatus,
    name: req.body.name,
    email: req.body.email,
    description: req.body.description,
    profileIcon: req.body.profileIcon,
    profileBanner: req.body.profileBanner,
    level: req.body.level,
    currentExp: req.body.currentExp,
    maxExp: req.body.maxExp,
    achievements: req.body.achievements,
    quizzes: req.body.quizzes,
    subscribedUser: req.body.subscribedUser,
    subscribedPlat: req.body.subscribedPlat
    });
  try {
      res.status(200).json({
        success: true,
        msg: "User profile updated"
    });
      if (!profile) {
          return res.status(404).json({
              success: false,
              msg: 'No user profile found'
          });
      }
  } catch (err) {
      return res.status(500).json({
          success: false,
          msg: 'Server Error'
      });
  }
}

// This part should be in authController.js
// exports.deleteAccount = async (req, res, next) => {
//     try {
//         const profile = await UserProfile.findById(req.params.id);

//         if (!profile) {
//             return res.status(404).json({
//                 success: false,
//                 msg: 'No user profile found'
//             });
//         }

//         await profile.remove();

//         return res.status(200).json({
//             success: true,
//             data: {}
//         });

//     } catch (err) {
//         return res.status(500).json({
//             success: false,
//             msg: 'Server Error'
//         });
//     }
// }