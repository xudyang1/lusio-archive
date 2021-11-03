import { PROFILES_LOADING, GET_PROFILES, ADD_PROFILE, DELETE_ACCOUNT } from '../types/actionTypes';
import axios from 'axios';
import { returnErrors } from './ErrorActions';

export const setProfilesLoading = () => {
  return {
    type: PROFILES_LOADING
  };
};

export const getProfiles = (dispatch) => async () => {
  try {
    // dispatch(setQuizzesLoading());
    const res = await axios.get('/api/profiles');
    console.log(res);
    console.log("getProfiles()...");
    console.log("dispatch"+dispatch);
    dispatch({
      type: GET_PROFILES,
      payload: res.data
    });
  } catch (err) {
    console.error(err);
    // dispatch(returnErrors(err.response.data.msg, err.response.status));
  }
};

export const addProfile = (dispatch, profile) => async () =>{
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const body = JSON.stringify(profile);
    const res = await axios.post('/api/profiles', body, config)
    .then(res => dispatch({
        type: ADD_PROFILE,
        payload: res.data
    }))
    .catch(err => {
        dispatch(returnErrors(err.response.data.error))
    });
       
};

export const deleteAccount = (dispatch, id) => async () => {
  try {
    await axios.delete(`/api/profiles/${id}`);

    dispatch({
      type: DELETE_ACCOUNT,
      payload: id
    });
  } catch (err) {
    dispatch(returnErrors(err.response.data.error));
  }
}