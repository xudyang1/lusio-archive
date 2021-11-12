import React, { createContext, useReducer } from 'react';
import { ProfileReducer } from '../reducers/ProfileReducer';
import {
    PROFILES_LOADING,
    GET_PROFILES,
    GET_PROFILE,
    UPDATE_PROFILE,
    DELETE_ACCOUNT,
    GET_ERRORS
} from '../types/actionTypes';
import axios from 'axios';
import { Axios } from 'axios';

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
            const res = await axios.get(`/api/profiles/profile/${id}`);
            console.log(res)
            dispatch({
                type: GET_PROFILE,
                payload: id
            });
        } catch (err) {
            dispatch({
                type: GET_ERRORS,
                payload: { msg: err.response.data.msg, status: err.response.status }
            });
        }
    };

// <<<<<<< Dajung
  async function updateProfile({id, userId, accountStatus, name, email, description, profileIcon, profileBanner, level, currentExp, maxExp, achievements, quizzes, subscribedUser, subscribedPlat}) {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const body = JSON.stringify({userId, accountStatus, name, email, description, profileIcon, profileBanner, level, currentExp, maxExp, achievements, quizzes, subscribedUser, subscribedPlat});
    try {
      const res = await axios.put(`/api/profiles/profile/${id}`, body, config);
      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data
      });
// =======
//     async function addProfile({ userId, accountStatus, name, email, description, profileIcon, profileBanner, level, currentExp, maxExp, achievements, quizzes, subscribedUser, subscribedPlat }) {
//         const config = {
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         };
//         const body = JSON.stringify({ userId, accountStatus, name, email, description, profileIcon, profileBanner, level, currentExp, maxExp, achievements, quizzes, subscribedUser, subscribedPlat });
//         try {
//             const res = await axios.post('http://localhost:5000/api/profiles/profile', body, config);
//             dispatch({
//                 type: ADD_PROFILE,
//                 payload: res.data
//             });
//             // console.log("After adding profile, success, state: ", state);
//         } catch (err) {
//             dispatch({
//                 type: GET_ERRORS,
//                 payload: { msg: "", status: "" }
//             });
//         }
//     };

//     async function updateProfile({ userId, accountStatus, name, email, description, profileIcon, profileBanner, level, currentExp, maxExp, achievements, quizzes, subscribedUser, subscribedPlat }, id) {
//         const config = {
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         }
//         const body = JSON.stringify({ userId, accountStatus, name, email, description, profileIcon, profileBanner, level, currentExp, maxExp, achievements, quizzes, subscribedUser, subscribedPlat });
//         try {
//             const res = await axios.put(`/api/profiles/profile/${id}`, body, config);
//             dispatch({
//                 type: UPDATE_PROFILE,
//                 payload: res.data
//             });
// >>>>>>> main

            // console.log("After adding profile, success, state: ", state);
        } catch (err) {
            dispatch({
                type: GET_ERRORS,
                payload: { msg: "", status: 404 }
            });
        }
    };

    async function deleteAccount(id) {
        try {
            await axios.delete(`/api/profiles/profile/${id}`);
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
    };

    return (<ProfileContext.Provider value={{
        getProfiles,
        getProfile,
        // addProfile,
        updateProfile,
        deleteAccount,
        ...state
    }}>
        {children}
    </ProfileContext.Provider>);
}