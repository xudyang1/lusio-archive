import React, { createContext, useReducer } from 'react';
import QuizReducer from '../reducers/QuizReducer';
import { 
  QUIZZES_LOADING, 
  GET_QUIZZES, 
  GET_QUIZ,
  UPDATE_QUIZ,
  ADD_QUIZ, 
  DELETE_QUIZ, 
  GET_ERRORS 
} from '../types/actionTypes';
import axios from 'axios';

// Initial state
const initialState = {
  quizzes: [],
  quiz: {
    id: "",
    userId: "",
    name: "",
    description: "",
    likes: 0,
    created: "",
    EXP: 0,
    questions:[]
  },
  error: null,
  loading: true
};

// Create context
export const QuizzesContext = createContext(initialState);

export const QuizzesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(QuizReducer, initialState);

  async function getQuizzes() {
    try {
      dispatch(setQuizzesLoading());
      const res = await axios.get('/api/quizzes');
      dispatch({
        type: GET_QUIZZES,
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
  
  async function addQuiz({userId, name, description, likes, created, EXP, questions}) {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const body = JSON.stringify({userId, name, description, likes, created, EXP, questions});
    try {
      const res = await axios.post('/api/quizzes/edit', body, config);

      dispatch({
        type: ADD_QUIZ,
        payload: res.data
      });
      return res.data.quiz.id;
    } catch (err) {
      dispatch({
        type: GET_ERRORS,
        payload: { msg: err.response.data.msg, status: err.response.status }
      });
    }
  }

  async function deleteQuiz(id) {
    try {
      await axios.delete(`/api/quizzes/edit/${id}`);

      dispatch({
        type: DELETE_QUIZ,
        payload: id
      });
    } catch (err) {
      dispatch({
        type: GET_ERRORS,
        payload: { msg: err.response.data.msg, status: err.response.status }
      });
    }
  }
  const setQuizzesLoading = () => {
    return {
      type: QUIZZES_LOADING
    };
  };
  return (<QuizzesContext.Provider value={{
    quizzes: state.quizzes,
    error: state.error,
    loading: state.loading,
    getQuizzes,
    addQuiz,
    deleteQuiz
  }}>
    {children}
  </QuizzesContext.Provider>);
};