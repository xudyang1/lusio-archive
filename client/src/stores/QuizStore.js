import React, { createContext, useReducer } from 'react';
import { QuizReducer } from '../reducers/QuizReducer';
import { GET_QUIZZES } from '../types/actionTypes';
import { getQuizzes, addQuiz, deleteQuiz } from '../actions/QuizActions';
import axios from 'axios';

// Initial state
const initialState = {
  quizzes: [],
  error: null,
  loading: true
};

// Create context
export const QuizzesContext = createContext(initialState);
export const QuizzesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(QuizReducer, initialState);

  const get = getQuizzes(dispatch);
  // async function getQuizzes() {
  //   try {
  //     // dispatch(setQuizzesLoading());
  //     const res = await axios.get('/api/quizzes');
  //     console.log(res);
  //     dispatch({
  //       type: GET_QUIZZES,
  //       payload: res.data.data
  //     });
  //     console.log("return: ", res.data.data);
  //   } catch (err) {
  //     console.error(err);
  //     // dispatch(returnErrors(err.response.data.msg, err.response.status));
  //   }
  // };

  return (<QuizzesContext.Provider value={{
    quizzes: state.quizzes,
    error: state.error,
    loading: state.loading,
    getQuizzes,
    // addQuiz: addQuiz(dispatch),
    // deleteQuiz: deleteQuiz(dispatch)
  }}>
    {children}
  </QuizzesContext.Provider>);
};