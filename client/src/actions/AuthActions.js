import axios from 'axios';
import {
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    DELETE_ACCOUNT,
    UPDATE_FAIL,
    UPDATE_SUCCESS,
    DELETE_FAIL,
} from "../types/actionTypes";
import { returnErrors } from './ErrorActions';

/**
 * @description config for headers in request
 */
export const config = { headers: { 'Content-Type': 'application/json' } };


/**
 * @description token config for headers in request with authentication
 */
export const tokenConfig = (token) => {
    const tokenConfig = { headers: { 'Content-Type': 'application/json' } };
    // if token, add to headers
    if (token) {
        tokenConfig.headers['x-auth-token'] = token;
    }
    return tokenConfig;
};

/**
 * @description load the user when first mounted
 * @param {string} token JWT token
 * @returns Promise<void>
 * @format  req.headers: { 'Content-Type': 'application/json', 
 *                         'x-auth-token': JWT token }
 *          res.data: {
 *                      user: { 
 *                              name: String, 
 *                              email: String, 
 *                              profile: ObjectId (the profileId of the user)
 *                              iconURI: String
 *                            } 
 *                    }
 */
export const loadUser = (token = null) => async (dispatch, errorDispatch = dispatch) => {
    try {
        const res = await axios.get('/api/auth/user', tokenConfig(token));
        dispatch({
            type: USER_LOADED,
            payload: res.data
        });
    } catch (err) {
        errorDispatch(returnErrors(err, AUTH_ERROR));
    }
};

/**
 * @description register a new user
 * @param {JSON} { name, email, password } destructured input fields for registration
 * @returns Promise<void>
 * @format  req.headers: { 'Content-Type': 'application/json' }
 *          req.body: { name: String, email: String, password: String }
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
export const register = ({ name, email, password }) => async (dispatch, errorDispatch = dispatch) => {
    // request body
    const body = JSON.stringify({ name, email, password });

    try {
        const res = await axios.post('/api/auth/register', body, config);

        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });
    }
    catch (err) {
        errorDispatch(returnErrors(err, REGISTER_FAIL));
    }
};

/**
 * @description login
 * @param {JSON} { email, password } destructured input fields for login
 * @returns Promise<void>
 * @format  req.headers: { 'Content-Type': 'application/json' }
 *          req.body: { email: String, password: String }
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
export const login = ({ email, password }) => async (dispatch, errorDispatch = dispatch) => {
    // request body
    const body = JSON.stringify({ email, password });

    try {
        const res = await axios.post('/api/auth/login', body, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });
    }
    catch (err) {
        errorDispatch(returnErrors(err, LOGIN_FAIL));
    }
};

/**
 * @description update user account information
 * @param {string} token JWT token
 * @param {Json} payload see @format {req.body}
 * @detail  For changing name | password | (email?)
 * @format  req.headers: { 'Content-Type': 'application/json', 
 *                         'x-auth-token': JWT token }
 *          req.body: { content: { name | password | (email?): newValue } }
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
export const updateUser = (token, payload) => async (dispatch, errorDispatch = dispatch) => {
    try {
        const body = JSON.stringify(payload);

        const res = await axios.patch('/api/auth/user/edit', body, tokenConfig(token));

        dispatch({
            type: UPDATE_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        errorDispatch(returnErrors(err, UPDATE_FAIL));
    }
};

/**
 * @description delete user account and associated profile, platforms/quizzes created
 * @param {string} token JWT token
 * @detail  subscription/fans/... other fields may not be updated
 * @format  req.headers: { 'Content-Type': 'application/json', 
 *                         'x-auth-token': JWT token }
 *          res.data: {
 *                      success: true,
 *                      user: { 
 *                              name: String, 
 *                              email: String, 
 *                              profile: ObjectId (the profileId of the user)
 *                            } 
 *                    }
 */
export const deleteAccount = (token) => async (dispatch, errorDispatch = dispatch) => {
    try {
        const res = await axios.delete('/api/auth/user/delete', tokenConfig(token));

        dispatch({
            type: DELETE_ACCOUNT,
            payload: res.data //deleted user info
        });
    } catch (err) {
        errorDispatch(returnErrors(err, DELETE_FAIL));
    }
};

/**
 * @description logout
 * @returns Promise<void>
 */
export const logout = () => (dispatch) => {
    dispatch({
        type: LOGOUT_SUCCESS
    });
};

