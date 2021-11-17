const express = require('express');
const router = express.Router();
const { register, login, getUser, deleteUser, updateUser } = require('../../controllers/authController');
const {strictAuth} = require('../../middleware/auth');

/**
 * @desc  Register new user
 * @route POST api/auth/register
 * @access  Public
 */
router
    .route('/register')
    .post(register);

/**
 * @desc  Login user
 * @route POST api/auth/login
 * @access  Public
 */
router
    .route('/login')
    .post(login);

/**
 * @desc  Get user account data
 * @route GET api/auth/user
 * @access  Private
 * @middleware  {strictAuth}: get user verified by token
 */
router
    .route('/user')
    .get(strictAuth, getUser);

/**
 * @desc  Update user account data
 * @route PATCH api/auth/user/edit
 * @access  Private
 * @middleware  {strictAuth}: only owner have acess
 */
 router
 .route('/user/edit')
 .patch(strictAuth, updateUser);

/**
 * @desc  Delete user account data
 * @route DELETE api/auth/user/delete
 * @access  Private
 * @middleware  {strictAuth}: only owner can acess
 */
 router
    .route('/user/delete')
    .delete(strictAuth, deleteUser);

module.exports = router;