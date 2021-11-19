const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// User model
const UserAccount = require('../models/UserAccount');
const UserProfile = require('../models/UserProfile');
const Platform = require('../models/Platform');
const Quiz = require('../models/Quiz');
const { errorHandler } = require('../utils/jsonTool');

// JWT key
const JWT_SECRET = process.env.JWT_SECRET;

// TODO: remove _id in res, add profileId instead

/**
 * TODO: check & error handling improvements
 * @desc  Register new user
 * @route POST api/auth/register
 * @access  Public
 * @detail  also creates a default profile for the user saved
 * @format  req.body: { name: String, email: String, password: String }
 *          res.data: { 
 *                      token: JWT token, 
 *                      user: { 
 *                              name: String, 
 *                              email: String, 
 *                              profile: ObjectId (the profileId of the new user)
 *                            } 
 *                    }
 */
exports.register = async (req, res, next) => {
    const { name, email, password } = req.body;

    try {
        // simple validation
        if (!name || !email || !password) { return errorHandler(res, 400, 'Please enter all fields!'); }

        // check the existing user
        const user = await UserAccount.findOne({ email });
        if (user) { return errorHandler(res, 400, 'User already exists!'); }

        const salt = await bcrypt.genSalt(10);

        if (!salt) { return errorHandler(res, 500, 'Something went wrong with bcrypt'); }
        const hash = await bcrypt.hash(password, salt);
        if (!hash) { return errorHandler(res, 500, 'Something went wrong hashing the password'); }

        const newUser = new UserAccount({
            name,
            email,
            password: hash
        });

        const savedUser = await newUser.save();
        if (!savedUser) { return errorHandler(res, 500, 'Something went wrong saving the user'); }

        // set up default profile
        const profile = new UserProfile({
            owner: savedUser._id,
            name: savedUser.name
        });

        const savedProfile = await profile.save();
        //console.log("saved profile", savedProfile);
        if (!savedProfile) { return errorHandler(res, 500, 'Something went wrong saving the default profile'); }

        // add profile id to user
        const updatedUser = await UserAccount.findByIdAndUpdate(savedUser._id,
            { $set: { profile: savedProfile._id } }, { new: true });

        if (!updatedUser) { return errorHandler(res, 500, 'Something went wrong adding profile id to user account'); }
        // generate token
        const token = jwt.sign({ id: updatedUser._id, profile: updatedUser.profile }, JWT_SECRET, {
            // TODO: discuss about the expiry time
            expiresIn: 3600
        });

        res.status(201).json({
            token,
            user: {
                // id: updatedUser.id,    NOTE: id should not be sent
                name: updatedUser.name,
                email: updatedUser.email,
                profile: updatedUser.profile
            }
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
 * @desc  Login user
 * @route POST api/auth/login
 * @access Public
 * @format  req.body: { email: String, password: String }
 *          res.data: { 
 *                      token: JWT token, 
 *                      user: { 
 *                              name: String, 
 *                              email: String, 
 *                              profile: ObjectId (the profileId of the user)
 *                            } 
 *                    }
 */
exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        // simple validation
        if (!email || !password) { return errorHandler(res, 400, 'Please enter all fields!'); }

        // Check for existing user
        // TODO: change error message to Invalid credentials after testing
        const user = await UserAccount.findOne({ email }).select('+password');

        if (!user) { return errorHandler(res, 400, 'User does not exist'); }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) { return errorHandler(res, 400, 'Invalid credentials'); }

        // TODO: discuss about the expiry time
        const token = jwt.sign({ id: user._id, profile: user.profile }, JWT_SECRET, { expiresIn: 3600 });

        if (!token) { return errorHandler(res, 500, 'Could not sign the token'); }

        res.status(200).json({
            token,
            user: {
                // id: user._id, not sent
                name: user.name,
                email: user.email,
                profile: user.profile
            }
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
 * @desc  Load user by token
 * @route GET api/auth/user
 * @access Private
 * @format  req.header('x-auth-token'): JWT token
 *          res.data: {
 *                      user: { 
 *                              name: String, 
 *                              email: String, 
 *                              profile: ObjectId (the profileId of the user)
 *                            } 
 *                    }
 */
exports.getUser = async (req, res, next) => {
    try {
        const user = await UserAccount.findById(req.user.id);
        if (!user) { return errorHandler(res, 400, 'User does not exist'); }
        // console.log("see if password is loaded: ", user);
        res.json({
            user: {
                // id: user._id, not sent
                name: user.name,
                email: user.email,
                profile: user.profile
            }
        });
    } catch (err) {
        if(err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);
            return errorHandler(res, 400, messages);
        }
        return errorHandler(res, 500, 'Server Error');
    }
};

/**
 * @desc  Update user account data
 * @route PATCH api/auth/user/edit
 * @access  Private
 * @detail  change username, password, or (email?)
 * @format  req.header('x-auth-token'): JWT token
 *          req.body: { content: { name | password | (email?): String (str of newValue) } }
 *          res.data: {
 *                      success: true,
 *                      user: { 
 *                              name: String, 
 *                              email: String, 
 *                              profile: ObjectId (the profileId of the user)
 *                            } 
 *                    }
 *      
 *     Note: email may have different implementation since we need to verify the email address
 */
exports.updateUser = async (req, res, next) => {
    try {
        if (!req.body.content) { return errorHandler(res, 400, 'Invalid payload'); }

        const { name, password, email } = req.body.content;
        var target = null;
        if (name) {
            target = { name };
        }
        // TODO: need further validation
        else if (email) {
            const user = await UserAccount.findOne({ email });
            if (user) { return errorHandler(res, 400, 'User already exists'); }
            target = { email };
        }
        else if (password) {
            const salt = await bcrypt.genSalt(10);
            if (!salt) { return errorHandler(res, 500, 'Something went wrong with bcrypt'); }
            const hash = await bcrypt.hash(password, salt);
            if (!hash) { return errorHandler(res, 500, 'Something went wrong hashing the new password'); }
            target = { password: hash };
        }
        else {
            return errorHandler(res, 400, 'Invalid payload, update failed');
        }
        //console.log("Update UserAccount (target)", target);
        const newUser = await UserAccount.findByIdAndUpdate(req.user.id, { $set: target }, { new: true }).select(['name', 'email', 'profile']);

        //console.log(newUser);

        if (!newUser) { return errorHandler(res, 500, 'Something went wrong updating user account'); }

        // update name field for the profile
        //console.log("Target.name", target.name)
        if (target.name) {
            const newProfile = await UserProfile.findByIdAndUpdate(newUser.profile, { $set: { name: newUser.name } }, { new: true }).select('name');
            //console.log("new profile.name", newProfile.name)
            if(!newProfile.name) {errorHandler(res, 500, 'Unable to update name in the profile')}
        }

        return res.status(200).json({
            success: true,
            user: {
                email: newUser.email,
                name: newUser.name,
                profile: newUser.profile
            }
        });
    }
    catch (err) {
        //console.log(err)
        if(err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);
            return errorHandler(res, 400, messages);
        }
        return errorHandler(res, 500, 'Server Error');
    }
};


/**
 * TODO: discuss about detailed implementations (decrease likes count, remove subscribes?)
 * @desc  Delete an user account
 * @route DELETE api/auth/user/delete
 * @access  Private
 * @detail  User profile, created platforms, created quizzes will also be deleted
 * @format  req.header('x-auth-token'): JWT token
 *          res.data: {
 *                      success: true,
 *                      user: { 
 *                              name: String, 
 *                              email: String, 
 *                              profile: ObjectId (the profileId of the user)
 *                            } 
 *                    }
 * 
 */
exports.deleteUser = async (req, res, next) => {
    try {
        // remove user account
        const removedUser = await UserAccount.findOneAndRemove({ _id: req.user.id });
        //console.log(removedUser);
        if (!removedUser) { return errorHandler(res, 500, 'Unable to delete the user. The user may not exist'); }

        // remove user profile
        const removedProfile = await UserProfile.findOneAndRemove({ _id: removedUser.profile });
        if (!removedProfile) { return errorHandler(res, 500, 'Unable to delete the profile.'); }

        // remove platforms created
        const rmPlatCounts = await Platform.deleteMany({ _id: removedProfile.platformsCreated });
        //console.log("removed platforms count:", rmPlatCounts);

        // remove quizzes created
        const rmQuizzesCounts = await Quiz.deleteMany({ _id: removedProfile.quizzesCreated });
        //console.log("removed quizzes count:", rmQuizzesCounts);

        // TODO: decrease likes and comments?
        res.json({
            user: {
                // id: removedUser._id, not sent
                name: removedUser.name,
                email: removedUser.email,
                profile: removedUser.profile
            },
            success: true
        });
    } catch (err) {
        if(err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);
            return errorHandler(res, 400, messages);
        }
        return errorHandler(res, 500, 'Server Error');
    }
};