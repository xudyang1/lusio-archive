import { GET_QUIZZES, ADD_QUIZ, DELETE_QUIZ, GET_ERRORS } from "../types/actionTypes";

export const GlobalReducer = (state, action) => {
  switch (action.type) {
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
    default:
      return state;
  }
};