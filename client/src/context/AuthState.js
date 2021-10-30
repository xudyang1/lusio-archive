import React, { createContext, useReducer } from 'react';
import AuthReducer from '../reducers/AuthReducer';
import { GET_ERRORS, CLEAR_ERRORS } from '../types/actionTypes';
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

// Initial state
const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    isLoading: false,
    user: null,
    error: {
        msg: {},
        status: null,
        id: null
    }
};

// Create context
export const AuthContext = createContext(initialState);
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
        try {
            // user loading
            dispatch({ type: USER_LOADING });

            const res = await axios.get('/api/auth/user', tokenConfig(state));
            dispatch({
                type: USER_LOADED,
                payload: res.data
            });
        } catch (err) {
            console.log("M", err.response.data.msg);
            dispatch({
                type: GET_ERRORS,
                payload: {
                    msg: err.response.data.msg,
                    status: err.response.status,
                    id: null
                }
            });
            dispatch({
                type: AUTH_ERROR
            });
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
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            });
        }
        catch (err) {
            dispatch({
                type: GET_ERRORS,
                payload: {
                    msg: err.response.data.msg,
                    status: err.response.status,
                    id: 'REGISTER_FAIL'
                }
            });
            dispatch({
                type: REGISTER_FAIL
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

        try {
            const res = await axios.post('/api/auth/login', body, config);
            console.log("login state", res);
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            });
        }
        catch (err) {
            dispatch({
                type: GET_ERRORS,
                payload: {
                    msg: err.response.data.msg,
                    status: err.response.status,
                    id: 'LOGIN_FAIL'
                }
            });

            dispatch({
                type: LOGIN_FAIL
            });
        }
    };


    // logout user
    function logout() {
        return () => dispatch({
            type: LOGOUT_SUCCESS
        });
    };

    // clear errors
    function clearErrors() {
        console.log("clearErrors()");
        return () => dispatch({
            type: CLEAR_ERRORS
        });
    };

    return (<AuthContext.Provider value={{
        loadUser,
        register,
        login,
        logout,
        clearErrors,
        // loginModal: state.loginModal,
        // registerModal: state.registerModal,
        // token: state.token,
        // isAuthenticated: state.isAuthenticated,
        // isLoading: state.isLoading,
        // user: state.user,
        // error: state.error,
        ...state
    }}>
        {children}
    </AuthContext.Provider>);

};