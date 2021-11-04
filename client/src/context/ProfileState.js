import React, { createContext, useReducer } from 'react';
import { ProfileReducer } from '../reducers/ProfileReducer';
import { PROFILES_LOADING, GET_PROFILES, ADD_PROFILE, DELETE_ACCOUNT, GET_ERRORS } from '../types/actionTypes';
import axios from 'axios';

// Initial state
const initialState = {
  profiles: [],
  error: null,
  loading: true
};

// Create context
export const ProfilesContext = createContext(initialState);

export const ProfilesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ProfileReducer, initialState);

  async function getProfiles() {
    try {
      dispatch(setProfilesLoading());
      const res = await axios.get('/api/profiles');
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

  async function addProfile(profile) {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const body = JSON.stringify(profile);
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

  return (<ProfilesContext.Provider value={{
    getProfiles,
    addProfile,
    deleteAccount,
    ...state
  }}>
    {children}
  </ProfilesContext.Provider>);
};