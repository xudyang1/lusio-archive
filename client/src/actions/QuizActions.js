import { QUIZZES_LOADING, GET_QUIZZES, ADD_QUIZ, DELETE_QUIZ } from '../types/actionTypes';
import axios from 'axios';
import { returnErrors } from './ErrorActions';

export const setQuizzesLoading = () => {
  return {
    type: QUIZZES_LOADING
  };
};

export const getQuizzes = (dispatch) => async () => {
  try {
    // dispatch(setQuizzesLoading());
    const res = await axios.get('/api/quizzes');
    // console.log(res);
    // console.log("getQuizzes()...");
    // console.log("dispatch"+dispatch);
    dispatch({
      type: GET_QUIZZES,
      payload: res.data.data
    });
  } catch (err) {
    console.error(err);
    // dispatch(returnErrors(err.response.data.msg, err.response.status));
  }
};

export const addQuiz = (dispatch, quiz) => async () =>{
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post('/api/quizzes', quiz, config);

    dispatch({
      type: ADD_QUIZ,
      payload: res.data.data
    });
  } catch (err) {
    dispatch(returnErrors(err.response.data.error));
  }
}

export const deleteQuiz = (dispatch, id) => async () => {
  try {
    await axios.delete(`/api/quizzes/${id}`);

    dispatch({
      type: DELETE_QUIZ,
      payload: id
    });
  } catch (err) {
    dispatch(returnErrors(err.response.data.error));
  }
}