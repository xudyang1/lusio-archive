import { PLATFORMS_LOADING, GET_PLATFORM, ADD_PLATFORM, DELETE_PLATFORM } from '../types/actionTypes';
import axios from 'axios';
import { returnErrors } from './ErrorActions';

export const setPlatformsLoading = () => {
  return {
    type: PLATFORMS_LOADING
  };
};

export const getPlatforms = (dispatch) => async () => {
  try {
    
    const res = await axios.get('/api/platforms');
    // console.log(res);
    // console.log("getPlatforms()...");
    // console.log("dispatch"+dispatch);
    dispatch({
      type: GET_PLATFORM,
      payload: res.data.data
    });
  } catch (err) {
    console.error(err);
   
  }
};

export const addPlatform = (dispatch, platform) => async () =>{
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post('/api/platforms', platform, config);

    dispatch({
      type: ADD_PLATFORM,
      payload: res.data.data
    });
  } catch (err) {
    dispatch(returnErrors(err.response.data.error));
  }
}

export const deleteQuiz = (dispatch, id) => async () => {
  try {
    await axios.delete(`/api/platforms/${id}`);

    dispatch({
      type: DELETE_PLATFORM,
      payload: id
    });
  } catch (err) {
    dispatch(returnErrors(err.response.data.error));
  }
}