const express = require('express');
const router = express.Router();
const { register, login, getUser } = require('../../controllers/authController');
const auth = require('../../middleware/auth');

/**
 * @desc  Register new user
 * @route POST api/auth/register
 * @access Public
 */
router
    .route('/register')
    .post(register);

/**
 * @desc  Login user
 * @route POST api/auth/login
 * @access Public
 */
router
    .route('/login')
    .post(login);

/**
 * @desc  Get user account data
 * @route GET api/auth/user
 * @access Private
 * @middleware auth: authentication check
 */
router
    .route('/user')
    .get(auth, getUser);

module.exports = router;