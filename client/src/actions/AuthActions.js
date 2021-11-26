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
    } catch (err) {
        dispatch({
            type: AUTH_ERROR,
            payload: {
                msg: err.response.data.msg,
                status: err.response.status,
                id: 'AUTH_ERROR'
            }
        });
    }
};

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
