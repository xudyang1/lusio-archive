import React, { createContext, useReducer } from 'react';
import AuthReducer from '../reducers/AuthReducer';
import {
    LOGOUT_SUCCESS,
    DELETE_ACCOUNT,
    UPDATE_SUCCESS
} from "../types/actionTypes";
import axios from 'axios';
import { loadUser } from '../actions/AuthActions';

// TODO: more refactoring

// Initial state
const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    user: {
        email: null,
        name: null,
        profile: null,
        iconURI: null
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

    const loadUserCaller = () => loadUser(state.token)(dispatch);
    
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
                payload: res.data
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

    return (<AuthContext.Provider value={{
        loadUser: loadUserCaller,
        logout,
        updateUser,
        deleteAccount,
        ...state,
        useAuthStore: {state, dispatch}
    }}>
        {children}
    </AuthContext.Provider>);
};