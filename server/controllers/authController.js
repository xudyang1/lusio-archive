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
 *                              profile: ObjectId (the profileId of the new user),
 *                              iconURI: String
 *                            } 
 *                    }
 */
exports.register = async (req, res, next) => {
    const { name, email, password } = req.body;

    try {
        // simple validation
        if (!name || !email || !password) { return errorHandler(res, 400, 'Please enter all fields!'); }

        // check the existing user
        const userEmail = await UserAccount.findOne({ email });
        const userName = await UserAccount.findOne({ name });
        if (userEmail) { return errorHandler(res, 400, 'Email is already used!'); }
        if (userName) { return errorHandler(res, 400, 'Name is already used!'); }

        // TODO: uncomment this when in production
        const namePattern = /^(?=.*[a-zA-Z])[a-zA-Z\d-_]{3,10}$/;
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])[A-Za-z\d!@#$%^&*-_=,.?]{8,30}$/;

        /**
         * Name must be between 3 and 10 characters long and must contain at least one alphabetic character.
         * Valid alphanumeric character or special character of -_
         */
        if (!name.match(namePattern)) {
            return errorHandler(res, 400, 'Invalid name format!');
        }
        /**
         * Password must be between 8 and 40 characters long and must contain at least one character of the following types
         *  1. <b>Uppercase</b> letter A to Z
         *  2. <b>Lowercase</b> letter a to z
         *  3. <b>Special</b> character of !@#$%^&*-_=,.?
         *  4. <b>Number</b> from 0 to 9
         */
        if (!password.match(passwordPattern)) {
            return errorHandler(res, 400, 'Invalid password format!');
        }

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

        // set cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            maxAge: 2000000,
            signed: true
        });
        return res.status(201).json({
            user: {
                // id: updatedUser.id,    NOTE: id should not be sent
                name: updatedUser.name,
                email: updatedUser.email,
                profile: updatedUser.profile,
                iconURI: savedProfile.iconURI
            }
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
 *                              iconURI: String
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

        const userProfile = await UserProfile.findById(user.profile).select('iconURI');

        // set cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            maxAge: 2000000,
            signed: true
        });
        return res.status(200).json({
            user: {
                // id: user._id, not sent
                name: user.name,
                email: user.email,
                profile: user.profile,
                iconURI: userProfile.iconURI
            }
        });
    } catch (err) {
        // console.log(err);
        if (err.name === 'ValidationError') {
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
 *                              iconURI: String
 *                            } 
 *                    }
 */
exports.getUser = async (req, res, next) => {
    try {
        const user = await UserAccount.findById(req.user.id);
        if (!user) { return errorHandler(res, 400, 'User does not exist'); }

        const profile = await UserProfile.findById(user.profile).select('iconURI');

        res.json({
            user: {
                name: user.name,
                email: user.email,
                profile: user.profile,
                iconURI: profile.iconURI
            }
        });
    } catch (err) {
        // console.log(err)
        if (err.name === 'ValidationError') {
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
        const newUser = await UserAccount.findByIdAndUpdate(req.user.id, { $set: target }, { new: true }).select(['name', 'email', 'profile']);


        if (!newUser) { return errorHandler(res, 500, 'Something went wrong updating user account'); }

        // update name field for the profile
        if (target.name) {
            const newProfile = await UserProfile.findByIdAndUpdate(newUser.profile, { $set: { name: newUser.name } }, { new: true }).select('name');
            //console.log("new profile.name", newProfile.name)
            if (!newProfile.name) { errorHandler(res, 500, 'Unable to update name in the profile'); }
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
        if (err.name === 'ValidationError') {
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
        if (!removedUser) { return errorHandler(res, 500, 'Unable to delete the user. The user may not exist'); }

        // remove user profile
        const removedProfile = await UserProfile.findOneAndRemove({ _id: removedUser.profile });
        if (!removedProfile) { return errorHandler(res, 500, 'Unable to delete the profile.'); }

        // remove platforms created
        const rmPlatCounts = await Platform.deleteMany({ _id: removedProfile.platformsCreated });

        // remove quizzes created
        const rmQuizzesCounts = await Quiz.deleteMany({ _id: removedProfile.quizzesCreated });

        // set cookie expires 
        res.cookie("token", "", {
            httpOnly: true,
            maxAge: 1
        });

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
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);
            return errorHandler(res, 400, messages);
        }
        return errorHandler(res, 500, 'Server Error');
    }
};

exports.logout = async (req, res, next) => {
    try {
        // set cookie expires 
        res.cookie("token", "", {
            httpOnly: true,
            maxAge: 1
        });
        return res.status(200).json({ success: true });
    } catch (err) {
        // set cookie expires 
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 1
        });
        return errorHandler(res, 500, 'Server Error');
    }
};