import { GET_QUIZZES, 
  GET_QUIZ,
  GET_QUIZZESBYID,
  QUIZZES_LOADING,
  GET_COMMENTBYID, 
  ADD_QUIZ, 
  DELETE_QUIZ, 
  UPDATE_QUIZ,
  GET_ERRORS, 
  PLAY_QUIZ,
  FINISH_QUIZ,
  CLEAR_ERRORS } from "../types/actionTypes";

export default function QuizReducer (state, action) {
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
    case GET_QUIZ:
      return {
        ...state,
        quiz: state.quizzes.filter(quiz => quiz._id === action.payload),
        loading: false
      };
    case GET_QUIZZESBYID:
      return {
        ...state,
      };
    case GET_COMMENTBYID:
      return {
        ...state,
        quiz: action.payload
      };
// =======
//         quiz: state.quizzes.filter(quiz => quiz._id === action.payload)
//       };
    case DELETE_QUIZ:
      return {
        ...state,
        quiz: state._id !== action.payload
      };
    case ADD_QUIZ:
      return {
        ...state,
        quiz: action.payload
      };
    case UPDATE_QUIZ:
      return {
        ...state,
        quiz: action.payload
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
      };
    case PLAY_QUIZ:
      return {
        ...state,
        quiz: action.payload,
        isPlaying: true
      };
    case FINISH_QUIZ:
      return {
        ...state,
        isPlaying: false,
        score: action.payload.score,
        timeSpent: action.payload.timeSpent
      };
    default:
      return state;
  }
};