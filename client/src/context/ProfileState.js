import React, { createContext, useReducer } from 'react';
import { ProfileReducer } from '../reducers/ProfileReducer';
import { PROFILES_LOADING, GET_PROFILES, ADD_PROFILE, UPDATE_PROFILE, DELETE_ACCOUNT, GET_ERRORS } from '../types/actionTypes';
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
        payload: res.data.data
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

    try {
      const res = await axios.post('/api/profiles', profile, config);

      dispatch({
        type: ADD_PROFILE,
        payload: res.data.data
      });
    } catch (err) {
      dispatch({
        type: GET_ERRORS,
        payload: { msg: err.response.data.msg, status: err.response.status }
      });
    }
  }

  async function updateProfile(profile) {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.put('/api/profiles', profile, config);

      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data.data
      });
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
    profiles: state.profiles,
    error: state.error,
    loading: state.loading,
    getProfiles,
    addProfile,
    updateProfile,
    deleteAccount
  }}>
    {children}
  </ProfilesContext.Provider>);
};