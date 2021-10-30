const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// User model
const UserAccount = require('../models/UserAccount');
// JWT key
const JWT_SECRET = process.env.JWT_SECRET;

/**
 * @desc  Register new user
 * @route POST api/auth/register
 * @access Public
 */
exports.register = async (req, res, next) => {
    const { name, email, password } = req.body;

    // simple validation
    if (!name || !email || !password) {
        throw Error('Please enter all fields!');
    }
    try {
        // check the existing user
        const user = await UserAccount.findOne({ email });
        if (user) throw Error('User already exists');

        const salt = await bcrypt.genSalt(10);
        if (!salt) throw Error('Something went wrong with bcrypt');

        const hash = await bcrypt.hash(password, salt);
        if (!hash) throw Error('Something went wrong hashing the password');

        const newUser = new UserAccount({
            name,
            email,
            password: hash
        });

        const savedUser = await newUser.save();
        if (!savedUser) throw Error('Something went wrong saving the user');

        const token = jwt.sign({ id: savedUser._id }, JWT_SECRET, {
            // TODO: discuss about the expiry time
            expiresIn: 3600
        });

        res.status(200).json({
            token,
            user: {
                id: savedUser.id,
                name: savedUser.name,
                email: savedUser.email
            }
        });
    } catch (e) {
        res.status(400).json({ msg: e.message });
    }
};

/**
 * @desc  Login user
 * @route POST api/auth/login
 * @access Public
 */
exports.login = async (req, res, next) => {
    const { email, password } = req.body;

    // simple validation
    if (!email || !password) throw Error('Please enter all fields!');

    try {
        // Check for existing user
        // TODO: change error message to Invalid credentials after testing
        const user = await UserAccount.findOne({ email });
        if (!user) throw Error('User does not exist');

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw Error('Invalid credentials');

        // TODO: discuss about the expiry time
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: 3600 });

        if (!token) throw Error('Couldnt sign the token');

        res.status(200).json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (e) {
        console.log(e);
        res.status(400).json({ msg: e.message });
    }
}



/**
 * @desc  Get user account data
 * @route GET api/auth/user
 * @access Private
 */
exports.getUser = async (req, res, next) => {
    try {
        const user = await UserAccount.findById(req.user.id).select('-password'); //don't select 'password'
        if (!user) throw Error('User does not exist');
        res.json(user);
    } catch (e) {
        res.status(400).json({ msg: e.message });
    }
}