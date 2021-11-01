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
import { loadUser } from '../actions/AuthActions';

// Initial state
const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    isLoading: false,
    user: {
        id: null,
        email: null,
        name: null
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
    // const tokenConfig = state => {
    //     // get token from localstorage
    //     const token = state.token;

    //     // headers
    //     const config = {
    //         headers: {
    //             "Content-Type": "application/json"
    //         }
    //     };

    //     // if token, add to headers
    //     if (token) {
    //         config.headers['x-auth-token'] = token;
    //     }
    //     return config;
    // };
    // // check token & load user
    // async function loadUser() {
    //     try {
    //         // user loading
    //         dispatch({ type: USER_LOADING });

    //         const res = await axios.get('/api/auth/user', tokenConfig(state));
    //         dispatch({
    //             type: USER_LOADED,
    //             payload: res.data
    //         });
    //         console.log("Called loadUser(): user loaded", state);
    //     } catch (err) {
            
    //         dispatch({
    //             type: AUTH_ERROR,
    //             payload: {
    //                 msg: err.response.data.msg,
    //                 status: err.response.status,
    //                 id: 'AUTH_ERROR'
    //             }
    //         });
    //         console.log("Called loadUser(): error", state);
    //     }
    // }

    const loadUserCall = (state) => loadUser(dispatch);

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
        console.log("Before login");
        try {
            const res = await axios.post('/api/auth/login', body, config);
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            });
            console.log("After login, success, state: ", state);
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
            console.log("After login, failed, state: ", state);
        }
    };


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
        console.log("Called clearErrors()");
    };

    return (<AuthContext.Provider value={{
        loadUser: loadUserCall,
        register,
        login,
        logout,
        clearErrors,
        ...state
    }}>
        {children}
    </AuthContext.Provider>);

};