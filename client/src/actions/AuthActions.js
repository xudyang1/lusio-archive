import axios from 'axios';

import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from "../types/actionTypes";

// check token & load user
export const loadUser = (state) => async (dispatch) => {
    try {
        // user loading
        dispatch({ type: USER_LOADING });

        const res = await axios.get('/api/auth/user', tokenConfig(state));
        dispatch({
            type: USER_LOADED,
            payload: res.data
        });
        console.log("Called loadUser(): user loaded", state);
    } catch (err) {
        console.log(err);
        dispatch({
            type: AUTH_ERROR,
            payload: {
                msg: err.response.data.msg,
                status: err.response.status,
                id: 'AUTH_ERROR'
            }
        });
        console.log("Called loadUser(): error", state);
    }
};
// // Register user
// export const register = ({ name, email, password }) => dispatch => {
//     // headers
//     const config = {
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     };
//     // request body
//     const body = JSON.stringify({ name, email, password });

//     axios.post('/api/users', body, config)
//         .then(res => dispatch({
//             type: REGISTER_SUCCESS,
//             payload: res.data
//         }))
//         .catch(err => {
//             dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));
//             dispatch({
//                 type: REGISTER_FAIL
//             });
//         });
// };

// // login user
// export const login = ({ email, password }) => dispatch => {
//     // headers
//     const config = {
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     };
//     // request body
//     const body = JSON.stringify({ email, password });

//     axios.post('/api/auth', body, config)
//         .then(res => dispatch({
//             type: LOGIN_SUCCESS,
//             payload: res.data
//         }))
//         .catch(err => {
//             dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'));
//             dispatch({
//                 type: LOGIN_FAIL
//             });
//         });
// };


// // logout user
// export const logout = () => {
//     return {
//         type: LOGOUT_SUCCESS
//     };
// };

// set up config/headers and token
export const tokenConfig = state => {
    // get token from localstorage
    const token = state.token;

    // headers
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    // if token, add to headers
    if (token) {
        config.headers['x-auth-token'] = token;
    }
    return config;
};
