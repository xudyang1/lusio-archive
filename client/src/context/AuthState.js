import React, { createContext, useReducer } from 'react';
import AuthReducer from '../reducers/AuthReducer';
import { GET_ERRORS, CLEAR_ERRORS, DELETE_ACCOUNT, UPDATE_SUCCESS } from '../types/actionTypes';
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
import axios from 'axios';
// import { loadUser } from '../actions/AuthActions';

// Initial state
const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    isLoading: false,
    user: {
        id: 0,
        email: "null",
        name: "null",
        profile: null
    },
    error: {
        msg: null,
        status: null,
        id: null
    }
};

// Create Context
export const AuthContext = createContext(initialState);
// Create Provider
export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, initialState);

    // set up config/headers and token
    const tokenConfig = state => {
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
    // check token & load user
    async function loadUser() {
        //console.log("CALLED LoadUser()");
        try {
            // user loading
            dispatch({ type: USER_LOADING });

            const res = await axios.get('/api/auth/user', tokenConfig(state));
            //console.log("res.data = ", res.data);
            dispatch({
                type: USER_LOADED,
                payload: res.data
            });
            //console.log("Called loadUser(): user loaded", state);
        } catch (err) {
            //console.log("err", err);
            dispatch({
                type: AUTH_ERROR,
                payload: {
                    msg: err.response.data.msg,
                    status: err.response.status,
                    id: 'AUTH_ERROR'
                }
            });
            // console.log("Called loadUser(): error", state);
        }
    }
    // Register user
    async function register({ name, email, password }) {
        // headers
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        // request body
        const body = JSON.stringify({ name, email, password });

        try {
            const res = await axios.post('/api/auth/register', body, config);
            // console.log(res.data.user.id);
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            });
            return res.data.user.id;
        }
        catch (err) {
            dispatch({
                type: REGISTER_FAIL,
                payload: {
                    msg: err.response.data.msg,
                    status: err.response.status,
                    id: 'REGISTER_FAIL'
                }
            });
        }
    };

    // login user
    async function login({ email, password }) {
        // headers
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        // request body
        const body = JSON.stringify({ email, password });
        // console.log("Before login");
        try {
            const res = await axios.post('/api/auth/login', body, config);
            //console.log("Login() LOGIN_SUCCESS", res.data);
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            });
            //console.log("After login, success, state: ", state);
        }
        catch (err) {
            dispatch({
                type: LOGIN_FAIL,
                payload: {
                    msg: err.response.data.msg,
                    status: err.response.status,
                    id: 'LOGIN_FAIL'
                }
            });
            // console.log("After login, failed, state: ", state);
        }
    };
    /**
     * 
     * @param {Json} payload 
     *      For changing name | password | (email?)
     *      Format: { content : { name | password | (email?) : newValue}}
     */
    async function updateUser(payload) {
        try {
            const body = JSON.stringify(payload);
            const res = await axios.patch('/api/auth/user/edit', body, tokenConfig(state));
            //console.log("res.data = ", res.data);
            dispatch({
                type: UPDATE_SUCCESS,
                payload: res.data //deleted user info
            });
        } catch (err) {
            dispatch({
                type: 'UPDATE_FAIL',
                payload: {
                    msg: err.response.data.msg,
                    status: err.response.status,
                    id: 'UPDATE_FAIL'
                }
            });
        }
    }
    async function deleteAccount() {
        try {
            const res = await axios.delete('/api/auth/user/delete', tokenConfig(state));
            //console.log("res.data = ", res.data);
            dispatch({
                type: DELETE_ACCOUNT,
                payload: res.data //deleted user info
            });
        } catch (err) {
            dispatch({
                type: 'DELETE_FAIL',
                payload: {
                    msg: err.response.data.msg,
                    status: err.response.status,
                    id: 'DELETE_FAIL'
                }
            });
        }
    }

    // logout user
    function logout() {
        dispatch({
            type: LOGOUT_SUCCESS
        });
    };

    // clear errors
    function clearErrors() {
        dispatch({
            type: CLEAR_ERRORS
        });
        // console.log("Called clearErrors()");
    };

    return (<AuthContext.Provider value={{
        loadUser/*: loadUserCall*/,
        register,
        login,
        logout,
        clearErrors,
        updateUser,
        deleteAccount,
        ...state
    }}>
        {children}
    </AuthContext.Provider>);

};