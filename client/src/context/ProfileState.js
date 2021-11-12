import React, { createContext, useContext, useReducer } from 'react';
import { ProfileReducer } from '../reducers/ProfileReducer';
import {
    PROFILES_LOADING,
    GET_PROFILES,
    GET_PROFILE,
    UPDATE_PROFILE,
    GET_ERRORS
} from '../types/actionTypes';
import axios from 'axios';
import { Axios } from 'axios';
import { AuthContext, AuthProvider } from './AuthState';

// Initial state
const initialState = {
    profile: {
        _id: null,
        owner: null,
        platformsCreated: [],
        quizzesCreated: [],
        description: null,
        iconURI: null,
        bannerURI: null,
        level: 0,
        currentExp: 0,
        maxExp: 500,
        achievements: [],
        quizzesTaken: [],
        likedQuizzes: [],
        subscribedUsers: [],
        subscribedPlatforms: [],
        fans: []
    },
    error: null,
    loading: true,
    viewType: 'GUEST_VIEW' // 'GUEST_VIEW' or 'OWNER_VIEW'
};

// Create context
export const ProfileContext = createContext(initialState);

export const ProfilesProvider = ({ children }) => {
    const { token } = useContext(AuthContext);
    const [state, dispatch] = useReducer(ProfileReducer, initialState);

    // set up config/headers and token
    const tokenConfig = token => {
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

    async function getProfiles() {
        try {
            dispatch({ type: PROFILES_LOADING });
            const res = await axios.get('/api/profiles');
            dispatch({
                type: GET_PROFILES,
                payload: res.data
            });
            // console.log("return: ", res.data.data);
        } catch (err) {
            // console.error(err);
            dispatch({
                type: GET_ERRORS,
                payload: { msg: err.response.data.msg, status: err.response.status }
            });
        }
    };

    async function getProfile(id) {
        try {
            dispatch({ type: PROFILES_LOADING });
            const res = await axios.get(`/api/profiles/profile/${id}`, tokenConfig(token));
            console.log("res", res);
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: GET_ERRORS,
                payload: { msg: err.response.data.msg, status: err.response.status }
            });
        }
    };
    
    /**
     * @param payload format: 
     *        
     *      { mode: "EDIT", profile: description | iconURI | bannerURI } 
     *  Or
     *      {
     *        mode: "ADD" | "DELETE", 
     *        profile: quizzesCreated |subscribedUsers | subscribedPlatforms | fans
     *      }
     * ex. 
     */
    async function updateProfile(payload) {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const body = JSON.stringify(payload);
        try {
            const res = await axios.patch(`/api/profiles/profile/edit/${state.profile._id}`, body, config);
            dispatch({
                type: UPDATE_PROFILE,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: GET_ERRORS,
                payload: { msg: err.response.data.msg, status: err.response.status }
            });
        }
    };

    /** implemented inside AuthState.js */
    // async function deleteAccount(id) {
    //     try {
    //         await axios.delete(`/api/profiles/profile/${id}`);
    //         dispatch({
    //             type: DELETE_ACCOUNT,
    //             payload: id
    //         });
    //     } catch (err) {
    //         dispatch({
    //             type: GET_ERRORS,
    //             payload: { msg: err.response.data.msg, status: err.response.status }
    //         });
    //     }
    // };

    return (<ProfileContext.Provider value={{
        getProfiles,
        getProfile,
        // addProfile,
        updateProfile,
        ...state
    }}>
        {children}
    </ProfileContext.Provider>);
};