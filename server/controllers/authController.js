const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// User model
const UserAccount = require('../models/UserAccount');
const UserProfile = require('../models/UserProfile');
const Platform = require('../models/Platform');
const Quiz = require('../models/Quiz');

// JWT key
const JWT_SECRET = process.env.JWT_SECRET;

// TODO: remove _id in res, add profileId instead

/**
 * TODO: check & error handling improvements
 * @desc  Register new user
 * @route POST api/auth/register
 * @access  Public
 * @detail  create a default profile for the user saved
 */
exports.register = async (req, res, next) => {
    const { name, email, password } = req.body;

    try {
        // simple validation
        if (!name || !email || !password) { throw Error('Please enter all fields!'); }
        // check the existing user
        const user = await UserAccount.findOne({ email });
        if (user) { throw Error('User already exists'); }
        const salt = await bcrypt.genSalt(10);
        if (!salt) { throw Error('Something went wrong with bcrypt'); }
        const hash = await bcrypt.hash(password, salt);
        if (!hash) { throw Error('Something went wrong hashing the password'); }
        const newUser = new UserAccount({
            name,
            email,
            password: hash
        });

        const savedUser = await newUser.save();
        if (!savedUser) { throw Error('Something went wrong saving the user'); }
        // set up default profile
        const profile = new UserProfile({
            owner: savedUser._id
        });
        const savedProfile = await profile.save();
        console.log("saved profile", savedProfile);
        if (!savedProfile) throw Error('Something went wrong saving the default profile');
        // add profile id to user
        const updatedUser = await UserAccount.findByIdAndUpdate(savedUser._id,
            { $set: { profile: savedProfile._id } }, { new: true });

        if (!updatedUser) { throw Error('Something went wrong adding profile id to user account'); }
        // generate token
        const token = jwt.sign({ id: updatedUser._id, profile: updatedUser.profile }, JWT_SECRET, {
            // TODO: discuss about the expiry time
            expiresIn: 3600
        });

        res.status(201).json({
            token,
            user: {
                id: updatedUser.id,
                name: updatedUser.name,
                email: updatedUser.email,
                profile: updatedUser.profile
            }
        });
    } catch (err) {
        res.status(400).json({ msg: err.message });
    }
};

/**
 * @desc  Login user
 * @route POST api/auth/login
 * @access Public
 */
exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        // simple validation
        if (!email || !password) throw Error('Please enter all fields!');

        // Check for existing user
        // TODO: change error message to Invalid credentials after testing
        const user = await UserAccount.findOne({ email }).select('+password');

        if (!user) throw Error('User does not exist');

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw Error('Invalid credentials');

        // TODO: discuss about the expiry time
        const token = jwt.sign({ id: user._id, profile: user.profile }, JWT_SECRET, { expiresIn: 3600 });

        if (!token) throw Error('Could not sign the token');

        res.status(200).json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                profile: user.profile
            }
        });
    } catch (err) {
        res.status(400).json({ msg: err.message });
    }
};



/**
 * @desc  Get user account data
 * @route GET api/auth/user
 * @access Private
 */
exports.getUser = async (req, res, next) => {
    try {
        const user = await UserAccount.findById(req.user.id);
        if (!user) throw Error('User does not exist');
        console.log("see if password is loaded: ", user);
        res.json({
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (err) {
        res.status(400).json({ msg: err.message });
    }
};

/**
 * TODO: discuss about detailed implementations (decrease likes count, remove subscribes?)
 * @desc  Delete an user account
 * @route DELETE api/auth/user/delete
 * @access  Private
 * @detail  User profile, created platforms, created quizzes will also be deleted
 */
exports.deleteUser = async (req, res, next) => {
    try {
        // remove user account
        const removedUser = await UserAccount.findOneAndRemove({ _id: req.user.id });
        console.log(removedUser);
        if (!removedUser)
            throw Error('Unable to delete the user. The user may not exist');
        // remove user profile
        const removedProfile = await UserProfile.findOneAndRemove({ _id: removedUser.profile });
        if (!removedProfile) throw Error('Unable to delete the profile.');
        // remove platforms created
        const rmPlatCounts = await Platform.deleteMany({ _id: removedProfile.platformsCreated });
        console.log("removed platforms count:", rmPlatCounts);
        // remove quizzes created
        const rmQuizzesCounts = await Quiz.deleteMany({ _id: removedProfile.quizzesCreated });
        console.log("removed quizzes count:", rmQuizzesCounts);
        // TODO: decrease likes and comments?
        res.json({
            user: {
                id: removedUser._id,
                name: removedUser.name,
                email: removedUser.email
            },
            success: true
        });
    } catch (err) {
        res.status(400).json({ msg: err.message, success: false });
    }
};