import React, { createContext, useReducer } from 'react';
import { ProfileReducer } from '../reducers/ProfileReducer';
import { PROFILES_LOADING, GET_PROFILES, ADD_PROFILE, DELETE_ACCOUNT, GET_ERRORS } from '../types/actionTypes';
import axios from 'axios';

// Initial state
const initialState = {
    userProfile: {
        id: 0,
        accountStatus: 1,
        name: "",
        email: "",
        description: "",
        profileIcon: "",
        profileBanner: "",
        level: 0,
        currentExp: 0,
        maxExp: 0,
        achievements: [],
        quizzes: [],
        subscribedUser: [],
        subscribedPlat: []
    },
    error: null,
    loading: true
};

// Create context
export const ProfileContext = createContext(initialState);

export const ProfilesProvider = ({ children }) => {
    const [state, dispatch] = useReducer(ProfileReducer, initialState);

    async function getProfiles(id) {
        try {
            dispatch(setProfilesLoading());
            const res = await axios.get(`/api/profiles/${id}`);
            dispatch({
                type: GET_PROFILES,
                payload: res.data
            });
            // console.log("return: ", res.data.data);
        } catch (err) {
            console.error(err);
            dispatch({
                type: GET_ERRORS,
                payload: { msg: err.response.data.msg, status: err.response.status }
            });
        }
    };
    const setProfilesLoading = () => {
        return {
            type: PROFILES_LOADING
        };
    };

    //TODO
    // _____ ___  ___   ___  
    // |_   _/ _ \|   \ / _ \ 
    //   | || (_) | |) | (_) |
    //   |_| \___/|___/ \___/

    async function updateProfile(){

    }

    async function addProfile({ description, bannerURI, profileIconURI }) {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const body = JSON.stringify({ description, bannerURI, profileIconURI });
        try {
            const res = await axios.post('/api/profiles/add', body, config);

            dispatch({
                type: ADD_PROFILE,
                payload: res.data
            });

            // console.log("After adding profile, success, state: ", state);
        } catch (err) {
            dispatch({
                type: GET_ERRORS,
                payload: { msg: err.response.data.msg, status: err.response.status }
            });
        }
    }



    async function deleteAccount(id) {
        try {
            await axios.delete(`/api/profiles/${id}`);

            dispatch({
                type: DELETE_ACCOUNT,
                payload: id
            });
        } catch (err) {
            dispatch({
                type: GET_ERRORS,
                payload: { msg: err.response.data.msg, status: err.response.status }
            });
        }
    }

    return (<ProfileContext.Provider value={{
        getProfiles,
        addProfile,
        deleteAccount,
        ...state
    }}>
        {children}
    </ProfileContext.Provider>);
};