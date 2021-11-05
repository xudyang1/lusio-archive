

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
        id: req.body.id,
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


exports.updateProfile = async (req, res, next) => {
  const profile = await UserProfile.findById(req.params.id);
  const updatedProfile = new UserProfile({
    id: profile.id,
    accountStatus: profile.accountStatus,
    name: profile.name,
    email: profile.email,
    description: profile.description,
    profileIcon: profile.profileIcon,
    profileBanner: profile.profileBanner,
    level: profile.level,
    currentExp: profile.currentExp,
    maxExp: profile.maxExp,
    achievements: profile.achievements,
    quizzes: profile.quizzes,
    subscribedUser: profile.subscribedUser,
    subscribedPlat: profile.subscribedPlat
  });
  try {
      const savedProfile = await updatedProfile.save();
      res.status(200).json({
        userProfile: {
          id: savedProfile.id,
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

exports.deleteAccount = async (req, res, next) => {
    try {
        const profile = await UserProfile.findById(req.params.id);

        if (!profile) {
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