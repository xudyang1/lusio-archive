import { GET_QUIZZES, QUIZZES_LOADING, ADD_QUIZ, DELETE_QUIZ, GET_ERRORS, CLEAR_ERRORS } from "../types/actionTypes";

export const QuizReducer = (state, action) => {
  switch (action.type) {
    case QUIZZES_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_QUIZZES:
      return {
        ...state,
        loading: false,
        quizzes: action.payload
      };
    case ADD_QUIZ:
      return {
        ...state,
        transactions: [...state.quizzes, action.payload]
      };
    case DELETE_QUIZ:
      return {
        ...state,
        quiz: state.quizzes.filter(quiz => quiz._id !== action.payload)
      };
    case GET_ERRORS:
      return {
        ...state,
        error: action.payload
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      }
    default:
      return state;
  }
};